import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_USER, MOCK_ROBOT, MOCK_HEALTH } from '../constants';
import { Avatar } from '../components/Avatar';
import { 
  Bell, 
  ShieldAlert, 
  Battery, 
  Video, 
  MapPin, 
  Heart, 
  ChevronRight, 
  Activity, 
  Moon, 
  Zap, 
  Calendar, 
  BarChart3, 
  CheckCircle2,
  TrendingUp,
  ClipboardCheck,
  Lightbulb,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <Layout>
      <div className="px-6 pt-12 pb-4 flex justify-between items-end border-b border-border-base bg-white">
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

      <div className="px-6 space-y-6 pt-6 pb-12 bg-white">
        {/* Urgent Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-rose-600 font-bold text-sm">跌倒告警</p>
            <p className="text-rose-400 text-[10px] font-black uppercase tracking-wider mt-0.5">客厅 10:24 • 实时</p>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-300" />
        </motion.div>

        {/* Robot Status Card */}
        <div className="geo-card border-none bg-slate-50">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-blue border border-border-base">
                  <RobotIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-black text-text-main text-base uppercase tracking-tight">{MOCK_ROBOT.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{MOCK_ROBOT.location}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white px-2 py-1 rounded flex items-center gap-1.5 border border-border-base">
                <Battery className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-black text-text-main">{MOCK_ROBOT.battery}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/control"
                className="btn-flat-primary flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>实时视频</span>
              </Link>
              <button className="btn-flat-secondary flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>自动归位</span>
              </button>
            </div>
          </div>
        </div>

        {/* New Health Summary Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-base font-black text-text-main tracking-tight">今日健康摘要</h3>
            <span className="text-[10px] font-bold text-text-muted">更新于 09:30</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Link to="/health?metric=heart" className="geo-card bg-white border border-border-base rounded-[28px] p-4 flex flex-col items-center active:scale-[0.98] transition-all shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-text-muted shadow-inner">
                   <Heart className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-tight">心率数据</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-black text-text-main leading-none tabular-nums">72</span>
                <span className="text-[9px] font-bold text-text-muted">BPM</span>
              </div>
              <div className="bg-emerald-50/50 px-3 py-0.5 rounded-full text-emerald-600 text-[8.5px] font-black uppercase">
                实时正常
              </div>
            </Link>

            <Link to="/health?metric=sleep" className="geo-card bg-white border border-border-base rounded-[28px] p-4 flex flex-col items-center active:scale-[0.98] transition-all shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-text-muted shadow-inner">
                   <Moon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-tight">昨晚睡眠</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-black text-text-main leading-none tabular-nums">7.4</span>
                <span className="text-[9px] font-bold text-text-muted">小时</span>
              </div>
              <div className="bg-blue-50/50 px-3 py-0.5 rounded-full text-brand-blue text-[8.5px] font-black uppercase">
                质量优质
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
               onClick={() => setActiveTab('weekly')}
               className={`flex-1 py-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'weekly' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
             >
                <Calendar className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">每周回顾</span>
             </button>
             <button 
               onClick={() => setActiveTab('monthly')}
               className={`flex-1 py-1 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'monthly' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
             >
                <BarChart3 className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">月度深度</span>
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
                      <p className="text-base font-black text-text-main mb-1">2,340</p>
                      <div className="flex items-center gap-0.5 text-emerald-500 text-[8px] font-black uppercase">
                         <span className="text-[9px] leading-none">√</span> 达标
                      </div>
                   </div>
                   <div className="flex flex-col items-center px-1">
                      <p className="text-[10px] font-bold text-text-muted mb-2">血压</p>
                      <p className="text-base font-black text-text-main mb-1">118/76</p>
                      <p className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">血压正常 (mmHg)</p>
                   </div>
                   <div className="flex flex-col items-center px-1">
                      <p className="text-[10px] font-bold text-text-muted mb-2">血糖</p>
                      <p className="text-base font-black text-text-main mb-1">5.4</p>
                      <p className="text-[8px] font-black text-emerald-500 uppercase tracking-tighter">血糖正常 (mmol/L)</p>
                   </div>
                   <div className="flex flex-col items-center px-1">
                      <p className="text-[10px] font-bold text-text-muted mb-2">服药</p>
                      <p className="text-base font-black text-text-main mb-1">100%</p>
                      <p className="text-[8px] font-black text-brand-blue uppercase tracking-tighter">已确认</p>
                   </div>
                </div>
              </motion.div>
            ) : activeTab === 'weekly' || activeTab === 'monthly' ? (
              <motion.div
                key="report-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4"
              >
                {/* Indicator Summary */}
                <div className="geo-card border-none bg-slate-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-brand-blue" />
                    <h4 className="text-xs font-black text-text-main uppercase tracking-tight">{activeTab === 'weekly' ? '本周' : '本月'}指标总结</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white p-3 rounded-xl border border-border-base text-center">
                      <p className="text-[9px] font-bold text-text-muted mb-1">血压均值</p>
                      <p className="text-sm font-black text-text-main">122/78</p>
                      <p className="text-[8px] font-bold text-emerald-500 mt-1">达标</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-border-base text-center">
                      <p className="text-[9px] font-bold text-text-muted mb-1">血糖均值</p>
                      <p className="text-sm font-black text-text-main">5.6</p>
                      <p className="text-[8px] font-bold text-emerald-500 mt-1">达标</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-border-base text-center">
                      <p className="text-[9px] font-bold text-text-muted mb-1">异常次数</p>
                      <p className="text-sm font-black text-rose-500">{activeTab === 'weekly' ? '2' : '5'}</p>
                      <p className="text-[8px] font-bold text-rose-400 mt-1">需关注</p>
                    </div>
                  </div>
                </div>

                {/* Compliance Summary */}
                <div className="geo-card border-none bg-slate-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <ClipboardCheck className="w-4 h-4 text-brand-blue" />
                    <h4 className="text-xs font-black text-text-main uppercase tracking-tight">依从性总结</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-text-muted">用药按时率</span>
                      <span className="text-text-main">98%</span>
                    </div>
                    <div className="h-1.5 bg-white rounded-full overflow-hidden border border-border-base">
                      <div className="h-full bg-emerald-500 w-[98%]"></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-text-muted">测量完成率</span>
                      <span className="text-text-main">92%</span>
                    </div>
                    <div className="h-1.5 bg-white rounded-full overflow-hidden border border-border-base">
                      <div className="h-full bg-brand-blue w-[92%]"></div>
                    </div>
                  </div>
                </div>

                {/* Health Advice */}
                <div className="geo-card border-none bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-tight">AI 健康建议</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-800 font-medium tracking-tight">
                    {activeTab === 'weekly' 
                      ? '本周血压在早晨时段有波动，建议监测晨起第一次服药后的反应，并减少晚餐盐分摄入。' 
                      : '本月整体指标趋稳，但深度睡眠时长相比上月缩短12%，建议改善睡前环境亮度。'}
                  </p>
                </div>

                {/* Doctor Sharing */}
                <button className="w-full btn-flat-primary flex items-center justify-center gap-2 py-4">
                  <Share2 className="w-4 h-4" />
                  <span>生成医生分享版 PDF 简报</span>
                </button>
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

function ThermometerIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}

