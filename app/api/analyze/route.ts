import { NextResponse } from 'next/server';
import { getCachedPrediction } from '../../../lib/prediction-engine';
import { isValidTicker } from '../../../lib/stocks-data';

export async function POST(req: Request) {
  try {
    const { symbol } = await req.json();

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    // Validate ticker is in our supported universe
    if (!isValidTicker(symbol)) {
      return NextResponse.json({ 
        error: `Ticker ${symbol} is not supported. Please use one of our 25 supported stocks.` 
      }, { status: 400 });
    }

    console.log(`Analyzing ${symbol}...`);
    
    // Generate prediction using our AI engine (with caching)
    const prediction = await getCachedPrediction(symbol);

    console.log(`Successfully generated prediction for ${symbol}`);
    return NextResponse.json(prediction);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to analyze ticker' 
    }, { status: 500 });
  }
}