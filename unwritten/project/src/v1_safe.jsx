// v1 SAFE — Refined current layout.
// Goal: same mental model, much cleaner hierarchy. Better density, better data viz,
// add community preview + basis text from SPEC, lighter action bar.

function V1Safe({state="answered", method="none"}){
  const [expanded, setExpanded] = React.useState(true);
  const [plus, setPlus] = React.useState(false);
  const [vote, setVote] = React.useState(null);
  const [years, setYears] = React.useState(MOCK.me.years);
  const [job, setJob] = React.useState(MOCK.me.job);
  const [view, setView] = React.useState('chat'); // chat | list
  const [cat, setCat] = React.useState('all');
  const [searching, setSearching] = React.useState(false);
  const d = MOCK;
  const dv = deriveDataView({years, job});

  return (
    <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', paddingTop:44}}>
      {/* App bar — unified */}
      <header style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 20px 10px', gap:10,
      }}>
        <div style={{display:'flex', alignItems:'center', gap:6}}>
          <div style={{fontSize:20, fontWeight:800, letterSpacing:'-.03em', color:'var(--ink)'}}>unwritten</div>
          <div style={{width:5, height:5, background:'var(--brand)', borderRadius:99, flexShrink:0}}/>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          {method === 'toggle' && (
            <ViewToggle view={view} onChange={setView}/>
          )}
          <button onClick={()=>setSearching(s=>!s)} style={{
            width:34, height:34, borderRadius:10, border:'1px solid var(--line)', background:'#fff',
            display:'inline-flex', alignItems:'center', justifyContent:'center', color:'var(--ink-2)', cursor:'pointer',
          }} aria-label="검색">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Method 2 · Search field (expanded) + category chips */}
      {method === 'search' && (
        <div style={{paddingBottom:8, borderBottom:'1px solid var(--line-2)'}}>
          {searching && (
            <div style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:12,
              padding:'9px 12px', margin:'0 20px 8px', display:'flex', alignItems:'center', gap:8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              <input autoFocus placeholder="지난 대화에서 찾기" style={{
                flex:1, border:'none', outline:'none', fontSize:15, background:'none', fontFamily:'inherit',
              }}/>
              <button onClick={()=>setSearching(false)} style={{border:'none', background:'none', fontSize:15.5, color:'var(--muted)', cursor:'pointer'}}>취소</button>
            </div>
          )}
          <div style={{display:'flex', gap:6, overflowX:'auto', scrollbarWidth:'none', padding:'0 20px'}}>
            {d.categoryChips.map(c => {
              const on = cat === c.id;
              return (
                <button key={c.id} onClick={()=>setCat(c.id)} style={{
                  flexShrink:0, padding:'7px 11px', borderRadius:99,
                  fontSize:15, fontWeight:600, whiteSpace:'nowrap', cursor:'pointer',
                  border:`1px solid ${on?'var(--brand)':'var(--line)'}`,
                  background: on?'var(--brand)':'#fff',
                  color: on?'#fff':'var(--ink-2)',
                  display:'inline-flex', alignItems:'center', gap:5,
                }}>
                  {c.label}
                </button>
              );
            })}
          </div>
          {cat !== 'all' && (
            <div style={{fontSize:15, color:'var(--muted)', paddingLeft:20, marginTop:6}}>
              · <b style={{color:'var(--ink-2)'}}>{d.categoryChips.find(x=>x.id===cat)?.label}</b> 주제로 필터링됨
            </div>
          )}
        </div>
      )}

      {/* Feed / List */}
      <div style={{flex:1, overflow:'auto', padding: method==='toggle'&&view==='list' ? '0' : '16px 20px 140px'}}>
        {method === 'toggle' && view === 'list' ? (
          <ListView/>
        ) : (<>
        {/* Q/A card */}
        <article style={{
          background:'#fff', borderRadius:16,
          boxShadow:'var(--shadow-sm)',
          border:'1px solid var(--line-2)',
          overflow:'hidden',
        }}>
          {/* Card header */}
          <button onClick={()=>setExpanded(e=>!e)} style={{
            width:'100%', textAlign:'left',
            padding:'16px 18px', border:'none', background:'none',
            display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer',
          }}>
            <div style={{display:'flex', alignItems:'center', gap:10, minWidth:0}}>
              <h3 style={{margin:0, fontSize:15.5, fontWeight:700, letterSpacing:'-.015em', color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{d.question.title}</h3>
            </div>
            <Ico.Chevron dir={expanded?'up':'down'} c="#9AA1AE"/>
          </button>

          {expanded && <>
            {/* Divider */}
            <div style={{height:1, background:'var(--line-2)', margin:'0 18px'}}/>

            {/* Timeline: 나의 질문 → AI 답변 */}
            <div style={{padding:'14px 18px 6px', position:'relative'}}>
              {/* Vertical line connecting dots */}
              <div style={{
                position:'absolute', left:28, top:28, bottom:32,
                width:1, background:'var(--line)',
              }}/>

              {/* 나의 질문 */}
              <div style={{display:'grid', gridTemplateColumns:'20px 1fr', gap:12, marginBottom:18}}>
                {/* Dot */}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:2}}>
                  <div style={{width:10, height:10, borderRadius:99, background:'var(--ink)', flexShrink:0, border:'2px solid #fff', boxShadow:'0 0 0 1.5px var(--ink)'}}/>
                </div>
                <div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5}}>
                    <div style={{fontSize:15, fontWeight:700, color:'var(--ink-2)', textTransform:'uppercase', letterSpacing:'.04em'}}>나의 질문</div>
                    <div style={{fontSize:15, color:'var(--muted-2)'}}>오후 2:14</div>
                  </div>
                  <div style={{fontSize:15, color:'var(--ink-2)', lineHeight:1.55}}>{d.question.body}</div>
                </div>
              </div>

              {/* AI 답변 */}
              <div style={{display:'grid', gridTemplateColumns:'20px 1fr', gap:12}}>
                {/* Dot */}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:2}}>
                  <div style={{width:10, height:10, borderRadius:99, background:'var(--brand)', flexShrink:0, border:'2px solid #fff', boxShadow:'0 0 0 1.5px var(--brand)'}}/>
                </div>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:8}}>
                    <div style={{fontSize:15, fontWeight:700, color:'var(--brand)', letterSpacing:'.04em'}}>AI 답변</div>
                    <span style={{fontSize:15, color:'var(--muted-2)', marginLeft:'auto'}}>{d.ai.basis}</span>
                  </div>

                  <div style={{fontSize:17, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.4, color:'var(--ink)', marginBottom:8}}>
                    {d.ai.headline}
                  </div>

                  <p style={{margin:0, fontSize:15, color:'var(--ink-2)', lineHeight:1.6}}>
                    출근 시간을 효율적으로 관리하려면{' '}
                    <span style={{fontWeight:700, background:'linear-gradient(180deg, transparent 62%, rgba(59,91,255,.2) 62%)'}}>전날 밤 준비</span>
                    를 미리 해두는 것이 핵심이에요. 복장, 가방, 아침 식사 등 루틴을 간소화하면 아침의 인지적 부담을 덜 수 있습니다.
                  </p>

                  {/* Takeaway bullets */}
                  <ul style={{margin:'16px 0 0', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:9}}>
                    {d.ai.takeaways.map((t,i)=>(
                      <li key={i} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                        <span style={{
                          minWidth:18, height:18, borderRadius:6,
                          background:'var(--brand-soft)', color:'var(--brand)',
                          fontSize:11.5, fontWeight:700,
                          display:'inline-flex', alignItems:'center', justifyContent:'center',
                          marginTop:2,
                        }}>{i+1}</span>
                        <span style={{fontSize:15.5, color:'var(--ink-2)', lineHeight:1.5}}>{t}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Data card — inside timeline */}
                  <div style={{marginTop:20, background:'var(--brand-softer)', border:'1px solid #E3E8FF', borderRadius:14, padding:'14px 14px 12px'}}>
                    <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:10}}>
                      <div>
                        <div style={{fontSize:15, fontWeight:700, color:'var(--ink)'}}>{d.data.title}</div>
                        <div style={{fontSize:15, color:'var(--muted)', marginTop:2}}>{dv.jobLabel} · {dv.n.toLocaleString()}명 응답</div>
                      </div>
                      <div style={{fontSize:24, fontWeight:800, color:'var(--brand)', letterSpacing:'-.03em', fontVariantNumeric:'tabular-nums', lineHeight:1}}>{dv.featured}%</div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:6, marginBottom:12}}>
                      <div style={{display:'flex', alignItems:'center', gap:6}}>
                        <span style={{fontSize:11, fontWeight:700, color:'var(--muted-2)', letterSpacing:'.04em', textTransform:'uppercase', minWidth:28}}>직군</span>
                        <FilterChips value={job} options={d.filters.jobs} onChange={setJob}/>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:6}}>
                        <span style={{fontSize:11, fontWeight:700, color:'var(--muted-2)', letterSpacing:'.04em', textTransform:'uppercase', minWidth:28}}>연차</span>
                        <FilterChips value={years} options={d.filters.years} onChange={setYears}/>
                      </div>
                      <div style={{display:'flex', marginTop:2}}>
                        <MeShortcut years={years} job={job} onApply={(y,j)=>{setYears(y); setJob(j);}}/>
                      </div>
                    </div>
                    <StatBars bars={dv.bars}/>
                    <button style={{marginTop:12, width:'100%', border:'none', background:'#fff', borderRadius:10, padding:'9px 0', fontSize:13, fontWeight:600, color:'var(--brand)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer'}}>
                      관련 데이터 더보기 <Ico.Arrow s={13}/>
                    </button>
                  </div>

                  {/* Community preview — inside timeline */}
                  <div style={{marginTop:20}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4}}>
                      <div style={{fontSize:14, fontWeight:700, color:'var(--ink)'}}>관련 커뮤니티 글</div>
                      <button style={{border:'none', background:'none', fontSize:12, color:'var(--muted)', fontWeight:500, display:'inline-flex', alignItems:'center', gap:3}}>
                        전체 보기 <Ico.Chevron s={12} dir="right"/>
                      </button>
                    </div>
                    {d.community.slice(0,2).map((c,i)=>(
                      <CommunityRow key={i} item={c}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback strip */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'14px 18px', borderTop:'1px solid var(--line-2)', marginTop:6,
              background:'#FBFBFD',
            }}>
              <div style={{fontSize:15.5, color:'var(--muted)'}}>이 답변이 도움됐나요?</div>
              <div style={{display:'flex', gap:8}}>
                <button onClick={()=>setVote('up')} style={{
                  width:34, height:34, borderRadius:10,
                  border:'1px solid var(--line)',
                  background: vote==='up'? 'var(--brand-soft)' : '#fff',
                  color: vote==='up'? 'var(--brand)' : 'var(--muted)',
                  display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
                }}><Ico.Thumb s={16}/></button>
                <button onClick={()=>setVote('down')} style={{
                  width:34, height:34, borderRadius:10,
                  border:'1px solid var(--line)',
                  background: vote==='down'? '#FFF1F0' : '#fff',
                  color: vote==='down'? '#C03F39' : 'var(--muted)',
                  display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
                }}><Ico.Thumb s={16} down/></button>
              </div>
            </div>

            {/* Action row — plus / add-question / feedback */}
            <div style={{padding:'12px 18px 16px'}}>
              {!plus ? (
                <button onClick={()=>setPlus(true)} style={{
                  width:'100%',
                  border:'1px dashed var(--line)',
                  background:'#fff',
                  borderRadius:12,
                  padding:'11px 14px',
                  fontSize:15, color:'var(--muted)', fontWeight:500,
                  display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
                  cursor:'pointer',
                }}><Ico.Plus s={16}/> 이 주제로 더 궁금한 게 있나요?</button>
              ) : (
                <div style={{display:'flex', gap:8}}>
                  <button style={{
                    flex:1, border:'none', background:'var(--brand)', color:'#fff',
                    borderRadius:12, padding:'11px 0', fontSize:15, fontWeight:600,
                  }}>추가 질문하기</button>
                  <button style={{
                    flex:1, border:'1px solid var(--line)', background:'#fff', color:'var(--ink-2)',
                    borderRadius:12, padding:'11px 0', fontSize:15, fontWeight:600,
                  }}>피드백하기</button>
                  <button onClick={()=>setPlus(false)} style={{
                    width:40, border:'1px solid var(--line)', background:'#fff', color:'var(--muted)',
                    borderRadius:12, display:'inline-flex', alignItems:'center', justifyContent:'center',
                  }}><Ico.Close s={14}/></button>
                </div>
              )}
            </div>
          </>}
        </article>
        </>)}
      </div>

      {/* Bottom composer */}
      <div style={{
        position:'absolute', left:0, right:0, bottom:72,
        padding:'0 16px',
        zIndex:15,
      }}>
        <div style={{
          background:'#fff', borderRadius:16,
          boxShadow:'0 8px 24px -8px rgba(11,14,20,.12), 0 1px 3px rgba(11,14,20,.06)',
          border:'1px solid var(--line)',
          padding:'10px 10px 10px 16px',
          display:'flex', alignItems:'center', gap:10,
        }}>
          <input placeholder={MOCK.today.greeting} style={{
            flex:1, border:'none', outline:'none', background:'none',
            fontSize:15, color:'var(--ink)',
            fontFamily:'inherit',
          }}/>
          <button style={{
            width:34, height:34, borderRadius:10,
            border:'none', background:'var(--brand)',
            color:'#fff',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer',
          }}><Ico.Send s={16}/></button>
        </div>
      </div>

      <TabBar active="질문"/>
    </div>
  );
}

window.V1Safe = V1Safe;
