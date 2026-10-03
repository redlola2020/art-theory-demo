import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Custom hook to manage internal steps for a page, intercepting global chapter navigation
export function useChapterStep(maxStep: number) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleNext = (e: Event) => {
      if (step < maxStep) {
        setStep(s => s + 1);
        e.preventDefault(); // Stop global advance
      }
    };
    
    const handlePrev = (e: Event) => {
      if (step > 0) {
        setStep(s => s - 1);
        e.preventDefault(); // Stop global retreat
      }
    };

    window.addEventListener('chapter-next', handleNext);
    window.addEventListener('chapter-prev', handlePrev);

    return () => {
      window.removeEventListener('chapter-next', handleNext);
      window.removeEventListener('chapter-prev', handlePrev);
    };
  }, [step, maxStep]);

  return step;
}

// Reusable Typewriter component
const TypewriterText = ({ text, className, style }: { text: string, className?: string, style?: React.CSSProperties }) => {
  return (
    <p className={className} style={style}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {char === '\n' ? <br /> : char}
        </motion.span>
      ))}
    </p>
  );
};

export function Part3Page1() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-full gap-12 z-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl text-white font-medium leading-relaxed tracking-wide"
      >
        马工程版《艺术学概论》将漫长的西方艺术观念史概括为四种主要形态——
      </motion.h2>
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.6, delayChildren: 0.5 } }
        }}
        className="flex flex-wrap justify-center gap-8 md:gap-16 text-4xl md:text-6xl text-pink-500 font-black tracking-widest drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] mt-8"
      >
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>模仿论</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>表现论</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>形式论</motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>体制论</motion.span>
      </motion.div>
    </div>
  );
}

export function Part3Page2() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-full gap-8 z-20">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-black text-pink-500 mb-6 tracking-widest"
      >
        （一）模仿论
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.2 }}
        className="flex flex-col gap-4 text-2xl md:text-3xl text-gray-200 leading-relaxed font-light tracking-wide"
      >
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>模仿论可以称得上是“西方第一艺术理论”</motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>从古希腊柏拉图开始，直到卢卡奇的现实主义</motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>艺术都被认为是对外部自然与社会现实的</motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-pink-400 font-bold text-3xl md:text-4xl my-4">模仿、描摹、反映和再现</motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>“模仿”和“描摹”</motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>“反映”和“再现”可以结合例子理解</motion.p>
      </motion.div>
    </div>
  );
}

export function Part3Page3() {
  const step = useChapterStep(1);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="text-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="flex flex-col items-center gap-12 max-w-5xl mx-auto px-8"
          >
            <h1 className="text-[100px] leading-none font-black text-pink-500 tracking-[0.2em] drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]">
              反映
            </h1>
            <TypewriterText 
              text="这幅壁画《雅典学院》将不同学科领域的文化名人汇聚一堂，反映了古典时期学派林立、相互切磋的景象。"
              className="text-2xl md:text-3xl text-white font-light leading-relaxed tracking-wide text-center"
            />
          </motion.div>
        )}
        
        {step === 1 && (
          <motion.div
            key="image-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 w-full h-full z-30 bg-black"
          >
            <video 
              src="/ydxy.mp4" 
              onClick={(e) => {
                if (e.currentTarget.paused) {
                  e.currentTarget.play();
                } else {
                  e.currentTarget.pause();
                }
              }}
              className="w-full h-full object-contain cursor-pointer"
              title="点击播放/暂停"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Part3Page4() {
  const step = useChapterStep(1);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-16 z-20 max-w-5xl mx-auto w-full">
      <motion.div 
        animate={{ y: step === 1 ? -100 : 0 }}
        transition={{ duration: 0.8, ease: "anticipate" }}
        className="flex flex-col items-center gap-8"
      >
        <h1 className="text-[100px] leading-none font-black text-pink-500 tracking-[0.2em] drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]">
          再现
        </h1>
        <TypewriterText 
          text="现实→创作=再现"
          className="text-3xl md:text-4xl text-white font-medium tracking-[0.2em]"
        />
      </motion.div>

      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -50 }}
            className="flex gap-8 w-full justify-center absolute top-1/2"
          >
            <img src="/OX1.jpg" alt="OX1" className="w-1/3 rounded-xl shadow-2xl object-cover aspect-square border-2 border-pink-500/30" />
            <img src="/OX2.jpg" alt="OX2" className="w-1/3 rounded-xl shadow-2xl object-cover aspect-square border-2 border-pink-500/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Part3Page5() {
  const step = useChapterStep(5);

  return (
    <div className="flex items-center justify-center h-full w-full z-20 px-12 relative">
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="remove-white-bg" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            -4 -4 -4 11.5 0
          " />
        </filter>
      </svg>
      <AnimatePresence mode="wait">
        {(step === 0 || step === 1) && (
          <motion.div 
            key="step0-1"
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-6 max-w-4xl w-full"
          >
            <h2 className="text-3xl md:text-4xl text-white font-bold leading-relaxed tracking-wide text-center">
              “模仿论”的发展也经历了一个漫长的过程，在这个过程中首先出场的当数：
            </h2>
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between w-full mt-12 gap-12"
              >
                <img src="/Plato.png" alt="Plato" className="w-1/2 object-cover drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]" style={{ filter: 'url(#remove-white-bg)' }} />
                <h1 className="text-5xl md:text-6xl text-pink-500 font-black tracking-widest text-center w-1/2 drop-shadow-md">
                  哲学之父——柏拉图
                </h1>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex items-center justify-center w-full gap-16 max-w-6xl"
          >
            <img src="/Plato.png" alt="Plato" className="w-[40%] object-cover drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]" style={{ filter: 'url(#remove-white-bg)' }} />
            <div className="flex flex-col gap-8 w-[60%]">
              {['【 第一层：理念世界（The Realm of Forms）】 —— 绝对、永恒、真实的本源（真理） ↓',
                '【 第二层：感官世界（The Realm of Matter）】—— 现实、模仿、流变的影子（现象） ↓',
                '【 第三层：艺术世界（The Realm of Art）】 —— 临摹、虚幻、二重的摹本（影子）'].map((line, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="text-xl md:text-2xl text-yellow-500 font-medium tracking-wide drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div 
            key="step3-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-6 w-full max-w-6xl justify-center items-center h-full"
          >
            {step >= 3 && (
              <motion.img 
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }} 
                animate={{ opacity: 1, scale: 1, rotate: 360 }} 
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  rotate: { repeat: Infinity, duration: 20, ease: "linear" }
                }}
                src="/earth1.png" alt="Earth 1" 
                className="w-1/3 object-cover aspect-square drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]" 
                style={{ filter: 'url(#remove-white-bg)' }} 
              />
            )}
            {step >= 4 && (
              <motion.img 
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }} 
                animate={{ opacity: 1, scale: 1, rotate: 360 }} 
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  rotate: { repeat: Infinity, duration: 20, ease: "linear" }
                }}
                src="/earth2.png" alt="Earth 2" 
                className="w-1/3 object-cover aspect-square drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]" 
                style={{ filter: 'url(#remove-white-bg)' }} 
              />
            )}
            {step >= 5 && (
              <motion.img 
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }} 
                animate={{ opacity: 1, scale: 1, rotate: 360 }} 
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  rotate: { repeat: Infinity, duration: 20, ease: "linear" }
                }}
                src="/earth3.png" alt="Earth 3" 
                className="w-1/3 object-cover aspect-square drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]" 
                style={{ filter: 'url(#remove-white-bg)' }} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Part3Page6() {
  const step = useChapterStep(1);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-8 max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-12 w-full"
          >
            <h2 className="text-2xl md:text-3xl text-white font-medium tracking-widest text-center">
              柏拉图在《理想国》第十卷中用“床”形象地总结了这个三层结构：
            </h2>
            
            <div className="flex gap-8 w-full justify-center">
              <img src="/bed1.png" alt="Bed 1" className="w-1/3 rounded-xl shadow-lg object-cover aspect-video border border-pink-500/20" />
              <img src="/bed2.png" alt="Bed 2" className="w-1/3 rounded-xl shadow-lg object-cover aspect-video border border-pink-500/20" />
              <img src="/bed3.png" alt="Bed 3" className="w-1/3 rounded-xl shadow-lg object-cover aspect-video border border-pink-500/20" />
            </div>

            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed text-center max-w-4xl bg-black/40 p-6 rounded-2xl border border-white/10">
              由于艺术家（第三层）的作品距离真理最远，且容易用情绪煽动大众，这也是柏拉图在构建其乌托邦时提出“驱逐诗人/艺术家”的理论根源。<br/><br/>
              <span className="text-pink-300 font-medium">这是艺术、诗歌和影像的世界，在柏拉图看来是最虚幻的低级存在。</span>
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center max-w-5xl text-center"
          >
            <h1 className="text-4xl md:text-6xl text-pink-500 font-black leading-tight tracking-widest drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              核心定义：对感官世界的再模仿。<br/>
              <span className="mt-6 block text-3xl md:text-5xl">它是“摹本的摹本”，或者说“影子的影子”</span><br/>
              <span className="text-2xl md:text-4xl text-pink-400 opacity-90 font-serif">（Twice removed from reality）</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
