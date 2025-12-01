import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] pt-[80px] pb-[30px] border-t border-[#333]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-[80px]">
          <h2 className="text-[2.5rem] mb-[30px] tracking-tight font-bold text-white">Founded on Democracy, Built by Experts</h2>
          <button className="px-[28px] py-[12px] rounded-lg font-semibold text-[0.95rem] bg-white text-black hover:bg-[#e0e0e0] hover:-translate-y-[1px] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300">
            Dashboard
          </button>
        </div>

        <div className="text-center mb-[60px]">
          <p className="mb-[25px] font-semibold tracking-[2px] text-[#444] text-[0.75rem] uppercase">BACKED BY EXPERTS FROM</p>
          <div className="opacity-40 text-white flex justify-center gap-8 items-center flex-wrap text-2xl">
            <i className="fa-brands fa-amazon hover:text-white transition-colors"></i>
            <i className="fa-brands fa-apple hover:text-white transition-colors"></i>
            <i className="fa-brands fa-meta hover:text-white transition-colors"></i>
            <i className="fa-brands fa-pinterest hover:text-white transition-colors"></i>
            <span className="font-serif font-bold text-lg hover:text-white transition-colors">WHARTON</span>
            <span className="font-serif font-bold text-lg hover:text-white transition-colors">UC BERKELEY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-[40px] mb-[60px] text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="text-2xl font-bold text-white flex items-center gap-2.5 tracking-tight mb-5">
              <span className="text-[#00c08b]"><i className="fa-solid fa-chart-line"></i></span> MarketCrunch AI
            </a>
            <p className="text-[0.9rem] text-[#888]">
              Feedback: support@marketcrunch.ai<br />
              Sales: info@marketcrunch.ai
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-[25px] text-white text-[1rem]">Helpful Links</h4>
            <ul className="space-y-[12px]">
              <li><a href="#" className="text-[#777] text-[0.9rem] hover:text-white transition-colors">FINRA - Investing Basics</a></li>
              <li><a href="#" className="text-[#777] text-[0.9rem] hover:text-white transition-colors">Investor.gov (SEC)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-[25px] text-white text-[1rem]">Resources</h4>
            <ul className="space-y-[12px]">
              <li><a href="#" className="text-[#777] text-[0.9rem] hover:text-white transition-colors">Trending</a></li>
              <li><a href="#" className="text-[#777] text-[0.9rem] hover:text-white transition-colors">AI Picks</a></li>
              <li><a href="#" className="text-[#777] text-[0.9rem] hover:text-white transition-colors">All Stocks & ETFs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-[25px] text-white text-[1rem]">Social</h4>
            <div className="text-[1.5rem] text-[#888] space-x-4">
              <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
        </div>

        <div className="text-center text-[#444] text-[0.8rem] pt-[30px] border-t border-[#1a1a1a]">
          <p>Disclaimer | Terms | Privacy</p>
          <p className="mt-[10px]">&copy; 2025 MarketCrunch AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;