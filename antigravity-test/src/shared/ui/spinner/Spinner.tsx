import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className, ...props }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={cn('flex items-center justify-center p-4', className)} {...props}>
      <Loader2 className={cn('animate-spin text-indigo-600', sizes[size])} />
    </div>
  );
};
