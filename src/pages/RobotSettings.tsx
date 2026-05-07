import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { 
  ChevronLeft, 
  Volume2, 
  Battery, 
  RefreshCcw, 
  Wifi, 
  ShieldCheck, 
  Bot, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function RobotSettings() {
  const navigate = useNavigate();
  const { robots, activeRobotId, setActiveRobotId } = useAppContext();
  
  const activeRobot = robots.find(r => r.id === activeRobotId) || robots[0];
  const [isSwitching, setIsSwitching] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col h-full bg-slate-50/50 relative">
        {/* Compact Header */}
        <div className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-slate-50/50 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-slate-950 tracking-tight">机器人配置</h1>
          </div>
          
          <button 
            onClick={() => setIsSwitching(!isSwitching)}
            className="px-3 py-1.5 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center gap-2 group transition-all"
          >
            <RefreshCw className={`w-3 h-3 transition-transform duration-500 ${isSwitching ? 'rotate-180' : ''}`} />
            <span className="text-[9px] font-black uppercase tracking-widest">切换设备</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-20 scrollbar-hide">
          {/* Quick Switch Panel */}
          <AnimatePresence>
            {isSwitching && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-white rounded-2xl border border-slate-100 mb-6 shadow-xl shadow-slate-200/50"
              >
                <div className="p-2 space-y-1">
                  {robots.map((robot) => (
                    <button
                      key={robot.id}
                      onClick={() => {
                        setActiveRobotId(robot.id);
                        setIsSwitching(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeRobotId === robot.id 
                          ? 'bg-brand-blue text-white shadow-md' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5" />
                        <span className="text-xs font-black">{robot.name}</span>
                      </div>
                      {activeRobotId === robot.id && (
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current Device Preview */}
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-brand-blue/10 transition-colors" />
            
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-white shadow-sm">
                <div className="relative">
                  <Bot className={`w-8 h-8 ${activeRobot.status === 'online' ? 'text-slate-900' : 'text-slate-300'}`} />
                  {activeRobot.status === 'online' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-base font-black text-slate-900">{activeRobot.name}</h2>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
                  ID: RB_{activeRobot.id}10293
                </p>
              </div>
            </div>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-brand-blue mb-3">
                <Wifi className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">网络连接</p>
              <h4 className="text-sm font-black text-slate-900 mt-1">{activeRobot.wifi}</h4>
            </div>
            
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-3">
                <Battery className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">当前电量</p>
              <h4 className="text-sm font-black text-slate-900 mt-1">{activeRobot.battery}%</h4>
            </div>
          </div>

          {/* Settings Group */}
          <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
            <SettingsItem 
              icon={<Volume2 className="w-4 h-4" />} 
              label="提示音音量" 
              value={`${activeRobot.settings.volume}%`} 
              accent="blue" 
            />
            <SettingsItem 
              icon={<ShieldCheck className="w-4 h-4" />} 
              label="防碰撞灵敏度" 
              value={activeRobot.settings.sensitivity} 
              accent="slate" 
            />
            <div className="p-5">
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">位置初始化</span>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                  立即开始
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function SettingsItem({ icon, label, value, accent }: { icon: React.ReactNode, label: string, value: string, accent: 'blue' | 'slate' }) {
  return (
    <button className="w-full p-5 flex items-center justify-between active:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
          accent === 'blue' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-slate-50 text-slate-400'
        }`}>
          {icon}
        </div>
        <span className="text-sm font-black text-slate-900 tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-[11px] font-black ${accent === 'blue' ? 'text-brand-blue' : 'text-slate-400'}`}>{value}</span>
        <ChevronRight className="w-4 h-4 text-slate-200 group-active:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}
