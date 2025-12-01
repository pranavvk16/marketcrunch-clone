import { NextResponse } from 'next/server';
import { getAllStocks, getStocksBySector } from '../../../lib/stocks-data';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sector = searchParams.get('sector');

    let stocks;
    if (sector) {
      stocks = getStocksBySector(sector);
    } else {
      stocks = getAllStocks();
    }

    return NextResponse.json({
      success: true,
      count: stocks.length,
      stocks
    });

  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch stocks' 
    }, { status: 500 });
  }
}
