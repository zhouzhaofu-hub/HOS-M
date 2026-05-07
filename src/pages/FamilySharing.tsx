import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Avatar } from '../components/Avatar';
import { ChevronLeft, Share2, Bot, Battery, X, Smartphone, MessageCircle, MoreHorizontal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function FamilySharing() {
  const navigate = useNavigate();
  const { robots: globalRobots } = useAppContext();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([
    { id: '1', name: '王小敏', role: '女儿', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
    { id: '2', name: '王爱华', role: '妻子', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { id: '3', name: '李阿强', role: '外甥', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  ]);

  const removeMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-slate-50/30">
        {/* Header */}
        <div className="px-6 pt-12 pb-4 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-9 h-9 rounded-xl bg-white border border-border-base flex items-center justify-center text-text-muted shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-black text-text-main tracking-tight">管理与共享</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-6 scrollbar-hide pb-10">
          {/* Info Box */}
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl shadow-sm">
            <p className="text-[10px] font-bold text-brand-blue leading-relaxed text-center">
              选择设备并将其运行状态与健康告警同步给您的家人。
            </p>
          </div>

          {/* My Robots Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">我的设备 ({globalRobots.length})</h3>
            </div>
            
            <div className="space-y-2">
              {globalRobots.map((robot) => (
                <div key={robot.id} className="bg-white rounded-2xl p-3.5 border border-border-base shadow-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-white shadow-sm shrink-0">
                      <div className="relative">
                        <Bot className={`w-6 h-6 ${robot.status === 'online' ? 'text-text-main' : 'text-slate-300'}`} />
                        {robot.status === 'online' && (
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-text-main truncate">{robot.name}</h4>
                      <div className="flex items-center gap-2.5 mt-1">
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                          robot.status === 'online' ? 'text-emerald-500 bg-emerald-50' : 'text-slate-400 bg-slate-100'
                        }`}>
                           {robot.status === 'online' ? '在线' : '离线'}
                        </span>
                        <div className="flex items-center gap-1 text-[8px] font-bold text-text-muted">
                           <Battery className="w-2.5 h-2.5" />
                           <span>{robot.battery}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsShareModalOpen(true)}
                      className="px-4 py-2 bg-brand-blue text-white rounded-xl flex items-center gap-2 shadow-md shadow-brand-blue/20 active:scale-95 transition-transform"
                    >
                      <Share2 className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest">分享</span>
                    </button>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => navigate('/bind')}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center gap-2 text-slate-400 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all active:scale-[0.98]"
              >
                <MoreHorizontal className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">绑定新设备</span>
              </button>
            </div>
          </section>

          {/* Shared Family Section */}
          <section className="space-y-3">
            <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">已共享成员</h3>
            <div className="space-y-2">
              {familyMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl p-3 border border-border-base flex items-center justify-between group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                      <Avatar src={member.avatar} className="w-full h-full" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-text-main">{member.name}</h4>
                      <p className="text-[9px] font-bold text-text-muted">{member.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeMember(member.id)}
                    className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center active:scale-90 transition-all opacity-0 group-hover:opacity-100 lg:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {familyMembers.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-[11px] font-bold text-text-muted">暂无已共享家人</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Share Modal */}
        <AnimatePresence>
          {isShareModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center p-0"
              onClick={() => setIsShareModalOpen(false)}
            >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full bg-white rounded-t-[40px] flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-base font-black text-text-main">分享给家人</h3>
                  <button 
                    onClick={() => setIsShareModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4 px-6 pb-12 pt-2">
                  <div className="flex flex-col items-center gap-2">
                    <button className="w-16 h-16 rounded-[24px] bg-[#07C160]/10 flex items-center justify-center text-[#07C160] active:scale-90 transition-transform">
                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12.131 2C6.452 2 2 5.926 2 10.533c0 2.57 1.54 4.887 3.948 6.425.074.04.148.07.168.14.02.07.03.418.01.761a15.82 15.82 0 0 1-.36 1.944c-.031.14-.149.3-.129.35.03.05.158.04.307.01a14.735 14.735 0 0 0 4.1-1.396c.228-.13.435-.11.663-.07 1.109.212 2.316.323 3.553.323 5.679 0 10.131-3.926 10.131-8.533S17.81 2 12.131 2z" />
                       </svg>
                    </button>
                    <span className="text-[10px] font-black text-text-main">微信好友</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <button className="w-16 h-16 rounded-[24px] bg-[#07C160]/10 flex items-center justify-center text-[#07C160] active:scale-90 transition-transform">
                       <div className="p-2 border-2 border-[#07C160] rounded-lg">
                         <MoreHorizontal className="w-4 h-4" />
                       </div>
                    </button>
                    <span className="text-[10px] font-black text-text-main">朋友圈</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button className="w-16 h-16 rounded-[24px] bg-brand-blue/10 flex items-center justify-center text-brand-blue active:scale-90 transition-transform">
                       <MessageCircle className="w-8 h-8" />
                    </button>
                    <span className="text-[10px] font-black text-text-main">短信</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button className="w-16 h-16 rounded-[24px] bg-slate-100 flex items-center justify-center text-slate-500 active:scale-90 transition-transform">
                       <Smartphone className="w-8 h-8" />
                    </button>
                    <span className="text-[10px] font-black text-text-main">其他</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
