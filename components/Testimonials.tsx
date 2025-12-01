import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-[100px] bg-[#0a0a0a] border-t border-[#222]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center max-w-[800px] mx-auto">
          <h2 className="text-[2.8rem] mb-[15px] text-white tracking-tight font-bold">Thousands of Users Love Us:</h2>
          <p className="text-[1.1rem] text-[#888]">Get access to action, <strong>before</strong> it happens! Access our <strong>AI-driven Next-Day Screeners</strong>.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px] mt-[50px]">
          {[
            { quote: '"Trending tab tells me what the community\'s watching before it blows up on Reddit. I\'ve caught two momentum plays early this month alone."', name: 'Rob Pritchett', role: 'Inv Tech' },
            { quote: '"AI picks have quietly become my morning heat-check. When its high-confidence calls align with my model, I size up."', name: 'Novice Trader', role: 'At J.P. Morgan' },
            { quote: '"The Analysis screen nails it—price target, confidence bar, even back tests in one view. That dashboard replaced three tools I used to juggle."', name: 'S. Verma', role: 'PM @ Kaiser Permanente' },
            { quote: '"News Sentiment + Insider-selling blurbs are my go-to. With so much noise, their unemotional quant-scored info is valuable."', name: 'Philo B.', role: 'Wharton MBA/Active Trader' }
          ].map((t, i) => (
            <div key={i} className="bg-[#111111] p-[30px] rounded-2xl border border-[#333] text-[0.95rem]">
              <p className="text-[#ccc] mb-[20px] leading-[1.7]">{t.quote}</p>
              <div className="font-bold text-[0.95rem] text-white">{t.name}</div>
              <span className="text-[0.8rem] text-[#666]">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;