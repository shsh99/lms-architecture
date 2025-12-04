# LMS Architecture Viewer

LMS(Learning Management System) 아키텍처를 시각적으로 보여주는 인터랙티브 웹 애플리케이션입니다.

## 배포 URL

https://lms-architecture.vercel.app

## 기능

- **Core Engine**: 모든 모드에서 공유하는 핵심 모듈 (Course, Curriculum, Enrollment, Content, Feedback, User)
- **B2B 확장**: 기업용 LMS 전용 모듈 (Tenant, Organization, Analytics)
- **B2C 확장**: 오픈 캠퍼스 전용 모듈 (Instructor, Payment, Discovery, Landing)
- **K-Pop 확장**: K-Pop 체험 아카데미 전용 모듈 (Promotion, Camp, Subscription, Video Feedback, Booking)

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
