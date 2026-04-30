import React from 'react';
import { Layout } from '../components/Layout';
import { Avatar } from '../components/Avatar';
import { ChevronLeft, User, Phone, MapPin, Heart, FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ElderlyProfile() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-border-base">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-muted">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black text-text-main tracking-tight">服务老人档案</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide">
          <div className="bg-slate-50/50 p-5 rounded-[32px] border border-border-base flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-white overflow-hidden shadow-sm shrink-0">
              <Avatar 
                src="https://images.unsplash.com/photo-1544144433-d5075fcd5f3c?w=200&h=200&fit=crop" 
                className="w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-black text-text-main leading-tight">王大爷</h2>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">72岁 • A型血</p>
            </div>
          </div>

          <section className="space-y-3">
             <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest flex justify-between items-center opacity-70">
               <span>基本信息</span>
               <button className="text-brand-blue normal-case text-[11px]">编辑</button>
             </h3>
             <div className="bg-white rounded-[24px] border border-border-base overflow-hidden divide-y divide-slate-50">
                <InfoRow icon={<User className="w-4 h-4" />} label="姓名" value="王建国" />
                <InfoRow icon={<Phone className="w-4 h-4" />} label="联系电话" value="139 **** 8888" />
                <InfoRow icon={<MapPin className="w-4 h-4" />} label="居住地址" value="东城区平安里 12号" />
             </div>
          </section>

          <section className="space-y-3">
             <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest opacity-70">健康档案</h3>
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-rose-50/30 p-4 rounded-2xl border border-rose-100">
                  <div className="flex items-center gap-2 text-rose-500 mb-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase">现病史</span>
                  </div>
                  <p className="text-[10px] font-bold text-rose-700 leading-relaxed">高血压（II级）、冠心病二级</p>
                </div>
                <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-100">
                   <div className="flex items-center gap-2 text-brand-blue mb-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase">医疗记录</span>
                  </div>
                  <p className="text-[10px] font-bold text-blue-700 leading-relaxed">体检：2026.03.15</p>
                </div>
             </div>
             <button className="w-full py-3.5 border border-dashed border-border-base rounded-xl flex items-center justify-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-widest active:bg-slate-50 transition-colors bg-white">
               <Plus className="w-3.5 h-3.5" />
               <span>添加病历附件</span>
             </button>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border-b last:border-0 border-slate-50">
      <div className="flex items-center gap-3">
        <div className="text-text-muted">{icon}</div>
        <span className="text-sm font-bold text-text-main">{label}</span>
      </div>
      <span className="text-sm font-medium text-text-muted">{value}</span>
    </div>
  );
}
