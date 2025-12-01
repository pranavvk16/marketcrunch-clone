import { NextResponse } from 'next/server';
import { isValidTicker, getStockByTicker } from '@/lib/stocks-data';
import { getCachedPrediction } from '@/lib/prediction-engine';

export async function GET(request: Request, { params }: { params: Promise<{ ticker: string }> }) {
  try {
    const { ticker: tickerParam } = await params;
    const ticker = tickerParam.toUpperCase();

    // Validate ticker
    if (!isValidTicker(ticker)) {
      return NextResponse.json({ 
        error: `Ticker ${ticker} is not supported`,
        message: 'Please use one of our 25 supported stocks'
      }, { status: 404 });
    }

    const stock = await getStockByTicker(ticker);
    console.log(`📈 Generating forecast for ${ticker} (${stock?.name})...`);

    // Generate prediction with caching
    const prediction = await getCachedPrediction(ticker);

    return NextResponse.json({
      success: true,
      data: prediction
    });

  } catch (error) {
    console.error(`Forecast error for ${params}:`, error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to generate forecast' 
    }, { status: 500 });
  }
}
