import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStep } from './Chapter2Hooks';

export function Page21() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-black overflow-hidden relative">
      <motion.img 
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940&auto=format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        animate={{ scale: step >= 1 ? 1.1 : 1 }}
        transition={{ duration: 10, ease: "linear" }}
      />
      <h1 className="text-6xl font-black mb-16 tracking-widest z-10">AI艺术问题</h1>

      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="z-10 flex flex-col items-center gap-12 bg-black/70 backdrop-blur-md p-12 rounded-3xl border border-white/20">
          <p className="text-4xl gold-accent font-bold tracking-widest">AI艺术是否具有：</p>
          <div className="grid grid-cols-2 gap-8 text-3xl text-gray-300">
            {['审美功能？', '认识功能？', '教育功能？', '体验功能？'].map((text, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.2 }} className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                {text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function Page22() {
  const step = useStep(4);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-black overflow-hidden relative">
      <motion.img 
        src="https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2838&auto=format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      <h1 className="text-6xl font-black mb-16 tracking-widest z-10">游戏问题</h1>

      <div className="z-10 flex gap-8 mb-16">
        {['画面', '音乐', '故事', '互动'].map((text, i) => (
          <AnimatePresence key={i}>
            {step >= i && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="w-40 h-40 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-3xl tracking-widest text-[#d4af37]"
              >
                {text}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {step === 4 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="z-10 text-5xl font-bold text-white tracking-[0.2em] bg-red-600/20 border border-red-500/50 p-8 rounded-2xl"
        >
          问题：游戏是不是综合艺术？
        </motion.div>
      )}
    </div>
  );
}

export function Page23() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#1a1c29]">
      <h1 className="text-5xl font-black mb-12 tracking-widest">设计问题</h1>

      <div className="flex gap-8 w-full max-w-6xl h-[45vh]">
        {[
          { title: "Apple Store建筑", img: "/Apple Store.jfif" },
          { title: "商品包装", img: "/bag.jfif" },
          { title: "Apple Vision Pro", img: "/applevision.jpg" }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.2 }} 
            className="w-1/3 rounded-2xl overflow-hidden relative border border-white/20"
          >
            <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-2xl font-bold tracking-widest text-white drop-shadow-md">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-16 text-5xl font-bold gold-accent tracking-[0.2em] bg-black/40 p-8 rounded-2xl border border-white/10">
          问题：设计和艺术有什么区别？
        </motion.div>
      )}
    </div>
  );
}

export function Page24() {
  const step = useStep(2);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#111]">
      <h1 className="text-5xl font-black mb-12 tracking-widest text-[#d4af37]">小组任务</h1>

      {!submitted ? (
        <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-12 flex flex-col gap-8">
          <div className="flex gap-4 items-center text-2xl">
            <span className="text-gray-400">选择对象：</span>
            {['AI', '游戏', '设计'].map(item => (
              <label key={item} className="flex items-center gap-2 cursor-pointer bg-black/40 px-4 py-2 rounded-lg border border-white/20 hover:border-white/50">
                <input type="radio" name="target" className="accent-[#d4af37]" /> {item}
              </label>
            ))}
          </div>

          {[
            "1. 它具有什么艺术功能？",
            "2. 哪个功能最重要？",
            "3. 如果缺少这个功能，它还是艺术吗？"
          ].map((q, i) => (
            <div key={i} className="flex flex-col gap-4">
              <label className="text-2xl text-white tracking-widest">{q}</label>
              <input type="text" className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-xl text-white focus:outline-none focus:border-[#d4af37]" placeholder="输入你的思考..." />
            </div>
          ))}

          <button onClick={() => setSubmitted(true)} className="mt-4 bg-[#d4af37] text-black font-bold text-2xl py-4 rounded-xl hover:bg-yellow-400 transition-colors">
            提交观点
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-6xl">
          <h2 className="text-4xl text-white mb-8 text-center">观点墙</h2>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/10 p-6 rounded-xl border border-white/20">
                <div className="text-sm text-[#d4af37] mb-2">匿名同学 #{100 + i}</div>
                <div className="text-lg text-gray-200">我认为游戏最核心的是体验功能，失去互动体验就变成了纯电影。</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function Page25() {
  const step = useStep(3);
  
  const images = ["/zzgn1-1.png", "/zzgn2-1.png", "/zzgn3-1.png"];
  const currentImg = images[step - 1] || images[0];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-black">
      <h1 className="text-5xl font-black mb-16 tracking-widest text-white">艺术的组织功能</h1>

      <div className="flex w-full max-w-4xl justify-center items-center h-[60vh] relative">
        <AnimatePresence mode="wait">
          <motion.img 
            key={step}
            initial={{opacity:0, scale:0.95}} 
            animate={{opacity:1, scale:1}} 
            exit={{opacity:0, scale:1.05}}
            src={currentImg} 
            className="absolute inset-0 w-full h-full object-contain rounded-xl shadow-2xl" 
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Page26() {
  const step = useStep(11);
  const images = [
    "/munch1.png", "/munch2.png", "/munch3.png", "/munch5.png", "/munch6.png", 
    "/Andrew Wyeth1.png", "/Andrew Wyeth2.png", "/Andrew Wyeth3.png", 
    "/Andrew Wyeth4.jpg", "/Andrew Wyeth5.jfif", "/Andrew Wyeth6.jpeg"
  ];
  const currentImg = images[step - 1] || images[0];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#111]">
      <h1 className="text-5xl font-black mb-12 tracking-widest text-white">艺术的心理补偿功能</h1>

      <div className="flex w-full max-w-5xl justify-center items-center h-[70vh] relative">
        <AnimatePresence mode="wait">
          <motion.img 
            key={step}
            initial={{opacity:0, filter: 'blur(10px)'}} 
            animate={{opacity:1, filter: 'blur(0px)'}} 
            exit={{opacity:0}}
            transition={{duration: 0.5}}
            src={currentImg} 
            className="absolute inset-0 w-full h-full object-contain shadow-2xl" 
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Page27() {
  const step = useStep(3);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-black">
      <h1 className="text-5xl text-gray-400 tracking-widest mb-16">课堂总结</h1>
      
      <div className="flex items-center gap-12 text-6xl font-black tracking-widest text-white">
        <span className="gold-accent">艺术改变：</span>
        <div className="flex flex-col gap-8">
          {step >= 1 && <motion.span initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>世界</motion.span>}
          {step >= 2 && <motion.span initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>社会</motion.span>}
          {step >= 3 && <motion.span initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="text-red-500">个人</motion.span>}
        </div>
      </div>
    </div>
  );
}

export function Page28() {
  const step = useStep(2);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center flex flex-col items-center justify-center gap-16"
      >
        <h1 className="text-6xl text-white font-light tracking-[0.2em]">
          人与艺术的关系
        </h1>
        
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <p className="text-8xl font-black text-[#e91e63] tracking-widest drop-shadow-[0_0_30px_rgba(233,30,99,0.5)] whitespace-pre">
              和则双美   离则双伤
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export function Page29() {
  const step = useStep(1);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-[#111]">
      <h1 className="text-6xl font-black mb-16 tracking-widest text-[#d4af37]">作业：艺术功能观察日志②</h1>
      
      <div className="flex flex-col gap-12 w-full max-w-4xl bg-white/5 border border-white/10 p-12 rounded-3xl">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl text-white">选择一个艺术对象：</h2>
          <div className="flex gap-6">
            {['电影', '游戏', '建筑', '广告', '绘画'].map(item => (
              <span key={item} className="px-6 py-2 border border-white/30 rounded-full text-xl text-gray-300">{item}</span>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/20" />

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl text-white">回答：</h2>
          <ol className="list-decimal list-inside text-2xl text-gray-300 space-y-4 tracking-widest">
            <li>它具有什么功能？</li>
            <li>哪一种功能最重要？</li>
            <li>如果失去这个功能，它还是艺术吗？</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export function Page30() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-[100px] font-black text-[#e91e63] tracking-[0.2em] drop-shadow-[0_0_20px_rgba(233,30,99,0.4)]"
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        非此不可？
      </motion.div>
    </div>
  );
}
