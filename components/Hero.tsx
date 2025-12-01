'use client';

import React, { useState, useEffect, useRef } from 'react';
import LiveAnalysis from './LiveAnalysis';

interface Suggestion {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}

const Hero: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openrouter'>('openrouter');
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{ success: boolean; message: string } | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load provider from localStorage on mount
  useEffect(() => {
    const savedProvider = localStorage.getItem('selectedProvider');
    if (savedProvider === 'openrouter' || savedProvider === 'gemini') {
      setSelectedProvider(savedProvider);
    }
  }, []);

  const handleProviderChange = (provider: 'gemini' | 'openrouter') => {
    setSelectedProvider(provider);
    localStorage.setItem('selectedProvider', provider);
    setPingResult(null);
  };

  const handlePing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await fetch(`/api/ping?provider=${selectedProvider}`);
      const data = await res.json();
      setPingResult({
        success: data.success,
        message: data.success ? `Connected to ${selectedProvider === 'gemini' ? 'Gemini' : 'Grok'}` : 'Connection failed'
      });
    } catch (error) {
      setPingResult({ success: false, message: 'Connection failed' });
    } finally {
      setIsPinging(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 1) {
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(value)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.results);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (symbol: string) => {
    setSearchValue(symbol);
    setShowSuggestions(false);
    handleSearch(new Event('submit') as any, symbol);
  };

  const handleSearch = async (e: React.FormEvent, overrideSymbol?: string) => {
    e.preventDefault();
    const symbolToAnalyze = overrideSymbol || searchValue;

    if (!symbolToAnalyze.trim()) return;

    setIsLoading(true);
    setAnalysisResult(null);
    setShowSuggestions(false);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: symbolToAnalyze,
          provider: selectedProvider
        }),
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
    <section className="relative pt-[100px] pb-[80px] text-center bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08)_0%,rgba(5,5,5,0)_60%)]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-[-1] opacity-30 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"></div>

      <div className="max-w-[1200px] mx-auto px-5">
        <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-extrabold mb-[25px] leading-[1.1] text-white tracking-tight">
          AI-Driven Research &<br />Price Target
        </h1>

        <p className="text-[1.2rem] text-[#888888] mb-[15px] max-w-[650px] mx-auto font-normal">
          We analyze 350 million+ points everyday to create <strong>Daily and Weekly</strong> price signals.
        </p>

        <span className="inline-block font-semibold text-[#10b981] mb-[30px] bg-[#10b981]/10 px-3 py-1.5 rounded-[20px] text-[0.9rem] border border-[#10b981]/20">
          Over 73% win-rate in backtests.
        </span>

        {/* AI Provider Selector */}
        <div className="flex flex-col items-center gap-3 mb-[30px]">
          <div className="flex items-center gap-2 bg-[#111] border border-[#333] rounded-lg p-1">
            <button
              onClick={() => handleProviderChange('gemini')}
              className={`px-4 py-2 rounded-md text-sm transition-all ${selectedProvider === 'gemini'
                ? 'bg-[#00c08b] text-black font-medium'
                : 'text-[#888] hover:text-white'
                }`}
            >
              Gemini
            </button>
            <button
              onClick={() => handleProviderChange('openrouter')}
              className={`px-4 py-2 rounded-md text-sm transition-all ${selectedProvider === 'openrouter'
                ? 'bg-[#00c08b] text-black font-medium'
                : 'text-[#888] hover:text-white'
                }`}
            >
              Grok (Beta)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="text-xs text-[#666] hover:text-[#00c08b] transition-colors flex items-center gap-1"
            >
              {isPinging ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fa-solid fa-plug"></i>
              )}
              Test Connection
            </button>

            {pingResult && (
              <span className={`text-xs ${pingResult.success ? 'text-green-500' : 'text-red-500'}`}>
                {pingResult.success ? '● Online' : '● Offline'}
              </span>
            )}
          </div>
        </div>

        <div ref={searchRef} className="max-w-[550px] mx-auto mb-[25px] relative">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row rounded-[10px] bg-[#111111] p-[6px] border border-[#333333] focus-within:border-[#888888] transition-colors relative z-20"
          >
            <input
              type="text"
              placeholder="Try Tesla, AAPL, GLD"
              value={searchValue}
              onChange={handleInputChange}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
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

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl overflow-hidden z-50 text-left">
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.symbol}-${index}`}
                  onClick={() => handleSelectSuggestion(suggestion.symbol)}
                  className="px-4 py-3 hover:bg-[#2a2a2a] cursor-pointer border-b border-[#333] last:border-none transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{suggestion.symbol}</span>
                    <span className="text-xs text-[#666] uppercase">{suggestion.exchange}</span>
                  </div>
                  <div className="text-sm text-[#888] truncate">{suggestion.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

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
