import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button, Card } from '@shared/ui';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          <Zap className="w-3.5 h-3.5" />
          <span>Vite 6 + React 19 CSR Starter</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          안정적인 운영을 위한 <br className="hidden sm:inline" />
          <span className="text-indigo-600">Feature-Sliced Design</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          TypeScript, FSD 아키텍처, Native fetch 클라이언트, TanStack Query, Zustand,
          그리고 Tailwind CSS로 구성된 프로덕션 레디 CSR 프로젝트입니다.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link to="/posts">
            <Button size="lg" className="gap-2">
              게시글 피드 둘러보기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a
            href="https://feature-sliced.design/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="lg">
              FSD 문서 보기
            </Button>
          </a>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Box className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">FSD 7-Layer 구조</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            app → pages → widgets → features → entities → shared 계층 구조로
            단방향 의존성 흐름과 도메인 분리를 엄격하게 보장합니다.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">운영 안정성 중심</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            타임아웃 & 에러 객체를 내장한 Native fetch 클라이언트와 Error Boundary,
            엄격한 TypeScript 컴파일 옵션이 적용되었습니다.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">최신 스택 통합</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            React 19와 TanStack Query v5, Zustand v5, Tailwind CSS v4를 결합하여
            가볍고 민첩한 CSR 번들 크기와 고성능을 제공합니다.
          </p>
        </Card>
      </div>
    </div>
  );
};
