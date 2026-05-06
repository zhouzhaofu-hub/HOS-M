import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ShieldCheck, ArrowRight, ChevronLeft, User, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
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
        <h1 className="text-3xl font-black text-text-main tracking-tight">创建账号</h1>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
          <input
            className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
            placeholder="真实姓名"
          />
        </div>

        <div className="relative group">
          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
          <input
            className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
            placeholder="手机号码"
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
            placeholder="设置登录密码"
            type="password"
          />
        </div>

        <div className="flex items-start gap-2 px-1 py-2">
            <input type="checkbox" className="mt-1 accent-brand-blue" id="terms" />
            <label htmlFor="terms" className="text-[11px] text-text-muted font-medium leading-relaxed">
                我已阅读并同意 <button onClick={() => navigate('/terms')} className="text-brand-blue">《智护OS用户协议》</button> 和 <button onClick={() => navigate('/privacy')} className="text-brand-blue">《隐私政策》</button>
            </label>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-brand-blue/20"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>立即注册</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      <div className="mt-auto pb-12 text-center text-[12px] font-bold text-text-muted">
        已有账号？ <button onClick={() => navigate('/login')} className="text-brand-blue">立即登录</button>
      </div>
    </div>
  );
}
