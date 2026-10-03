import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TaskCardProps {
  id: number;
  title: string;
  discussionTitle: string;
  discussionPoints: string[];
  backNumbers: number[];
}

const taskCardsData: TaskCardProps[] = [
  {
    id: 1,
    title: 'AI作品是不是艺术？',
    discussionTitle: '讨论：如果机器生成一幅画：',
    discussionPoints: ['作者是谁？', '有没有创造？', '有没有情感？'],
    backNumbers: [1, 6],
  },
  {
    id: 2,
    title: '游戏是不是艺术？',
    discussionTitle: '讨论：游戏中的：',
    discussionPoints: ['美术', '音乐', '剧情', '是否构成艺术？'],
    backNumbers: [2, 7],
  },
  {
    id: 3,
    title: '艺术必须表达情感吗？',
    discussionTitle: '讨论：',
    discussionPoints: ['没有情感的作品是否成立？'],
    backNumbers: [3, 8],
  },
  {
    id: 4,
    title: '商业设计是不是艺术？',
    discussionTitle: '讨论：',
    discussionPoints: ['广告、包装、品牌视觉是否属于艺术？'],
    backNumbers: [4, 9],
  },
  {
    id: 5,
    title: '技巧重要还是思想重要？',
    discussionTitle: '讨论：',
    discussionPoints: ['一个画得很像照片的人和一个思想独特但画不好的人，谁更艺术？'],
    backNumbers: [5],
  },
  {
    id: 6,
    title: '现成品是不是艺术',
    discussionTitle: '讨论：',
    discussionPoints: ['现成品如果是艺术，那什么不是艺术'],
    backNumbers: [10],
  },
];

function TaskCard({ data }: { key?: React.Key; data: TaskCardProps }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[220px] md:h-[280px] cursor-pointer"
      onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 backface-hidden bg-pink-950/40 backdrop-blur-md border border-pink-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-pink-500/60 hover:bg-pink-900/50 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-pink-500 mb-4 tracking-wider leading-tight drop-shadow-md">
            {data.title}
          </h3>
          <p className="text-gray-200 text-base md:text-lg font-medium mb-2">
            {data.discussionTitle}
          </p>
          <div className="flex flex-col gap-1">
            {data.discussionPoints.map((point, i) => (
              <p key={i} className="text-gray-300 text-sm md:text-base">
                {point}
              </p>
            ))}
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-pink-500/20 backdrop-blur-xl border border-pink-400 rounded-2xl p-6 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)]"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex gap-6">
            {data.backNumbers.map((num) => (
              <span 
                key={num} 
                className="text-6xl md:text-8xl font-black text-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] font-serif"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TaskCardBoard() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 z-20" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-12">
        {taskCardsData.map((card) => (
          <TaskCard key={card.id} data={card} />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-2xl md:text-3xl font-bold text-white tracking-widest drop-shadow-lg border-b border-pink-500/50 pb-2">
          8分钟讨论，2分钟整理
        </p>
      </motion.div>
    </div>
  );
}
