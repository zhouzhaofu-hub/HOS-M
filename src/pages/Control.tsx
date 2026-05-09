import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ChevronLeft, Settings, Mic, Volume2, Camera, Video, Phone, X, Home, Smile, MapPin, Footprints, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Plus } from 'lucide-react';
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
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [rooms, setRooms] = useState([
    { id: 'master', name: '主卧', img: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop' },
    { id: 'guest', name: '次卧', img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop' },
    { id: 'living', name: '客厅', img: 'https://images.unsplash.com/photo-1558976825-6b1b03a03719?w=800&h=600&fit=crop' },
    { id: 'follow', name: '监护跟随', img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&h=600&fit=crop' },
  ]);

  const handleSaveConfig = () => {
    setIsLocationModalOpen(true);
  };

  const handleUpdateRoomName = (id: string) => {
    if (!editName.trim()) return;
    setRooms(rooms.map(r => r.id === id ? { ...r, name: editName } : r));
    setEditingRoomId(null);
    setEditName('');
  };

  const handleAddNewLocation = () => {
    const newId = `room-${Date.now()}`;
    const newRoom = {
      id: newId,
      name: '新视角',
      img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800&h=600&fit=crop'
    };
    setRooms([...rooms.slice(0, -1), newRoom, rooms[rooms.length - 1]]); // Keep follow at the end
    setEditingRoomId(newId);
    setEditName('新视角');
  };

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
        <div className="relative h-[48vh] bg-slate-900 overflow-hidden shrink-0">
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
                  目标: 主人 A-01 (锁定)
                </div>
              </div>
            </motion.div>
          )}
          {/* HUD Overlay - Closer to edges */}
          <div className="absolute inset-x-4 inset-y-6 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start pointer-events-auto">
              <button 
                onClick={() => navigate(-1)} 
                className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <div className="bg-rose-500 text-white px-2 py-1 rounded-lg text-[8px] font-black uppercase flex items-center gap-1.5 border border-white/10 shadow-lg">
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    LIVE
                  </div>
                  <div className="bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[8px] font-black border border-white/10 tabular-nums">
                    {new Date().toLocaleTimeString('zh-CN', { hour12: false })}
                  </div>
                </div>
                <button 
                  onClick={handleSaveConfig}
                  className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-white text-[9px] font-black border border-white/10 active:opacity-70 pointer-events-auto uppercase tracking-widest"
                >
                  <MapPin className="w-3 h-3 text-brand-blue" />
                  保存视角
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isLocationModalOpen && (
                <div className="absolute inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 pointer-events-auto">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-[300px] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col border border-white"
                  >
                    <div className="bg-slate-50/50 px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 leading-none">视控位置管理</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">MANAGE LOCATIONS</p>
                      </div>
                      <button 
                        onClick={() => setIsLocationModalOpen(false)} 
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-500 active:scale-90 transition-transform shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-6 space-y-3 max-h-[320px] overflow-y-auto scrollbar-hide">
                      {rooms.filter(r => r.id !== 'follow').map((room) => (
                        <div key={room.id} className="flex items-center gap-4 p-3 rounded-[24px] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-sm">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-slate-100 bg-white">
                             <img src={room.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {editingRoomId === room.id ? (
                               <input 
                                 autoFocus
                                 value={editName}
                                 onChange={(e) => setEditName(e.target.value)}
                                 onBlur={() => handleUpdateRoomName(room.id)}
                                 onKeyDown={(e) => e.key === 'Enter' && handleUpdateRoomName(room.id)}
                                 className="w-full bg-white border border-brand-blue rounded-lg px-2 py-1 text-xs font-black outline-none shadow-inner"
                               />
                            ) : (
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-black text-slate-800 truncate">{room.name}</span>
                                <button 
                                  onClick={() => {
                                    setEditingRoomId(room.id);
                                    setEditName(room.name);
                                  }}
                                  className="p-1 px-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:bg-blue-50 rounded-lg transition-all"
                                >
                                  编辑
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                       <button 
                         onClick={handleAddNewLocation}
                         className="w-full py-4 rounded-2xl bg-brand-blue text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-brand-blue/20"
                       >
                          <Plus className="w-4 h-4" />
                          新增自定义视角
                       </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <div className="flex justify-center">
               <div className="bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full text-white/50 text-[8px] font-black uppercase tracking-[0.2em] leading-none border border-white/5">
                  SECURE TUNNEL • 4K ULTRA • 60FPS
               </div>
            </div>

            <div className="flex justify-between items-end pointer-events-auto">
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 transition-all active:scale-90 ${isMicOn ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/30' : 'bg-black/40 text-white'}`}
                >
                  <span className="text-xl">🎙️</span>
                </button>
                <button 
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 transition-all active:scale-90 ${isSpeakerOn ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/30' : 'bg-black/40 text-white'}`}
                >
                  <span className="text-xl">🔊</span>
                </button>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white leading-none">
                   <span className="text-[10px] font-black uppercase tracking-widest">{currentRoom.name}</span>
                </div>
                <div className="flex gap-2">
                   <button className="w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90">
                      <span className="text-xl">📸</span>
                   </button>
                   <button className="w-11 h-11 rounded-2xl bg-slate-500/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90">
                      <span className="text-xl">🎥</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex-1 bg-[#F8FAFC] rounded-t-[48px] relative z-20 px-8 pt-10 pb-24 flex flex-col overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.08)] border-t border-white">
          <div className="flex items-center justify-between mb-8 shrink-0">
             <h2 className="text-xl font-black text-slate-800 tracking-tight">智控中心</h2>
             <div className="bg-blue-50 px-3 py-1.5 rounded-full flex items-center gap-2 border border-blue-100 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest leading-none">终端接管中</span>
             </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between gap-8 pb-10">
              {/* Joystick Side - More prominent arrows */}
              <div className="flex-1 aspect-square max-w-[180px] relative rounded-full border-4 border-white bg-slate-100/50 flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
                 <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-4 pointer-events-none opacity-20">
                    <div /><ArrowUp className="w-6 h-6 mx-auto text-slate-900 stroke-[4]" /><div />
                    <ArrowLeft className="w-6 h-6 my-auto text-slate-900 stroke-[4]" /><div /><ArrowRight className="w-6 h-6 my-auto ml-auto text-slate-900 stroke-[4]" />
                    <div /><ArrowDown className="w-6 h-6 mx-auto text-slate-900 stroke-[4]" /><div />
                 </div>
                 
                 <motion.div 
                   drag
                   dragConstraints={{ left: -35, right: 35, top: -35, bottom: 35 }}
                   dragElastic={0.15}
                   whileTap={{ scale: 0.9 }}
                   className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center z-10 border border-slate-50 relative pointer-events-auto"
                 >
                    <div className="w-8 h-8 rounded-full bg-brand-blue shadow-inner" />
                 </motion.div>
                 <div className="absolute w-24 h-24 rounded-full border-2 border-brand-blue/10 animate-ping opacity-10" />
              </div>

              {/* Actions Side */}
              <div className="flex-1 grid grid-cols-2 gap-3 content-center">
                 <div className="col-span-2">
                   <button className="w-full py-4 bg-white border border-slate-100 text-slate-800 rounded-[20px] flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-all">
                      <span className="text-xl">⚡</span>
                      <span className="text-[11px] font-black uppercase tracking-widest">自动回充</span>
                   </button>
                 </div>
                 {rooms.filter(r => r.id !== 'follow').map((room) => (
                   <button 
                    key={room.id}
                    onClick={() => setActiveRoom(room.id)}
                    className={`py-4 rounded-[20px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all border shadow-sm ${
                      activeRoom === room.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-blue-600/20' 
                        : 'bg-white border-slate-100 text-slate-800'
                    }`}
                   >
                     {room.name}
                   </button>
                 ))}
                 
                 <div className="col-span-2 mt-2">
                   <button 
                    onClick={() => setActiveRoom('follow')}
                    className={`w-full py-4 border rounded-[22px] flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg ${
                      activeRoom === 'follow'
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/20'
                        : 'bg-white border-slate-100 text-slate-800 shadow-sm'
                    }`}
                   >
                      <span className="text-xl">🏃‍♂️</span>
                      监护跟随
                   </button>
                 </div>
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
