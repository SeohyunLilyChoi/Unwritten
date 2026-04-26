// Shared phone shell, bottom nav, data, and mock content

const MOCK = {
  today: {
    date: "2026년 4월 20일 월요일",
    greeting: "오늘의 고민은 무엇인가요?",
  },
  question: {
    title: "출근 시간 효율적인 관리",
    body: "출근시간을 더 효율적으로 쓰고 싶어요. 특히 아침에 정신없이 준비하느라 지치는데, 어떻게 하면 좋을까요?",
    askedAt: "오후 2:14",
  },
  ai: {
    headline: "핵심은 전날 밤 준비에요.",
    body: "출근 시간을 효율적으로 관리하려면 **전날 밤 준비**를 미리 해두는 것이 핵심이에요. 복장, 가방, 아침 식사 등 루틴을 간소화하면 아침의 인지적 부담을 덜 수 있습니다.",
    basis: "콘텐츠 8건 · 커뮤니티 124건을 분석했어요",
    takeaways: [
      "전날 밤에 복장·가방·식사를 미리 준비",
      "아침 루틴은 30분 이내로 압축",
      "정신적 의사결정을 최소화하는 게 핵심",
    ],
  },
  data: {
    title: "‘전날 준비’ 실천 비율",
    subtitle: "현직자 1,248명 응답",
    // base = 연차별 전체 (직군: 전체)
    bars: [
      { label: "1–3년차", value: 80, highlight: true },
      { label: "4–6년차", value: 45 },
      { label: "7–10년차", value: 32 },
    ],
  },
  // My profile — 사용자의 연차·직군 (필터 기본값에 사용)
  me: { years: "1-3", job: "marketing", yearsLabel: "3년차", jobLabel: "마케팅" },
  // 필터 옵션
  filters: {
    years: [
      { id: "all", label: "전체 연차" },
      { id: "1-3", label: "1–3년차" },
      { id: "4-6", label: "4–6년차" },
      { id: "7-10", label: "7–10년차" },
    ],
    jobs: [
      { id: "all", label: "전체 직군" },
      { id: "marketing", label: "마케팅" },
      { id: "dev", label: "개발" },
      { id: "plan", label: "기획" },
      { id: "design", label: "디자인" },
      { id: "sales", label: "영업" },
      { id: "hr", label: "인사" },
    ],
  },
  // 연차×직군 격자 (퍼센트). 직군='all' = 전 직군 평균
  dataMatrix: {
    "all":       { "1-3": 80, "4-6": 45, "7-10": 32, "overall": 58, "n": 1248 },
    "marketing": { "1-3": 85, "4-6": 52, "7-10": 38, "overall": 64, "n": 182 },
    "dev":       { "1-3": 72, "4-6": 41, "7-10": 28, "overall": 51, "n": 246 },
    "plan":      { "1-3": 78, "4-6": 48, "7-10": 35, "overall": 58, "n": 164 },
    "design":    { "1-3": 81, "4-6": 44, "7-10": 30, "overall": 55, "n": 121 },
    "sales":     { "1-3": 88, "4-6": 58, "7-10": 42, "overall": 67, "n": 198 },
    "hr":        { "1-3": 75, "4-6": 47, "7-10": 33, "overall": 55, "n":  98 },
  },
  community: [
    {
      title: "아침에 30분 벌기 챌린지 — 저는 이렇게 해요",
      preview: "전날 자기 전에 옷, 파우치, 사원증까지 다 현관 앞에 세팅해둡니다. 아침 고민이 사라져서 마음이 훨씬 편해요…",
      role: "마케팅 · 3년차",
      likes: 128,
      comments: 24,
    },
    {
      title: "아침형 인간이 아닌데 9시 출근이 힘들어요",
      preview: "매일 아침마다 전쟁입니다. 저녁형 인간도 적응할 수 있는 방법이 있을까요? 선배님들 노하우 공유 부탁…",
      role: "개발 · 1년차",
      likes: 92,
      comments: 41,
    },
    {
      title: "점심시간 쪼개 쓰는 법",
      preview: "1시간 점심에 운동/공부/낮잠까지 하는 분들 있으세요? 어떻게 구성하시는지 궁금합니다.",
      role: "기획 · 5년차",
      likes: 56,
      comments: 18,
    },
  ],
  suggestions: [
    "연차 쓸 때 눈치 보여요",
    "팀장님께 보고 잘 하는 법",
    "회식 자리 적당히 빠지는 법",
    "연봉 협상 처음인데",
  ],
  recentThreads: [
    { title: "출근 시간 효율적인 관리", when: "방금" },
    { title: "주간 보고 깔끔하게 쓰기", when: "어제" },
    { title: "1on1 미팅 잘 활용하기", when: "3일 전" },
  ],
  // AI가 자동 분류한 주제 그룹 (Method 1: 목록뷰)
  topicGroups: [
    {
      id: "time",
      emoji: "⏱",
      title: "시간·루틴 관리",
      summary: "출근 전/후 루틴, 집중 시간 확보, 일정 관리",
      color: "#3B5BFF",
      count: 5,
      items: [
        { title: "출근 시간 효율적인 관리", excerpt: "핵심은 전날 밤 준비에요.", when: "방금", active: true },
        { title: "집중이 안 되는 오후 2시", excerpt: "12분 쉬고 28분 집중이 가장 많이 쓰는 패턴이에요.", when: "오늘" },
        { title: "주간 보고 깔끔하게 쓰기", excerpt: "결론·근거·다음주 계획 3단 구조로.", when: "어제" },
        { title: "점심시간 쪼개 쓰기", excerpt: "운동 20분 + 리셋 15분이 최다 선택.", when: "3일 전" },
        { title: "야근 줄이는 체크리스트", excerpt: "오후 4시 '오늘 못 끝낼 일' 점검이 핵심.", when: "지난주" },
      ],
    },
    {
      id: "comm",
      emoji: "💬",
      title: "커뮤니케이션",
      summary: "보고, 1on1, 피드백, 거절·요청하는 법",
      color: "#7A5BFF",
      count: 4,
      items: [
        { title: "1on1 미팅 잘 활용하기", excerpt: "질문 3개를 미리 준비해가면 밀도가 달라져요.", when: "3일 전" },
        { title: "팀장님께 보고 잘 하는 법", excerpt: "문제·원인·제안 순서를 고정하세요.", when: "지난주" },
        { title: "불편한 피드백 전달하기", excerpt: "상황·영향·요청(SBI) 프레임이 제일 안전해요.", when: "2주 전" },
        { title: "회의에서 말 꺼내는 타이밍", excerpt: "첫 10분 안에 한 번은 입을 떼두세요.", when: "3주 전" },
      ],
    },
    {
      id: "career",
      emoji: "📈",
      title: "커리어·성장",
      summary: "이직 고민, 연봉 협상, 커리어 피벗",
      color: "#16A34A",
      count: 3,
      items: [
        { title: "연봉 협상 처음인데", excerpt: "시장가 근거 2가지 + 희망 범위 1가지로.", when: "어제" },
        { title: "3년차 이직 타이밍", excerpt: "스킬 곡선이 완만해졌을 때가 신호.", when: "지난주" },
        { title: "사이드 프로젝트와 본업 균형", excerpt: "주 5시간·주말 1일 룰이 가장 지속 가능.", when: "2주 전" },
      ],
    },
    {
      id: "culture",
      emoji: "🤝",
      title: "조직문화·관계",
      summary: "회식, 사내 정치, 동료 관계, 익명 피드백",
      color: "#D97757",
      count: 2,
      items: [
        { title: "회식 자리 적당히 빠지는 법", excerpt: "1차는 끝까지, 2차는 일찍 빠지는 편이 안전.", when: "지난주" },
        { title: "팀 안에서 '무난한' 거리 유지", excerpt: "점심 1 : 잡담 1 : 침묵 1의 비율.", when: "3주 전" },
      ],
    },
    {
      id: "leave",
      emoji: "🌴",
      title: "휴가·복지",
      summary: "연차, 재택, 복지 포인트 사용",
      color: "#0EA5E9",
      count: 2,
      items: [
        { title: "연차 쓸 때 눈치 보여요", excerpt: "2주 전 공유 + 인수인계 1문서 = 무난.", when: "오늘" },
        { title: "재택 첫 주 루틴 세팅", excerpt: "출근 복장 + 외출 산책이 의외로 핵심.", when: "2주 전" },
      ],
    },
  ],
  // Method 2용 카테고리 (홈 상단 필터 칩)
  categoryChips: [
    { id:"all", label:"전체", count: 16 },
    { id:"time", label:"⏱ 시간·루틴", count: 5 },
    { id:"comm", label:"💬 커뮤니케이션", count: 4 },
    { id:"career", label:"📈 커리어", count: 3 },
    { id:"culture", label:"🤝 조직문화", count: 2 },
    { id:"leave", label:"🌴 휴가·복지", count: 2 },
  ],
};

// Bottom tab bar
function TabBar({active="질문"}){
  const tabs = [
    { key:"질문", Ic: Ico.Chat },
    { key:"콘텐츠", Ic: Ico.Grid },
    { key:"커뮤니티", Ic: Ico.People },
    { key:"마이", Ic: Ico.User },
  ];
  return (
    <nav style={{
      position:'absolute', left:0, right:0, bottom:0,
      background:'rgba(255,255,255,.96)',
      backdropFilter:'blur(12px)',
      borderTop:'1px solid var(--line)',
      paddingBottom:'calc(env(safe-area-inset-bottom, 0px) + 8px)',
      paddingTop:10,
      display:'flex', justifyContent:'space-around',
      zIndex:20,
    }}>
      {tabs.map(t => {
        const on = t.key===active;
        return (
          <button key={t.key} style={{
            background:'none', border:'none', padding:'4px 10px',
            display:'flex', flexDirection:'column', alignItems:'center', gap:4,
            color: on? 'var(--brand)' : 'var(--muted-2)',
            cursor:'pointer',
          }}>
            <t.Ic s={22} c={on?'var(--brand)':'#9AA1AE'} />
            <span style={{fontSize:15, fontWeight: on? 700 : 500, letterSpacing:'-.01em'}}>{t.key}</span>
          </button>
        );
      })}
    </nav>
  );
}

// Mobile viewport — 390 × 780 (pure, no device bezel)
function Phone({label, sub, children, tone="light"}){
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:14}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:15, fontWeight:700, color:'#0B0E14', letterSpacing:'-.01em'}}>{label}</div>
        <div style={{fontSize:15.5, color:'#6B7280', marginTop:3, maxWidth:360}}>{sub}</div>
      </div>
      <div style={{
        width:390, height:800,
        position:'relative', overflow:'hidden',
        background: tone==='dark' ? '#0B0E14' : 'var(--bg)',
        borderRadius:28,
        boxShadow:'0 30px 60px -20px rgba(11,14,20,.18), 0 2px 6px rgba(11,14,20,.06)',
        border:'1px solid rgba(11,14,20,.06)',
      }}>
        <StatusBar tone={tone} />
        {children}
      </div>
    </div>
  );
}

function StatusBar({tone='light'}){
  const c = tone==='dark' ? '#F5F6F8' : '#0B0E14';
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, height:44,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 22px',
      fontSize:15, fontWeight:600, color:c, zIndex:30,
      pointerEvents:'none',
    }}>
      <span style={{letterSpacing:'-.01em'}}>9:41</span>
      <span style={{display:'inline-flex', alignItems:'center', gap:5}}>
        <svg width="17" height="11" viewBox="0 0 17 11"><path d="M1 6l2-2 2 2 2-3 2 3 2-4 2 4 2-5 2 5" stroke={c} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}><path d="M11 1a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM2 4h2v4H2zm3-1h2v5H5zm3-2h2v6H8z"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x=".5" y=".5" width="20" height="10" rx="2.5" fill="none" stroke={c} opacity=".5"/><rect x="2" y="2" width="15" height="7" rx="1.2" fill={c}/><rect x="21" y="3.5" width="1.5" height="4" rx=".5" fill={c} opacity=".5"/></svg>
      </span>
    </div>
  );
}

// Small bar chart — sleek, animated width
function StatBars({bars, accent="var(--brand)"}){
  return (
    <div style={{display:'flex', flexDirection:'column', gap:10}}>
      {bars.map((b,i)=>(
        <div key={i} style={{display:'grid', gridTemplateColumns:'64px 1fr 40px', alignItems:'center', gap:12}}>
          <div style={{fontSize:15.5, color:'var(--ink-2)', fontWeight: b.highlight?700:500}}>{b.label}</div>
          <div style={{height:8, background:'var(--line-2)', borderRadius:99, overflow:'hidden'}}>
            <div style={{
              width:`${b.value}%`, height:'100%',
              background: b.highlight ? accent : 'rgba(11,14,20,.22)',
              borderRadius:99,
            }}/>
          </div>
          <div style={{fontSize:15.5, color: b.highlight?'var(--ink)':'var(--muted)', fontWeight: b.highlight?700:500, textAlign:'right', fontVariantNumeric:'tabular-nums'}}>{b.value}%</div>
        </div>
      ))}
    </div>
  );
}

// Community preview card
function CommunityRow({item, variant="default"}){
  return (
    <div style={{padding:'14px 0', borderBottom:'1px solid var(--line-2)'}}>
      <div style={{fontSize:14, fontWeight:700, color:'var(--ink)', marginBottom:5, letterSpacing:'-.015em', lineHeight:1.35}}>{item.title}</div>
      <div style={{fontSize:13, color:'var(--muted)', lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{item.preview}</div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginTop:8, fontSize:12.5, color:'var(--muted-2)'}}>
        <span>{item.role}</span>
        <span style={{width:3, height:3, background:'var(--muted-2)', borderRadius:99}}/>
        <span style={{display:'inline-flex', alignItems:'center', gap:3}}><Ico.Heart s={12}/> {item.likes}</span>
        <span style={{display:'inline-flex', alignItems:'center', gap:3}}><Ico.Comment s={12}/> {item.comments}</span>
      </div>
    </div>
  );
}

window.MOCK = MOCK;
window.TabBar = TabBar;
window.Phone = Phone;
window.StatusBar = StatusBar;
window.StatBars = StatBars;
window.CommunityRow = CommunityRow;

// ---- Data filter ---------------------------------------------------------
// Returns a derived "view" of the data given (years, job) selection.
function deriveDataView({years, job}){
  const m = MOCK.dataMatrix;
  const jobRow = m[job] || m["all"];
  const yearsList = ["1-3","4-6","7-10"];
  const bars = yearsList.map(y => {
    const label = ({"1-3":"1–3년차","4-6":"4–6년차","7-10":"7–10년차"})[y];
    return { label, value: jobRow[y], highlight: (years === y) };
  });
  // 대표 수치 = 선택된 셀, 없으면 전체 평균
  const featured = (years!=='all') ? jobRow[years] : jobRow.overall;
  const jobLabel = MOCK.filters.jobs.find(j=>j.id===job)?.label || "전체 직군";
  const yearsLabel = MOCK.filters.years.find(y=>y.id===years)?.label || "전체 연차";
  return { bars, featured, n: jobRow.n, jobLabel, yearsLabel };
}

// Filter chip row — compact, scrollable
function FilterChips({value, options, onChange, variant="light"}){
  const pal = variant==='light' ? {
    on:'#0B0E14', onText:'#FFF', off:'#FFF', offText:'#2C3240', border:'#E8EAEF',
  } : {
    on:'#3B5BFF', onText:'#FFF', off:'transparent', offText:'#2C3240', border:'#E8EAEF',
  };
  return (
    <div style={{display:'flex', gap:6, overflowX:'auto', scrollbarWidth:'none'}}>
      {options.map(o => {
        const on = o.id === value;
        return (
          <button key={o.id} onClick={()=>onChange(o.id)} style={{
            flexShrink:0, padding:'6px 10px', borderRadius:99,
            fontSize:12.5, fontWeight:600, whiteSpace:'nowrap', cursor:'pointer',
            border:`1px solid ${on ? pal.on : pal.border}`,
            background: on ? pal.on : pal.off,
            color: on ? pal.onText : pal.offText,
            letterSpacing:'-.01em',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// "내 프로필과 같게" 퀵 액션
function MeShortcut({onApply, years, job}){
  const me = MOCK.me;
  const active = years === me.years && job === me.job;
  return (
    <button onClick={()=>onApply(me.years, me.job)} style={{
      display:'inline-flex', alignItems:'center', gap:6,
      background: active ? 'var(--brand-soft)' : '#FFF',
      border: `1px solid ${active ? '#C9D1FF' : 'var(--line)'}`,
      color: active ? 'var(--brand)' : 'var(--ink-2)',
      padding:'5px 10px', borderRadius:99,
      fontSize:15.5, fontWeight:600, whiteSpace:'nowrap', cursor:'pointer',
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c0-4 3.5-6 7.5-6s7.5 2 7.5 6"/>
      </svg>
      내 프로필 ({me.jobLabel}·{me.yearsLabel})
    </button>
  );
}

window.deriveDataView = deriveDataView;
window.FilterChips = FilterChips;
window.MeShortcut = MeShortcut;
