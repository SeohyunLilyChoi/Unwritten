// App root — 3-page final layout + home variants canvas

function EmptyHome(){
  return (
    <div style={{position:'absolute', inset:0, paddingTop:44, display:'flex', flexDirection:'column', background:'var(--bg)'}}>
      <header style={{padding:'14px 20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontSize:22, fontWeight:800, letterSpacing:'-.03em'}}>unwritten</div>
        </div>
        <button style={{border:'1px solid var(--line)', background:'#fff', borderRadius:10, padding:'6px 12px', fontSize:11.5, color:'var(--muted)', fontWeight:600}}>새 대화</button>
      </header>
      <div style={{flex:1, padding:'16px 20px 140px', overflow:'auto'}}>
        <div style={{marginTop:24, marginBottom:22}}>
          <div style={{fontSize:11, fontWeight:700, color:'var(--brand)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6}}>Hello, Monday</div>
          <div style={{fontSize:24, fontWeight:800, letterSpacing:'-.03em', lineHeight:1.25}}>아직 쓰이지 않은 답이<br/>오늘 당신을 기다려요.</div>
        </div>
        <div>
          <div style={{fontSize:11, fontWeight:700, color:'var(--muted-2)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8}}>이런 고민은 어떠세요</div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {MOCK.suggestions.map((s,i)=>(
              <button key={i} style={{textAlign:'left', padding:'12px 14px', background:'#fff', border:'1px solid var(--line-2)', borderRadius:12, fontSize:13.5, color:'var(--ink-2)', fontWeight:500, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <span>{s}</span><Ico.Arrow s={14} c="#9AA1AE"/>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{position:'absolute', left:0, right:0, bottom:72, padding:'0 20px'}}>
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 8px 24px -8px rgba(11,14,20,.10)', border:'1px solid var(--line)', padding:'10px 10px 10px 16px', display:'flex', alignItems:'center', gap:10}}>
          <input placeholder={MOCK.today.greeting} style={{flex:1, border:'none', outline:'none', background:'none', fontSize:14, fontFamily:'inherit'}}/>
          <button style={{width:34, height:34, borderRadius:10, border:'none', background:'var(--brand)', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center'}}><Ico.Send s={16}/></button>
        </div>
      </div>
      <TabBar active="질문"/>
    </div>
  );
}

function App(){
  const [tweaks, setTweaksRaw] = React.useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = React.useState(false);

  const setTweaks = (patch) => {
    setTweaksRaw(p => ({...p, ...patch}));
    window.parent.postMessage({type:'__edit_mode_set_keys', edits: patch}, '*');
  };

  React.useEffect(()=>{
    const handler = (e) => {
      const t = e.data && e.data.type;
      if(t === '__activate_edit_mode') setEditMode(true);
      if(t === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({type:'__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', handler);
  },[]);

  const homeVariants = [
    { id:'v1-m1', base:'v1', method:'toggle', label:'v1 · Safe — M1', sub:'뷰 토글: 대화/정리됨'},
    { id:'v1-m2', base:'v1', method:'search', label:'v1 · Safe — M2 ✓', sub:'카테고리 칩 + 검색 (채택)'},
    { id:'v2-m1', base:'v2', method:'toggle', label:'v2 · Timeline — M1', sub:'뷰 토글'},
    { id:'v2-m2', base:'v2', method:'search', label:'v2 · Timeline — M2', sub:'카테고리 칩 + 검색'},
  ];

  const renderHome = (base, method) => {
    if(tweaks.state === 'empty') return <EmptyHome/>;
    if(base === 'v1') return <V1Safe state={tweaks.state} method={method}/>;
    if(base === 'v2') return <V2Timeline state={tweaks.state} method={method}/>;
    return null;
  };

  if(!tweaks.showAll){
    const v = homeVariants.find(x=>x.id===tweaks.variant) || homeVariants[1];
    return (
      <>
        <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', background:'#E4E7EB'}}>
          <Phone label={v.label} sub={v.sub}>
            {renderHome(v.base, v.method)}
          </Phone>
        </div>
        <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={editMode} variants={homeVariants}/>
      </>
    );
  }

  return (
    <>
      <div style={{minHeight:'100vh', padding:'48px 28px 64px', background:'#E4E7EB'}}>
        <div style={{maxWidth:1400, margin:'0 auto'}}>

          {/* ── FINAL 3-PAGE ROW ─────────────────────────── */}
          <CanvasHeader
            eyebrow="Unwritten · Final Design"
            title="질문 · 콘텐츠 · 커뮤니티"
            desc="v1 Safe M2 (채택) · 섹션형 콘텐츠 피드 · AI 병합 커뮤니티"
          />

          <div style={{display:'flex', gap:28, justifyContent:'center', alignItems:'flex-start', marginBottom:64}}>
            <Phone label="① 질문 — v1 Safe M2" sub="카테고리 칩 + 검색 · 답변 완료 상태">
              <V1Safe state="answered" method="search"/>
            </Phone>
            <Phone label="② 콘텐츠 — Sectioned Feed" sub="타입별 악센트 · 투표 참여 · AI CTA">
              <ContentPage/>
            </Phone>
            <Phone label="③ 커뮤니티 — AI 병합 피드" sub="N개 질문 수렴 · AI 요약 · 의견 맥락">
              <CommunityPage/>
            </Phone>
          </div>



        </div>
      </div>
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={editMode} variants={homeVariants}/>
    </>
  );
}

function CanvasHeader({eyebrow, title, desc}){
  return (
    <div style={{textAlign:'center', marginBottom:24}}>
      <div style={{fontSize:10.5, fontWeight:700, color:'#6B7280', letterSpacing:'.12em', textTransform:'uppercase'}}>{eyebrow}</div>
      <h2 style={{margin:'5px 0 4px', fontSize:22, fontWeight:800, letterSpacing:'-.025em', color:'#0B0E14'}}>{title}</h2>
      <p style={{margin:0, fontSize:12.5, color:'#6B7280', lineHeight:1.6}}>{desc}</p>
    </div>
  );
}

window.ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
