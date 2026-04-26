// v2 TIMELINE — Q → Insight → Evidence → Voices as a single timeline rail.
// Data is foregrounded: big numbers as typography, thin bars.
// More whitespace, fewer cards. Feels like a structured briefing.

function V2Timeline({state="answered", method="none"}){
  const [plus, setPlus] = React.useState(false);
  const [years, setYears] = React.useState(MOCK.me.years);
  const [job, setJob] = React.useState(MOCK.me.job);
  const [view, setView] = React.useState('chat');
  const [cat, setCat] = React.useState('all');
  const [searching, setSearching] = React.useState(false);
  const d = MOCK;
  const dv = deriveDataView({years, job});

  const Node = ({label, color="var(--brand)"}) => (
    <div style={{
      width:22, height:22, borderRadius:99,
      background:'#fff', border:`2px solid ${color}`,
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      fontSize:10, fontWeight:800, color, flexShrink:0,
      boxShadow:'0 0 0 4px #fff',
    }}>{label}</div>
  );

  return (
    <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', paddingTop:44, background:'#F7F7F4'}}>
      {/* Header */}
      <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px 8px', gap:10}}>
        <div style={{display:'flex', flexDirection:'column', flexShrink:0}}>
          <div style={{fontSize:11, color:'var(--muted)', fontWeight:500, letterSpacing:'.02em'}}>월요일 · 4월 20일</div>
          <div style={{fontSize:19, fontWeight:800, letterSpacing:'-.03em'}}>unwritten</div>
        </div>

        {method === 'toggle' && (
          <ViewToggle view={view} onChange={setView}/>
        )}

        <div style={{display:'flex', alignItems:'center', gap:6}}>
          {method === 'search' && (
            <button onClick={()=>setSearching(s=>!s)} style={{
              width:32, height:32, borderRadius:10, border:'1px solid var(--line)', background:'#fff',
              display:'inline-flex', alignItems:'center', justifyContent:'center', color:'var(--ink-2)', cursor:'pointer',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
            </button>
          )}
          {method !== 'toggle' && (
            <button style={{
              border:'1px solid var(--line)', background:'#fff',
              borderRadius:10, padding:'6px 10px',
              fontSize:11.5, fontWeight:600, color:'var(--ink-2)',
              display:'inline-flex', alignItems:'center', gap:6, whiteSpace:'nowrap',
            }}>
              <Ico.Clock s={13} c="#6B7280"/> 오늘의 대화
            </button>
          )}
        </div>
      </header>

      {/* Method 2 · search + category chips */}
      {method === 'search' && (
        <div style={{padding:'0 20px 6px', display:'flex', flexDirection:'column', gap:8}}>
          {searching && (
            <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:10, padding:'8px 12px', display:'flex', alignItems:'center', gap:8}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              <input autoFocus placeholder="지난 대화에서 찾기" style={{flex:1, border:'none', outline:'none', fontSize:13, background:'none', fontFamily:'inherit'}}/>
              <button onClick={()=>setSearching(false)} style={{border:'none', background:'none', fontSize:11.5, color:'var(--muted)', cursor:'pointer'}}>취소</button>
            </div>
          )}
          <div style={{display:'flex', gap:6, overflowX:'auto', scrollbarWidth:'none'}}>
            {d.categoryChips.map(c => {
              const on = cat === c.id;
              return (
                <button key={c.id} onClick={()=>setCat(c.id)} style={{
                  flexShrink:0, padding:'6px 10px', borderRadius:99,
                  fontSize:11.5, fontWeight:600, whiteSpace:'nowrap', cursor:'pointer',
                  border:`1px solid ${on?'var(--ink)':'var(--line)'}`,
                  background: on?'var(--ink)':'#fff',
                  color: on?'#fff':'var(--ink-2)',
                  display:'inline-flex', alignItems:'center', gap:5,
                }}>
                  {c.label}
                  <span style={{fontSize:10, fontWeight:700, opacity:.85, background: on?'rgba(255,255,255,.2)':'var(--line-2)', color: on?'#fff':'var(--muted)', padding:'1px 5px', borderRadius:99}}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div style={{flex:1, overflow:'auto', padding: method==='toggle'&&view==='list' ? '0' : '8px 20px 140px'}}>
        {method==='toggle' && view==='list' ? (
          <ListView/>
        ) : (<>
        {/* Title */}
        <div style={{margin:'8px 0 18px'}}>
          <div style={{fontSize:11, fontWeight:700, color:'var(--brand)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6}}>Today’s thread</div>
          <h1 style={{margin:0, fontSize:22, fontWeight:800, letterSpacing:'-.025em', lineHeight:1.25, color:'var(--ink)'}}>
            {d.question.title}
          </h1>
        </div>

        {/* Rail */}
        <div style={{position:'relative', paddingLeft:36}}>
          {/* vertical line */}
          <div style={{position:'absolute', left:10, top:8, bottom:8, width:2, background:'linear-gradient(to bottom, var(--brand) 0%, var(--brand) 70%, #D9DEEF 100%)', borderRadius:2, opacity:.35}}/>

          {/* 1 — My question */}
          <div style={{position:'relative', marginBottom:22}}>
            <div style={{position:'absolute', left:-36, top:0}}>
              <Node label="Q" color="#9AA1AE"/>
            </div>
            <div style={{fontSize:11, fontWeight:600, color:'var(--muted-2)', letterSpacing:'.02em', marginBottom:4}}>나의 질문 · {d.question.askedAt}</div>
            <div style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.55}}>{d.question.body}</div>
          </div>

          {/* 2 — AI insight headline */}
          <div style={{position:'relative', marginBottom:22}}>
            <div style={{position:'absolute', left:-36, top:0}}>
              <Node label="A"/>
            </div>
            <div style={{fontSize:11, fontWeight:700, color:'var(--brand)', letterSpacing:'.04em', marginBottom:6}}>INSIGHT</div>
            <div style={{
              fontSize:22, fontWeight:800, letterSpacing:'-.028em', lineHeight:1.22, color:'var(--ink)',
              marginBottom:10,
            }}>
              핵심은 <span style={{color:'var(--brand)'}}>전날 밤 준비</span>.<br/>
              아침의 인지 부담을 줄이세요.
            </div>
            <p style={{margin:0, fontSize:13.5, color:'var(--muted)', lineHeight:1.6}}>
              복장·가방·아침 식사 루틴을 전날 정리해두면 의사결정 피로가 사라집니다. 5~10분 투자로 아침 30분을 확보할 수 있어요.
            </p>

            {/* takeaways — horizontal chips */}
            <div style={{display:'flex', flexDirection:'column', gap:6, marginTop:14}}>
              {d.ai.takeaways.map((t,i)=>(
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:10,
                  padding:'9px 12px', background:'#fff', border:'1px solid var(--line)',
                  borderRadius:10, fontSize:13, color:'var(--ink-2)',
                }}>
                  <span style={{fontSize:10.5, fontWeight:700, color:'var(--brand)', fontFeatureSettings:'"tnum"', minWidth:14}}>0{i+1}</span>
                  <span style={{color:'var(--line)'}}>|</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 — Evidence / data */}
          <div style={{position:'relative', marginBottom:22}}>
            <div style={{position:'absolute', left:-36, top:0}}>
              <Node label="D"/>
            </div>
            <div style={{fontSize:11, fontWeight:700, color:'var(--brand)', letterSpacing:'.04em', marginBottom:6}}>EVIDENCE</div>
            <div style={{fontSize:13, color:'var(--muted)', marginBottom:12}}>{d.ai.basis}</div>

            {/* Big-number hero stat */}
            <div style={{
              background:'#fff', border:'1px solid var(--line-2)',
              borderRadius:14, padding:'16px 16px 14px', marginBottom:10,
            }}>
              <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8}}>
                <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                  <div style={{fontSize:44, fontWeight:800, letterSpacing:'-.04em', color:'var(--brand)', lineHeight:1, fontFeatureSettings:'"tnum"'}}>{dv.featured}<span style={{fontSize:22}}>%</span></div>
                  <div style={{fontSize:12, color:'var(--muted)', lineHeight:1.4}}>
                    {dv.jobLabel} · {dv.yearsLabel}<br/>전날 준비 실천
                  </div>
                </div>
                <div style={{fontSize:10.5, color:'var(--muted-2)', fontWeight:600, letterSpacing:'.04em', textAlign:'right'}}>
                  n={dv.n.toLocaleString()}
                </div>
              </div>

              {/* Filters */}
              <div style={{marginTop:14, paddingTop:12, borderTop:'1px dashed var(--line)', display:'flex', flexDirection:'column', gap:6}}>
                <div style={{display:'flex', alignItems:'center', gap:6}}>
                  <span style={{fontSize:10.5, fontWeight:700, color:'var(--muted-2)', letterSpacing:'.04em', textTransform:'uppercase', minWidth:26}}>직군</span>
                  <FilterChips value={job} options={d.filters.jobs} onChange={setJob}/>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:6}}>
                  <span style={{fontSize:10.5, fontWeight:700, color:'var(--muted-2)', letterSpacing:'.04em', textTransform:'uppercase', minWidth:26}}>연차</span>
                  <FilterChips value={years} options={d.filters.years} onChange={setYears}/>
                </div>
                <div style={{marginTop:2}}>
                  <MeShortcut years={years} job={job} onApply={(y,j)=>{setYears(y); setJob(j);}}/>
                </div>
              </div>

              <div style={{marginTop:14}}>
                <div style={{fontSize:11.5, fontWeight:600, color:'var(--ink-2)', marginBottom:8}}>연차별 실천 비율 <span style={{color:'var(--muted-2)', fontWeight:500}}>· {dv.jobLabel}</span></div>
                <StatBars bars={dv.bars}/>
              </div>
              <button style={{
                marginTop:14, padding:'7px 0', width:'100%',
                background:'var(--bg)', border:'none',
                borderRadius:8, fontSize:12, fontWeight:600, color:'var(--ink-2)',
                display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
              }}>관련 데이터 더보기 <Ico.Arrow s={12}/></button>
            </div>
          </div>

          {/* 4 — Community voices */}
          <div style={{position:'relative', marginBottom:10}}>
            <div style={{position:'absolute', left:-36, top:0}}>
              <Node label="C"/>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
              <div>
                <div style={{fontSize:11, fontWeight:700, color:'var(--brand)', letterSpacing:'.04em'}}>VOICES</div>
                <div style={{fontSize:13.5, fontWeight:700, color:'var(--ink)', marginTop:2}}>비슷한 고민을 나눈 동료들</div>
              </div>
              <button style={{border:'none', background:'none', fontSize:11.5, color:'var(--muted)', display:'inline-flex', alignItems:'center', gap:3}}>
                전체 <Ico.Chevron s={12} dir="right"/>
              </button>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {d.community.slice(0,3).map((c,i)=>(
                <div key={i} style={{
                  background:'#fff', border:'1px solid var(--line-2)',
                  borderRadius:12, padding:'12px 14px',
                }}>
                  <div style={{fontSize:13, fontWeight:700, color:'var(--ink)', letterSpacing:'-.015em'}}>{c.title}</div>
                  <div style={{fontSize:12, color:'var(--muted)', lineHeight:1.5, marginTop:4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{c.preview}</div>
                  <div style={{display:'flex', alignItems:'center', gap:10, marginTop:8, fontSize:11, color:'var(--muted-2)'}}>
                    <span>{c.role}</span>
                    <span>·</span>
                    <span style={{display:'inline-flex', alignItems:'center', gap:3}}><Ico.Heart s={11}/> {c.likes}</span>
                    <span style={{display:'inline-flex', alignItems:'center', gap:3}}><Ico.Comment s={11}/> {c.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foot actions */}
          <div style={{marginTop:24, display:'flex', gap:8}}>
            <button style={{flex:1, padding:'11px 0', background:'#fff', border:'1px solid var(--line)', borderRadius:12, fontSize:13, fontWeight:600, color:'var(--ink-2)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6}}>
              <Ico.Thumb s={14}/> 도움됐어요
            </button>
            <button onClick={()=>setPlus(p=>!p)} style={{flex:1, padding:'11px 0', background:'var(--ink)', color:'#fff', border:'none', borderRadius:12, fontSize:13, fontWeight:600, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6}}>
              <Ico.Plus s={14}/> 추가 질문
            </button>
          </div>
        </div>
        </>)}
      </div>

      {/* Composer */}
      <div style={{position:'absolute', left:0, right:0, bottom:72, padding:'0 16px', zIndex:15}}>
        <div style={{
          background:'#fff', borderRadius:14,
          boxShadow:'0 10px 28px -10px rgba(11,14,20,.14), 0 1px 3px rgba(11,14,20,.06)',
          border:'1px solid var(--line)',
          padding:'10px 10px 10px 14px',
          display:'flex', alignItems:'center', gap:10,
        }}>
          <Ico.Sparkle s={15} c="#9AA1AE"/>
          <input placeholder="오늘의 고민을 한 줄로 적어보세요" style={{
            flex:1, border:'none', outline:'none', background:'none',
            fontSize:13.5, color:'var(--ink)', fontFamily:'inherit',
          }}/>
          <button style={{
            width:32, height:32, borderRadius:9,
            border:'none', background:'var(--brand)', color:'#fff',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
          }}><Ico.Send s={15}/></button>
        </div>
      </div>

      <TabBar active="질문"/>
    </div>
  );
}

window.V2Timeline = V2Timeline;
