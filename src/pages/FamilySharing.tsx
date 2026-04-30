import React from 'react';
import { Layout } from '../components/Layout';
import { Avatar } from '../components/Avatar';
import { ChevronLeft, Share2, Bot, Battery } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function FamilySharing() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col h-full bg-slate-50/30">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl bg-white border border-border-base flex items-center justify-center text-text-muted shadow-sm active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black text-text-main tracking-tight">家人共享</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-8 scrollbar-hide pb-10">
          {/* Info Box */}
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[32px] shadow-sm">
            <p className="text-[11px] font-bold text-brand-blue leading-relaxed text-center">
              选择您已绑定的机器人，将其运行状态与健康告警同步给您的家人。
            </p>
          </div>

          {/* My Robots Section */}
          <section className="space-y-4">
            <h3 className="px-1 text-[11px] font-black text-text-muted uppercase tracking-widest opacity-60">我的机器人</h3>
            <div className="bg-white rounded-[32px] p-5 border border-border-base shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-white shadow-sm">
                  <div className="relative">
                    <Bot className="w-8 h-8 text-text-main" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-black text-text-main">智护机器人 - 王大爷家</h4>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                       在线
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-text-muted">
                       <Battery className="w-3 h-3" />
                       <span>电量 85%</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="bg-brand-blue text-white rounded-2xl px-5 py-3 flex items-center gap-2 shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform">
                <Share2 className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-wider">分享</span>
              </button>
            </div>
          </section>

          {/* Shared Family Section */}
          <section className="space-y-4">
            <h3 className="px-1 text-[11px] font-black text-text-muted uppercase tracking-widest opacity-60">已共享家人</h3>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <Avatar src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-full h-full" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                  <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" className="w-full h-full" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center shadow-sm">
                  <span className="text-[10px] font-black text-text-muted">+1</span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-text-muted tracking-tight">共有 <span className="text-text-main font-black underline underline-offset-4 decoration-brand-blue/30">3</span> 位家人正在同步数据</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
