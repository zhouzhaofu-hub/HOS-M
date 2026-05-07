import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Avatar } from '../components/Avatar';
import { ChevronLeft, User, Phone, MapPin, Heart, FileText, Plus, CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export default function ElderlyProfile() {
  const navigate = useNavigate();
  const { owners, setOwners, setDefaultOwner } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const defaultOwner = owners.find(o => o.isDefault) || owners[0];

  const addNewOwner = () => {
    const newId = String(Date.now());
    const newOwner = {
      id: newId,
      name: '新主人',
      avatar: 'https://images.unsplash.com/photo-1544144433-d5075fcd5f3c?w=200&h=200&fit=crop',
      age: 60,
      bloodType: '未知',
      phone: '未设置',
      address: '未设置',
      medicalHistory: '无',
      medicalRecord: '无',
      isDefault: owners.length === 0
    };
    setOwners([...owners, newOwner]);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-border-base">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-muted">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-black text-text-main tracking-tight">服务主人档案</h1>
          </div>
          <button 
            onClick={addNewOwner}
            className="w-8 h-8 rounded-full bg-brand-blue/5 text-brand-blue flex items-center justify-center border border-brand-blue/10 active:scale-95 transition-transform"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide">
          {/* Owners List */}
          <section className="space-y-4">
            <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest opacity-70">
              已绑定主人 ({owners.length})
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {owners.map(owner => (
                <button
                  key={owner.id}
                  onClick={() => setDefaultOwner(owner.id)}
                  className={`flex-shrink-0 w-24 p-3 rounded-[24px] border transition-all flex flex-col items-center gap-2 ${
                    owner.isDefault 
                      ? 'bg-brand-blue/5 border-brand-blue shadow-sm' 
                      : 'bg-white border-slate-100 opacity-60'
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                      <Avatar src={owner.avatar} className="w-full h-full" />
                    </div>
                    {owner.isDefault && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] font-black truncate w-full text-center ${owner.isDefault ? 'text-brand-blue' : 'text-text-main'}`}>
                    {owner.name}
                  </span>
                </button>
              ))}
              <button 
                onClick={addNewOwner}
                className="flex-shrink-0 w-24 p-3 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400 active:bg-slate-100"
              >
                <div className="w-12 h-12 rounded-2xl border-2 border-white flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black">添加</span>
              </button>
            </div>
          </section>

          <AnimatePresence mode="wait">
            <motion.div
              key={defaultOwner?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Profile Card */}
              <div className="bg-slate-50/50 p-6 rounded-[32px] border border-border-base flex items-center gap-5">
                <div className="w-20 h-20 rounded-3xl border-4 border-white overflow-hidden shadow-xl shrink-0">
                  <Avatar 
                    src={defaultOwner?.avatar}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-black text-text-main leading-tight">{defaultOwner?.name}</h2>
                    {defaultOwner?.isDefault && (
                      <span className="bg-brand-blue/10 text-brand-blue text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase">当前默认</span>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{defaultOwner?.age}岁 • {defaultOwner?.bloodType}</p>
                </div>
              </div>

              {/* Basic Info */}
              <section className="space-y-3">
                 <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest flex justify-between items-center opacity-70">
                   <span>基本信息</span>
                   <button className="text-brand-blue normal-case text-[11px] font-black">编辑</button>
                 </h3>
                 <div className="bg-white rounded-[32px] border border-border-base overflow-hidden divide-y divide-slate-50 shadow-sm">
                    <InfoRow icon={<User className="w-4 h-4" />} label="姓名" value={defaultOwner?.name} />
                    <InfoRow icon={<Phone className="w-4 h-4" />} label="联系电话" value={defaultOwner?.phone} />
                    <InfoRow icon={<MapPin className="w-4 h-4" />} label="居住地址" value={defaultOwner?.address} />
                 </div>
              </section>

              {/* Health Records */}
              <section className="space-y-3 pb-8">
                 <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest opacity-70">健康档案</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="bg-rose-50/30 p-5 rounded-[28px] border border-rose-100">
                      <div className="flex items-center gap-2 text-rose-500 mb-2">
                        <div className="p-1.5 bg-white rounded-lg">
                          <Heart className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-black uppercase">现病史</span>
                      </div>
                      <p className="text-[11px] font-bold text-rose-700 leading-relaxed">{defaultOwner?.medicalHistory}</p>
                    </div>
                    <div className="bg-blue-50/30 p-5 rounded-[28px] border border-blue-100">
                       <div className="flex items-center gap-2 text-brand-blue mb-2">
                        <div className="p-1.5 bg-white rounded-lg">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-black uppercase">医疗记录</span>
                      </div>
                      <p className="text-[11px] font-bold text-blue-700 leading-relaxed">{defaultOwner?.medicalRecord}</p>
                    </div>
                 </div>
                 <button className="w-full py-4 border border-dashed border-border-base rounded-2xl flex items-center justify-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-widest active:bg-slate-50 transition-colors bg-white mt-2">
                   <Plus className="w-4 h-4" />
                   <span>添加病历附件</span>
                 </button>
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-text-muted">{icon}</div>
        <span className="text-sm font-bold text-text-main">{label}</span>
      </div>
      <span className="text-sm font-medium text-text-muted">{value}</span>
    </div>
  );
}
