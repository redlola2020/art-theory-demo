import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { QrCode, Smartphone } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  question: string;
  image: string;
}

interface VotingSlideProps {
  data: Question;
  isActive: boolean;
}

const COLORS = ['#EC4899', '#6B7280', '#F59E0B'];

const VotingSlide: React.FC<VotingSlideProps> = ({ data, isActive }) => {
  const [votes, setVotes] = useState([
    { name: 'A 是', uv: Math.floor(Math.random() * 20) + 5 },
    { name: 'B 不是', uv: Math.floor(Math.random() * 20) + 5 },
    { name: 'C 不确定', uv: Math.floor(Math.random() * 10) + 2 }
  ]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showSpecific, setShowSpecific] = useState(false);

  useEffect(() => {
    setVotes([
      { name: 'A 是', uv: Math.floor(Math.random() * 20) + 5 },
      { name: 'B 不是', uv: Math.floor(Math.random() * 20) + 5 },
      { name: 'C 不确定', uv: Math.floor(Math.random() * 10) + 2 }
    ]);
    setHasVoted(false);
    setShowSpecific(false);
  }, [data.id]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setVotes(prev => prev.map(v => ({
        ...v,
        uv: v.uv + (Math.random() > 0.7 ? 1 : 0)
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, [isActive]);

  const handleVote = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // prevent page turn
    if (hasVoted) return;
    setHasVoted(true);
    const newVotes = [...votes];
    newVotes[index].uv += 15; // Give user vote a big boost to feel impactful
    setVotes(newVotes);
  };

  const handleSlideClick = (e: React.MouseEvent) => {
    if (!showSpecific) {
      e.stopPropagation();
      setShowSpecific(true);
    }
    // If showSpecific is already true, let the event bubble up to App.tsx to change the page
  };

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center p-8 z-20 cursor-pointer"
      onClick={handleSlideClick}
    >
      <div 
        className="w-full max-w-7xl h-[85vh] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row cursor-default" 
        onClick={handleSlideClick}
      >
        
        {/* Left Side: Image */}
        <div 
          className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden flex items-center justify-center bg-black/50 p-6"
        >
           <motion.img 
             key={data.image}
             initial={{ scale: 1.1, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.8 }}
             src={data.image} 
             alt={data.title}
             className="w-full h-full object-contain drop-shadow-2xl rounded-lg"
           />
           <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
             案例 {data.id} / 10
           </div>
        </div>

        {/* Right Side: Interactive Content */}
        <div 
          className="w-full md:w-1/2 h-full flex flex-col p-8 md:p-12"
        >
          
          <div className="flex-shrink-0">
            <h3 className="text-xl text-pink-400 font-medium tracking-wider mb-2">{data.title}</h3>
            <div className="h-[120px]">
              <AnimatePresence mode="wait">
                {!showSpecific ? (
                  <motion.h2 
                    key="generic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg"
                  >
                    这，是不是艺术？
                  </motion.h2>
                ) : (
                  <motion.h2 
                    key="specific"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold text-pink-400 mb-8 leading-tight drop-shadow-md"
                  >
                    {data.question}
                  </motion.h2>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center gap-4 relative">
            <AnimatePresence mode="popLayout">
              {!hasVoted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col gap-4"
                >
                  {['A 是', 'B 不是', 'C 不确定'].map((opt, i) => (
                    <button
                      key={opt}
                      onClick={(e) => handleVote(e, i)}
                      className="w-full py-6 px-8 rounded-2xl border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-pink-500/50 transition-all text-left text-2xl font-bold flex justify-between items-center group"
                    >
                      <span>{opt}</span>
                      <span className="opacity-0 group-hover:opacity-100 text-pink-400 transition-opacity">点击投票 →</span>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-64 md:h-80 w-full"
                >
                  <h4 className="text-gray-300 text-center mb-6 text-lg font-medium">实时投票结果</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={votes} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff', fontSize: 16 }} axisLine={false} tickLine={false} />
                      <Bar dataKey="uv" radius={[8, 8, 0, 0]} animationDuration={1000}>
                        {votes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <LabelList dataKey="uv" position="top" fill="#fff" fontSize={18} fontWeight="bold" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Mock Mentimeter / QR */}
          <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between text-gray-400">
            <div className="flex items-center gap-3">
              <QrCode className="w-8 h-8 text-pink-500" />
              <div className="text-sm">
                <p>微信扫码参与实时互动投票</p>
                <p className="font-mono text-pink-400">www.menti.com | Code: 8392 4110</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm font-medium">{votes.reduce((a, b) => a + b.uv, 0)} 人已投票</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VotingSlide;
