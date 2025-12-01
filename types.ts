export interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

// Stock Data Types
export interface StockData {
  ticker: string;
  name: string;
  currentPrice: number;
  sector: string;
  marketCap: 'Large' | 'Mid' | 'Small';
}

export interface TechnicalSignal {
  signal: string;
  type: 'Bullish' | 'Bearish';
}

export interface StockPrediction {
  symbol: string;
  currentPrice: string;
  nextDayTarget: string;
  nextDayChangePercent: string;
  weeklyMin: string;
  weeklyMax: string;
  confidenceScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  volatilityScore: number;
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  momentumScore: number;
  explanation: string;
  sentiment: string;
  sentimentReason: string;
  backtestWinRate: string;
  backtestSharpe: string;
  technicalSignals: TechnicalSignal[];
}
