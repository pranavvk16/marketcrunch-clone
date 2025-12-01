import { NextResponse } from 'next/server';
import { getAllStocks, getStocksBySector } from '@/lib/stocks-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get('sector');
    
    let stocks;
    if (sector) {
      stocks = await getStocksBySector(sector);
    } else {
      stocks = await getAllStocks();
    }

    return NextResponse.json({
      success: true,
      count: stocks.length,
      stocks
    });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json({ error: 'Failed to fetch stocks' }, { status: 500 });
  }
}
