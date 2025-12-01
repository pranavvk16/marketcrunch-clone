import { NextResponse } from 'next/server';
import { getTrendingSymbols, getQuotes } from '@/lib/yahoo-finance';

export async function GET() {
  try {
    const trending = await getTrendingSymbols('US');
    
    // Extract symbols from trending data
    const symbols = trending.quotes.map((q: any) => q.symbol);
    
    // Fetch full quote data for these symbols
    const quotes = await getQuotes(symbols);

    // Transform data for TickerTape
    const items = quotes.map((item: any) => ({
      symbol: item.symbol,
      price: `$${item.regularMarketPrice?.toFixed(2) || '0.00'}`,
      change: `${item.regularMarketChangePercent?.toFixed(2)}%`,
      isPositive: (item.regularMarketChangePercent || 0) >= 0
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Trending error:', error);
    return NextResponse.json({ items: [] });
  }
}
