import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Activity, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {children}
      </div>
      
      {/* Bottom Tab Bar */}
      <nav className="bg-white border-t border-border-base px-8 py-4 flex justify-between items-center pb-10 shrink-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn("flex flex-col items-center gap-1.5 transition-all active:scale-95", isActive ? "text-brand-blue" : "text-text-muted")
          }
        >
          <span className="text-xl leading-none">🏠</span>
          <span className="text-[12px] font-black leading-none uppercase tracking-widest">首页</span>
        </NavLink>
        
        <NavLink
          to="/control"
          className={({ isActive }) =>
            cn("flex flex-col items-center gap-1.5 transition-all active:scale-95", isActive ? "text-brand-blue" : "text-text-muted")
          }
        >
          <span className="text-xl leading-none">🎮</span>
          <span className="text-[12px] font-black leading-none uppercase tracking-widest">控制</span>
        </NavLink>
        
        <NavLink
          to="/health"
          className={({ isActive }) =>
            cn("flex flex-col items-center gap-1.5 transition-all active:scale-95", isActive ? "text-brand-blue" : "text-text-muted")
          }
        >
          <span className="text-xl leading-none">📈</span>
          <span className="text-[12px] font-black leading-none uppercase tracking-widest">健康</span>
        </NavLink>
        
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn("flex flex-col items-center gap-1.5 transition-all active:scale-95", isActive ? "text-brand-blue" : "text-text-muted")
          }
        >
          <span className="text-xl leading-none">👤</span>
          <span className="text-[12px] font-black leading-none uppercase tracking-widest">我的</span>
        </NavLink>
      </nav>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900/10 rounded-full pointer-events-none" />
    </div>
  );
};
