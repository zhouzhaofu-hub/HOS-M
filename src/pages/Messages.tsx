import React, { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_MESSAGES } from '../constants';
import { ShieldAlert, BellRing, Info, Settings, ChevronLeft, X, ToggleLeft, ToggleRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'alert', label: '告警' },
  { id: 'prompt', label: '提示' },
  { id: 'info', label: '信息' },
];

export default function Messages() {
  const navigate = useNavigate();
  const { notificationPrefs, setNotificationPrefs } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = useMemo(() => {
    // First filter by user preferences
    const prefFiltered = messages.filter(msg => {
      if (msg.type === 'alert') return notificationPrefs.alert;
      if (msg.type === 'prompt') return notificationPrefs.prompt;
      if (msg.type === 'info') return notificationPrefs.info;
      return true;
    });

    // Then filter by category
    const categoryFiltered = activeCategory === 'all' 
      ? prefFiltered 
      : prefFiltered.filter(msg => msg.type === activeCategory);

    // Finally filter by search term
    if (!searchTerm.trim()) return categoryFiltered;
    
    return categoryFiltered.filter(msg => 
      msg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      msg.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeCategory, messages, notificationPrefs, searchTerm]);

  const clearAll = () => {
    setMessages([]);
  };

  const togglePref = (type: 'alert' | 'prompt' | 'info') => {
    setNotificationPrefs({
      ...notificationPrefs,
      [type]: !notificationPrefs[type]
    });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-border-base flex items-center justify-between sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-slate-50 border border-border-base flex items-center justify-center text-text-muted active:scale-95 transition-transform">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black text-text-main uppercase tracking-tight">消息通知</h1>
        </div>
        <div className="flex items-center gap-3">
          {messages.length > 0 && (
            <button 
              onClick={clearAll}
              className="text-[10px] text-brand-blue font-black uppercase tracking-widest active:opacity-60 transition-opacity"
            >
              一键清除
            </button>
          )}
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-10 h-10 rounded-xl bg-slate-50 border border-border-base flex items-center justify-center text-text-muted active:scale-95 transition-transform"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-2 bg-white">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
          </div>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索通知标题或关键词..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-10 pr-10 text-[13px] font-bold text-text-main placeholder:text-slate-400 focus:bg-white focus:border-brand-blue/30 focus:shadow-lg focus:shadow-brand-blue/5 outline-none transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-text-main active:scale-90 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex px-6 py-5 gap-3 overflow-x-auto scrollbar-hide shrink-0 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest shrink-0 transition-all active:scale-95 ${
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
                <BellRing className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest">
                {searchTerm ? '未找到相关通知' : '暂无通知内容'}
              </p>
              <p className="text-[10px] mt-2 font-bold opacity-60">
                {searchTerm ? '请尝试更换搜索关键词' : '请检查通知设置或切换分类'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center p-0"
            onClick={() => setIsSettingsModalOpen(false)}
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full bg-white rounded-t-[40px] flex flex-col shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-50">
                <div>
                  <h3 className="text-base font-black text-text-main">通知接收设置</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Notification Preferences</p>
                </div>
                <button 
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-none">告警通知</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">摔倒、心率异常等紧急情况</p>
                    </div>
                  </div>
                  <button onClick={() => togglePref('alert')} className="text-brand-blue">
                    {notificationPrefs.alert ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                      <BellRing className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-none">健康提示</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">用药、血压监测、运动建议</p>
                    </div>
                  </div>
                  <button onClick={() => togglePref('prompt')} className="text-brand-blue">
                    {notificationPrefs.prompt ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-none">系统信息</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">巡检报告、系统更新日志</p>
                    </div>
                  </div>
                  <button onClick={() => togglePref('info')} className="text-brand-blue">
                    {notificationPrefs.info ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                  </button>
                </div>
              </div>

              <div className="px-6 pb-12 pt-2">
                <button 
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-blue/20 active:scale-[0.98] transition-all"
                >
                  确 定
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Home Indicator */}
      <div className="h-4 bg-slate-50/30 flex justify-center shrink-0">
        <div className="w-32 h-1.5 bg-slate-900/10 rounded-full mt-1.5" />
      </div>
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
            : msg.type === 'prompt'
            ? 'bg-amber-500 text-white'
            : 'bg-blue-500 text-white'
        }`}>
           {msg.type === 'alert' && <ShieldAlert className="w-6 h-6" />}
           {msg.type === 'prompt' && <BellRing className="w-6 h-6" />}
           {msg.type === 'info' && <Info className="w-6 h-6" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1.5">
            <h4 className={`font-black text-base tracking-tight leading-tight ${isAlert ? 'text-rose-900' : 'text-text-main'}`}>
              {msg.title}
            </h4>
            <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider whitespace-nowrap ml-3 tabular-nums transition-colors ${
              isAlert 
                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                : 'bg-slate-100 text-slate-500 border border-slate-200/50'
            }`}>
              {msg.time}
            </div>
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
