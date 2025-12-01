import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TickerTape from '../components/TickerTape';
import DashboardPreview from '../components/DashboardPreview';
import EdgeSection from '../components/EdgeSection';
import HowItWorks from '../components/HowItWorks';
import TradeWalkthrough from '../components/TradeWalkthrough';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <Hero />
      <TickerTape />
      <DashboardPreview />
      <EdgeSection />
      <HowItWorks />
      <TradeWalkthrough />
      <Testimonials />
      <Footer />
    </main>
  );
}
