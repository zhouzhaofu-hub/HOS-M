import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_USER } from '../constants';
import { Avatar } from '../components/Avatar';
import { 
  ChevronRight, 
  ChevronDown, 
  UserPlus, 
  Cpu, 
  Settings,
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  LogOut,
  X,
  Check
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [userName, setUserName] = useState(user?.displayName || '智护用户');
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
      <div className="flex flex-col h-full bg-[#f2f2f2]">
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
          
          {/* 用户基础信息卡片 - 类似微信风格 */}
          <div 
            onClick={() => {
              setIsEditing(true);
              setTempName(userName);
            }} 
            className="bg-white px-6 pt-16 pb-8 flex items-center gap-5 active:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-100">
              {/* 使用用户的头像，如果不存在则显示默认头像 */}
              <Avatar src={user?.photoURL || MOCK_USER.avatar} className="w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-text-main tracking-tight truncate">{userName}</h2>
              <div className="flex items-center justify-between mt-1">
                {/* 显示脱敏后的 UID 模拟账号 */}
                <p className="text-sm text-text-muted">智护账号: {user?.uid.slice(-8).toUpperCase()}</p>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          </div>

          <div className="h-2" />

          {/* 分组一：家庭与分享 */}
          <div className="bg-white divide-y divide-slate-100">
             <WeChatListItem 
               to="/family-sharing"
               icon={<span className="text-xl">👥</span>} 
               label="家人分享" 
             />
          </div>

          <div className="h-2" />

          {/* 分组二：设备与档案 */}
          <div className="bg-white divide-y divide-slate-100">
             <WeChatListItem 
               to="/bind"
               icon={<span className="text-xl">🤖</span>} 
               label="设备与绑定" 
             />
             <WeChatListItem 
               to="/robot-settings"
               icon={<span className="text-xl">⚙️</span>} 
               label="机器人配置" 
             />
             <WeChatListItem 
               to="/elderly-profile"
               icon={<span className="text-xl">📋</span>} 
               label="服务主人档案" 
             />
          </div>

          <div className="h-2" />

          {/* 分组三：系统与安全 */}
          <div className="bg-white divide-y divide-slate-100">
             <WeChatListItem 
               to="/messages"
               icon={<span className="text-xl">💬</span>} 
               label="消息记录" 
             />
             <WeChatListItem 
               to="/security"
               icon={<span className="text-xl">🛡️</span>} 
               label="隐私与安全" 
             />
          </div>

          <div className="h-2" />

          {/* 分组四：退出登录 */}
          <div className="bg-white">
            <button 
              onClick={handleLogout}
              className="w-full py-4 text-center text-red-500 text-[16px] font-medium active:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">🚪</span>
              退出登录
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-10 tracking-wide font-medium">智护OS系统 v1.0.0 稳定版</p>
        </div>
      </div>

      {/* Edit Name Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[320px] bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-none">维护姓名</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">EDIT PROFILE NAME</p>
                </div>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-500 active:scale-90 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 focus-within:border-brand-blue/30 focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">真实姓名</label>
                  <input 
                    autoFocus
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    placeholder="请输入您的姓名"
                    className="w-full bg-transparent text-lg font-bold text-slate-900 outline-none placeholder:text-slate-300"
                  />
                </div>
                
                <div className="mt-4 text-[11px] text-slate-400 font-medium px-1 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1 shrink-0" />
                  姓名将用于家人分享与紧急预警时的身份识别。
                </div>

                <div className="mt-8 flex gap-3">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSaveName}
                    className="flex-3 py-3.5 rounded-2xl bg-brand-blue text-white font-black text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
                  >
                    <Check className="w-4 h-4" />
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

function WeChatListItem({ icon, label, to }: { icon: React.ReactNode, label: string, to?: string }) {
  const content = (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group active:bg-slate-50">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span className="text-[17px] font-medium text-text-main">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300" />
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}
