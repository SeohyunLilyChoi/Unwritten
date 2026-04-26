import { useState } from 'react'
import { Plus, Chevron } from '../common/Icons'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CM_TABS = [
  { id: 'hot',    label: '🔥 핫이슈',  count: 12 },
  { id: 'office', label: '회사생활',   count: 48 },
  { id: 'skill',  label: '업무스킬',   count: 31 },
  { id: 'career', label: '커리어',     count: 24 },
  { id: 'money',  label: '돈·협상',    count: 9  },
]

const CM_THREADS = [
  {
    id: 'th-1',
    merged: 1248,
    tag: '#휴가',
    hot: true,
    question: '연차 상신할 때 사유, 뭐라고 적는 게 베스트인가요?',
    aiSummary: '대부분의 기업에서는 "개인 사유" 또는 "개인 용무"로 기재하는 것이 표준입니다. 구체적인 사유를 묻는 것은 점차 지양되는 추세이나, 보수적인 조직이라면 "은행 업무", "병원 진료" 등 포괄적인 목적을 적는 것을 추천합니다.',
    aiTags: ['#개인사유 압도적', '#회사 문화 따라다름', '#신입일수록 눈치'],
    opinions: [
      { role: '개발', year: '3년차', stance: '공감', color: '#3B5BFF', bg: '#EEF1FF', text: '무조건 개인사유죠. 반려당한 적 한 번도 없어요.' },
      { role: '기획', year: '1년차', stance: '반대', color: '#EF4444', bg: '#FFF0F0', text: '저희 팀장님은 꼬치꼬치 캐물으셔서 적당히 병원간다고 해요 ㅠㅠ' },
      { role: '마케팅', year: '5년차', stance: '추가', color: '#16A34A', bg: '#E7F6EC', text: '팀 분위기를 보는 게 맞는 것 같아요. 스타트업이냐 대기업이냐에 따라 달라서요.' },
    ],
    likeCount: 2147, commentCount: 384, viewCount: '8.4만',
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
      { role: '개발', year: '4년차', stance: '공감', color: '#3B5BFF', bg: '#EEF1FF', text: '저는 혼밥하면서 유튜브 보는 게 소확행이에요. 눈치 1도 안 봐요.' },
      { role: '영업', year: '2년차', stance: '반대', color: '#EF4444', bg: '#FFF0F0', text: '영업팀은 아직도 다 같이 먹는 분위기라 혼자 나가면 어색해요...' },
    ],
    likeCount: 1284, commentCount: 217, viewCount: '3.1만',
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
      { role: '기획', year: '3년차', stance: '공감', color: '#3B5BFF', bg: '#EEF1FF', text: '완료/진행중/다음주 3단 구조가 제일 깔끔해요. 볼드로 항목 강조도 추가.' },
      { role: '인사', year: '6년차', stance: '추가', color: '#16A34A', bg: '#E7F6EC', text: '팀장마다 선호가 달라서 처음엔 기존 보고 포맷 보여달라고 하세요.' },
    ],
    likeCount: 932, commentCount: 156, viewCount: '2.2만',
  },
]

const CM_TRENDING = [
  { tag: '#연봉협상', count: 842 },
  { tag: '#퇴직금',   count: 614 },
  { tag: '#재택근무', count: 527 },
  { tag: '#팀장관계', count: 441 },
]

const TREND_COLORS = ['#3B5BFF', '#7A5BFF', '#D97757', '#16A34A']
const SUMMARY_HEADLINES = {
  'th-1': '개인 사유로 적는 게 가장 무난해요',
  'th-2': '혼밥은 꽤 자연스러운 선택이에요',
  'th-3': '완료, 진행, 다음 계획 순서가 깔끔해요',
}

// ─── Thread card ──────────────────────────────────────────────────────────────
function ThreadCard({ thread: th, expanded, onToggle, onAskAI }) {
  return (
    <article style={{
      background: '#fff', borderRadius: 16,
      border: '1px solid var(--line-2)',
      boxShadow: th.hot
        ? '0 4px 20px -8px rgba(59,91,255,.18), 0 1px 3px rgba(11,14,20,.04)'
        : 'var(--shadow-sm)',
      overflow: 'hidden',
    }}>
      {/* Question + stats */}
      <button onClick={onToggle} style={{
        width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer',
        padding: '14px 14px 12px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <div style={{ display: 'inline-flex', flexShrink: 0 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 20, height: 20, borderRadius: 99, border: '1.5px solid #fff',
                    background: `hsl(${220 + i * 20},60%,${70 - i * 8}%)`,
                    marginLeft: i === 0 ? 0 : -6,
                    fontSize: 8, color: '#fff', fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>Q</div>
                ))}
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                {th.merged.toLocaleString()}개 질문 병합
              </span>
            </div>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--muted-2)', background: 'var(--line-2)', padding: '2px 7px', borderRadius: 99, flexShrink: 0 }}>{th.tag}</span>
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.35, color: 'var(--ink)', textAlign: 'left' }}>{th.question}</div>
        </div>
        <div style={{ marginTop: 2, color: '#9AA1AE', flexShrink: 0 }}>
          <Chevron s={16} dir={expanded ? 'up' : 'down'} />
        </div>
      </button>

      {expanded && (
        <>
          {/* AI 핵심 요약 */}
          <div style={{ margin: '0 14px 12px', background: '#fff', border: '1px solid var(--line-2)', borderRadius: 12, padding: '12px 12px 11px' }}>
            <p style={{ display: 'inline', margin: 0, fontSize: 16, fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.35, color: 'var(--ink)', background: 'rgba(160,237,224,.3)' }}>
              {SUMMARY_HEADLINES[th.id]}
            </p>
            <p style={{ margin: '9px 0 0', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
              {th.aiSummary}
            </p>
          </div>

          {/* 커뮤니티 의견 */}
          <div style={{ padding: '0 14px 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
                <circle cx="17" cy="9" r="2.5" /><path d="M15 15c3 0 6 1.5 6 5" />
              </svg>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-2)' }}>커뮤니티의 생생한 의견</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {th.opinions.map((op, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10, alignItems: 'start',
                  padding: '9px 11px', background: '#FBFBFD', border: '1px solid var(--line-2)', borderRadius: 10,
                }}>
                  <div style={{ flexShrink: 0, padding: '3px 7px', borderRadius: 7, background: op.bg, color: op.color, fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 2 }}>
                    {op.role} {op.year}
                  </div>
                  <div>
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: op.color, background: op.bg, padding: '1px 6px', borderRadius: 4 }}>{op.stance}</span>
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{op.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 8, padding: '14px' }}>
            <button
              onClick={() => onAskAI?.({
                type: 'community',
                title: th.question,
                meta: `${th.merged.toLocaleString()}개 질문 병합 · ${th.tag}`,
                summary: SUMMARY_HEADLINES[th.id],
                body: th.aiSummary,
              })}
              style={{
              flex: 1, padding: '10px 0', background: '#fff', border: '1px dashed rgba(59,91,255,.35)',
              borderRadius: 12, fontSize: 14, fontWeight: 600, color: 'var(--brand)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
              </svg>
              AI에게 물어보기
            </button>
            <button
              style={{
                flex: 1, padding: '10px 0', background: 'var(--brand)',
                border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                boxShadow: '0 4px 12px -4px rgba(59,91,255,.4)',
              }}>
              자세히 보기
            </button>
          </div>
        </>
      )}
    </article>
  )
}

// ─── CommunityScreen ──────────────────────────────────────────────────────────
export default function CommunityScreen({ onAskAI }) {
  const [tab, setTab] = useState('hot')
  const [expanded, setExpanded] = useState({ 'th-1': true })

  const toggleExpand = id => setExpanded(e => ({ ...e, [id]: !e[id] }))
  const max = CM_TRENDING[0].count

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header */}
      <header style={{ padding: '14px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--ink)' }}>unwritten</div>
          <div style={{ width: 5, height: 5, background: 'var(--brand)', borderRadius: 99 }} />
        </div>
        <button style={{
          width: 34, height: 34, borderRadius: 10, border: '1px solid var(--line)', background: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)', cursor: 'pointer',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid var(--line-2)', padding: '2px 20px 0' }}>
        {CM_TABS.map(t => {
          const on = tab === t.id
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
              padding: '9px 10px 8px',
              fontSize: 13.5, fontWeight: on ? 700 : 500,
              color: on ? 'var(--ink)' : 'var(--muted)',
              borderBottom: on ? '2px solid var(--ink)' : '2px solid transparent',
              display: 'inline-flex', alignItems: 'center', gap: 5,
              whiteSpace: 'nowrap',
            }}>
              {t.label}
              {t.count > 0 && (
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: on ? 'var(--brand)' : 'var(--muted-2)',
                  background: on ? 'var(--brand-soft)' : 'var(--line-2)',
                  padding: '1px 5px', borderRadius: 99, fontVariantNumeric: 'tabular-nums',
                }}>{t.count}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Feed */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 100px' }}>
        {/* Thread list */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink)' }}>활발한 논의</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {CM_THREADS.map(th => (
            <ThreadCard
              key={th.id}
              thread={th}
              expanded={!!expanded[th.id]}
              onToggle={() => toggleExpand(th.id)}
              onAskAI={onAskAI}
            />
          ))}
        </div>

        {/* Community summary */}
        <div style={{
          background: '#fff',
          border: '1px solid var(--line-2)',
          borderRadius: 16,
          padding: '14px 14px 13px',
          marginBottom: 24,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink)' }}>
              커뮤니티 요약
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand)', background: 'var(--brand-soft)', padding: '2px 7px', borderRadius: 99 }}>
              오늘
            </span>
          </div>
          <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>
            연차 사유, 점심 혼밥, 주간 보고처럼 바로 내일 써먹을 수 있는 회사생활 질문이 활발해요.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
            {[
              { label: '새 글', value: '128' },
              { label: '댓글', value: '757' },
              { label: '핫이슈', value: '12' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--line-2)', borderRadius: 12, padding: '9px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{item.value}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending — visual bar style */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 15 }}>🔥</span>
              <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink)' }}>지금 뜨는 주제</span>
            </div>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>최근 24시간</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CM_TRENDING.map((t, i) => {
              const pct = Math.round(t.count / max * 100)
              const c = TREND_COLORS[i]
              return (
                <button key={i} style={{
                  textAlign: 'left', background: '#fff', border: '1px solid var(--line-2)',
                  borderRadius: 12, padding: '10px 12px', cursor: 'pointer',
                  display: 'grid', gridTemplateColumns: '20px 1fr auto', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--muted-2)', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>{t.tag}</div>
                    <div style={{ height: 4, background: 'var(--line-2)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 99 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: c, fontVariantNumeric: 'tabular-nums', minWidth: 34, textAlign: 'right' }}>
                    {t.count.toLocaleString()}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* FAB */}
      <button style={{
        position: 'fixed',
        right: 18,
        bottom: 'calc(64px + env(safe-area-inset-bottom, 0px) + 18px)',
        width: 52, height: 52, borderRadius: 99,
        background: 'var(--ink)', color: '#fff',
        border: 'none', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 20px -6px rgba(11,14,20,.35)',
        zIndex: 30,
      }}>
        <Plus s={22} />
      </button>
    </div>
  )
}
