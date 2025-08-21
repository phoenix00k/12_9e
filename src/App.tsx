import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Efficiency } from './components/Efficiency';
import { Pricing } from './components/Pricing';
import { ModelHighlights } from './components/ModelHighlights';
import { Demo } from './components/Demo';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Chat } from './components/Chat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleGetStarted = () => {
    setIsChatOpen(true);
  };

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // Handle subscription logic here
    console.log(`Subscribe to ${plan} plan`);
    setIsChatOpen(true);
  };

  const handleWatchDemo = () => {
    // Open the chat for demo
    handleGetStarted();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <span className="text-xl font-bold text-white">⚡</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Thanos AI
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Start Chatting
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Hero onGetStarted={handleGetStarted} />
        <Features />
        <Efficiency />
        <Pricing onSubscribe={handleSubscribe} />
        <ModelHighlights />
        <Demo onWatchDemo={handleWatchDemo} />
        <FAQ />
        <FinalCTA onGetStarted={handleGetStarted} />
      </main>

      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {isChatOpen && (
          <Chat
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;