'use client';

import React, { useState, useEffect } from 'react';
import { StockData, StockPrediction } from '../../types';
import StockCard from '../../components/StockCard';
import PredictionPanel from '../../components/PredictionPanel';

export default function Dashboard() {
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStock, setSelectedStock] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<StockPrediction | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');

    // Fetch stocks on mount
    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/stocks');
            const data = await response.json();

            if (data.success) {
                setStocks(data.stocks);
            } else {
                setError('Failed to load stocks');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async (ticker: string) => {
        setSelectedStock(ticker);
        setPrediction(null); // Clear previous prediction

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symbol: ticker })
            });

            const data = await response.json();

            if (response.ok) {
                setPrediction(data);
            } else {
                console.error('Analysis failed:', data.error);
                alert(data.error || 'Failed to analyze stock');
                setSelectedStock(null);
            }
        } catch (err) {
            console.error('Error analyzing stock:', err);
            alert('Error analyzing stock. Please try again.');
            setSelectedStock(null);
        }
    };

    const handleClosePrediction = () => {
        setSelectedStock(null);
        setPrediction(null);
    };

    // Filter stocks
    const filteredStocks = stocks.filter(stock => {
        const matchesSearch = stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
        return matchesSearch && matchesSector;
    });

    const sectors = ['All', 'Technology', 'Financials', 'Consumer', 'Healthcare', 'Energy', 'ETF', 'Automotive'];

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Header */}
            <header className="border-b border-[#222] bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-[1400px] mx-auto px-6 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-[#00c08b] to-white bg-clip-text text-transparent">
                                Stock Dashboard
                            </h1>
                            <p className="text-[#888] mt-1">AI-powered predictions for 25 popular stocks</p>
                        </div>
                        <a
                            href="/"
                            className="px-4 py-2 bg-[#111] border border-[#333] rounded-lg hover:border-[#00c08b] transition-colors text-sm"
                        >
                            ← Back to Home
                        </a>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"></i>
                                <input
                                    type="text"
                                    placeholder="Search stocks by ticker or name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#111] border border-[#333] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#666] focus:border-[#00c08b] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            {sectors.map(sector => (
                                <button
                                    key={sector}
                                    onClick={() => setSelectedSector(sector)}
                                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${selectedSector === sector
                                        ? 'bg-[#00c08b] text-black font-medium'
                                        : 'bg-[#111] border border-[#333] hover:border-[#00c08b] text-white'
                                        }`}
                                >
                                    {sector}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00c08b] border-t-transparent"></div>
                        <p className="mt-4 text-[#888]">Loading stocks...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
                        <i className="fa-solid fa-exclamation-circle text-red-500 text-2xl mb-2"></i>
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={fetchStocks}
                            className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="mb-6 text-sm text-[#888]">
                            Showing {filteredStocks.length} of {stocks.length} stocks
                            {selectedSector !== 'All' && ` in ${selectedSector}`}
                        </div>

                        {/* Stock Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredStocks.map(stock => (
                                <StockCard
                                    key={stock.ticker}
                                    stock={stock}
                                    onAnalyze={handleAnalyze}
                                    isAnalyzing={selectedStock === stock.ticker && !prediction}
                                />
                            ))}
                        </div>

                        {filteredStocks.length === 0 && (
                            <div className="text-center py-20">
                                <i className="fa-solid fa-magnifying-glass text-[#333] text-4xl mb-4"></i>
                                <p className="text-[#666]">No stocks found matching your criteria</p>
                            </div>
                        )}
                    </>
                )}

                {/* Prediction Panel */}
                {prediction && selectedStock && (
                    <PredictionPanel
                        data={prediction}
                        onClose={handleClosePrediction}
                    />
                )}
            </main>
        </div>
    );
}
