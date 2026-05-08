import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceOwner } from '../types';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface NotificationPrefs {

  alert: boolean;
  prompt: boolean;
  info: boolean;
}

// 机器人属性定义
interface Robot {
  id: string;
  name: string;
  status: 'online' | 'offline';
  battery: number;
  wifi: string;
  settings: {
    volume: number;
    sensitivity: string;
  };
}

interface AppContextType {
  bigFontMode: boolean;
  setBigFontMode: (val: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  hasRobotBound: boolean;
  setHasRobotBound: (val: boolean) => void;
  owners: ServiceOwner[];
  setOwners: (owners: ServiceOwner[]) => void;
  setDefaultOwner: (id: string) => void;
  notificationPrefs: NotificationPrefs;
  setNotificationPrefs: (prefs: NotificationPrefs) => void;
  robots: Robot[];
  setRobots: (robots: Robot[]) => void;
  activeRobotId: string;
  setActiveRobotId: (id: string) => void;
  user: User | null;
  authLoaded: boolean;
}

const DEFAULT_OWNERS: ServiceOwner[] = [
  {
    id: '1',
    name: '周大爷',
    avatar: 'https://images.unsplash.com/photo-1544144433-d5075fcd5f3c?w=200&h=200&fit=crop',
    age: 72,
    bloodType: 'A型血',
    phone: '139 1234 8888',
    address: '北京市东城区平安里 12号',
    medicalHistory: '2018-03-20 冠心病 (控制稳定/日常配药)',
    chronicDisease: '高血压 (I10) · 确诊 2020-05-10 · 控制良好 · 随访每月1次',
    allergies: '药物：青霉素 (皮疹) · 轻度 · 确认人：王医生',
    evaluation: 'ADL评 85分 · 跌倒风险：低 · 营养：良好 · 认知：正常 · 情绪：平稳',
    medicalRecord: '硝苯地平缓释片 1片/次/日；每日清晨站立平衡运动 15分钟',
    isDefault: true
  }
];

const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  alert: true,
  prompt: true,
  info: true
};

const DEFAULT_ROBOTS: Robot[] = [
  { 
    id: '1', 
    name: '智护机器人 - 王大爷家', 
    status: 'online', 
    battery: 85, 
    wifi: '5G • 强',
    settings: { volume: 60, sensitivity: '中等' }
  },
  { 
    id: '2', 
    name: '智护机器人 - 客厅备用', 
    status: 'offline', 
    battery: 12, 
    wifi: '2.4G • 弱',
    settings: { volume: 80, sensitivity: '高等' }
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bigFontMode, setBigFontMode] = useState(() => localStorage.getItem('bigFontMode') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [hasRobotBound, setHasRobotBound] = useState(false);

  const [owners, setOwners] = useState<ServiceOwner[]>([]);
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(DEFAULT_NOTIFICATION_PREFS);
  const [robots, setRobots] = useState<Robot[]>([]);
  const [activeRobotId, setActiveRobotId] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setIsLoggedIn(!!u);
      setAuthLoaded(true);

      if (u) {
        // 确保用户文档存在，如果不存则初始化
        const userDoc = doc(db, 'users', u.uid);
        try {
          const snap = await getDoc(userDoc);
          if (!snap.exists()) {
             await setDoc(userDoc, {
               uid: u.uid,
               email: u.email || '',
               displayName: u.isAnonymous ? '智护演示用户' : (u.displayName || '新用户'),
               avatar: u.photoURL || '',
               createdAt: new Date().toISOString()
             }).catch(e => handleFirestoreError(e, OperationType.CREATE, `users/${u.uid}`));

             // 为新用户创建一个默认的服务主人档案
             const ownerId = "owner_" + Date.now();
             await setDoc(doc(db, 'owners', ownerId), {
               ...DEFAULT_OWNERS[0],
               id: ownerId,
               userId: u.uid,
               robotIds: []
             });

             // 如果是匿名登录（演示用途），自动绑定一个演示机器人
             if (u.isAnonymous) {
               const robotId = "robot_demo_" + u.uid;
               await setDoc(doc(db, 'robots', robotId), {
                 ...DEFAULT_ROBOTS[0],
                 id: robotId,
                 name: '演示机器人-小智',
                 ownerId: u.uid,
                 status: 'online',
                 battery: 92,
                 wifi: '演示专用 • 极强'
               });
             }
          }
        } catch (e) {
          handleFirestoreError(e, OperationType.GET, `users/${u.uid}`);
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) {
      setRobots([]);
      setOwners([]);
      setHasRobotBound(false);
      return;
    }

// 机器人状态同步
    const robotsQ = query(collection(db, 'robots'), where('ownerId', '==', user.uid));
    const unsubRobots = onSnapshot(robotsQ, (snap) => {
      const dbRobots = snap.docs.map(d => ({ id: d.id, ...d.data() } as Robot));
      if (dbRobots.length > 0) {
        setRobots(dbRobots);
        setHasRobotBound(true);
        if (!activeRobotId || !dbRobots.find(r => r.id === activeRobotId)) {
          setActiveRobotId(dbRobots[0].id);
        }
      } else {
        setRobots([]);
        setHasRobotBound(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'robots');
    });

    // 服务主人档案同步
    const ownersQ = query(collection(db, 'owners'), where('userId', '==', user.uid));
    const unsubOwners = onSnapshot(ownersQ, (snap) => {
      const dbOwners = snap.docs.map(d => ({ id: d.id, ...d.data() } as ServiceOwner));
      setOwners(dbOwners);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'owners');
    });

    return () => {
      unsubRobots();
      unsubOwners();
    };
  }, [user]);

  const updateRobotsInDb = async (newRobots: Robot[]) => {
    setRobots(newRobots);
    if (!user) return;
    for (const r of newRobots) {
       try {
         await setDoc(doc(db, 'robots', r.id), r, { merge: true });
       } catch(e) {
         handleFirestoreError(e, OperationType.UPDATE, `robots/${r.id}`);
       }
    }
  };

  const updateOwnersInDb = async (newOwners: ServiceOwner[]) => {
    setOwners(newOwners);
    if (!user) return;
    for (const o of newOwners) {
      try {
        await setDoc(doc(db, 'owners', o.id), { ...o, userId: user.uid }, { merge: true });
      } catch (e) {
        handleFirestoreError(e, OperationType.UPDATE, `owners/${o.id}`);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('bigFontMode', bigFontMode.toString());
  }, [bigFontMode]);

  return (
    <AppContext.Provider value={{ 
      bigFontMode, 
      setBigFontMode, 
      isLoggedIn, 
      setIsLoggedIn, 
      hasRobotBound, 
      setHasRobotBound,
      owners,
      setOwners: updateOwnersInDb,
      setDefaultOwner: (id) => {
        const newOwners = owners.map(owner => ({ ...owner, isDefault: owner.id === id }));
        updateOwnersInDb(newOwners);
      },
      notificationPrefs,
      setNotificationPrefs,
      robots,
      setRobots: updateRobotsInDb,
      activeRobotId,
      setActiveRobotId,
      user,
      authLoaded
    }}>
      <div className={bigFontMode ? 'text-lg' : 'text-base'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
