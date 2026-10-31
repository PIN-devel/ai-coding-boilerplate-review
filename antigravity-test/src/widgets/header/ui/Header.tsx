import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { ThemeToggle } from '@features/theme';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600">
          <Layers className="w-6 h-6" />
          <span>FSD React CSR</span>
        </NavLink>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900 transition-colors'
            }
          >
            홈
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900 transition-colors'
            }
          >
            게시글 목록
          </NavLink>
          <div className="h-4 w-px bg-slate-200" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
