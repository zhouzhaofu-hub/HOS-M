import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  bigFontMode: boolean;
  setBigFontMode: (val: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  hasRobotBound: boolean;
  setHasRobotBound: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bigFontMode, setBigFontMode] = useState(() => localStorage.getItem('bigFontMode') === 'true');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasRobotBound, setHasRobotBound] = useState(false);

  useEffect(() => {
    localStorage.setItem('bigFontMode', bigFontMode.toString());
  }, [bigFontMode]);

  return (
    <AppContext.Provider value={{ bigFontMode, setBigFontMode, isLoggedIn, setIsLoggedIn, hasRobotBound, setHasRobotBound }}>
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
