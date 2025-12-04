import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Building2, Users, GraduationCap, Music, Layers, BookOpen, UserCheck, FileText, MessageSquare, User, Globe, CreditCard, Search, Tent, Video, Calendar, Target } from 'lucide-react';

const ModuleCard = ({ title, icon: Icon, items, color, isOpen, onToggle }) => (
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

const SectionHeader = ({ title, subtitle, color }) => (
  <div className={`${color} rounded-lg p-4 mb-4`}>
    <h2 className="text-lg font-bold text-white">{title}</h2>
    <p className="text-sm text-white/80">{subtitle}</p>
  </div>
);

export default function LMSArchitecture() {
  const [activeTab, setActiveTab] = useState('core');
  const [openModules, setOpenModules] = useState({});

  const toggleModule = (id) => {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: 'core', label: 'Core Engine', color: 'bg-slate-700' },
    { id: 'b2b', label: 'B2B 확장', color: 'bg-blue-600' },
    { id: 'b2c', label: 'B2C 확장', color: 'bg-emerald-600' },
    { id: 'kpop', label: 'K-Pop 확장', color: 'bg-purple-600' },
  ];

  const coreModules = [
    { id: 'course', title: 'Course (코스/과정)', icon: BookOpen, color: 'border-slate-300 bg-slate-50',
      items: ['기본 정보 (제목, 설명, 썸네일)', '기간 설정', '카테고리', '버전 관리 옵션 (업데이트 vs 버저닝)'] },
    { id: 'curriculum', title: 'Curriculum (차시/커리큘럼)', icon: Layers, color: 'border-slate-300 bg-slate-50',
      items: ['차시 순서 (드래그 정렬)', '콘텐츠 타입 (영상, 문서, 과제 등)', '공개/비공개 설정'] },
    { id: 'enrollment', title: 'Enrollment (입과/수강)', icon: UserCheck, color: 'border-slate-300 bg-slate-50',
      items: ['수강생 관리', '진도 추적', '수료 조건'] },
    { id: 'content', title: 'Content (콘텐츠)', icon: FileText, color: 'border-slate-300 bg-slate-50',
      items: ['영상 플레이어', '문서 뷰어', '과제 제출'] },
    { id: 'feedback', title: 'Feedback (피드백)', icon: MessageSquare, color: 'border-slate-300 bg-slate-50',
      items: ['댓글/Q&A', '과제 피드백', '1:1 피드백 (영상)'] },
    { id: 'user', title: 'User (사용자)', icon: User, color: 'border-slate-300 bg-slate-50',
      items: ['프로필', '역할 (학습자/강사/관리자)', '권한'] },
  ];

  const b2bModules = [
    { id: 'tenant', title: 'Tenant (테넌트)', icon: Database, color: 'border-blue-300 bg-blue-50',
      items: ['테넌트 생성/관리', '도메인 매핑 (lotte.lms.com)', '테마 설정 (다크/라이트, 포인트컬러)', '기능 ON/OFF (Tenant Admin)'] },
    { id: 'org', title: 'Organization (조직)', icon: Building2, color: 'border-blue-300 bg-blue-50',
      items: ['부서/팀 구조', '직급/직책', '일괄 입과 (엑셀 업로드)'] },
    { id: 'analytics', title: 'Analytics (리포트)', icon: Target, color: 'border-blue-300 bg-blue-50',
      items: ['부서별 수료율', '의무교육 이수현황', '대시보드'] },
  ];

  const b2cModules = [
    { id: 'instructor', title: 'Instructor (강사)', icon: GraduationCap, color: 'border-emerald-300 bg-emerald-50',
      items: ['강사 프로필/포트폴리오', '강의 등록 심사', '수익 정산'] },
    { id: 'payment', title: 'Payment (결제)', icon: CreditCard, color: 'border-emerald-300 bg-emerald-50',
      items: ['강의별 가격', '쿠폰/할인', '환불 정책', 'PG 연동'] },
    { id: 'discovery', title: 'Discovery (탐색)', icon: Search, color: 'border-emerald-300 bg-emerald-50',
      items: ['카테고리 브라우징', '검색/필터', '추천 알고리즘', '리뷰/평점'] },
    { id: 'landing', title: 'Landing (랜딩)', icon: Globe, color: 'border-emerald-300 bg-emerald-50',
      items: ['메인 페이지', '강의 상세 페이지 (비로그인)', '강사 소개 페이지'] },
  ];

  const kpopModules = [
    { id: 'promo', title: 'Promotion Site (홍보)', icon: Globe, color: 'border-purple-300 bg-purple-50',
      items: ['캠프 소개 (다국어)', '프로그램 안내', '신청서 폼', '결제 (캠프비)'], badge: '별도 앱' },
    { id: 'camp', title: 'Camp (캠프 운영)', icon: Tent, color: 'border-purple-300 bg-purple-50',
      items: ['일정표/스케줄', '팀 편성 (5인 1조)', '트레이너 배정', '실시간 사진/영상 업로드'] },
    { id: 'subscription', title: 'Subscription (구독)', icon: CreditCard, color: 'border-purple-300 bg-purple-50',
      items: ['플랜 관리 (횟수권/연회비)', '피드백 크레딧', '갱신/해지'] },
    { id: 'videofb', title: 'Video Feedback (영상 피드백)', icon: Video, color: 'border-purple-300 bg-purple-50',
      items: ['학생 영상 업로드', '강사 피드백 (타임스탬프 코멘트)', '피드백 히스토리'] },
    { id: 'booking', title: 'Booking (예약)', icon: Calendar, color: 'border-purple-300 bg-purple-50',
      items: ['강사 스케줄', '레슨 예약', '알림'], badge: '입시반용' },
  ];

  const renderModules = () => {
    switch(activeTab) {
      case 'core':
        return (
          <>
            <SectionHeader 
              title="Core LMS Engine" 
              subtitle="모든 모드에서 공유하는 핵심 모듈"
              color="bg-slate-700"
            />
            <div className="grid gap-3">
              {coreModules.map(m => (
                <ModuleCard key={m.id} {...m} isOpen={openModules[m.id]} onToggle={() => toggleModule(m.id)} />
              ))}
            </div>
          </>
        );
      case 'b2b':
        return (
          <>
            <SectionHeader 
              title="B2B Extensions" 
              subtitle="기업용 LMS 전용 모듈 (테넌트 구분)"
              color="bg-blue-600"
            />
            <div className="grid gap-3">
              {b2bModules.map(m => (
                <ModuleCard key={m.id} {...m} isOpen={openModules[m.id]} onToggle={() => toggleModule(m.id)} />
              ))}
            </div>
          </>
        );
      case 'b2c':
        return (
          <>
            <SectionHeader 
              title="B2C Extensions" 
              subtitle="오픈 캠퍼스 전용 모듈 (인프런 스타일)"
              color="bg-emerald-600"
            />
            <div className="grid gap-3">
              {b2cModules.map(m => (
                <ModuleCard key={m.id} {...m} isOpen={openModules[m.id]} onToggle={() => toggleModule(m.id)} />
              ))}
            </div>
          </>
        );
      case 'kpop':
        return (
          <>
            <SectionHeader 
              title="K-Pop Academy Extensions" 
              subtitle="K-Pop 체험 아카데미 전용 모듈"
              color="bg-purple-600"
            />
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">LMS Architecture</h1>
          <p className="text-sm text-gray-500">하나의 Core Engine + 모드별 확장 모듈</p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Core LMS Engine
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-xs font-medium">B2B</div>
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded text-xs font-medium">B2C</div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded text-xs font-medium">K-Pop</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-white p-1 rounded-lg shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
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
          {renderModules()}
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center text-xs text-gray-400">
          각 모듈 클릭 시 세부 항목 확인
        </div>
      </div>
    </div>
  );
}
