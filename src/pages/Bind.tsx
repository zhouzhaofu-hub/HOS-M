import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Info, Smartphone, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

export default function Bind() {
  const navigate = useNavigate();
  const { setHasRobotBound } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleBind = () => {
    setLoading(true);
    setTimeout(() => {
      setHasRobotBound(true);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white px-8 pt-16 relative">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-black text-text-main tracking-tight">智护设备绑定</h2>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="relative w-64 h-64">
           {/* Scan Area */}
          <div className="absolute inset-0 border border-slate-100 rounded-[48px] bg-slate-50"></div>
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-4 border border-brand-blue rounded-[56px]"
          ></motion.div>
          <div className="absolute inset-5 overflow-hidden rounded-[32px] bg-white border border-border-base flex items-center justify-center p-6 shadow-2xl shadow-indigo-500/10">
            <img
              alt="Scan QR Code"
              className="w-full h-full opacity-90"
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=智护OS-Binding"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Corners */}
          <div className="absolute -top-2 -left-2 w-10 h-10 border-t-4 border-l-4 border-brand-blue rounded-tl-3xl"></div>
          <div className="absolute -top-2 -right-2 w-10 h-10 border-t-4 border-r-4 border-brand-blue rounded-tr-3xl"></div>
          <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-4 border-l-4 border-brand-blue rounded-bl-3xl"></div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-4 border-r-4 border-brand-blue rounded-br-3xl"></div>
        </div>

        <div className="bg-indigo-50/50 p-5 rounded-3xl flex items-start gap-3 mt-16 border border-indigo-100/50">
          <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-indigo-900 leading-relaxed font-bold">
            请确保机器人已联网，并保持在<span className="text-brand-blue">绑定模式</span>。完成后您将成为该设备的超级管理员。
          </p>
        </div>
      </div>

      <div className="pb-16 pt-6">
        <button
          onClick={handleBind}
          disabled={loading}
          className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-blue/20"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>建立安全握手...</span>
            </>
          ) : (
            <span>扫码完成，开始同步</span>
          )}
        </button>
      </div>
    </div>
  );
}
