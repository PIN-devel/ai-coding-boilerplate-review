import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@shared/ui';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-7xl font-extrabold text-indigo-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-slate-500 max-w-sm mb-6 text-sm">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link to="/">
        <Button variant="primary" className="gap-2">
          <Home className="w-4 h-4" />
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
};
