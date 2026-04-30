import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings, Mic, Volume2, Camera, Video, Phone, X, Home, Smile, MapPin, Footprints, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ROBOT } from '../constants';

export default function Control() {
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [locations, setLocations] = useState(['主卧', '次卧', '客厅']);
  const [newLocationName, setNewLocationName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimestamp(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}:${now.getMilliseconds().toString().padStart(3, '0')}`);
    }, 50);
    
    // Auto-show emergency if alert param exists (simulated)
    const params = new URLSearchParams(window.location.search);
    if (params.get('alert') === 'true') {
      setIsEmergency(true);
    }

    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2000);
  };

  const handleAddLocation = () => {
    if (newLocationName.trim()) {
      setLocations([...locations, newLocationName.trim()]);
      setNewLocationName('');
      setShowSettings(false);
      triggerToast(`已添加点位: ${newLocationName}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black relative">
      {/* Video Feed Area (60% height) */}
      <div className="relative w-full h-[60%] bg-slate-900 overflow-hidden">
        {/* Scan line animation */}
        <motion.div
           animate={{ top: ['0%', '100%'] }}
           transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
           className="absolute left-0 w-full h-[2px] bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-30 z-10"
        />
        
        <img
          alt="POV Feed"
          className="w-full h-full object-cover opacity-90"
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
          referrerPolicy="no-referrer"
        />

        {/* HUD Elements */}
        <div className="absolute top-12 left-6 right-6 flex justify-between items-center z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-brand-red rounded-md flex items-center gap-1.5 text-white text-[9px] font-black uppercase tracking-widest leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              实时
            </div>
            <div className="px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md text-white text-[9px] font-mono leading-none">
              {timestamp}
            </div>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="px-3 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white gap-2 active:scale-95 transition-transform"
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">视角设置</span>
          </button>
        </div>

        {/* Connection status overlay */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-48 py-1.5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg text-center z-20">
          <span className="text-[9px] text-brand-blue font-bold uppercase tracking-widest">终端互联 • 激活</span>
        </div>

        {/* HUD Bottom Controls */}
        <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end z-20">
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => triggerToast('麦克风已开启')}
              className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white active:bg-brand-blue transition-colors"
            >
              <Mic className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white">
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl text-white text-right">
              <p className="text-[11px] font-black tracking-tight">{MOCK_ROBOT.location}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => triggerToast('截屏已保存')}
                className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white active:scale-95"
              >
                <Camera className="w-6 h-6" />
              </button>
              <button 
                onClick={() => triggerToast('录像已保存')}
                className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white active:scale-95"
              >
                <Video className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Area Panel */}
      <div className="bg-white rounded-t-3xl flex-1 -mt-8 relative z-30 px-6 pt-10 flex flex-col">
        <AnimatePresence>
          {isEmergency && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-2 gap-4 mb-8 overflow-hidden"
            >
              <button className="bg-rose-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                呼叫 120
              </button>
              <button 
                onClick={() => setIsEmergency(false)}
                className="bg-slate-100 text-text-muted py-4 rounded-xl font-black flex items-center justify-center gap-2"
              >
                误报忽略
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-text-main uppercase tracking-tight">姿态控制</h2>
          <div className="flex items-center gap-2 bg-slate-50 border border-border-base px-3 py-1 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
            <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">手动模式</span>
          </div>
        </div>

        <div className="flex flex-1 gap-6 mb-8">
          {/* Virtual Joystick */}
          <div className="w-40 h-40 rounded-full bg-slate-50 border border-border-base flex items-center justify-center relative shrink-0">
             <div className="absolute top-3"><ArrowUp className="w-4 h-4 text-slate-300" /></div>
             <div className="absolute bottom-3"><ArrowDown className="w-4 h-4 text-slate-300" /></div>
             <div className="absolute left-3"><ArrowLeft className="w-4 h-4 text-slate-300" /></div>
             <div className="absolute right-3"><ArrowRight className="w-4 h-4 text-slate-300" /></div>
             
             <motion.div 
               drag
               dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
               dragElastic={0.05}
               dragSnapToOrigin
               className="w-16 h-16 rounded-full bg-white border border-border-base flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
             >
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                   <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
                </div>
             </motion.div>
          </div>

          {/* Quick Actions Grid */}
          <div className="flex-1 grid grid-cols-2 gap-3 content-start overflow-y-auto max-h-[300px] scrollbar-hide">
             <ActionButton icon={<Home className="w-5 h-5"/>} label="自动回充" color="text-brand-blue" bg="bg-blue-50/50" />
             {locations.map((loc, idx) => (
               <ActionButton 
                 key={idx} 
                 icon={loc === '主卧' ? <Smile className="w-5 h-5"/> : <MapPin className="w-5 h-5"/>} 
                 label={loc} 
                 color="text-text-muted" 
                 bg="bg-slate-50" 
               />
             ))}
             <ActionButton icon={<Footprints className="w-5 h-5"/>} label="监护跟随" color="text-text-muted" bg="bg-slate-50" />
          </div>
        </div>
      </div>

      {/* Settings Modal (POV Settings / Name Maintenance) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-t-[40px] p-8 pb-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-black text-text-main tracking-tight uppercase">视角名称维护</h3>
                </div>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-text-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 block">名称库</label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((loc, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-50 border border-border-base rounded-lg text-[11px] font-bold text-text-main">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest block">新增点位名称</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newLocationName}
                      onChange={(e) => setNewLocationName(e.target.value)}
                      placeholder="例如：餐厅"
                      className="flex-1 h-14 bg-slate-50 border border-border-base rounded-2xl px-5 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:border-brand-blue"
                    />
                    <button 
                       onClick={handleAddLocation}
                       className="w-14 h-14 bg-text-main text-white rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
                    >
                       <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 glass-dark text-white px-4 py-2 rounded-xl text-xs z-50 pointer-events-none"
          >
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon, label, color, bg, ...props }: { icon: React.ReactNode, label: string, color: string, bg: string, [key: string]: any }) {
  return (
    <button {...props} className={`${bg} ${color} rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all p-2 h-20`}>
      {icon}
      <span className="text-[10px] font-black">{label}</span>
    </button>
  );
}

import { Plus } from 'lucide-react';

