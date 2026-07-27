# 코딩테스트 학습 기록 앱

React day4 팀프로젝트 실습: 코딩테스트 문제 풀이 기록 앱
문제를 추가, 조회, 수정, 삭제할 수 있고 제목 검색과 난이도/플랫폼 필터를 사용할 수 있다.

## 주요 기능

- 문제 풀이 기록 추가
- 문제 목록 조회
- 문제 수정 및 삭제
- 제목 검색
- 난이도 필터
- 플랫폼 필터
- 난이도별 통계 표시
- localStorage 저장

## 사용 기술

- React
- TypeScript
- CSS Module
- Vite

## 폴더 구조

```text
study-tracker-ts/
├── src/
│   ├── types/
│   │   └── index.tsx
│   ├── components/
│   │   ├── Header.tsx / Header.module.css
│   │   ├── ProblemForm.tsx / ProblemForm.module.css
│   │   ├── ProblemCard.tsx / ProblemCard.module.css
│   │   ├── FilterBar.tsx / FilterBar.module.css
│   │   └── ProblemList.tsx / ProblemList.module.css
│   ├── App.tsx
│   └── App.css
```

## 실행 방법

```bash
npm install
npm run dev
```
