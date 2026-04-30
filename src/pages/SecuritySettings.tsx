import React from 'react';
import { Layout } from '../components/Layout';
import { ChevronLeft, Lock, Shield, Eye, Smartphone, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SecuritySettings() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-border-base">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-muted">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black text-text-main tracking-tight">隐私与安全</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide">
          <section className="space-y-3">
             <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest px-1 opacity-70">数据安全</h3>
             <div className="bg-white rounded-[24px] border border-border-base shadow-sm overflow-hidden divide-y divide-slate-50">
                <SecurityToggle icon={<Lock className="w-4 h-4" />} label="端到端视频加密" enabledByDefault />
                <SecurityToggle icon={<Eye className="w-4 h-4" />} label="隐私遮蔽区域" />
                <SecurityToggle icon={<Shield className="w-4 h-4" />} label="数据自动脱敏" enabledByDefault />
             </div>
          </section>

          <section className="space-y-3">
             <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest px-1 opacity-70">访问授权</h3>
             <div className="bg-white rounded-[24px] border border-border-base shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-50 bg-white active:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-text-muted border border-white">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main tracking-tight">已授权设备</p>
                      <p className="text-[9px] text-text-muted uppercase font-black">iPhone 15 Pro • 刚刚活跃</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 rotate-180 text-text-muted opacity-40" />
                </div>
             </div>
          </section>

          <button className="w-full flex items-center justify-center gap-2 py-4 text-rose-500 font-black text-[10px] uppercase tracking-widest bg-rose-50/30 rounded-[20px] border border-rose-100 active:bg-rose-100 transition-colors mt-4">
            <Trash2 className="w-3.5 h-3.5" />
            <span>注销所有设备并删除数据</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}

function SecurityToggle({ icon, label, enabledByDefault = false }: { icon: React.ReactNode, label: string, enabledByDefault?: boolean }) {
  const [enabled, setEnabled] = React.useState(enabledByDefault);
  return (
    <div className="flex items-center justify-between p-5 bg-white border-b last:border-0 border-slate-50">
      <div className="flex items-center gap-3">
        <div className="text-text-muted">{icon}</div>
        <span className="text-sm font-bold text-text-main">{label}</span>
      </div>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`w-10 h-5 rounded-full relative transition-all duration-300 ${enabled ? 'bg-brand-blue' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}
