import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white px-8 pt-12 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-text-main active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black text-text-main">隐私政策</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-12 text-sm text-text-muted space-y-6 scrollbar-hide">
        <section>
          <h2 className="text-text-main font-black mb-2">1. 信息收集</h2>
          <p className="leading-relaxed">我们收集的信息包括：您注册时提供的手机号码、姓名；使用过程中产生的健康监测数据、机器人运行日志等。</p>
        </section>

        <section>
          <h2 className="text-text-main font-black mb-2">2. 信息使用</h2>
          <p className="leading-relaxed">收集的信息将用于：提供及改进系统功能、保障账号安全、生成健康分析报告、推送必要的警报消息。</p>
        </section>

        <section>
          <h2 className="text-text-main font-black mb-2">3. 信息保护</h2>
          <p className="leading-relaxed">我们采用行业领先的安全技术进行数据加密存储（如SSL、AES），确保您的个人隐私不被泄露、篡改或毁损。</p>
        </section>

        <section>
          <h2 className="text-text-main font-black mb-2">4. 第三方服务</h2>
          <p className="leading-relaxed">本系统可能包含第三方SDK，用于实现支付、定位、推送等功能。我们会根据法律要求要求第三方严格保护隐私。</p>
        </section>

        <p className="pt-4 border-t border-slate-50 text-[10px] opacity-60">最后更新日期：2024年5月</p>
      </div>
    </div>
  );
}
