import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceOwner } from '../types';

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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bigFontMode, setBigFontMode] = useState(() => localStorage.getItem('bigFontMode') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasRobotBound, setHasRobotBound] = useState(false);
  const [owners, setOwners] = useState<ServiceOwner[]>(() => {
    const saved = localStorage.getItem('owners');
    return saved ? JSON.parse(saved) : DEFAULT_OWNERS;
  });

  useEffect(() => {
    localStorage.setItem('owners', JSON.stringify(owners));
  }, [owners]);

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
      setDefaultOwner
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
