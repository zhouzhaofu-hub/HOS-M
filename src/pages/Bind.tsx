import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  QrCode, 
  Bluetooth, 
  Keyboard, 
  Search, 
  Cpu, 
  Wifi, 
  ShieldCheck, 
  CheckCircle2,
  Loader2,
  ArrowRight,
  Info,
  Activity
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { handleFirestoreError } from '../context/AppContext';

type BindMethod = 'qr' | 'search' | 'manual';
type BindStep = 'initial' | 'searching' | 'binding' | 'setup' | 'success';

export default function Bind() {
  const navigate = useNavigate();
  const { setHasRobotBound, user } = useAppContext();
  const [method, setMethod] = useState<BindMethod>('qr');
  const [step, setStep] = useState<BindStep>('manual');
  const [isSkipChecked, setIsSkipChecked] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  
  // Setup configuration states
  const [configStep, setConfigStep] = useState(1);
  const [wifiSsid, setWifiSsid] = useState('Home_WiFi_5G');
  const [fallDetection, setFallDetection] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  const handleStartBinding = () => {
    if (isSkipChecked) {
      setHasRobotBound(false);
      navigate('/');
      return;
    }
    setStep('binding');
    setTimeout(() => {
      setStep('setup');
    }, 2000);
  };

  const handleSearch = () => {
    setStep('searching');
    setTimeout(() => {
      setStep('initial'); // In a real app, this would show results
    }, 3000);
  };

  const handleCompleteSetup = async () => {
    setStep('success');
    if (user) {
      const newRobotId = "ZH-" + Date.now().toString().slice(-8);
      const newRobot = {
        id: newRobotId,
        name: `智护机器人 - 01`,
        status: 'online',
        battery: 100,
        wifi: wifiSsid || '智护专网 (5G)',
        ownerId: user.uid,
        lastActive: new Date().toISOString(),
        serialNumber: serialNumber,
        settings: {
          volume: 80,
          brightness: 70,
          fallDetection: true,
          voiceAssistant: true
        }
      };
      
      try {
        // 1. 保存机器人信息
        await setDoc(doc(db, 'robots', newRobotId), newRobot);
        
        // 2. 创建或合并主人档案
        const ownerId = "owner_" + user.uid;
        await setDoc(doc(db, 'owners', ownerId), {
          id: ownerId,
          userId: user.uid,
          name: ownerName || '智护主人',
          phone: ownerPhone || '',
          isDefault: true,
          robotIds: [newRobotId],
          defaultRobotId: newRobotId,
          age: 70,
          bloodType: 'A型',
          chronicDisease: '无',
          allergies: '无',
          evaluation: '健康评估良好',
          medicalRecord: '无重要病史',
          dietaryAdvice: '低盐低脂饮食',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          updatedAt: new Date().toISOString()
        }, { merge: true });

        // 3. 更新系统状态
        setHasRobotBound(true);
        
        // 延迟跳转以显示成功状态
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);

      } catch(e) {
        console.error("Binding failed:", e);
        handleFirestoreError(e, 0 as any, `bind_process`);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between shrink-0">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">智护机器人绑定</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">
        <AnimatePresence mode="wait">
          {step === 'manual' && (
            <motion.div 
              key="manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 mt-4"
            >
              {/* Compact Form Card */}
              <div className="bg-slate-50/50 rounded-[32px] p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-4 bg-brand-blue rounded-full" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">机器人与主人信息录入</h3>
                </div>

                <div className="space-y-5">
                  {/* Serial Number */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">设备序列号 🔢</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                        placeholder="例如: ZH-ROBOT-88x9"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-black focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue active:scale-95 transition-transform hover:bg-brand-blue/10">
                        <QrCode className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Owner Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">主人姓名 👤</label>
                      <input 
                        type="text" 
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="王大爷"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-black focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">联系电话 📱</label>
                      <input 
                        type="tel" 
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="138-xxxx"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-black focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <p className="text-[10px] text-brand-blue font-bold leading-relaxed flex gap-2">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    绑定后，系统将自动为此终端开启专属看护通道，并同步您的健康档案。
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <input 
                    type="checkbox" 
                    id="skip-bind" 
                    checked={isSkipChecked}
                    onChange={(e) => setIsSkipChecked(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
                  />
                  <label htmlFor="skip-bind" className="text-[12px] text-slate-500 font-bold cursor-pointer">
                    我已经阅读并同意《服务协议与隐私政策》
                  </label>
                </div>

                <button
                  onClick={handleStartBinding}
                  disabled={!serialNumber || !ownerName || !isSkipChecked}
                  className="w-full bg-brand-blue text-white py-5 rounded-[24px] font-black text-base shadow-xl shadow-brand-blue/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <span>立即开始绑定机器人</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'binding' && (
            <motion.div 
              key="binding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full pt-20"
            >
              <div className="w-24 h-24 rounded-[32px] bg-brand-blue flex items-center justify-center shadow-2xl shadow-brand-blue/40 relative overflow-hidden">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
                <motion.div 
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 2 }}
                  className="absolute bottom-0 left-0 right-0 bg-white/10"
                />
              </div>
              <h2 className="mt-8 text-xl font-black text-slate-900 tracking-tight">正在建立安全握手</h2>
              <p className="mt-2 text-sm text-slate-400 font-bold">已检测到设备，正在同步加密密钥...</p>
              
              <div className="w-full max-w-[220px] mt-10 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ x: '-100%' }}
                   animate={{ x: '0%' }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                   className="h-full bg-brand-blue" 
                />
              </div>
            </motion.div>
          )}

          {step === 'setup' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 space-y-8"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm shadow-emerald-100/50">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-slate-900 leading-none">初始化快速配置</h2>
                 </div>
              </div>

              <div className="space-y-6">
                {configStep === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 shadow-sm shadow-slate-100/10">
                      <div className="flex items-center gap-3 mb-6">
                        <Wifi className="w-5 h-5 text-brand-blue" />
                        <h3 className="font-black text-slate-800">网络自动同步</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1.5">当前手机无线网络</p>
                              <p className="text-sm font-black text-slate-800 tracking-tight">{wifiSsid}</p>
                           </div>
                           <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                             <CheckCircle2 className="w-4 h-4" />
                           </div>
                        </div>
                        <p className="text-[11px] text-slate-400 font-bold leading-relaxed px-1">
                          智护机器人将自动连接至同一网络，以确保高速低延迟的视频与实时控制体验。
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {configStep === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 shadow-sm shadow-slate-100/10">
                      <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck className="w-5 h-5 text-orange-500" />
                        <h3 className="font-black text-slate-800">核心安全服务</h3>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-50/50 transition-colors">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${fallDetection ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-400'}`}>
                                 <Activity className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-slate-800 leading-none mb-1">摔倒预警</p>
                              </div>
                           </div>
                           <div className={`w-10 h-6 rounded-full relative transition-colors ${fallDetection ? 'bg-brand-blue' : 'bg-slate-200'}`}>
                              <motion.div 
                                animate={{ x: fallDetection ? 18 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                              />
                              <input type="checkbox" checked={fallDetection} onChange={(e) => setFallDetection(e.target.checked)} className="absolute inset-0 opacity-0 cursor-pointer" />
                           </div>
                        </label>
                        <label className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-50/50 transition-colors">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${privacyMode ? 'bg-purple-50 text-purple-500' : 'bg-slate-50 text-slate-400'}`}>
                                 <ShieldCheck className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-slate-800 leading-none mb-1">隐私遮罩</p>
                              </div>
                           </div>
                           <div className={`w-10 h-6 rounded-full relative transition-colors ${privacyMode ? 'bg-brand-blue' : 'bg-slate-200'}`}>
                              <motion.div 
                                animate={{ x: privacyMode ? 18 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                              />
                              <input type="checkbox" checked={privacyMode} onChange={(e) => setPrivacyMode(e.target.checked)} className="absolute inset-0 opacity-0 cursor-pointer" />
                           </div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="pt-10">
                 {configStep === 1 ? (
                   <button 
                     onClick={() => setConfigStep(2)}
                     className="w-full bg-brand-blue text-white py-5 rounded-[24px] font-black text-base shadow-xl shadow-brand-blue/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                   >
                     <span>确认网络，继续配置</span>
                     <ArrowRight className="w-5 h-5" />
                   </button>
                 ) : (
                   <button 
                     onClick={handleCompleteSetup}
                     className="w-full bg-emerald-500 text-white py-5 rounded-[24px] font-black text-base shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                   >
                     <CheckCircle2 className="w-5 h-5" />
                     <span>完成配置，启动智护守护</span>
                   </button>
                 )}
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full pt-28"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40 relative">
                <CheckCircle2 className="w-12 h-12 text-white" />
                <motion.div 
                   animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 bg-emerald-500 rounded-full" 
                />
              </div>
              <h2 className="mt-10 text-2xl font-black text-slate-900 tracking-tight">智护终端已就位</h2>
              <p className="mt-3 text-sm text-slate-400 font-bold max-w-[220px] text-center leading-relaxed">
                所有安全协议已同步完成，系统将在 3 秒内带您进入控制中心。
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* iOS Indicator */}
      <div className="pb-4 flex justify-center shrink-0">
        <div className="w-32 h-1.5 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}
