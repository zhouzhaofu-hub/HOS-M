import React, { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_MESSAGES } from '../constants';
import { ShieldAlert, Pill, ShieldCheck, Settings, ChevronLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'alert', label: '告警' },
  { id: 'health', label: '健康' },
  { id: 'log', label: '日志' },
];

export default function Messages() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const filteredMessages = useMemo(() => {
    if (activeCategory === 'all') return messages;
    return messages.filter(msg => msg.type === activeCategory);
  }, [activeCategory, messages]);

  const clearAll = () => {
    setMessages([]);
  };

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
        {messages.length > 0 && (
          <button 
            onClick={clearAll}
            className="text-[10px] text-brand-blue font-black uppercase tracking-widest active:opacity-60 transition-opacity"
          >
            全部清除
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex px-6 py-5 gap-3 overflow-x-auto scrollbar-hide shrink-0 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest shrink-0 transition-all active:scale-95 ${
              activeCategory === cat.id 
                ? 'bg-text-main text-white shadow-lg shadow-slate-200' 
                : 'bg-white text-text-muted border border-border-base'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 pt-4 pb-12 scrollbar-hide bg-slate-50/30">
        <AnimatePresence mode="popLayout">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, idx) => (
              <MessageItem key={msg.id} msg={msg} idx={idx} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full pt-20 text-text-muted opacity-40 px-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest">暂无该类通知</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900/10 rounded-full pointer-events-none" />
    </div>
  );
}

const MessageItem: React.FC<{ msg: any; idx: number }> = ({ msg, idx }) => {
  const navigate = useNavigate();
  const isAlert = msg.type === 'alert';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: idx * 0.05 
      }}
      className={`rounded-[28px] p-5 shadow-sm relative overflow-hidden group cursor-pointer border ${
        isAlert 
          ? 'bg-rose-50/80 border-rose-100/50 backdrop-blur-sm' 
          : 'bg-white border-border-base shadow-slate-100/30'
      }`}
    >
      <div className="flex gap-4 relative z-10">
        <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 ${
          isAlert 
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
            : 'bg-slate-50 border border-slate-100 text-brand-blue'
        }`}>
           {msg.type === 'alert' && <ShieldAlert className="w-6 h-6" />}
           {msg.type === 'health' && <Pill className="w-6 h-6" />}
           {msg.type === 'log' && <ShieldCheck className="w-6 h-6" />}
           {msg.type === 'system' && <Settings className="w-6 h-6" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1.5">
            <h4 className={`font-black text-base tracking-tight truncate ${isAlert ? 'text-rose-900' : 'text-text-main'}`}>
              {msg.title}
            </h4>
            <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ml-2 tabular-nums ${
              isAlert ? 'text-rose-400' : 'text-text-muted opacity-60'
            }`}>
              {msg.time}
            </span>
          </div>
          <p className={`text-[13px] font-medium leading-relaxed ${isAlert ? 'text-rose-700/80' : 'text-text-muted/80'}`}>
            {msg.content}
          </p>
          
          {isAlert && (
            <div className="flex gap-2.5 mt-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/alert-detail?id=${msg.id}`);
                }} 
                className="flex-1 bg-brand-blue text-white py-3 rounded-2xl font-black text-[11px] active:scale-95 transition-all shadow-md shadow-brand-blue/10 uppercase tracking-widest"
              >
                立即查看
              </button>
              <button className="flex-1 bg-white border border-slate-100 text-text-muted py-3 rounded-2xl font-black text-[11px] active:scale-95 transition-all uppercase tracking-widest">
                呼叫 120
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};


import { Link } from 'react-router-dom';
