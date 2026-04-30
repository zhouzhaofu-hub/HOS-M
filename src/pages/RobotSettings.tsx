import React from 'react';
import { Layout } from '../components/Layout';
import { ChevronLeft, Volume2, Battery, RefreshCcw, Wifi, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RobotSettings() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-border-base">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-muted">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black text-text-main tracking-tight">机器人配置</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide">
          <section>
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 px-1 opacity-70">状态概览</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50/50 p-4 rounded-2xl border border-border-base shadow-sm">
                <Wifi className="w-4 h-4 text-brand-blue mb-2" />
                <p className="text-[9px] font-bold text-text-muted uppercase">网络连接</p>
                <p className="text-sm font-black text-text-main mt-0.5">5G • 强</p>
              </div>
              <div className="bg-slate-50/50 p-4 rounded-2xl border border-border-base shadow-sm">
                <Battery className="w-4 h-4 text-emerald-500 mb-2" />
                <p className="text-[9px] font-bold text-text-muted uppercase">当前电量</p>
                <p className="text-sm font-black text-text-main mt-0.5">85%</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest px-1 opacity-70">基础设置</h3>
            <div className="space-y-1 bg-white rounded-[24px] border border-border-base overflow-hidden divide-y divide-slate-50 shadow-sm">
              <SettingItem icon={<Volume2 className="w-4 h-4" />} label="提示音音量" value="60%" />
              <SettingItem icon={<ShieldCheck className="w-4 h-4" />} label="防撞灵敏度" value="中等" />
              <SettingItem icon={<RefreshCcw className="w-4 h-4" />} label="位置初始化" action="立即开始" />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function SettingItem({ icon, label, value, action }: { icon: React.ReactNode, label: string, value?: string, action?: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border-b last:border-0 border-slate-50">
      <div className="flex items-center gap-3">
        <div className="text-text-muted">{icon}</div>
        <span className="text-sm font-bold text-text-main">{label}</span>
      </div>
      {value && <span className="text-[11px] font-black text-brand-blue uppercase">{value}</span>}
      {action && <button className="text-[11px] font-black text-white bg-text-main px-3 py-1.5 rounded-lg active:scale-95 transition-transform">{action}</button>}
    </div>
  );
}
