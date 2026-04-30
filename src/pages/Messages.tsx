import React from 'react';
import { Layout } from '../components/Layout';
import { MOCK_MESSAGES } from '../constants';
import { ShieldAlert, Pill, ShieldCheck, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Messages() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-border-base flex items-center justify-between sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-slate-50 border border-border-base flex items-center justify-center text-text-muted active:scale-95 transition-transform">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black text-text-main uppercase tracking-tight">消息通知</h1>
        </div>
        <button className="text-[10px] text-brand-blue font-black uppercase tracking-widest">全部清除</button>
      </div>

      {/* Categories */}
      <div className="flex px-6 py-5 gap-3 overflow-x-auto scrollbar-hide shrink-0">
        <button className="px-6 py-2 bg-text-main text-white rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0">全部</button>
        <button className="px-6 py-2 bg-white text-text-muted border border-border-base rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0">告警</button>
        <button className="px-6 py-2 bg-white text-text-muted border border-border-base rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0">健康</button>
        <button className="px-6 py-2 bg-white text-text-muted border border-border-base rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0">日志</button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-12 scrollbar-hide">
        {MOCK_MESSAGES.map((msg, idx) => (
          <MessageItem key={msg.id} msg={msg} idx={idx} />
        ))}
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900/10 rounded-full pointer-events-none" />
    </div>
  );
}

const MessageItem: React.FC<{ msg: any; idx: number }> = ({ msg, idx }) => {
  const isAlert = msg.type === 'alert';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.1 }}
      className={`rounded-xl p-5 shadow-none relative overflow-hidden group cursor-pointer border ${isAlert ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-border-base'}`}
    >
      <div className="flex gap-4 relative z-10">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${isAlert ? 'bg-rose-500 text-white' : 'bg-white border border-border-base text-brand-blue'}`}>
           {msg.type === 'alert' && <ShieldAlert className="w-6 h-6" />}
           {msg.type === 'health' && <Pill className="w-6 h-6" />}
           {msg.type === 'log' && <ShieldCheck className="w-6 h-6" />}
           {msg.type === 'system' && <Settings className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className={`font-black text-sm uppercase tracking-tight ${isAlert ? 'text-rose-900' : 'text-text-main'}`}>{msg.title}</h4>
            <span className={`text-[9px] font-black uppercase tracking-widest ${isAlert ? 'text-rose-400' : 'text-text-muted'}`}>{msg.time}</span>
          </div>
          <p className={`text-xs font-medium leading-relaxed ${isAlert ? 'text-rose-700' : 'text-text-muted'}`}>{msg.content}</p>
          
          {isAlert && (
            <div className="flex gap-2 mt-4">
              <Link to="/control?alert=true" className="btn-flat-primary py-2 px-4">立即查看</Link>
              <button className="btn-flat-secondary py-2 px-4 shadow-none">呼叫 120</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

import { Link } from 'react-router-dom';
