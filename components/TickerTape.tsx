"use client";

import React, { useEffect, useState } from 'react';
import { TickerItem } from '../types';

const TickerItemDisplay: React.FC<TickerItem> = ({ symbol, price, change, isPositive }) => (
  <div className="inline-block px-8 text-[0.9rem] font-medium text-[#888888] font-mono">
    {symbol}: <span className={isPositive ? 'text-[#10b981] font-semibold ml-2' : 'text-[#ef4444] font-semibold ml-2'}>
      {price} ({change})
    </span>
  </div>
);

const TickerTape: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('/api/trending');
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            setItems(data.items);
          }
        }
      } catch (error) {
        console.error('Failed to fetch trending symbols:', error);
      }
    };

    fetchTrending();
  }, []);

  // Use default items if loading or error, otherwise use fetched items
  const displayItems = items.length > 0 ? [...items, ...items, ...items] : [
    { symbol: 'LOADING...', price: '...', change: '...', isPositive: true }
  ];

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