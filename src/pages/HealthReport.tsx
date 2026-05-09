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
  Info,
  ShieldAlert,
  Plus,
  Thermometer,
  BrainCircuit,
  Wind
} from 'lucide-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
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
import { useAppContext } from '../context/AppContext';

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
  const { hasRobotBound } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'weekly'; // weekly, monthly, quarterly
  const [activeMetric, setActiveMetric] = useState('summary');

  const isWeekly = type === 'weekly';
  const isMonthly = type === 'monthly';
  const isQuarterly = type === 'quarterly';

  const reportTitle = isWeekly ? '周度健康评估报告' : isMonthly ? '月度健康评估报告' : '季度健康评估报告';
  const reportPeriod = isWeekly ? '2026.04.28 - 2026.05.04' : isMonthly ? '2026.04.01 - 2026.04.30' : '2026.04.01 - 2026.06.30';

  const handleShare = () => {
    alert('正在生成分享链接...');
  };

  const handleDownload = () => {
    alert('正在准备 PDF 下载...');
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-slate-50 relative">
        {/* 顶部导航栏 */}
        <div className="bg-white px-6 pt-6 pb-4 flex items-center justify-between border-b border-border-base sticky top-0 z-30 shadow-sm">
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
            <button 
              onClick={handleDownload}
              disabled={!hasRobotBound}
              className={`w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center border border-brand-blue/10 active:scale-95 ${!hasRobotBound && 'opacity-30'}`}
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={handleShare}
              disabled={!hasRobotBound}
              className={`w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/20 active:scale-95 ${!hasRobotBound && 'opacity-30'}`}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide relative">
          {!hasRobotBound && (
            <div className="absolute inset-0 z-50 bg-slate-50/60 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 text-center">
               <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
                  <BarChart3 className="w-10 h-10" />
               </div>
               <h2 className="text-lg font-black text-slate-800 mb-2">未生成该时段报告</h2>
               <p className="text-xs text-slate-400 font-bold mb-8 max-w-[200px] leading-relaxed">
                  需要至少 3 天的有效生理指标监测数据才能生成 AI 深度健康评估报告。
               </p>
               <Link 
                  to="/bind" 
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 active:scale-95 transition-all"
               >
                  <Plus className="w-5 h-5 text-brand-blue" />
                  <span>立即绑定并同步</span>
               </Link>
            </div>
          )}

          {/* 今日简报 */}
          <div className="p-4">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white rounded-2xl p-4 border border-border-base shadow-sm text-center"
            >
               <p className="text-xs font-black text-text-main leading-relaxed">
                 {hasRobotBound ? `本报告周期内，您的身体机能整体表现${isQuarterly ? '极其卓越' : '稳健'}，核心指标均维持在预定义的健康安全阈值内。` : '由于实时监测时长未达标，系统暂处于数据沉淀期，暂无法生成本周期的简短概述。'}
               </p>
            </motion.div>
          </div>

          <div className="px-4 pb-4 space-y-4">
            {/* 指标详情解析 */}
            <div className="space-y-4">
              {/* 心率趋势 */}
              <div className="bg-white rounded-2xl p-4 border border-border-base shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-text-main">心率健康分析</h3>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">心率动态监测</p>
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
                    <span className="text-xs font-black text-text-main">68 次/分</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] font-bold text-text-muted">最高运动心率</span>
                    <span className="text-xs font-black text-text-main">112 次/分</span>
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

              {/* 血氧与呼吸 (饼图) */}
              <div className="bg-white rounded-2xl p-4 border border-border-base shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-text-main">日常状态分布</h3>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">状态区间统计</p>
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
              <div className="bg-white rounded-2xl p-4 border border-border-base shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-text-main">服药计划完成度</h3>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">依从性健康预测</p>
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

              {/* AI 综合汇总评估 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 border border-border-base shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${hasRobotBound ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <h2 className="text-sm font-black text-text-main uppercase tracking-widest">
                    AI 深度汇总评估
                  </h2>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                    <p className="text-[9px] font-bold text-text-muted mb-1">生命体征</p>
                    <p className={`text-lg font-black ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`}>{hasRobotBound ? '稳健' : '-'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                    <p className="text-[9px] font-bold text-text-muted mb-1">服药依从</p>
                    <p className={`text-lg font-black ${hasRobotBound ? 'text-emerald-500' : 'text-slate-300'}`}>{hasRobotBound ? '97%' : '-'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                    <p className="text-[9px] font-bold text-text-muted mb-1">风险系数</p>
                    <p className={`text-lg font-black ${hasRobotBound ? 'text-blue-500' : 'text-slate-300'}`}>{hasRobotBound ? '低' : '-'}</p>
                  </div>
                </div>

                <div className={`rounded-2xl p-4 ${hasRobotBound ? 'bg-indigo-50/50 border border-indigo-100' : 'bg-slate-50 border border-slate-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className={`w-3 h-3 ${hasRobotBound ? 'text-indigo-600 fill-indigo-600' : 'text-slate-400'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${hasRobotBound ? 'text-indigo-700' : 'text-slate-400'}`}>核心评估结论</span>
                  </div>
                  <p className={`text-xs leading-relaxed font-medium tracking-tight ${hasRobotBound ? 'text-indigo-900/80' : 'text-slate-400'}`}>
                    {hasRobotBound ? (
                      isWeekly 
                        ? '本周患者各项指标表现优异。血压均值 122/78 处于健康区间。睡眠质量有所提升，平均深度睡眠占比增加 15%。建议继续保持当前的饮食与运动节奏。'
                        : isMonthly
                        ? '4月度总体指标稳中向好。心率变异性指标较上月提升 8%，显示自主神经系统功能恢复。需注意月底由于气候变迁引起的轻微晨间血压波动。'
                        : '本季度健康全景：生命体征维持在极高基准水平。周期内各项关键器官负荷测试均符合预期。AI 深度神经网络评估结论：继续保持社交互动与功能性康复训练。'
                    ) : '由于缺乏连续的设备监测数据，系统无法生成本时段的核心健康评估结论。'}
                  </p>
                </div>
              </motion.div>

              {/* AI 深度建议策略 */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                   <Zap className="w-24 h-24 stroke-white fill-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                       <BarChart3 className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight">AI 深度健康策略</h3>
                      <p className="text-[9px] font-black uppercase text-brand-blue/80 tracking-widest leading-none mt-1">生成式护理洞察</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                       <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-brand-blue" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-white/90">下周期调整建议</span>
                       </div>
                       <p className="text-xs leading-relaxed text-blue-50/70 font-medium">
                          基于本周晨间血压监测，建议将原本在 08:30 的第二次服药时间提前至 07:45，以更好覆盖晨峰血压活跃期。同时本周期室内步数表现稳健，建议在季报周期内通过 AI 机器人预约一次更深度的骨特质分析评估。
                       </p>
                    </div>
                    <div className="flex gap-3">
                       <button onClick={handleShare} className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">分享报告</button>
                       <button onClick={handleDownload} className="flex-1 bg-brand-blue hover:bg-brand-blue/90 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-blue/20">下载PDF</button>
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
