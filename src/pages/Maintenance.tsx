import React, { useState } from 'react';
import { ChevronLeft, ShieldCheck, Calendar, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ROBOT } from '../constants';

export default function Maintenance() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<'list' | 'detail'>('list');

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center gap-4 sticky top-0 z-10 shrink-0">
        <button 
          onClick={() => activePage === 'detail' ? setActivePage('list') : navigate(-1)} 
          className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black text-slate-900">运维与诊断</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
        <AnimatePresence mode="wait">
          {activePage === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] px-2">选择受控设备</h2>
              
              <div 
                onClick={() => setActivePage('detail')}
                className="bg-white rounded-[32px] p-6 border-2 border-blue-500 shadow-xl shadow-blue-500/5 cursor-pointer relative overflow-hidden group transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <RobotIcon className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">{MOCK_ROBOT.name}</h3>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1">序列号: {MOCK_ROBOT.id}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">在线工作</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg uppercase tracking-widest">电量 {MOCK_ROBOT.battery}%</span>
                </div>
                <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-300 group-hover:translate-x-1 transition-transform w-6 h-6" />
              </div>

              <div className="bg-slate-100/60 rounded-[32px] p-6 opacity-60 border-2 border-transparent">
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                      <SearchIcon className="w-10 h-10" />
                   </div>
                   <div>
                      <h3 className="font-black text-slate-400 text-lg">康养伴侣 B2</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">序列号: JH-2026-B2-088</p>
                   </div>
                </div>
                <div className="mt-5 flex gap-2">
                   <span className="px-3 py-1 bg-slate-300 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">离线</span>
                   <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[9px] font-black rounded-lg uppercase tracking-widest">最后活跃: 2H 前</span>
                </div>
              </div>

              <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 mt-4 hover:border-blue-400 hover:text-blue-600 transition-all active:scale-95">
                <PlusCircleIcon className="w-6 h-6" />
                <span>绑定新设备</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="brand-gradient rounded-[32px] p-6 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-black tracking-tight">{MOCK_ROBOT.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">运行自检通过</span>
                      </div>
                    </div>
                    <button className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 active:rotate-180 transition-transform duration-500">
                      <RestartIcon className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                      <p className="text-[9px] font-black uppercase tracking-widest text-blue-200 mb-1">系统固件</p>
                      <p className="text-xs font-black">v1.0.0 稳定版</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                      <p className="text-[9px] font-black uppercase tracking-widest text-blue-200 mb-1">最近运维</p>
                      <p className="text-xs font-black">2026/04/22</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="px-2 text-[10px] font-black text-slate-300 uppercase tracking-[2px]">核心诊断套件</h3>
                <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
                  <DiagnosticItem icon={<ShieldCheck className="w-6 h-6" />} label="全系统深度自检" color="text-blue-600" bg="bg-blue-50" />
                  <DiagnosticItem 
                    icon={<UpdateIcon className="w-6 h-6" />} 
                    label="云端固件热更新" 
                    color="text-amber-500" 
                    bg="bg-amber-50" 
                    badge="新更新"
                    isNew
                  />
                  <DiagnosticItem icon={<Calendar className="w-6 h-6" />} label="预约线下保养" color="text-emerald-500" bg="bg-emerald-50" />
                </div>
              </div>

              <div className="bg-amber-50 rounded-[32px] p-5 flex items-start gap-5 border border-amber-100">
                <div className="w-14 h-14 bg-white rounded-2xl text-amber-500 flex items-center justify-center shadow-sm shrink-0">
                  <MaskSadIcon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-amber-900">视觉传感器维护</p>
                  <p className="text-[10px] text-amber-700 font-medium leading-relaxed mt-1">前置避障摄像头检测到轻微油污，可能会影响自动巡航精准度，建议联系主人擦拭。</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900/10 rounded-full pointer-events-none" />
    </div>
  );
}

function DiagnosticItem({ icon, label, color, bg, badge, isNew }: any) {
  return (
    <div className="p-5 flex items-center justify-between border-b last:border-0 border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-2xl ${bg} ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className="text-sm font-black text-slate-800">{label}</span>
      </div>
      {isNew ? (
        <span className="text-[9px] bg-rose-500 text-white px-2 py-1 rounded-lg font-black uppercase tracking-tighter animate-bounce">{badge}</span>
      ) : (
        <ChevronRight className="text-slate-300 w-5 h-5" />
      )}
    </div>
  );
}

// Icons
function RobotIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PlusCircleIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}

function RestartIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function UpdateIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function MaskSadIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
