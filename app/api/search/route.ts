import { NextResponse } from 'next/server';
import { searchStocks } from '@/lib/yahoo-finance';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const results = await searchStocks(query);
    
    // Filter and format results
    const suggestions = results
      .filter((item: any) => item.symbol && item.shortname) // Ensure valid data
      .slice(0, 5) // Limit to top 5
      .map((item: any) => ({
        symbol: item.symbol,
        name: item.shortname || item.longname,
        exchange: item.exchange,
        type: item.quoteType
      }));

    return NextResponse.json({ results: suggestions });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
