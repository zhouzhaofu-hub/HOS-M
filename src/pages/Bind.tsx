import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Info, CheckCircle2 } from 'lucide-react';
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
    <div className="flex flex-col h-full bg-white px-8 pt-12 relative">
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900">绑定机器人</h2>
        <p className="text-slate-400 mt-2">请扫描机器人屏幕上的二维码</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64">
           {/* Scan Area */}
          <div className="absolute inset-0 border-2 border-blue-100 rounded-[40px]"></div>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-4 border-2 border-blue-500 rounded-[48px]"
          ></motion.div>
          <div className="absolute inset-4 overflow-hidden rounded-[32px] bg-slate-100 flex items-center justify-center">
            <img
              alt="Scan QR Code"
              className="w-48 h-48 opacity-80"
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=智护OS-Binding"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Corners */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blue-600 rounded-tl-xl"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blue-600 rounded-tr-xl"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blue-600 rounded-bl-xl"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blue-600 rounded-br-xl"></div>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 mt-12">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed font-medium">
            完成绑定后，您将成为该设备的<span className="font-bold">超级管理员</span>，可授权其他家属共同查看。
          </p>
        </div>
      </div>

      <div className="pb-12">
        <button
          onClick={handleBind}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>正在配置守护链路...</span>
            </>
          ) : (
            <span>已扫码，开始守护</span>
          )}
        </button>
      </div>
    </div>
  );
}
