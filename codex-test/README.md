# React CSR starter

Vite, React, TypeScript로 만든 클라이언트 렌더링 SPA입니다. React Router, TanStack Query와 Tailwind CSS를 포함합니다.

## 시작하기

Node.js 24 LTS와 pnpm 12를 사용합니다. `.nvmrc`는 Node.js 24.22.2를 지정합니다.

```sh
nvm install
nvm use
corepack enable
corepack prepare pnpm@12.6.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

- `pnpm build`: 타입 검사와 프로덕션 빌드
- `pnpm lint`: 정적 검사
- `pnpm preview`: 로컬에서 빌드 결과 미리보기 (운영 서버가 아님)

2026-10-31 기준 Node.js 26은 최신 LTS이나 LTS 전환 직후입니다. 이 프로젝트는 더 오래 운영된 Node.js 24 LTS를 기준으로 설정했습니다. React와 Vite는 별도의 Node식 LTS가 없으므로 지원 중인 안정 버전을 사용하고, `pnpm-lock.yaml`로 설치 결과를 고정합니다. 정기적으로 의존성 보안 업데이트와 Node 지원 일정을 확인하세요.

## 구조

```text
src/
  app/       앱 초기화, 라우팅, 전역 provider와 스타일
  pages/     라우트 단위 화면
  widgets/   여러 기능을 조합한 독립 UI 블록
  features/  사용자의 구체적인 동작과 기능
  entities/  도메인 엔티티와 관련 모델·UI
  shared/    도메인에 종속되지 않는 공통 코드
  main.tsx   브라우저 진입점
```

[FSD](https://feature-sliced.design/docs/get-started/overview)의 레이어 방향에 따라 상위 레이어는 하위 레이어를 참조합니다. `pages`, `widgets`, `features`, `entities`는 도메인별 slice를 만들고, slice 내부를 `ui`, `model`, `api` 등 용도별 segment로 나눕니다. 다른 slice에서는 공개 진입점(`index.ts`)을 통해 접근합니다. `app`과 `shared`는 예외적으로 slice 없이 segment를 둘 수 있습니다. 필요한 코드가 생길 때 구조를 확장하며, 현재 규칙을 자동으로 강제하는 도구는 포함되어 있지 않습니다.

## 배포

`dist/`를 정적 호스팅에 배포합니다. 브라우저 라우터를 사용하므로 서버에서 존재하지 않는 경로 요청을 `index.html`로 전달하도록 SPA fallback을 설정해야 새로고침이나 직접 URL 접근이 동작합니다. API 경로와 실제 정적 파일은 fallback보다 먼저 처리하세요. 배포 환경과 서브 경로 사용 여부에 맞춰 호스팅 설정과 Vite `base`를 조정하세요.

`VITE_` 접두사의 환경 변수는 브라우저 번들에 노출됩니다. 비밀 값은 넣지 마세요.
