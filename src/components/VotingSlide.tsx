import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { QRCodeSVG } from 'qrcode.react';
import { Radio, RotateCcw, Users } from 'lucide-react';
import {
  getRoom,
  joinUrl,
  startNewRoom,
  subscribeVotes,
  type VotePayload,
  type VoteStatus,
} from '../lib/voting';

interface Question {
  id: number;
  title: string;
  question: string;
  image: string;
}

interface VotingSlideProps {
  data: Question;
  index: number;
  isActive: boolean;
}

const OPTIONS = ['A 是', 'B 不是', 'C 不确定'];
const COLORS = ['#EC4899', '#6B7280', '#F59E0B'];

/** clientId -> chosen option, per question index. */
type Ballots = Record<number, Record<string, number>>;

const VotingSlide: React.FC<VotingSlideProps> = ({ data, index, isActive }) => {
  const [room, setRoom] = useState<string>(() => getRoom());
  const [ballots, setBallots] = useState<Ballots>({});
  const [status, setStatus] = useState<VoteStatus>('connecting');
  const [statusDetail, setStatusDetail] = useState<string>('');

  // Live-tally every vote that arrives for this session.
  useEffect(() => {
    if (!isActive) return;
    const unsubscribe = subscribeVotes(
      room,
      (vote: VotePayload) => {
        setBallots((previous) => {
          const forQuestion = { ...(previous[vote.q] ?? {}) };
          // One ballot per device: a later vote replaces the earlier one.
          forQuestion[vote.c || `anon-${Object.keys(forQuestion).length}`] = vote.o;
          return { ...previous, [vote.q]: forQuestion };
        });
      },
      (next, detail) => {
        setStatus(next);
        setStatusDetail(detail ?? '');
      },
    );
    return unsubscribe;
  }, [room, isActive]);

  const votes = useMemo(() => {
    const counts = [0, 0, 0];
    const forThisQuestion: Record<string, number> = ballots[index] ?? {};
    Object.values(forThisQuestion).forEach((option) => {
      if (option >= 0 && option < counts.length) counts[option] += 1;
    });
    return OPTIONS.map((name, i) => ({ name, uv: counts[i] }));
  }, [ballots, index]);

  const totalVotes = votes.reduce((sum, entry) => sum + entry.uv, 0);

  const resetVotes = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBallots((previous) => ({ ...previous, [index]: {} }));
  };

  const rotateRoom = (event: React.MouseEvent) => {
    event.stopPropagation();
    setBallots({});
    setRoom(startNewRoom());
  };

  const qrValue = joinUrl(room, index);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 z-20">
      <div className="w-full max-w-7xl h-[86vh] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left: the case being discussed */}
        <div className="w-full md:w-2/5 h-56 md:h-full relative overflow-hidden flex items-center justify-center bg-black/50 p-6">
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

        {/* Right: question, QR code and live results */}
        <div className="w-full md:w-3/5 h-full flex flex-col p-6 md:p-10 overflow-y-auto">
          <div className="flex-shrink-0">
            <h3 className="text-lg text-pink-400 font-medium tracking-wider mb-1">{data.title}</h3>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
              这，是不是艺术？
            </h2>
            <p className="text-gray-400 mt-2 text-base md:text-lg">{data.question}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
            <div className="bg-white rounded-2xl p-3 shadow-[0_0_30px_rgba(236,72,153,0.35)]">
              <QRCodeSVG value={qrValue} size={148} level="M" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold text-lg flex items-center justify-center sm:justify-start gap-2">
                <Users className="w-5 h-5 text-pink-400" />
                扫码参与实时投票
              </p>
              <p className="text-gray-400 text-sm mt-1">手机扫码后选择你的答案</p>
              <p className="text-gray-500 text-sm mt-2">
                房间号 <span className="font-mono text-pink-400 text-lg">{room}</span>
              </p>
              <p
                className={`text-xs mt-2 flex items-center justify-center sm:justify-start gap-1 ${
                  status === 'live'
                    ? 'text-emerald-400'
                    : status === 'error'
                      ? 'text-red-400'
                      : 'text-gray-400'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                {status === 'live' ? '已连接，实时接收投票' : status === 'error' ? '连接中断，正在重试' : '正在连接…'}
              </p>
              {statusDetail && <p className="text-[11px] text-gray-500 mt-1">{statusDetail}</p>}
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-end gap-4 mt-6">
            <div className="h-56 md:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={votes} margin={{ top: 24, right: 24, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    stroke="#fff"
                    tick={{ fill: '#fff', fontSize: 15 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar dataKey="uv" radius={[8, 8, 0, 0]} animationDuration={600}>
                    {votes.map((entry, i) => (
                      <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                    <LabelList dataKey="uv" position="top" fill="#fff" fontSize={17} fontWeight="bold" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-gray-300 text-sm">
                共 <span className="text-white font-bold text-lg">{totalVotes}</span> 人已投票
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetVotes}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-sm text-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  清空本题
                </button>
                <button
                  type="button"
                  onClick={rotateRoom}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-sm text-pink-200 transition-colors"
                >
                  新会话
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingSlide;
