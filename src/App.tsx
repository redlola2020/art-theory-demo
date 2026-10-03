import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Chapter1 from './components/Chapter1';
import Chapter2 from './components/Chapter2';
import VotePage from './components/VotePage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'chapter1' | 'chapter2' | 'coming_soon'>('home');

  // Scanning the QR code opens the same site with ?vote=<room>&q=<question>.
  const query = new URLSearchParams(window.location.search);
  const voteRoom = query.get('vote');
  if (voteRoom) {
    const parsed = Number.parseInt(query.get('q') ?? '0', 10);
    return <VotePage room={voteRoom} questionIndex={Number.isNaN(parsed) ? 0 : parsed} />;
  }

  const handleNavigate = (chapter: number) => {
    if (chapter === 1) {
      setCurrentView('chapter1');
    } else if (chapter === 2) {
      setCurrentView('chapter2');
    } else {
      setCurrentView('coming_soon');
      // Auto return to home after showing coming soon
      setTimeout(() => setCurrentView('home'), 2000);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1a1c29] text-white font-sans">
      
      {/* Background that persists across all views */}
      <img 
        src="/bg1.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none z-0"
        onError={(e) => {
           e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2845&auto=format&fit=crop";
        }}
      />

      {/* Main Content Area */}
      <div className="absolute inset-0 z-10">
        {currentView === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        
        {currentView === 'chapter1' && (
          <Chapter1 onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'chapter2' && (
          <Chapter2 onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'coming_soon' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <h2 className="text-4xl text-white font-bold tracking-widest bg-pink-500/20 px-12 py-6 rounded-full border border-pink-500/30">
              敬请期待...
            </h2>
          </div>
        )}
      </div>

      {/* Global Watermark at Bottom */}
      <div translate="no" className="absolute bottom-4 left-0 w-full text-center z-[100] pointer-events-none mix-blend-screen opacity-80 flex flex-col items-center justify-center gap-1">
        <p className="text-xs md:text-sm tracking-[0.2em] font-medium text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
          艺术概论 • 王静
        </p>
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-light text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
          Introduction to Art • YVONNE
        </p>
      </div>

    </div>
  );
}
