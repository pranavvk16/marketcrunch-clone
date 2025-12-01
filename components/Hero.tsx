'use client';

import React, { useState } from 'react';
import LiveAnalysis from './LiveAnalysis';

const Hero: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: searchValue }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setAnalysisResult(data);
    } catch (error) {
      alert("Error analyzing ticker. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative pt-[100px] pb-[80px] text-center overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08)_0%,rgba(5,5,5,0)_60%)]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-30 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"></div>

      <div className="max-w-[1200px] mx-auto px-5">
        <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-extrabold mb-[25px] leading-[1.1] text-white tracking-tight">
          AI-Driven Research &<br />Price Target
        </h1>

        <p className="text-[1.2rem] text-[#888888] mb-[15px] max-w-[650px] mx-auto font-normal">
          We analyze 350 million+ points everyday to create <strong>Daily and Weekly</strong> price signals.
        </p>

        <span className="inline-block font-semibold text-[#10b981] mb-[50px] bg-[#10b981]/10 px-3 py-1.5 rounded-[20px] text-[0.9rem] border border-[#10b981]/20">
          Over 73% win-rate in backtests.
        </span>

        <form
          onSubmit={handleSearch}
          className="max-w-[550px] mx-auto mb-[25px] relative flex flex-col md:flex-row rounded-[10px] bg-[#111111] p-[6px] border border-[#333333] focus-within:border-[#888888] transition-colors"
        >
          <input
            type="text"
            placeholder="Try Tesla, AAPL, GLD"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 p-[15px] px-[20px] border-none outline-none text-[1rem] bg-transparent text-white placeholder-[#555]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 md:mt-0 px-[30px] py-[12px] bg-white text-black rounded-lg font-semibold text-[0.95rem] tracking-tight hover:bg-[#e0e0e0] hover:-translate-y-[1px] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
          >
            {isLoading ? (
              <span><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Analyzing</span>
            ) : 'Try It Free'}
          </button>
        </form>

        {!analysisResult && !isLoading && (
          <p className="text-[0.85rem] text-[#555] tracking-wide">
            Join 5,000+ users tracking 10k+ tickers.
          </p>
        )}

        {/* Live Analysis Result */}
        {analysisResult && (
          <LiveAnalysis
            data={analysisResult}
            onClose={() => {
              setAnalysisResult(null);
              setSearchValue('');
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
