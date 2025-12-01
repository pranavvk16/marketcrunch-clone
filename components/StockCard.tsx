import React from 'react';
import { StockData } from '../types';

interface StockCardProps {
    stock: StockData;
    onAnalyze: (ticker: string) => void;
    isAnalyzing: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onAnalyze, isAnalyzing }) => {
    // Calculate a mock daily change for visual interest (deterministic based on price)
    const mockChange = ((stock.currentPrice * 0.618) % 5) - 2.5;
    const isPositive = mockChange >= 0;

    const sectorColors: Record<string, string> = {
        'Technology': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Financials': 'bg-green-500/10 text-green-400 border-green-500/20',
        'Consumer': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'Healthcare': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
        'Energy': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        'ETF': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        'Automotive': 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    const sectorColor = sectorColors[stock.sector] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

    return (
        <div className="bg-[#111] border border-[#333] rounded-xl p-6 hover:border-[#00c08b] transition-all group relative overflow-hidden">
            {/* Hover gradient effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00c08b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{stock.ticker}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs border ${sectorColor}`}>
                            {stock.sector}
                        </span>
                    </div>
                    <p className="text-sm text-[#888] line-clamp-1">{stock.name}</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">${stock.currentPrice.toFixed(2)}</span>
                    <span className={`text-sm font-medium ${isPositive ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                        {isPositive ? '+' : ''}{mockChange.toFixed(2)}%
                    </span>
                </div>
            </div>

            <button
                onClick={() => onAnalyze(stock.ticker)}
                disabled={isAnalyzing}
                className={`w-full py-3 rounded-lg font-medium transition-all ${isAnalyzing
                        ? 'bg-[#00c08b]/20 text-[#00c08b] cursor-wait'
                        : 'bg-[#00c08b] hover:bg-[#00d89f] text-black hover:scale-[1.02] active:scale-[0.98]'
                    }`}
            >
                {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Analyzing...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-chart-line"></i>
                        AI Forecast
                    </span>
                )}
            </button>
        </div>
    );
};

export default StockCard;
