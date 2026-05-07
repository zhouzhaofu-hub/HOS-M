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
  AlertTriangle
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
  vitals: { heart: 72, bp: "122/78", oxygen: 98 },
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
  conclusion: "本周睡眠质量提升 12%。环境关联分析显示：室内湿度过高（平均 75%）与您夜间呼吸频率微增具有强相关性，已自动开启除湿。下周建议：预防南方湿冷引起的关节僵硬。",
  vitals: { heart: 74, bp: "125/80", oxygen: 97 },
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
  conclusion: "4月度健康洞察：环境指数优良率 85%，生命体征与环境适应性极佳。AI 风险模型提示：5月将进入花粉高发期，您的呼吸道风险系数将从 5% 升至 18%，请减少开窗。",
  vitals: { heart: 71, bp: "120/78", oxygen: 98 },
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

type ReportType = 'daily' | 'weekly' | 'monthly';

export default function Health() {
  const { hasRobotBound } = useAppContext();
  const [reportType, setReportType] = useState<ReportType>('daily');
  
  const data = reportType === 'daily' ? DAILY_DATA : reportType === 'weekly' ? WEEKLY_DATA : MONTHLY_DATA;
  const title = reportType === 'daily' ? '健康日报' : reportType === 'weekly' ? '健康周报' : '健康月报';

  // Empty data values
  const displayVitals = {
    heart: hasRobotBound ? data.vitals.heart : '-',
    bp: hasRobotBound ? data.vitals.bp : '-',
    oxygen: hasRobotBound ? data.vitals.oxygen : '-'
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Header Content */}
        <div className="bg-white px-6 pt-12 pb-6 border-b border-slate-100 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">智护健康中心</h1>
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

        <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 relative">
          {!hasRobotBound && (
            <div className="absolute inset-0 z-50 bg-slate-50/60 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h2 className="text-lg font-black text-slate-800 mb-2">未绑定健康监测设备</h2>
              <p className="text-xs text-slate-400 font-bold mb-8 max-w-[200px] leading-relaxed">
                绑定智护机器人或配套健康套装后，AI 将自动分析生成健康趋势报告。
              </p>
              <Link 
                to="/bind" 
                className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-blue/20 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>立即去绑定设备</span>
              </Link>
            </div>
          )}

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
                  {hasRobotBound ? data.conclusion : '暂无设备数据，AI 无法给出评估结论。请先绑定设备以开启 24H 实时监控服务。'}
                </p>
              </div>

              {/* Environmental Monitoring Section */}
              <div className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">室内外环境监测</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">实时精准同步</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">温度</p>
                    <p className="text-sm font-black text-slate-900">{ENV_DATA.temp}°C</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">湿度</p>
                    <p className="text-sm font-black text-slate-900">{ENV_DATA.humidity}%</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">AQI</p>
                    <p className={`text-sm font-black ${ENV_DATA.aqi < 50 ? 'text-emerald-500' : 'text-amber-500'}`}>{ENV_DATA.aqi}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">天气</p>
                    <p className="text-xs font-black text-slate-900 truncate">{ENV_DATA.condition}</p>
                  </div>
                </div>
              </div>

              {/* Vital Signs Grid */}
              <div className="grid grid-cols-3 gap-3">
                <MetricCard 
                  icon={<Heart className="w-4 h-4 text-rose- Rose-500" />} 
                  label="平均心率" 
                  value={displayVitals.heart} 
                  unit="次/分" 
                  color="text-rose-600"
                />
                <MetricCard 
                  icon={<Activity className="w-4 h-4 text-blue-500" />} 
                  label="血压水平" 
                  value={displayVitals.bp} 
                  unit="毫米汞柱" 
                  color="text-blue-600"
                />
                <MetricCard 
                  icon={<Activity className="w-4 h-4 text-emerald-500" />} 
                  label="血氧饱和" 
                  value={displayVitals.oxygen} 
                  unit="%" 
                  color="text-emerald-600"
                />
              </div>

              {/* Chart Section */}
              <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-none">核心体征趋势</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">核心健康体征分析</p>
                  </div>
                  <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border shadow-sm ${hasRobotBound ? 'bg-emerald-50 border-emerald-100 shadow-emerald-100/50' : 'bg-slate-50 border-slate-100'}`}>
                    {hasRobotBound ? (
                      <>
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        <span className="text-[8px] font-black text-emerald-600 uppercase">体征稳健</span>
                      </>
                    ) : (
                      <span className="text-[8px] font-black text-slate-400 uppercase">数据缺失</span>
                    )}
                  </div>
                </div>
                
                <div className="h-44 w-full flex items-center justify-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  {hasRobotBound ? (
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
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-30">
                       <BarChart3 className="w-8 h-8" />
                       <span className="text-[10px] font-black uppercase tracking-widest">暂无监测信号</span>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Predictive Risk Section */}
              <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 blur-2xl group-hover:bg-brand-blue/10 transition-colors" />
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-none">AI 未来风险预测</h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">AI 预测性健康分析</p>
                    </div>
                  </div>
                  {hasRobotBound && (
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      data.prediction.riskLevel === '低' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      data.prediction.riskLevel === '中' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      当前风险: {data.prediction.riskLevel}
                    </div>
                  )}
                </div>

                {!hasRobotBound ? (
                    <div className="py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">等待设备连接中</p>
                    </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">健康稳定性评分</span>
                          <span className="text-sm font-black text-slate-800">{data.prediction.score}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${data.prediction.score}%` }}
                            className={`h-full rounded-full ${data.prediction.score > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-indigo-50/50 border border-indigo-100 px-4 py-2 rounded-2xl">
                         <span className="text-[8px] font-black text-indigo-400 uppercase mb-1">趋势展望</span>
                         <span className={`text-xs font-black ${data.prediction.trend === '提升' ? 'text-emerald-500' : 'text-amber-500'}`}>
                           {data.prediction.trend === '提升' ? '↗ 状态走强' : '→ 持续平稳'}
                         </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">关键风险驱动因子</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {data.prediction.factors.map((factor, idx) => (
                          <div key={idx} className="bg-white px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-600 border border-slate-200 shadow-sm flex items-center gap-1.5">
                             <div className="w-1 h-1 rounded-full bg-indigo-400" />
                             {factor}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                       <Zap className="w-4 h-4 text-brand-blue mt-0.5" />
                       <div>
                         <p className="text-[10px] font-black text-slate-800 uppercase mb-1">建议性干预</p>
                         <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                           {reportType === 'daily' ? '针对环境变化，AI 推荐增加今日室内康复操频率，同时确保饮水量不低于 1500ml。' : '基于湿度相关性结论，建议购置除湿包并放置在床边，预防晨间支气管不适。'}
                         </p>
                       </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Safety & Events */}
              <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-none">安全监测报告</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">全时安全监测记录</p>
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
