import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { 
  ChevronLeft, 
  Download, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  BarChart3, 
  Heart, 
  Activity, 
  Moon, 
  Zap,
  Info
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const WEEKLY_COMPLIANCE = [
  { day: '周一', value: 100 },
  { day: '周二', value: 90 },
  { day: '周三', value: 100 },
  { day: '周四', value: 85 },
  { day: '周五', value: 100 },
  { day: '周六', value: 100 },
  { day: '周日', value: 95 },
];

const HEART_RATE_TREND = [
  { day: '周一', min: 68, max: 74, avg: 71 },
  { day: '周二', min: 70, max: 76, avg: 73 },
  { day: '周三', min: 72, max: 82, avg: 77 },
  { day: '周四', min: 69, max: 75, avg: 72 },
  { day: '周五', min: 67, max: 73, avg: 70 },
  { day: '周六', min: 70, max: 78, avg: 74 },
  { day: '周日', min: 68, max: 74, avg: 71 },
];

const HEALTH_DISTRIBUTION = [
  { name: '正常', value: 85, color: '#10B981' },
  { name: '关注', value: 10, color: '#F59E0B' },
  { name: '预警', value: 5, color: '#EF4444' },
];

export default function HealthReport() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'weekly'; // weekly or monthly
  const [activeMetric, setActiveMetric] = useState('summary');

  const isWeekly = type === 'weekly';
  const reportTitle = isWeekly ? '周度健康深度评估' : '月度健康全案报告';
  const reportPeriod = isWeekly ? '2026.04.28 - 2026.05.04' : '2026.04.01 - 2026.04.30';

  return (
    <Layout>
      <div className="flex flex-col h-full bg-slate-50 relative">
        {/* Sticky Header */}
        <div className="bg-white px-6 pt-12 pb-6 flex items-center justify-between border-b border-border-base sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-text-main active:scale-90 transition-transform"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-black text-text-main tracking-tight">{reportTitle}</h1>
              <p className="text-[10px] font-bold text-text-muted mt-0.5 tracking-wider uppercase">{reportPeriod}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center border border-brand-blue/10 active:scale-95">
              <Download className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/20 active:scale-95">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Executive Summary Card */}
          <div className="p-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] p-6 border border-border-base shadow-sm mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-sm font-black text-text-main uppercase tracking-widest">总体评分: 优 (92/100)</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                  <p className="text-[9px] font-bold text-text-muted mb-1">生命体征</p>
                  <p className="text-lg font-black text-emerald-500">稳健</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                  <p className="text-[9px] font-bold text-text-muted mb-1">服药依从</p>
                  <p className="text-lg font-black text-emerald-500">97%</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-center">
                  <p className="text-[9px] font-bold text-text-muted mb-1">风险系数</p>
                  <p className="text-lg font-black text-blue-500">低</p>
                </div>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">核心结论</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-900/80 font-medium tracking-tight">
                  {isWeekly 
                    ? '本周患者各项指标表现优异。血压均值 122/78mmHg 处于健康区间。睡眠质量有所提升，平均深度睡眠占比增加 15%。建议继续保持当前的饮食与运动节奏。'
                    : '4月度总体指标稳中向好。心率变异性(HRV)指标较上月提升 8%，显示自主神经系统功能恢复。需注意月底由于气候变迁引起的轻微晨间血压波动。'}
                </p>
              </div>
            </motion.div>

            {/* Metrics Breakdown */}
            <div className="space-y-6">
              {/* 心率趋势 */}
              <div className="bg-white rounded-[32px] p-6 border border-border-base shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-text-main">心率健康分析</h3>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">HEART RATE DYNAMIC</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-500 font-black text-xs">
                       <TrendingUp className="w-3 h-3" />
                       <span>+2.4%</span>
                    </div>
                    <p className="text-[8px] text-text-muted font-bold">环比上周</p>
                  </div>
                </div>

                <div className="h-48 w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={HEART_RATE_TREND}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }}
                      />
                      <YAxis 
                        hide 
                        domain={['dataMin - 10', 'dataMax + 10']}
                      />
                      <Tooltip 
                        cursor={{ fill: '#F8FAFC' }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '10px' }}
                      />
                      <Bar dataKey="avg" fill="#FB7185" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] font-bold text-text-muted">静息心率均值</span>
                    <span className="text-xs font-black text-text-main">68 BPM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] font-bold text-text-muted">最高运动心率</span>
                    <span className="text-xs font-black text-text-main">112 BPM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-rose-50 border border-rose-100 rounded-xl">
                    <div className="flex items-center gap-2">
                       <AlertCircle className="w-3 h-3 text-rose-500" />
                       <span className="text-[10px] font-black text-rose-600">异常波动发现</span>
                    </div>
                    <span className="text-[10px] font-black text-rose-600">周三 14:20 偏慢</span>
                  </div>
                </div>
              </div>

              {/* 血氧与呼吸 (Pie Chart) */}
              <div className="bg-white rounded-[32px] p-6 border border-border-base shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-text-main">日常状态分布</h3>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">DAILY STATUS RANGE</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={HEALTH_DISTRIBUTION}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {HEALTH_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-3">
                    {HEALTH_DISTRIBUTION.map((item, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-text-muted">{item.name}</span>
                          <span className="text-[10px] font-black text-text-main">{item.value}%</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ width: `${item.value}%`, backgroundColor: item.color }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 依从性柱状图 */}
              <div className="bg-white rounded-[32px] p-6 border border-border-base shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-text-main">服药计划完成度</h3>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">MEDICATION COMPLIANCE</p>
                    </div>
                  </div>
                </div>

                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={WEEKLY_COMPLIANCE}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }}
                      />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontSize: '10px' }}
                      />
                      <Line 
                        type="step" 
                        dataKey="value" 
                        stroke="#10B981" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI 深度建议 */}
              <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden mb-12">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Zap className="w-24 h-24 stroke-white fill-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                       <BarChart3 className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight">AI 深度健康策略</h3>
                      <p className="text-[9px] font-black uppercase text-brand-blue/80 tracking-widest leading-none mt-1">GENERATIVE CARE INSIGHTS</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                       <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-brand-blue" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-white/90">下周期调整建议</span>
                       </div>
                       <p className="text-xs leading-relaxed text-blue-50/70 font-medium">
                          基于本周晨间血压监测，建议将原本在 08:30 的第二次服药时间提前至 07:45，以更好覆盖晨峰血压活跃期。同时本周室内步数略微下降，建议增加下午 16:00-16:30 的室内康复行走。
                       </p>
                    </div>
                    <div className="flex gap-2">
                       <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                          <p className="text-[9px] text-white/40 font-bold mb-1 uppercase">关注指标</p>
                          <p className="text-xs font-black text-white/90 uppercase tracking-wide">水分摄入量</p>
                       </div>
                       <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                          <p className="text-[9px] text-white/40 font-bold mb-1 uppercase">预期改进</p>
                          <p className="text-xs font-black text-white/90 uppercase tracking-wide">睡眠质量 +12%</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom iOS Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900/10 rounded-full pointer-events-none" />
      </div>
    </Layout>
  );
}
