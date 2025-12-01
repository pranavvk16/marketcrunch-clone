import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-[100px] bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center max-w-[800px] mx-auto mb-[70px]">
          <h2 className="text-[2.8rem] mb-[15px] text-white tracking-tight font-bold">How It Works</h2>
          <p className="text-[1.1rem] text-[#888]">Our AI-Driven signal. Your Strategy.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-[30px] mt-[60px]">
          {[
            { num: 1, title: 'Find an Opportunity', desc: 'Analyze a specific stock or select from curated AI Picks.' },
            { num: 2, title: 'Review our AI-Signal', desc: 'Reconcile our signal with news, technicals, insider trading, etc.' },
            { num: 3, title: 'Trade Your Strategy', desc: 'Execute the edge with your broker. We don\'t transmit orders.' }
          ].map((step) => (
            <div key={step.num} className="flex-1 bg-[#111111] px-[30px] py-[40px] rounded-2xl border border-[#333] relative">
              <span className="inline-block w-[45px] h-[45px] bg-white/5 text-[#00c08b] rounded-[10px] text-center leading-[45px] font-bold text-[1.2rem] mb-[25px] border border-[#333]">
                {step.num}
              </span>
              <h3 className="text-[1.3rem] mb-[12px] text-white font-semibold">{step.title}</h3>
              <p className="text-[#888] text-[1rem] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;