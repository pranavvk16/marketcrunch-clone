import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-[#111111] rounded-2xl p-[30px] border border-[#333333] transition-all duration-300 hover:-translate-y-1 hover:border-[#555] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden group ${className}`}>
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    {children}
  </div>
);

const CardHeader: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <div className="flex items-center mb-[25px] gap-3">
    <i className={`${icon} text-white text-[1.1rem] bg-white/5 p-2 rounded-lg`}></i>
    <h3 className="text-[1.1rem] font-semibold text-white">{title}</h3>
  </div>
);

const DashboardPreview: React.FC = () => {
  return (
    <section className="py-[100px] bg-[#050505]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center max-w-[800px] mx-auto mb-[70px]">
          <h2 className="text-[2.8rem] mb-[15px] text-white tracking-tight font-bold">Everything You Need In One Dashboard</h2>
          <p className="text-[1.1rem] text-[#888888]">Access comprehensive analysis, backtesting results, and real-time insights for smarter investment decisions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-[60px]">
          {/* Card 1: AI Signal */}
          <Card>
            <CardHeader icon="fa-solid fa-bolt" title="AI-Signal (Next Day)" />
            <div className="flex justify-between mb-3 text-[0.9rem]">
              <span className="text-[#888]">Estimate: <strong className="text-white">$201.50</strong> <span className="text-[#10b981]">(1.24%)</span></span>
            </div>
            <div className="mb-3 text-[0.8rem] text-[#666]">
              Directional Accuracy (last 90d): 72%
            </div>
            <div className="mt-2.5">
              <span className="text-[0.8rem] text-[#666]">Confidence Level</span>
              <div className="h-[6px] bg-[#222] rounded-[4px] my-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#fbbf24] to-[#10b981] w-[90%]"></div>
              </div>
              <div className="text-right text-[0.8rem] text-[#888]">90%</div>
            </div>
          </Card>

          {/* Card 2: Backtested Signal */}
          <Card>
            <CardHeader icon="fa-solid fa-chart-column" title="Backtested Signal" />
            <div className="flex justify-between mb-3 text-[0.9rem]">
              <span className="text-[#888]">Our Predictions</span>
              <span className="font-semibold text-[#10b981]">+11.3%</span>
            </div>
            <div className="flex justify-between mb-3 text-[0.9rem]">
              <span className="text-[#888]">Buy and Hold</span>
              <span className="font-semibold text-[#ef4444]">-3.7%</span>
            </div>
            <div className="flex gap-5 mt-[15px]">
              {[{ l: 'Sharpe', v: '1.3' }, { l: 'Drawdown', v: '15%' }, { l: 'Win Ratio', v: '56%' }].map(s => (
                <div key={s.l}>
                  <div className="text-[0.75rem] text-[#888]">{s.l}</div>
                  <div className="font-semibold text-white">{s.v}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 3: News Sentiments */}
          <Card>
            <CardHeader icon="fa-regular fa-newspaper" title="News Sentiments" />
            <div className="bg-[#ef4444]/10 text-[#ef4444] px-2.5 py-1.5 rounded-md text-[0.8rem] font-semibold inline-block mb-[15px] border border-[#ef4444]/20">
              Very Negative
            </div>
            <p className="text-[0.9rem] text-white mt-2.5 leading-relaxed">
              Tariff threats hurt iPhones despite lobbying efforts (negative bias).
            </p>
          </Card>

          {/* Card 4: Insider Trading */}
          <Card>
            <CardHeader icon="fa-solid fa-briefcase" title="Insider Trading Activity" />
            <p className="text-[0.85rem] text-[#888] mb-2 leading-relaxed">
              <strong className="text-[#ef4444]">Selling:</strong> CFO Luca Maestri sold $5M+ shares combined.
            </p>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              <strong className="text-[#10b981]">Hedge Funds:</strong> Both buoyant activity reflecting cautious optimism.
            </p>
          </Card>

          {/* Card 5: Social Chatter */}
          <Card>
            <CardHeader icon="fa-solid fa-comments" title="Social Chatter" />
            <div className="flex justify-between items-center mb-3">
              <span className="text-[0.85rem] text-[#ff4500]"><strong>YOLO Trades</strong> (r/wallstreetbets)</span>
              <span className="text-[0.75rem] text-[#666]">No Comments</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[0.85rem] text-[#0079d3]"><strong>Volatility Analysis</strong> (r/daytrading)</span>
              <span className="text-[0.75rem] text-[#666]">1 min ago</span>
            </div>
          </Card>

          {/* Card 6: Technical Analysis */}
          <Card>
            <CardHeader icon="fa-solid fa-magnifying-glass-chart" title="Technical Analysis" />
            <p className="text-[0.85rem] text-[#888] mb-2.5">
              <strong>Key Insight:</strong> Momentum is bearish with medium conviction.
            </p>
            <div className="flex gap-2.5">
              <div className="flex-1 bg-[#10b981]/10 text-[#10b981] p-2 text-[0.75rem] rounded-md border border-[#10b981]/20">
                <strong>(+) Factors</strong><br />EMAS<br />MACD
              </div>
              <div className="flex-1 bg-[#ef4444]/10 text-[#ef4444] p-2 text-[0.75rem] rounded-md border border-[#ef4444]/20">
                <strong>(-) Factors</strong><br />VIX Gap<br />Month End
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="mb-5 font-medium text-[#888]">See the Full Report</p>
          <a
            href="/dashboard"
            className="inline-block px-[28px] py-[12px] rounded-lg font-semibold text-[0.95rem] bg-white text-black hover:bg-[#e0e0e0] hover:-translate-y-[1px] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 tracking-tight"
          >
            View Live Dashboard
          </a>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;