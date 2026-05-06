import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ShieldCheck, ArrowRight, ChevronLeft, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white px-8 pt-12 relative overflow-hidden">
      {/* Header */}
      <button 
        onClick={() => navigate(-1)} 
        className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-text-main mb-8 active:scale-90 transition-transform"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="mb-12">
        <h1 className="text-3xl font-black text-text-main tracking-tight">重置密码</h1>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
          <input
            className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
            placeholder="绑定的手机号码"
            type="tel"
          />
        </div>

        <div className="relative group">
          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
          <input
            className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
            placeholder="短信验证码"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-blue font-black text-[11px] uppercase tracking-wider">获取验证码</button>
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
          <input
            className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
            placeholder="设置新密码"
            type="password"
          />
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-6 shadow-lg shadow-brand-blue/20"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>完成重置</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      <div className="mt-auto pb-12 text-center text-[12px] font-bold text-text-muted">
        记起密码了？ <button onClick={() => navigate('/login')} className="text-brand-blue">返回登录</button>
      </div>
    </div>
  );
}
