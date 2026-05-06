import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Phone, 
  Video, 
  CheckCircle2, 
  X,
  AlertTriangle,
  History,
  MessageSquare,
  Activity,
  Wind
} from 'lucide-react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';

export default function AlertDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const alertId = searchParams.get('id');
  const [resolved, setResolved] = useState(false);

  const isVitalsAlert = alertId === '4';

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 flex items-center gap-4 bg-white border-b border-border-base relative z-10">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-text-main active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-text-main">告警详情</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-6 pb-12 px-6 space-y-6 scrollbar-hide">
          {/* Main Alert Card */}
          <div className="bg-rose-50 border border-rose-100 rounded-[32px] p-6 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl" />
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                   {isVitalsAlert ? <Activity className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
                </div>
                <div>
                   <h2 className="text-2xl font-black text-rose-600">
                     {isVitalsAlert ? '生命体征异常' : '跌倒告警'}
                   </h2>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest">状态：未确认</span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-2xl border border-rose-100/50">
                   <div className="flex items-center gap-2 mb-1 opacity-60">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">监测设备</span>
                   </div>
                   <p className="font-black text-rose-900">{isVitalsAlert ? '智能监测床垫' : '客厅毫米波雷达'}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-rose-100/50">
                   <div className="flex items-center gap-2 mb-1 opacity-60">
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">报警时间</span>
                   </div>
                   <p className="font-black text-rose-900">{isVitalsAlert ? '14:20:15 PM' : '10:24:33 AM'}</p>
                </div>
             </div>

             {isVitalsAlert && (
               <div className="mt-4 p-4 bg-white/40 rounded-2xl border border-rose-100/30 space-y-3">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <Activity className="w-4 h-4 text-rose-500" />
                       <span className="text-xs font-bold text-rose-900">当前心率</span>
                    </div>
                    <span className="text-xl font-black text-rose-600">48 <small className="text-[10px]">BPM</small></span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <Wind className="w-4 h-4 text-rose-500" />
                       <span className="text-xs font-bold text-rose-900">当前呼吸</span>
                    </div>
                    <span className="text-xl font-black text-rose-600">10 <small className="text-[10px]">次/分</small></span>
                 </div>
               </div>
             )}
          </div>

          {/* Snapshot Area / Real-time chart */}
          <div className="space-y-4">
             <div className="flex justify-between items-center px-1">
                <h3 className="text-[11px] font-black text-text-main uppercase tracking-widest opacity-60">
                   {isVitalsAlert ? '波形实时监测' : '现场画面回放'}
                </h3>
                <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest">
                   {isVitalsAlert ? '查看历史图表' : '查看完整监控'}
                </span>
             </div>
             
             {isVitalsAlert ? (
               <div className="aspect-video bg-slate-900 rounded-[32px] overflow-hidden relative p-4 flex flex-col justify-center">
                  <div className="w-full h-1/2 flex items-end gap-1 px-4">
                    {[30, 45, 25, 60, 20, 35, 55, 40, 65, 30, 45, 20].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, repeatType: 'reverse' }}
                        className="flex-1 bg-emerald-400/30 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 border-[0.5px] border-white/5 pointer-events-none grid grid-cols-8 grid-rows-4">
                     {Array.from({length: 32}).map((_, i) => <div key={i} className="border-[0.5px] border-white/5" />)}
                  </div>
               </div>
             ) : (
               <div className="aspect-video bg-slate-900 rounded-[32px] overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop" 
                    alt="Alert Snapshot" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-active:scale-90 transition-transform cursor-pointer">
                        <Video className="w-8 h-8 text-white" />
                     </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                     <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white border border-white/10">
                        2026.05.06 10:24:33
                     </div>
                     <div className="flex gap-2">
                        <div className="bg-rose-500 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase">跌倒检测</div>
                     </div>
                  </div>
               </div>
             )}
          </div>

          {/* Quick Response */}
          {!resolved ? (
            <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={() => setResolved(true)}
                 className="col-span-2 bg-emerald-500 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
               >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>已确认安全</span>
               </button>
               <button className="bg-slate-50 text-text-main py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border border-border-base active:scale-[0.98] transition-all">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>语音通话</span>
               </button>
               <button className="bg-white text-rose-500 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border border-rose-100 active:scale-[0.98] transition-all">
                  <AlertTriangle className="w-4 h-4" />
                  <span>紧急呼叫</span>
               </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-100 p-5 rounded-[32px] flex items-center gap-4"
            >
               <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
               <div>
                  <p className="font-black text-emerald-900">状态已手动确认</p>
                  <p className="text-[10px] font-bold text-emerald-600 mt-0.5">确认人：管理员 · {isVitalsAlert ? '14:28 PM' : '10:28 AM'}</p>
               </div>
            </motion.div>
          )}

          {/* Event Timeline */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 px-1">
                <History className="w-4 h-4 text-text-muted" />
                <h3 className="text-[11px] font-black text-text-main uppercase tracking-widest opacity-60">事件溯源</h3>
             </div>
             <div className="space-y-0 relative pl-4 border-l border-slate-100 ml-2">
                {isVitalsAlert ? (
                  <>
                    <TimelineItem time="14:15:00" event="常规监测" desc="开始午睡监测，初始状态记录正常" />
                    <TimelineItem time="14:20:15" event="指标异常" desc="检测到心率跌破阈值（55），触发预警" active />
                    <TimelineItem time="14:20:16" event="二次校验" desc="联动呼吸频率监测，确认多维指标异常" />
                    <TimelineItem time="14:20:17" event="推送通知" desc="高优先级推送已发送至亲情账号" />
                  </>
                ) : (
                  <>
                    <TimelineItem time="10:24:33" event="触发告警" desc="AI检测到客厅发生疑似跌倒行为" active />
                    <TimelineItem time="10:24:34" event="指令下达" desc="机器人自动转向告警位置并开启监控" />
                    <TimelineItem time="10:24:35" event="推送通知" desc="已推送至所有家庭成员手机" />
                    <TimelineItem time="10:24:38" event="终端响铃" desc="机器人发出语音提示询问状态" />
                  </>
                )}
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TimelineItem({ time, event, desc, active = false }: { time: string, event: string, desc: string, active?: boolean }) {
  return (
    <div className="mb-6 relative">
      <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${active ? 'bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.1)]' : 'bg-slate-200'}`} />
      <div className="flex justify-between items-baseline mb-1">
         <h4 className={`text-xs font-black ${active ? 'text-text-main' : 'text-text-muted'}`}>{event}</h4>
         <span className="text-[9px] font-bold text-text-muted tabular-nums">{time}</span>
      </div>
      <p className="text-[11px] text-text-muted opacity-80 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
