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
      <div className="flex flex-col h-full bg-slate-50/50">
        <div className="flex-1 overflow-y-auto px-6 py-10 space-y-8 scrollbar-hide">
          
          {/* User Profile Header */}
          <div className="flex items-center gap-4 px-1">
            <div className="w-16 h-16 rounded-[24px] overflow-hidden bg-white shadow-sm border border-border-base">
              <Avatar src={MOCK_USER.avatar} className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-xl font-black text-text-main tracking-tight">王大力</h2>
              <p className="text-[11px] font-bold text-text-muted mt-0.5">主要监护人 · 王大爷之子</p>
            </div>
          </div>

          {/* 我的家 (My Home) Section */}
          <div className="space-y-3">
            <h3 className="px-1 text-[11px] font-black text-text-main tracking-widest uppercase opacity-70">我的家</h3>
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-border-base">
               <div className="flex justify-between items-center mb-6">
                 <button className="flex items-center gap-1.5 group">
                   <span className="text-lg font-black text-text-main tracking-tight">我的家</span>
                   <ChevronDown className="w-4 h-4 text-text-muted" />
                 </button>
                 <button className="bg-blue-50/50 px-3 py-1.5 rounded-xl flex items-center gap-1 group active:scale-95 transition-transform">
                   <span className="text-[10px] font-black text-brand-blue uppercase">管理</span>
                   <ChevronRight className="w-3 h-3 text-brand-blue" />
                 </button>
               </div>

               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3 text-[10px] font-bold">
                   <div className="flex items-center gap-1.5">
                     <span className="text-text-muted">机器人</span>
                     <span className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center font-black text-text-main">1</span>
                   </div>
                   <div className="h-3 w-px bg-slate-100" />
                   <div className="flex items-center gap-1.5">
                     <span className="text-text-muted">智能设备</span>
                     <span className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center font-black text-text-main">2</span>
                   </div>
                   <div className="h-3 w-px bg-slate-100" />
                   <div className="flex items-center gap-1.5">
                     <span className="text-text-muted uppercase">家庭人员</span>
                     <span className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center font-black text-text-main">1</span>
                     <div className="w-5 h-5 rounded-full overflow-hidden ml-1">
                        <Avatar src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-full h-full" />
                     </div>
                   </div>
                 </div>

                 <Link to="/family-sharing" className="bg-brand-blue text-white rounded-full px-4 py-2 flex items-center gap-1.5 shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform">
                   <UserPlus className="w-3.5 h-3.5 fill-white/20" />
                   <span className="text-[10px] font-black uppercase tracking-wider">邀请家人</span>
                 </Link>
               </div>
            </div>
          </div>

          {/* 设备管理 (Device Management) Section */}
          <div className="space-y-3">
            <h3 className="px-1 text-[11px] font-black text-text-main tracking-widest uppercase opacity-70">设备管理</h3>
            <div className="bg-white rounded-[32px] border border-border-base shadow-sm overflow-hidden divide-y divide-slate-50">
               <ListItem 
                 to="/robot-settings"
                 icon={<Cpu className="w-5 h-5" />} 
                 label="机器人配置" 
                 sublabel="状态、音量及初始化" 
                 bg="bg-blue-50/50" 
                 color="text-brand-blue" 
               />
            </div>
          </div>

          {/* 档案资料 (Records) Section */}
          <div className="space-y-3">
            <h3 className="px-1 text-[11px] font-black text-text-main tracking-widest uppercase opacity-70">档案资料</h3>
            <div className="bg-white rounded-[32px] border border-border-base shadow-sm overflow-hidden divide-y divide-slate-50">
               <ListItem 
                 to="/elderly-profile"
                 icon={<FileText className="w-5 h-5" />} 
                 label="服务老人档案" 
                 sublabel="基础信息与病历档案" 
                 bg="bg-orange-50/50" 
                 color="text-orange-500" 
               />
            </div>
          </div>

          {/* 系统设置 (System Settings) Section */}
          <div className="space-y-3">
            <h3 className="px-1 text-[11px] font-black text-text-main tracking-widest uppercase opacity-70">系统设置</h3>
            <div className="bg-white rounded-[32px] border border-border-base shadow-sm overflow-hidden divide-y divide-slate-50">
               <ListItem 
                 to="/messages"
                 icon={<MessageSquare className="w-5 h-5" />} 
                 label="消息设置" 
                 sublabel="告警推送与系统通知" 
                 bg="bg-purple-50/50" 
                 color="text-purple-500" 
               />
               <ListItem 
                 to="/security"
                 icon={<ShieldCheck className="w-5 h-5" />} 
                 label="隐私与安全" 
                 sublabel="数据加密与访问控制" 
                 bg="bg-emerald-50/50" 
                 color="text-emerald-500" 
               />
            </div>
          </div>

          <div className="pt-4 pb-8 space-y-4">
            <button 
              onClick={handleLogout}
              className="w-full py-5 text-center text-rose-500 font-black text-[11px] bg-white rounded-[32px] border border-border-base active:bg-rose-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>退出登录</span>
            </button>
            <p className="text-center text-[9px] font-black text-slate-300 tracking-widest">智护系统 v5.0.0 稳定版 • 2026</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ListItem({ icon, label, sublabel, bg, color, to }: { icon: React.ReactNode, label: string, sublabel?: string, bg: string, color: string, to?: string }) {
  const content = (
    <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center border border-white shadow-sm`}>
          {icon}
        </div>
        <div className="space-y-0.5">
          <span className="text-sm font-black text-text-main block tracking-tight group-active:opacity-70">{label}</span>
          {sublabel && <span className="text-[10px] font-bold text-text-muted tracking-tight">{sublabel}</span>}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-text-muted transition-colors" />
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}
