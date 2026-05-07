import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_USER } from '../constants';
import { Avatar } from '../components/Avatar';
import { 
  Bell, 
  ShieldAlert, 
  Battery, 
  Video, 
  MapPin, 
  Heart, 
  Activity, 
  Moon, 
  Zap, 
  Calendar, 
  BarChart3, 
  TrendingUp,
  ClipboardCheck,
  Lightbulb,
  Share2,
  BellRing,
  X,
  Plus
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { hasRobotBound, robots, activeRobotId, setActiveRobotId } = useAppContext();
  const [activeTab, setActiveTab] = useState('daily');
  const [showAlert, setShowAlert] = useState(hasRobotBound);

  const activeRobot = robots.find(r => r.id === activeRobotId) || robots[0];

  return (
    <Layout>
      {/* System Alert Overlay */}
      <AnimatePresence>
        {hasRobotBound && showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4 pointer-events-none"
          >
            <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border border-rose-100 rounded-[32px] p-4 shadow-2xl shadow-rose-900/10 pointer-events-auto ring-1 ring-rose-500/5 relative">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-500/20">
                  <BellRing className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="text-base font-black text-rose-600 leading-tight">紧急预警：生命体征异常</h3>
                    <span className="text-[10px] font-black text-rose-500/60 uppercase tracking-widest tabular-nums">14:20</span>
                  </div>
                  <p className="text-rose-900/70 text-[12px] leading-tight font-bold">
                    监测到心率 48 次/分，呼吸 10次/分
                  </p>
                </div>
                
                <button 
                  onClick={() => setShowAlert(false)}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 active:scale-90 transition-transform"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="flex gap-2.5">
                <button 
                  onClick={() => navigate('/alert-detail?id=4')}
                  className="flex-[1.5] bg-[#ff2d55] text-white py-3 rounded-2xl font-black text-xs active:scale-95 transition-all shadow-md shadow-rose-500/10"
                >
                  立即处理
                </button>
                <button className="flex-1 bg-white border border-rose-100 text-[#ff2d55] py-3 rounded-2xl font-black text-xs active:scale-95 transition-all">
                  一键呼叫120
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 pt-12 pb-4 bg-white border-b border-border-base">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-black text-text-main mt-1">早上好，大壮</h2>
          </div>
          <div className="flex gap-2">
            <Link
              to="/messages"
              className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-border-base relative active:scale-95 transition-transform"
            >
              <Bell className="w-5 h-5 text-text-muted" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </Link>
            <Link
              to="/profile"
              className="w-10 h-10 rounded-xl border border-border-base overflow-hidden active:scale-95 transition-transform"
            >
              <Avatar src={MOCK_USER.avatar} className="w-full h-full" />
            </Link>
          </div>
        </div>

        {/* Robot Quick Switcher */}
        {hasRobotBound && robots.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {robots.map((robot) => (
              <button
                key={robot.id}
                onClick={() => setActiveRobotId(robot.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shrink-0 active:scale-95 ${
                  activeRobotId === robot.id 
                    ? 'bg-brand-blue border-brand-blue text-white shadow-md' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${robot.status === 'online' ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">{robot.name.split(' - ')[1]}</span>
              </button>
            ))}
            <Link 
              to="/family-sharing" 
              className="w-8 h-8 rounded-full bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-400 shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="px-6 space-y-6 pt-6 pb-12 bg-white">
        {/* Robot Status Card */}
        <div className="bg-slate-50/50 rounded-[32px] p-5 border border-border-base relative overflow-hidden">
          {!hasRobotBound && (
            <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
              <Link 
                to="/bind" 
                className="bg-brand-blue text-white px-6 py-3 rounded-2xl font-black text-xs shadow-lg shadow-brand-blue/20 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>立即绑定智护设备</span>
              </Link>
            </div>
          )}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue border border-border-base shadow-sm">
                <RobotIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-text-main text-base tracking-tight">
                  {hasRobotBound ? activeRobot.name : '未绑定设备'}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${hasRobotBound && activeRobot.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${hasRobotBound && activeRobot.status === 'online' ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {hasRobotBound ? `${activeRobot.status === 'online' ? '在线' : '离线'}` : '离线'}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-border-base shadow-sm">
              <Battery className={`w-3.5 h-3.5 ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span className="text-[10px] font-black text-text-main tabular-nums">
                {hasRobotBound ? `${activeRobot.battery}%` : '--'}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 opacity-90">
            <Link 
              to={hasRobotBound ? "/control" : "#"} 
              className={`bg-white border border-border-base text-text-main py-3 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest active:scale-95 transition-transform shadow-sm ${!hasRobotBound && 'opacity-50 cursor-not-allowed'}`}
            >
              <Video className={`w-4 h-4 ${hasRobotBound ? 'text-brand-blue' : 'text-slate-300'}`} />
              <span>实时视频</span>
            </Link>
            <button 
              disabled={!hasRobotBound}
              className={`bg-white border border-border-base text-text-main py-3 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest active:scale-95 transition-transform shadow-sm ${!hasRobotBound && 'opacity-50 cursor-not-allowed'}`}
            >
              <MapPin className={`w-4 h-4 ${hasRobotBound ? 'text-orange-500' : 'text-slate-300'}`} />
              <span>自动归位</span>
            </button>
          </div>
        </div>

        {/* Health Summary Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[11px] font-black text-text-main uppercase tracking-widest opacity-60">今日健康摘要</h3>
            <span className="text-[9px] font-bold text-text-muted">
              {hasRobotBound ? '更新于 09:30' : '暂无同步数据'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to={hasRobotBound ? "/health?metric=heart" : "#"} 
              className="bg-white border border-border-base rounded-[32px] p-5 active:scale-[0.98] transition-all shadow-sm block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                   <Heart className="w-4 h-4" />
                </div>
                {hasRobotBound && (
                  <div className="bg-emerald-50 px-2 py-0.5 rounded-lg text-emerald-600 text-[8px] font-black uppercase">
                    正常
                  </div>
                )}
              </div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-tight mb-1">平均心率</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-text-main tabular-nums">
                  {hasRobotBound ? '72' : '-'}
                </span>
                <span className="text-[9px] font-bold text-text-muted">次/分</span>
              </div>
            </Link>

            <Link 
              to={hasRobotBound ? "/health?metric=sleep" : "#"} 
              className="bg-white border border-border-base rounded-[32px] p-5 active:scale-[0.98] transition-all shadow-sm block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                   <Moon className="w-4 h-4" />
                </div>
                {hasRobotBound && (
                  <div className="bg-indigo-50 px-2 py-0.5 rounded-lg text-indigo-600 text-[8px] font-black uppercase">
                    优质
                  </div>
                )}
              </div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-tight mb-1">睡眠时长</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-text-main tabular-nums">
                  {hasRobotBound ? '7.4' : '-'}
                </span>
                <span className="text-[9px] font-bold text-text-muted">小时</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <div className="flex bg-slate-50 p-1 rounded-xl">
             <button 
               onClick={() => setActiveTab('daily')}
               className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'daily' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
             >
                <Zap className={`w-3 h-3 ${activeTab === 'daily' ? 'fill-brand-blue' : ''}`} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">今日关怀</span>
             </button>
             <button 
               onClick={() => navigate('/health-report?type=weekly')}
               className={`flex-1 py-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'weekly' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
             >
                <Calendar className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">每周回顾</span>
             </button>
             <button 
               onClick={() => navigate('/health-report?type=monthly')}
               className={`flex-1 py-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'monthly' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
             >
                <BarChart3 className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">月度健康</span>
             </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'daily' ? (
              <motion.div
                key="daily-content"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="geo-card border border-border-base p-6 rounded-3xl"
              >
                <div className="flex items-center gap-2 mb-6">
                   <Activity className="w-5 h-5 text-brand-blue" />
                   <h4 className="text-sm font-black text-brand-blue uppercase tracking-tight">身体状态简报</h4>
                </div>
                
                <div className="grid grid-cols-4 divide-x divide-slate-100">
                   <div className="flex flex-col items-center px-1">
                      <p className="text-[10px] font-bold text-text-muted mb-2">今日步数</p>
                      <p className="text-base font-black text-text-main mb-1">{hasRobotBound ? '2,340' : '-'}</p>
                      <div className={`flex items-center gap-0.5 text-[8px] font-black uppercase ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`}>
                         <span className="text-[9px] leading-none">{hasRobotBound ? '√' : '-'}</span> {hasRobotBound ? '达标' : '离线'}
                      </div>
                   </div>
                   <div className="flex flex-col items-center px-1">
                      <p className="text-[10px] font-bold text-text-muted mb-2">血压</p>
                      <p className="text-base font-black text-text-main mb-1">{hasRobotBound ? '118/76' : '-'}</p>
                      <p className={`text-[8px] font-black uppercase tracking-tighter ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {hasRobotBound ? '血压' : '未监测'}
                      </p>
                   </div>
                   <div className="flex flex-col items-center px-1">
                      <p className="text-[10px] font-bold text-text-muted mb-2">血糖</p>
                      <p className="text-base font-black text-text-main mb-1">{hasRobotBound ? '5.4' : '-'}</p>
                      <p className={`text-[8px] font-black uppercase tracking-tighter ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {hasRobotBound ? '血糖' : '未监测'}
                      </p>
                   </div>
                   <div className="flex flex-col items-center px-1">
                      <p className="text-[10px] font-bold text-text-muted mb-2">服药</p>
                      <p className="text-base font-black text-text-main mb-1">{hasRobotBound ? '100%' : '-'}</p>
                      <p className={`text-[8px] font-black uppercase tracking-tighter ${hasRobotBound ? 'text-brand-blue' : 'text-slate-300'}`}>
                        {hasRobotBound ? '已确认' : '未记录'}
                      </p>
                   </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

function RobotIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}
