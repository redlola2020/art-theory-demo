import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, TriangleAlert } from 'lucide-react';
import { quizQuestions } from '../data/questions';
import { publishVote } from '../lib/voting';

const OPTIONS = ['是', '不是', '不确定'];

interface VotePageProps {
  room: string;
  questionIndex: number;
}

/**
 * Mobile page students reach by scanning the QR code shown on the slide.
 */
export default function VotePage({ room, questionIndex }: VotePageProps) {
  const [choice, setChoice] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const question = quizQuestions[questionIndex];

  if (!question) {
    return (
      <div className="w-full min-h-screen bg-[#12060f] text-white flex flex-col items-center justify-center gap-4 p-8 text-center">
        <TriangleAlert className="w-12 h-12 text-pink-400" />
        <h1 className="text-2xl font-bold tracking-wider">题目不存在</h1>
        <p className="text-white/60">请重新扫描屏幕上的二维码。</p>
      </div>
    );
  }

  const submit = async (option: number) => {
    setChoice(option);
    setStatus('sending');
    try {
      await publishVote(room, questionIndex, option);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#12060f] text-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-xl w-full mx-auto">
        <p className="text-pink-400/80 text-sm tracking-[0.3em] uppercase mb-3">
          案例 {questionIndex + 1} / {quizQuestions.length}
        </p>
        <h1 className="text-3xl font-black tracking-wide leading-snug mb-3">{question.title}</h1>
        <p className="text-lg text-white/70 mb-8">{question.question}</p>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 mb-8">
          <img src={question.image} alt={question.title} className="w-full h-44 object-contain" />
        </div>

        <div className="flex flex-col gap-3">
          {OPTIONS.map((label, index) => {
            const selected = choice === index;
            return (
              <button
                key={label}
                type="button"
                onClick={() => submit(index)}
                className={`w-full py-5 px-6 rounded-2xl border-2 text-2xl font-bold flex items-center justify-between transition-all ${
                  selected
                    ? 'border-pink-500 bg-pink-500/20 text-pink-200'
                    : 'border-white/15 bg-white/5 text-white active:bg-white/10'
                }`}
              >
                <span>{label}</span>
                {selected && status === 'done' && <Check className="w-6 h-6" />}
                {selected && status === 'sending' && <Loader2 className="w-6 h-6 animate-spin" />}
              </button>
            );
          })}
        </div>

        <motion.div
          className="mt-6 text-center text-sm min-h-[1.5rem]"
          initial={false}
          animate={{ opacity: 1 }}
        >
          {status === 'done' && <span className="text-emerald-400">投票成功，可随时修改选择</span>}
          {status === 'error' && <span className="text-red-400">提交失败，请检查网络后重试</span>}
          {status === 'idle' && <span className="text-white/40">房间号 {room}</span>}
        </motion.div>
      </div>
    </div>
  );
}
