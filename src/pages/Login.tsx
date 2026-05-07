import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Smartphone, ShieldCheck, ArrowRight, Bot, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setHasRobotBound } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<'password' | 'sms'>('password');
  const [showAgreement, setShowAgreement] = useState<'service' | 'privacy' | null>(null);

  const handleLogin = (skipBind = false) => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      if (skipBind) {
        setHasRobotBound(true);
        navigate('/');
      } else {
        navigate('/bind');
      }
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
            onClick={() => handleLogin(false)}
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
            <button 
              onClick={() => handleLogin(true)}
              className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6 text-[#07C160]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.131 2C6.452 2 2 5.926 2 10.533c0 2.57 1.54 4.887 3.948 6.425.074.04.148.07.168.14.02.07.03.418.01.761a15.82 15.82 0 0 1-.36 1.944c-.031.14-.149.3-.129.35.03.05.158.04.307.01a14.735 14.735 0 0 0 4.1-1.396c.228-.13.435-.11.663-.07 1.109.212 2.316.323 3.553.323 5.679 0 10.131-3.926 10.131-8.533S17.81 2 12.131 2z" /></svg>
            </button>
            <button 
              onClick={() => handleLogin(true)}
              className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all"
            >
              <Smartphone className="w-6 h-6 text-slate-900" />
            </button>
          </div>
        </div>
      </div>

      <div className="pb-12 text-center text-[10px] text-slate-400 font-medium leading-relaxed">
        登录即代表您已阅读并同意 <br/>
        <span 
          className="text-blue-600 cursor-pointer hover:underline" 
          onClick={() => setShowAgreement('service')}
        >《智护OS服务协议》</span> 与 <span 
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => setShowAgreement('privacy')}
        >《隐私保护政策》</span>
      </div>

      <AnimatePresence>
        {showAgreement && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0"
            onClick={() => setShowAgreement(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full bg-white rounded-t-[32px] max-h-[85vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-50">
                <h3 className="text-base font-black text-slate-900">
                  {showAgreement === 'service' ? '智护OS服务协议' : '隐私保护政策'}
                </h3>
                <button 
                  onClick={() => setShowAgreement(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 active:scale-90 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 text-xs text-slate-600 leading-relaxed space-y-4">
                <p className="font-bold text-slate-900">更新日期：2024年05月</p>
                <p>
                  欢迎您使用智护OS。我们非常重视您的个人信息保护和隐私保护。在您使用我们的服务之前，请务必仔细阅读并理解本协议。
                </p>
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-800">1. 服务内容</h4>
                  <p>智护OS为您提供智能家居设备控制、健康数据监测以及远程安全防护等全方位智慧养老服务。</p>
                </section>
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-800">2. 用户行为规范</h4>
                  <p>您应保证在使用本服务时，遵守中国相关法律法规，不得利用本服务从事非法活动。</p>
                </section>
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-800">3. 隐私保护</h4>
                  <p>我们将严格按照《隐私保护政策》保护您的个人信息。您的心率、血压等健康数据将仅用于为您提供监测服务，不会泄露给第三方。</p>
                </section>
                <section className="space-y-2">
                  <h4 className="font-bold text-slate-800">4. 免责声明</h4>
                  <p>本平台提供的健康建议仅供参考，不作为医疗诊断依据。如遇紧急情况，请及时拨打120或联系专业医疗机构。</p>
                </section>
                <div className="h-10" />
              </div>
              <div className="p-6 bg-slate-50">
                <button 
                  onClick={() => setShowAgreement(null)}
                  className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-sm active:scale-[0.98] transition-all"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
