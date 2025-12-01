import React from 'react';

const EdgeSection: React.FC = () => {
  return (
    <section className="py-[100px] bg-[#050505] border-t border-[#333333]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
          <div>
            <h2 className="text-[3rem] mb-[25px] leading-[1.1] tracking-tight font-bold text-white">MarketCrunchAI's Edge</h2>
            <p className="text-[#888] text-[1.1rem] mb-[30px]">
              We do the math—to give you an edge. AI-powered research has revolutionized investing, but such tools are privy to large institutions. We are on a mission to bring quant-based research to all investors.
            </p>
            <p className="text-[1.1rem] font-bold text-white">Stop Charting :)</p>
          </div>
          
          <div className="bg-[#111111] rounded-[20px] p-[35px] border border-[#333] relative overflow-hidden">
            {/* Grid Lines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0 rounded-[20px]"></div>

            <h3 className="mb-[15px] text-[1.1rem] text-white relative z-10 font-semibold">Our multi-factor neural network analyzes millions of datapoints.</h3>
            
            <div className="grid grid-cols-2 gap-5 mt-[25px] relative z-10">
              {[
                { title: 'Price History', desc: 'Historical patterns & anomalies' },
                { title: 'Technical Indicators', desc: 'MACD, RSI, Moving Averages' },
                { title: 'News Sentiment', desc: 'Real-time analysis of market news' },
                { title: 'Insider Trading', desc: 'Track public SEC Form filings' }
              ].map((item) => (
                <div key={item.title} className="bg-[#1a1a1a] p-5 rounded-xl border border-[#333] hover:border-[#555] hover:bg-[#222] transition-colors duration-200">
                  <h4 className="text-[0.95rem] mb-1.5 text-white font-medium">{item.title}</h4>
                  <p className="text-[0.8rem] text-[#888] leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EdgeSection;