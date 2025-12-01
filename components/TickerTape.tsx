import React from 'react';
import { TickerItem } from '../types';

const items: TickerItem[] = [
  { symbol: 'DAL', price: '$64.10', change: '-0.26%', isPositive: false },
  { symbol: 'SPY', price: '$683.39', change: '0.54%', isPositive: true },
  { symbol: 'QBTS', price: '$22.67', change: '1.16%', isPositive: true },
  { symbol: 'GLD', price: '$387.88', change: '1.24%', isPositive: true },
  { symbol: 'AAPL', price: '$278.85', change: '0.47%', isPositive: true },
  { symbol: 'QQQ', price: '$619.25', change: '0.81%', isPositive: true },
];

const TickerItemDisplay: React.FC<TickerItem> = ({ symbol, price, change, isPositive }) => (
  <div className="inline-block px-8 text-[0.9rem] font-medium text-[#888888] font-mono">
    {symbol}: <span className={isPositive ? 'text-[#10b981] font-semibold ml-2' : 'text-[#ef4444] font-semibold ml-2'}>
      {price} ({change})
    </span>
  </div>
);

const TickerTape: React.FC = () => {
  // Duplicate items for seamless loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-[#050505] py-[15px] border-t border-b border-[#333333] whitespace-nowrap">
      <div className="animate-ticker inline-block">
        {displayItems.map((item, index) => (
          <TickerItemDisplay key={`${item.symbol}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TickerTape;