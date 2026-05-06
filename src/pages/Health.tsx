import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { 
  Heart, 
  Activity, 
  ShieldAlert, 
  Footprints, 
  ChevronRight, 
  Zap, 
  TrendingUp, 
  LayoutGrid
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// Mock data for different report types
const DAILY_DATA = {
  conclusion: "今日体征稳健，午间有一次心率略高，建议午后减少剧烈活动。康复步数已达标 85%。今日未发生安全摔倒事件。",
  vitals: { heart: 72, bp: "122/78", oxygen: 98 },
  safety: [
    { time: "10:24", event: "摔倒监测系统：正常", type: "info" },
    { time: "08:15", event: "离床活动记录", type: "info" }
  ],
  exercise: { steps: 3420, goal: 4000, activeMins: 15 },
  chart: [
    { time: '08:00', val: 68 }, { time: '10:00', val: 72 }, { time: '12:00', val: 88 }, 
    { time: '14:00', val: 75 }, { time: '16:00', val: 71 }, { time: '18:00', val: 70 }
  ]
};

const WEEKLY_DATA = {
  conclusion: "本周睡眠质量提升 12%，晨间血压波动趋于平缓。周三记录到一次轻微步态不稳，需关注平衡训练。",
  vitals: { heart: 74, bp: "125/80", oxygen: 97 },
  safety: [
    { time: "周三", event: "疑似步态不稳记录", type: "alert" },
    { time: "周五", event: "自主康复任务完成", type: "success" }
  ],
  exercise: { steps: 24500, goal: 28000, activeMins: 120 },
  chart: [
    { time: '周一', val: 70 }, { time: '周二', val: 72 }, { time: '周三', val: 82 }, 
    { time: '周四', val: 74 }, { time: '周五', val: 71 }, { time: '周六', val: 69 }, { time: '周日', val: 72 }
  ]
};

const MONTHLY_DATA = {
  conclusion: "4月度健康评分 92分。静息心率均值下降 3bpm，心血管耐力有所增强。建议五月份增加室外阳光下漫步。",
  vitals: { heart: 71, bp: "120/78", oxygen: 98 },
  safety: [
    { time: "04-12", event: "异常久坐提醒", type: "warning" },
    { time: "04-28", event: "月度体检资料上传", type: "success" }
  ],
  exercise: { steps: 112000, goal: 120000, activeMins: 480 },
  chart: [
    { time: '1周', val: 75 }, { time: '2周', val: 78 }, { time: '3周', val: 72 }, { time: '4周', val: 70 }
  ]
};

type ReportType = 'daily' | 'weekly' | 'monthly';

export default function Health() {
  const [reportType, setReportType] = useState<ReportType>('daily');
  
  const data = reportType === 'daily' ? DAILY_DATA : reportType === 'weekly' ? WEEKLY_DATA : MONTHLY_DATA;
  const title = reportType === 'daily' ? '健康日报' : reportType === 'weekly' ? '健康周报' : '健康月报';

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Header Content */}
        <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">智护健康中心</h1>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue border border-blue-100 shadow-sm">
               <LayoutGrid className="w-4 h-4" />
            </div>
          </div>

          {/* Report Type Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['daily', 'weekly', 'monthly'] as ReportType[]).map((type) => (
              <button
                key={type}
                onClick={() => setReportType(type)}
                className={`flex-1 py-1.5 text-[11px] font-black rounded-lg transition-all ${
                  reportType === type ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-400'
                }`}
              >
                {type === 'daily' ? '日报' : type === 'weekly' ? '周报' : '月报'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={reportType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 space-y-6"
            >
              {/* Summary Conclusion Section */}
              <div className="bg-slate-900 rounded-[28px] p-6 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Zap className="w-4 h-4 text-brand-blue fill-brand-blue" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue/80">AI 综合视角结论 · {title}</span>
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-90 tracking-tight relative z-10">
                  {data.conclusion}
                </p>
              </div>

              {/* Vital Signs Grid */}
              <div className="grid grid-cols-3 gap-3">
                <MetricCard 
                  icon={<Heart className="w-4 h-4 text-rose-500" />} 
                  label="平均心率" 
                  value={data.vitals.heart} 
                  unit="BPM" 
                  color="text-rose-600"
                />
                <MetricCard 
                  icon={<Activity className="w-4 h-4 text-blue-500" />} 
                  label="血压水平" 
                  value={data.vitals.bp} 
                  unit="mmHg" 
                  color="text-blue-600"
                />
                <MetricCard 
                  icon={<Activity className="w-4 h-4 text-emerald-500" />} 
                  label="血氧饱和" 
                  value={data.vitals.oxygen} 
                  unit="%" 
                  color="text-emerald-600"
                />
              </div>

              {/* Chart Section */}
              <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-none">核心体征趋势</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">HEALTH SIGNALS ANALYSIS</p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm shadow-emerald-100/50">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-[8px] font-black text-emerald-600 uppercase">体征稳健</span>
                  </div>
                </div>
                
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chart} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} 
                      />
                      <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '10px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke="#2563EB" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#chartGradient)"
                        dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Safety & Events */}
              <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-none">安全监测报告</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">SAFETY MONITORING</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {data.safety.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 active:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          item.type === 'alert' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 
                          item.type === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'
                        }`} />
                        <div>
                          <p className="text-xs font-black text-slate-800 tracking-tight">{item.event}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{item.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  ))}
                  <button className="w-full py-4 border border-dashed border-slate-200 rounded-2xl text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] active:bg-slate-50 transition-colors mt-2">
                    查看完整监控历史日志
                  </button>
                </div>
              </div>

              {/* Rehabilitation Section */}
              <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
                    <Footprints className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-none">康复指标分析</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">EXERCISE & MOBILITY</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider">活跃时长</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight">{data.exercise.activeMins} <span className="text-[10px] text-slate-400">MINS</span></p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider">目标进度</p>
                    <p className="text-lg font-black text-emerald-500 tabular-nums">{Math.round((data.exercise.steps / data.exercise.goal) * 100)}%</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-tight">周期步数: {data.exercise.steps.toLocaleString()} / {data.exercise.goal.toLocaleString()}</span>
                    <span className="text-[9px] font-black text-slate-300">{(data.exercise.steps / data.exercise.goal * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (data.exercise.steps / data.exercise.goal) * 100)}%` }}
                      className="h-full bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

function MetricCard({ icon, label, value, unit, color }: { icon: React.ReactNode, label: string, value: string | number, unit: string, color: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2 hover:border-slate-200 transition-colors group">
      <div className="flex items-center gap-1.5 overflow-hidden">
        <div className="shrink-0 scale-90 group-hover:scale-100 transition-transform">{icon}</div>
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight truncate">{label}</span>
      </div>
      <div className="truncate">
        <span className={`text-sm font-black ${color} tracking-tight`}>{value}</span>
        <span className="text-[8px] text-slate-300 font-bold ml-1 uppercase">{unit}</span>
      </div>
    </div>
  );
}
