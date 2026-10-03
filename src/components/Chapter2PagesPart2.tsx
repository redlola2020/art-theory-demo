import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStep } from './Chapter2Hooks';

export function Page11() {
  const step = useStep(4);
  const branches = [
    { label: '审美认识', angle: -135 },
    { label: '审美教育', angle: -45 },
    { label: '审美娱乐', angle: 45 },
    { label: '审美体验', angle: 135 }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="absolute top-16 text-4xl text-gray-400 tracking-widest">第二节</h1>
      <h2 className="absolute top-32 text-6xl font-black text-white tracking-widest">艺术的主要功能</h2>

      <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center mt-24">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute z-20 w-48 h-48 rounded-full border-4 border-[#d4af37] bg-black/80 flex items-center justify-center text-5xl font-bold gold-accent shadow-[0_0_40px_rgba(212,175,55,0.4)]"
        >
          艺术
        </motion.div>

        {branches.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180;
          const radius = 280;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <AnimatePresence key={i}>
              {step > i && (
                <motion.div
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="absolute flex items-center justify-center w-40 h-40 rounded-xl border border-white/20 bg-[#111] z-10 hover:bg-white/10 transition-colors"
                >
                  <span className="text-3xl text-white tracking-widest">{b.label}</span>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', zIndex: -1 }}>
                    <motion.line 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4 }}
                      x1={-x} y1={-y} x2={0} y2={0} 
                      stroke="rgba(212,175,55,0.5)" strokeWidth="3" 
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}

export function Page12() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#1a1c29]">
      <h1 className="text-5xl font-black mb-12 tracking-widest">审美认识功能</h1>
      
      <div className="relative w-full max-w-7xl h-[60vh] overflow-hidden rounded-2xl border border-white/20">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.img 
              key="img1"
              src="/chun.jpg" 
              alt="清明上河图" 
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : step === 2 ? (
            <motion.img 
              key="img2"
              src="/chun.jpg" 
              alt="清明上河图" 
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ transformOrigin: '20% 40%' }}
            />
          ) : null}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex">
          {step >= 1 && <Hotspot x="20%" y="40%" label="城市" info="汴京城的繁华市井" delay={0} />}
          {step >= 2 && <Hotspot x="50%" y="60%" label="人物" info="各阶层的生活百态" delay={0.2} />}
        </div>
      </div>

      {step >= 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-3xl font-light tracking-widest text-center"
        >
          艺术帮助我们认识：<br/>
          <span className="text-5xl font-bold gold-accent mt-6 block">人 / 社会 / 自然 / 历史</span>
        </motion.div>
      )}
    </div>
  );
}

function Hotspot({ x, y, label, info, delay }: { x: string, y: string, label: string, info: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="absolute flex flex-col items-center gap-4"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="w-8 h-8 rounded-full bg-red-500 border-4 border-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)] cursor-pointer" />
      <div className="bg-black/80 border border-white/20 px-6 py-4 rounded-xl backdrop-blur-md text-center pointer-events-none">
        <h3 className="text-2xl font-bold text-[#d4af37]">{label}</h3>
        <p className="text-gray-300 mt-2 text-lg">{info}</p>
      </div>
    </motion.div>
  );
}

export function Page13() {
  const step = useStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 gap-8 relative overflow-hidden bg-black">
      <div className="z-10 flex flex-col items-center justify-center gap-6 w-full text-center">
        <h1 className="text-5xl font-black text-[#ff00ff] tracking-widest drop-shadow-lg">奥菲莉亚：艺术如何认识人</h1>
        
        {step >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-3xl font-light text-[#d4af37] tracking-[0.2em]">
              不同的艺术形式，赋予了人物不同的灵魂
            </p>
          </motion.div>
        )}
      </div>

      <div className="relative w-full max-w-5xl h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-white/10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.img 
              key="img1"
              src="/John_William_Waterhouse_-_Ophelia_(1894).jpg"
              className="w-full h-full object-contain"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
          ) : step === 2 ? (
            <motion.img 
              key="img2"
              src="/Arthur-Ophelia_(1894).jpg"
              className="w-full h-full object-contain"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
          ) : step === 3 ? (
            <motion.img 
              key="img3"
              src="/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg"
              className="w-full h-full object-contain"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Page14() {
  const step = useStep(4);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 gap-12 bg-[#0a0a0a]">
      <h1 className="text-5xl font-black tracking-widest text-white">审美教育功能</h1>
      
      <div className="flex gap-16 w-full max-w-6xl justify-center h-[50vh]">
        <div className="w-1/2 flex flex-col items-center justify-center gap-6 p-8 border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574226516831-e1dff420e5c7?q=80&w=2938&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-screen" />
          <h2 className="text-4xl font-bold z-10 tracking-widest">《悲惨世界》</h2>
          <p className="text-gray-400 z-10 text-xl">Victor Hugo</p>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-6 p-8 border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520468305886-f10f8fa26cb6?q=80&w=2834&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-screen" />
          <h2 className="text-4xl font-bold z-10 tracking-widest">《离骚》</h2>
          <p className="text-gray-400 z-10 text-xl">屈原</p>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-4 text-3xl text-gray-300 font-light">
        {step >= 1 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>作品</motion.span>}
        {step >= 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400">情感共鸣</motion.span>}
        {step >= 3 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 3 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gold-accent font-bold">价值判断</motion.span>}
      </div>

      {step === 4 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-4xl text-white tracking-widest p-6 border border-[#d4af37]/30 bg-[#d4af37]/10 rounded-xl"
        >
          问题：艺术是否能够改变一个人的价值观？
        </motion.div>
      )}
    </div>
  );
}

export function Page15() {
  const step = useStep(5);
  const leftImages = ["/victorhugo.jpg", "/victorhugo-1.jpg", "/victorhugo2.png", "/victorhugo3.png", "/victorhugo4.png"];
  const leftImgSrc = leftImages[step - 1] || leftImages[0];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 gap-12 bg-[#0a0a0a]">
      <h1 className="text-5xl font-black tracking-widest text-white">艺术与真善美</h1>
      
      <div className="flex gap-16 w-full max-w-6xl justify-center h-[50vh]">
        <div className="w-1/2 flex flex-col items-center justify-center gap-6 p-8 border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
             <motion.img 
               key={step}
               src={leftImgSrc}
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 w-full h-full object-cover" 
             />
          </AnimatePresence>
          <h2 className="text-4xl font-bold z-10 tracking-widest drop-shadow-md bg-black/40 px-4 py-2 rounded">《悲惨世界》</h2>
          <p className="text-gray-200 z-10 text-xl drop-shadow-md bg-black/40 px-4 py-1 rounded">Victor Hugo</p>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-6 p-8 border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden">
          <img src="/quyuan.jfif" className="absolute inset-0 w-full h-full object-cover" alt="屈原" />
          <h2 className="text-4xl font-bold z-10 tracking-widest drop-shadow-md bg-black/40 px-4 py-2 rounded">《离骚》</h2>
          <p className="text-gray-200 z-10 text-xl drop-shadow-md bg-black/40 px-4 py-1 rounded">屈原</p>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-4 text-3xl text-gray-300 font-light">
        {step >= 1 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>作品</motion.span>}
        {step >= 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400">情感共鸣</motion.span>}
        {step >= 4 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 4 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gold-accent font-bold">价值判断</motion.span>}
      </div>
    </div>
  );
}

export function Page16() {
  const step = useStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#1a1c29]">
      <h1 className="text-5xl font-black mb-16 tracking-widest">审美娱乐功能</h1>
      
      <div className="flex gap-8 w-full max-w-7xl h-[40vh]">
        <div className="w-1/3 rounded-xl overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Cinema" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-3xl font-bold tracking-widest">电影观众</span></div>
        </div>
        <div className="w-1/3 rounded-xl overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Game" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-3xl font-bold tracking-widest">游戏玩家</span></div>
        </div>
        <div className="w-1/3 rounded-xl overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Concert" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-3xl font-bold tracking-widest">音乐演出</span></div>
        </div>
      </div>

      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 text-5xl font-bold gold-accent">
          娱乐只是消遣吗？
        </motion.div>
      )}

      <div className="flex items-center gap-12 mt-12 text-3xl font-light text-gray-300">
        {step >= 2 && <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>快乐</motion.span>}
        {step >= 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 2 && <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-white">放松</motion.span>}
        {step >= 3 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 3 && <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 font-bold tracking-widest">精神恢复 (Recreation)</motion.span>}
      </div>
    </div>
  );
}

export function Page17() {
  const step = useStep(2);
  const bgImg = step >= 2 ? '/teh2.png' : '/teh.png';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img 
          key={step}
          src={bgImg}
          alt="The Scream Background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      
      <div className="z-10 flex flex-col items-center w-full max-w-4xl p-12 bg-black/60 backdrop-blur-md rounded-2xl border border-white/20">
        <h1 className="text-5xl font-black mb-12 tracking-widest gold-accent">审美体验功能</h1>
        
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col gap-8">
            <label className="text-3xl text-white">看到这幅作品，你感受到什么？</label>
            <input 
              type="text" 
              className="w-full bg-white/10 border-b-2 border-white/50 text-white text-3xl p-4 focus:outline-none focus:border-[#d4af37] transition-colors"
              placeholder="输入你的感受..."
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex gap-8 mt-12 w-full justify-center"
          >
            {['焦虑', '孤独', '释放'].map((word, i) => (
              <motion.span 
                key={word}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.3 }}
                className="px-6 py-2 border border-red-500/50 text-red-400 rounded-full text-2xl"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Page18() {
  const step = useStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#111]">
      <h1 className="text-6xl font-black mb-24 tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        艺术如何改变自己？
      </h1>

      <div className="flex items-center gap-12 text-4xl font-light text-gray-300">
        {step >= 1 && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 border-2 border-white/20 rounded-2xl bg-white/5">作品</motion.div>}
        {step >= 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 2 && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 border-2 border-[#d4af37]/50 rounded-2xl bg-[#d4af37]/10 gold-accent font-bold">体验</motion.div>}
        {step >= 3 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>→</motion.span>}
        {step >= 3 && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 border-2 border-red-500/50 rounded-2xl bg-red-500/10 text-red-400 font-black tracking-widest">自我改变</motion.div>}
      </div>

      {step === 3 && (
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-4xl font-light leading-relaxed text-center tracking-[0.2em]"
        >
          艺术不仅改变世界，<br/>
          <span className="text-5xl font-bold mt-4 block">也改变观看者。</span>
        </motion.p>
      )}
    </div>
  );
}

export function Page19() {
  const step = useStep(0);
  const functions = ['认识', '教育', '娱乐', '体验'];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <h1 className="absolute top-16 text-5xl font-black tracking-widest text-white">艺术功能综合模型</h1>
      
      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center mt-12">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute z-20 w-56 h-56 rounded-full bg-gradient-to-br from-[#d4af37] to-red-600 flex items-center justify-center text-6xl font-black text-white shadow-[0_0_60px_rgba(212,175,55,0.6)]"
        >
          <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            艺术
          </motion.div>
        </motion.div>

        {functions.map((fn, i) => {
          const rad = (i * 90 * Math.PI) / 180;
          const radius = 300;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="absolute flex items-center justify-center w-36 h-36 rounded-full border-2 border-white/30 bg-[#1a1c29] z-10"
            >
              <span className="text-3xl tracking-widest text-white">{fn}</span>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', zIndex: -1 }}>
                <motion.line 
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }}
                  x1={-x} y1={-y} x2={0} y2={0} 
                  stroke="rgba(255,255,255,0.2)" strokeWidth="4" 
                />
              </svg>
            </motion.div>
          );
        })}

        {/* Outer connection ring */}
        <motion.svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
           <motion.circle 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
             cx="50%" cy="50%" r="300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeDasharray="10 10"
           />
        </motion.svg>
      </div>
    </div>
  );
}

export function Page20() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#111]">
      <h1 className="text-5xl font-black mb-16 tracking-widest">回看第一章案例</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-7xl h-[40vh]">
        {[
          { title: "杜尚《泉》", img: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Marcel_Duchamp_Fountain_1917.jpg" },
          { title: "AI作品", img: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940&auto=format&fit=crop" },
          { title: "黑神话悟空", img: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2838&auto=format&fit=crop" },
          { title: "Labubu", img: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=2940&auto=format&fit=crop" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="rounded-xl overflow-hidden relative border border-white/20 flex items-center justify-center bg-white/5"
          >
            <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen" />
            <span className="text-2xl font-bold tracking-widest z-10 bg-black/60 px-4 py-2 rounded-lg">{item.title}</span>
          </motion.div>
        ))}
      </div>

      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-20 text-4xl font-bold gold-accent text-center tracking-[0.2em] bg-[#d4af37]/10 p-8 rounded-2xl border border-[#d4af37]/30">
          问题：这些作品具有什么功能？
        </motion.div>
      )}
    </div>
  );
}
