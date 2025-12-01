// Load environment variables first
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import cors from 'cors';
import { getAllStocks, getStocksBySector, isValidTicker, getStockByTicker } from './lib/stocks-data.js';
import { getCachedPrediction } from './lib/prediction-engine.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/ping - Test Gemini API connection
app.get('/api/ping', async (req, res) => {
  try {
    console.log('🏓 Testing Gemini API connection...');
    
    const { getGenerativeModel } = await import('./lib/gemini.js');
    const model = getGenerativeModel("gemini-2.5-flash");
    
    const result = await model.generateContent("What is 2+2? Reply with just the number.");
    const text = result.response.text();
    
    console.log('✅ Gemini API test successful!');
    
    res.json({
      success: true,
      message: 'Gemini API is working correctly!',
      testResult: text.trim(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Gemini API test failed:', error);
    res.status(500).json({
      success: false,
      message: 'Gemini API test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/stocks - List all stocks
app.get('/api/stocks', (req, res) => {
  try {
    const sector = req.query.sector as string | undefined;
    
    let stocks;
    if (sector) {
      stocks = getStocksBySector(sector);
    } else {
      stocks = getAllStocks();
    }

    res.json({
      success: true,
      count: stocks.length,
      stocks
    });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

// POST /api/analyze - Analyze a stock
app.post('/api/analyze', async (req, res) => {
  try {
    const { symbol } = req.body;

    if (!symbol) {
      return res.status(400).json({ error: 'Symbol is required' });
    }

    // Validate ticker is in our supported universe
    if (!isValidTicker(symbol)) {
      return res.status(400).json({ 
        error: `Ticker ${symbol} is not supported. Please use one of our 25 supported stocks.` 
      });
    }

    console.log(`📊 Analyzing ${symbol}...`);
    
    // Generate prediction using our AI engine (with caching)
    const prediction = await getCachedPrediction(symbol);

    console.log(`✅ Successfully generated prediction for ${symbol}`);
    res.json(prediction);

  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to analyze ticker' 
    });
  }
});

// GET /api/forecast/:ticker - Get forecast for specific ticker
app.get('/api/forecast/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();

    // Validate ticker
    if (!isValidTicker(ticker)) {
      return res.status(404).json({ 
        error: `Ticker ${ticker} is not supported`,
        message: 'Please use one of our 25 supported stocks'
      });
    }

    const stock = getStockByTicker(ticker);
    console.log(`📈 Generating forecast for ${ticker} (${stock?.name})...`);

    // Generate prediction with caching
    const prediction = await getCachedPrediction(ticker);

    res.json({
      success: true,
      data: prediction
    });

  } catch (error) {
    console.error(`Forecast error for ${req.params.ticker}:`, error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate forecast' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 MarketCrunch AI Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   - GET  http://localhost:${PORT}/api/ping`);
  console.log(`   - GET  http://localhost:${PORT}/api/stocks`);
  console.log(`   - POST http://localhost:${PORT}/api/analyze`);
  console.log(`   - GET  http://localhost:${PORT}/api/forecast/:ticker`);
  console.log(`\n✨ Ready to generate AI predictions!`);
  console.log(`🔑 Gemini API key loaded: ${process.env.GEMINI_API_KEY ? '✓' : '✗'}\n`);
});
