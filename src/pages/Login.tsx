import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Smartphone, ShieldCheck, ArrowRight, Bot, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import { GoogleAuthProvider, OAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const { user, setIsLoggedIn, setHasRobotBound, authLoaded } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<'password' | 'sms'>('password');
  const [showAgreement, setShowAgreement] = useState<'service' | 'privacy' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (authLoaded && user) {
      navigate('/', { replace: true });
    }
  }, [authLoaded, user, navigate]);

  // 处理谷歌登录
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (e) {
      console.error("Google logic error: ", e);
      setErrorMessage('谷歌登录失败，请检查网络并重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理苹果登录
  const handleAppleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (e) {
      console.error("Apple login error: ", e);
      setErrorMessage('苹果登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 模拟微信登录
  const handleWechatLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await signInAnonymously(auth);
      navigate('/');
    } catch (e) {
      console.error("Wechat login error: ", e);
      setErrorMessage('微信登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 匿名登录 (演示用)
  const handleAnonymousLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await signInAnonymously(auth);
      navigate('/');
    } catch (e) {
      console.error(e);
      setErrorMessage('登录失败，无法连接到认证服务器');
    } finally {
      setLoading(false);
    }
  }

  if (!authLoaded) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white px-8 pt-16 relative">
      <div className="flex-1 flex flex-col items-center">
        {/* 应用 Logo - 使用表情符号替代 SVG */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-brand-blue rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-brand-blue/20"
        >
          <span className="text-5xl">🤖</span>
        </motion.div>
        
        <h1 className="text-3xl font-black text-text-main tracking-tight">智护OS v1.0</h1>

        {/* 错误提示区域 */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-4 p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2"
          >
            <span>⚠️</span> {errorMessage}
          </motion.div>
        )}

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
            onClick={handleAnonymousLogin}
            disabled={loading}
            className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-brand-blue/20"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>匿名登录智护OS</span>
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
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">其他登录方式</span>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>
          <div className="flex justify-center gap-6">
            <button 
              onClick={handleWechatLogin}
              className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6 text-[#07C160]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.131 2C6.452 2 2 5.926 2 10.533c0 2.57 1.54 4.887 3.948 6.425.074.04.148.07.168.14.02.07.03.418.01.761a15.82 15.82 0 0 1-.36 1.944c-.031.14-.149.3-.129.35.03.05.158.04.307.01a14.735 14.735 0 0 0 4.1-1.396c.228-.13.435-.11.663-.07 1.109.212 2.316.323 3.553.323 5.679 0 10.131-3.926 10.131-8.533S17.81 2 12.131 2z" /></svg>
            </button>
            <button 
              onClick={handleAppleLogin}
              className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.046 14.372c-.03-2.613 2.148-3.882 2.247-3.938-1.22-1.782-3.117-2.023-3.791-2.062-1.61-.164-3.148.948-3.971.948-.823 0-2.091-.91-3.416-.885-1.722.027-3.313.998-4.205 2.55-1.808 3.125-.462 7.747 1.303 10.297.868 1.258 1.892 2.661 3.256 2.615 1.312-.05 1.815-.843 3.41-.843 1.583 0 2.052.843 3.424.814 1.396-.027 2.274-1.261 3.134-2.522 1-.1449 1.41-2.85 1.442-2.91-1.4-.648-2.203-2.016-2.233-3.664M14.78 6.467c.725-.873 1.215-2.09.1-4.064-.95.038-2.233.633-2.98 1.523-.668.799-1.266 2.046-1.112 3.265 1.05.08 2.228-.52 2.991-1.391"/>
              </svg>
            </button>
            <button 
              onClick={handleGoogleLogin}
              className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
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
