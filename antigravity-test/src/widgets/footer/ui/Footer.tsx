import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Antigravity CSR Project. Feature-Sliced Design Architecture.</p>
        <div className="flex items-center gap-4">
          <span>React 19</span>
          <span>•</span>
          <span>Vite 6</span>
          <span>•</span>
          <span>Tailwind v4</span>
        </div>
      </div>
    </footer>
  );
};
