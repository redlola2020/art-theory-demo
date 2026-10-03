import React, { useState } from 'react';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate: (chapter: number) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const leftChapters = [1, 2, 3, 4, 5];
  const rightChapters = [6, 7, 8, 9, 10];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Dark Overlay */}
      <img 
        src="/chun.jpg" 
        alt="Home Background" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Center Title Animation */}
      <motion.div 
        className="z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <p 
          translate="no"
          className="text-xl md:text-2xl font-light tracking-[0.8em] text-pink-200/90 uppercase ml-[0.8em] drop-shadow-md"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          Introduction to Art
        </p>
        <motion.h1 
          className="text-[115px] leading-[115px] tracking-[0.3em] ml-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-500 to-purple-500 drop-shadow-[0_0_40px_rgba(236,72,153,0.5)]"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity
          }}
          style={{ 
            backgroundSize: "200% auto",
            fontFamily: "'Noto Serif SC', serif",
            fontWeight: 900
          }}
        >
          艺术概论
        </motion.h1>
      </motion.div>

      {/* Left Petals */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-start gap-2 z-20">
        {leftChapters.map((num, i) => (
          <PetalButton 
            key={num} 
            position="left" 
            number={num} 
            delay={i * 0.1}
            onClick={() => onNavigate(num)}
          />
        ))}
      </div>

      {/* Right Petals */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 z-20">
        {rightChapters.map((num, i) => (
          <PetalButton 
            key={num} 
            position="right" 
            number={num} 
            delay={i * 0.1}
            onClick={() => onNavigate(num)}
          />
        ))}
      </div>
    </div>
  );
}

function PetalButton({ 
  position, 
  number, 
  delay,
  onClick 
}: { 
  key?: React.Key;
  position: 'left' | 'right'; 
  number: number; 
  delay: number;
  onClick: () => void;
}) {
  const isLeft = position === 'left';
  const [isHovered, setIsHovered] = useState(false);

  // Generate Chinese numbers for the chapters
  const chineseNumbers = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  const chapterName = `第${chineseNumbers[number - 1]}章`;

  const checkerboardStyle = {
    backgroundImage: `
      linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.15) 75%, rgba(255, 255, 255, 0.15)),
      linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.15) 75%, rgba(255, 255, 255, 0.15))
    `,
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 8px 8px',
    backgroundColor: isHovered ? 'rgba(236, 72, 153, 0.6)' : 'rgba(236, 72, 153, 0.2)'
  };

  return (
    <motion.button
      initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 + delay, type: "spring", stiffness: 50 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={checkerboardStyle}
      className={`
        relative flex items-center justify-center
        h-16 md:h-20
        backdrop-blur-md border border-pink-500/30
        hover:border-pink-400
        transition-colors duration-300 group
        ${isLeft ? 'rounded-r-full pl-2 pr-6 border-l-0' : 'rounded-l-full pr-2 pl-6 border-r-0'}
      `}
    >
      <motion.div
        animate={{ 
          width: isHovered ? 180 : 100,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="h-full flex items-center justify-center overflow-hidden whitespace-nowrap"
      >
        <span 
          className={`font-bold tracking-widest text-lg md:text-xl drop-shadow-md transition-all duration-300 ${isHovered ? 'opacity-100 scale-110 text-pink-200' : 'text-pink-400 opacity-80'}`}
          style={{
            fontFamily: isHovered ? "'Noto Serif SC', serif" : "'UnifrakturMaguntia', cursive"
          }}
        >
          {isHovered ? chapterName : String(number).padStart(2, '0')}
        </span>
      </motion.div>
    </motion.button>
  );
}
