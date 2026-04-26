// Community page — AI-bundled Q&A feed
// 핵심 개념: 비슷한 질문이 AI에 의해 묶여 하나의 "스레드"가 됨.
// 설계 원칙:
//   1. 병합 시각화 — "N개 → AI → 요약" 흐름을 한눈에
//   2. AI 요약은 명확히 AI-generated 느낌
//   3. 의견에 직군/연차 맥락 부여
//   4. 탭에 활성도 표시
//   5. FAB 글쓰기 버튼

const CM_TABS = [
  { id:'hot',     label:'🔥 핫이슈',    count: 12 },
  { id:'office',  label:'회사생활',     count: 48 },
  { id:'skill',   label:'업무스킬',     count: 31 },
  { id:'career',  label:'커리어',       count: 24 },
  { id:'money',   label:'돈·협상',      count: 9  },
];

const CM_THREADS = [
  {
    id: 'th-1',
    merged: 1248,
    tag: '#휴가',
    hot: true,
    question: '연차 상신할 때 사유, 뭐라고 적는 게 베스트인가요?',
    aiSummary: '대부분의 기업에서는 "개인 사유" 또는 "개인 용무"로 기재하는 것이 표준입니다. 구체적인 사유를 묻는 것은 점차 지양되는 추세이나, 보수적인 조직이라면 "은행 업무", "병원 진료" 등 포괄적인 목적을 적는 것을 추천합니다.',
    aiTags: ['#개인사유 압도적', '#회사 문화 따라다름', '#신입일수록 눈치'],
    topAnswer: '무조건 개인사유죠. 반려당한 적 한 번도 없어요.',
    opinions: [
      { role:'개발', year:'3년차', stance:'공감', color:'#3B5BFF', bg:'#EEF1FF', text:'무조건 개인사유죠. 반려당한 적 한 번도 없어요.' },
      { role:'기획', year:'1년차', stance:'반대', color:'#EF4444', bg:'#FFF0F0', text:'저희 팀장님은 꼬치꼬치 캐물으셔서 적당히 병원간다고 해요 ㅠㅠ' },
      { role:'마케팅', year:'5년차', stance:'추가', color:'#16A34A', bg:'#E7F6EC', text:'팀 분위기를 보는 게 맞는 것 같아요. 스타트업이냐 대기업이냐에 따라 달라서요.' },
    ],
    likeCount: 2147,
    commentCount: 384,
    viewCount: '8.4만',
  },
  {
    id: 'th-2',
    merged: 856,
    tag: '#인간관계',
    hot: false,
    question: '점심시간에 혼자 밥 먹고 싶은데, 눈치 보이나요?',
    aiSummary: '직장 내 점심 문화는 세대·조직·업종에 따라 크게 다릅니다. 최근 조사에서 직장인 58%는 "혼밥이 자연스럽다"고 응답했으며, 특히 IT·스타트업 계열이 높았습니다. 단, 새 팀 합류 직후 1~2주는 관계 형성 차원에서 함께하는 편이 유리하다는 의견이 많아요.',
    aiTags: ['#업종따라 다름', '#신입은 처음엔 함께', '#IT계열 혼밥 자유로움'],
    opinions: [
      { role:'개발', year:'4년차', stance:'공감', color:'#3B5BFF', bg:'#EEF1FF', text:'저는 혼밥하면서 유튜브 보는 게 소확행이에요. 눈치 1도 안 봐요.' },
      { role:'영업', year:'2년차', stance:'반대', color:'#EF4444', bg:'#FFF0F0', text:'영업팀은 아직도 다 같이 먹는 분위기라 혼자 나가면 어색해요...' },
    ],
    likeCount: 1284,
    commentCount: 217,
    viewCount: '3.1만',
  },
  {
    id: 'th-3',
    merged: 612,
    tag: '#보고',
    hot: false,
    question: '주간 보고 어떻게 쓰는 게 깔끔한가요?',
    aiSummary: '"완료한 것 → 진행 중인 것 → 다음 주 계획" 3단 구조가 가장 많이 쓰입니다. 분량은 A4 반 장~한 장, 숫자로 성과를 표현하면 더 좋습니다. 팀장이 10초 안에 파악할 수 있어야 좋은 보고예요.',
    aiTags: ['#3단구조 표준', '#숫자로 말하기', '#핵심만 간결하게'],
    opinions: [
      { role:'기획', year:'3년차', stance:'공감', color:'#3B5BFF', bg:'#EEF1FF', text:'완료/진행중/다음주 3단 구조가 제일 깔끔해요. 볼드로 항목 강조도 추가.' },
      { role:'인사', year:'6년차', stance:'추가', color:'#16A34A', bg:'#E7F6EC', text:'팀장마다 선호가 달라서 처음엔 기존 보고 포맷 보여달라고 하세요.' },
    ],
    likeCount: 932,
    commentCount: 156,
    viewCount: '2.2만',
  },
];

const CM_TRENDING = [
  { tag:'#연봉협상', count: 842 },
  { tag:'#퇴직금', count: 614 },
  { tag:'#재택근무', count: 527 },
  { tag:'#팀장관계', count: 441 },
];

// ── Main component ──────────────────────────────────────────────────────────
function CommunityPage(){
  const [tab, setTab] = React.useState('hot');
  const [expanded, setExpanded] = React.useState({'th-1': true});
  const toggleExpand = id => setExpanded(e => ({...e, [id]: !e[id]}));

  return (
    <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', paddingTop:44, background:'var(--bg)'}}>
      {/* Header — unified */}
      <header style={{padding:'14px 20px 10px'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            <div style={{fontSize:20, fontWeight:800, letterSpacing:'-.03em', color:'var(--ink)'}}>unwritten</div>
            <div style={{width:5, height:5, background:'var(--brand)', borderRadius:99}}/>
          </div>
          <button style={{
            width:34, height:34, borderRadius:10, border:'1px solid var(--line)', background:'#fff',
            display:'inline-flex', alignItems:'center', justifyContent:'center', color:'var(--ink-2)', cursor:'pointer',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div style={{display:'flex', gap:0, overflowX:'auto', scrollbarWidth:'none', borderBottom:'1px solid var(--line-2)', padding:'2px 20px 0'}}>
        {CM_TABS.map(t => {
          const on = tab === t.id;
          return (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              flexShrink:0, background:'none', border:'none', cursor:'pointer',
              padding:'9px 10px 8px',
              fontSize:15.5, fontWeight: on?700:500,
              color: on?'var(--ink)':'var(--muted)',
              borderBottom: on?'2px solid var(--ink)':'2px solid transparent',
              display:'inline-flex', alignItems:'center', gap:5,
              letterSpacing:'-.01em', whiteSpace:'nowrap',
            }}>
              {t.label}
              {t.count > 0 && (
                <span style={{
                  fontSize:10, fontWeight:700,
                  color: on?'var(--brand)':'var(--muted-2)',
                  background: on?'var(--brand-soft)':'var(--line-2)',
                  padding:'1px 5px', borderRadius:99,
                  fontVariantNumeric:'tabular-nums',
                }}>{t.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Scrollable feed */}
      <div style={{flex:1, overflow:'auto', padding:'14px 20px 90px'}}>
        {/* Trending — visual bar style */}
        <div style={{marginBottom:24}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
            <div style={{display:'flex', alignItems:'center', gap:5}}>
              <span style={{fontSize:15}}>🔥</span>
              <span style={{fontSize:15, fontWeight:800, letterSpacing:'-.02em', color:'var(--ink)'}}>지금 뜨는 주제</span>
            </div>
            <span style={{fontSize:15, color:'var(--muted)'}}>최근 24시간</span>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {CM_TRENDING.map((t,i) => {
              const max = CM_TRENDING[0].count;
              const pct = Math.round(t.count / max * 100);
              const colors = ['#3B5BFF','#7A5BFF','#D97757','#16A34A'];
              const c = colors[i];
              return (
                <button key={i} style={{
                  textAlign:'left', background:'#fff', border:'1px solid var(--line-2)',
                  borderRadius:12, padding:'10px 12px', cursor:'pointer',
                  display:'grid', gridTemplateColumns:'20px 1fr auto', alignItems:'center', gap:10,
                }}>
                  <span style={{fontSize:15, fontWeight:800, color:'var(--muted-2)', fontVariantNumeric:'tabular-nums', textAlign:'center'}}>{i+1}</span>
                  <div>
                    <div style={{fontSize:15, fontWeight:700, color:'var(--ink)', letterSpacing:'-.01em', marginBottom:5}}>{t.tag}</div>
                    <div style={{height:4, background:'var(--line-2)', borderRadius:99, overflow:'hidden'}}>
                      <div style={{width:`${pct}%`, height:'100%', background:c, borderRadius:99}}/>
                    </div>
                  </div>
                  <div style={{fontSize:15.5, fontWeight:700, color:c, fontVariantNumeric:'tabular-nums', minWidth:34, textAlign:'right'}}>
                    {t.count.toLocaleString()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section label */}
        <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:12}}>
          <span style={{fontSize:15, fontWeight:800, letterSpacing:'-.02em', color:'var(--ink)'}}>활발한 논의</span>
        </div>

        {/* Thread cards */}
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          {CM_THREADS.map(th => (
            <ThreadCard
              key={th.id}
              thread={th}
              expanded={!!expanded[th.id]}
              onToggle={()=>toggleExpand(th.id)}
            />
          ))}
        </div>
      </div>

      {/* FAB — 글쓰기 */}
      <button style={{
        position:'absolute', right:18, bottom:90,
        width:52, height:52, borderRadius:99,
        background:'var(--ink)', color:'#fff',
        border:'none', cursor:'pointer',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 8px 20px -6px rgba(11,14,20,.35)',
      }}>
        <Ico.Plus s={22}/>
      </button>

      <TabBar active="커뮤니티"/>
    </div>
  );
}

// ── Thread card ─────────────────────────────────────────────────────────────
function ThreadCard({thread:th, expanded, onToggle}){
  const [myOpinion, setMyOpinion] = React.useState(false);

  return (
    <article style={{
      background:'#fff', borderRadius:16,
      border:'1px solid var(--line-2)',
      boxShadow: th.hot ? '0 4px 20px -8px rgba(59,91,255,.18), 0 1px 3px rgba(11,14,20,.04)' : 'var(--shadow-sm)',
      overflow:'hidden',
    }}>
      {/* Top bar — merge indicator */}
      <div style={{
        padding:'10px 14px 9px',
        background: th.hot ? 'linear-gradient(90deg, #F5F7FF 0%, #FBFBFE 100%)' : 'var(--card-2)',
        borderBottom:'1px solid var(--line-2)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        {/* Merge flow visualization */}
        <div style={{display:'flex', alignItems:'center', gap:6}}>
          {/* Avatar stack */}
          <div style={{display:'inline-flex'}}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:20, height:20, borderRadius:99, border:'1.5px solid #fff',
                background:`hsl(${220+i*20},60%,${70-i*8}%)`,
                marginLeft: i===0?0:-6,
                fontSize:8, color:'#fff', fontWeight:700,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
              }}>{['Q','Q','Q'][i]}</div>
            ))}
          </div>
          {/* Arrow */}
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 4h10M8 1l3 3-3 3" stroke="#9AA1AE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* AI badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:4,
            background:'var(--brand-soft)', borderRadius:99, padding:'2px 8px',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>
            <span style={{fontSize:11.5, fontWeight:700, color:'var(--brand)'}}>
              {th.merged.toLocaleString()}개 질문 병합
            </span>
          </div>
        </div>
        <span style={{fontSize:11.5, fontWeight:600, color:'var(--muted-2)', background:'var(--line-2)', padding:'2px 7px', borderRadius:99}}>{th.tag}</span>
      </div>

      {/* Question title */}
      <button onClick={onToggle} style={{
        width:'100%', textAlign:'left', border:'none', background:'none', cursor:'pointer',
        padding:'14px 14px 10px',
        display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10,
      }}>
        <div style={{flex:1}}>
          <div style={{fontSize:10, fontWeight:700, color:'var(--muted-2)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6}}>Q.</div>
          <div style={{fontSize:15.5, fontWeight:800, letterSpacing:'-.025em', lineHeight:1.35, color:'var(--ink)', textAlign:'left'}}>
            {th.question}
          </div>
          {/* stats row */}
          <div style={{display:'flex', alignItems:'center', gap:10, marginTop:8, fontSize:15, color:'var(--muted-2)'}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:3}}><Ico.Heart s={11}/> {th.likeCount.toLocaleString()}</span>
            <span style={{display:'inline-flex', alignItems:'center', gap:3}}><Ico.Comment s={11}/> {th.commentCount}</span>
            <span>· 조회 {th.viewCount}</span>
          </div>
        </div>
        <div style={{marginTop:2, color:'#9AA1AE', flexShrink:0}}>
          <Ico.Chevron s={16} dir={expanded?'up':'down'}/>
        </div>
      </button>

      {expanded && (
        <>
          {/* AI 핵심 요약 */}
          <div style={{margin:'0 14px 12px', background:'linear-gradient(135deg, #F5F7FF 0%, #FAFBFF 100%)', border:'1px solid #DCE3FF', borderRadius:12, padding:'12px 12px 10px'}}>
            <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:8}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>
              <span style={{fontSize:15, fontWeight:700, color:'var(--brand)', letterSpacing:'.02em'}}>AI 핵심 요약</span>
              <span style={{fontSize:10, color:'var(--muted-2)', marginLeft:'auto'}}>{th.merged.toLocaleString()}개 답변 기반</span>
            </div>
            <p style={{margin:0, fontSize:15, color:'var(--ink-2)', lineHeight:1.6}}>
              {th.aiSummary}
            </p>
            {/* tag pills */}
            <div style={{display:'flex', gap:5, flexWrap:'wrap', marginTop:10}}>
              {th.aiTags.map((t,i) => (
                <span key={i} style={{fontSize:11.5, fontWeight:600, color:'var(--brand)', background:'rgba(59,91,255,.08)', padding:'2px 8px', borderRadius:99}}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 커뮤니티 의견 */}
          <div style={{padding:'0 14px 4px'}}>
            <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:10}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/>
                <circle cx="17" cy="9" r="2.5"/><path d="M15 15c3 0 6 1.5 6 5"/>
              </svg>
              <span style={{fontSize:15, fontWeight:700, color:'var(--ink-2)', letterSpacing:'-.01em'}}>커뮤니티의 생생한 의견</span>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:7}}>
              {th.opinions.map((op,i) => (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'auto 1fr', gap:10, alignItems:'start',
                  padding:'9px 11px', background:'#FBFBFD', border:'1px solid var(--line-2)', borderRadius:10,
                }}>
                  {/* Role badge */}
                  <div style={{
                    flexShrink:0, padding:'3px 7px', borderRadius:7,
                    background: op.bg, color: op.color,
                    fontSize:10, fontWeight:700, whiteSpace:'nowrap', marginTop:2,
                  }}>
                    {op.role} {op.year}
                  </div>
                  <div>
                    <div style={{display:'flex', alignItems:'center', gap:5, marginBottom:4}}>
                      <span style={{
                        fontSize:10, fontWeight:700, color: op.color,
                        background: op.bg, padding:'1px 6px', borderRadius:4, letterSpacing:'.02em',
                      }}>{op.stance}</span>
                    </div>
                    <div style={{fontSize:15, color:'var(--ink-2)', lineHeight:1.5}}>{op.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{display:'flex', gap:8, padding:'14px 14px 14px'}}>
            <button style={{
              flex:1, padding:'10px 0', background:'#fff', border:'1px solid var(--line)',
              borderRadius:12, fontSize:15, fontWeight:600, color:'var(--ink-2)', cursor:'pointer',
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
            }}>
              <Ico.Comment s={14}/> 내 의견 남기기
            </button>
            <button style={{
              flex:1.4, padding:'10px 0', background:'var(--brand)',
              border:'none', borderRadius:12, fontSize:15, fontWeight:700, color:'#fff', cursor:'pointer',
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
              boxShadow:'0 4px 12px -4px rgba(59,91,255,.4)',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>
              AI와 더 깊게 대화하기
            </button>
          </div>
        </>
      )}
    </article>
  );
}

window.CommunityPage = CommunityPage;
