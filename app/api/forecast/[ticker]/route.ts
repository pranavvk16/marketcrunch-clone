import { NextResponse } from 'next/server';
import { getCachedPrediction } from '../../../../lib/prediction-engine';
import { isValidTicker, getStockByTicker } from '../../../../lib/stocks-data';

export async function GET(
  req: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const ticker = params.ticker.toUpperCase();

    // Validate ticker
    if (!isValidTicker(ticker)) {
      return NextResponse.json({ 
        error: `Ticker ${ticker} is not supported`,
        message: 'Please use one of our 25 supported stocks'
      }, { status: 404 });
    }

    const stock = getStockByTicker(ticker);
    console.log(`Generating forecast for ${ticker} (${stock?.name})...`);

    // Generate prediction with caching
    const prediction = await getCachedPrediction(ticker);

    return NextResponse.json({
      success: true,
      data: prediction
    });

  } catch (error) {
    console.error(`Forecast error for ${params.ticker}:`, error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to generate forecast' 
    }, { status: 500 });
  }
}
