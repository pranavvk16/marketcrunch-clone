import React from 'react';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'MarketCrunch AI',
  description: 'AI-Driven Research & Price Target dashboard for investors.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <style dangerouslySetInnerHTML={{
          __html: `
          body {
              font-family: 'Poppins', sans-serif;
              background-color: #050505;
              color: #ffffff;
              overflow-x: hidden;
              -webkit-font-smoothing: antialiased;
          }
          ::-webkit-scrollbar {
              width: 8px;
          }
          ::-webkit-scrollbar-track {
              background: #050505;
          }
          ::-webkit-scrollbar-thumb {
              background: #333;
              border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
              background: #555;
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
