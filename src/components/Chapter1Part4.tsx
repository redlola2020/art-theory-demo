import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChapterStep } from './Chapter1Part3';

// Components will be appended here
export function Part3Page7() {
  const step = useChapterStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden text-white font-sans">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 border-r border-white/20 flex flex-col items-center pt-20 px-8 opacity-60">
          <h2 className="text-4xl text-gray-400 font-black tracking-widest">柏拉图</h2>
          <AnimatePresence>
            {step >= 1 && (
              <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="mt-16 flex flex-col items-center gap-6 text-2xl text-pink-400 font-bold">
                <span>模仿</span>
                <span>↓</span>
                <span>距离真实</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-1/2 flex flex-col items-center pt-20 px-8 opacity-60">
          <h2 className="text-4xl text-gray-400 font-black tracking-widest">亚里士多德</h2>
          <AnimatePresence>
            {step >= 1 && (
              <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="mt-16 flex flex-col items-center gap-6 text-2xl text-yellow-400 font-bold">
                <span>模仿</span>
                <span>↓</span>
                <span>理解世界</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 左下方：柏拉图（去白底，等高） */}
      <motion.img 
        src="/Plato.png" 
        alt="柏拉图" 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-6 md:left-14 h-[320px] md:h-[400px] w-auto object-contain pointer-events-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
      />

      {/* 右下方：亚里士多德（去白底，等高） */}
      <motion.img 
        src="/Aristotle.png" 
        alt="亚里士多德" 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 right-6 md:right-14 h-[320px] md:h-[400px] w-auto object-contain pointer-events-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
        {step === 0 && (
          <motion.div exit={{opacity: 0}} className="text-7xl font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
            模仿
          </motion.div>
        )}
        {step >= 1 && (
          <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} className="flex flex-col items-center gap-8">
            <h1 className="text-4xl md:text-6xl font-black text-center tracking-widest bg-black/60 p-6 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl">
              同一个“模仿”<br/><span className="text-3xl md:text-5xl text-gray-300 mt-4 block">为什么可以得到不同答案？</span>
            </h1>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mt-8 text-5xl font-black text-pink-500 tracking-widest drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            模仿 ≠ 简单复制
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mt-6 text-4xl font-bold text-yellow-400 tracking-widest">
            模仿可以帮助我们理解世界
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Part3Page8() {
  const step = useChapterStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden bg-black text-white font-sans">
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <svg viewBox="0 0 200 400" className="w-[300px] h-[600px] stroke-gray-500 fill-none" strokeWidth="2">
          <path d="M100 50 C120 50 140 70 140 100 C140 130 110 160 100 180 C90 160 60 130 60 100 C60 70 80 50 100 50 Z" />
          <path d="M100 180 Q100 250 150 350" />
          <path d="M100 180 Q100 250 50 350" />
        </svg>
      </div>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {['情感', '痛苦', '快乐', '愤怒', '爱'].map((word, i) => {
               const angle = (i * 72 * Math.PI) / 180;
               return (
                 <motion.div 
                   key={word}
                   initial={{ x: 0, y: 0, opacity: 0 }}
                   animate={{ x: Math.cos(angle) * 250, y: Math.sin(angle) * 250, opacity: 1 }}
                   transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                   className="absolute text-3xl font-black text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                 >
                   {word}
                 </motion.div>
               );
             })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 flex flex-col items-center gap-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-pink-500 mb-2 tracking-widest"
        >
          （二）表现论
        </motion.h1>

        <h2 className="text-5xl md:text-7xl font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
          艺术 = 表达？
        </h2>

        {step >= 2 && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="flex gap-8 mt-6 pointer-events-none">
            <button className="px-12 py-4 rounded-full border-2 border-pink-500 text-pink-400 text-2xl font-bold tracking-widest bg-black/50 backdrop-blur-sm">
              必须表达情感
            </button>
            <button className="px-12 py-4 rounded-full border-2 border-gray-500 text-gray-400 text-2xl font-bold tracking-widest bg-black/50 backdrop-blur-sm">
              不一定
            </button>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="absolute bottom-16 text-4xl font-bold text-yellow-400 tracking-widest bg-black/80 px-8 py-4 rounded-2xl border border-yellow-500/30">
            艺术是否必须表达情感？
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Part3Page9() {
  const step = useChapterStep(7);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden text-white">
      <motion.img 
        src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none"
        alt="The Scream"
      />
      
      <div className="z-10 flex flex-col items-center w-full max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-black tracking-widest text-center leading-relaxed drop-shadow-2xl">
          为什么一件作品，<br/>能够让陌生人感受到艺术家的情绪？
        </h1>

        <div className="flex items-center justify-between w-full mt-12 relative">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} className="flex flex-col items-center gap-4 z-10">
                <div className="w-24 h-24 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center text-xl font-bold">艺术家</div>
              </motion.div>
            )}
            
            {step >= 2 && (
              <>
                <motion.div initial={{width:0}} animate={{width:"100%"}} className="absolute top-12 left-12 right-12 h-1 bg-gradient-to-r from-blue-400 via-pink-500 to-green-400 opacity-50 z-0" />
                <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} className="flex flex-col items-center gap-4 z-10 absolute left-1/2 -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center text-xl font-bold">情感</div>
                </motion.div>
              </>
            )}

            {step >= 3 && (
              <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} className="flex flex-col items-center gap-4 z-10 ml-auto">
                <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center text-xl font-bold">观看者</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 提问与画作展示区 */}
        <div className="w-full flex flex-col items-center mt-10 min-h-[280px] justify-center">
          <AnimatePresence mode="wait">
            {step === 3 && (
              <motion.div 
                key="q1"
                initial={{opacity:0, y:20}} 
                animate={{opacity:1, y:0}} 
                exit={{opacity:0, y:-20}} 
                className="text-3xl font-bold text-yellow-400 tracking-widest bg-black/70 px-8 py-4 rounded-2xl border border-yellow-500/30 shadow-xl text-center"
              >
                如果观看者没有任何感觉，它还是艺术吗？
              </motion.div>
            )}

            {step >= 4 && step < 6 && (
              <motion.div 
                key="paintings"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-8 z-20 flex-wrap"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl overflow-hidden border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black/60 max-h-[300px] max-w-[420px]"
                >
                  <img src="/smgn1.png" alt="smgn1" className="w-full h-full object-contain max-h-[290px]" />
                </motion.div>

                {step >= 5 && (
                  <motion.div 
                    layoutId="smgn2-enlarged-card"
                    initial={{ opacity: 0, scale: 0.85 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="rounded-2xl overflow-hidden border border-pink-400/50 hover:border-pink-400 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] bg-black/60 max-h-[300px] max-w-[420px] relative group cursor-pointer hover:scale-[1.03] transition-all"
                  >
                    <motion.img 
                      layoutId="smgn2-image" 
                      src="/smgn2.png" 
                      alt="smgn2" 
                      className="w-full h-full object-contain max-h-[290px]" 
                    />
                    <div className="absolute bottom-2.5 right-3 bg-black/80 px-2.5 py-1 rounded-full text-xs font-bold text-pink-300 border border-pink-500/40 opacity-90 group-hover:opacity-100 flex items-center gap-1 shadow-lg backdrop-blur-sm">
                      点击放大 🔍
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 放大到最大展示层（第6步放大、第7步显示那么：AI有情感吗？） */}
      <AnimatePresence>
        {step >= 6 && (
          <motion.div 
            key="modal-enlarged"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 md:p-10 cursor-pointer"
          >
            <div className="relative max-w-6xl max-h-[85vh] flex items-center justify-center">
              <motion.div 
                layoutId="smgn2-enlarged-card"
                className="rounded-3xl overflow-hidden border-2 border-pink-500/60 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-black/95 flex items-center justify-center"
              >
                <motion.img 
                  layoutId="smgn2-image"
                  src="/smgn2.png" 
                  alt="smgn2" 
                  className="max-h-[78vh] max-w-[92vw] w-auto h-auto object-contain rounded-2xl"
                />
              </motion.div>

              {/* 第7步：提问浮现 */}
              <AnimatePresence>
                {step >= 7 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 30 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute text-4xl md:text-6xl font-black text-[#e91e63] tracking-widest bg-black/90 px-10 md:px-14 py-6 md:py-8 rounded-2xl border-2 border-pink-500/80 shadow-[0_0_60px_rgba(233,30,99,0.9)] text-center drop-shadow-2xl z-30 select-none"
                  >
                    那么：AI有情感吗？
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Part3Page10() {
  const step = useChapterStep(6);
  const words = ['线条', '色彩', '形状', '节奏', '结构'];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden bg-black text-white">
      <AnimatePresence>
        {step === 0 && (
          <motion.div exit={{opacity:0}} className="absolute inset-0 flex flex-col items-center justify-center opacity-60">
            <div className="w-[500px] h-[500px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-full blur-3xl opacity-50" />
            <h2 className="text-xl mt-8 text-gray-500 tracking-widest">抽象艺术作品（隐藏信息）</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-pink-500 tracking-widest mb-2"
        >
          （三）形式论
        </motion.h1>

        <h2 className="text-4xl md:text-6xl font-black tracking-widest text-center leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
          艺术价值，<br/>是否存在于作品本身？
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {words.map((word, i) => (
            <AnimatePresence key={word}>
              {step > i && (
                <motion.div 
                  initial={{opacity:0, scale:0}} 
                  animate={{opacity:1, scale:1}} 
                  className="px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-2xl font-bold tracking-widest"
                >
                  {word}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence>
          {step >= 6 && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mt-12 text-3xl font-bold text-yellow-400 tracking-widest text-center leading-loose bg-black/80 px-12 py-8 rounded-2xl border border-yellow-500/30">
              如果不知道作者是谁，<br/>不知道故事背景，<br/>它还能成为艺术吗？
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Part3Page11() {
  const step = useChapterStep(3);
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden bg-black text-white">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-black text-pink-500 tracking-widest absolute top-8 z-30"
      >
        （四）体制论
      </motion.h1>

      <div className="text-3xl text-gray-500 font-black tracking-widest absolute top-24">普通物品</div>
      
      <motion.div 
        animate={{ 
          y: step >= 1 ? -40 : 0,
          scale: step >= 1 ? 0.85 : 1
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-64 h-64 md:w-72 md:h-72 rounded-2xl border border-white/30 overflow-hidden shadow-2xl relative z-10 flex flex-col items-center justify-center bg-black/60"
      >
        <img src="/brillo.jfif" alt="布里洛盒子" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 inset-x-0 bg-black/80 py-2 text-center text-sm font-bold text-gray-200 backdrop-blur-sm">
          沃霍尔《布里洛盒子》（包装盒）
        </div>
      </motion.div>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[600px] border border-white/10 rounded-[40px] flex items-center justify-center relative bg-white/5 backdrop-blur-sm">
              <span className="absolute top-8 text-2xl text-pink-500/50 font-bold tracking-widest">美术馆空间</span>
              
              {['艺术家', '策展人', '美术馆', '评论家', '艺术史', '观众'].map((node, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                return (
                  <motion.div 
                    key={node}
                    initial={{opacity:0, scale:0}}
                    animate={{opacity:1, scale:1}}
                    transition={{delay: 1 + i * 0.2}}
                    className="absolute text-xl font-bold text-blue-300 bg-blue-900/30 px-4 py-2 rounded-full border border-blue-400/30"
                    style={{ left: `calc(50% + ${Math.cos(angle) * 350}px)`, top: `calc(50% + ${Math.sin(angle) * 250}px)`, transform: 'translate(-50%, -50%)' }}
                  >
                    {node}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-20 flex flex-col items-center gap-6 w-full max-w-4xl text-center z-20">
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-5xl md:text-6xl font-black text-pink-500 tracking-widest drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              它还是原来的东西吗？
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-widest leading-loose">
              艺术，不只是“看起来像什么”。<br/>还与它处在怎样的艺术世界有关。
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Part3Page12() {
  const step = useChapterStep(3);
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden bg-[#111] text-white">
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        {['艺术家', '策展人', '美术馆', '评论家', '艺术史', '观众'].map((node, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          return (
            <div 
              key={node}
              className="absolute text-xl font-bold text-gray-500 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-600 transition-all duration-1000"
              style={{ 
                left: `calc(50% + ${Math.cos(angle) * 250}px)`, 
                top: `calc(50% + ${Math.sin(angle) * 250}px)`, 
                transform: 'translate(-50%, -50%)',
                borderColor: step >= 1 ? 'rgba(236,72,153,0.5)' : 'rgba(75,85,99,0.5)',
                color: step >= 1 ? '#f472b6' : '#6b7280',
                boxShadow: step >= 1 ? '0 0 15px rgba(236,72,153,0.3)' : 'none'
              }}
            >
              {node}
            </div>
          );
        })}

        <motion.div 
          className="w-56 h-56 md:w-64 md:h-64 bg-gray-900 rounded-2xl flex items-center justify-center flex-col overflow-hidden border border-white/20 shadow-2xl relative z-10 transition-all duration-1000"
          style={{
            borderColor: step >= 2 ? '#fbbf24' : 'rgba(255,255,255,0.2)',
            boxShadow: step >= 2 ? '0 0 30px rgba(251,191,36,0.4)' : '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}
        >
          <img src="/fountain.jfif" alt="杜尚《泉》" className="w-full h-full object-contain p-2 bg-black/40" />
          <div className="absolute bottom-0 inset-x-0 bg-black/80 py-1.5 px-2 text-center text-xs font-bold text-gray-300 backdrop-blur-sm">
            {step < 3 ? '普通小便池' : '杜尚《泉》（艺术作品）'}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-8 text-center z-20">
        <AnimatePresence>
          {step >= 2 && step < 3 && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-4xl font-black text-white tracking-widest bg-black/60 px-8 py-4 rounded-xl border border-white/10">
              如果没有进入艺术世界，<br/>它还是艺术吗？
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} className="text-5xl font-black text-white tracking-widest flex items-center gap-8 bg-black/60 px-8 py-4 rounded-xl border border-white/10">
              <span className="text-gray-400 text-3xl line-through">普通小便池</span>
              <span className="text-pink-500">→</span>
              <span className="text-yellow-400">艺术作品？</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Part3Page13() {
  const step = useChapterStep(2);
  const [activeCase, setActiveCase] = useState<string | null>(null);

  const lenses = [
    { name: "模仿", q: "它像不像现实？", color: "text-blue-400", border: "border-blue-500/30" },
    { name: "表现", q: "它表达了什么？", color: "text-red-400", border: "border-red-500/30" },
    { name: "形式", q: "它本身如何？", color: "text-green-400", border: "border-green-500/30" },
    { name: "艺术世界", q: "为什么被认为是艺术？", color: "text-yellow-400", border: "border-yellow-500/30" }
  ];

  const cases = [
    { title: "《蒙娜丽莎》", src: "/monalisa.jfif" },
    { title: "杜尚《泉》", src: "/ck.png" },
    { title: "AI作品", src: "/AIwork.jfif" },
    { title: "《黑神话》", src: "/wukong.jpg" }, // Fallback to an existing local img for now
    { title: "Labubu", src: "/labubu.jfif" },
    { title: "Apple设计", src: "/Apple Store.jfif" },
    { title: "街头涂鸦", src: "/tuya.jfif" },
    { title: "包装设计", src: "/bag.jfif" }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden bg-black text-white">
      <h1 className="absolute top-12 text-5xl font-black tracking-widest drop-shadow-md">理论工具箱：重新看艺术案例</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl mt-12 mb-12 relative h-48">
        <AnimatePresence>
          {step >= 1 && lenses.map((lens, i) => (
            <motion.div 
              key={lens.name}
              initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{delay: i * 0.2}}
              className={`flex flex-col items-center justify-center w-48 h-48 bg-white/5 border ${lens.border} rounded-2xl backdrop-blur-md`}
            >
              <span className={`text-3xl font-black ${lens.color} mb-2`}>{lens.name}</span>
              <span className="text-sm text-gray-400 text-center px-4">{lens.q}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
            {cases.map((c, i) => (
              <motion.div 
                key={c.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); setActiveCase(c.title); }}
                className="w-40 h-40 relative rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-500 transition-colors"
              >
                <img src={c.src} alt={c.title} className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black to-transparent text-center font-bold tracking-wider">{c.title}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCase && (
          <motion.div 
            initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={(e) => { e.stopPropagation(); setActiveCase(null); }}
          >
            <div className="bg-gray-900 border border-white/20 p-12 rounded-3xl max-w-3xl text-center shadow-2xl">
              <h2 className="text-5xl font-black text-pink-500 mb-12 tracking-widest">{activeCase}</h2>
              <div className="grid grid-cols-2 gap-8">
                {lenses.map(lens => (
                  <div key={lens.name} className={`p-6 border ${lens.border} rounded-xl bg-black/50`}>
                    <h3 className={`text-2xl font-bold ${lens.color} mb-4`}>{lens.name}视角</h3>
                    <p className="text-gray-300">分析此作品如何回应“{lens.q}”</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-gray-500 text-sm tracking-widest">点击任意处关闭</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Part3Page14() {
  const step = useChapterStep(1);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden bg-black text-white">
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        <motion.div 
          initial={{scale: 0.8, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          className="text-8xl font-black text-white tracking-widest z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] bg-black px-12 py-8 rounded-[40px] border border-white/20"
        >
          AI
        </motion.div>
        
        {['谁在创作？', '谁在表达？', '作品本身重要吗？', '谁决定它是不是艺术？'].map((q, i) => (
          <motion.div 
            key={q}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear", delay: 0 }}
            className="absolute inset-0 flex items-start justify-center origin-center pointer-events-none"
            style={{ transform: `rotate(${i * 90}deg)` }}
          >
            <motion.div 
              className="text-2xl font-bold text-pink-400 bg-black/80 px-6 py-2 rounded-full border border-pink-500/30 whitespace-nowrap drop-shadow-md"
              style={{ marginTop: '-40px' }}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear", delay: 0 }}
            >
              {q}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="absolute bottom-16 text-4xl md:text-5xl font-black text-center tracking-widest leading-loose bg-black/60 px-12 py-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            同一个AI作品，<br/>不同理论，<br/>可能<span className="text-[#e91e63]">得到不同答案</span>。
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Part3Page15() {
  const step = useChapterStep(6);
  const layers = [
    { name: '画面', img: '/hsh-1.webp' },
    { name: '音乐', img: '/hsh-2.jpg' },
    { name: '剧情', img: '/hsh-3.jpg' },
    { name: '角色', img: '/hsh-4.jpg' },
    { name: '互动', img: '/hsh-5.jpg' }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-8 relative overflow-hidden bg-[#0a0a0a] text-white">
      <h1 className="absolute top-8 text-3xl md:text-4xl font-bold tracking-widest text-gray-300 z-50 drop-shadow-md">
        《黑神话：悟空》是不是艺术？
      </h1>

      <div className="relative w-full max-w-6xl h-[62vh] flex items-center justify-center mt-12 z-20">
        <AnimatePresence>
          {step < 6 && (
            <motion.div 
              key="cards-row"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-4 md:gap-6 w-full h-full"
            >
              {layers.map((layer, i) => (
                step > i && (
                  <motion.div 
                    key={layer.name}
                    initial={{ opacity: 0, y: 40, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 max-w-[210px] h-[380px] md:h-[460px] rounded-2xl overflow-hidden border-2 border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.8)] relative flex flex-col justify-end group bg-neutral-900"
                  >
                    {/* 不调暗图片，原色高亮清晰展示 */}
                    <img 
                      src={layer.img} 
                      alt={layer.name} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-14 pb-5 flex justify-center z-10">
                      <span className="text-2xl md:text-3xl font-black tracking-widest text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                        {layer.name}
                      </span>
                    </div>
                  </motion.div>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 6 && (
            <motion.div 
              key="game-hero"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center z-40 rounded-3xl overflow-hidden border-2 border-yellow-500/50 shadow-[0_0_60px_rgba(234,179,8,0.3)] bg-neutral-950"
            >
              {/* 不调暗图片 */}
              <img 
                src="/hsh-6.jpg" 
                alt="游戏" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="text-7xl md:text-[120px] font-black text-yellow-400 tracking-[0.2em] drop-shadow-[0_0_45px_rgba(234,179,8,0.95)] z-10 select-none">
                  游戏
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {step >= 6 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-50"
        >
          <div className="w-[85%] max-w-[1020px] h-[75%] max-h-[650px] relative">
            {['模仿', '表现', '形式', '艺术世界'].map((theory, i) => {
              const positions = [
                'top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'
              ];
              return (
                <div 
                  key={theory} 
                  className={`absolute ${positions[i]} text-2xl md:text-3xl font-bold text-white bg-black/85 px-8 py-4 rounded-2xl border border-yellow-500/40 backdrop-blur-md shadow-2xl`}
                >
                  {theory}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function Part3Page16() {
  const step = useChapterStep(4);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 px-12 relative overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {step < 3 && (
          <motion.div key="stage1" exit={{opacity:0}} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="grid grid-cols-2 gap-8 opacity-40">
              <div className="w-64 h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-center p-4 relative overflow-hidden">Apple Store建筑<img src="/Apple Store.jfif" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" /></div>
              <div className="w-64 h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-center p-4 relative overflow-hidden">Apple Vision Pro宣传图<img src="/applevision.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" /></div>
              <div className="w-64 h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-center p-4 relative overflow-hidden">Labubu<img src="/labubu.jfif" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" /></div>
              <div className="w-64 h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-center p-4 relative overflow-hidden">街头涂鸦 / 包装设计<img src="/bag.jfif" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" /></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <h1 className="text-7xl font-black tracking-widest drop-shadow-[0_0_30px_rgba(0,0,0,1)] bg-black/60 px-12 py-6 rounded-3xl">设计是艺术吗？</h1>
            </div>

            {step >= 1 && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute inset-x-0 bottom-32 flex justify-center gap-32">
                <motion.span animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl font-bold text-blue-400">功能</motion.span>
                <motion.span animate={{ x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl font-bold text-pink-400">审美</motion.span>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="absolute bottom-12 text-4xl font-bold text-yellow-400 tracking-widest bg-black/80 px-8 py-4 rounded-xl">
                艺术与设计的边界在哪里？
              </motion.div>
            )}
          </motion.div>
        )}

        {step >= 3 && step < 4 && (
          <motion.div key="stage2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-center gap-12">
            {[
              { t: '功能 ≠ 艺术', c: 'text-gray-400' },
              { t: '美 ≠ 艺术', c: 'text-gray-300' },
              { t: '情感 ≠ 艺术', c: 'text-gray-400' },
              { t: '原创 ≠ 艺术', c: 'text-gray-300' },
              { t: '商业 ≠ 非艺术', c: 'text-gray-400' }
            ].map((item, i) => (
              <motion.div key={item.t} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: i * 0.2}} className={`text-4xl font-bold tracking-widest ${item.c}`}>
                {item.t}
              </motion.div>
            ))}
            
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.2}} className="mt-12 text-5xl font-black text-white tracking-widest bg-white/10 px-12 py-6 rounded-2xl border border-white/20 text-center leading-relaxed">
              那么，<br/>到底什么决定一件东西是不是艺术？
            </motion.div>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div key="stage3" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center gap-12 text-center">
            <h1 className="text-6xl font-black text-white tracking-widest leading-relaxed">现在，<br/>让AI回答。</h1>
            <p className="text-4xl font-bold text-[#e91e63] tracking-widest drop-shadow-[0_0_20px_rgba(233,30,99,0.5)]">
              但这一次，<br/>我们不直接相信它。
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
