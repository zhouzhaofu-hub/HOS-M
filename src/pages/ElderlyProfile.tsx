import React, { useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { Avatar } from '../components/Avatar';
import { ChevronLeft, User, Phone, MapPin, Heart, FileText, Plus, CheckCircle2, Circle, Settings2, Bot, X, Camera, Loader2, Sparkles, Image as LucideImage } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ServiceOwner } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeMedicalRecord } from '../services/aiService';

export default function ElderlyProfile() {
  const navigate = useNavigate();
  const { owners, setOwners, setDefaultOwner, robots } = useAppContext();
  const [showRobotPicker, setShowRobotPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ServiceOwner | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isPrivacyRevealed, setIsPrivacyRevealed] = useState(false);
  const [privacyPassword, setPrivacyPassword] = useState('');
  const [pwdError, setPwdError] = useState('');

  const albumInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const defaultOwner = owners.find(o => o.isDefault) || owners[0];

  const maskPhone = (phone: string = '') => {
    if (isPrivacyRevealed) return phone;
    const cleaned = phone.replace(/\s+/g, '');
    if (cleaned.length >= 11) {
      return cleaned.substring(0, 3) + ' **** ' + cleaned.substring(7);
    }
    return cleaned.length > 4 ? cleaned.substring(0, 3) + '***' : cleaned;
  };

  const maskAddress = (addr: string = '') => {
    if (isPrivacyRevealed) return addr;
    if (addr.length > 6) {
      return addr.substring(0, 3) + '***' + addr.substring(addr.length - 2);
    }
    return '***';
  };

  const handleVerifyPrivacy = () => {
    if (privacyPassword === '123456') { // Mock password
      setIsPrivacyRevealed(true);
      setShowPrivacyModal(false);
      setPrivacyPassword('');
      setPwdError('');
    } else {
      setPwdError('密码错误，请重试');
    }
  };

  // 开启编辑模式
  const startEditing = () => {
    if (defaultOwner) {
      setEditForm({ ...defaultOwner });
      setIsEditing(true);
    }
  };

  // 保存编辑内容
  const handleSaveEdit = () => {
    if (editForm) {
      const newOwners = owners.map(o => o.id === editForm.id ? editForm : o);
      setOwners(newOwners);
      setIsEditing(false);
    }
  };

  // 处理文件上传并调用AI解析
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !defaultOwner) return;

    setIsParsing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result?.toString().split(',')[1];
        if (!base64) return;

        const result = await analyzeMedicalRecord(base64, file.type);
        
        // 自动填入表单并开启编辑模式，让用户确认
        setEditForm({
          ...defaultOwner,
          medicalHistory: result.medicalHistory,
          medicalRecord: result.medicalRecord
        });
        setIsEditing(true);
        setIsParsing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("AI解析失败，请检查网络或图片质量后重试。");
      setIsParsing(false);
    }
  };

  // 添加新的服务主人
  const addNewOwner = () => {
    const newId = "owner_" + Date.now();
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
      isDefault: owners.length === 0,
      robotIds: []
    };
    setOwners([...owners, newOwner]);
  };

  // 切换机器人的选中状态（多选支持）
  const toggleRobotSelection = (robotId: string) => {
    if (!defaultOwner) return;
    const currentIds = defaultOwner.robotIds || [];
    const newIds = currentIds.includes(robotId)
      ? currentIds.filter(id => id !== robotId)
      : [...currentIds, robotId];
    
    // 更新本地状态并同步到数据库
    const newOwners = owners.map(o => 
      o.id === defaultOwner.id ? { ...o, robotIds: newIds } : o
    );
    setOwners(newOwners);
  };

  // 获取当前档案关联的机器人列表
  const linkedRobots = robots.filter(r => defaultOwner?.robotIds?.includes(r.id));

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
              <div className="bg-slate-50/50 p-6 rounded-[32px] border border-border-base flex items-center gap-5 relative group overflow-hidden">
                <div className="w-20 h-20 rounded-3xl border-4 border-white overflow-hidden shadow-xl shrink-0">
                  <Avatar 
                    src={defaultOwner?.avatar}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-black text-text-main leading-tight">{defaultOwner?.name}</h2>
                    {defaultOwner?.isDefault && (
                      <span className="bg-brand-blue/10 text-brand-blue text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase">当前默认</span>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{defaultOwner?.age}岁 • {defaultOwner?.bloodType}</p>
                </div>
                
                {/* Robot Toggle Button (The "Arrow" or action area in screenshot) */}
                <button 
                  onClick={() => setShowRobotPicker(true)}
                  className="absolute bottom-4 right-6 p-3 bg-white hover:bg-slate-50 rounded-full border border-slate-200 shadow-sm text-brand-blue active:scale-90 transition-all"
                >
                  <Bot className="w-5 h-5" />
                </button>
              </div>

              {/* Linked Robots Section */}
              <section className="space-y-3">
                 <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest flex justify-between items-center opacity-70">
                   <span>服务机器人</span>
                   <button 
                    onClick={() => setShowRobotPicker(true)}
                    className="text-brand-blue normal-case text-[11px] font-black"
                   >
                     管理机器人
                   </button>
                 </h3>
                 <div className="grid grid-cols-1 gap-2">
                   {linkedRobots.length > 0 ? (
                     linkedRobots.map(robot => (
                       <div key={robot.id} className="bg-white p-4 rounded-2xl border border-border-base flex items-center justify-between shadow-sm">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded-xl text-brand-blue">
                              <Bot className="w-5 h-5" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-text-main">{robot.name}</p>
                               <div className="flex items-center gap-1.5 mt-0.5">
                                  <div className={`w-1.5 h-1.5 rounded-full ${robot.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                  <span className="text-[9px] font-bold text-text-muted uppercase">{robot.status === 'online' ? '在线' : '离线'}</span>
                               </div>
                            </div>
                         </div>
                         <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                           ⚡️ {robot.battery}%
                         </div>
                       </div>
                     ))
                   ) : (
                     <div className="bg-slate-50/50 p-6 rounded-[28px] border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-text-muted">
                        <Bot className="w-8 h-8 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-wider">暂未关联服务机器人</p>
                     </div>
                   )}
                 </div>
              </section>

              {/* Basic Info */}
              <section className="space-y-3">
                 <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest flex justify-between items-center opacity-70">
                   <span>基本信息</span>
                   <div className="flex items-center gap-4">
                     {isPrivacyRevealed ? (
                       <button onClick={() => setIsPrivacyRevealed(false)} className="text-brand-blue normal-case text-[11px] font-black flex items-center gap-1">🙈 隐藏隐私</button>
                     ) : (
                       <button onClick={() => setShowPrivacyModal(true)} className="text-brand-blue normal-case text-[11px] font-black flex items-center gap-1">👁️ 查看隐私</button>
                     )}
                     <button 
                      onClick={startEditing}
                      className="text-brand-blue normal-case text-[11px] font-black"
                     >
                       编辑
                     </button>
                   </div>
                 </h3>
                 <div className="bg-white rounded-[32px] border border-border-base overflow-hidden divide-y divide-slate-50 shadow-sm">
                    <InfoRow icon={<User className="w-4 h-4" />} label="姓名" value={defaultOwner?.name || ''} />
                    <InfoRow icon={<Phone className="w-4 h-4" />} label="联系电话" value={maskPhone(defaultOwner?.phone)} />
                    <InfoRow icon={<MapPin className="w-4 h-4" />} label="居住地址" value={maskAddress(defaultOwner?.address)} />
                 </div>
              </section>

              {/* Health Records */}
              <section className="space-y-4 pb-8">
                 <h3 className="px-1 text-[10px] font-black text-text-muted uppercase tracking-widest opacity-70 flex items-center gap-2">
                   <span>健康档案管理</span>
                   <div className="h-[1px] flex-1 bg-slate-100" />
                 </h3>
                 
                 <input 
                    type="file" 
                    ref={albumInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <input 
                    type="file" 
                    ref={cameraInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                    capture="environment"
                  />
                 
                 <div className="flex flex-col gap-4">
                    {/* 1. 慢病管理 */}
                    <div className="bg-emerald-50/30 p-5 rounded-[32px] border border-emerald-100/50 shadow-sm relative overflow-hidden group">
                      <div className="flex items-center gap-2 text-emerald-600 mb-3">
                        <div className="p-1.5 bg-white rounded-xl shadow-sm border border-emerald-50">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">慢性病管理</span>
                      </div>
                      <p className="text-[14px] font-bold text-emerald-900/80 leading-relaxed px-1">
                        {defaultOwner?.chronicDisease || '且无登记记录'}
                      </p>
                    </div>

                    {/* 2. 过敏信息 */}
                    <div className="bg-amber-50/40 p-5 rounded-[32px] border border-amber-100/50 shadow-sm relative overflow-hidden group">
                      <div className="flex items-center gap-2 text-amber-600 mb-3">
                        <div className="p-1.5 bg-white rounded-xl shadow-sm border border-amber-50">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">过敏信息与用药安全</span>
                      </div>
                      <p className="text-[14px] font-bold text-amber-900/80 leading-relaxed px-1">
                        {defaultOwner?.allergies || '暂无已知过敏源'}
                      </p>
                    </div>

                    {/* 3. 既往史 (Original Medical History) */}
                    <div className="bg-rose-50/30 p-5 rounded-[32px] border border-rose-100/50 shadow-sm relative overflow-hidden group">
                      <div className="flex items-center gap-2 text-rose-500 mb-3">
                        <div className="p-1.5 bg-white rounded-xl shadow-sm border border-rose-50">
                          <Heart className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">既往史与手术记录</span>
                      </div>
                      <p className="text-[14px] font-bold text-rose-800/80 leading-relaxed px-1">
                        {defaultOwner?.medicalHistory}
                      </p>
                    </div>

                    {/* 4. 风险评估 */}
                    <div className="bg-indigo-50/30 p-5 rounded-[32px] border border-indigo-100/50 shadow-sm relative overflow-hidden group">
                      <div className="flex items-center gap-2 text-indigo-500 mb-3">
                        <div className="p-1.5 bg-white rounded-xl shadow-sm border border-indigo-50">
                          <Settings2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">风险评估与生活能力</span>
                      </div>
                      <p className="text-[14px] font-bold text-indigo-800/80 leading-relaxed px-1">
                        {defaultOwner?.evaluation || '暂无评估记录'}
                      </p>
                    </div>

                    {/* 5. 医嘱记录 (Original Medical Record) */}
                    <div className="bg-brand-blue/5 p-5 rounded-[32px] border border-brand-blue/10 shadow-sm relative overflow-hidden group">
                       <div className="flex items-center gap-2 text-brand-blue mb-4">
                        <div className="p-1.5 bg-white rounded-xl shadow-sm border border-brand-blue/5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">医嘱与处方建议</span>
                      </div>
                      
                      <div className="space-y-4 px-1">
                        {defaultOwner?.medicalRecord.includes('；') ? (
                          <>
                            <div className="relative pl-4 border-l-2 border-brand-blue/20">
                              <p className="text-[9px] font-black text-brand-blue/40 uppercase tracking-[0.12em] mb-1">用药处方</p>
                              <p className="text-[14px] font-bold text-text-main leading-snug">
                                {defaultOwner.medicalRecord.split('；')[0]}
                              </p>
                            </div>
                            <div className="relative pl-4 border-l-2 border-brand-blue/20">
                              <p className="text-[9px] font-black text-brand-blue/40 uppercase tracking-[0.12em] mb-1">健康处方</p>
                              <p className="text-[14px] font-bold text-text-main leading-snug">
                                {defaultOwner.medicalRecord.split('；')[1]}
                              </p>
                            </div>
                          </>
                        ) : (
                          <p className="text-[14px] font-bold text-text-main leading-relaxed">{defaultOwner?.medicalRecord}</p>
                        )}
                      </div>
                    </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="space-y-4 mt-6">
                    <button 
                        onClick={() => cameraInputRef.current?.click()}
                        disabled={isParsing}
                        className="w-full py-4 bg-brand-blue text-white rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 active:scale-[0.98] transition-all"
                      >
                        {isParsing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-[13px] font-black uppercase tracking-widest">AI 正在解析中...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[13px] font-black uppercase tracking-widest">拍照提取档案</span>
                          </>
                        )}
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => albumInputRef.current?.click()}
                        className="py-3 bg-white border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-text-muted active:bg-slate-50 transition-colors shadow-sm"
                      >
                        <LucideImage className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-wider">从相册选择</span>
                      </button>
                      <button 
                        onClick={startEditing}
                        className="py-3 bg-white border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-text-muted active:bg-slate-50 transition-colors shadow-sm"
                      >
                        <Settings2 className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-wider">手动完善此页</span>
                      </button>
                    </div>
                 </div>
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Robot Picker Modal */}
      <AnimatePresence>
        {showRobotPicker && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRobotPicker(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="px-8 pt-10 pb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-text-main tracking-tight">关联机器人</h2>
                  <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mt-1">选择为 {defaultOwner?.name} 服务的一台或多台机器</p>
                </div>
                <button 
                  onClick={() => setShowRobotPicker(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-text-muted active:scale-90 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-3">
                {robots.length > 0 ? (
                  robots.map(robot => {
                    const isSelected = defaultOwner?.robotIds?.includes(robot.id);
                    return (
                      <button
                        key={robot.id}
                        onClick={() => toggleRobotSelection(robot.id)}
                        className={`w-full p-5 rounded-[28px] border-2 transition-all flex items-center justify-between group ${
                          isSelected 
                            ? 'bg-brand-blue/5 border-brand-blue shadow-sm' 
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-brand-blue text-white' : 'bg-slate-50 text-text-muted'
                          }`}>
                            <Bot className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <p className={`text-sm font-black ${isSelected ? 'text-brand-blue' : 'text-text-main'}`}>{robot.name}</p>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                              {robot.status === 'online' ? '🟢 在线' : '⚪️ 离线'} • 电量 {robot.battery}%
                            </p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-brand-blue border-brand-blue text-white scale-110' 
                            : 'border-slate-200 text-transparent'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-300">
                      <Bot className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-text-main">暂无可关联的机器人</p>
                      <p className="text-[11px] font-bold text-text-muted mt-1 px-10">请先在主菜单中绑定并连接您的智护服务机器人</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8 pt-0 border-t border-slate-50">
                <button 
                  onClick={() => setShowRobotPicker(false)}
                  className="w-full py-5 bg-brand-blue text-white rounded-[24px] font-black text-base shadow-lg shadow-brand-blue/20 active:scale-[0.98] transition-all"
                >
                  确认关联
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Edit Modal */}
      <AnimatePresence>
        {isEditing && editForm && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white rounded-t-[40px] shadow-2xl overflow-hidden flex flex-col h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-8 pt-10 pb-6 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <h2 className="text-xl font-black text-text-main tracking-tight">编辑主人档案 📝</h2>
                  <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mt-1">完善基础信息与健康数据</p>
                </div>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-text-muted active:scale-90 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto px-8 pb-32 space-y-8">
                {/* Section: Basic */}
                <div className="space-y-5">
                  <h4 className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] opacity-60">👤 基本信息</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">姓名</label>
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        placeholder="请输入姓名"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 ml-1">年龄</label>
                        <input 
                          type="number" 
                          value={editForm.age}
                          onChange={e => setEditForm({ ...editForm, age: parseInt(e.target.value) || 0 })}
                          className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-400 ml-1">血型</label>
                        <select 
                          value={editForm.bloodType}
                          onChange={e => setEditForm({ ...editForm, bloodType: e.target.value })}
                          className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-brand-blue/20 transition-all appearance-none"
                        >
                          <option value="A型">A型</option>
                          <option value="B型">B型</option>
                          <option value="AB型">AB型</option>
                          <option value="O型">O型</option>
                          <option value="其他">其他</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">联系电话 📞</label>
                      <input 
                        type="tel" 
                        value={editForm.phone}
                        onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        placeholder="请输入电话号码"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">居住地址 📍</label>
                      <textarea 
                        value={editForm.address}
                        onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-brand-blue/20 transition-all min-h-[80px] resize-none"
                        placeholder="请输入现居地址"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Medical */}
                <div className="space-y-5">
                  <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] opacity-60">📋 健康档案详细记录</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">慢性病管理 💊</label>
                      <textarea 
                        value={editForm.chronicDisease || ''}
                        onChange={e => setEditForm({ ...editForm, chronicDisease: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-emerald-500/20 transition-all min-h-[80px] resize-none"
                        placeholder="疾病名、ICD10、确诊时间、控制状态等"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">过敏信息与用药安全 ⚠️</label>
                      <textarea 
                        value={editForm.allergies || ''}
                        onChange={e => setEditForm({ ...editForm, allergies: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-rose-500/20 transition-all min-h-[80px] resize-none"
                        placeholder="过敏原类型、名称、反应、严重程度"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">既往史与手术 🏥</label>
                      <textarea 
                        value={editForm.medicalHistory}
                        onChange={e => setEditForm({ ...editForm, medicalHistory: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-rose-500/20 transition-all min-h-[80px] resize-none"
                        placeholder="既往疾病、手术记录、外伤、输血史"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">风险评估与生活能力 📊</label>
                      <textarea 
                        value={editForm.evaluation || ''}
                        onChange={e => setEditForm({ ...editForm, evaluation: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-indigo-500/20 transition-all min-h-[80px] resize-none"
                        placeholder="ADL评分、跌倒风险、营养/认知/情绪评估"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-400 ml-1">医嘱记录 (用药/健康建议) 📋</label>
                      <textarea 
                        value={editForm.medicalRecord}
                        onChange={e => setEditForm({ ...editForm, medicalRecord: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-text-main focus:ring-2 focus:ring-brand-blue/20 transition-all min-h-[80px] resize-none"
                        placeholder="使用 ‘；’ 分隔用药处方和健康建议"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed Footer with Save Button */}
              <div className="absolute bottom-0 left-0 right-0 p-8 pt-6 bg-gradient-to-t from-white via-white to-white/0">
                <button 
                  onClick={handleSaveEdit}
                  className="w-full py-5 bg-brand-blue text-white rounded-[24px] font-black text-base shadow-xl shadow-brand-blue/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>保存修改 💾</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Privacy Password Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacyModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl overflow-hidden"
            >
              <div className="text-center space-y-2 mb-6">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-lg font-black text-text-main">隐私安全验证</h3>
                <p className="text-xs text-text-muted">请输入密码查看完整的敏感信息</p>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={privacyPassword}
                    onChange={(e) => setPrivacyPassword(e.target.value)}
                    placeholder="输入密码 (演示: 123456)"
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-center text-lg font-bold text-text-main focus:ring-2 focus:ring-brand-blue/20 transition-all tracking-widest placeholder:tracking-normal placeholder:text-sm"
                  />
                  {pwdError && (
                    <p className="text-[10px] text-rose-500 font-bold text-center mt-2">{pwdError}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="py-3.5 bg-slate-50 text-text-muted rounded-xl font-black text-sm active:scale-95 transition-all"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleVerifyPrivacy}
                    className="py-3.5 bg-brand-blue text-white rounded-xl font-black text-sm shadow-lg shadow-brand-blue/20 active:scale-95 transition-all"
                  >
                    验证
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
