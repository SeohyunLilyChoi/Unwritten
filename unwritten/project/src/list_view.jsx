// Method 1 — LIST VIEW toggle
// AI가 지난 Q&A를 주제별로 자동 분류해서 탐색하기 쉽게 보여주는 뷰.
// 상단에 "대화" / "정리됨" 뷰 토글이 있고, 리스트 뷰에서는 주제 그룹 → 개별 질문으로 드릴다운.

function ListView({onBack, onOpenItem, brand="var(--brand)"}){
  const [openId, setOpenId] = React.useState(null);
  const groups = MOCK.topicGroups;

  return (
    <div style={{padding:'6px 16px 24px', display:'flex', flexDirection:'column', gap:14}}>
      {/* Intro */}
      <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 4px 0'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>
        </svg>
        <div style={{fontSize:15, color:'var(--muted)', lineHeight:1.5}}>
          AI가 <b style={{color:'var(--ink)'}}>16개 질문</b>을 <b style={{color:'var(--ink)'}}>5개 주제</b>로 정리했어요
        </div>
      </div>

      {/* Topic groups */}
      {groups.map(g => {
        const open = openId === g.id;
        return (
          <section key={g.id} style={{
            background:'#fff', border:'1px solid var(--line-2)',
            borderRadius:16, overflow:'hidden',
            boxShadow: open ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            transition:'box-shadow .15s',
          }}>
            <button onClick={()=>setOpenId(open? null : g.id)} style={{
              width:'100%', textAlign:'left', border:'none', background:'none', cursor:'pointer',
              padding:'14px 16px',
              display:'grid', gridTemplateColumns:'40px 1fr auto', gap:12, alignItems:'center',
            }}>
              <div style={{
                width:40, height:40, borderRadius:12,
                background: g.color+'18',
                color: g.color,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                fontSize:20,
              }}>{g.emoji}</div>
              <div style={{minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', gap:6}}>
                  <div style={{fontSize:15.5, fontWeight:700, color:'var(--ink)', letterSpacing:'-.015em'}}>{g.title}</div>
                  <span style={{
                    fontSize:15.5, fontWeight:700, color:g.color, background:g.color+'14',
                    padding:'2px 6px', borderRadius:99, fontVariantNumeric:'tabular-nums',
                  }}>{g.count}</span>
                </div>
                <div style={{fontSize:15, color:'var(--muted)', marginTop:3, lineHeight:1.45, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                  {g.summary}
                </div>
              </div>
              <div style={{color:'#9AA1AE'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transform: open?'rotate(180deg)':'none', transition:'transform .2s'}}>
                  <path d="M6 9 L12 15 L18 9"/>
                </svg>
              </div>
            </button>

            {open && (
              <div style={{padding:'2px 16px 14px'}}>
                <div style={{borderTop:'1px dashed var(--line)', paddingTop:10, display:'flex', flexDirection:'column', gap:4}}>
                  {g.items.map((it, i) => (
                    <button key={i} onClick={()=>it.active && onOpenItem && onOpenItem()} style={{
                      textAlign:'left', border:'none', background:'none', cursor:'pointer',
                      padding:'10px 8px', borderRadius:10,
                      display:'grid', gridTemplateColumns:'10px 1fr auto', gap:10, alignItems:'start',
                    }}>
                      <div style={{
                        marginTop:6,
                        width:6, height:6, borderRadius:99,
                        background: it.active ? g.color : '#D6DAE1',
                        boxShadow: it.active ? `0 0 0 3px ${g.color}22` : 'none',
                      }}/>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:15.5, fontWeight: it.active?700:600, color:'var(--ink)', letterSpacing:'-.01em', display:'flex', alignItems:'center', gap:6}}>
                          <span style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{it.title}</span>
                          {it.active && <span style={{fontSize:9.5, fontWeight:700, color:g.color, background:g.color+'14', padding:'2px 5px', borderRadius:5}}>현재</span>}
                        </div>
                        <div style={{fontSize:15, color:'var(--muted)', marginTop:3, lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                          {it.excerpt}
                        </div>
                      </div>
                      <div style={{fontSize:15.5, color:'var(--muted-2)', whiteSpace:'nowrap', paddingTop:3}}>{it.when}</div>
                    </button>
                  ))}
                </div>
                <button style={{
                  marginTop:8, width:'100%',
                  padding:'8px 0', background:'var(--bg)', color:'var(--ink-2)',
                  border:'none', borderRadius:10, fontSize:15, fontWeight:600,
                  display:'inline-flex', alignItems:'center', justifyContent:'center', gap:4,
                }}>
                  {g.title} 전체 보기
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </button>
              </div>
            )}
          </section>
        );
      })}

      <div style={{fontSize:15.5, color:'var(--muted-2)', textAlign:'center', padding:'6px 0 14px', lineHeight:1.5}}>
        지난 30일 · 분류는 새로운 질문을 더할 때마다 업데이트돼요
      </div>
    </div>
  );
}

// View-toggle (대화 / 정리됨) — v1·v2에서 공용
function ViewToggle({view, onChange, labels=["대화","정리됨"]}){
  return (
    <div style={{
      display:'inline-flex', padding:3,
      background:'var(--line-2)', borderRadius:99,
      fontSize:15.5, fontWeight:600,
    }}>
      {['chat','list'].map((k,i)=>{
        const on = view===k;
        return (
          <button key={k} onClick={()=>onChange(k)} style={{
            border:'none', cursor:'pointer',
            background: on ? '#fff' : 'transparent',
            color: on ? 'var(--ink)' : 'var(--muted)',
            padding:'5px 12px', borderRadius:99,
            boxShadow: on ? '0 1px 2px rgba(11,14,20,.08)' : 'none',
            letterSpacing:'-.01em',
          }}>{labels[i]}</button>
        );
      })}
    </div>
  );
}

window.ListView = ListView;
window.ViewToggle = ViewToggle;
