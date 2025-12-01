export interface StockData {
  ticker: string;
  name: string;
  currentPrice: number;
  sector: string;
  marketCap: 'Large' | 'Mid' | 'Small';
}

// 25 Popular stocks with realistic Dec 2024 pricing
export const POPULAR_STOCKS: StockData[] = [
  // Technology
  { ticker: 'AAPL', name: 'Apple Inc.', currentPrice: 195.50, sector: 'Technology', marketCap: 'Large' },
  { ticker: 'MSFT', name: 'Microsoft Corporation', currentPrice: 378.25, sector: 'Technology', marketCap: 'Large' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 142.80, sector: 'Technology', marketCap: 'Large' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', currentPrice: 155.30, sector: 'Technology', marketCap: 'Large' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', currentPrice: 495.20, sector: 'Technology', marketCap: 'Large' },
  { ticker: 'META', name: 'Meta Platforms Inc.', currentPrice: 345.75, sector: 'Technology', marketCap: 'Large' },
  { ticker: 'TSLA', name: 'Tesla Inc.', currentPrice: 242.80, sector: 'Automotive', marketCap: 'Large' },
  { ticker: 'AMD', name: 'Advanced Micro Devices', currentPrice: 138.50, sector: 'Technology', marketCap: 'Large' },
  
  // Financials
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', currentPrice: 158.40, sector: 'Financials', marketCap: 'Large' },
  { ticker: 'BAC', name: 'Bank of America Corp.', currentPrice: 35.20, sector: 'Financials', marketCap: 'Large' },
  { ticker: 'GS', name: 'Goldman Sachs Group', currentPrice: 385.60, sector: 'Financials', marketCap: 'Large' },
  { ticker: 'V', name: 'Visa Inc.', currentPrice: 272.90, sector: 'Financials', marketCap: 'Large' },
  
  // Consumer
  { ticker: 'WMT', name: 'Walmart Inc.', currentPrice: 158.30, sector: 'Consumer', marketCap: 'Large' },
  { ticker: 'DIS', name: 'Walt Disney Company', currentPrice: 94.50, sector: 'Consumer', marketCap: 'Large' },
  { ticker: 'NKE', name: 'Nike Inc.', currentPrice: 78.20, sector: 'Consumer', marketCap: 'Large' },
  { ticker: 'COST', name: 'Costco Wholesale', currentPrice: 658.40, sector: 'Consumer', marketCap: 'Large' },
  
  // Healthcare
  { ticker: 'JNJ', name: 'Johnson & Johnson', currentPrice: 156.80, sector: 'Healthcare', marketCap: 'Large' },
  { ticker: 'PFE', name: 'Pfizer Inc.', currentPrice: 27.90, sector: 'Healthcare', marketCap: 'Large' },
  { ticker: 'UNH', name: 'UnitedHealth Group', currentPrice: 512.30, sector: 'Healthcare', marketCap: 'Large' },
  
  // Energy
  { ticker: 'XOM', name: 'Exxon Mobil Corporation', currentPrice: 108.75, sector: 'Energy', marketCap: 'Large' },
  { ticker: 'CVX', name: 'Chevron Corporation', currentPrice: 152.40, sector: 'Energy', marketCap: 'Large' },
  
  // ETFs
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF', currentPrice: 475.60, sector: 'ETF', marketCap: 'Large' },
  { ticker: 'QQQ', name: 'Invesco QQQ Trust', currentPrice: 395.80, sector: 'ETF', marketCap: 'Large' },
  { ticker: 'DIA', name: 'SPDR Dow Jones Industrial Average ETF', currentPrice: 398.20, sector: 'ETF', marketCap: 'Large' },
  { ticker: 'IWM', name: 'iShares Russell 2000 ETF', currentPrice: 207.50, sector: 'ETF', marketCap: 'Large' },
];

// Helper functions
export function getStockByTicker(ticker: string): StockData | undefined {
  return POPULAR_STOCKS.find(stock => stock.ticker.toUpperCase() === ticker.toUpperCase());
}

export function getAllStocks(): StockData[] {
  return POPULAR_STOCKS;
}

export function getStocksBySector(sector: string): StockData[] {
  return POPULAR_STOCKS.filter(stock => stock.sector.toLowerCase() === sector.toLowerCase());
}

export function isValidTicker(ticker: string): boolean {
  return POPULAR_STOCKS.some(stock => stock.ticker.toUpperCase() === ticker.toUpperCase());
}

export const SECTORS = ['Technology', 'Financials', 'Consumer', 'Healthcare', 'Energy', 'ETF', 'Automotive'];
