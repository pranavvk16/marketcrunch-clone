import { NextResponse } from 'next/server';
import { 
  getQuote, 
  getChart, 
  getInsights, 
  getRecommendationsBySymbol, 
  getTrendingSymbols,
  getQuoteSummary,
  getOptions,
  getFundamentalsTimeSeries
} from '@/lib/yahoo-finance';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get('ticker');

    if (!ticker) {
      // If no ticker, return trending symbols
      const trending = await getTrendingSymbols('US');
      return NextResponse.json({ trending });
    }

    // Fetch all data in parallel
    const [
      quote,
      chart,
      insights,
      recommendations,
      summary,
      options,
      fundamentals
    ] = await Promise.all([
      getQuote(ticker),
      getChart(ticker),
      getInsights(ticker),
      getRecommendationsBySymbol(ticker),
      getQuoteSummary(ticker),
      getOptions(ticker),
      getFundamentalsTimeSeries(ticker)
    ]);

    return NextResponse.json({
      quote,
      chart,
      insights,
      recommendations,
      summary,
      options,
      fundamentals
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
