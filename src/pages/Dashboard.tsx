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
  const [showAlert, setShowAlert] = useState(hasRobotBound);

  const activeRobot = robots.find(r => r.id === activeRobotId) || robots[0] || null;

  const HEALTH_EVENTS = [
    { id: 1, time: '10:30', title: '服药确认', detail: '硝苯地平缓释片 1片', status: 'completed' },
    { id: 2, time: '09:15', title: '运动完成', detail: '室内康复步行 15分钟', status: 'completed' },
    { id: 3, time: '08:00', title: '服药确认', detail: '阿司匹林肠溶片 1片', status: 'completed' },
    { id: 4, time: '07:30', title: '生理指标监测', detail: '血压: 150/95 毫米汞柱 (偏高)', status: 'warning' },
  ];

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
                    <h3 className="text-base font-black text-rose-600 leading-tight tracking-tight uppercase">紧急预警：生命体征异常</h3>
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
                  className="flex-[1.5] bg-[#ff2d55] text-white py-3 rounded-2xl font-black text-xs active:scale-95 transition-all shadow-md shadow-rose-500/10 uppercase tracking-widest"
                >
                  立即处理
                </button>
                <button className="flex-1 bg-white border border-rose-100 text-[#ff2d55] py-3 rounded-2xl font-black text-xs active:scale-95 transition-all uppercase tracking-widest">
                  一键呼叫120
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 pt-8 pb-3 bg-white border-b border-slate-100">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 mt-1 tracking-tight italic uppercase">早安，主人</h2>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-0.5">智能生活看板</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/messages"
              className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 relative active:scale-95 transition-transform"
            >
              <Bell className="w-4.5 h-4.5 text-slate-400" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </Link>
            <Link
              to="/profile"
              className="w-9 h-9 rounded-xl border border-slate-100 overflow-hidden active:scale-95 transition-transform"
            >
              <Avatar src={MOCK_USER.avatar} className="w-full h-full" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 space-y-4 pt-4 pb-20 bg-[#F8FAFC]">
        {/* Physical Status Briefing */}
        <div className="space-y-3">
          <div className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">生理指标简报</h4>
               <div className="bg-blue-50 px-1.5 py-0.5 rounded-lg">
                  <span className="text-[7px] font-black text-blue-600 uppercase tracking-widest">实时已同步</span>
               </div>
            </div>
            
            <p className="text-[11px] font-bold text-slate-500 mb-6 leading-relaxed bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
              今日健康概况：生命体征整体平稳，心率与呼吸频率处于理想区间。注意：当前收缩压略高于预警线（140mmHg），建议减少钠盐摄入并增加静息休息。
            </p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
               <div className="flex flex-col">
                  <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">心率指标 <span className="text-[8px] font-bold opacity-60 ml-1">(正常: 60-100)</span></p>
                  <p className="text-xl font-black text-slate-900 tabular-nums">{hasRobotBound ? '72' : '-'}</p>
                  <div className={`flex items-center gap-1 text-[8px] font-black uppercase tracking-widest ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`}>
                     <div className={`w-1 h-1 rounded-full ${hasRobotBound ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`} />
                     {hasRobotBound ? '状态优秀' : '暂无数据'}
                  </div>
               </div>
               <div className="flex flex-col">
                  <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">平均血压 <span className="text-[8px] font-bold opacity-60 ml-1">(正常: &lt;140/90)</span></p>
                  <p className={`text-xl font-black tabular-nums ${hasRobotBound ? 'text-orange-500' : 'text-slate-900'}`}>{hasRobotBound ? '150/95' : '-'}</p>
                  <p className={`text-[8px] font-black uppercase tracking-widest ${hasRobotBound ? 'text-orange-500' : 'text-slate-300'}`}>
                    {hasRobotBound ? '血压偏高' : '暂无数据'}
                  </p>
               </div>
               <div className="flex flex-col">
                  <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">呼吸指标 <span className="text-[8px] font-bold opacity-60 ml-1">(正常: 12-20)</span></p>
                  <p className="text-xl font-black text-slate-900 tabular-nums">{hasRobotBound ? '18' : '-'}</p>
                  <p className={`text-[8px] font-black uppercase tracking-widest ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`}>
                    {hasRobotBound ? '频率平稳' : '暂无数据'}
                  </p>
               </div>
               <div className="flex flex-col">
                  <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">睡眠时长 <span className="text-[8px] font-bold opacity-60 ml-1">(建议: 7-9h)</span></p>
                  <p className="text-xl font-black text-slate-900 tabular-nums">{hasRobotBound ? '7.5h' : '-'}</p>
                  <p className={`text-[8px] font-black uppercase tracking-widest ${hasRobotBound ? 'text-blue-500' : 'text-slate-300'}`}>
                    {hasRobotBound ? '睡眠充足' : '暂无记录'}
                  </p>
               </div>
            </div>
          </div>

          {/* Health Events List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">24H 健康记录轨迹</h3>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">时间倒序</span>
            </div>
            
            <div className="bg-white rounded-[32px] border border-slate-100 divide-y divide-slate-50 overflow-hidden shadow-sm">
              {HEALTH_EVENTS.map((event) => (
                <div key={event.id} className="p-4 flex items-start gap-3 active:bg-slate-50 transition-colors">
                  <div className="text-[10px] font-black text-slate-300 w-12 pt-0.5 uppercase tracking-widest shrink-0 tabular-nums">{event.time}</div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[14px] font-black text-slate-800 leading-tight uppercase tracking-tight">{event.title}</h5>
                    <p className="text-[11px] text-slate-400 font-bold mt-1 tracking-tight">{event.detail}</p>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${event.status === 'completed' ? 'bg-emerald-500 shadow-md shadow-emerald-500/20' : 'bg-blue-500 shadow-md shadow-blue-500/20'}`} />
                </div>
              ))}
              {!hasRobotBound && (
                <div className="p-12 text-center">
                  <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.3em] italic">等待同步中...</p>
                </div>
              )}
            </div>
            
            {hasRobotBound && (
               <button onClick={() => navigate('/health')} className="w-full py-4 text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] bg-white rounded-[24px] active:scale-[0.98] transition-all border border-slate-100 shadow-sm">
                  查看完整健康看板 ➜
               </button>
            )}
          </div>
        </div>

        {/* Robot Status Card - Moved down or made smaller */}
        <div className="bg-slate-900 rounded-[32px] p-6 relative overflow-hidden shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-3xl -mr-10 -mt-10 pointer-events-none" />
          
          {!hasRobotBound && (
            <div className="absolute inset-0 z-10 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4">
              <Link 
                to="/bind" 
                className="w-full bg-blue-600 text-white py-3.5 rounded-2xl font-black text-[10px] shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all uppercase tracking-widest"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>立即绑定智护终端</span>
              </Link>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 border border-white/5 backdrop-blur-md">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-black text-white text-base tracking-tight leading-none uppercase">
                  {activeRobot ? activeRobot.name : '未绑定设备'}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${activeRobot && activeRobot.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${activeRobot && activeRobot.status === 'online' ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {activeRobot ? `${activeRobot.status === 'online' ? '已连接' : '连接中断'}` : '无信号'}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-white/5 backdrop-blur-md">
              <span className="text-[10px]">🔋</span>
              <span className="text-[11px] font-black text-white tabular-nums">
                {activeRobot ? `${activeRobot.battery}%` : '--'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to={hasRobotBound ? "/control" : "#"} 
              className={`bg-white text-slate-900 py-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg ${!hasRobotBound && 'opacity-30 cursor-not-allowed'}`}
            >
              <span className="text-base leading-none">📹</span>
              <span>远程控制</span>
            </Link>
            <button 
              disabled={!hasRobotBound}
              className={`bg-white/10 border border-white/10 text-white py-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform backdrop-blur-md ${!hasRobotBound && 'opacity-30 cursor-not-allowed'}`}
            >
              <span className="text-base leading-none">🏠</span>
              <span>自动归位</span>
            </button>
          </div>
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
