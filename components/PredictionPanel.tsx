import React from 'react';
import { StockPrediction } from '../types';

interface PredictionPanelProps {
    data: StockPrediction;
    onClose: () => void;
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-[#111111] rounded-2xl p-[30px] border border-[#333333] relative overflow-hidden group ${className}`}>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        {children}
    </div>
);

const ProgressBar: React.FC<{ value: number; colorClass?: string }> = ({ value, colorClass = "from-[#fbbf24] to-[#10b981]" }) => (
    <div className="h-[6px] bg-[#222] rounded-[4px] mt-2 overflow-hidden">
        <div
            className={`h-full bg-gradient-to-r ${colorClass}`}
            style={{ width: `${value}%` }}
        ></div>
    </div>
);

const PredictionPanel: React.FC<PredictionPanelProps> = ({ data, onClose }) => {
    const isPositive = !data.nextDayChangePercent.includes('-');

    // Sentiment Styling
    const sentimentKey = data.sentiment.toLowerCase();
    let sentimentColor = 'text-[#fbbf24]';
    let sentimentBg = 'bg-[#fbbf24]/10';
    let sentimentBorder = 'border-[#fbbf24]/20';

    if (sentimentKey.includes('pos') || sentimentKey.includes('bull')) {
        sentimentColor = 'text-[#10b981]';
        sentimentBg = 'bg-[#10b981]/10';
        sentimentBorder = 'border-[#10b981]/20';
    } else if (sentimentKey.includes('neg') || sentimentKey.includes('bear')) {
        sentimentColor = 'text-[#ef4444]';
        sentimentBg = 'bg-[#ef4444]/10';
        sentimentBorder = 'border-[#ef4444]/20';
    }

    // Trend Styling
    const isBullish = data.trend === "Bullish";
    const trendIcon = isBullish ? "fa-arrow-trend-up" : (data.trend === "Bearish" ? "fa-arrow-trend-down" : "fa-minus");
    const trendColor = isBullish ? "text-[#10b981]" : (data.trend === "Bearish" ? "text-[#ef4444]" : "text-[#888]");

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen px-6 py-12">
                <div className="max-w-[1200px] mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-8 border-b border-[#333] pb-6">
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-4xl font-bold text-white tracking-tight">{data.symbol}</h2>
                                <span className={`px-3 py-1 rounded text-sm font-bold border ${sentimentBg} ${sentimentColor} ${sentimentBorder}`}>
                                    {data.sentiment} Outlook
                                </span>
                            </div>
                            <p className="text-[#888] mt-1 text-sm">AI-Generated Forecast & Risk Analysis</p>
                        </div>
                        <button onClick={onClose} className="text-[#888] hover:text-white flex items-center gap-2 transition-colors">
                            <i className="fa-solid fa-xmark"></i> Close
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* 1. Forecast Card */}
                        <Card className="border-[#00c08b]/20 shadow-[0_0_40px_-10px_rgba(0,192,139,0.1)]">
                            <div className="flex items-center gap-2.5 mb-5">
                                <i className="fa-solid fa-bullseye text-[#00c08b]"></i>
                                <h3 className="text-lg font-semibold text-white">Price Targets</h3>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs text-[#888] mb-1">Next Day Target</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-bold text-white">{data.nextDayTarget}</span>
                                    <span className={`text-lg font-medium ${isPositive ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                                        {data.nextDayChangePercent}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#222] mb-5">
                                <div className="flex justify-between text-xs text-[#888] mb-2">
                                    <span>Weekly Range (Min - Max)</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-mono text-white">
                                    <span className="text-[#ef4444]">{data.weeklyMin}</span>
                                    <div className="flex-1 mx-3 h-[2px] bg-[#333]"></div>
                                    <span className="text-[#10b981]">{data.weeklyMax}</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs text-[#888] mb-1">
                                    <span>Model Confidence</span>
                                    <span>{data.confidenceScore}%</span>
                                </div>
                                <ProgressBar value={data.confidenceScore} />
                            </div>
                        </Card>

                        {/* 2. Deep Dive / Momentum Card */}
                        <Card>
                            <div className="flex items-center gap-2.5 mb-5">
                                <i className="fa-solid fa-layer-group text-blue-400"></i>
                                <h3 className="text-lg font-semibold text-white">Trend & Volatility</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
                                    <div className="text-xs text-[#888] mb-1">Trend</div>
                                    <div className={`text-lg font-bold flex items-center gap-2 ${trendColor}`}>
                                        <i className={`fa-solid ${trendIcon}`}></i>
                                        {data.trend}
                                    </div>
                                </div>
                                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
                                    <div className="text-xs text-[#888] mb-1">Risk Level</div>
                                    <div className={`text-lg font-bold ${data.riskLevel === 'High' || data.riskLevel === 'Extreme' ? 'text-[#ef4444]' : 'text-white'}`}>
                                        {data.riskLevel}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs text-[#888]">
                                        <span>Momentum Strength</span>
                                        <span className="text-white">{data.momentumScore}/100</span>
                                    </div>
                                    <ProgressBar value={data.momentumScore} colorClass="from-blue-600 to-purple-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-[#888]">
                                        <span>Volatility</span>
                                        <span className="text-white">{data.volatilityScore}/100</span>
                                    </div>
                                    <ProgressBar value={data.volatilityScore} colorClass="from-green-500 to-red-500" />
                                </div>
                            </div>
                        </Card>

                        {/* 3. Explainable AI & Technicals */}
                        <Card>
                            <div className="flex items-center gap-2.5 mb-5">
                                <i className="fa-solid fa-microchip text-purple-400"></i>
                                <h3 className="text-lg font-semibold text-white">XAI Insights</h3>
                            </div>

                            <p className="text-sm text-[#ccc] leading-relaxed mb-5 p-3 bg-[#1a1a1a] rounded-lg border border-[#333]">
                                "{data.explanation}"
                            </p>

                            <h4 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-3">Key Signals</h4>
                            <div className="space-y-2.5">
                                {data.technicalSignals.map((sig, idx) => (
                                    <div key={idx} className={`text-xs px-3 py-2 rounded border flex justify-between items-center ${sig.type === 'Bullish' ? 'border-[#10b981]/20 bg-[#10b981]/5 text-[#10b981]' : 'border-[#ef4444]/20 bg-[#ef4444]/5 text-[#ef4444]'}`}>
                                        <span className="font-medium">{sig.signal}</span>
                                        <span className="font-bold text-[10px] uppercase tracking-wide bg-black/30 px-1.5 py-0.5 rounded">{sig.type}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* 4. Backtest Stats (Full Width) */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                            <Card className="flex flex-col md:flex-row items-center justify-between gap-6 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-white">
                                        <i className="fa-solid fa-clock-rotate-left"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Historical Backtest</h4>
                                        <p className="text-xs text-[#888]">Model performance on similar patterns</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 text-center">
                                    <div>
                                        <div className="text-xs text-[#888] mb-1">Win Rate</div>
                                        <div className="text-xl font-bold text-[#10b981]">{data.backtestWinRate}</div>
                                    </div>
                                    <div className="w-[1px] bg-[#333] h-10"></div>
                                    <div>
                                        <div className="text-xs text-[#888] mb-1">Sharpe Ratio</div>
                                        <div className="text-xl font-bold text-white">{data.backtestSharpe}</div>
                                    </div>
                                    <div className="w-[1px] bg-[#333] h-10"></div>
                                    <div>
                                        <div className="text-xs text-[#888] mb-1">Alpha</div>
                                        <div className="text-xl font-bold text-blue-400">+4.2%</div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionPanel;
