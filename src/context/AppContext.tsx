import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceOwner } from '../types';

interface NotificationPrefs {
  alert: boolean;
  prompt: boolean;
  info: boolean;
}

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
  activeRobotId: string;
  setActiveRobotId: (id: string) => void;
}

const DEFAULT_OWNERS: ServiceOwner[] = [
  {
    id: '1',
    name: '王大爷',
    avatar: 'https://images.unsplash.com/photo-1544144433-d5075fcd5f3c?w=200&h=200&fit=crop',
    age: 72,
    bloodType: 'A型血',
    phone: '139 **** 8888',
    address: '东城区平安里 12号',
    medicalHistory: '高血压（II级）、冠心病二级',
    medicalRecord: '体检：2026.03.15',
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
  const [hasRobotBound, setHasRobotBound] = useState(true);
  const [owners, setOwners] = useState<ServiceOwner[]>(() => {
    const saved = localStorage.getItem('owners');
    return saved ? JSON.parse(saved) : DEFAULT_OWNERS;
  });
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(() => {
    const saved = localStorage.getItem('notificationPrefs');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATION_PREFS;
  });
  const [robots, setRobots] = useState<Robot[]>(() => {
    const saved = localStorage.getItem('robots');
    return saved ? JSON.parse(saved) : DEFAULT_ROBOTS;
  });
  const [activeRobotId, setActiveRobotId] = useState(() => {
    return localStorage.getItem('activeRobotId') || DEFAULT_ROBOTS[0].id;
  });

  useEffect(() => {
    localStorage.setItem('owners', JSON.stringify(owners));
  }, [owners]);

  useEffect(() => {
    localStorage.setItem('notificationPrefs', JSON.stringify(notificationPrefs));
  }, [notificationPrefs]);

  useEffect(() => {
    localStorage.setItem('robots', JSON.stringify(robots));
  }, [robots]);

  useEffect(() => {
    localStorage.setItem('activeRobotId', activeRobotId);
  }, [activeRobotId]);

  const setDefaultOwner = (id: string) => {
    setOwners(prev => prev.map(owner => ({
      ...owner,
      isDefault: owner.id === id
    })));
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
      setOwners,
      setDefaultOwner,
      notificationPrefs,
      setNotificationPrefs,
      robots,
      activeRobotId,
      setActiveRobotId
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
