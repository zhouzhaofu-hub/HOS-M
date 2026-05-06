import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Smartphone, ShieldCheck, ArrowRight, Bot, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<'password' | 'sms'>('password');

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      navigate('/bind');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white px-8 pt-16 relative">
      <div className="flex-1 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-brand-blue rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-brand-blue/20"
        >
          <Bot className="text-white w-12 h-12" />
        </motion.div>
        
        <h1 className="text-3xl font-black text-text-main tracking-tight">智护OS v1.0</h1>

        {/* Login Mode Tabs */}
        <div className="w-full flex bg-slate-50 p-1 rounded-2xl mt-12 mb-6">
          <button 
            onClick={() => setLoginMode('password')}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${loginMode === 'password' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
          >
            密码登录
          </button>
          <button 
            onClick={() => setLoginMode('sms')}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${loginMode === 'sms' ? 'bg-white shadow-sm text-brand-blue' : 'text-text-muted'}`}
          >
            验证码登录
          </button>
        </div>

        <div className="w-full space-y-4">
          <div className="relative group">
            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
            <input
              className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
              placeholder="手机号码"
              defaultValue="13800138000"
            />
          </div>
          
          <AnimatePresence mode="wait">
            {loginMode === 'password' ? (
              <motion.div 
                key="password"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="relative group"
              >
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
                <input
                  className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
                  placeholder="登录密码"
                  type="password"
                  defaultValue="123456"
                />
              </motion.div>
            ) : (
              <motion.div 
                key="sms"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="relative group"
              >
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-blue transition-colors" />
                <input
                  className="w-full bg-slate-50 border border-transparent focus:border-brand-blue focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none text-text-main font-bold transition-all"
                  placeholder="短信验证码"
                  type="text"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-blue font-black text-[11px] uppercase tracking-wider">获取验证码</button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-brand-blue/20"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>登录智护OS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Quick Help */}
        <div className="w-full flex justify-between px-1 mt-4">
          <button 
            onClick={() => navigate('/forgot-password')}
            className="text-[11px] font-black text-text-muted uppercase tracking-wider opacity-60"
          >
            忘记密码？
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="text-[11px] font-black text-brand-blue uppercase tracking-wider"
          >
            新用户注册
          </button>
        </div>

        <div className="w-full mt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-slate-100"></div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">快捷登录</span>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          <div className="flex justify-center gap-6">
            <button className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all">
              <svg className="w-6 h-6 text-[#07C160]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.131 2C6.452 2 2 5.926 2 10.533c0 2.57 1.54 4.887 3.948 6.425.074.04.148.07.168.14.02.07.03.418.01.761a15.82 15.82 0 0 1-.36 1.944c-.031.14-.149.3-.129.35.03.05.158.04.307.01a14.735 14.735 0 0 0 4.1-1.396c.228-.13.435-.11.663-.07 1.109.212 2.316.323 3.553.323 5.679 0 10.131-3.926 10.131-8.533S17.81 2 12.131 2z" /></svg>
            </button>
            <button className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all">
              <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.96.95-2.12 1.43-3.48 1.43-1.01 0-1.83-.24-2.47-.72-.64-.48-1.4-.72-2.28-.72s-1.64.24-2.28.72c-.64.48-1.46.72-2.47.72-1.36 0-2.52-.48-3.48-1.43S.2 18.16.2 16.8c0-3.36 2.37-7.92 5.04-7.92 1.01 0 1.83.24 2.47.72.64.48 1.4.72 2.29.72s1.65-.24 2.29-.72c.64-.48 1.46-.72 2.47-.72 2.67 0 5.04 4.56 5.04 7.92 0 1.36-.48 2.53-1.43 3.48zM12 7.08c-1.36 0-2.52-.48-3.48-1.43s-1.43-2.12-1.43-3.48c0-.04.004-.12.012-.24.008-.12.02-.2.036-.24.08.04.2.14.36.3s.28.32.36.48.16.36.24.6c.08.24.12.44.12.6 0 .96.48 1.8 1.44 2.52.96.72 1.44 1.28 1.44 1.68 0 .2-.04.28-.12.24z"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pb-12 text-center text-[10px] text-slate-400 font-medium leading-relaxed">
        登录即代表您已阅读并同意 <br/>
        <span className="text-blue-600">《智护OS服务协议》</span> 与 <span className="text-blue-600">《隐私保护政策》</span>
      </div>
    </div>
  );
}
