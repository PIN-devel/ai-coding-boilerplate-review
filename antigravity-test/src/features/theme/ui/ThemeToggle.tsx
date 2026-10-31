import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@shared/ui';
import { useThemeStore } from '../model/useThemeStore';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label="테마 전환"
      className="rounded-full w-9 h-9 p-0 text-slate-600 hover:text-slate-900"
    >
      {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
    </Button>
  );
};
