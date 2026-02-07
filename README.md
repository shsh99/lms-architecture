# MZC LMS 시스템 아키텍처

MZC LMS의 시스템 아키텍처를 인터랙티브하게 시각화하는 문서입니다.
신규 개발자 온보딩, 인수인계, 아키텍처 리뷰에 활용합니다.

## 배포 URL

https://lms-architecture.vercel.app

## 아키텍처 뷰어 실행

```bash
npm install
npm run dev
```

http://localhost:5173 접속 후 각 탭을 탐색합니다.

## 빌드 & 배포

```bash
npm run build    # TypeScript 체크 + Vite 빌드
npx vercel --prod  # Vercel 배포
```

---

## 개요

| 항목 | 내용 |
|------|------|
| 프로젝트 | MZC LMS (Learning Management System) |
| 대상 사이트 | B2C (오픈 마켓플레이스), B2B (기업 LMS), K-Pop Academy |
| 아키텍처 | 단일 코드베이스 + Multi-Tenancy |
| 데이터 격리 | 단일 DB + Row-Level Security (tenant_id + Hibernate @Filter) |

## 기술 스택

### Backend
- Java 21, Spring Boot 3.4.12
- Spring Security + JWT (JJWT 0.12.6)
- JPA/Hibernate + MySQL 8
- Gradle 8.x

### Frontend
- React 19, TypeScript 5.6
- Vite 6, Zustand 5, TanStack Query 5
- Radix UI + Tailwind CSS 3.4

### Infrastructure
- AWS (VPC, ALB, EC2/ECS, RDS, S3, CloudFront)
- GitHub Actions → ECR → Deploy
- 환경: dev / staging / production

### 아키텍처 뷰어 (이 프로젝트)
- React 18, TypeScript, Vite 5, Tailwind CSS, Lucide React

---

## 시스템 구조

### 레이어 아키텍처
```
Client → CorsFilter → JwtAuthFilter → TenantFilter → Controller → Service → Repository → DB
```

### 주요 모듈
| 모듈 | 약칭 | 역할 |
|------|------|------|
| User Management | UM | 사용자, 역할, 인증 |
| Tenant System | TS | 멀티테넌트, 브랜딩 |
| Course Management | CM | 강의, 차시, 스냅샷 |
| Learning Object | LO | 학습 객체, 콘텐츠 |
| Content Repository | CR | 파일 저장, 미디어 |
| Student Information | SIS | 수강, 진도, 수료 |
| Instructor Information | IIS | 강사 배정, 이력 |
| Content Management | CMS | 배너, 공지, 카테고리 |

---

## 핵심 비즈니스 플로우

```
강의 생성 (DESIGNER) → 차수 생성 + Snapshot (OPERATOR) → 수강 신청 (USER) → 학습 진행 → 수료 + 인증서
```

### 1. 강의 생성
- DESIGNER가 Course 생성 (DRAFT)
- CourseItem 트리 구조 편집 + LearningObject/Content 연결
- 상태: DRAFT ↔ READY → REGISTERED (단방향, REGISTERED에서만 차수 생성 가능)

### 2. 차수 생성 (Snapshot Pattern)
- REGISTERED 강의에서 CourseTime 생성
- SnapshotService가 Course 구조 전체를 Deep Copy → CourseSnapshot
- 스냅샷은 생성 시점에 동결 (원본 수정해도 기존 차수에 영향 없음)
- 상태: DRAFT → RECRUITING → ONGOING → CLOSED → ARCHIVED

### 3. 수강 신청
- 방식: 선착순(FIRST_COME) / 승인제(APPROVAL) / 초대전용(INVITE_ONLY)
- Pessimistic Lock으로 정원 초과 Race Condition 방지
- 상태: PENDING → ENROLLED/REJECTED → COMPLETED/DROPPED/FAILED

### 4. 학습 진행
- ItemProgress가 SnapshotItem 기준으로 진행률 추적
- CompletionCriteria: BUTTON_CLICK / PERCENT_90 / PERCENT_100
- 전체 진행률 = (수료 항목 / 전체 항목) × 100

### 5. 수료 및 인증서
- 수료 처리 → EnrollmentCompletedEvent 발행 (Spring ApplicationEvent)
- @EventListener → CertificateService.issueCertificate()
- 인증서 PDF 자동 생성 + 고유 번호 부여

---

## 역할 체계 (RBAC)

### 역할 6계층
| 순위 | 역할 | 페이지 | 설명 |
|------|------|--------|------|
| 1 | SYSTEM_ADMIN | SA | 시스템 전체 관리, 테넌트 생성 |
| 2 | TENANT_ADMIN | TA | 테넌트 관리, 브랜딩, 통계 |
| 3 | OPERATOR | CO | 강의 검토, 차수/강사/수강 운영 |
| 4 | DESIGNER | - | 강의 설계/개설 (B2C: 셀프 부여) |
| 5 | INSTRUCTOR | - | 강사 자격, 차수에 배정 |
| 6 | USER | TU | 수강, 학습 |

### 권한 해석 4계층
```
Role → Authority (권한 그룹) → Privilege (동작) → Resource (대상)
```

### Privilege Scope
| Scope | 설명 | 대상 역할 |
|-------|------|-----------|
| ALL | 테넌트 내 전체 | OPERATOR |
| OWN | 본인 생성 데이터 | DESIGNER |
| ASSIGNED | 배정받은 데이터 | INSTRUCTOR |
| ENROLLED | 수강 중인 데이터 | USER |

---

## 인증

- JWT: Access Token 15분 / Refresh Token 7일
- 알고리즘: HMAC SHA-256 (JJWT 0.12.6)
- Refresh Token Rotation: 갱신 시 기존 토큰 즉시 폐기
- Frontend: Zustand persist (localStorage) + Axios interceptor 자동 갱신

### Security Filter Chain
```
CorsFilter → JwtAuthenticationFilter → TenantContextFilter → Controller → TenantContextCleanup
```

---

## 주요 아키텍처 결정 (ADR)

| ID | 결정 | 근거 |
|----|------|------|
| ADR-001 | 단일 DB + Row-Level Security | 초기 비용 최소화, 마이그레이션 1회 |
| ADR-002 | Snapshot 패턴 | 불변성 보장, 원본 자유 수정 |
| ADR-003 | Linked List 학습 순서 | 중간 삽입 O(1), 드래그앤드롭 최적화 |
| ADR-004 | 단일 코드베이스 | B2C 코어 90% 공유, 단일 배포 |
| ADR-005 | RBAC 6계층 + 해석 4계층 | 역할 분류 + 세밀한 권한 제어 |

---

## 동시성 제어

| 전략 | 사용처 | 방식 |
|------|--------|------|
| Pessimistic Lock | 수강 신청 정원 체크 | SELECT FOR UPDATE |
| Optimistic Lock | 강의 정보 수정 | @Version 필드 |
| Unique Index | 수강 중복 방지 | ACTIVE 상태만 유일성 |

---

## 관련 저장소

| 저장소 | 기술 스택 | 설명 |
|--------|-----------|------|
| mzc-lp (backend) | Spring Boot 3.4 / Java 21 | 백엔드 API 서버 |
| mzc-lp (frontend) | React 19 / Vite 6 | 프론트엔드 SPA |
| lms-architecture | React 18 / Vite 5 | 아키텍처 뷰어 (현재 프로젝트) |
