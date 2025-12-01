import { getGenerativeModel } from './gemini';
import { getStockByTicker } from './stocks-data';
import { SchemaType } from "@google/generative-ai";

export interface TechnicalSignal {
  signal: string;
  type: 'Bullish' | 'Bearish';
}

export interface StockPrediction {
  symbol: string;
  currentPrice: string;
  nextDayTarget: string;
  nextDayChangePercent: string;
  weeklyMin: string;
  weeklyMax: string;
  confidenceScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  volatilityScore: number;
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  momentumScore: number;
  explanation: string;
  sentiment: string;
  sentimentReason: string;
  backtestWinRate: string;
  backtestSharpe: string;
  technicalSignals: TechnicalSignal[];
}

/**
 * Generate comprehensive AI-powered stock prediction using Gemini
 */
export async function generateStockPrediction(ticker: string): Promise<StockPrediction> {
  const stock = getStockByTicker(ticker);
  
  if (!stock) {
    throw new Error(`Invalid ticker: ${ticker}. Not in supported stock universe.`);
  }

  const prompt = `
You are a senior quantitative financial analyst for MarketCrunch AI, a premium AI-driven stock forecasting platform.

Analyze the stock ticker: ${stock.ticker} (${stock.name})
Current Price: $${stock.currentPrice}
Sector: ${stock.sector}

Provide a comprehensive predictive analysis with the following components:

1. **Next Day Price Forecast**: 
   - Predict tomorrow's closing price target
   - Calculate the expected percentage change
   - Consider overnight market dynamics and pre-market indicators

2. **Weekly Price Range**:
   - Forecast the minimum and maximum price range for the upcoming week
   - Account for volatility and support/resistance levels

3. **Confidence & Uncertainty**:
   - Provide a confidence score (0-100) reflecting:
     * Model certainty in the prediction
     * Data quality and completeness
     * Market stability vs chaos
   - Be realistic: most predictions should be 60-85% confidence
   - Lower confidence during high uncertainty periods

4. **Risk Assessment**:
   - Determine risk level: Low, Medium, High, or Extreme
   - Calculate volatility score (0-100) where higher = more volatile
   - Consider beta, standard deviation, recent price swings

5. **Trend & Momentum Analysis**:
   - Identify trend: Bullish, Bearish, or Neutral
   - Calculate momentum score (0-100) indicating trend strength
   - Consider moving averages, MACD, trend channels

6. **Market Sentiment**:
   - Overall sentiment: Bullish, Bearish, or Neutral
   - Provide clear reasoning for the sentiment
   - Consider news, social sentiment, institutional flow

7. **Explainable AI (XAI)**:
   - Write a clear, plain-English explanation (2-3 sentences) of:
     * WHY you made this prediction
     * WHAT factors were most influential (technicals, macro, sentiment)
     * KEY drivers behind the forecast
   - Make it readable by non-technical investors

8. **Technical Signals**:
   - Provide 3-5 specific technical indicators
   - Each signal should be clearly Bullish or Bearish
   - Examples: "RSI Oversold", "MACD Bullish Crossover", "Below 50-day MA", etc.

9. **Backtesting Performance** (Simulated):
   - Win Rate: Percentage of profitable predictions (format: "XX%")
   - Sharpe Ratio: Risk-adjusted returns (format: "X.XX")
   - Base these on realistic historical performance for this asset class
   - Tech stocks: typically 55-68% win rate, Sharpe 0.8-1.5
   - Stable stocks: 60-72% win rate, Sharpe 1.0-1.8
   - Volatile stocks: 48-62% win rate, Sharpe 0.5-1.2

Important Guidelines:
- Generate realistic predictions based on general market knowledge as of Dec 2024
- Ensure all predictions are internally consistent (e.g., bullish trend → positive next-day change)
- Use actual technical analysis principles
- Make explanations genuinely insightful, not generic
- Prices should be realistic and near the current price
- Be specific in technical signals (include actual indicator names)
`;

  try {
    const model = getGenerativeModel("gemini-2.5-flash");
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            symbol: { type: SchemaType.STRING },
            currentPrice: { type: SchemaType.STRING, description: "Format as $XXX.XX" },
            nextDayTarget: { type: SchemaType.STRING, description: "Format as $XXX.XX" },
            nextDayChangePercent: { type: SchemaType.STRING, description: "Format as +X.XX% or -X.XX%" },
            weeklyMin: { type: SchemaType.STRING, description: "Format as $XXX.XX" },
            weeklyMax: { type: SchemaType.STRING, description: "Format as $XXX.XX" },
            confidenceScore: { type: SchemaType.NUMBER, description: "0-100 representing model confidence" },
            riskLevel: { type: SchemaType.STRING, enum: ["Low", "Medium", "High", "Extreme"], format: "enum" },
            volatilityScore: { type: SchemaType.NUMBER, description: "0-100 where 100 is highly volatile" },
            trend: { type: SchemaType.STRING, enum: ["Bullish", "Bearish", "Neutral"], format: "enum" },
            momentumScore: { type: SchemaType.NUMBER, description: "0-100 indicating trend strength" },
            explanation: { type: SchemaType.STRING, description: "Plain-English 2-3 sentence explanation of prediction drivers" },
            sentiment: { type: SchemaType.STRING, description: "Overall market sentiment" },
            sentimentReason: { type: SchemaType.STRING, description: "Why this sentiment exists" },
            backtestWinRate: { type: SchemaType.STRING, description: "Format as XX%" },
            backtestSharpe: { type: SchemaType.STRING, description: "Format as X.XX" },
            technicalSignals: {
              type: SchemaType.ARRAY,
              description: "Array of 3-5 technical indicators",
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  signal: { type: SchemaType.STRING, description: "Specific technical signal name" },
                  type: { type: SchemaType.STRING, enum: ["Bullish", "Bearish"], format: "enum" }
                },
                required: ["signal", "type"]
              }
            }
          },
          required: [
            "symbol", "currentPrice", "nextDayTarget", "nextDayChangePercent",
            "weeklyMin", "weeklyMax", "confidenceScore", "riskLevel",
            "volatilityScore", "trend", "momentumScore", "explanation",
            "sentiment", "sentimentReason", "backtestWinRate", "backtestSharpe",
            "technicalSignals"
          ]
        }
      }
    });

    const text = result.response.text();
    if (!text) {
      throw new Error("No response from AI model");
    }

    const prediction: StockPrediction = JSON.parse(text);
    
    // Validate prediction has all required fields
    if (!prediction.symbol || !prediction.nextDayTarget || !prediction.explanation) {
      throw new Error("Incomplete prediction data from AI");
    }

    return prediction;

  } catch (error) {
    console.error('Prediction generation error:', error);
    throw new Error(`Failed to generate prediction for ${ticker}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// In-memory cache for predictions (5 minute TTL)
interface CacheEntry {
  prediction: StockPrediction;
  timestamp: number;
}

const predictionCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get prediction with caching to avoid excessive API calls
 */
export async function getCachedPrediction(ticker: string): Promise<StockPrediction> {
  const normalizedTicker = ticker.toUpperCase();
  const cached = predictionCache.get(normalizedTicker);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    console.log(`Cache hit for ${normalizedTicker}`);
    return cached.prediction;
  }

  console.log(`Generating new prediction for ${normalizedTicker}`);
  const prediction = await generateStockPrediction(normalizedTicker);
  
  predictionCache.set(normalizedTicker, {
    prediction,
    timestamp: Date.now()
  });

  return prediction;
}

/**
 * Clear cache for a specific ticker or all tickers
 */
export function clearPredictionCache(ticker?: string): void {
  if (ticker) {
    predictionCache.delete(ticker.toUpperCase());
  } else {
    predictionCache.clear();
  }
}
