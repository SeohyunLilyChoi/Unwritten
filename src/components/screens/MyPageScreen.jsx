const MENU_ITEMS = [
  { label: '내가 쓴 글', icon: '📝' },
  { label: '스크랩한 콘텐츠', icon: '🔖' },
  { label: '포인트 내역', icon: '💰' },
  { label: '알림 설정', icon: '🔔' },
  { label: '앱 정보', icon: 'ℹ️' },
  { label: '로그아웃', icon: '🚪', danger: true },
]

export default function MyPageScreen() {
  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5">
        <h1 className="text-xl font-bold text-gray-900">마이페이지</h1>
      </div>

      {/* 프로필 */}
      <div className="mx-5 bg-gray-50 rounded-2xl p-4 flex items-center justify-between mb-5">
        <div>
          <p className="text-base font-bold text-gray-900">기획직 · 3년차</p>
          <p className="text-sm text-gray-400 mt-0.5">lily_choi7@snu.ac.kr</p>
        </div>
        <button className="text-xs font-medium text-brand-blue bg-brand-blue-light px-3 py-1.5 rounded-full">
          프로필 수정
        </button>
      </div>

      {/* 활동 요약 */}
      <div className="mx-5 grid grid-cols-3 gap-3 mb-5">
        {[
          { label: '포인트', value: '1,240' },
          { label: '쓴 글', value: '12' },
          { label: '채택 답변', value: '3' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* 인사이트 카드 */}
      <div className="mx-5 bg-brand-blue-light rounded-2xl px-4 py-3 mb-5">
        <p className="text-xs font-semibold text-brand-blue mb-1">나의 활동 인사이트</p>
        <p className="text-sm text-gray-700">당신은 주로 <strong>조직문화</strong> 관련 질문을 많이 해요.</p>
      </div>

      {/* 메뉴 */}
      <div className="mx-5 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        {MENU_ITEMS.map(({ label, icon, danger }, i) => (
          <button
            key={label}
            className={`w-full flex items-center justify-between px-4 py-4 text-sm font-medium border-b last:border-b-0 border-gray-50 hover:bg-gray-50 active:bg-gray-100 ${
              danger ? 'text-red-400' : 'text-gray-700'
            }`}
          >
            <span className="flex items-center gap-3">
              <span>{icon}</span>
              {label}
            </span>
            {!danger && (
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="h-10" />
    </div>
  )
}
