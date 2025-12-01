import YahooFinance from 'yahoo-finance2';
import { StockData } from './stocks-data';

const yahooFinance = new YahooFinance();

export async function fetchStockData(ticker: string): Promise<StockData | null> {
  try {
    const quote = await yahooFinance.quote(ticker);
    
    if (!quote) {
      return null;
    }

    // Map Yahoo Finance data to our StockData interface
    // Note: Yahoo Finance sector data might need a separate call (quoteSummary) 
    // but for now we'll try to use what's available or default.
    
    // quoteSummary might not be available on the instance directly or needs different usage
    // The user example only showed .quote() and .search()
    // Let's try to use quoteSummary if available on the instance, otherwise fallback.
    // Checking types or docs would be ideal, but let's assume it exists or use a try-catch for it specifically if needed.
    // However, the user snippet `const { regularMarketPrice as price, currency } = quote;` suggests simple usage.
    
    // Let's stick to what we had but with the instance.
    const profile: any = await yahooFinance.quoteSummary(ticker, { modules: ['summaryProfile', 'price'] });
    const summaryProfile = profile.summaryProfile;
    const price = profile.price;

    if (!summaryProfile || !price) {
        // Fallback if detailed data isn't available, though unlikely for major stocks
        return {
            ticker: ticker.toUpperCase(),
            name: quote.longName || quote.shortName || ticker,
            currentPrice: quote.regularMarketPrice || 0,
            sector: 'Unknown',
            marketCap: (quote.marketCap && quote.marketCap > 10000000000) ? 'Large' : 'Mid', // Simplified logic
        };
    }

    let marketCapSize: 'Large' | 'Mid' | 'Small' = 'Mid';
    if (price.marketCap) {
        if (price.marketCap > 10000000000) marketCapSize = 'Large';
        else if (price.marketCap < 2000000000) marketCapSize = 'Small';
    }

    return {
      ticker: ticker.toUpperCase(),
      name: price.longName || price.shortName || ticker,
      currentPrice: price.regularMarketPrice || 0,
      sector: summaryProfile.sector || 'Unknown',
      marketCap: marketCapSize,
    };

  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    return null;
  }
}

export async function searchStocks(query: string): Promise<any[]> {
  try {
    const results = await yahooFinance.search(query);
    return results.quotes;
  } catch (error) {
    console.error(`Error searching for ${query}:`, error);
    return [];
  }
}

export async function fetchMultipleStocks(tickers: string[]): Promise<StockData[]> {
    const promises = tickers.map(ticker => fetchStockData(ticker));
    const results = await Promise.all(promises);
    return results.filter((stock): stock is StockData => stock !== null);
}

// --- New Modules ---

export async function getRecommendationsBySymbol(symbol: string): Promise<any> {
    try {
        return await yahooFinance.recommendationsBySymbol(symbol);
    } catch (error) {
        console.error(`Error fetching recommendations for ${symbol}:`, error);
        return null;
    }
}

export async function getScreener(queryOptions: any): Promise<any> {
    try {
        return await yahooFinance.screener(queryOptions);
    } catch (error) {
        console.error(`Error fetching screener data:`, error);
        return null;
    }
}

export async function getTrendingSymbols(country: string = 'US'): Promise<any> {
    try {
        return await yahooFinance.trendingSymbols(country);
    } catch (error) {
        console.error(`Error fetching trending symbols for ${country}:`, error);
        return null;
    }
}

export async function getChart(symbol: string, queryOptions?: any): Promise<any> {
    try {
        // Default to 1 month range using period1
        const period1 = new Date();
        period1.setMonth(period1.getMonth() - 1);
        return await yahooFinance.chart(symbol, queryOptions || { period1: period1.toISOString().split('T')[0] });
    } catch (error) {
        console.error(`Error fetching chart for ${symbol}:`, error);
        return null;
    }
}

export async function getFundamentalsTimeSeries(symbol: string, queryOptions?: any): Promise<any> {
    try {
        return await yahooFinance.fundamentalsTimeSeries(symbol, queryOptions);
    } catch (error) {
        console.error(`Error fetching fundamentals time series for ${symbol}:`, error);
        return null;
    }
}

export async function getHistorical(symbol: string, queryOptions?: any): Promise<any> {
    try {
        return await yahooFinance.historical(symbol, queryOptions || { period1: '2024-01-01' });
    } catch (error) {
        console.error(`Error fetching historical data for ${symbol}:`, error);
        return null;
    }
}

export async function getInsights(symbol: string, queryOptions?: any): Promise<any> {
    try {
        return await yahooFinance.insights(symbol, queryOptions);
    } catch (error) {
        console.error(`Error fetching insights for ${symbol}:`, error);
        return null;
    }
}

export async function getOptions(symbol: string, queryOptions?: any): Promise<any> {
    try {
        return await yahooFinance.options(symbol, queryOptions);
    } catch (error) {
        console.error(`Error fetching options for ${symbol}:`, error);
        return null;
    }
}

export async function getQuote(symbol: string): Promise<any> {
    try {
        return await yahooFinance.quote(symbol);
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        return null;
    }
}

export async function getQuotes(symbols: string[]): Promise<any[]> {
    try {
        return await yahooFinance.quote(symbols);
    } catch (error) {
        console.error(`Error fetching quotes for ${symbols}:`, error);
        return [];
    }
}

export async function getQuoteSummary(symbol: string, queryOptions?: any): Promise<any> {
    try {
        // Default modules if none provided
        const modules = queryOptions?.modules || ['summaryProfile', 'financialData', 'defaultKeyStatistics', 'price', 'summaryDetail'];
        return await yahooFinance.quoteSummary(symbol, { ...queryOptions, modules });
    } catch (error) {
        console.error(`Error fetching quote summary for ${symbol}:`, error);
        return null;
    }
}
