import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleText from './ParticleText';
import FloatingParticles from './FloatingParticles';
import VotingSlide from './VotingSlide';
import TaskCardBoard from './TaskCardBoard';
import { Part3Page1, Part3Page2, Part3Page3, Part3Page4, Part3Page5, Part3Page6 } from './Chapter1Part3';
import { Part3Page7, Part3Page8, Part3Page9, Part3Page10, Part3Page11, Part3Page12, Part3Page13, Part3Page14, Part3Page15, Part3Page16 } from './Chapter1Part4';
import { quizQuestions } from '../data/questions';

const MAX_PAGE = 32; // 0 to 32 (Total 33 pages)

export default function Chapter1({ onBack }: { onBack: () => void }) {
  const [page, setPage] = useState(0);

  const nextPage = useCallback(() => {
    const event = new CustomEvent('chapter-next', { cancelable: true });
    window.dispatchEvent(event);
    if (!event.defaultPrevented) {
      setPage(prev => Math.min(prev + 1, MAX_PAGE));
    }
  }, []);

  const prevPage = useCallback(() => {
    const event = new CustomEvent('chapter-prev', { cancelable: true });
    window.dispatchEvent(event);
    if (!event.defaultPrevented) {
      setPage(prev => Math.max(prev - 1, 0));
    }
  }, []);

  const handleContainerClick = () => {
    if (page > 0) {
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

  // Logic for Page Indicators
  let currentSectionPage = page + 1;
  let currentSectionTotal = 4;
  let dotsOffset = 0;

  if (page >= 4 && page <= 16) {
    currentSectionPage = page - 3;
    currentSectionTotal = 13;
    dotsOffset = 4;
  } else if (page > 16) {
    currentSectionPage = page - 16;
    currentSectionTotal = 16;
    dotsOffset = 17;
  }

  const formattedPage = String(currentSectionPage).padStart(2, '0');
  const formattedTotal = String(currentSectionTotal).padStart(2, '0');

  return (
    <div 
      className="relative w-full h-full overflow-hidden cursor-pointer select-none"
      onClick={handleContainerClick}
    >
      {/* Background Layer */}
      <img 
        src="/bg1.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none z-0"
        onError={(e) => {
           e.currentTarget.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2845&auto=format&fit=crop";
        }}
      />
      
      {/* Darkening Overlay for pages > 0 */}
      <motion.div 
        initial={false}
        animate={{ backgroundColor: page === 0 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.65)' }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-[5] pointer-events-none"
      />

      {/* Back Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onBack(); }}
        className="absolute top-8 left-8 z-[100] bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-all"
      >
        ← 返回主页
      </button>

      {/* Page Indicators */}
      <div className="absolute top-8 left-32 z-30 flex items-center gap-2 text-xl font-bold tracking-widest text-pink-500 mix-blend-screen pointer-events-none">
        <span>{formattedPage}</span>
        <span className="text-gray-400 text-sm">/ {formattedTotal}</span>
      </div>

      <div className="absolute top-10 right-10 z-30 flex gap-2 pointer-events-none">
        {Array.from({ length: currentSectionTotal }, (_, i) => i + dotsOffset).map((p) => (
          <div 
            key={p} 
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${p === page ? 'bg-pink-500' : 'bg-gray-500'}`}
          />
        ))}
      </div>

      {/* Content Layers */}
      <AnimatePresence mode="wait">
        {page === 0 && (
          <motion.div 
            key="page0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); nextPage(); }}
              className="bg-pink-500/90 text-white px-16 py-5 rounded-full text-4xl font-black shadow-[0_0_40px_rgba(236,72,153,0.8)] hover:bg-pink-400 transition-all hover:scale-105 active:scale-95"
            >
              开始
            </button>
          </motion.div>
        )}

        {page === 1 && (
          <motion.div 
            key="page1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <FloatingParticles />
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black tracking-widest text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)] z-30 mix-blend-screen"
            >
              艺术是什么？
            </motion.h1>
          </motion.div>
        )}

        {page === 2 && (
          <motion.div 
            key="page2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20"
          >
             <ParticleText text="NO  ANSWER" />
          </motion.div>
        )}

        {page === 3 && (
          <motion.div 
            key="page3"
            initial={{ opacity: 0, y: '50vh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-50vh' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-20 z-20"
          >
            <h2 className="text-[80px] font-bold tracking-[0.8em] text-pink-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] mix-blend-screen ml-[0.4em] whitespace-nowrap">
              你的观点
            </h2>
            <h2 className="text-[80px] font-bold tracking-[0.8em] text-pink-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] mix-blend-screen ml-[0.4em] whitespace-nowrap">
              必须能够被解释
            </h2>
          </motion.div>
        )}

        {page === 4 && (
          <motion.div 
            key="page4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-20"
          >
            <h2 className="text-3xl md:text-5xl text-pink-400 font-medium tracking-widest drop-shadow-md">
              第二部分
            </h2>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-widest drop-shadow-2xl">
              艺术边界测试
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl mt-8 max-w-2xl text-center leading-relaxed">
              接下来，您将看到 10 个案例。<br/>
              请根据您的第一直觉进行判断，我们将实时统计所有参与者的观点。
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); nextPage(); }}
              className="mt-12 bg-pink-500/90 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:bg-pink-400 transition-all hover:scale-105 active:scale-95"
            >
              开始测试
            </button>
          </motion.div>
        )}

        {page >= 5 && page <= 14 && (
          <motion.div
            key={`page${page}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="absolute inset-0 z-20"
          >
            <VotingSlide data={quizQuestions[page - 5]} isActive={true} />
          </motion.div>
        )}

        {page === 15 && (
          <motion.div 
            key="page15"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <TaskCardBoard />
          </motion.div>
        )}

        {page === 16 && (
          <motion.div 
            key="page16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-20"
          >
            <h1 className="text-5xl md:text-7xl font-black text-pink-500 tracking-widest drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] text-center leading-relaxed mt-4">
              这些判断，<br/>到底有没有理论依据？
            </h1>
          </motion.div>
        )}

        {/* --- PART 3 --- */}
        {page === 17 && (
          <motion.div key="page17" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page1 />
          </motion.div>
        )}
        {page === 18 && (
          <motion.div key="page18" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page2 />
          </motion.div>
        )}
        {page === 19 && (
          <motion.div key="page19" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page3 />
          </motion.div>
        )}
        {page === 20 && (
          <motion.div key="page20" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page4 />
          </motion.div>
        )}
        {page === 21 && (
          <motion.div key="page21" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page5 />
          </motion.div>
        )}
        {page === 22 && (
          <motion.div key="page22" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page6 />
          </motion.div>
        )}
        {page === 23 && (
          <motion.div key="page23" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page7 />
          </motion.div>
        )}
        {page === 24 && (
          <motion.div key="page24" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page8 />
          </motion.div>
        )}
        {page === 25 && (
          <motion.div key="page25" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page9 />
          </motion.div>
        )}
        {page === 26 && (
          <motion.div key="page26" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page10 />
          </motion.div>
        )}
        {page === 27 && (
          <motion.div key="page27" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page11 />
          </motion.div>
        )}
        {page === 28 && (
          <motion.div key="page28" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page12 />
          </motion.div>
        )}
        {page === 29 && (
          <motion.div key="page29" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page13 />
          </motion.div>
        )}
        {page === 30 && (
          <motion.div key="page30" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page14 />
          </motion.div>
        )}
        {page === 31 && (
          <motion.div key="page31" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page15 />
          </motion.div>
        )}
        {page === 32 && (
          <motion.div key="page32" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 z-20">
            <Part3Page16 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
