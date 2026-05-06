import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Terms() {
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
        <h1 className="text-xl font-black text-text-main">用户协议</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-12 text-sm text-text-muted space-y-6 scrollbar-hide">
        <section>
          <h2 className="text-text-main font-black mb-2">1. 服务协议的确认</h2>
          <p className="leading-relaxed">欢迎您使用智护OS。智护OS是由我们向用户提供的智慧护理管理系统服务。请您在注册、使用前务必认真阅读本协议。</p>
        </section>

        <section>
          <h2 className="text-text-main font-black mb-2">2. 账号注册与使用</h2>
          <p className="leading-relaxed">用户在申请使用智护OS服务时，应当提供准确的有效资料。用户账号的所有权归属于智护OS，用户仅拥有账号的使用权。</p>
        </section>

        <section>
          <h2 className="text-text-main font-black mb-2">3. 用户权利与义务</h2>
          <p className="leading-relaxed">用户应遵守法律法规，不得利用智护OS从事任何违法违规活动。用户对其账号下发生的所有活动承担责任。</p>
        </section>

        <section>
          <h2 className="text-text-main font-black mb-2">4. 免责声明</h2>
          <p className="leading-relaxed">因不可抗力、网络故障、黑客攻击等非因本公司故意而导致的服务中断、数据丢失等，本公司不承担法律责任。</p>
        </section>

        <p className="pt-4 border-t border-slate-50 text-[10px] opacity-60">最后更新日期：2024年5月</p>
      </div>
    </div>
  );
}
