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
  Plus,
  BarChart3,
  Thermometer,
  Wind,
  CloudRain,
  BrainCircuit,
  AlertTriangle,
  Share2,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

// New environmental data mock
const ENV_DATA = {
  temp: 24,
  humidity: 62,
  aqi: 42,
  pm25: 12,
  pollen: "低",
  condition: "晴转多云"
};

// Mock data for different report types
const DAILY_DATA = {
  conclusion: "今日体征稳健。环境监测显示 PM2.5 较低，适合下午 16:00 进行户外康复散步。AI 预测：由于明日冷空气来袭，建议提前调高室内恒温，预防血压季节性波动。",
  vitals: { heart: 72, bp: "150/95", oxygen: 98 },
  safety: [
    { time: "10:24", event: "摔倒监测系统：正常", type: "info" },
    { time: "08:15", event: "离床活动记录", type: "info" }
  ],
  exercise: { steps: 3420, goal: 4000, activeMins: 15 },
  prediction: {
    riskLevel: "低",
    score: 95,
    factors: ["温差变化", "睡眠时长"],
    trend: "提升"
  },
  chart: [
    { time: '08:00', val: 68 }, { time: '10:00', val: 72 }, { time: '12:00', val: 88 }, 
    { time: '14:00', val: 75 }, { time: '16:00', val: 71 }, { time: '18:00', val: 70 }
  ]
};

const WEEKLY_DATA = {
  conclusion: "本周睡眠质量提升 12%。体征关联分析显示：室内湿度过高与您夜间呼吸频率微增具有强相关性，已自动开启除湿。下周建议：预防南方湿冷引起的关节僵硬。",
  vitals: { heart: 74, bp: "152/98", oxygen: 97 },
  safety: [
    { time: "周三", event: "疑似步态不稳记录", type: "alert" },
    { time: "周五", event: "自主康复任务完成", type: "success" }
  ],
  exercise: { steps: 24500, goal: 28000, activeMins: 120 },
  prediction: {
    riskLevel: "中",
    score: 82,
    factors: ["湿度异常", "步态不稳"],
    trend: "平稳"
  },
  chart: [
    { time: '周一', val: 70 }, { time: '周二', val: 72 }, { time: '周三', val: 82 }, 
    { time: '周四', val: 74 }, { time: '周五', val: 71 }, { time: '周六', val: 69 }, { time: '周日', val: 72 }
  ]
};

const MONTHLY_DATA = {
  conclusion: "4月度健康洞察：生命体征与环境适应性极佳。AI 风险模型提示：5月将进入花粉高发期，您的呼吸道风险系数将从 5% 升至 18%，请减少开窗。",
  vitals: { heart: 71, bp: "148/92", oxygen: 98 },
  safety: [
    { time: "04-12", event: "异常久坐提醒", type: "warning" },
    { time: "04-28", event: "月度体检资料上传", type: "success" }
  ],
  exercise: { steps: 112000, goal: 120000, activeMins: 480 },
  prediction: {
    riskLevel: "低",
    score: 88,
    factors: ["花粉过敏", "温差控制"],
    trend: "下降"
  },
  chart: [
    { time: '1周', val: 75 }, { time: '2周', val: 78 }, { time: '3周', val: 72 }, { time: '4周', val: 70 }
  ]
};

const QUARTERLY_DATA = {
  conclusion: "Q2季度健康全景：生命体能指数整体上扬 5.4%。血压及心率稳定性在季节交替期间表现卓越。AI 长周期预测：随着夏季气候升温，需加强日间水分摄入及室内活动量，防范轻度虚脱风险。",
  vitals: { heart: 70, bp: "150/95", oxygen: 99 },
  safety: [
    { time: "05-08", event: "周期性自动更新", type: "info" }
  ],
  exercise: { steps: 320000, goal: 360000, activeMins: 1500 },
  prediction: {
    riskLevel: "极低",
    score: 91,
    factors: ["季节性适应", "心输出量"],
    trend: "走强"
  },
  chart: [
    { time: '4月', val: 72 }, { time: '5月', val: 70 }, { time: '6月', val: 69 }
  ]
};

type ReportType = 'weekly' | 'monthly' | 'quarterly';

export default function Health() {
  const { hasRobotBound } = useAppContext();
  const [reportType, setReportType] = useState<ReportType>('weekly');
  
  const data = reportType === 'weekly' ? WEEKLY_DATA : reportType === 'monthly' ? MONTHLY_DATA : QUARTERLY_DATA;
  const title = reportType === 'weekly' ? '健康周报' : reportType === 'monthly' ? '健康月报' : '健康季报';

  // Empty data values
  const displayVitals = {
    heart: hasRobotBound ? data.vitals.heart : '-',
    bp: hasRobotBound ? data.vitals.bp : '-',
    oxygen: hasRobotBound ? data.vitals.oxygen : '-'
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Modern Glass Header */}
        <div className="bg-white px-8 pt-10 pb-10 border-b border-slate-100/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <span className="text-8xl font-black italic select-none">数据</span>
          </div>
          
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none italic uppercase">智报系统</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-3">智能健康系统 / {new Date().getFullYear()}</p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-[24px] bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-1.5 rounded-[32px] border border-slate-100 flex gap-2 relative z-10 shadow-inner">
            {(['weekly', 'monthly', 'quarterly'] as ReportType[]).map((type) => (
              <button
                key={type}
                onClick={() => setReportType(type)}
                className={`flex-1 py-4 text-[11px] font-black rounded-[24px] transition-all uppercase tracking-widest ${
                  reportType === type 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 ring-2 ring-blue-500/10' 
                    : 'text-slate-400 hover:text-slate-600 font-black'
                }`}
              >
                {type === 'weekly' ? '周报' : type === 'monthly' ? '月报' : '季报'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 relative">
          {!hasRobotBound && (
            <div className="absolute inset-0 z-50 bg-slate-50/60 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h2 className="text-lg font-black text-slate-800 mb-2">未绑定健康监测设备</h2>
              <p className="text-xs text-slate-400 font-bold mb-8 max-w-[200px] leading-relaxed">
                绑定智护机器人以同步实时运动机能、心率及睡眠数据，并生成精准健康报告。
              </p>
              <Link to="/settings" className="px-8 py-3 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                立即去绑定设备
              </Link>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={reportType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-6 py-8 space-y-8"
            >
              {/* Summary Conclusion Section - AI Recommendation */}
              <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <BrainCircuit className="w-12 h-12 text-blue-600" />
                </div>
                <p className="text-[11px] font-black text-slate-800 leading-relaxed text-center">
                  {hasRobotBound ? `AI 评估建议：当前生理机能处于"${data.prediction.riskLevel === '极低' || data.prediction.riskLevel === '低' ? '卓越' : '稳定'}"状态，建议维持健康生活习惯。` : '当前尚未同步到设备监测数据，请优先查看历史快照。'}
                </p>
              </div>

              {/* Basic Vitals Grid */}
              <div className="grid grid-cols-2 gap-4">
                <MetricCard 
                  icon={<Heart className="w-5 h-5 text-rose-500" />}
                  label="平均心率"
                  value={displayVitals.heart}
                  unit="次/分"
                  color="text-slate-800"
                />
                <MetricCard 
                  icon={<Activity className="w-5 h-5 text-indigo-500" />}
                  label="平均血压"
                  value={displayVitals.bp}
                  unit="毫米汞柱"
                  color="text-orange-500"
                />
                <MetricCard 
                  icon={<Wind className="w-5 h-5 text-blue-500" />}
                  label="依从性比例"
                  value={displayVitals.oxygen}
                  unit="%"
                  color="text-slate-800"
                />
                <MetricCard 
                  icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
                  label="健康指数"
                  value={hasRobotBound ? data.prediction.score : '-'}
                  unit="分"
                  color="text-emerald-500"
                />
              </div>

              {/* Chart Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">生命指征趋势</h3>
                  <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border shadow-sm ${hasRobotBound ? 'bg-emerald-50 border-emerald-100 shadow-emerald-100/50' : 'bg-slate-50 border-slate-100'}`}>
                    {hasRobotBound ? (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">稳健上升</span>
                      </>
                    ) : (
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">暂无监测信号</span>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                  <div className="h-64 w-full flex items-center justify-center bg-slate-50/30 rounded-3xl border border-dashed border-slate-100">
                    {hasRobotBound ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.chart} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis 
                            dataKey="time" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} 
                          />
                          <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 900 }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="val" 
                            stroke="#2563EB" 
                            strokeWidth={5} 
                            fillOpacity={1} 
                            fill="url(#chartGradient)"
                            dot={{ r: 5, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 8, fill: '#2563EB', strokeWidth: 3, stroke: '#fff' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex flex-col items-center gap-3 opacity-20">
                         <span className="text-4xl grayscale">📉</span>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">等待同步中</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Predictive Risk Section */}
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[20px] bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight leading-none">AI 未来风险预测</h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2">AI 风险预测系统</p>
                    </div>
                  </div>
                  {hasRobotBound && (
                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                      data.prediction.riskLevel === '低' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {data.prediction.riskLevel}风险
                    </div>
                  )}
                </div>

                {!hasRobotBound ? (
                    <div className="py-10 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">等待同步中...</p>
                    </div>
                ) : (
                  <div className="space-y-6 relative z-10">
                     <div className="flex items-center justify-between p-5 bg-slate-50 rounded-[28px] border border-slate-100">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">综合稳定性</p>
                           <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-black text-slate-800 tabular-nums">{data.prediction.score}</span>
                              <span className="text-[10px] font-black text-slate-300">健康分</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className={`text-[11px] font-black uppercase tracking-tighter ${data.prediction.trend === '提升' ? 'text-emerald-500' : 'text-blue-500'}`}>
                              {data.prediction.trend === '提升' ? '↗ 状态看涨' : '→ 周期稳健'}
                           </p>
                           <div className="h-1.5 w-24 bg-slate-200/50 rounded-full mt-2 overflow-hidden border border-slate-100/50 shadow-inner">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${data.prediction.score}%` }}
                                className={`h-full rounded-full ${data.prediction.score > 85 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-blue-500 shadow-lg shadow-blue-500/20'}`}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3">
                        {data.prediction.factors.map((factor, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-50 flex items-center gap-3 shadow-sm group hover:border-indigo-100 transition-colors">
                             <div className="w-1 h-1 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform" />
                             <span className="text-[11px] font-black text-slate-700 tracking-tight">{factor}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>

              {/* Rehabilitation Section */}
              <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
                    <Footprints className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-none">康复指标分析</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">运动与活动能力评估</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider">活跃时长</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight">{data.exercise.activeMins} <span className="text-[10px] text-slate-400">分钟</span></p>
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

              {/* Summary Conclusion Section - Moved to bottom */}
              <div className="bg-slate-900 rounded-[28px] p-6 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Zap className="w-4 h-4 text-brand-blue fill-brand-blue" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue/80">AI 综合视角结论 · {title}</span>
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-90 tracking-tight relative z-10">
                  {hasRobotBound ? data.conclusion : '暂无设备数据，AI 无法给出评估结论。请先绑定设备以开启 24H 实时监控服务。'}
                </p>
                {hasRobotBound && (
                  <div className="mt-8 flex gap-3 relative z-10">
                    <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2">
                       <Share2 className="w-3.5 h-3.5" />分享
                    </button>
                    <button className="flex-1 py-3 bg-brand-blue rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                       <Download className="w-3.5 h-3.5" />下载报告
                    </button>
                  </div>
                )}
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
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-all group active:scale-[0.98]">
      <div className="flex flex-col gap-1">
        <div className="w-10 h-10 rounded-[18px] bg-slate-50 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-sm">
           {icon}
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 ml-1">{label}</p>
      </div>
      <div className="pl-1">
        <span className={`text-2xl font-black ${color} tracking-tight tabular-nums`}>{value}</span>
        <span className="text-[9px] text-slate-300 font-black ml-1.5 uppercase tracking-tighter italic">{unit}</span>
      </div>
    </div>
  );
}
