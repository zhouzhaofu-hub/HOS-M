import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_USER } from '../constants';
import { Avatar } from '../components/Avatar';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [userName, setUserName] = useState(user?.displayName || '嘉华');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.displayName || '');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditing(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
          
          {/* Top Gradient Header */}
          <div className="relative pb-12">
             <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 rounded-b-[48px]" />
             
             {/* User Info Container */}
             <div className="relative px-8 pt-16 flex items-center gap-5">
               <div 
                 onClick={() => {
                   setIsEditing(true);
                   setTempName(userName);
                 }}
                 className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white/20 shadow-xl bg-white shrink-0 cursor-pointer active:scale-95 transition-transform"
               >
                 <Avatar src={user?.photoURL || MOCK_USER.avatar} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 text-white">
                 <h2 className="text-3xl font-black tracking-tight flex items-center gap-2">
                   {userName}
                 </h2>
                 <p className="text-white/60 text-xs font-bold mt-1 tracking-widest uppercase">身份标识: {user?.uid.slice(-8).toUpperCase() || '20260422'}</p>
                 
                 <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                   <span className="text-[10px]">👑</span>
                   <span className="text-[10px] font-black uppercase tracking-widest">超级管理员</span>
                 </div>
               </div>
             </div>

             {/* Stats Card */}
             <div className="relative px-6 mt-8">
               <div className="bg-white rounded-[32px] p-6 shadow-lg shadow-blue-900/5 flex items-center justify-between border border-white/50">
                 <div className="flex-1 text-center border-r border-slate-50">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">守护天数</p>
                   <p className="text-2xl font-black text-slate-800">452</p>
                 </div>
                 <div className="flex-1 text-center border-r border-slate-50">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">关联设备</p>
                   <p className="text-2xl font-black text-slate-800">2</p>
                 </div>
                 <div className="flex-1 text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">依从性评分</p>
                   <p className="text-2xl font-black text-blue-500">优秀</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="px-6 space-y-10 mt-2">
            {/* Section 1: Guardian Management */}
            <div>
              <h3 className="px-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">守护管理系统</h3>
              <div className="space-y-4">
                <MenuCard 
                  to="/elderly-profile"
                  icon={<div className="p-3 bg-blue-50 rounded-[20px] text-blue-500">
                    <span className="text-xl">📋</span>
                  </div>}
                  label="服务主人档案管理"
                />
                <MenuCard 
                  to="/family-sharing"
                  icon={<div className="p-3 bg-fuchsia-50 rounded-[20px] text-fuchsia-500">
                    <span className="text-xl">👥</span>
                  </div>}
                  label="家人共享权限"
                  subtext="当前 3 人共同守护"
                />
              </div>
            </div>

            {/* Section 2: Account Preferences */}
            <div>
              <h3 className="px-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">账户与偏好</h3>
              <div className="space-y-4">
                <MenuCard 
                  to="/messages"
                  icon={<div className="p-3 bg-slate-100 rounded-[20px] text-slate-500">
                    <span className="text-xl">🔔</span>
                  </div>}
                  label="通知与预警设置"
                />
              </div>
            </div>

            {/* Section 3: More (Safety) */}
            <div>
              <div className="space-y-4">
                <MenuCard 
                   onClick={handleLogout}
                   isDanger
                   icon={<div className="p-3 bg-rose-50 rounded-[20px] text-rose-500">
                     <span className="text-xl">🚪</span>
                   </div>}
                   label="退出当前账号"
                 />
              </div>
            </div>
          </div>

          <div className="py-12 flex flex-col items-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">智护守护系统 v1.2.0</p>
            <div className="mt-2 w-1 h-1 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Edit Name Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[320px] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col border border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-50/50 px-8 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-none">维护姓名</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">编辑个人姓名</p>
                </div>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-500 active:scale-90 transition-transform shadow-sm"
                >
                  <span className="text-xs leading-none">✕</span>
                </button>
              </div>

              <div className="p-8">
                <div className="bg-slate-50 rounded-[24px] border border-slate-100 p-5 focus-within:border-blue-500/20 focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">您的称呼</label>
                  <input 
                    autoFocus
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    placeholder="请输入姓名"
                    className="w-full bg-transparent text-xl font-black text-slate-900 outline-none placeholder:text-slate-200"
                  />
                </div>
                
                <div className="mt-10 flex gap-3">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-black text-[11px] uppercase tracking-widest"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSaveName}
                    className="flex-3 py-4 rounded-2xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-600/20"
                  >
                    确认修改
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function MenuCard({ 
  icon, 
  label, 
  subtext, 
  to, 
  onClick, 
  isDanger 
}: { 
  icon: React.ReactNode, 
  label: string, 
  subtext?: string, 
  to?: string,
  onClick?: () => void,
  isDanger?: boolean
}) {
  const content = (
    <button 
      onClick={onClick}
      className="w-full bg-white rounded-[24px] p-5 pr-6 flex items-center justify-between group active:scale-[0.98] transition-all border border-slate-100/50 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 transition-transform group-hover:scale-110">
          {icon}
        </div>
        <div className="text-left">
          <p className={`text-[16px] font-black ${isDanger ? 'text-rose-500' : 'text-slate-800'}`}>{label}</p>
          {subtext && <p className="text-[11px] font-bold text-slate-400 mt-0.5">{subtext}</p>}
        </div>
      </div>
      <span className="text-slate-200 group-hover:text-slate-400 transition-colors text-lg opacity-50">➜</span>
    </button>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }

  return content;
}
