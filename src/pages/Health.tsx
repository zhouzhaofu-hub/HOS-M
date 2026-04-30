import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_USER, MOCK_HEALTH } from '../constants';
import { Avatar } from '../components/Avatar';
import { Heart, Pill, Activity, ChevronDown, CheckCircle2, XCircle, Wand2, FileText, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';

const WEEKLY_DATA = [
  { day: 'Mon', bpm: 72 },
  { day: 'Tue', bpm: 75 },
  { day: 'Wed', bpm: 84 },
  { day: 'Thu', bpm: 74 },
  { day: 'Fri', bpm: 70 },
  { day: 'Sat', bpm: 78 },
  { day: 'Sun', bpm: 73 },
];

export default function Health() {
  const [searchParams] = useSearchParams();
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week');
  const [activeMetric, setActiveMetric] = useState<'heart' | 'pressure' | 'sugar' | 'sleep'>('heart');

  useEffect(() => {
    const metricParam = searchParams.get('metric');
    if (metricParam && ['heart', 'pressure', 'sugar', 'sleep'].includes(metricParam)) {
      setActiveMetric(metricParam as any);
    }
  }, [searchParams]);

  const chartData = {
    day: [
      { name: '08:00', heart: 72, sugar: 5.2, sleep: 0, high: 118, low: 76 },
      { name: '10:00', heart: 78, sugar: 6.4, sleep: 0, high: 122, low: 80 },
      { name: '12:00', heart: 85, sugar: 7.1, sleep: 0, high: 125, low: 82 },
      { name: '14:00', heart: 74, sugar: 5.8, sleep: 0, high: 120, low: 78 },
      { name: '16:00', heart: 70, sugar: 5.4, sleep: 0, high: 115, low: 75 },
    ],
    week: [
      { name: '周一', heart: 75, sugar: 5.6, sleep: 7.2, high: 120, low: 78 },
      { name: '周二', heart: 78, sugar: 5.8, sleep: 6.8, high: 122, low: 80 },
      { name: '周三', heart: 82, sugar: 6.1, sleep: 7.5, high: 128, low: 84 },
      { name: '周四', heart: 74, sugar: 5.4, sleep: 8.0, high: 118, low: 76 },
      { name: '周五', heart: 70, sugar: 5.5, sleep: 7.1, high: 121, low: 79 },
      { name: '周六', heart: 73, sugar: 5.9, sleep: 7.8, high: 124, low: 81 },
      { name: '周日', heart: 71, sugar: 5.3, sleep: 8.2, high: 119, low: 77 },
    ],
    month: [
      { name: '1周', heart: 76, sugar: 5.7, sleep: 7.4, high: 122, low: 79 },
      { name: '2周', heart: 80, sugar: 6.0, sleep: 7.1, high: 125, low: 82 },
      { name: '3周', heart: 74, sugar: 5.5, sleep: 7.8, high: 120, low: 77 },
      { name: '4周', heart: 72, sugar: 5.4, sleep: 7.6, high: 118, low: 76 },
    ]
  };

  const METRICS = [
    { id: 'heart', label: '心率', icon: <Heart className="w-4 h-4" />, unit: 'BPM', color: '#E11D48', value: '74' },
    { id: 'pressure', label: '血压', icon: <Activity className="w-4 h-4" />, unit: 'mmHg', color: '#2563EB', value: '118/76' },
    { id: 'sugar', label: '血糖', icon: <Activity className="w-4 h-4" />, unit: 'mmol/L', color: '#8B5CF6', value: '5.4' },
    { id: 'sleep', label: '睡眠', icon: <Moon className="w-4 h-4" />, unit: 'H', color: '#4F46E5', value: '7.5' },
  ] as const;

  const currentMetric = METRICS.find(m => m.id === activeMetric)!;

  return (
    <Layout>
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-white border-b border-border-base z-20">
        <div>
          <h1 className="text-xl font-black text-text-main tracking-tight">健康中心</h1>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-border-base p-1 rounded-xl">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <Avatar src={MOCK_USER.avatar} className="w-full h-full" />
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted mr-1" />
        </div>
      </div>

      <div className="px-6 space-y-6 pt-6 pb-24 bg-white">
        {/* Range Selector */}
        <div className="flex bg-slate-50 border border-border-base p-1 rounded-xl">
           <button 
             onClick={() => setRange('day')}
             className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${range === 'day' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
           >日</button>
           <button 
             onClick={() => setRange('week')}
             className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${range === 'week' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
           >周</button>
           <button 
             onClick={() => setRange('month')}
             className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${range === 'month' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
           >月</button>
        </div>

        {/* Metric Selector Tabs */}
        <div className="grid grid-cols-4 gap-2">
           {METRICS.map(m => (
             <button
               key={m.id}
               onClick={() => setActiveMetric(m.id)}
               className={`p-2.5 rounded-xl border transition-all flex flex-col items-center gap-1 ${activeMetric === m.id ? 'bg-slate-50 border-brand-blue shadow-sm' : 'bg-white border-border-base opacity-60'}`}
             >
                <div style={{ color: activeMetric === m.id ? m.color : '#94A3B8' }}>{m.icon}</div>
                <span className={`text-[8.5px] font-black ${activeMetric === m.id ? 'text-text-main' : 'text-text-muted'}`}>{m.label}</span>
             </button>
           ))}
        </div>

        {/* Chart Card */}
        <motion.div
           key={`${activeMetric}-${range}`}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="geo-card border border-border-base bg-slate-50/20 p-5 rounded-[28px]"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border-base shadow-sm" style={{ color: currentMetric.color }}>
                {currentMetric.icon}
              </div>
              <div>
                <h3 className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-none">{currentMetric.label}看板</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xl font-black text-text-main leading-none">{currentMetric.value} </span>
                  <span className="text-[9px] text-text-muted uppercase font-bold">{currentMetric.unit}</span>
                  <span className="text-[7.5px] font-black text-emerald-500 bg-white border border-emerald-100 px-1.5 py-0.5 rounded-full ml-2">数值正常</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData[range]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                   <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }} 
                   dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} 
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '10px' }}
                />
                {activeMetric === 'pressure' ? (
                  <>
                    <Area type="monotone" dataKey="high" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorMetric)" dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} />
                    <Area type="monotone" dataKey="low" stroke="#60A5FA" strokeWidth={3} fillOpacity={0} dot={{ r: 4, fill: '#60A5FA', strokeWidth: 2, stroke: '#fff' }} />
                  </>
                ) : (
                  <Area 
                    type="monotone" 
                    dataKey={activeMetric} 
                    stroke={currentMetric.color} 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorMetric)"
                    dot={{ r: 4, fill: currentMetric.color, strokeWidth: 2, stroke: '#fff' }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Medication Compliance */}
        <div className="geo-card border-none bg-slate-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest">用药计划执行</h3>
            <span className="px-2 py-1 bg-white border border-emerald-100 text-emerald-500 rounded text-[8px] font-black uppercase">95% 达标</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
             <MedicationItem time="08:00" label="阿司匹林" status="done" />
             <MedicationItem time="12:30" label="维D" status="done" />
             <MedicationItem time="18:00" label="降压药" status="missed" />
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-brand-blue rounded-xl p-6 text-white shadow-none relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                    <Wand2 className="w-5 h-5" />
                 </div>
                 <h3 className="font-black text-base uppercase tracking-tight">AI 预警建议</h3>
              </div>
              <div className="space-y-4">
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10">
                    <p className="text-xs font-medium leading-relaxed">
                       患者翻身频率低于基准值，建议协助。系统已自动预约晚间室内适度运动提醒。
                    </p>
                 </div>
              </div>
              <button className="mt-6 w-full py-3 bg-white text-brand-blue rounded-lg font-black text-[10px] active:scale-95 transition-transform flex items-center justify-center gap-2 uppercase tracking-widest leading-none">
                 <FileText className="w-4 h-4" />
                 <span>导出终端分析报告</span>
              </button>
           </div>
        </div>
      </div>
    </Layout>
  );
}

function MedicationItem({ time, label, status }: { time: string, label: string, status: 'done' | 'missed' }) {
  return (
    <div className={`p-3 rounded-xl flex flex-col items-center gap-2 border transition-colors ${status === 'done' ? 'bg-slate-50 border-border-base' : 'bg-rose-50 border-rose-100'}`}>
       {status === 'done' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
       <div className="text-center">
          <p className={`text-[8px] font-bold uppercase ${status === 'done' ? 'text-text-muted' : 'text-rose-400'}`}>{time}</p>
          <p className={`text-[10px] font-black tracking-tight ${status === 'done' ? 'text-text-main' : 'text-rose-700'}`}>{label}</p>
       </div>
    </div>
  );
}
