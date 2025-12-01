import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TickerTape from './components/TickerTape';
import DashboardPreview from './components/DashboardPreview';
import EdgeSection from './components/EdgeSection';
import HowItWorks from './components/HowItWorks';
import TradeWalkthrough from './components/TradeWalkthrough';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Dashboard from './app/dashboard/page';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <TickerTape />
    <DashboardPreview />
    <EdgeSection />
    <HowItWorks />
    <TradeWalkthrough />
    <Testimonials />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505]">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <HomePage />
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;