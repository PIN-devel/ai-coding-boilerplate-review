# Antigravity CSR React Starter (FSD Architecture)

Vite 6, React 19, TypeScript 기반의 고성능 및 운영 안정성을 고려한 CSR(Client-Side Rendering) 프로젝트입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 / 라이브러리 | 버전 | 선정 이유 / 특징 |
| :--- | :--- | :--- | :--- |
| **Runtime / Tooling** | Vite | `^6.1.0` | 빠른 HMR, 경량 Rollup 기반 빌드 |
| **Framework** | React | `^19.0.0` | React 19 최신 기능 및 최적화된 렌더링 파이프라인 |
| **Language** | TypeScript | `^5.7.3` | `strict`, `noUncheckedIndexedAccess` 등 엄격한 타입 안정성 |
| **Architecture** | Feature-Sliced Design (FSD) | v2.1 spec | 도메인 분리 및 유지보수성, 대규모 확장에 최적화 |
| **Data Fetching** | Native Fetch + TanStack Query | `^5.66.0` | Axios 의존성 제거, AbortController 타임아웃, 스마트 캐싱 및 재시도 |
| **State Management** | Zustand | `^5.0.3` | 보일러플레이트 없는 가벼운 전역 상태 관리 (테마, UI 상태 등) |
| **Routing** | React Router | `^7.1.5` | Data Router API 기반 라우팅 및 중첩 레이아웃 |
| **Styling** | Tailwind CSS | `^4.0.6` | `@tailwindcss/vite` 기반의 초고속 CSS 컴파일 및 유틸리티 퍼스트 |

---

## 📁 Feature-Sliced Design (FSD) 디렉토리 구조

FSD는 상위 계층에서 하위 계층으로만 의존할 수 있는 **단방향 의존성 규칙**을 따릅니다.
(`app` ➔ `pages` ➔ `widgets` ➔ `features` ➔ `entities` ➔ `shared`)

```text
src/
├── app/                  # 앱 진입점, 글로벌 프로바이더, 라우터, 글로벌 스타일
│   ├── providers/        # QueryClientProvider, RouterProvider 등
│   ├── App.tsx           # 최상위 컴포넌트
│   └── index.css         # Tailwind v4 진입점
│
├── pages/                # 라우트 단위 화면 컴포넌트 (composition 위주)
│   ├── home/             # 홈 화면
│   ├── posts/            # 게시글 목록 화면
│   └── not-found/        # 404 화면
│
├── widgets/              # 여러 기능/엔티티를 조합한 독립적 UI 블록
│   ├── header/           # 글로벌 헤더 (내비게이션, 테마 토글 등)
│   ├── footer/           # 글로벌 푸터
│   ├── layout/           # RootLayout (Header + Outlet + Footer + ErrorBoundary)
│   └── post-feed/        # 게시글 검색 필터 + 카드 그리드를 결합한 위젯
│
├── features/             # 사용자 인터랙션 및 비즈니스 액션 단위
│   ├── post-search/      # 게시글 실시간 검색 인풋 기능
│   └── theme/            # Zustand 기반 다크/라이트 테마 제어
│
├── entities/             # 비즈니스 도메인 엔티티 (모델, 쿼리, 기본 UI)
│   └── post/             # 게시글 모델(Post), TanStack Query 훅(usePosts), PostCard UI
│
├── shared/               # 비즈니스 로직과 무관한 재사용 가능 인프라/UI
│   ├── api/              # Native fetch 기반 HTTP 클라이언트 (타임아웃, 에러 핸들링 지원)
│   ├── config/           # 환경변수(ENV) 설정
│   ├── lib/              # cn (clsx + tailwind-merge) 등 공통 유틸리티
│   └── ui/               # Button, Card, Input, Spinner, ErrorBoundary 등 기초 컴포넌트
│
├── main.tsx              # DOM 마운트 진입점
└── vite-env.d.ts         # Vite 환경 변수 타입 정의
```

---

## 🚀 빠른 시작 (Quick Start)

### 1. 패키지 설치
```bash
pnpm install
```

### 2. 로컬 개발 서버 실행
```bash
pnpm run dev
```
브라우저에서 `http://localhost:3000`으로 접속합니다.

### 3. 프로덕션 빌드 & 미리보기
```bash
pnpm run build
pnpm run preview
```

---

## 🛡️ 운영 안정성 설계 포인트

1. **Native Fetch Wrapper (`src/shared/api/client.ts`)**
   - 별도 Axios 라이브러리 없이 웹 표준 `fetch` 기반 구현으로 번들 크기 최소화.
   - `AbortController`를 활용한 15초 기본 타임아웃 처리.
   - 일관된 HTTP 에러 처리를 위한 커스텀 `ApiError` 클래스 제공.

2. **React Error Boundary (`src/shared/ui/error-boundary`)**
   - 런타임 렌더링 에러 발생 시 화이트 스크린 방지 및 Fallback UI / 새로고침 유도 제공.

3. **TanStack Query 안정성 옵션**
   - 불필요한 네트워크 트래픽을 방지하기 위한 캐시 타임(`staleTime: 1m`, `gcTime: 5m`) 및 자동 윈도우 포커스 리페치 비활성화.
   - 일시적 네트워크 순단에 대비한 1회 재시도(`retry: 1`) 정책.

4. **엄격한 TypeScript 컴파일 옵션**
   - `noUncheckedIndexedAccess: true`로 배열/객체 인덱스 접근 시 `undefined` 잠재 위험 방지.
   - `strict: true`, `noUnusedLocals: true`를 적용하여 코드 품질 유지.
