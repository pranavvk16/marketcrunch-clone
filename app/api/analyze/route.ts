import { NextResponse } from 'next/server';
import { resolveTicker } from '@/lib/stocks-data';
import { getCachedPrediction } from '@/lib/prediction-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symbol } = body;

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    // Resolve ticker from symbol or name
    const ticker = await resolveTicker(symbol);

    if (!ticker) {
      return NextResponse.json({ 
        error: `Could not find a stock matching "${symbol}". Please try a valid ticker symbol.` 
      }, { status: 404 });
    }

    console.log(`📊 Analyzing ${ticker}...`);
    
    // Generate prediction using our AI engine (with caching)
    const prediction = await getCachedPrediction(ticker);

    console.log(`✅ Successfully generated prediction for ${ticker}`);
    return NextResponse.json(prediction);

  } catch (error) {
    console.error('❌ Analysis error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to analyze ticker' 
    }, { status: 500 });
  }
}