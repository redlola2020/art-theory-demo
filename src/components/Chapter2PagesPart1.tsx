import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStep } from './Chapter2Hooks';
import gsap from 'gsap';

export function Page1() {
  const step = useStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {step === 0 && (
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[120px] font-black tracking-widest text-white drop-shadow-2xl"
        >
          艺术有什么用？
        </motion.h1>
      )}

      {step >= 1 && (
        <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="text-[100px] font-black text-white z-10 gold-accent"
          >
            艺术
          </motion.h1>

          <AnimatePresence>
            {step === 1 && (
              <>
                <FloatingWord word="食物" delay={0.2} x={-300} y={-150} />
                <FloatingWord word="建筑" delay={0.4} x={300} y={-100} />
                <FloatingWord word="科技" delay={0.6} x={-250} y={150} />
                <FloatingWord word="工具" delay={0.8} x={250} y={100} />
              </>
            )}
            {step === 2 && (
              <>
                <FloatingWord word="绘画" delay={0} x={-300} y={-150} color="text-red-400" />
                <FloatingWord word="音乐" delay={0.2} x={300} y={-100} color="text-red-400" />
                <FloatingWord word="电影" delay={0.4} x={0} y={200} color="text-red-400" />
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <p className="text-3xl text-gray-300 mb-6">如果艺术不能直接解决生存问题……</p>
          <p className="text-5xl font-bold gold-accent tracking-widest">为什么人类仍然需要艺术？</p>
        </motion.div>
      )}
    </div>
  );
}

function FloatingWord({ word, delay, x, y, color = "text-gray-500" }: { word: string, delay: number, x: number, y: number, color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, x, y }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className={`absolute text-4xl font-light tracking-widest ${color}`}
    >
      {word}
    </motion.div>
  );
}

export function Page2() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-16">
      <h1 className="text-6xl font-black text-white tracking-widest">艺术有没有用？</h1>
      
      {step === 0 && (
        <div className="flex gap-8">
          {['A 艺术有实际作用', 'B 艺术只是精神享受', 'C 不确定'].map((text, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="px-8 py-4 border-2 border-white/30 rounded-xl text-2xl hover:bg-white/10 hover:border-white transition-all"
            >
              {text}
            </motion.button>
          ))}
        </div>
      )}

      {step >= 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-4xl h-80 flex items-end justify-center gap-12 border-b border-white/20 pb-4"
        >
          <Bar label="A 实际作用" height={30} delay={0} color="bg-gray-400" />
          <Bar label="B 精神享受" height={85} delay={0.2} color="bg-[#d4af37]" />
          <Bar label="C 不确定" height={15} delay={0.4} color="bg-red-500" />
        </motion.div>
      )}
    </div>
  );
}

function Bar({ label, height, delay, color }: { label: string, height: number, delay: number, color: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: `${height}%` }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={`w-24 ${color} rounded-t-lg opacity-80`}
      />
      <span className="text-xl text-gray-300">{label}</span>
    </div>
  );
}

export function Page3() {
  const step = useStep(7);
  const nodes = ['审美', '认识', '教育', '娱乐', '社会', '心理', '体验'];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      <h1 className="absolute top-16 text-5xl font-black text-white tracking-widest">艺术功能地图</h1>
      
      <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center mt-16">
        <div className="absolute text-5xl font-bold gold-accent z-20">艺术</div>
        
        {nodes.map((node, i) => {
          const angle = (i * (360 / nodes.length) * Math.PI) / 180;
          const radius = 250;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <AnimatePresence key={i}>
              {step > i && (
                <motion.div
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="absolute flex items-center justify-center w-24 h-24 rounded-full border border-white/30 bg-[#111] z-10"
                >
                  <span className="text-2xl text-white">{node}</span>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', zIndex: -1 }}>
                    <motion.line 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4 }}
                      x1={-x} y1={-y} x2={0} y2={0} 
                      stroke="rgba(255,255,255,0.2)" strokeWidth="2" 
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

export function Page4() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-16 px-12">
      <h1 className="text-5xl font-black tracking-widest">艺术功能的理论回顾</h1>
      
      <div className="w-full max-w-5xl relative mt-20">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/20 -translate-y-1/2" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          className="absolute top-1/2 left-0 h-1 bg-[#d4af37] -translate-y-1/2 origin-left"
        />

        <div className="flex justify-between relative z-10 w-full">
          {step >= 1 && (
            <div className="flex flex-col gap-12 w-1/2 items-center">
              <h2 className="text-3xl gold-accent">中国</h2>
              <div className="flex justify-between w-full px-8">
                {['墨子', '荀子', '孔子'].map((name, i) => (
                  <motion.div 
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-4 h-4 rounded-full bg-white" />
                    <span className="text-2xl">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {step >= 2 && (
            <div className="flex flex-col gap-12 w-1/2 items-center">
              <h2 className="text-3xl gold-accent">西方</h2>
              <div className="flex justify-between w-full px-8">
                {['柏拉图', '亚里士多德', '马克思主义'].map((name, i) => (
                  <motion.div 
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span className="text-2xl">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Page5() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12">
      <h1 className="text-5xl font-black mb-12">墨子：艺术是一种浪费吗？</h1>
      
      <div className="flex w-full max-w-6xl h-[60vh] gap-8">
        <div className="w-1/2 flex flex-col items-center justify-center gap-8 bg-[url('/war.jpg')] bg-cover bg-center rounded-2xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/50" />
          <h2 className="text-3xl text-gray-200 z-10 font-bold drop-shadow-lg tracking-widest">灾荒 / 战争 / 百姓生活</h2>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl font-black text-red-500 tracking-widest text-center mt-8 z-10 drop-shadow-xl">
              "乐非所以治天下也"
            </motion.div>
          )}
        </div>
        <div className="w-1/2 bg-[url('/yvle2.image')] bg-cover bg-center rounded-2xl relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <h2 className="text-4xl text-white z-10 tracking-widest drop-shadow-lg">音乐 / 宫殿 / 娱乐</h2>
        </div>
      </div>

      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <p className="text-2xl text-gray-300">国家困难时，艺术是否应该让位于生存？</p>
          <div className="flex gap-6">
            <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full text-xl transition-colors">支持墨子观点</button>
            <button className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full text-xl transition-colors">反对墨子观点</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function Page6() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[url('https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/80" />
      
      <div className="z-10 flex flex-col items-center w-full">
        <h1 className="text-5xl font-black mb-16 text-[#d4af37]">荀子：艺术能够建立秩序</h1>
        
        {step >= 1 && (
          <div className="relative w-full max-w-4xl h-64 flex items-center justify-between mt-12">
            {['个人', '家庭', '社会'].map((node, i) => (
              <motion.div 
                key={node}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.5 }}
                className="relative flex items-center justify-center w-32 h-32 rounded-full border-2 border-[#d4af37] bg-black/50"
              >
                <span className="text-2xl font-bold">{node}</span>
                <motion.div 
                  className="absolute inset-0 rounded-full border border-[#d4af37]"
                  animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
            ))}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ overflow: 'visible' }}>
              <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} x1="16%" y1="50%" x2="50%" y2="50%" stroke="rgba(212,175,55,0.5)" strokeWidth="2" strokeDasharray="5,5" />
              <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0 }} x1="50%" y1="50%" x2="84%" y2="50%" stroke="rgba(212,175,55,0.5)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        )}

        {step === 2 && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-4xl text-white font-light tracking-widest bg-black/50 p-6 rounded-xl border border-white/20"
          >
            艺术不仅满足个人，也可能影响社会关系。
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function Page7() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 relative overflow-hidden">
      <img src="/bg2.png" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Background" />
      <img src="/kongzi.png?v=2" className="absolute bottom-0 right-12 w-1/3 max-w-md object-contain z-0 drop-shadow-2xl" alt="孔子" />
      
      <div className="z-10 flex flex-col items-center gap-16">
        <h1 className="text-6xl font-black">孔子：艺术超越功利</h1>
        
        {step >= 1 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] my-12"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            “三月不知肉味”
          </motion.div>
        )}

        {step === 2 && (
          <div className="flex gap-16 mt-12">
            {['兴', '观', '群', '怨'].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="w-32 h-32 rounded-full border border-white/40 flex items-center justify-center text-4xl font-light backdrop-blur-sm hover:bg-white/10 hover:scale-110 transition-all cursor-default"
              >
                {word}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Page8() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12">
      <h1 className="text-5xl font-black mb-16 text-white tracking-widest">柏拉图：艺术是真实还是幻象？</h1>
      
      <div className="flex w-full max-w-5xl gap-16 items-center">
        <img src="/polato2.png" alt="Plato Bust" className="w-1/3 rounded-lg opacity-80" />
        
        <div className="flex flex-col gap-8 w-2/3">
          <motion.div className="p-6 border border-white/20 rounded-xl bg-white/5 text-center text-2xl gold-accent">
            理念世界 (真理)
          </motion.div>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-6 border border-white/20 rounded-xl bg-white/5 text-center text-2xl text-gray-300">
              ↓<br/>现实世界 (模仿)
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-6 border border-white/20 rounded-xl bg-white/5 text-center text-2xl text-red-400 dada-text">
              ↓<br/>艺术模仿 (幻象)
            </motion.div>
          )}
        </div>
      </div>
      
      {step === 2 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-4xl mt-16 font-bold tracking-widest">
          问题：艺术距离真实越远吗？
        </motion.p>
      )}
    </div>
  );
}

export function Page9() {
  const step = useStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 relative overflow-hidden">
      <h1 className="text-5xl font-black mb-16 tracking-widest">亚里士多德：艺术帮助理解世界</h1>
      
      <div className="flex justify-around items-center w-full max-w-5xl my-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-40 h-40 rounded-full border-2 border-white/20 flex items-center justify-center text-3xl">现实人物</div>
          {step >= 1 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xl font-bold tracking-widest">模仿</motion.span>}
        </div>
        
        {step >= 1 && (
          <>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl">→</motion.div>
            <div className="flex flex-col items-center gap-6">
              <div className="w-48 h-48 rounded-full border-2 border-white flex items-center justify-center text-4xl gold-accent">戏剧</div>
              {step >= 2 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xl font-bold tracking-widest">规律</motion.span>}
            </div>
          </>
        )}

        {step >= 2 && (
          <>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl">→</motion.div>
            <div className="flex flex-col items-center gap-6">
              <div className="w-40 h-40 rounded-full border-2 border-white/20 flex items-center justify-center text-3xl">观众</div>
              {step >= 3 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xl font-bold tracking-widest">净化 (Katharsis)</motion.span>}
            </div>
          </>
        )}
      </div>

      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-3xl text-white tracking-widest p-6 border border-white/20 bg-black/40 rounded-xl"
        >
          为什么悲剧让人痛苦，却带来快感？
        </motion.div>
      )}
    </div>
  );
}

export function Page10() {
  const step = useStep(1);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12">
      <h1 className="text-6xl font-black mb-24 text-white tracking-widest">艺术功能理论总结</h1>
      
      <div className="relative w-full max-w-4xl h-80 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute z-20 w-48 h-48 bg-white text-black rounded-full flex items-center justify-center text-5xl font-bold"
        >
          艺术
        </motion.div>

        {step === 1 && (
          <>
            <NetworkNode label="个人" angle={-150} radius={250} />
            <NetworkNode label="社会" angle={-30} radius={250} />
            <NetworkNode label="世界" angle={90} radius={250} />
          </>
        )}
      </div>

      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-4xl font-light text-gray-300 tracking-widest"
        >
          艺术的功能不是单一答案。
        </motion.div>
      )}
    </div>
  );
}

function NetworkNode({ label, angle, radius }: { label: string, angle: number, radius: number }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, x, y }}
      transition={{ duration: 0.8, type: "spring" }}
      className="absolute flex items-center justify-center w-32 h-32 rounded-full border border-white/30 bg-[#1a1c29] z-10"
    >
      <span className="text-2xl text-white">{label}</span>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', zIndex: -1 }}>
        <motion.line 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4 }}
          x1={-x} y1={-y} x2={0} y2={0} 
          stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="10,10"
        />
      </svg>
    </motion.div>
  );
}
