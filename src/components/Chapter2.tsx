import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FloatingParticles from './FloatingParticles';
import * as Part1 from './Chapter2PagesPart1';
import * as Part2 from './Chapter2PagesPart2';
import * as Part3 from './Chapter2PagesPart3';

const MAX_PAGE = 29;

export default function Chapter2({ onBack }: { onBack: () => void }) {
  const [page, setPage] = useState(0);

  const nextPage = useCallback(() => {
    setPage(prev => Math.min(prev + 1, MAX_PAGE));
  }, []);

  const prevPage = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 0));
  }, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Dispatch custom event for step navigation
    const event = new CustomEvent('chapter-next-step', { cancelable: true });
    window.dispatchEvent(event);
    
    // If not prevented (meaning no more steps on current page), advance to next page
    if (!event.defaultPrevented) {
      nextPage();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        nextPage();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        prevPage();
      } else if (e.key === 'Escape') {
        onBack();
      }
    };

    let lastScrollTime = 0;
    const scrollCooldown = 800;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;
      
      if (e.deltaY > 50) {
        nextPage();
        lastScrollTime = now;
      } else if (e.deltaY < -50) {
        prevPage();
        lastScrollTime = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [nextPage, prevPage, onBack]);

  // Map pages to their components
  const renderPage = () => {
    const pages = [
      Part1.Page1, Part1.Page2, Part1.Page3, Part1.Page4, Part1.Page5,
      Part1.Page6, Part1.Page7, Part1.Page8, Part1.Page9, Part1.Page10,
      Part2.Page11, Part2.Page12, Part2.Page13, Part2.Page14, Part2.Page15,
      Part2.Page16, Part2.Page17, Part2.Page18, Part2.Page19, Part2.Page20,
      Part3.Page21, Part3.Page22, Part3.Page23, Part3.Page24, Part3.Page25,
      Part3.Page26, Part3.Page27, Part3.Page28, Part3.Page29, Part3.Page30
    ];

    const PageComponent = pages[page];
    if (!PageComponent) return null;

    return (
      <motion.div
        key={`page-${page}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-20 overflow-hidden"
      >
        <PageComponent />
      </motion.div>
    );
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden cursor-pointer select-none bg-[#111] text-white"
      onClick={handleContainerClick}
    >
      {/* Background Layer: Dark space with subtle gold particles style context */}
      <div className="absolute inset-0 w-full h-full bg-[#111] pointer-events-none z-0" />
      <FloatingParticles />
      
      {/* Global CSS for Chapter 2 specific styling */}
      <style>{`
        .gold-accent { color: #d4af37; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5); }
        .red-accent { color: #e53935; text-shadow: 0 0 10px rgba(229, 57, 53, 0.5); }
        .dada-text { font-family: 'Courier New', Courier, monospace; letter-spacing: -2px; }
      `}</style>

      {/* Back Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onBack(); }}
        className="absolute top-8 left-8 z-[100] bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-all"
      >
        ← 返回主页
      </button>

      {/* Page Indicators */}
      <div className="absolute top-8 left-32 z-30 flex items-center gap-2 text-xl font-bold tracking-widest text-white/50 pointer-events-none">
        <span className="text-white">{String(page + 1).padStart(2, '0')}</span>
        <span className="text-sm">/ 30</span>
      </div>

      {/* Content Layers */}
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
}
