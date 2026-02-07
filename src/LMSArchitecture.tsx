import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, ChevronRight, Database, Building2, GraduationCap,
  BookOpen, UserCheck, User, Globe, CreditCard,
  Search, Tent, Video, Calendar, LucideIcon,
  Clock, FolderTree, Play, Upload, Settings, BarChart3, FileText,
  GitBranch, Lock, Key, Server, Filter, Zap, AlertCircle,
  Layers, Cloud, Network, Scale, Shield, GitPullRequest, ArrowRightLeft
} from 'lucide-react';

interface ModuleCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  color: string;
  isOpen: boolean;
  onToggle: () => void;
}

const ModuleCard = ({ title, icon: Icon, items, color, isOpen, onToggle }: ModuleCardProps) => (
  <div className={`rounded-lg border-2 ${color} overflow-hidden transition-all duration-200`}>
    <button
      onClick={onToggle}
      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="font-semibold">{title}</span>
      </div>
      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
    {isOpen && (
      <div className="px-4 pb-4 space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="pl-8 py-1 text-sm text-gray-600 border-l-2 border-gray-200 ml-2">
            {item}
          </div>
        ))}
      </div>
    )}
  </div>
);

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  color: string;
}

const SectionHeader = ({ title, subtitle, color }: SectionHeaderProps) => (
  <div className={`${color} rounded-lg p-4 mb-4`}>
    <h2 className="text-lg font-bold text-white">{title}</h2>
    <p className="text-sm text-white/80">{subtitle}</p>
  </div>
);

interface Module {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  items: string[];
  badge?: string;
}

// 드롭다운 컴포넌트
interface DropdownProps {
  label: string;
  color: string;
  items: { id: string; label: string; color: string }[];
  activeTab: string;
  onSelect: (id: string) => void;
}

const TabDropdown = ({ label, color, items, activeTab, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isActive = items.some(item => item.id === activeTab);
  const activeItem = items.find(item => item.id === activeTab);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`py-2 px-3 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
          isActive ? `${activeItem?.color || color} text-white` : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {isActive ? activeItem?.label : label}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[120px]">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => { onSelect(item.id); setIsOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 ${
                activeTab === item.id ? 'font-medium text-gray-900' : 'text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function LMSArchitecture() {
  const [activeTab, setActiveTab] = useState('guide');
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const toggleModule = (id: string) => {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 카테고리별 탭 그룹
  const tabCategories = {
    structure: {
      label: '구조',
      color: 'bg-gray-700',
      items: [
        { id: 'guide', label: '가이드', color: 'bg-gray-900' },
        { id: 'overview', label: '전체 구조', color: 'bg-gray-700' },
        { id: 'modules', label: '모듈 구조', color: 'bg-indigo-600' },
        { id: 'layer', label: '레이어', color: 'bg-slate-600' },
        { id: 'flow', label: '핵심 플로우', color: 'bg-lime-600' },
        { id: 'data', label: '데이터', color: 'bg-violet-600' },
      ]
    },
    tech: {
      label: '기술',
      color: 'bg-orange-600',
      items: [
        { id: 'transaction', label: '트랜잭션', color: 'bg-orange-600' },
        { id: 'rbac', label: 'RBAC', color: 'bg-rose-600' },
        { id: 'auth', label: '인증', color: 'bg-pink-600' },
        { id: 'api', label: 'API/에러', color: 'bg-cyan-600' },
        { id: 'infra', label: '인프라', color: 'bg-sky-600' },
        { id: 'dependencies', label: '의존성', color: 'bg-amber-600' },
      ]
    },
    sites: {
      label: '사이트',
      color: 'bg-emerald-600',
      items: [
        { id: 'b2c', label: 'B2C', color: 'bg-emerald-600' },
        { id: 'b2b', label: 'B2B', color: 'bg-blue-600' },
        { id: 'kpop', label: 'K-Pop', color: 'bg-purple-600' },
      ]
    },
    decisions: {
      label: '결정',
      color: 'bg-teal-600',
      items: [
        { id: 'adr', label: 'ADR', color: 'bg-teal-600' },
      ]
    }
  };

  // 시스템 모듈 구조 (실제 구현 기반)
  const systemModules: Module[] = [
    {
      id: 'user',
      title: 'User (사용자 관리)',
      icon: User,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[User] 사용자 기본 정보 (email, password)', '[UserRole] TenantRole 매핑', '[UserCourseRole] 강의별 역할 (OWNER, INSTRUCTOR)', '[UserGroup] 사용자 그룹 관리', '[RefreshToken] JWT 토큰 관리', 'TenantRole: TENANT_ADMIN, OPERATOR, DESIGNER, USER']
    },
    {
      id: 'ts',
      title: 'TS (Time Schedule)',
      icon: Clock,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[CourseTime] 차수 관리', 'TimeStatus: SCHEDULED → OPEN → IN_PROGRESS → COMPLETED', 'delivery_type: ONLINE, OFFLINE, BLENDED, LIVE', 'enrollment_method: FIRST_COME, APPROVAL, INVITE_ONLY', '[RecurringSchedule] 반복 일정 관리', '정원, 가격, 수료 기준 설정']
    },
    {
      id: 'student',
      title: 'Student (학습자 정보)',
      icon: UserCheck,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[Enrollment] 수강 기록', 'EnrollmentType: VOLUNTARY, MANDATORY', 'EnrollmentStatus: ACTIVE, WAITING, COMPLETED, CANCELLED', '[ItemProgress] 차시별 진도 관리', 'progressPercent (0-100), score', '수료 시점 기록 (completedAt)']
    },
    {
      id: 'iis',
      title: 'IIS (Instructor Information)',
      icon: GraduationCap,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[InstructorAssignment] 강사 배정', 'InstructorRole: MAIN, SUB, ASSISTANT', 'AssignmentStatus: ACTIVE, REPLACED, CANCELLED', '[AssignmentHistory] 강사 변경 이력', '강사 교체 시 자동 이력 기록']
    },
    {
      id: 'course',
      title: 'Course (강의 관리)',
      icon: FolderTree,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[Course] 강의 메타데이터', 'CourseStatus: DRAFT → PENDING → APPROVED', '[CourseItem] 차시/폴더 (계층형)', '[CourseRelation] 학습 순서 정의', '[CourseReview] 강의 리뷰/평점', '[CourseAnnouncement] 강의 공지사항']
    },
    {
      id: 'snapshot',
      title: 'Snapshot (개설 강의)',
      icon: FileText,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[CourseSnapshot] 템플릿 → 실제 강의 생성', 'SnapshotStatus: DRAFT, ACTIVE, COMPLETED, ARCHIVED', '[SnapshotItem] 차시/폴더 깊은 복사', '[SnapshotLearningObject] LO 복사', '[SnapshotRelation] 관계 복사', 'Content는 공유 참조 (불변성)']
    },
    {
      id: 'learning',
      title: 'Learning (학습 객체)',
      icon: Play,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[LearningObject] 학습 객체', 'Type: VIDEO, DOCUMENT, QUIZ, ASSIGNMENT', 'LIVE_SESSION, EXTERNAL_LINK, SCORM', '[ContentFolder] 컨텐츠 폴더 관리', 'Content 연결']
    },
    {
      id: 'content',
      title: 'Content (컨텐츠 관리)',
      icon: Upload,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[Content] 컨텐츠 파일 관리', 'ContentType: VIDEO, DOCUMENT, IMAGE, AUDIO', '[ContentVersion] 버전 관리', 'S3 업로드 → MediaConvert', 'ContentStatus: UPLOADING → PROCESSING → READY']
    },
    {
      id: 'assignment',
      title: 'Assignment (과제)',
      icon: FileText,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[Assignment] 과제 정의', '마감일, 배점, 제출 형식 설정', '[AssignmentSubmission] 과제 제출', '자동/수동 채점 지원', '제출 상태 관리']
    },
    {
      id: 'certificate',
      title: 'Certificate (수료증)',
      icon: FileText,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[Certificate] 수료증 발급', '[CertificateTemplate] 템플릿 관리', '수료 조건 충족 시 자동 발급', 'PDF 생성 및 다운로드']
    },
  ];

  // B2C 모듈 (실제 구현 기반)
  const b2cModules: Module[] = [
    {
      id: 'b2c-course',
      title: 'Course (강의 생성)',
      icon: BookOpen,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['USER가 직접 강의 생성 가능', '생성 시 자동으로 OWNER 역할 부여', '강의 등록 신청 → OPERATOR 검토/승인', '[CourseReview] 리뷰/평점 시스템']
    },
    {
      id: 'b2c-instructor',
      title: 'Instructor (강사 관리)',
      icon: GraduationCap,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['OWNER가 공동 강사 초대', 'OPERATOR가 차수에 강사 배정', 'CO 페이지: /co/instructor', '강사 프로필/포트폴리오']
    },
    {
      id: 'b2c-cart',
      title: 'Cart & Wishlist (장바구니)',
      icon: CreditCard,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['[CartItem] 장바구니 관리', '[WishlistItem] 찜 목록', '결제 전 강의 담기', 'TU 페이지: 마이페이지']
    },
    {
      id: 'b2c-category',
      title: 'Category (카테고리)',
      icon: Search,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['[Category] 강의 카테고리', '계층형 카테고리 지원', '카테고리별 검색/필터', 'TU 페이지: 강의 탐색']
    },
    {
      id: 'b2c-community',
      title: 'Community (커뮤니티)',
      icon: User,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['[CommunityPost] 게시글', '[CommunityComment] 댓글', '[CommunityPostLike] 좋아요', '[CommunityCommentLike] 댓글 좋아요']
    },
    {
      id: 'b2c-roadmap',
      title: 'Roadmap (학습 로드맵)',
      icon: FolderTree,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['[Roadmap] 학습 경로 정의', '[RoadmapProgram] 포함 강의 관리', '순차적 학습 가이드', '커리어 경로별 추천']
    },
    {
      id: 'b2c-banner',
      title: 'Banner (배너)',
      icon: Globe,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['[Banner] 메인 배너 관리', '노출 기간 설정', '링크 연결', 'TA 페이지: features']
    },
  ];

  // B2B 모듈 (실제 구현 기반)
  const b2bModules: Module[] = [
    {
      id: 'b2b-tenant',
      title: 'Tenant (테넌트)',
      icon: Database,
      color: 'border-blue-300 bg-blue-50',
      items: ['[Tenant] 테넌트 정보 관리', '[TenantSettings] 테넌트별 설정', '[TenantCategory] 테넌트별 카테고리', '[NavigationItem] 메뉴 구성', '서브도메인 매핑', 'Row-Level Security 적용']
    },
    {
      id: 'b2b-branding',
      title: 'Branding (브랜딩)',
      icon: Settings,
      color: 'border-blue-300 bg-blue-50',
      items: ['로고/파비콘 커스터마이징', '색상 테마 (primaryColor, secondaryColor)', '텍스트 라벨 변경', 'TA 페이지: /ta/branding']
    },
    {
      id: 'b2b-org',
      title: 'Organization (조직)',
      icon: Building2,
      color: 'border-blue-300 bg-blue-50',
      items: ['[Department] 부서 관리 (계층형)', '[Employee] 직원 정보 연동', '조직도 기반 사용자 관리', 'SSO 연동 (OKTA, Azure AD)']
    },
    {
      id: 'b2b-memberpool',
      title: 'MemberPool (대상자 그룹)',
      icon: User,
      color: 'border-blue-300 bg-blue-50',
      items: ['[MemberPool] 교육 대상자 그룹 정의', '[MemberPoolCondition] 조건 기반 자동 선정', '부서/직급/입사년차 조건', 'CO 페이지: /co/member-pool']
    },
    {
      id: 'b2b-enrollment',
      title: 'AutoEnrollment (자동 수강)',
      icon: UserCheck,
      color: 'border-blue-300 bg-blue-50',
      items: ['[AutoEnrollmentRule] 자동 수강 규칙', 'MemberPool 연동 필수 수강', '입사 시 자동 등록', 'CO 페이지: /co/auto-enrollment']
    },
    {
      id: 'b2b-analytics',
      title: 'Analytics (분석)',
      icon: BarChart3,
      color: 'border-blue-300 bg-blue-50',
      items: ['[ActivityLog] 학습 활동 로그', '전사/부서별 수료율 대시보드', '의무교육 이수현황 리포트', 'TA 페이지: /ta/analytics']
    },
    {
      id: 'b2b-notice',
      title: 'Notice (공지)',
      icon: FileText,
      color: 'border-blue-300 bg-blue-50',
      items: ['[TenantNotice] 테넌트별 공지사항', '[Notice] 일반 공지', '[NoticeDistribution] 대상자 지정', 'CO/TA 페이지: notices']
    },
    {
      id: 'b2b-notification',
      title: 'Notification (알림)',
      icon: AlertCircle,
      color: 'border-blue-300 bg-blue-50',
      items: ['[Notification] 알림 발송', '[NotificationTemplate] 알림 템플릿', '이메일/SMS/푸시 알림', '수강 독려, 마감 알림']
    },
  ];

  // K-Pop 모듈 (architecture.md 기반)
  const kpopModules: Module[] = [
    {
      id: 'kpop-promo',
      title: 'Promotion Site (홍보)',
      icon: Globe,
      color: 'border-purple-300 bg-purple-50',
      items: ['캠프 소개 (다국어)', '프로그램 안내', '신청서 폼', '캠프비 결제'],
      badge: '별도 앱'
    },
    {
      id: 'kpop-camp',
      title: 'Camp (캠프 운영)',
      icon: Tent,
      color: 'border-purple-300 bg-purple-50',
      items: ['2~3주 연수 일정표/스케줄', '팀 편성 (5인 1조)', '트레이너 배정', '실시간 사진/영상 업로드']
    },
    {
      id: 'kpop-subscription',
      title: 'Subscription (구독)',
      icon: CreditCard,
      color: 'border-purple-300 bg-purple-50',
      items: ['플랜 관리 (횟수권/연회비)', '피드백 크레딧 시스템', '갱신/해지 관리']
    },
    {
      id: 'kpop-videofb',
      title: 'Video Feedback (영상 피드백)',
      icon: Video,
      color: 'border-purple-300 bg-purple-50',
      items: ['학생 영상 업로드 (귀국 후)', '강사 타임스탬프 코멘트', '피드백 히스토리']
    },
    {
      id: 'kpop-booking',
      title: 'Booking (예약)',
      icon: Calendar,
      color: 'border-purple-300 bg-purple-50',
      items: ['강사 스케줄 관리', '레슨 예약', '춤/노래 연습실 예약', '알림 시스템'],
      badge: '입시반용'
    },
  ];

  // 역할 정보 (실제 구현 기반)
  const roleInfo = {
    b2c: [
      { role: 'TENANT_ADMIN', desc: '전체 관리 (TA 페이지 접근)' },
      { role: 'OPERATOR', desc: '강의 검토/승인, 차수 생성, 강사 배정 (CO 페이지)' },
      { role: 'DESIGNER', desc: '(Tenant) 강의 설계/개설 신청 (셀프 부여)' },
      { role: 'INSTRUCTOR', desc: '(Tenant) 강사 자격 보유' },
      { role: 'USER', desc: '수강 ("강의 개설하기" → DESIGNER 셀프 부여)' },
      { role: 'CourseRole.DESIGNER', desc: '(강의별) 강의 소유자, 수익 분배 70%' },
      { role: 'CourseRole.INSTRUCTOR', desc: '(강의별) 차수에 배정된 강사' },
    ],
    b2b: [
      { role: 'TENANT_ADMIN', desc: 'TA 페이지: 브랜딩, 통계, 사용자 관리' },
      { role: 'OPERATOR', desc: 'CO 페이지: 운영 + 역할 부여/회수' },
      { role: 'DESIGNER', desc: '(Tenant) 강의 설계 (OPERATOR가 부여)' },
      { role: 'INSTRUCTOR', desc: '(Tenant) 강사 자격 (OPERATOR가 부여)' },
      { role: 'USER', desc: 'TU 페이지: 학습 (역할 부여 전까지 강의 개설 불가)' },
      { role: 'CourseRole.DESIGNER', desc: '(강의별) 강의 소유/설계자' },
      { role: 'CourseRole.INSTRUCTOR', desc: '(강의별) 배정된 강사' },
    ],
    kpop: [
      { role: 'TENANT_ADMIN', desc: '전체 관리' },
      { role: 'OPERATOR', desc: '프로그램/스케줄/시설/강의 관리' },
      { role: 'USER', desc: '학생 (스케줄 조회, 시설 예약, 수강)' },
    ],
  };

  // 레이어 아키텍처 데이터
  const layerArchitecture = {
    layers: [
      { name: 'Client (Browser/App)', color: 'bg-gray-800 text-white', desc: 'HTTP 요청 발신' },
      { name: 'Filter (TenantFilter, JwtAuth)', color: 'bg-amber-100 text-amber-700', desc: '인증/인가, 테넌트 식별' },
      { name: 'Controller', color: 'bg-green-100 text-green-700', desc: '요청/응답 매핑, Validation, DTO 변환' },
      { name: 'Service', color: 'bg-blue-100 text-blue-700', desc: '비즈니스 로직, 트랜잭션 관리' },
      { name: 'Repository', color: 'bg-purple-100 text-purple-700', desc: '데이터 접근, JPA/QueryDSL' },
      { name: 'Database (MySQL)', color: 'bg-gray-700 text-white', desc: '데이터 영속화' },
    ],
    crossCutting: [
      { name: 'Security', desc: 'JWT 인증, RBAC 권한 체크, TenantFilter' },
      { name: 'Logging', desc: 'MDC (traceId, tenantId), 요청/응답 로깅' },
      { name: 'Transaction', desc: '@Transactional, 비관적/낙관적 락' },
      { name: 'Exception', desc: 'GlobalExceptionHandler, BusinessException' },
    ],
    packageStructure: [
      { path: 'com.mzc.lp.domain.{module}', children: [
        'controller/ - REST API 엔드포인트',
        'service/ - 비즈니스 로직',
        'repository/ - 데이터 접근 (JPA)',
        'entity/ - JPA 엔티티',
        'dto/ - 요청/응답 DTO',
        'exception/ - 모듈별 예외',
      ]},
      { path: 'com.mzc.lp.global', children: [
        'config/ - 설정 (Security, JPA, S3 등)',
        'common/ - 공통 응답, BaseEntity',
        'exception/ - 전역 예외 처리',
        'filter/ - TenantFilter, JWT Filter',
        'util/ - 유틸리티',
      ]},
    ],
    layerRules: [
      { rule: 'Controller → Service만 호출 (Repository 직접 접근 금지)', type: 'must' },
      { rule: 'Service → Repository 호출 (다른 Service 호출 가능)', type: 'must' },
      { rule: 'Repository → Entity만 다룸 (비즈니스 로직 금지)', type: 'must' },
      { rule: 'DTO는 Controller ↔ Service 경계에서 변환', type: 'must' },
      { rule: 'Entity는 Service 밖으로 노출 금지', type: 'warn' },
    ],
  };

  // 인프라 아키텍처 데이터
  const infraArchitecture = {
    region: 'ap-northeast-2 (Seoul)',
    components: {
      public: [
        { name: 'Internet Gateway', desc: '외부 트래픽 진입점' },
        { name: 'ALB (Application Load Balancer)', desc: '로드 밸런싱, HTTPS 종단' },
        { name: 'Bastion Server', desc: '운영 접근용 점프 서버' },
        { name: 'NAT Gateway', desc: 'Private → 외부 통신' },
      ],
      private: [
        { name: 'API Server (ECS/EC2)', desc: 'Spring Boot 앱 (ECR에서 pull)' },
        { name: 'MySQL (RDS)', desc: '멀티 AZ, 자동 백업' },
      ],
      optional: [
        { name: 'CloudFront', desc: 'CDN (정적 자산 캐싱)' },
        { name: 'S3', desc: '파일 스토리지 (컨텐츠, 이미지)' },
      ],
    },
    cicd: [
      { step: 'GitHub Push', desc: '코드 푸시 / PR 머지' },
      { step: 'GitHub Actions', desc: '빌드, 테스트, Docker 이미지 생성' },
      { step: 'ECR Push', desc: 'Docker 이미지 레지스트리 업로드' },
      { step: 'Deploy', desc: 'ECS 서비스 업데이트 / Rolling 배포' },
    ],
    environments: [
      { name: 'dev', desc: '개발 환경 (자동 배포)', color: 'bg-green-100 text-green-700' },
      { name: 'staging', desc: '스테이징 (QA 테스트)', color: 'bg-amber-100 text-amber-700' },
      { name: 'prod', desc: '프로덕션 (수동 승인)', color: 'bg-red-100 text-red-700' },
    ],
  };

  // 모듈 의존성 데이터
  const moduleDependencies = {
    dependencies: [
      { from: 'Course', to: 'Content', type: 'sync', desc: 'CourseItem → LearningObject → Content' },
      { from: 'Course', to: 'Learning', type: 'sync', desc: 'CourseItem이 LearningObject 참조' },
      { from: 'Snapshot', to: 'Course', type: 'sync', desc: '깊은 복사 (CourseItem → SnapshotItem)' },
      { from: 'TS', to: 'Snapshot', type: 'sync', desc: '차수 생성 시 스냅샷 자동 생성' },
      { from: 'Student', to: 'TS', type: 'sync', desc: 'Enrollment → CourseTime 참조' },
      { from: 'Student', to: 'Snapshot', type: 'sync', desc: 'ItemProgress → SnapshotItem 참조' },
      { from: 'IIS', to: 'TS', type: 'sync', desc: 'InstructorAssignment → CourseTime 참조' },
      { from: 'IIS', to: 'User', type: 'sync', desc: '강사 = User (INSTRUCTOR 역할)' },
      { from: 'Student', to: 'User', type: 'sync', desc: '수강자 = User' },
      { from: 'Assignment', to: 'Course', type: 'sync', desc: '과제 → 강의 차시에 연결' },
      { from: 'Certificate', to: 'Student', type: 'sync', desc: '수료 조건 충족 시 발급' },
    ],
    dbRelationships: [
      { entity: 'CourseItem', fk: 'course_id → Course', note: 'CASCADE DELETE' },
      { entity: 'CourseRelation', fk: 'course_id → Course', note: 'CASCADE DELETE' },
      { entity: 'SnapshotItem', fk: 'snapshot_id → CourseSnapshot', note: 'CASCADE DELETE' },
      { entity: 'Enrollment', fk: 'course_time_id → CourseTime', note: '삭제 차단' },
      { entity: 'ItemProgress', fk: 'enrollment_id → Enrollment', note: 'CASCADE DELETE' },
      { entity: 'InstructorAssignment', fk: 'course_time_id → CourseTime', note: 'SET NULL 가능' },
    ],
    communicationNote: '현재 모든 모듈 간 통신은 동기(Sync) 방식입니다. 단일 프로세스(모놀리스) 내 서비스 메서드 호출. 향후 이벤트 기반 비동기 처리 고려 대상: 알림 발송, 수료증 생성, 통계 집계.',
  };

  // ADR (Architecture Decision Records) 데이터
  const adrDecisions = [
    {
      id: 'ADR-001',
      title: '단일 DB + Row-Level Security',
      status: 'Accepted',
      context: '멀티테넌트 데이터 격리 전략 선택',
      decision: '단일 DB에 tenant_id 컬럼 + Hibernate Filter로 자동 필터링',
      alternatives: [
        { name: 'Schema-per-Tenant', pros: '완전한 격리', cons: '스키마 관리 복잡, 마이그레이션 N회' },
        { name: 'DB-per-Tenant', pros: '물리적 격리', cons: '비용 N배, 운영 복잡도 극대화' },
      ],
      rationale: ['초기 비용 최소화 (단일 DB)', '운영 단순성 (마이그레이션 1회)', 'Hibernate Filter로 개발 편의성 확보', '필요 시 Schema-per-Tenant로 마이그레이션 가능'],
      consequences: ['모든 Entity에 tenant_id 필수', 'INDEX에 tenant_id 포함 필요', '대규모 테넌트 시 파티셔닝 고려'],
    },
    {
      id: 'ADR-002',
      title: 'Snapshot 패턴 (강의 개설)',
      status: 'Accepted',
      context: '차수(CourseTime) 생성 시 강의 구조를 어떻게 고정할 것인가',
      decision: 'Course → CourseSnapshot으로 깊은 복사 (Snapshot 패턴)',
      alternatives: [
        { name: '직접 참조', pros: '구현 단순', cons: '원본 수정 시 진행 중 차수 영향' },
        { name: '버전 관리', pros: '이력 추적', cons: '복잡한 버전 관리 로직' },
      ],
      rationale: ['불변성 보장 (진행 중 강의 구조 변경 불가)', '감사 추적 (어떤 구조로 수강했는지 기록)', '원본 강의 자유롭게 수정 가능', 'Content는 공유 참조 (불변이므로 복사 불필요)'],
      consequences: ['스냅샷 생성 시 데이터 증가', '원본-스냅샷 간 동기화 불가 (의도된 설계)'],
    },
    {
      id: 'ADR-003',
      title: 'Linked List 학습 순서 (CourseRelation)',
      status: 'Accepted',
      context: '차시(CourseItem) 간 학습 순서를 어떻게 정의할 것인가',
      decision: 'CourseRelation (prev_item_id → next_item_id) 연결 리스트',
      alternatives: [
        { name: 'Array Index (sort_order)', pros: '구현 단순, 조회 빠름', cons: '중간 삽입 시 N개 업데이트' },
        { name: 'Gap 방식 (order: 100, 200...)', pros: '중간 삽입 용이', cons: 'Gap 소진 시 재정렬' },
      ],
      rationale: ['중간 삽입/삭제 시 O(1) (연결만 변경)', '드래그&드롭 순서 변경에 최적', '복사(스냅샷) 시 관계도 함께 복사'],
      consequences: ['전체 순서 조회 시 순회 필요', '순환 참조 방지 로직 필수 (CIRCULAR_RELATION 에러)'],
    },
    {
      id: 'ADR-004',
      title: 'B2C/B2B/K-Pop 단일 코드베이스',
      status: 'Accepted',
      context: '3개 사이트를 별도 프로젝트로 분리할 것인가, 하나로 유지할 것인가',
      decision: '단일 코드베이스 + 테넌트 추상화로 사이트별 분기',
      alternatives: [
        { name: '별도 프로젝트', pros: '독립 배포, 기술 스택 자유', cons: '코어 로직 중복, 유지보수 3배' },
        { name: 'Mono-repo + 공통 라이브러리', pros: '코드 공유 가능', cons: '빌드 복잡성, 버전 관리' },
      ],
      rationale: ['B2C 코어 로직 90% 공유', '테넌트별 설정으로 기능 ON/OFF', '단일 배포 파이프라인으로 운영 단순화', 'K-Pop 전용 모듈만 추가 확장'],
      consequences: ['테넌트별 분기 코드 발생 (Feature Flag 필요)', '특정 사이트 독립 배포 불가'],
    },
    {
      id: 'ADR-005',
      title: '역할 6계층 + 권한 해석 4계층 RBAC',
      status: 'Accepted',
      context: '권한 체계의 세밀도를 어떻게 설정할 것인가',
      decision: '역할 6단계 (SYSTEM_ADMIN → USER) + 권한 해석 4계층 (Role → Authority → Privilege → Resource) + TenantRole/CourseRole 분리',
      alternatives: [
        { name: '단순 Role-Based', pros: '구현 단순', cons: '세밀한 제어 불가, 역할 폭발' },
        { name: 'ABAC (Attribute-Based)', pros: '매우 유연', cons: '과도하게 복잡, 디버깅 어려움' },
      ],
      rationale: ['6개 역할로 사용자 분류 체계 확립', '권한 해석 4계층으로 세밀한 동작 제어', '테넌트 레벨 + 강의 레벨 역할 분리 필요', 'Scope (ALL/OWN/ASSIGNED/ENROLLED)로 데이터 접근 범위 제어'],
      consequences: ['권한 체크 로직 복잡도 증가', 'DB 테이블 추가 (Role, Authority, Privilege, RoleAuthority 등)', '캐싱 전략 필요 (매 요청마다 DB 조회 방지)'],
    },
  ];

  // 인증 흐름 데이터 (실제 구현 기반)
  const authArchitecture = {
    jwt: {
      accessExpiration: '15분 (900,000ms)',
      refreshExpiration: '7일 (604,800,000ms)',
      algorithm: 'HMAC SHA-256 (JJWT 라이브러리)',
      claims: ['subject (userId)', 'email', 'roles (Set, 1:N)', 'currentRole', 'tenantId', 'issuedAt', 'expiration'],
    },
    tokenStorage: {
      backend: 'Refresh Token → DB 저장 (refresh_tokens 테이블), Access Token → Stateless (서버 미저장)',
      frontend: 'localStorage (Zustand persist) → auth-storage 키',
      transmission: 'Authorization: Bearer {token} 헤더',
    },
    loginFlow: [
      { step: 'Client', desc: 'POST /api/auth/login (email, password)' },
      { step: 'AuthService', desc: '이메일 조회 + BCrypt 비밀번호 검증' },
      { step: 'AuthService', desc: '사용자 상태 체크 (WITHDRAWN/SUSPENDED 거부)' },
      { step: 'JwtProvider', desc: 'AccessToken + RefreshToken 생성' },
      { step: 'DB', desc: 'RefreshToken 저장 + lastLoginAt 업데이트' },
      { step: 'Client', desc: 'TokenResponse (accessToken, refreshToken, expiresIn)' },
    ],
    refreshFlow: [
      { step: 'Client', desc: 'POST /api/auth/refresh (refreshToken)' },
      { step: 'AuthService', desc: 'JWT 서명 검증 + DB에서 revoked 아닌 토큰 조회' },
      { step: 'AuthService', desc: '기존 RefreshToken revoked=true 처리' },
      { step: 'JwtProvider', desc: '새 AccessToken + 새 RefreshToken 생성' },
      { step: 'DB', desc: '새 RefreshToken 저장' },
      { step: 'Client', desc: '새 TokenResponse 반환' },
    ],
    filterChain: [
      { name: 'CorsFilter', desc: '허용된 Origin 체크' },
      { name: 'JwtAuthenticationFilter', desc: 'Bearer 토큰 추출 → 검증 → UserPrincipal 설정' },
      { name: 'TenantFilter', desc: 'TenantContext에 tenantId 설정 (ThreadLocal)' },
      { name: 'Controller', desc: '비즈니스 로직 처리' },
      { name: 'TenantContextCleanup', desc: 'ThreadLocal 정리' },
    ],
    cors: {
      origins: '환경변수 (CORS_ALLOWED_ORIGINS, 기본 localhost:3000)',
      methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      credentials: 'true (쿠키/인증 헤더 허용)',
      maxAge: '3600초 (1시간 캐시)',
    },
    publicEndpoints: ['/api/auth/**', '/uploads/**', '/actuator/health', '/swagger-ui/**', 'GET /api/courses/**', 'GET /api/tenant/settings/**', 'GET /api/community/**', 'GET /api/banners/public/**'],
  };

  // 데이터 아키텍처 (실제 Entity 기반)
  const dataArchitecture = {
    baseEntities: [
      { name: 'BaseEntity', fields: 'id (Long, auto-increment)', desc: '모든 엔티티 공통' },
      { name: 'BaseTimeEntity', fields: '+ createdAt, updatedAt (Instant)', desc: '감사 필드 (Spring Data Auditing)' },
      { name: 'TenantEntity', fields: '+ tenantId (Long)', desc: 'Hibernate @Filter 자동 적용, @PrePersist로 tenantId 자동 세팅' },
    ],
    entities: [
      { name: 'Tenant', table: 'tenants', extends: 'BaseTimeEntity', keys: 'code, name, type(B2C/B2B/KPOP), status, subdomain, customDomain, plan', unique: 'code, subdomain', fk: '없음' },
      { name: 'User', table: 'users', extends: 'TenantEntity', keys: 'email, password(BCrypt), name, role, status, lastLoginAt', unique: '(tenant_id, email)', fk: '→ UserRole (1:N, CASCADE ALL)' },
      { name: 'UserRole', table: 'user_roles', extends: '-', keys: 'role(TenantRole)', unique: '(user_id, role)', fk: '→ User (ManyToOne)' },
      { name: 'Course', table: 'cm_courses', extends: 'TenantEntity', keys: 'title, description, level, type, status(DRAFT→READY→REGISTERED), @Version', unique: '-', fk: '→ CourseItem (1:N, CASCADE ALL)' },
      { name: 'CourseItem', table: 'cm_course_items', extends: 'TenantEntity', keys: 'itemName, depth(max 9), learningObjectId', unique: '-', fk: '→ Course, → parent(self, tree)' },
      { name: 'CourseTime', table: 'course_times', extends: 'TenantEntity', keys: 'title, deliveryType, status, enrollDates, classDates, capacity, price, @Version', unique: '-', fk: '→ Course, → CourseSnapshot (1:1)' },
      { name: 'CourseSnapshot', table: 'cm_snapshots', extends: 'TenantEntity', keys: 'snapshotName, status, version, @Version', unique: '-', fk: '→ Course(source), → SnapshotItem/Relation (1:N, CASCADE ALL)' },
      { name: 'SnapshotItem', table: 'cm_snapshot_items', extends: 'TenantEntity', keys: 'itemName, depth, sourceItemId, @Version', unique: '-', fk: '→ Snapshot, → parent(self, tree), → SnapshotLO' },
      { name: 'Enrollment', table: 'sis_enrollments', extends: 'TenantEntity', keys: 'userId, courseTimeId, type, status, progressPercent, score, @Version', unique: '(tenant_id, user_id, course_time_id)', fk: 'ID 참조 (직접 FK 없음)' },
      { name: 'ItemProgress', table: 'sis_item_progress', extends: 'TenantEntity', keys: 'enrollmentId, itemId, progressPercent, watchedSeconds, lastPositionSeconds', unique: '(tenant_id, enrollment_id, item_id)', fk: 'ID 참조 (직접 FK 없음)' },
      { name: 'Content', table: 'content', extends: 'TenantEntity', keys: 'contentType(VIDEO/DOCUMENT/IMAGE/AUDIO), status, fileSize, duration, @Version', unique: '-', fk: '없음' },
      { name: 'LearningObject', table: 'learning_object', extends: 'TenantEntity', keys: 'name, completionCriteria(BUTTON/90%/100%), @Version', unique: '-', fk: '→ Content, → ContentFolder' },
      { name: 'InstructorAssignment', table: 'iis_instructor_assignments', extends: 'TenantEntity', keys: 'userKey, timeKey, role(MAIN/SUB/ASSISTANT), status, @Version', unique: '(tenant_id, time_key, user_key, status)', fk: 'ID 참조 (직접 FK 없음)' },
    ],
    indexStrategy: [
      { table: 'cm_course_items', indexes: 'course_id, parent_id, learning_object_id' },
      { table: 'course_times', indexes: '(tenant_id, status), (tenant_id, course_id), (tenant_id, snapshot_id)' },
      { table: 'cm_snapshots', indexes: 'tenant_id, status, created_by, source_course_id' },
      { table: 'sis_enrollments', indexes: '(tenant_id, user_id), (tenant_id, course_time_id), (tenant_id, status)' },
      { table: 'sis_item_progress', indexes: '(tenant_id, enrollment_id), (tenant_id, item_id)' },
      { table: 'content', indexes: 'tenant_id, content_type, (tenant_id, status), (tenant_id, created_by)' },
      { table: 'iis_instructor_assignments', indexes: 'tenant_id, user_key, time_key, status, role' },
    ],
    optimisticLock: ['Course', 'CourseTime', 'CourseSnapshot', 'SnapshotItem', 'SnapshotLearningObject', 'SnapshotRelation', 'Content', 'LearningObject', 'ContentFolder', 'Enrollment', 'InstructorAssignment'],
    cascadePolicy: [
      { parent: 'User → UserRole', policy: 'CASCADE ALL, ORPHAN_REMOVAL' },
      { parent: 'Course → CourseItem', policy: 'CASCADE ALL, ORPHAN_REMOVAL' },
      { parent: 'CourseItem → Children', policy: 'CASCADE ALL, ORPHAN_REMOVAL (self-ref tree)' },
      { parent: 'CourseSnapshot → SnapshotItem', policy: 'CASCADE ALL, ORPHAN_REMOVAL' },
      { parent: 'CourseSnapshot → SnapshotRelation', policy: 'CASCADE ALL, ORPHAN_REMOVAL' },
      { parent: 'ContentFolder → Children', policy: 'CASCADE ALL, ORPHAN_REMOVAL (tree)' },
    ],
  };

  // 핵심 플로우 시퀀스 데이터
  const coreFlows = [
    {
      id: 'course-creation',
      title: '1. 강의 생성',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      actors: 'DESIGNER (B2C: 셀프 부여 / B2B: OPERATOR가 부여)',
      trigger: '강의 개설하기 버튼 클릭',
      steps: [
        { action: 'POST /api/courses', detail: 'Course 생성 (DRAFT 상태)', entity: 'Course' },
        { action: 'CourseItem 구조 편집', detail: '폴더/항목 트리 구성 (max depth 9)', entity: 'CourseItem' },
        { action: 'LearningObject 연결', detail: 'Content(영상/문서/이미지) 매핑 + 수료기준 설정', entity: 'LearningObject → Content' },
        { action: 'POST /courses/{id}/ready', detail: 'DRAFT → READY (작성 완료)', entity: 'Course.status' },
        { action: 'POST /courses/{id}/register', detail: 'READY → REGISTERED (되돌릴 수 없음)', entity: 'Course.status' },
      ],
      stateMachine: 'DRAFT ↔ READY → REGISTERED (단방향)',
      keyRule: 'REGISTERED 상태에서만 차수(CourseTime) 생성 가능'
    },
    {
      id: 'coursetime-creation',
      title: '2. 차수 생성 (Snapshot)',
      color: 'bg-orange-600',
      lightColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      actors: 'OPERATOR 또는 DESIGNER',
      trigger: 'REGISTERED 강의에서 "차수 생성" 클릭',
      steps: [
        { action: 'POST /api/times', detail: 'CourseTime 생성 (날짜/정원/가격/방식 설정)', entity: 'CourseTime' },
        { action: 'SnapshotService.createSnapshotFromCourse()', detail: 'Course 구조 전체 Deep Copy', entity: 'CourseSnapshot' },
        { action: 'CourseItem → SnapshotItem 복제', detail: '트리 구조 + LO + Relation 전부 복사', entity: 'SnapshotItem, SnapshotLO, SnapshotRelation' },
        { action: 'CourseTime ↔ Snapshot 연결', detail: '1:1 관계로 바인딩', entity: 'CourseTime.snapshotId' },
        { action: '상태 자동 결정', detail: 'enrollStartDate ≤ 오늘 → RECRUITING / 아니면 DRAFT', entity: 'CourseTime.status' },
      ],
      stateMachine: 'DRAFT → RECRUITING → ONGOING → CLOSED → ARCHIVED',
      keyRule: 'Snapshot은 생성 시점에 동결 — 원본 Course 수정해도 기존 차수에 영향 없음'
    },
    {
      id: 'enrollment',
      title: '3. 수강 신청',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      actors: 'USER (학습자)',
      trigger: '차수 상세 페이지에서 "수강 신청" 클릭',
      steps: [
        { action: 'POST /api/times/{id}/enrollments', detail: '수강 신청 요청', entity: 'HTTP Request' },
        { action: 'Pessimistic Lock 획득', detail: 'courseTime SELECT ... FOR UPDATE', entity: 'CourseTime (Lock)' },
        { action: '검증: 상태/중복/정원', detail: 'RECRUITING 확인, 중복 신청 방지, 잔여석 확인', entity: 'Validation' },
        { action: 'Enrollment 생성', detail: '선착순→ENROLLED / 승인제→PENDING / 초대→거부', entity: 'Enrollment' },
        { action: 'currentEnrollment++', detail: '정원 카운터 원자적 증가', entity: 'CourseTime.currentEnrollment' },
      ],
      stateMachine: 'PENDING → ENROLLED/REJECTED | ENROLLED → COMPLETED/DROPPED/FAILED',
      keyRule: 'Pessimistic Lock으로 동시 수강신청 Race Condition 방지'
    },
    {
      id: 'learning',
      title: '4. 학습 진행',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      actors: 'USER (학습자)',
      trigger: '학습 페이지에서 콘텐츠 시청/학습',
      steps: [
        { action: 'GET /enrollments/{id}/items/progress', detail: '전체 학습 항목별 진행률 조회', entity: 'ItemProgress[]' },
        { action: 'PATCH /enrollments/{id}/items/{itemId}/progress', detail: '진행률/시청시간/마지막위치 업데이트', entity: 'ItemProgress' },
        { action: 'CompletionCriteria 평가', detail: 'BUTTON_CLICK / PERCENT_90 / PERCENT_100', entity: 'LearningObject.completionCriteria' },
        { action: 'POST /.../items/{itemId}/complete', detail: '항목 수료 처리 (completed=true, 100%)', entity: 'ItemProgress.completed' },
        { action: 'Enrollment 전체 진행률 재계산', detail: '(수료 항목 수 / 전체 항목 수) × 100', entity: 'Enrollment.progressPercent' },
      ],
      stateMachine: '항목별: 진행중(0~99%) → 수료(100%)',
      keyRule: 'ItemProgress는 SnapshotItem 기준 — 원본 CourseItem이 아닌 동결된 스냅샷 항목 추적'
    },
    {
      id: 'completion',
      title: '5. 수료 및 인증서',
      color: 'bg-rose-600',
      lightColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-700',
      actors: 'System (자동) 또는 OPERATOR (수동)',
      trigger: '전체 진행률 기준 충족 또는 관리자 수동 처리',
      steps: [
        { action: 'PATCH /enrollments/{id}/complete', detail: '수료 처리 + 점수 기록', entity: 'Enrollment.status → COMPLETED' },
        { action: 'EnrollmentCompletedEvent 발행', detail: 'Spring ApplicationEvent 비동기 발행', entity: 'Event' },
        { action: '@EventListener 수신', detail: 'CertificateService.issueCertificate()', entity: 'Certificate' },
        { action: '인증서 PDF 생성', detail: '고유 인증서 번호 + PDF 생성', entity: 'Certificate (number, issuedAt)' },
        { action: 'GET /certificates/{id}/download', detail: '수료증 PDF 다운로드', entity: 'PDF Response' },
      ],
      stateMachine: 'ENROLLED → COMPLETED → Certificate ISSUED',
      keyRule: 'Event-Driven: 수료 이벤트 발행 → 인증서 자동 발급 (관심사 분리)'
    },
  ];

  // 프론트엔드 페이지 구조 (실제 구현)
  const pageStructure = {
    sa: {
      title: 'SA (System Admin)',
      desc: '시스템 전체 관리',
      color: 'bg-gray-800',
      pages: ['테넌트 생성/관리', '시스템 설정', '전체 통계']
    },
    ta: {
      title: 'TA (Tenant Admin)',
      desc: 'TENANT_ADMIN 전용',
      color: 'bg-blue-600',
      pages: ['analytics - 학습 분석', 'automation - 자동화 규칙', 'branding - 브랜딩 설정', 'dashboard - 대시보드', 'features - 배너/기능 관리', 'notices - 공지사항', 'settings - 테넌트 설정', 'system - 시스템 설정', 'users - 사용자 관리']
    },
    co: {
      title: 'CO (Course Operations)',
      desc: 'OPERATOR 전용',
      color: 'bg-orange-600',
      pages: ['dashboard - 운영 대시보드', 'course - 강의 검토/승인', 'time - 차수 관리', 'enrollment - 수강 관리', 'instructor - 강사 배정', 'auto-enrollment - 자동 수강 규칙', 'member-pool - 대상자 그룹', 'notices - 강의 공지', 'user - 사용자 역할 관리']
    },
    tu: {
      title: 'TU (Tenant User)',
      desc: '일반 사용자',
      color: 'bg-emerald-600',
      pages: ['강의 탐색/검색', '수강 신청', '학습 진행', '마이페이지', '수료증 확인']
    }
  };

  const renderGuide = () => (
    <>
      <SectionHeader
        title="아키텍처 가이드"
        subtitle="MZC LMS 시스템을 이해하기 위한 안내서"
        color="bg-gray-900"
      />

      {/* 이 문서는 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          이 문서는
        </h3>
        <p className="text-sm text-gray-600">
          MZC LMS의 시스템 아키텍처를 한눈에 파악하기 위한 인터랙티브 문서입니다.
          신규 개발자 온보딩, 인수인계, 아키텍처 리뷰에 활용할 수 있습니다.
        </p>
      </div>

      {/* 읽는 순서 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">읽는 순서 (목적별)</h3>
        <div className="space-y-3 text-xs">
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <div className="font-medium text-blue-700 mb-1">처음 접하는 경우</div>
            <div className="text-blue-600">가이드 → 전체 구조 → 핵심 플로우 → 레이어</div>
          </div>
          <div className="bg-purple-50 p-3 rounded border border-purple-200">
            <div className="font-medium text-purple-700 mb-1">역할/권한 이해</div>
            <div className="text-purple-600">RBAC → 인증 → B2C / B2B 사이트별 차이</div>
          </div>
          <div className="bg-orange-50 p-3 rounded border border-orange-200">
            <div className="font-medium text-orange-700 mb-1">기술 상세</div>
            <div className="text-orange-600">트랜잭션 → 데이터 → 의존성 → 인프라</div>
          </div>
          <div className="bg-teal-50 p-3 rounded border border-teal-200">
            <div className="font-medium text-teal-700 mb-1">왜 이렇게 결정했나</div>
            <div className="text-teal-600">ADR (Architecture Decision Records)</div>
          </div>
        </div>
      </div>

      {/* 탭 요약 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">탭 목록</h3>
        <div className="space-y-1 text-xs">
          {[
            { tab: '전체 구조', desc: '플랫폼 개요, 모듈 관계, 기술 스택' },
            { tab: '모듈 구조', desc: '8개 시스템 모듈 (UM, CM, SIS, IIS 등) 상세' },
            { tab: '레이어', desc: 'Controller → Service → Repository 계층 구조' },
            { tab: '핵심 플로우', desc: '강의 생성 → 차수 → 수강 → 학습 → 수료 End-to-End' },
            { tab: '데이터', desc: 'Entity 계층, 테이블, 인덱스, Cascade 정책' },
            { tab: '트랜잭션', desc: '원자성 경계, Lock 전략, 마스터/서브 관계' },
            { tab: 'RBAC', desc: '역할 6계층, 권한 해석 4계층, Privilege Scope' },
            { tab: '인증', desc: 'JWT, Refresh Token Rotation, Security Filter Chain' },
            { tab: 'API/에러', desc: 'REST 설계 원칙, 에러 코드 체계' },
            { tab: '인프라', desc: 'AWS 구성, CI/CD, 환경 분리' },
            { tab: '의존성', desc: 'Service 간 의존 관계, 모듈 분류' },
            { tab: 'B2C / B2B / K-Pop', desc: '사이트별 역할 구조와 특화 기능' },
            { tab: 'ADR', desc: '5개 주요 아키텍처 결정 기록' },
          ].map((item, i) => (
            <div key={i} className="flex gap-2 py-1 border-b border-gray-100 last:border-0">
              <span className="font-medium text-gray-700 min-w-[80px]">{item.tab}</span>
              <span className="text-gray-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 개념 5가지 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">핵심 개념 5가지</h3>
        <div className="space-y-2 text-xs">
          {[
            { concept: 'Multi-Tenancy', desc: '단일 DB + tenant_id Row-Level Security. 하나의 코드베이스로 B2C/B2B/K-Pop 3개 사이트 운영.' },
            { concept: 'Snapshot Pattern', desc: '차수 생성 시 강의 구조를 Deep Copy하여 동결. 진행 중 학습에 영향 없이 원본 수정 가능.' },
            { concept: 'RBAC 6계층', desc: 'SYSTEM_ADMIN → TENANT_ADMIN → OPERATOR → DESIGNER → INSTRUCTOR → USER. TenantRole + CourseRole 이원화.' },
            { concept: 'JWT + Refresh Rotation', desc: 'Access 15분 / Refresh 7일. 갱신 시 기존 토큰 즉시 폐기하여 탈취 방지.' },
            { concept: 'Event-Driven', desc: '수료 이벤트 → 인증서 자동 발급. Spring ApplicationEvent 기반 관심사 분리.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-2 rounded">
              <span className="font-medium text-gray-700">{item.concept}: </span>
              <span className="text-gray-600">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderOverview = () => (
    <>
      <SectionHeader
        title="MZC LMS Platform 아키텍처"
        subtitle="B2C 코어 + 테넌트화를 통한 B2B/K-Pop 확장"
        color="bg-gray-700"
      />

      {/* 플랫폼 관계도 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">플랫폼 관계</h3>
        <div className="flex flex-col items-center">
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium text-center">
            B2C (메인 러닝 플랫폼)<br/>
            <span className="text-sm opacity-80">핵심 코어 시스템</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded">테넌트화 (브랜딩 + 커스터마이징)</div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex gap-3">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded text-sm text-center">
              B2B (기업용)<br/>
              <span className="text-xs opacity-70">삼성, LG 등</span>
            </div>
            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded text-sm text-center">
              K-Pop (특화)<br/>
              <span className="text-xs opacity-70">외국인 단기 연수</span>
            </div>
          </div>
        </div>
      </div>

      {/* Request Flow */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Server className="w-4 h-4" />
          Request Flow (요청 처리 흐름)
        </h3>
        <div className="text-xs space-y-2">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="bg-gray-800 text-white px-2 py-1 rounded">Client</span>
            <span>→</span>
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">TenantFilter</span>
            <span>→</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">JwtAuth</span>
            <span>→</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Controller</span>
            <span>→</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Repository</span>
          </div>
          <div className="bg-gray-50 p-2 rounded text-gray-600 space-y-1">
            <div><strong>TenantFilter:</strong> tenant_id 추출 → TenantContext 설정</div>
            <div><strong>Repository:</strong> @TenantFilter → 자동 tenant_id 필터링</div>
          </div>
        </div>
      </div>

      {/* 데이터 분리 전략 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">데이터 분리 전략</h3>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gray-500" />
            <span className="font-medium">단일 DB + Row-Level Security</span>
          </div>
          <div className="pl-6 text-gray-600 space-y-1">
            <div>• 모든 Entity에 <code className="bg-gray-100 px-1 rounded">tenant_id</code> 필드</div>
            <div>• Hibernate Filter로 자동 필터링</div>
            <div>• TenantContext에서 현재 테넌트 관리</div>
          </div>
        </div>
      </div>

      {/* 사이트별 URL */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">사이트별 URL</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center p-2 bg-emerald-50 rounded">
            <span className="text-emerald-700">B2C</span>
            <code className="text-xs bg-white px-2 py-1 rounded">learn.com</code>
          </div>
          <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
            <span className="text-blue-700">B2B</span>
            <code className="text-xs bg-white px-2 py-1 rounded">*.learn.com</code>
          </div>
          <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
            <span className="text-purple-700">K-Pop</span>
            <code className="text-xs bg-white px-2 py-1 rounded">kpop.com</code>
          </div>
        </div>
      </div>

      {/* 프론트엔드 페이지 구조 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">프론트엔드 페이지 구조</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(pageStructure).map(([key, info]) => (
            <div key={key} className={`${info.color} text-white p-3 rounded`}>
              <div className="font-medium mb-1">{info.title}</div>
              <div className="text-white/80 text-[10px]">{info.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 기술 스택 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">기술 스택</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <div className="font-medium text-green-700 mb-2">Backend</div>
            <div className="space-y-1 text-gray-600">
              <div>Java 21 + Spring Boot 3.4</div>
              <div>Spring Security + JJWT 0.12</div>
              <div>Spring Data JPA + Hibernate</div>
              <div>MySQL + HikariCP</div>
              <div>Gradle 8.14</div>
              <div>Springdoc OpenAPI 2.7</div>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <div className="font-medium text-blue-700 mb-2">Frontend</div>
            <div className="space-y-1 text-gray-600">
              <div>React 19 + TypeScript 5.6</div>
              <div>Vite 6 + Tailwind CSS 3.4</div>
              <div>Zustand 5 (상태 관리)</div>
              <div>TanStack Query 5 + Table 8</div>
              <div>Radix UI (컴포넌트)</div>
              <div>React Router 7 + Axios 1.7</div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <div className="font-medium text-amber-700 mb-2">인프라</div>
            <div className="space-y-1 text-gray-600">
              <div>AWS (ap-northeast-2)</div>
              <div>EC2/ECS + ALB + RDS (MySQL)</div>
              <div>S3 + CloudFront (CDN)</div>
              <div>GitHub Actions (CI/CD)</div>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded border border-purple-200">
            <div className="font-medium text-purple-700 mb-2">테스트 & 품질</div>
            <div className="space-y-1 text-gray-600">
              <div>JUnit 5 + JaCoCo 0.8</div>
              <div>Vitest 4 + Testing Library</div>
              <div>SonarQube (정적 분석)</div>
              <div>ESLint 9 + TypeScript strict</div>
            </div>
          </div>
        </div>
      </div>

      {/* LMS 개념 */}
      <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
        <h3 className="font-semibold text-teal-700 mb-2">LMS (Learning Management System) 개념</h3>
        <p className="text-sm text-teal-600 mb-3">
          이 플랫폼 전체가 LMS입니다. 학습 관리의 모든 영역을 포괄합니다.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <div className="font-medium text-teal-700">콘텐츠</div>
            <div className="text-gray-500">Content, Learning</div>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <div className="font-medium text-teal-700">강의 운영</div>
            <div className="text-gray-500">Course, TS, IIS</div>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <div className="font-medium text-teal-700">학습 관리</div>
            <div className="text-gray-500">Student (수강/진도/수료)</div>
          </div>
        </div>
      </div>
    </>
  );

  const renderModules = () => (
    <>
      <SectionHeader
        title="시스템 모듈 구조"
        subtitle="UM, TS, SIS, IIS, CM, CR, LO, CMS"
        color="bg-indigo-600"
      />

      {/* 모듈 간 데이터 흐름 요약 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">모듈 간 데이터 흐름</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Content/LO</span>
            <span>→</span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Course(CM)</span>
            <span>→</span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">CourseTime</span>
            <span>→</span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Enrollment(SIS)</span>
          </div>
          <div className="text-gray-400">상세 흐름은 "핵심 플로우" 탭 참조</div>
        </div>
      </div>

      {/* Operator 권한 (CO 페이지) */}
      <div className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-200">
        <h3 className="font-semibold text-indigo-700 mb-2">Operator 권한 (CO 페이지)</h3>
        <div className="text-xs text-indigo-600 space-y-1">
          <div className="flex justify-between"><span>강의 검토/승인</span><span className="text-indigo-400">/co/course</span></div>
          <div className="flex justify-between"><span>차수 생성/수정/삭제</span><span className="text-indigo-400">/co/time</span></div>
          <div className="flex justify-between"><span>강사 배정/변경</span><span className="text-indigo-400">/co/instructor</span></div>
          <div className="flex justify-between"><span>수강 관리</span><span className="text-indigo-400">/co/enrollment</span></div>
          <div className="flex justify-between"><span>자동 수강 규칙</span><span className="text-indigo-400">/co/auto-enrollment</span></div>
          <div className="flex justify-between"><span>대상자 그룹 관리</span><span className="text-indigo-400">/co/member-pool</span></div>
          <div className="flex justify-between"><span>사용자 역할 관리</span><span className="text-indigo-400">/co/user</span></div>
        </div>
      </div>

      <div className="grid gap-3">
        {systemModules.map(m => (
          <ModuleCard key={m.id} {...m} isOpen={openModules[m.id]} onToggle={() => toggleModule(m.id)} />
        ))}
      </div>
    </>
  );

  const renderB2C = () => (
    <>
      <SectionHeader
        title="B2C (코어 플랫폼)"
        subtitle="인프런/Udemy 스타일 오픈 마켓플레이스"
        color="bg-emerald-600"
      />

      {/* 역할 구조 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">역할 구조</h3>
        <div className="space-y-2">
          {roleInfo.b2c.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium min-w-[100px]">
                {r.role}
              </span>
              <span className="text-gray-600">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 특징 */}
      <div className="bg-emerald-50 rounded-lg p-4 mb-4 border border-emerald-200">
        <h3 className="font-semibold text-emerald-700 mb-2">핵심 특징</h3>
        <ul className="text-sm text-emerald-600 space-y-1">
          <li>• USER가 "강의 개설하기" → DESIGNER 셀프 부여 → 강의 생성</li>
          <li>• OPERATOR가 강의 검토/승인, 차수 생성, 강사 배정</li>
          <li>• 개인 결제 + 수익 분배 (기본 70%)</li>
        </ul>
      </div>

      <div className="grid gap-3">
        {b2cModules.map(m => (
          <ModuleCard key={m.id} {...m} isOpen={openModules[m.id]} onToggle={() => toggleModule(m.id)} />
        ))}
      </div>
    </>
  );

  const renderB2B = () => (
    <>
      <SectionHeader
        title="B2B Extensions"
        subtitle="기업용 LMS - B2C 테넌트화 + 브랜딩"
        color="bg-blue-600"
      />

      {/* 역할 구조 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">역할 구조</h3>
        <div className="space-y-2">
          {roleInfo.b2b.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium min-w-[120px]">
                {r.role}
              </span>
              <span className="text-gray-600">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 특징 */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
        <h3 className="font-semibold text-blue-700 mb-2">핵심 특징</h3>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• 화이트라벨 (로고, 색상, 도메인 커스터마이징)</li>
          <li>• 조직 구조 관리 + SSO 연동</li>
          <li>• 외부강사 풀 관리 및 배정</li>
          <li>• 오프라인 강의 (강의실, 출석체크)</li>
          <li>• B2C 강의 라이선스 연동 가능</li>
          <li>• 기업 계약 결제 (연간 라이선스)</li>
        </ul>
      </div>

      <div className="grid gap-3">
        {b2bModules.map(m => (
          <ModuleCard key={m.id} {...m} isOpen={openModules[m.id]} onToggle={() => toggleModule(m.id)} />
        ))}
      </div>
    </>
  );

  const renderKpop = () => (
    <>
      <SectionHeader
        title="K-Pop Academy Extensions"
        subtitle="K-Pop 체험 아카데미 - 외국인 단기 연수"
        color="bg-purple-600"
      />

      {/* 역할 구조 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">역할 구조</h3>
        <div className="space-y-2">
          {roleInfo.kpop.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium min-w-[100px]">
                {r.role}
              </span>
              <span className="text-gray-600">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 특징 */}
      <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
        <h3 className="font-semibold text-purple-700 mb-2">핵심 특징</h3>
        <ul className="text-sm text-purple-600 space-y-1">
          <li>• 2~3주 연수 스케줄 + 팀 편성</li>
          <li>• 연습실 예약 시스템</li>
          <li>• 귀국 후 영상 업로드 → 강사 피드백</li>
          <li>• 구독 서비스 (피드백 크레딧)</li>
        </ul>
      </div>

      <div className="grid gap-3">
        {kpopModules.map(m => (
          <div key={m.id} className="relative">
            {m.badge && (
              <span className="absolute -top-2 right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full z-10">
                {m.badge}
              </span>
            )}
            <ModuleCard {...m} isOpen={openModules[m.id]} onToggle={() => toggleModule(m.id)} />
          </div>
        ))}
      </div>
    </>
  );

  const renderTransaction = () => (
    <>
      <SectionHeader
        title="트랜잭션 바운더리"
        subtitle="작업 단위의 원자성 경계 정의"
        color="bg-orange-600"
      />

      {/* 트랜잭션 원칙 */}
      <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-200">
        <h3 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
          <GitBranch className="w-4 h-4" />
          트랜잭션 설계 원칙
        </h3>
        <ul className="text-sm text-orange-600 space-y-1">
          <li>• 한 정보가 바뀌면 연관된 데이터도 함께 변경</li>
          <li>• 모두 성공 or 모두 롤백 (원자성)</li>
          <li>• 비즈니스 요구사항에 따라 범위 결정</li>
        </ul>
      </div>

      {/* 주요 트랜잭션 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">주요 트랜잭션 단위</h3>
        <div className="space-y-3 text-sm">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">1. 강의 생성</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: Course + CourseItem + CourseRelation</div>
              <div className="text-orange-600">→ 하나라도 실패 시 전체 롤백</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">2. 차수 생성</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: CourseTime + CourseSnapshot + SnapshotItem</div>
              <div className="text-orange-600">→ 스냅샷 생성까지 원자적으로</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">3. 수강 신청</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: Enrollment + 정원 체크 + (결제)</div>
              <div className="text-orange-600">→ 결제 실패 시 수강 등록 롤백</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">4. 강사 배정</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: InstructorAssignment + AssignmentHistory</div>
              <div className="text-orange-600">→ 교체 시 이력 기록 포함</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">5. 강의 삭제</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: Course + Items + Relations (CASCADE)</div>
              <div className="text-red-600">⚠ Enrollment 있으면 삭제 불가</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lock 전략 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          동시성 제어 전략
        </h3>
        <div className="space-y-2 text-xs">
          {[
            { name: 'Pessimistic Lock', desc: 'SELECT FOR UPDATE 행 잠금', usage: '수강 신청 정원 체크', when: '충돌 가능성 높음' },
            { name: 'Optimistic Lock', desc: '@Version 필드 충돌 감지', usage: '강의 정보 수정', when: '충돌 가능성 낮음' },
            { name: 'Unique Index', desc: 'DB 레벨 유일성 보장', usage: 'ACTIVE 상태 수강 중복 방지', when: '데이터 정합성 필수' },
          ].map((lock) => (
            <div key={lock.name} className="bg-gray-50 p-2 rounded flex items-start gap-3">
              <span className="font-medium text-gray-700 min-w-[110px]">{lock.name}</span>
              <div className="text-gray-600">
                {lock.desc} — <span className="text-orange-600">{lock.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 마스터/서브 관계 + 데이터 흐름 원칙 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">마스터/서브 관계 & 흐름 원칙</h3>
        <div className="space-y-1 text-xs text-gray-600 mb-3">
          <div>Content → LearningObject → CourseItem → <span className="font-medium">Course</span> (CASCADE)</div>
          <div>Course → <span className="font-medium">CourseTime</span> → CourseSnapshot (1:1)</div>
          <div>CourseTime → InstructorAssignment / Enrollment → ItemProgress</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-green-50 p-2 rounded text-green-700">마스터 → 서브 방향으로만 수정</div>
          <div className="bg-red-50 p-2 rounded text-red-700">양방향 수정 금지 (Deadlock)</div>
        </div>
      </div>
    </>
  );

  const renderRBAC = () => (
    <>
      <SectionHeader
        title="RBAC 권한 체계"
        subtitle="역할 6계층 + 권한 해석 4계층 구조"
        color="bg-rose-600"
      />

      {/* 역할 6계층 */}
      <div className="bg-rose-50 rounded-lg p-4 mb-4 border border-rose-200">
        <h3 className="font-semibold text-rose-700 mb-3 flex items-center gap-2">
          <Key className="w-4 h-4" />
          역할 6계층 (Role Hierarchy)
        </h3>
        <div className="text-xs text-rose-600 mb-3">사용자에게 부여되는 역할의 상하 관계. 상위 역할이 하위 역할의 권한을 포함하지는 않음 (각 역할은 독립적 권한 세트).</div>
        <div className="flex flex-col items-center gap-1 text-sm">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center w-full max-w-xs">
            <div className="font-medium">1. SYSTEM_ADMIN</div>
            <div className="text-xs text-gray-300">시스템 전체 관리 (SA 페이지)</div>
          </div>
          <div className="text-rose-400 text-xs">▼</div>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center w-full max-w-xs">
            <div className="font-medium">2. TENANT_ADMIN</div>
            <div className="text-xs text-blue-200">테넌트 관리 (TA 페이지)</div>
          </div>
          <div className="text-rose-400 text-xs">▼</div>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center w-full max-w-xs">
            <div className="font-medium">3. OPERATOR</div>
            <div className="text-xs text-orange-100">강의 검토/승인, 차수/강사/수강 운영 (CO 페이지)</div>
          </div>
          <div className="text-rose-400 text-xs">▼</div>
          <div className="bg-purple-500 text-white px-4 py-2 rounded-lg text-center w-full max-w-xs">
            <div className="font-medium">4. DESIGNER</div>
            <div className="text-xs text-purple-200">강의 설계/개설 신청</div>
          </div>
          <div className="text-rose-400 text-xs">▼</div>
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-center w-full max-w-xs">
            <div className="font-medium">5. INSTRUCTOR</div>
            <div className="text-xs text-emerald-200">강사 자격, 차수에 배정</div>
          </div>
          <div className="text-rose-400 text-xs">▼</div>
          <div className="bg-gray-500 text-white px-4 py-2 rounded-lg text-center w-full max-w-xs">
            <div className="font-medium">6. USER</div>
            <div className="text-xs text-gray-300">수강, 학습 (TU 페이지)</div>
          </div>
        </div>
      </div>

      {/* 권한 해석 4계층 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          권한 해석 4계층 (Permission Resolution Chain)
        </h3>
        <div className="text-xs text-gray-500 mb-3">역할(Role)이 실제 동작(Privilege)으로 해석되는 과정. 요청마다 이 체인을 통해 권한을 확인합니다.</div>
        <div className="space-y-2 text-sm">
          <div className="bg-rose-50 p-3 rounded border border-rose-200">
            <div className="font-medium text-rose-700">1. Role (역할)</div>
            <div className="text-gray-600 pl-3">사용자에게 부여된 역할</div>
            <div className="text-xs text-gray-400 pl-3">예: OPERATOR, DESIGNER, USER</div>
          </div>
          <div className="flex justify-center">
            <span className="text-rose-400">▼ (1:N)</span>
          </div>
          <div className="bg-rose-50 p-3 rounded border border-rose-200">
            <div className="font-medium text-rose-700">2. Authority (권한 그룹)</div>
            <div className="text-gray-600 pl-3">Role에 묶인 권한 그룹</div>
            <div className="text-xs text-gray-400 pl-3">예: COURSE_MANAGE, USER_MANAGE, ENROLLMENT_MANAGE</div>
          </div>
          <div className="flex justify-center">
            <span className="text-rose-400">▼ (1:N)</span>
          </div>
          <div className="bg-rose-50 p-3 rounded border border-rose-200">
            <div className="font-medium text-rose-700">3. Privilege (동작)</div>
            <div className="text-gray-600 pl-3">실제 수행 가능한 동작</div>
            <div className="text-xs text-gray-400 pl-3">예: course:create, course:approve, instructor:assign</div>
          </div>
          <div className="flex justify-center">
            <span className="text-rose-400">▼ (적용 대상)</span>
          </div>
          <div className="bg-rose-50 p-3 rounded border border-rose-200">
            <div className="font-medium text-rose-700">4. Resource (리소스)</div>
            <div className="text-gray-600 pl-3">권한이 적용되는 대상 데이터</div>
            <div className="text-xs text-gray-400 pl-3">예: 특정 강의, 특정 테넌트, 배정된 차수</div>
          </div>
        </div>
      </div>

      {/* 두 체계의 관계 */}
      <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-200">
        <h3 className="font-semibold text-amber-700 mb-2">6계층 vs 4계층: 무엇이 다른가?</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-rose-700 mb-1">역할 6계층</div>
            <div className="text-gray-600">"누구인가" (사용자 분류)</div>
            <div className="text-gray-400 mt-1">SYSTEM_ADMIN ~ USER</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-rose-700 mb-1">권한 해석 4계층</div>
            <div className="text-gray-600">"무엇을 할 수 있는가" (권한 해석)</div>
            <div className="text-gray-400 mt-1">Role → Authority → Privilege → Resource</div>
          </div>
        </div>
        <div className="text-xs text-amber-600 mt-2">
          예: OPERATOR(역할 6계층 3단계) → COURSE_MANAGE(Authority) → course:approve(Privilege) → 특정 강의(Resource)
        </div>
      </div>

      {/* TenantRole vs CourseRole */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">역할 구분: TenantRole vs CourseRole</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-50 p-3 rounded border border-blue-200">
            <div className="font-medium text-blue-700 mb-2">TenantRole (테넌트 레벨)</div>
            <div className="space-y-1 text-blue-600">
              <div>• SYSTEM_ADMIN - 시스템 전체</div>
              <div>• TENANT_ADMIN - 테넌트 관리</div>
              <div>• OPERATOR - 운영</div>
              <div>• DESIGNER - 강의 설계</div>
              <div>• INSTRUCTOR - 강사</div>
              <div>• USER - 일반 사용자</div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <div className="font-medium text-amber-700 mb-2">CourseRole (강의별)</div>
            <div className="space-y-1 text-amber-600">
              <div>• DESIGNER - 강의 소유/설계자</div>
              <div>• INSTRUCTOR - 배정된 강사</div>
              <div className="text-xs text-gray-400 mt-2">※ UserCourseRole 테이블</div>
              <div className="text-xs text-gray-400">※ courseId로 강의 특정</div>
            </div>
          </div>
        </div>
      </div>

      {/* DESIGNER / INSTRUCTOR 역할 상세 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">역할 상세: DESIGNER & INSTRUCTOR</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-purple-50 p-3 rounded border border-purple-200">
            <div className="font-medium text-purple-700 mb-2">DESIGNER</div>
            <div className="text-purple-600 space-y-1">
              <div><span className="font-medium">Tenant:</span> 강의 개설 권한</div>
              <div>• B2C: 셀프 부여 / B2B: OPERATOR 부여</div>
              <div><span className="font-medium">Course:</span> 강의 소유자</div>
              <div>• 커리큘럼/콘텐츠 관리, 수익 분배 70%</div>
            </div>
          </div>
          <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
            <div className="font-medium text-emerald-700 mb-2">INSTRUCTOR</div>
            <div className="text-emerald-600 space-y-1">
              <div><span className="font-medium">Tenant:</span> 강사 자격 (배정 대상)</div>
              <div>• B2B: OPERATOR가 부여</div>
              <div><span className="font-medium">Course:</span> 배정된 강의 진행</div>
              <div>• Role: MAIN / SUB / ASSISTANT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Privilege 범위 (Scope) */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Privilege 범위 (Scope)</h3>
        <div className="text-sm text-gray-600 mb-3">
          동일한 Privilege라도 <span className="font-medium">범위(scope)</span>에 따라 접근 가능한 데이터가 달라집니다.
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-rose-50 p-2 rounded border border-rose-200">
            <div className="font-medium text-rose-700">ALL</div>
            <div className="text-gray-600">테넌트 내 모든 데이터</div>
            <div className="text-gray-400 mt-1">예: OPERATOR</div>
          </div>
          <div className="bg-amber-50 p-2 rounded border border-amber-200">
            <div className="font-medium text-amber-700">OWN</div>
            <div className="text-gray-600">본인이 생성한 데이터</div>
            <div className="text-gray-400 mt-1">예: DESIGNER의 강의</div>
          </div>
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <div className="font-medium text-blue-700">ASSIGNED</div>
            <div className="text-gray-600">배정받은 데이터</div>
            <div className="text-gray-400 mt-1">예: INSTRUCTOR 차수</div>
          </div>
          <div className="bg-green-50 p-2 rounded border border-green-200">
            <div className="font-medium text-green-700">ENROLLED</div>
            <div className="text-gray-600">수강 중인 데이터</div>
            <div className="text-gray-400 mt-1">예: USER 진도</div>
          </div>
        </div>
      </div>

      {/* 권한 매핑 테이블 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">권한 매핑 (TenantRole + CourseRole)</h3>
        <div className="overflow-x-auto text-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-2 py-1.5 text-left font-medium text-gray-700">역할</th>
                <th className="border border-gray-200 px-2 py-1.5 text-left font-medium text-gray-700">주요 Privileges</th>
                <th className="border border-gray-200 px-2 py-1.5 text-left font-medium text-gray-700">Scope</th>
              </tr>
            </thead>
            <tbody>
              {[
                { role: 'SYSTEM_ADMIN', privileges: '*:*:*', scope: '전체 시스템', color: 'bg-gray-800 text-white' },
                { role: 'TENANT_ADMIN', privileges: '*:*', scope: '해당 테넌트', color: 'bg-blue-600 text-white' },
                { role: 'OPERATOR', privileges: 'course:approve/reject, time:create/update, instructor:assign, enrollment:force, user:role-manage', scope: 'ALL (테넌트 내 전체)', color: 'bg-orange-100 text-orange-700' },
                { role: 'DESIGNER', privileges: 'course:create/edit, content:upload', scope: 'OWN (본인 강의)', color: 'bg-purple-100 text-purple-700' },
                { role: 'INSTRUCTOR', privileges: 'time:view, enrollment:view, progress:view', scope: 'ASSIGNED (배정 차수)', color: 'bg-emerald-100 text-emerald-700' },
                { role: 'USER', privileges: 'enrollment:self, progress:update, review:create', scope: 'ENROLLED (수강 중)', color: 'bg-gray-100 text-gray-700' },
              ].map((r) => (
                <tr key={r.role}>
                  <td className="border border-gray-200 px-2 py-1.5"><span className={`${r.color} px-1.5 py-0.5 rounded text-[10px] font-medium`}>{r.role}</span></td>
                  <td className="border border-gray-200 px-2 py-1.5 text-gray-600 font-mono">{r.privileges}</td>
                  <td className="border border-gray-200 px-2 py-1.5 text-gray-500">{r.scope}</td>
                </tr>
              ))}
              <tr className="bg-amber-50">
                <td className="border border-gray-200 px-2 py-1.5"><span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-medium">CR.DESIGNER</span></td>
                <td className="border border-gray-200 px-2 py-1.5 text-gray-600 font-mono">course:edit/delete, instructor:invite, revenue:view</td>
                <td className="border border-gray-200 px-2 py-1.5 text-gray-500">해당 강의</td>
              </tr>
              <tr className="bg-amber-50">
                <td className="border border-gray-200 px-2 py-1.5"><span className="bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded text-[10px] font-medium">CR.INSTRUCTOR</span></td>
                <td className="border border-gray-200 px-2 py-1.5 text-gray-600 font-mono">course:edit, enrollment:view, progress:view</td>
                <td className="border border-gray-200 px-2 py-1.5 text-gray-500">배정된 강의</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 리소스 접근 통제 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          접근 통제 규칙
        </h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• <span className="font-medium">소유자 규칙:</span> Course/Content는 생성자만 삭제 (TENANT_ADMIN 예외)</div>
          <div>• <span className="font-medium">테넌트 격리:</span> 모든 쿼리에 tenant_id 필터 자동 적용 (SYSTEM_ADMIN 예외)</div>
          <div>• <span className="font-medium">상태 제한:</span> REGISTERED 강의 직접 수정 불가 / COMPLETED 수강 삭제 불가 / ONGOING 차수 삭제 불가</div>
        </div>
      </div>
    </>
  );

  const renderAPI = () => (
    <>
      <SectionHeader
        title="API & 에러 처리"
        subtitle="REST API 설계 원칙 및 에러 핸들링 체계"
        color="bg-cyan-600"
      />

      {/* API 설계 원칙 */}
      <div className="bg-cyan-50 rounded-lg p-4 mb-4 border border-cyan-200">
        <h3 className="font-semibold text-cyan-700 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          API 설계 원칙
        </h3>
        <div className="space-y-2 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">URL 규칙</div>
            <div className="text-gray-600 space-y-1 text-xs">
              <div>• 복수형 케밥-케이스: <code className="bg-gray-100 px-1 rounded">/api/courses</code>, <code className="bg-gray-100 px-1 rounded">/api/order-items</code></div>
              <div>• 계층 표현: <code className="bg-gray-100 px-1 rounded">/api/courses/{'{courseId}'}/items</code></div>
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">HTTP 상태 코드</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-green-50 p-2 rounded text-center">
                <div className="font-medium text-green-700">GET</div>
                <div className="text-green-600">200 OK</div>
              </div>
              <div className="bg-blue-50 p-2 rounded text-center">
                <div className="font-medium text-blue-700">POST</div>
                <div className="text-blue-600">201 Created</div>
              </div>
              <div className="bg-gray-100 p-2 rounded text-center">
                <div className="font-medium text-gray-700">DELETE</div>
                <div className="text-gray-600">204 No Content</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 공통 Response 포맷 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">공통 Response 포맷</h3>
        <div className="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono">
          <div>{'{'}</div>
          <div className="pl-4">"success": true,</div>
          <div className="pl-4">"data": {'{ /* 응답 데이터 */ }'},</div>
          <div className="pl-4">"error": null</div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* 주요 API 엔드포인트 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">주요 API 엔드포인트</h3>
        <div className="space-y-3 text-xs">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-indigo-700 mb-2">Auth (인증)</div>
            <div className="space-y-1 text-gray-600">
              <div><span className="bg-blue-100 text-blue-700 px-1 rounded">POST</span> /api/auth/register - 회원가입</div>
              <div><span className="bg-blue-100 text-blue-700 px-1 rounded">POST</span> /api/auth/login - 로그인</div>
              <div><span className="bg-blue-100 text-blue-700 px-1 rounded">POST</span> /api/auth/refresh - 토큰 갱신</div>
              <div><span className="bg-blue-100 text-blue-700 px-1 rounded">POST</span> /api/auth/oauth/{'{provider}'}/callback - OAuth</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-indigo-700 mb-2">Users (사용자)</div>
            <div className="space-y-1 text-gray-600">
              <div><span className="bg-green-100 text-green-700 px-1 rounded">GET</span> /api/users/me - 내 정보</div>
              <div><span className="bg-amber-100 text-amber-700 px-1 rounded">PUT</span> /api/users/me - 정보 수정</div>
              <div><span className="bg-green-100 text-green-700 px-1 rounded">GET</span> /api/users - 목록 (OPERATOR+)</div>
              <div><span className="bg-blue-100 text-blue-700 px-1 rounded">POST</span> /api/users/{'{id}'}/course-roles - 역할 부여</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-indigo-700 mb-2">Courses (강의)</div>
            <div className="space-y-1 text-gray-600">
              <div><span className="bg-blue-100 text-blue-700 px-1 rounded">POST</span> /api/courses - 강의 생성</div>
              <div><span className="bg-green-100 text-green-700 px-1 rounded">GET</span> /api/courses/{'{id}'} - 상세 조회</div>
              <div><span className="bg-blue-100 text-blue-700 px-1 rounded">POST</span> /api/courses/{'{id}'}/items - 차시 추가</div>
              <div><span className="bg-green-100 text-green-700 px-1 rounded">GET</span> /api/courses/{'{id}'}/items/hierarchy - 계층 구조</div>
            </div>
          </div>
        </div>
      </div>

      {/* 에러 처리 체계 */}
      <div className="bg-rose-50 rounded-lg p-4 mb-4 border border-rose-200">
        <h3 className="font-semibold text-rose-700 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          에러 처리 체계
        </h3>
        <div className="space-y-2 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">예외 계층 구조</div>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded">
              <div>RuntimeException</div>
              <div className="pl-2">└─ BusinessException</div>
              <div className="pl-6">├─ NotFoundException (404)</div>
              <div className="pl-6">├─ DuplicateException (400)</div>
              <div className="pl-6">├─ UnauthorizedException (401)</div>
              <div className="pl-6">├─ ForbiddenException (403)</div>
              <div className="pl-6">└─ ValidationException (400)</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">GlobalExceptionHandler</div>
            <div className="text-xs text-gray-600">
              <code className="bg-gray-100 px-1 rounded">@RestControllerAdvice</code>로 중앙 집중식 예외 처리
            </div>
          </div>
        </div>
      </div>

      {/* 에러 응답 포맷 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">에러 응답 포맷</h3>
        <div className="bg-gray-800 text-red-400 p-3 rounded text-xs font-mono">
          <div>{'{'}</div>
          <div className="pl-4">"code": "U001",</div>
          <div className="pl-4">"message": "사용자를 찾을 수 없습니다",</div>
          <div className="pl-4">"timestamp": "2025-01-15T10:30:00",</div>
          <div className="pl-4">"errors": null</div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* ErrorCode 분류 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">ErrorCode 분류</h3>
        <div className="space-y-3 text-xs">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">Common (공통)</div>
            <div className="space-y-1">
              <div className="flex justify-between"><span className="text-gray-600">C001</span><span>잘못된 입력값</span></div>
              <div className="flex justify-between"><span className="text-gray-600">C999</span><span>서버 오류</span></div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-indigo-700 mb-2">User (U0xx)</div>
            <div className="space-y-1">
              <div className="flex justify-between"><span className="text-gray-600">U001</span><span>사용자 없음 (404)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">U002</span><span>이메일 중복 (400)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">U003</span><span>비밀번호 불일치 (401)</span></div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-emerald-700 mb-2">Course</div>
            <div className="space-y-1">
              <div className="flex justify-between"><span className="text-gray-600">COURSE_NOT_FOUND</span><span>강의 없음 (404)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">ITEM_NOT_FOUND</span><span>차시 없음 (404)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">MAX_DEPTH_EXCEEDED</span><span>최대 깊이 초과 (400)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">CIRCULAR_RELATION</span><span>순환 참조 (400)</span></div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-amber-700 mb-2">Auth (인증)</div>
            <div className="space-y-1">
              <div className="flex justify-between"><span className="text-gray-600">INVALID_TOKEN</span><span>유효하지 않은 토큰 (401)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">TOKEN_EXPIRED</span><span>토큰 만료 (401)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">ACCESS_DENIED</span><span>접근 권한 없음 (403)</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderLayer = () => (
    <>
      <SectionHeader
        title="레이어 아키텍처"
        subtitle="Controller → Service → Repository 계층형 구조"
        color="bg-slate-600"
      />

      {/* 요청 처리 흐름 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4" />
          요청 처리 흐름
        </h3>
        <div className="flex flex-col items-center gap-1">
          {layerArchitecture.layers.map((layer, idx) => (
            <div key={idx}>
              <div className={`${layer.color} px-4 py-2 rounded-lg text-center w-full max-w-xs`}>
                <div className="font-medium text-sm">{layer.name}</div>
                <div className="text-xs opacity-80">{layer.desc}</div>
              </div>
              {idx < layerArchitecture.layers.length - 1 && (
                <div className="text-gray-400 text-xs text-center">▼</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 계층 간 규칙 */}
      <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
        <h3 className="font-semibold text-slate-700 mb-2">계층 간 규칙</h3>
        <div className="space-y-2 text-sm">
          {layerArchitecture.layerRules.map((r, i) => (
            <div key={i} className={`flex items-center gap-2 p-2 rounded ${r.type === 'must' ? 'bg-green-50' : 'bg-amber-50'}`}>
              <span className={r.type === 'must' ? 'text-green-600' : 'text-amber-600'}>
                {r.type === 'must' ? '✓' : '⚠'}
              </span>
              <span>{r.rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Cutting Concerns */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Cross-Cutting Concerns (횡단 관심사)
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {layerArchitecture.crossCutting.map((cc, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="font-medium text-gray-700">{cc.name}</div>
              <div className="text-gray-600 mt-1">{cc.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 패키지 구조 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <FolderTree className="w-4 h-4" />
          패키지 구조
        </h3>
        <div className="space-y-3 text-xs">
          {layerArchitecture.packageStructure.map((pkg, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded">
              <div className="font-mono font-medium text-indigo-700 mb-2">{pkg.path}</div>
              <div className="space-y-1 pl-3 border-l-2 border-indigo-200">
                {pkg.children.map((child, j) => (
                  <div key={j} className="text-gray-600">{child}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderInfra = () => (
    <>
      <SectionHeader
        title="인프라 아키텍처"
        subtitle="AWS 기반 배포 구성 (ap-northeast-2)"
        color="bg-sky-600"
      />

      {/* 인프라 구성도 이미지 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">AWS 인프라 구성도</h3>
        <img
          src="/infra-architecture.png"
          alt="AWS 인프라 아키텍처 다이어그램"
          className="w-full rounded border border-gray-200"
        />
      </div>

      {/* Region / VPC */}
      <div className="bg-sky-50 rounded-lg p-4 mb-4 border border-sky-200">
        <h3 className="font-semibold text-sky-700 mb-2 flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          AWS Region: {infraArchitecture.region}
        </h3>
        <div className="text-sm text-sky-600">
          VPC + 2 Availability Zones (Public/Private Subnets)
        </div>
      </div>

      {/* Public Subnet */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Public Subnet</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {infraArchitecture.components.public.map((c, i) => (
            <div key={i} className="bg-green-50 p-3 rounded border border-green-200">
              <div className="font-medium text-green-700">{c.name}</div>
              <div className="text-gray-600 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Private Subnet */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Private Subnet</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {infraArchitecture.components.private.map((c, i) => (
            <div key={i} className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="font-medium text-blue-700">{c.name}</div>
              <div className="text-gray-600 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Components */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">필요시 구성 (Optional)</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {infraArchitecture.components.optional.map((c, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded border border-dashed border-gray-300">
              <div className="font-medium text-gray-700">{c.name}</div>
              <div className="text-gray-500 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 네트워크 흐름 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">네트워크 흐름</h3>
        <div className="flex flex-col items-center gap-1 text-xs">
          <span className="bg-gray-800 text-white px-3 py-1.5 rounded">Internet</span>
          <span className="text-gray-400">▼</span>
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded">Internet Gateway</span>
          <span className="text-gray-400">▼</span>
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded">ALB (HTTPS 종단)</span>
          <span className="text-gray-400">▼</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded">API Server (Private Subnet)</span>
          <span className="text-gray-400">▼</span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded">MySQL RDS (Private Subnet)</span>
        </div>
      </div>

      {/* CI/CD 파이프라인 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <GitPullRequest className="w-4 h-4" />
          CI/CD 파이프라인
        </h3>
        <div className="flex flex-col items-center gap-1 text-xs">
          {infraArchitecture.cicd.map((step, i) => (
            <div key={i}>
              <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-center w-full max-w-xs">
                <div className="font-medium text-gray-700">{step.step}</div>
                <div className="text-gray-500">{step.desc}</div>
              </div>
              {i < infraArchitecture.cicd.length - 1 && (
                <div className="text-gray-400 text-center">▼</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 환경 분리 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">환경 분리</h3>
        <div className="flex gap-2">
          {infraArchitecture.environments.map((env, i) => (
            <div key={i} className={`${env.color} p-3 rounded flex-1 text-center`}>
              <div className="font-medium">{env.name}</div>
              <div className="text-xs mt-1 opacity-80">{env.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderDependencies = () => (
    <>
      <SectionHeader
        title="모듈 의존성"
        subtitle="패키지 간 의존 방향 및 통신 방식"
        color="bg-amber-600"
      />

      {/* 통신 방식 */}
      <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-200">
        <h3 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
          <Network className="w-4 h-4" />
          통신 방식
        </h3>
        <p className="text-sm text-amber-600">{moduleDependencies.communicationNote}</p>
      </div>

      {/* Service 레벨 의존성 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Service 레벨 의존성</h3>
        <div className="space-y-2 text-xs">
          {moduleDependencies.dependencies.map((dep, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium min-w-[70px] text-center">{dep.from}</span>
              <span className="text-gray-400">→</span>
              <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-medium min-w-[70px] text-center">{dep.to}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${dep.type === 'sync' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                {dep.type === 'sync' ? 'Sync' : 'Async'}
              </span>
              <span className="text-gray-500 flex-1">{dep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DB FK 관계 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Database className="w-4 h-4" />
          DB FK 관계 (물리적 의존성)
        </h3>
        <div className="text-xs text-gray-500 mb-3">
          DB Foreign Key는 물리적 참조. 코드 의존성과 반드시 일치하지 않음.
        </div>
        <div className="space-y-2 text-xs">
          {moduleDependencies.dbRelationships.map((rel, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-700 min-w-[120px]">{rel.entity}</span>
              <span className="text-gray-500 flex-1">{rel.fk}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                rel.note.includes('CASCADE') ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {rel.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 의존성 방향 요약 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">의존성 방향 요약</h3>
        <div className="text-xs space-y-2">
          <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
            <div className="font-medium text-indigo-700 mb-1">코어 모듈 (의존 받는 쪽)</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">User</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Content</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Course</span>
            </div>
          </div>
          <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
            <div className="font-medium text-emerald-700 mb-1">중간 모듈 (양방향)</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">TS</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Snapshot</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Learning</span>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <div className="font-medium text-amber-700 mb-1">리프 모듈 (의존하는 쪽)</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Student</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">IIS</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Certificate</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderADR = () => (
    <>
      <SectionHeader
        title="ADR (Architecture Decision Records)"
        subtitle="주요 아키텍처 결정과 그 근거"
        color="bg-teal-600"
      />

      <div className="bg-teal-50 rounded-lg p-4 mb-4 border border-teal-200">
        <h3 className="font-semibold text-teal-700 mb-2 flex items-center gap-2">
          <Scale className="w-4 h-4" />
          ADR이란?
        </h3>
        <p className="text-sm text-teal-600">
          Architecture Decision Record: 아키텍처 결정의 맥락, 선택지, 근거, 결과를 기록하여
          "왜 이렇게 결정했는가"를 추적하는 문서입니다.
        </p>
      </div>

      {adrDecisions.map((adr) => (
        <div key={adr.id} className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-mono">{adr.id}</span>
            <h3 className="font-semibold text-gray-700 text-sm">{adr.title}</h3>
          </div>

          <div className="text-xs text-gray-600 mb-2">{adr.context}</div>

          <div className="text-xs mb-2 bg-teal-50 p-2 rounded border border-teal-200">
            <span className="font-medium text-teal-700">결정: </span>
            <span className="text-teal-600">{adr.decision}</span>
          </div>

          <div className="text-xs text-gray-500 mb-1">
            <span className="font-medium">대안:</span> {adr.alternatives.map(a => a.name).join(', ')}
          </div>

          <div className="text-xs text-gray-600">
            {adr.rationale.slice(0, 2).map((r, i) => (
              <span key={i}><span className="text-green-600">✓</span> {r}{i < 1 && ' '}</span>
            ))}
          </div>
        </div>
      ))}
    </>
  );

  const renderAuth = () => (
    <>
      <SectionHeader
        title="인증/인가 흐름"
        subtitle="JWT 기반 Stateless 인증 + Refresh Token Rotation"
        color="bg-pink-600"
      />

      {/* JWT 설정 */}
      <div className="bg-pink-50 rounded-lg p-4 mb-4 border border-pink-200">
        <h3 className="font-semibold text-pink-700 mb-3 flex items-center gap-2">
          <Key className="w-4 h-4" />
          JWT 토큰 설정
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-pink-700">Access Token</div>
            <div className="text-gray-600">{authArchitecture.jwt.accessExpiration}</div>
            <div className="text-gray-400 mt-1">서버 미저장 (Stateless)</div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-pink-700">Refresh Token</div>
            <div className="text-gray-600">{authArchitecture.jwt.refreshExpiration}</div>
            <div className="text-gray-400 mt-1">DB 저장 + Revocation 지원</div>
          </div>
        </div>
        <div className="mt-3 text-xs">
          <div className="font-medium text-pink-700 mb-1">JWT Claims:</div>
          <div className="flex flex-wrap gap-1">
            {authArchitecture.jwt.claims.map((c, i) => (
              <span key={i} className="bg-white text-pink-600 px-2 py-0.5 rounded border border-pink-200">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 토큰 저장 + 전송 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">토큰 저장 & 전송</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• <span className="font-medium">Backend:</span> {authArchitecture.tokenStorage.backend}</div>
          <div>• <span className="font-medium">Frontend:</span> {authArchitecture.tokenStorage.frontend}</div>
          <div>• <span className="font-medium">전송:</span> <span className="font-mono bg-gray-100 px-1 rounded">{authArchitecture.tokenStorage.transmission}</span></div>
        </div>
      </div>

      {/* 로그인 + 갱신 시퀀스 (통합) */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">인증 시퀀스</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="font-medium text-pink-700 mb-2">로그인</div>
            {authArchitecture.loginFlow.map((s, i) => (
              <div key={i} className="flex items-start gap-1 mb-1">
                <span className="text-pink-500 font-bold">{i + 1}.</span>
                <span className="text-gray-600">{s.desc}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-medium text-pink-700 mb-2">토큰 갱신 (Rotation)</div>
            {authArchitecture.refreshFlow.map((s, i) => (
              <div key={i} className="flex items-start gap-1 mb-1">
                <span className="text-pink-500 font-bold">{i + 1}.</span>
                <span className="text-gray-600">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 p-2 bg-amber-50 rounded text-xs text-amber-700">
          Rotation: 갱신 시 기존 RefreshToken 즉시 폐기 (revoked=true)
        </div>
      </div>

      {/* Security Filter Chain */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Security Filter Chain
        </h3>
        <div className="flex flex-col items-center gap-1 text-xs">
          {authArchitecture.filterChain.map((f, i) => (
            <div key={i}>
              <div className={`px-4 py-2 rounded text-center w-full max-w-xs ${
                i === 0 ? 'bg-amber-100 text-amber-700' :
                i === 1 ? 'bg-pink-100 text-pink-700' :
                i === 2 ? 'bg-blue-100 text-blue-700' :
                i === 3 ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                <div className="font-medium">{f.name}</div>
                <div className="text-xs opacity-80">{f.desc}</div>
              </div>
              {i < authArchitecture.filterChain.length - 1 && (
                <div className="text-gray-400 text-center">▼</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CORS + Public Endpoints */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">CORS & Public Endpoints</h3>
        <div className="text-xs text-gray-600 space-y-1 mb-3">
          <div>• Origins: {authArchitecture.cors.origins} | Methods: {authArchitecture.cors.methods}</div>
          <div>• Credentials: {authArchitecture.cors.credentials} | Max-Age: {authArchitecture.cors.maxAge}</div>
        </div>
        <div className="flex flex-wrap gap-1 text-xs">
          {authArchitecture.publicEndpoints.map((ep, i) => (
            <span key={i} className="bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 font-mono">{ep}</span>
          ))}
        </div>
      </div>
    </>
  );

  const renderData = () => (
    <>
      <SectionHeader
        title="데이터 아키텍처"
        subtitle="Entity 관계, 상속 구조, 인덱스 전략"
        color="bg-violet-600"
      />

      {/* Entity 상속 구조 */}
      <div className="bg-violet-50 rounded-lg p-4 mb-4 border border-violet-200">
        <h3 className="font-semibold text-violet-700 mb-3 flex items-center gap-2">
          <Database className="w-4 h-4" />
          Entity 상속 구조
        </h3>
        <div className="flex flex-col items-center gap-1 text-sm">
          {dataArchitecture.baseEntities.map((be, i) => (
            <div key={i}>
              <div className="bg-white px-4 py-2 rounded border border-violet-200 text-center w-full max-w-xs">
                <div className="font-medium text-violet-700">{be.name}</div>
                <div className="text-xs text-gray-600">{be.fields}</div>
                <div className="text-xs text-gray-400">{be.desc}</div>
              </div>
              {i < dataArchitecture.baseEntities.length - 1 && (
                <div className="text-violet-400 text-center text-xs">▼ extends</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ER 관계도 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">핵심 Entity 관계도</h3>
        <div className="text-xs space-y-2">
          <div className="bg-gray-50 p-3 rounded font-mono text-gray-600 space-y-1">
            <div>Tenant (1) ──── (N) <span className="text-indigo-600 font-medium">User</span> ──── (N) UserRole</div>
            <div className="pl-24">│</div>
            <div><span className="text-emerald-600 font-medium">Course</span> ──── (N) <span className="text-emerald-600">CourseItem</span> (tree) ──── LearningObject ──── Content</div>
            <div>  │</div>
            <div>  └── (N) <span className="text-orange-600 font-medium">CourseTime</span> ──── (1:1) <span className="text-blue-600 font-medium">CourseSnapshot</span> ──── (N) SnapshotItem (tree)</div>
            <div className="pl-16">│                                       └── (N) SnapshotRelation</div>
            <div className="pl-16">├── (N) <span className="text-purple-600 font-medium">Enrollment</span> ──── (N) ItemProgress</div>
            <div className="pl-16">└── (N) <span className="text-teal-600 font-medium">InstructorAssignment</span></div>
          </div>
        </div>
      </div>

      {/* Entity 목록 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Entity 상세 ({dataArchitecture.entities.length}개)</h3>
        <div className="space-y-2 text-xs">
          {dataArchitecture.entities.map((e, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-violet-700">{e.name}</span>
                <span className="text-gray-400 font-mono text-[10px]">{e.table}</span>
                {e.extends !== '-' && <span className="text-[10px] bg-violet-100 text-violet-600 px-1 rounded">{e.extends}</span>}
              </div>
              <div className="text-gray-600 pl-2 border-l-2 border-violet-200 space-y-0.5">
                <div><span className="text-gray-500">필드:</span> {e.keys}</div>
                {e.unique !== '-' && <div><span className="text-gray-500">유니크:</span> {e.unique}</div>}
                <div><span className="text-gray-500">FK:</span> {e.fk}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인덱스 전략 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">인덱스 전략</h3>
        <div className="text-xs text-gray-500 mb-2">tenant_id를 포함한 복합 인덱스로 테넌트 격리 + 조회 성능 확보</div>
        <div className="space-y-2 text-xs">
          {dataArchitecture.indexStrategy.map((idx, i) => (
            <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
              <span className="font-mono font-medium text-violet-700 min-w-[180px]">{idx.table}</span>
              <span className="text-gray-600">{idx.indexes}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cascade 정책 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Cascade & Orphan Removal 정책</h3>
        <div className="space-y-2 text-xs">
          {dataArchitecture.cascadePolicy.map((c, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-700 min-w-[200px]">{c.parent}</span>
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px]">{c.policy}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Optimistic Lock 대상 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          @Version (Optimistic Lock) 적용 Entity
        </h3>
        <div className="flex flex-wrap gap-1 text-xs">
          {dataArchitecture.optimisticLock.map((e, i) => (
            <span key={i} className="bg-violet-50 text-violet-700 px-2 py-1 rounded border border-violet-200">{e}</span>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          동시 수정 시 OptimisticLockException 발생 → 클라이언트에서 재시도
        </div>
      </div>
    </>
  );

  const renderFlow = () => (
    <>
      <SectionHeader
        title="핵심 비즈니스 플로우"
        subtitle="강의 생성부터 수료까지 End-to-End 시퀀스"
        color="bg-lime-600"
      />

      {/* 전체 흐름 요약 */}
      <div className="bg-lime-50 rounded-lg p-4 mb-4 border border-lime-200">
        <h3 className="font-semibold text-lime-700 mb-3 flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          전체 흐름 개요
        </h3>
        <div className="flex items-center gap-1 flex-wrap text-xs">
          {[
            { label: '강의 생성', color: 'bg-indigo-100 text-indigo-700' },
            { label: '차수 생성', color: 'bg-orange-100 text-orange-700' },
            { label: '수강 신청', color: 'bg-emerald-100 text-emerald-700' },
            { label: '학습 진행', color: 'bg-blue-100 text-blue-700' },
            { label: '수료/인증서', color: 'bg-rose-100 text-rose-700' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className={`px-2 py-1 rounded font-medium ${step.color}`}>{step.label}</span>
              {i < 4 && <span className="text-gray-400 font-bold">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2 border border-lime-200 text-center">
            <div className="font-medium text-gray-700">핵심 패턴</div>
            <div className="text-lime-600">Snapshot + Event-Driven</div>
          </div>
          <div className="bg-white rounded p-2 border border-lime-200 text-center">
            <div className="font-medium text-gray-700">동시성 제어</div>
            <div className="text-lime-600">Pessimistic Lock</div>
          </div>
          <div className="bg-white rounded p-2 border border-lime-200 text-center">
            <div className="font-medium text-gray-700">상태 관리</div>
            <div className="text-lime-600">State Machine</div>
          </div>
        </div>
      </div>

      {/* 각 플로우 상세 */}
      {coreFlows.map((flow) => (
        <div key={flow.id} className={`rounded-lg p-4 mb-4 border ${flow.borderColor} ${flow.lightColor}`}>
          {/* 헤더 */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`${flow.color} text-white px-2 py-0.5 rounded text-xs font-bold`}>
              {flow.title}
            </span>
          </div>

          {/* 메타 정보 */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="bg-white rounded p-2 border border-gray-200">
              <span className="font-medium text-gray-500">Actor: </span>
              <span className={flow.textColor}>{flow.actors}</span>
            </div>
            <div className="bg-white rounded p-2 border border-gray-200">
              <span className="font-medium text-gray-500">Trigger: </span>
              <span className={flow.textColor}>{flow.trigger}</span>
            </div>
          </div>

          {/* 시퀀스 스텝 */}
          <div className="space-y-2 mb-3">
            {flow.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <div className={`${flow.color} text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold`}>
                  {i + 1}
                </div>
                <div className="flex-1 bg-white rounded p-2 border border-gray-200">
                  <div className="font-mono text-gray-700 font-medium">{step.action}</div>
                  <div className="text-gray-500 mt-0.5">{step.detail}</div>
                  <div className="text-gray-400 mt-0.5 italic">{step.entity}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 상태 머신 */}
          <div className="bg-white rounded p-2 border border-gray-200 mb-2 text-xs">
            <span className="font-medium text-gray-500">State Machine: </span>
            <span className="font-mono text-gray-700">{flow.stateMachine}</span>
          </div>

          {/* 핵심 규칙 */}
          <div className={`rounded p-2 border ${flow.borderColor} text-xs`}>
            <span className={`font-medium ${flow.textColor}`}>핵심 규칙: </span>
            <span className="text-gray-600">{flow.keyRule}</span>
          </div>
        </div>
      ))}

      {/* 엔티티 관계 요약 */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 text-sm">플로우 간 엔티티 관계</h3>
        <div className="space-y-1 text-xs font-mono text-gray-600">
          <div>Course (REGISTERED)</div>
          <div className="pl-4">├─ 1:N CourseItem (트리 구조)</div>
          <div className="pl-8">└─ 1:0..1 LearningObject → Content</div>
          <div className="pl-4">└─ 1:N CourseTime (차수)</div>
          <div className="pl-8">├─ 1:1 CourseSnapshot (동결 복사본)</div>
          <div className="pl-12">├─ 1:N SnapshotItem</div>
          <div className="pl-12">└─ 1:N SnapshotRelation</div>
          <div className="pl-8">└─ 1:N Enrollment (수강생)</div>
          <div className="pl-12">├─ 1:N ItemProgress (항목별 진행)</div>
          <div className="pl-12">└─ 0..1 Certificate (수료 시)</div>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'guide': return renderGuide();
      case 'overview': return renderOverview();
      case 'modules': return renderModules();
      case 'layer': return renderLayer();
      case 'flow': return renderFlow();
      case 'data': return renderData();
      case 'transaction': return renderTransaction();
      case 'rbac': return renderRBAC();
      case 'auth': return renderAuth();
      case 'api': return renderAPI();
      case 'infra': return renderInfra();
      case 'dependencies': return renderDependencies();
      case 'b2c': return renderB2C();
      case 'b2b': return renderB2B();
      case 'kpop': return renderKpop();
      case 'adr': return renderADR();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">MZC LMS Architecture</h1>
          <p className="text-sm text-gray-500">B2C 코어 + B2B/K-Pop 테넌트 확장</p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              B2C Core (코어 시스템)
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-xs font-medium">B2B (테넌트)</div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded text-xs font-medium">K-Pop (테넌트)</div>
          </div>
        </div>

        {/* Tabs - 드롭다운 방식 */}
        <div className="flex gap-2 mb-4 bg-white p-2 rounded-lg shadow-sm justify-center">
          <TabDropdown
            label={tabCategories.structure.label}
            color={tabCategories.structure.color}
            items={tabCategories.structure.items}
            activeTab={activeTab}
            onSelect={setActiveTab}
          />
          <TabDropdown
            label={tabCategories.tech.label}
            color={tabCategories.tech.color}
            items={tabCategories.tech.items}
            activeTab={activeTab}
            onSelect={setActiveTab}
          />
          <TabDropdown
            label={tabCategories.sites.label}
            color={tabCategories.sites.color}
            items={tabCategories.sites.items}
            activeTab={activeTab}
            onSelect={setActiveTab}
          />
          <TabDropdown
            label={tabCategories.decisions.label}
            color={tabCategories.decisions.color}
            items={tabCategories.decisions.items}
            activeTab={activeTab}
            onSelect={setActiveTab}
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          {renderContent()}
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center text-xs text-gray-400">
          각 모듈 클릭 시 세부 항목 확인 | MZC LMS docs 기반
        </div>
      </div>
    </div>
  );
}