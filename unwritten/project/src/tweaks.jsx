const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showAll": true,
  "variant": "v1-m1",
  "state": "answered"
}/*EDITMODE-END*/;

function TweaksPanel({tweaks, setTweaks, visible, variants=[]}){
  if(!visible) return null;

  const Chip = ({active, onClick, children}) => (
    <button onClick={onClick} style={{
      padding:'5px 9px', borderRadius:7, fontSize:11.5, fontWeight:600, cursor:'pointer',
      border: active? '1px solid #0B0E14' : '1px solid #E8EAEF',
      background: active? '#0B0E14' : '#fff',
      color: active? '#fff' : '#2C3240',
    }}>{children}</button>
  );

  const Row = ({label, children}) => (
    <div style={{marginBottom:11}}>
      <div style={{fontSize:10, fontWeight:700, color:'#9AA1AE', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:5}}>{label}</div>
      <div style={{display:'flex', gap:5, flexWrap:'wrap'}}>{children}</div>
    </div>
  );

  return (
    <div style={{
      position:'fixed', bottom:18, right:18, zIndex:999,
      width:256, background:'#fff',
      borderRadius:14, border:'1px solid #E8EAEF',
      boxShadow:'0 20px 48px -12px rgba(11,14,20,.22)',
      padding:'14px 14px 12px',
      fontFamily:'Pretendard Variable, Pretendard, sans-serif',
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
        <div style={{fontSize:12, fontWeight:700, color:'#0B0E14'}}>Tweaks</div>
        <div style={{fontSize:10.5, color:'#9AA1AE'}}>unwritten</div>
      </div>

      <Row label="Layout">
        <Chip active={tweaks.showAll} onClick={()=>setTweaks({showAll:true})}>전체 캔버스</Chip>
        <Chip active={!tweaks.showAll} onClick={()=>setTweaks({showAll:false})}>한 개만</Chip>
      </Row>

      {!tweaks.showAll && (
        <Row label="Home Variant">
          {variants.map(v=>(
            <Chip key={v.id} active={tweaks.variant===v.id} onClick={()=>setTweaks({variant:v.id})}>
              {v.id.toUpperCase()}
            </Chip>
          ))}
        </Row>
      )}

      <Row label="홈 답변 상태">
        <Chip active={tweaks.state==='answered'} onClick={()=>setTweaks({state:'answered'})}>답변 완료</Chip>
        <Chip active={tweaks.state==='empty'} onClick={()=>setTweaks({state:'empty'})}>빈 홈</Chip>
      </Row>

      <div style={{fontSize:10.5, color:'#9AA1AE', lineHeight:1.5, borderTop:'1px solid #F0F1F3', paddingTop:8, marginTop:2}}>
        <b>홈</b> M1: 대화/정리됨 토글 · M2: 카테고리 칩<br/>
        <b>콘텐츠</b> 투표 선택지 눌러보기, 직군 칩 필터링
      </div>
    </div>
  );
}

window.TweaksPanel = TweaksPanel;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
