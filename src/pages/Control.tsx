import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ChevronLeft, Settings, Mic, Volume2, Camera, Video, Phone, X, Home, Smile, MapPin, Footprints, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ROBOT } from '../constants';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Control() {
  const navigate = useNavigate();
  const { hasRobotBound } = useAppContext();
  const [isMicOn, setIsMicOn] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [activeRoom, setActiveRoom] = useState('living');

  const rooms = [
    { id: 'master', name: '主卧', img: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop' },
    { id: 'second', name: '次卧', icon: <MapPin className="w-5 h-5"/>, img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop' },
    { id: 'living', name: '客厅', img: 'https://images.unsplash.com/photo-1558976825-6b1b03a03719?w=800&h=600&fit=crop' },
    { id: 'follow', name: '监护跟随', img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&h=600&fit=crop' },
  ];

  const currentRoom = rooms.find(r => r.id === activeRoom) || rooms[2];

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative overflow-hidden">
        {!hasRobotBound && (
          <div className="absolute inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-800 flex items-center justify-center text-slate-500 mb-8 border border-white/5 shadow-2xl">
              <Video className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-white mb-2 tracking-tight">未检测到绑定的智护终端</h2>
            <p className="text-xs text-slate-400 font-bold mb-10 max-w-[240px] leading-relaxed">
              实时视频与室内智控功能需要建立加密 TLS 连接。请先完成智护机器人绑定。
            </p>
            <div className="flex flex-col gap-3 w-full max-w-[200px]">
              <Link 
                to="/bind" 
                className="bg-brand-blue text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>立即去绑定</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
              <button 
                onClick={() => navigate(-1)}
                className="bg-white/5 text-slate-300 py-4 rounded-2xl font-black text-sm border border-white/10 active:scale-95 transition-all"
              >
                返回首页
              </button>
            </div>
          </div>
        )}
        {/* Video Preview Area */}
        <div className="relative h-[38vh] bg-slate-900 overflow-hidden shrink-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeRoom}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={currentRoom.img} 
              alt={currentRoom.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* AI Tracking Frame for "Follow" mode */}
          {activeRoom === 'follow' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-48 h-64 border-2 border-emerald-500/50 rounded-2xl">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-[8px] font-black px-2 py-0.5 rounded text-white whitespace-nowrap">
                  TARGET: SENIOR A-01 (LOCKED)
                </div>
              </div>
            </motion.div>
          )}
          {/* HUD Overlay - Closer to edges */}
          <div className="absolute inset-x-2 inset-y-2.5 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start pointer-events-auto">
              <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-end gap-1">
                <div className="flex gap-1">
                  <div className="bg-rose-500 text-white px-1.5 py-0.5 rounded-md text-[7px] font-black uppercase flex items-center gap-1 border border-white/10 shadow-lg">
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    LIVE
                  </div>
                  <div className="bg-black/40 backdrop-blur-md text-white px-1.5 py-0.5 rounded-md text-[7px] font-mono border border-white/10">
                    {new Date().toLocaleTimeString('zh-CN', { hour12: false })}
                  </div>
                </div>
                <button className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-white text-[8px] font-bold border border-white/10 active:opacity-70 pointer-events-auto">
                  <Settings className="w-2.5 h-2.5" />
                  配置
                </button>
              </div>
            </div>

            <div className="flex justify-center">
               <div className="bg-black/20 backdrop-blur-sm px-3 py-0.5 rounded-full text-white/40 text-[7px] font-black uppercase tracking-widest leading-none">
                  SECURE • 1080P • 60FPS
               </div>
            </div>

            <div className="flex justify-between items-end pointer-events-auto">
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 transition-all ${isMicOn ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30' : 'bg-black/40 text-white'}`}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 transition-all ${isSpeakerOn ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30' : 'bg-black/40 text-white'}`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white leading-none">
                   <span className="text-[9px] font-black uppercase tracking-tight">{currentRoom.name}</span>
                </div>
                <div className="flex gap-1.5">
                   <button className="w-9 h-9 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90">
                      <Camera className="w-4 h-4 opacity-80" />
                   </button>
                   <button className="w-9 h-9 rounded-xl bg-slate-500/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90">
                      <Video className="w-4 h-4 opacity-80" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex-1 bg-white rounded-t-[32px] -mt-6 relative z-20 px-6 pt-5 flex flex-col overflow-hidden shadow-[0_-15px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between mb-4 shrink-0">
             <h2 className="text-lg font-black text-text-main tracking-tight">智控中心</h2>
             <div className="bg-blue-50/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-blue-100">
                <div className="w-1 h-1 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[8px] font-black text-brand-blue uppercase tracking-widest leading-none">终端接管中</span>
             </div>
          </div>

          <div className="flex-1 flex items-center justify-between gap-6 min-h-0 pb-6">
            {/* Joystick Side - More prominent arrows */}
            <div className="flex-1 aspect-square max-w-[160px] relative rounded-full border border-slate-100 bg-slate-50/50 flex items-center justify-center">
               <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-3 pointer-events-none">
                  <div /><ArrowUp className="w-7 h-7 mx-auto text-slate-800 opacity-90 stroke-[3]" /><div />
                  <ArrowLeft className="w-7 h-7 my-auto text-slate-800 opacity-90 stroke-[3]" /><div /><ArrowRight className="w-7 h-7 my-auto ml-auto text-slate-800 opacity-90 stroke-[3]" />
                  <div /><ArrowDown className="w-7 h-7 mx-auto text-slate-800 opacity-90 stroke-[3]" /><div />
               </div>
               
               <motion.div 
                 drag
                 dragConstraints={{ left: -25, right: 25, top: -25, bottom: 25 }}
                 dragElastic={0.15}
                 whileTap={{ scale: 0.9 }}
                 className="w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center z-10 border border-slate-50 relative pointer-events-auto"
               >
                  <div className="w-6 h-6 rounded-full bg-brand-blue shadow-inner" />
               </motion.div>
               <div className="absolute w-20 h-20 rounded-full border-2 border-brand-blue/10 animate-pulse opacity-20" />
            </div>

            {/* Actions Side */}
            <div className="flex-1 grid grid-cols-2 gap-2 content-center">
               <div className="col-span-2">
                 <button className="w-full h-11 bg-brand-blue text-white rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 active:scale-95 transition-all">
                    <Home className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">自动回充</span>
                 </button>
               </div>
               {rooms.filter(r => r.id !== 'follow').map((room) => (
                 <button 
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`h-11 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all border ${
                    activeRoom === room.id 
                      ? 'bg-blue-50 border-brand-blue text-brand-blue' 
                      : 'bg-white border-border-base text-text-main shadow-sm'
                  }`}
                 >
                   {room.name}
                 </button>
               ))}
               
               <div className="col-span-2 mt-1">
                 <button 
                  onClick={() => setActiveRoom('follow')}
                  className={`w-full h-11 border rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-sm ${
                    activeRoom === 'follow'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                      : 'bg-white border-border-base text-text-main'
                  }`}
                 >
                    <Footprints className={`w-4 h-4 ${activeRoom === 'follow' ? 'text-emerald-500' : 'text-brand-blue'}`} />
                    监护跟随
                 </button>
               </div>
            </div>
          </div>
        </div>
    </div>
    </Layout>
  );
}

const ActionButton: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  color: string; 
  bg: string; 
  onClick?: () => void 
}> = ({ icon, label, color, bg, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`${bg} h-[92px] rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all group`}
    >
      <div className={`${color} group-active:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${color.includes('white') ? 'text-white' : 'text-text-muted opacity-80'}`}>{label}</span>
    </button>
  );
};
