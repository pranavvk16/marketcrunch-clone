'use client';

import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [testingAI, setTestingAI] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const testAIConnection = async () => {
    setTestingAI(true);
    setTestResult(null);

    try {
      const provider = localStorage.getItem('selectedProvider') || 'openrouter';
      const response = await fetch(`/api/ping?provider=${provider}`);
      const data = await response.json();

      setTestResult({
        success: data.success,
        message: data.message
      });

      setTimeout(() => setTestResult(null), 5000);
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to connect to backend'
      });
      setTimeout(() => setTestResult(null), 5000);
    } finally {
      setTestingAI(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-md border-b border-[#333333] py-[18px]"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 0, #ffffff14 0%, #05050500 60%)' }}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        <nav className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-white flex items-center gap-2.5 tracking-tight hover:text-white/90 transition-colors">
            <span className="text-[#00c08b]"><i className="fa-solid fa-chart-line"></i></span> MarketCrunch AI
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href="/#features" className="hover:text-[#00c08b] transition-colors">Features</a>
            <a href="/#how-it-works" className="hover:text-[#00c08b] transition-colors">How it Works</a>
            <a href="/dashboard" className="hover:text-[#00c08b] transition-colors font-semibold">Dashboard</a>

            {/* AI Test Button */}
            <button
              onClick={testAIConnection}
              disabled={testingAI}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${testingAI
                ? 'bg-[#222] text-[#888] cursor-wait'
                : 'bg-[#1a1a1a] text-white border border-[#333] hover:border-[#00c08b]'
                }`}
            >
              {testingAI ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Testing...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-flask"></i>
                  Test AI
                </>
              )}
            </button>

            <button className="px-6 py-2.5 bg-[#00c08b] hover:bg-[#00d89f] text-black font-semibold rounded-lg transition-all hover:scale-105">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-2xl text-white cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </nav>

        {/* Test Result Toast */}
        {testResult && (
          <div className={`mt-4 p-3 rounded-lg border ${testResult.success
            ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]'
            : 'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444]'
            } text-sm font-medium flex items-center gap-2`}>
            <i className={`fa-solid ${testResult.success ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {testResult.message}
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-b border-[#333]">
            <a href="/#features" className="font-medium text-[#888888] hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="/#how-it-works" className="font-medium text-[#888888] hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>How it Works</a>
            <a href="/dashboard" className="font-medium text-[#00c08b] hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</a>

            {/* Mobile AI Test Button */}
            <button
              onClick={testAIConnection}
              disabled={testingAI}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 justify-center ${testingAI
                ? 'bg-[#222] text-[#888] cursor-wait'
                : 'bg-[#1a1a1a] text-white border border-[#333]'
                }`}
            >
              {testingAI ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Testing AI...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-flask"></i>
                  Test AI Connection
                </>
              )}
            </button>

            <button className="px-6 py-2.5 bg-[#00c08b] hover:bg-[#00d89f] text-black font-semibold rounded-lg transition-all">
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;