import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@shared/ui';

interface PostSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const PostSearchInput: React.FC<PostSearchInputProps> = ({
  value,
  onChange,
  placeholder = '게시글 검색...',
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
};
