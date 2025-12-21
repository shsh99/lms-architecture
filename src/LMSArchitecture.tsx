import { useState } from 'react';
import {
  ChevronDown, ChevronRight, Database, Building2, GraduationCap,
  BookOpen, UserCheck, User, Globe, CreditCard,
  Search, Tent, Video, Calendar, Languages, LucideIcon,
  Clock, FolderTree, Link2, Play, Upload, Shield, Settings, BarChart3, FileText,
  GitBranch, Lock, AlertTriangle, Key, Server, Filter
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

export default function LMSArchitecture() {
  const [activeTab, setActiveTab] = useState('overview');
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const toggleModule = (id: string) => {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: 'overview', label: '전체 구조', color: 'bg-gray-700' },
    { id: 'modules', label: '모듈 구조', color: 'bg-indigo-600' },
    { id: 'transaction', label: '트랜잭션', color: 'bg-orange-600' },
    { id: 'rbac', label: 'RBAC', color: 'bg-rose-600' },
    { id: 'b2c', label: 'B2C', color: 'bg-emerald-600' },
    { id: 'b2b', label: 'B2B', color: 'bg-blue-600' },
    { id: 'kpop', label: 'K-Pop', color: 'bg-purple-600' },
  ];

  // 시스템 모듈 구조 (module-structure.md 기반)
  const systemModules: Module[] = [
    {
      id: 'um',
      title: 'UM (User Master)',
      icon: User,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[um_users] 사용자 기본 정보', '인증/인가 처리 (email, password)', '역할(Role): USER, MEMBER, OPERATOR, ADMIN', 'B2B: Organization 소속 관리', 'UserStatus: ACTIVE, INACTIVE, SUSPENDED']
    },
    {
      id: 'ts',
      title: 'TS (Time Schedule)',
      icon: Clock,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[ts_courses] 강의 개설 신청/검토', 'CourseStatus: DRAFT → PENDING → APPROVED', '[ts_course_times] 차수(Time) 생성', 'TimeStatus: SCHEDULED → OPEN → IN_PROGRESS → COMPLETED', 'delivery_type: ONLINE, OFFLINE, BLENDED, LIVE', 'enrollment_method: FIRST_COME, APPROVAL, INVITE_ONLY', 'completion_rule (JSON): 수료 기준', 'price, is_free: 가격 정보', '강사 배정 (IIS 연동)', '필수 수강 강제 신청 (SIS 연동)']
    },
    {
      id: 'sis',
      title: 'SIS (Student Information)',
      icon: UserCheck,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[sis_enrollments] 수강 기록', '필수: userKey + timeKey + enrolledAt', 'EnrollmentType: VOLUNTARY, MANDATORY', 'EnrollmentStatus: ACTIVE, WAITING, PENDING, COMPLETED, CANCELLED, EXPIRED', 'progressPercent (0-100), score', '수료 시점 기록 (completedAt)']
    },
    {
      id: 'iis',
      title: 'IIS (Instructor Information)',
      icon: GraduationCap,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[iis_instructor_assignments] 강사 배정', '필수: userKey + timeKey + assignedAt', 'InstructorRole: MAIN, ASSISTANT', 'AssignmentStatus: ACTIVE, REPLACED, CANCELLED', '강사 교체 이력 관리 (replacedAt)']
    },
    {
      id: 'cm',
      title: 'CM (Course Matrix)',
      icon: FolderTree,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[cm_courses] 강의 메타데이터 관리', 'CourseLevel: BEGINNER, INTERMEDIATE, ADVANCED', 'CourseType: ONLINE, OFFLINE, BLENDED', '[cm_course_items] 차시/폴더 (계층형 구조)', 'Self-reference: 무한 깊이 폴더 지원 (depth 최대 10단계)', 'learningObject = NULL → 폴더, != NULL → 차시', 'ON DELETE CASCADE로 강의 삭제 시 하위 항목 자동 정리']
    },
    {
      id: 'cr',
      title: 'CR (Course Relation)',
      icon: Link2,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[cr_course_relations] 차시 간 학습 순서 정의', '학습 경로 설정 (시작점, 다음 차시 연결)', 'Linked List 패턴 (fromItem → toItem)', 'fromItem = NULL → 시작점', '순서 변경 시 전체 재정렬 불필요 (특정 연결만 수정)', '향후: 조건부 분기 (점수/완료 여부에 따른 경로 변경)']
    },
    {
      id: 'snapshot',
      title: 'Snapshot (개설 강의)',
      icon: FileText,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[cm_snapshots] Course(템플릿)로부터 실제 개설 강의 생성', '수강이력 불변성 보장 (템플릿 수정이 기존 강의에 영향 없음)', 'SnapshotStatus: DRAFT, ACTIVE, COMPLETED, ARCHIVED', '[cm_snapshot_items] 차시/폴더 깊은 복사', '[cm_snapshot_los] 메타데이터 깊은 복사', 'Content 공유 참조 (파일 불변, 스토리지 절약)', 'ON DELETE SET NULL (템플릿 삭제해도 스냅샷 유지)']
    },
    {
      id: 'lo',
      title: 'LO (Learning Object)',
      icon: Play,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[lo_learning_objects] 학습 객체', 'Type: VIDEO, DOCUMENT, QUIZ, ASSIGNMENT', 'LIVE_SESSION, EXTERNAL_LINK, SCORM', 'CMS contentId 연결', 'Content 업로드 시 자동 생성 (Event)']
    },
    {
      id: 'cms',
      title: 'CMS (Content Management)',
      icon: Upload,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['[cms_contents] 컨텐츠 파일', 'ContentType: VIDEO, DOCUMENT, IMAGE, AUDIO', 'S3 업로드 → MediaConvert 인코딩', 'CDN URL (CloudFront)', 'ContentStatus: UPLOADING → PROCESSING → READY']
    },
    {
      id: 'i18n',
      title: 'i18n (다국어)',
      icon: Languages,
      color: 'border-indigo-300 bg-indigo-50',
      items: ['다국어 콘텐츠 관리', '언어 설정 (한/영/일/중)', '자동 번역 연동', 'RTL 지원']
    },
  ];

  // B2C 모듈 (코어 - user-roles.md 기반)
  const b2cModules: Module[] = [
    {
      id: 'b2c-course',
      title: 'Course (강의 생성)',
      icon: BookOpen,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['USER가 직접 강의 생성 가능', '생성 시 자동으로 OWNER 역할 부여', '강의 등록 신청 → OPERATOR 검토/승인', '가격 설정 및 수익 분배']
    },
    {
      id: 'b2c-instructor',
      title: 'Instructor (강사 관리)',
      icon: GraduationCap,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['OWNER가 공동 강사 초대', 'OPERATOR가 차수에 강사 배정', '강사 프로필/포트폴리오', '수익 분배 비율 설정 (기본 70%)']
    },
    {
      id: 'b2c-payment',
      title: 'Payment (결제)',
      icon: CreditCard,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['개인 결제 (카드, 간편결제)', 'PG 연동', '쿠폰/할인 시스템', '환불 정책 관리']
    },
    {
      id: 'b2c-discovery',
      title: 'Discovery (탐색)',
      icon: Search,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['카테고리 브라우징', '검색/필터', '추천 알고리즘', '리뷰/평점 시스템']
    },
    {
      id: 'b2c-landing',
      title: 'Landing (랜딩)',
      icon: Globe,
      color: 'border-emerald-300 bg-emerald-50',
      items: ['메인 페이지', '강의 상세 (비로그인 접근 가능)', '강사 소개 페이지', 'SEO 최적화']
    },
  ];

  // B2B 모듈 (architecture.md, multi-tenancy.md 기반)
  const b2bModules: Module[] = [
    {
      id: 'b2b-tenant',
      title: 'Tenant (테넌트)',
      icon: Database,
      color: 'border-blue-300 bg-blue-50',
      items: ['기업별 테넌트 생성/관리', '서브도메인 매핑 (samsung.learn.com)', '커스텀 도메인 지원', 'Row-Level Security 적용']
    },
    {
      id: 'b2b-branding',
      title: 'Branding (브랜딩)',
      icon: Settings,
      color: 'border-blue-300 bg-blue-50',
      items: ['로고/파비콘 커스터마이징', '색상 테마 (primaryColor, secondaryColor)', '텍스트 라벨 변경 (교육과정, 강사, 학습자)', '레이아웃 설정']
    },
    {
      id: 'b2b-org',
      title: 'Organization (조직)',
      icon: Building2,
      color: 'border-blue-300 bg-blue-50',
      items: ['부서/팀 계층 구조', '조직별 사용자 관리', '일괄 사용자 등록 (엑셀)', 'SSO 연동 (OKTA, Azure AD)']
    },
    {
      id: 'b2b-instructor',
      title: 'External Instructor (외부강사)',
      icon: GraduationCap,
      color: 'border-blue-300 bg-blue-50',
      items: ['외부 강사 풀 관리', '강사 프로필/이력 관리', '차수별 외부강사 배정', '강사비 정산']
    },
    {
      id: 'b2b-offline',
      title: 'Offline Class (오프라인 강의)',
      icon: Calendar,
      color: 'border-blue-300 bg-blue-50',
      items: ['강의실/장소 관리', '오프라인 일정 등록', '출석 체크 (QR/수기)', '현장 강의 자료 배포']
    },
    {
      id: 'b2b-analytics',
      title: 'Analytics (분석)',
      icon: BarChart3,
      color: 'border-blue-300 bg-blue-50',
      items: ['전사/조직별 학습 현황', '부서별 수료율 대시보드', '의무교육 이수현황', '학습 리포트 생성']
    },
    {
      id: 'b2b-license',
      title: 'License (라이선스)',
      icon: Shield,
      color: 'border-blue-300 bg-blue-50',
      items: ['B2C 강의 라이선스 연동', '최대 수강 인원 제한', '기간별 라이선스 관리', '기업 계약 결제']
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

  // 역할 정보 (user-roles.md 기반)
  const roleInfo = {
    b2c: [
      { role: 'TENANT_ADMIN', desc: '전체 관리' },
      { role: 'OPERATOR', desc: '강의 검토/승인, 차수 생성, 강사 배정' },
      { role: 'USER', desc: '수강 + 강의 생성 가능' },
      { role: 'OWNER', desc: '(강의별) 강의 소유, 삭제, 수익' },
      { role: 'INSTRUCTOR', desc: '(강의별) 강의 관리, 수익 분배' },
    ],
    b2b: [
      { role: 'TENANT_ADMIN', desc: '전사 통계/브랜딩' },
      { role: 'TENANT_OPERATOR', desc: '전체 운영 (유저/강의/학습현황)' },
      { role: 'EXTERNAL_INSTRUCTOR', desc: '외부 강사 (강의 진행, 출석 관리)' },
      { role: 'MEMBER', desc: '학습 (수강만)' },
    ],
    kpop: [
      { role: 'TENANT_ADMIN', desc: '전체 관리' },
      { role: 'OPERATOR', desc: '프로그램/스케줄/시설/강의 관리' },
      { role: 'USER', desc: '학생 (스케줄 조회, 시설 예약, 수강)' },
    ],
  };

  const renderOverview = () => (
    <>
      <SectionHeader
        title="mzc-lp Platform 아키텍처"
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

      {/* LMS 개념 */}
      <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
        <h3 className="font-semibold text-teal-700 mb-2">LMS (Learning Management System) 개념</h3>
        <p className="text-sm text-teal-600 mb-3">
          이 플랫폼 전체가 LMS입니다. 학습 관리의 모든 영역을 포괄합니다.
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded text-center">
            <div className="font-medium text-teal-700">콘텐츠</div>
            <div className="text-gray-500">CMS, LO</div>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <div className="font-medium text-teal-700">강의 운영</div>
            <div className="text-gray-500">CM, TS, IIS</div>
          </div>
          <div className="bg-white p-2 rounded text-center">
            <div className="font-medium text-teal-700">학습 관리</div>
            <div className="text-gray-500">SIS (수강/진도/수료)</div>
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

      {/* 모듈 관계 다이어그램 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">모듈 관계도 (데이터 흐름)</h3>
        <div className="text-xs text-gray-600 space-y-3">
          {/* 1. 컨텐츠 생성 */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500 mb-1">1. 컨텐츠 생성</div>
            <div className="flex items-center justify-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">CMS</span>
              <span>→</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">LO</span>
              <span className="text-gray-400">(자동생성)</span>
            </div>
          </div>
          {/* 2. 강의 구성 & 개설 신청 */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500 mb-1">2. 강의 구성 & 개설 신청 (USER)</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">LO</span>
              <span>→</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">CM</span>
              <span>→</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">CR</span>
              <span>→</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">TS</span>
              <span className="text-gray-400">(PENDING)</span>
            </div>
            <div className="text-gray-400 text-center mt-1">CM이 마스터, CR이 서브 (단방향)</div>
          </div>
          {/* 3. 검토/승인 & 운영 */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500 mb-1">3. 검토/승인 & 운영 (OPERATOR)</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">TS</span>
              <span className="text-gray-400">(APPROVED + 차수생성)</span>
              <span>→</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">IIS</span>
              <span className="text-gray-400">(강사배정)</span>
            </div>
          </div>
          {/* 4. 수강 */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500 mb-1">4. 수강 신청 & 학습 (USER)</div>
            <div className="flex items-center justify-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">CR</span>
              <span className="text-gray-400">(선수강 검증)</span>
              <span>→</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">SIS</span>
              <span className="text-gray-400">(수강/진도/수료)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operator 권한 */}
      <div className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-200">
        <h3 className="font-semibold text-indigo-700 mb-2">Operator 권한</h3>
        <div className="text-xs text-indigo-600 space-y-1">
          <div className="flex justify-between"><span>강의 검토/승인</span><span className="text-indigo-400">PENDING → APPROVED</span></div>
          <div className="flex justify-between"><span>차수 생성/수정/삭제</span><span className="text-indigo-400">CourseTime CRUD</span></div>
          <div className="flex justify-between"><span>강사 배정/변경</span><span className="text-indigo-400">IIS 기록</span></div>
          <div className="flex justify-between"><span>필수 수강 강제 신청</span><span className="text-indigo-400">SIS 기록 (MANDATORY)</span></div>
          <div className="flex justify-between"><span>수강/강사 현황 조회</span><span className="text-indigo-400">SIS/IIS 데이터</span></div>
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
          <li>• USER가 직접 강의 생성 → 자동으로 OWNER 부여</li>
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
              <div>범위: CM (Course) + CR (Relations) + TS (DRAFT)</div>
              <div className="text-orange-600">→ 하나라도 실패 시 전체 롤백</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">2. 차수 생성</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: TS (Time) + Snapshot + Snapshot_Items</div>
              <div className="text-orange-600">→ 스냅샷 생성까지 원자적으로</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">3. 수강 신청</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: SIS (Enrollment) + 정원 체크 + 결제</div>
              <div className="text-orange-600">→ 결제 실패 시 수강 등록 롤백</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">4. 강의 삭제</div>
            <div className="text-gray-600 pl-3 border-l-2 border-orange-300">
              <div>범위: CM + Items + CR + (SIS 체크)</div>
              <div className="text-red-600">⚠ 수강자 있으면 삭제 불가</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edge Case */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Edge Case (경계 조건)
        </h3>
        <div className="space-y-3 text-sm">
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <div className="font-medium text-amber-700 mb-2">수강 신청 Race Condition</div>
            <div className="text-gray-600 space-y-1">
              <div>시나리오: 정원 100명, 현재 99명, 동시에 5명 신청</div>
              <div className="bg-white p-2 rounded mt-2 font-mono text-xs">
                T1: 조회(99) → 판단(OK) → INSERT<br/>
                T2: 조회(99) → 판단(OK) → INSERT<br/>
                결과: 102명 등록 (오류!)
              </div>
              <div className="text-amber-700 mt-2 font-medium">
                해결: SELECT FOR UPDATE 또는 DB 제약조건
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <div className="font-medium text-amber-700 mb-2">강의 삭제 정책 결정 필요</div>
            <div className="text-gray-600 space-y-1">
              <div>수강 중인 학생이 있을 때:</div>
              <div className="pl-3 space-y-1">
                <div>A: 삭제 불가 (차단)</div>
                <div>B: 소프트 삭제 (is_deleted)</div>
                <div>C: 수강 완료 후 삭제 가능</div>
                <div>D: 강제 삭제 + 환불</div>
              </div>
              <div className="text-amber-700 mt-2">→ PO/기획자 확인 필요</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lock 전략 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Lock 전략 (동시성 제어)
        </h3>
        <div className="space-y-3 text-sm">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">비관적 락 (Pessimistic Lock)</div>
            <div className="text-gray-600 pl-3 space-y-1">
              <div>• SELECT FOR UPDATE로 행 잠금</div>
              <div>• 사용: 정원 체크 + 수강 등록</div>
              <div className="text-xs text-gray-400">충돌 가능성 높을 때 사용</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">낙관적 락 (Optimistic Lock)</div>
            <div className="text-gray-600 pl-3 space-y-1">
              <div>• @Version 필드로 충돌 감지</div>
              <div>• 사용: 강의 정보 수정</div>
              <div className="text-xs text-gray-400">충돌 가능성 낮을 때 사용</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">Partial Unique Index</div>
            <div className="text-gray-600 pl-3 space-y-1">
              <div>• DB 레벨 유일성 보장</div>
              <div>• 사용: ACTIVE 상태 수강만 중복 체크</div>
              <div className="bg-gray-800 text-green-400 p-2 rounded text-xs font-mono mt-1">
                WHERE status = 'ACTIVE'
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 흐름 원칙 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">데이터 흐름 원칙</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
            <span className="text-green-600">✓</span>
            <span>마스터 → 서브 방향 (정방향)</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
            <span className="text-green-600">✓</span>
            <span>서브 → 마스터는 조회만</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
            <span className="text-red-600">✗</span>
            <span>양방향 수정 금지 (Deadlock 위험)</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
            <span className="text-blue-600">→</span>
            <span>디테일 변경 시 마스터에서 시작</span>
          </div>
        </div>
      </div>
    </>
  );

  const renderRBAC = () => (
    <>
      <SectionHeader
        title="RBAC 권한 체계"
        subtitle="Role → Authority → Privilege → Resource 4계층 구조"
        color="bg-rose-600"
      />

      {/* 4계층 구조 */}
      <div className="bg-rose-50 rounded-lg p-4 mb-4 border border-rose-200">
        <h3 className="font-semibold text-rose-700 mb-3 flex items-center gap-2">
          <Key className="w-4 h-4" />
          권한 4계층 구조
        </h3>
        <div className="space-y-2 text-sm">
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-rose-700">Role (역할)</div>
            <div className="text-gray-600 pl-3">사용자에게 부여되는 역할</div>
            <div className="text-xs text-gray-400 pl-3">예: TENANT_ADMIN, OPERATOR, USER</div>
          </div>
          <div className="flex justify-center">
            <span className="text-rose-400">▼ (1:N)</span>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-rose-700">Authority (권한 그룹)</div>
            <div className="text-gray-600 pl-3">Role에 부여되는 권한 그룹</div>
            <div className="text-xs text-gray-400 pl-3">예: COURSE_MANAGE, USER_MANAGE</div>
          </div>
          <div className="flex justify-center">
            <span className="text-rose-400">▼ (1:N)</span>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-rose-700">Privilege (동작)</div>
            <div className="text-gray-600 pl-3">실제 수행 가능한 동작</div>
            <div className="text-xs text-gray-400 pl-3">예: course:create, course:approve</div>
          </div>
          <div className="flex justify-center">
            <span className="text-rose-400">▼ (적용 대상)</span>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="font-medium text-rose-700">Resource (리소스)</div>
            <div className="text-gray-600 pl-3">권한이 적용되는 대상 데이터</div>
            <div className="text-xs text-gray-400 pl-3">예: 특정 강의, 특정 테넌트</div>
          </div>
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
              <div>• USER - 일반 (B2C)</div>
              <div>• MEMBER - 학습자 (B2B)</div>
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <div className="font-medium text-amber-700 mb-2">CourseRole (강의별)</div>
            <div className="space-y-1 text-amber-600">
              <div>• OWNER - 강의 소유자</div>
              <div>• INSTRUCTOR - 강사</div>
              <div className="text-xs text-gray-400 mt-2">※ 강의 생성 시 자동 부여</div>
              <div className="text-xs text-gray-400">※ TenantRole과 별도 관리</div>
            </div>
          </div>
        </div>
      </div>

      {/* 역할별 권한 매핑 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">역할별 권한 매핑</h3>
        <div className="space-y-3 text-xs">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">TENANT_ADMIN</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded">*:*</span>
              <span className="text-gray-400">(전체 권한)</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">OPERATOR</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">course:approve</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">course:reject</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">time:create</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">time:update</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">instructor:assign</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">enrollment:force</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">USER</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">course:create</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">enrollment:self</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">progress:update</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">OWNER (강의별)</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">course:edit</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">course:delete</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">instructor:invite</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded">revenue:view</span>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-2">MEMBER (B2B)</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">enrollment:self</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">progress:update</span>
              <span className="text-gray-400">(수강만 가능)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 리소스 접근 통제 */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          리소스 접근 통제 (Data Access Control)
        </h3>
        <div className="space-y-2 text-sm">
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">소유자 규칙</div>
            <div className="text-gray-600 space-y-1 pl-3">
              <div>• Course: OWNER만 삭제 가능</div>
              <div>• Content: 생성자만 삭제 가능</div>
              <div className="text-rose-600">• 예외: TENANT_ADMIN은 모두 가능</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">테넌트 격리</div>
            <div className="text-gray-600 space-y-1 pl-3">
              <div>• 모든 조회/수정에 tenant_id 필터 자동 적용</div>
              <div>• 크로스 테넌트 접근 불가</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="font-medium text-gray-700 mb-1">상태 기반 제한</div>
            <div className="text-gray-600 space-y-1 pl-3">
              <div>• APPROVED 강의: 직접 수정 불가 (새 버전 생성)</div>
              <div>• COMPLETED 수강: 삭제 불가</div>
              <div>• IN_PROGRESS 차수: 삭제 불가</div>
            </div>
          </div>
        </div>
      </div>

      {/* 슈퍼 어드민 vs 테넌트 어드민 */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">관리자 역할 분리</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-gray-800 text-white p-3 rounded">
            <div className="font-medium mb-2">SYSTEM_ADMIN</div>
            <div className="space-y-1 text-gray-300">
              <div>• 전체 시스템 관리</div>
              <div>• 테넌트 생성/삭제</div>
              <div>• 전역 설정</div>
              <div className="text-amber-400">⚠ 테넌트 업무 직접 처리 X</div>
            </div>
          </div>
          <div className="bg-blue-600 text-white p-3 rounded">
            <div className="font-medium mb-2">TENANT_ADMIN</div>
            <div className="space-y-1 text-blue-100">
              <div>• 해당 테넌트만 관리</div>
              <div>• 브랜딩/설정</div>
              <div>• 사용자/강의 관리</div>
              <div>• 통계/리포트</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'modules': return renderModules();
      case 'transaction': return renderTransaction();
      case 'rbac': return renderRBAC();
      case 'b2c': return renderB2C();
      case 'b2b': return renderB2B();
      case 'kpop': return renderKpop();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">mzc-lp Architecture</h1>
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

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-white p-1 rounded-lg shadow-sm overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? `${tab.color} text-white`
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          {renderContent()}
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center text-xs text-gray-400">
          각 모듈 클릭 시 세부 항목 확인 | mzc-lp docs 기반
        </div>
      </div>
    </div>
  );
}