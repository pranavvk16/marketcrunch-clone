import { fetchMultipleStocks, fetchStockData, searchStocks } from './yahoo-finance';

export interface StockData {
  ticker: string;
  name: string;
  currentPrice: number;
  sector: string;
  marketCap: 'Large' | 'Mid' | 'Small';
}

// List of popular tickers to track
const POPULAR_TICKERS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'AMD', 'INTC', 'CSCO', 'ADBE', 'CRM', 'NFLX', // Tech
  'JPM', 'BAC', 'GS', 'V', 'MA', // Financials
  'WMT', 'DIS', 'NKE', 'COST', 'PEP', 'KO', 'MCD', // Consumer
  'JNJ', 'PFE', 'UNH', 'ABBV', 'MRK', // Healthcare
  'XOM', 'CVX', // Energy
  'SPY', 'QQQ', 'DIA', 'IWM' // ETFs
];

export const SECTORS = ['Technology', 'Financials', 'Consumer', 'Healthcare', 'Energy', 'ETF', 'Automotive'];

// Helper functions
export async function getStockByTicker(ticker: string): Promise<StockData | undefined> {
  const data = await fetchStockData(ticker);
  return data || undefined;
}

export async function getAllStocks(): Promise<StockData[]> {
  return await fetchMultipleStocks(POPULAR_TICKERS);
}

export async function getStocksBySector(sector: string): Promise<StockData[]> {
  const allStocks = await getAllStocks();
  return allStocks.filter(stock => stock.sector.toLowerCase() === sector.toLowerCase());
}

export function isValidTicker(ticker: string): boolean {
  // Allow any ticker since we now support search/lookup
  return true;
}

export async function resolveTicker(query: string): Promise<string | null> {
    // If it's already a valid ticker in our popular list, return it
    if (POPULAR_TICKERS.includes(query.toUpperCase())) {
        return query.toUpperCase();
    }

    // Otherwise search for it
    const results = await searchStocks(query);
    if (results && results.length > 0) {
        return results[0].symbol;
    }
    
    return null;
}
