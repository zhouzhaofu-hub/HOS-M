import React from 'react';
import { Layout } from '../components/Layout';
import { MOCK_USER } from '../constants';
import { Avatar } from '../components/Avatar';
import { 
  ChevronRight, 
  ChevronDown, 
  UserPlus, 
  Cpu, 
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#f2f2f2]">
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
          
          {/* User Profile Header - WeChat Style */}
          <div className="bg-white px-6 pt-16 pb-8 flex items-center gap-5 active:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-100">
              <Avatar src={MOCK_USER.avatar} className="w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-text-main tracking-tight truncate">王大力</h2>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-text-muted">智护账号: WD_889230</p>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          </div>

          <div className="h-2" />

          {/* Group 1: Home & Family */}
          <div className="bg-white divide-y divide-slate-100">
             <WeChatListItem 
               to="/family-sharing"
               icon={<UserPlus className="w-5 h-5 text-[#ff9c01]" />} 
               label="家人分享" 
             />
          </div>

          <div className="h-2" />

          {/* Group 2: Devices & Owner */}
          <div className="bg-white divide-y divide-slate-100">
             <WeChatListItem 
               to="/robot-settings"
               icon={<Cpu className="w-5 h-5 text-[#07c160]" />} 
               label="机器人配置" 
             />
             <WeChatListItem 
               to="/elderly-profile"
               icon={<FileText className="w-5 h-5 text-[#2782d7]" />} 
               label="主人档案" 
             />
          </div>

          <div className="h-2" />

          {/* Group 3: System & Security */}
          <div className="bg-white divide-y divide-slate-100">
             <WeChatListItem 
               to="/messages"
               icon={<MessageSquare className="w-5 h-5 text-[#fa5151]" />} 
               label="消息记录" 
             />
             <WeChatListItem 
               to="/security"
               icon={<ShieldCheck className="w-5 h-5 text-[#fa9d3b]" />} 
               label="隐私与安全" 
             />
          </div>

          <div className="h-2" />

          {/* Group 4: Logout */}
          <div className="bg-white">
            <button 
              onClick={handleLogout}
              className="w-full py-4 text-center text-text-main text-[16px] font-medium active:bg-slate-50 transition-colors"
            >
              退出登录
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-10 tracking-wide font-medium">智护OS系统 v1.0.0 稳定版</p>
        </div>
      </div>
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
