# mzc-lp Architecture Viewer

mzc-lp 플랫폼 아키텍처를 시각적으로 보여주는 인터랙티브 웹 애플리케이션입니다.

## 배포 URL

https://lms-architecture.vercel.app

## 기능

- **전체 구조**: B2C 코어 + 테넌트화를 통한 B2B/K-Pop 확장 구조 (Saas 기반 멀티테넌시)
- **모듈 구조**: UM, TS, SIS, IIS, CM, CR, LO, CMS 시스템 모듈
- **B2C (코어)**: 인프런/Udemy 스타일 오픈 마켓플레이스 (Course, Instructor, Payment, Discovery, Landing)
- **B2B 확장**: 기업용 LMS (Tenant, Branding, Organization, Analytics, License)
- **K-Pop 확장**: K-Pop 체험 아카데미 (Promotion, Camp, Subscription, Video Feedback, Booking, i18n)

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

http://localhost:5173 에서 확인할 수 있습니다.

## 빌드

```bash
npm run build
```

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (아이콘)

## 배포

Vercel을 통해 자동 배포됩니다.

```bash
npx vercel --prod
```
