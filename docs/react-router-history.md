# React Router의 패키지 변천사와 이번 보일러플레이트 평가

조사 기준일: 2026-10-31. 공식 문서·릴리스 기록과 로컬 설치 패키지를 대조했다. 아래는 전체 API 연대기가 아니라 `react-router-dom` 선택을 평가하는 데 필요한 변화다.

| 시기 | 변화 | 브라우저 앱의 패키지 선택에 주는 의미 |
| --- | --- | --- |
| v6, 2021-11-03 안정판 발표 | 컴포넌트 기반 라우팅을 개선했고 브라우저 공식 튜토리얼은 react-router-dom 설치·import를 사용 | 당시 예제를 따른 DOM 패키지 사용에는 명확한 근거가 있음 |
| v6.4 계열 | loader/action·RouterProvider 중심의 데이터 라우팅을 제공 | BrowserRouter 방식과 Data Router 방식이 존재하며, 현재 선택한 모드와 API를 구분해야 함 |
| v7, 2024-11-21 릴리스 기록 | Remix의 기능을 통합하고 react-router로 패키지를 정리, react-router-dom은 호환용 재수출로 유지 | 기존 import가 계속 동작해 패키지 재편을 놓쳐도 빌드가 통과할 수 있음 |
| v8, 2026-06-17 안정판 | react-router-dom 재수출 패키지 제거 | 일반 API는 react-router, RouterProvider·HydratedRouter 같은 DOM 전용 진입점은 react-router/dom 사용 |

v6 발표일은 [공식 발표](https://remix.run/blog/react-router-v6.4), 브라우저 설치 방식은 [v6 공식 튜토리얼](https://reactrouter.com/6.30.6/start/tutorial), v6.4의 데이터 API는 [공식 개요](https://reactrouter.com/6.30.6/start/overview)에서 확인했다. v7·v8 날짜와 패키지 재편은 [공식 변경 기록](https://reactrouter.com/changelog#v700), [v8 변경 기록](https://reactrouter.com/changelog#v800)을 따랐다. v7 소개 블로그는 2024-11-22로 표기되어 릴리스 기록과 하루 차이가 있으므로 날짜의 기준을 명시한다. [v7 소개](https://remix.run/blog/react-router-v7).

현재 지침은 [v8 이전 가이드의 react-router-dom 항목](https://reactrouter.com/upgrading/v7#react-router-dom)에 명시되어 있고, [현재 Declarative 설치 문서](https://reactrouter.com/start/declarative/installation)와 [Data 설치 문서](https://reactrouter.com/start/data/installation)에서도 모드별 사용법을 확인할 수 있다. 이것이 CSR 프로젝트를 Framework 모드로 바꾸거나 SSR을 채택해야 한다는 뜻은 아니다.

**로컬 결과물과의 대조**

| 프로젝트 | 의존성 선언 | 실제 설치 | 평가 |
| --- | --- | --- | --- |
| Antigravity | react-router-dom ^7.1.5 | 7.18.5 | 호환용 패키지로 v7에 머묾. 신규 선택의 근거·전환 계획이 없음 |
| Cursor | react-router ^8.5.1 | 8.5.1 | 이번 조사일의 현재 패키지 구조와 부합 |
| Codex | react-router-dom ^7.18.5 | 7.18.5 | 다른 도구가 최신이어도 Router는 호환용 진입점으로 시작. 선택 근거가 없음 |

Antigravity와 Codex에 설치된 `react-router-dom`의 package.json은 `react-router: 7.18.5`에 의존한다. `dist/index.mjs`는 react-router에서 API를 재수출하고 RouterProvider·HydratedRouter는 react-router/dom에서 가져온다. 즉 현재 설치에서는 존재하는 패키지이며 정상 동작도 확인했다. Cursor의 설치 패키지에 포함된 공식 `docs/upgrading/v7.md`에서도 제거와 import 변경 안내를 확인했다.

v7을 보수적으로 선택하는 것과 v7에서도 호환을 위해 남겨 둔 패키지를 새 코드의 기준으로 택하는 것은 별개의 결정이다. v8을 즉시 도입하지 않더라도 react-router 진입점을 검토할 수 있다. 이번 두 결과물에는 그 선택을 설명하는 근거가 없다.

**중요도의 판단**

이 선택은 즉시 발생하는 런타임 장애로 분류하지 않는다. 그러나 ‘최신 구성을 검토해 달라’는 신규 프로젝트 요구에서는 중요한 누락이다. 호환 경로가 작동한다는 사실을 현재 권장 구성이라는 근거로 사용할 수 없기 때문이다. 라우팅 사용처가 늘면 import뿐 아니라 팀의 참고 예제와 추가 라이브러리 선택까지 이전 패턴을 따를 수 있다.

v8 전환 시점에 옛 DOM 패키지와 새 Router를 혼용하면 버전·컨텍스트 불일치를 점검해야 할 수 있다. 이는 가능한 미래 시나리오다. 이번 두 프로젝트에서 v7/v8이 중복 설치되어 충돌하거나 보안 문제가 발생했다는 증거는 없다. 전환 비용도 현재는 작으며 전체 v8 업그레이드의 API·런타임 요구 사항은 별도 검증이 필요하다.

이번 분석의 첫 보고서는 패키지 차이를 표에만 기록하고 신규 프로젝트 선택의 의미를 충분히 평가하지 않았다. 사용자 지적 뒤 근거를 보완한 것으로, AI가 작성한 분석도 현재 문서와 대조해야 한다는 사례로 함께 기록한다. 학습 데이터의 시점 때문에 이 선택이 발생했다고 단정할 근거는 없으며, 실제로 관측한 것은 선택 결과와 설명의 부재다.
