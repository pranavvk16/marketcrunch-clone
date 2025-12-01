import React from 'react';

const TradeWalkthrough: React.FC = () => {
  return (
    <section className="py-[100px] bg-[#050505]">
      <div className="max-w-[1200px] mx-auto px-5 text-center">
        <h2 className="text-[2.8rem] mb-[15px] text-white tracking-tight font-bold">User Trade Walk-Through</h2>
        <p className="text-[1.1rem] text-[#888] mb-[40px]">See how a user tracked $5,000 using MarketCrunch.</p>
        
        <div className="flex flex-wrap justify-center md:justify-between mt-[50px] relative gap-[15px]">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#333] z-0 -translate-y-1/2"></div>
          
          {[
            { day: 'Day 1', price: 'AAPL $200.00', gain: '+2.25%', isGain: true },
            { day: 'Day 2', price: 'AAPL $203.75', gain: '+1.6%', isGain: true },
            { day: 'Day 3', price: 'AAPL $206.50', gain: '-1.2%', isGain: false },
            { day: 'Day 4', price: 'AAPL $203.80', gain: '-1.4%', isGain: false },
            { day: 'Day 5', price: 'AAPL $201.50', gain: '+1.7%', isGain: true },
          ].map((day) => (
            <div key={day.day} className="bg-[#111111] z-10 p-[15px] border border-[#333] rounded-xl w-[45%] md:w-[18%] text-center shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <span className="font-bold mb-[5px] block text-white">{day.day}</span>
              <span className="text-[0.9rem] text-[#777] font-mono">{day.price}</span>
              <span className={`text-[0.9rem] font-semibold mt-[8px] block ${day.isGain ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                {day.gain}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradeWalkthrough;