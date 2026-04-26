import { useState } from 'react'
import { Sparkle, Arrow, Clock, Chevron } from '../common/Icons'
import { me } from '../../data/mockData'
import {
  CONTENT_TYPES, CONTENT_TOPICS,
  CONTENT_POLLS, CONTENT_ARTICLES, CONTENT_CONTESTS, CONTENT_WORDS, CONTENT_TIPS,
} from '../../data/contentData'

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  return (
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
  )
}

// ─── Topic chips ──────────────────────────────────────────────────────────────
function TopicChips({ value, onChange }) {
  return (
    <div style={{ padding: '8px 20px 10px', borderBottom: '1px solid var(--line-2)', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
      {CONTENT_TOPICS.map(c => {
        const on = value === c.id
        return (
          <button key={c.id} onClick={() => onChange(c.id)} style={{
            flexShrink: 0, padding: '7px 12px', borderRadius: 99,
            fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer',
            border: `1px solid ${on ? 'var(--brand)' : 'var(--line)'}`,
            background: on ? 'var(--brand)' : '#fff',
            color: on ? '#fff' : 'var(--ink-2)',
          }}>
            {c.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, subtitle, children }) {
  return (
    <section style={{ marginTop: 32 }}>
      <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.025em', color: 'var(--ink)' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>}
        </div>
        <button style={{
          border: 'none', background: 'none', cursor: 'pointer',
          fontSize: 13.5, fontWeight: 600, color: 'var(--muted)',
          display: 'inline-flex', alignItems: 'center', gap: 3,
        }}>
          전체 보기 <Chevron s={12} dir="right" c="var(--muted)" />
        </button>
      </div>
      {children}
    </section>
  )
}

// ─── AI CTA button ────────────────────────────────────────────────────────────
function AskAICta({ type = 'poll', label = '이 내용, AI에게 물어보기', onAskAI, context }) {
  const T = CONTENT_TYPES[type] || CONTENT_TYPES.poll
  return (
    <button
      onClick={() => onAskAI?.(context || label)}
      style={{
        marginTop: 12, width: '100%', padding: '9px 10px',
        background: '#fff', border: `1px dashed ${T.color}55`, borderRadius: 10,
        fontSize: 13, fontWeight: 600, color: T.ink, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      }}>
      <Sparkle s={11} c={T.color} /> {label} <Arrow s={11} c={T.ink} />
    </button>
  )
}

// ─── Poll card ────────────────────────────────────────────────────────────────
function PollCard({ poll, onAskAI, onNext }) {
  const T = CONTENT_TYPES.poll
  const [voted, setVoted] = useState(poll.options.some(o => o.self))
  const top = Math.max(...poll.options.map(o => o.pct))

  return (
    <div style={{
      width: '100%',
      background: '#fff', border: `1px solid ${T.soft}`, borderRadius: 16,
      padding: '14px 14px 12px',
      boxShadow: '0 1px 2px rgba(11,14,20,.03)',
    }}>
      <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.35 }}>
        {poll.title}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 500, marginTop: 6, textAlign: 'right' }}>
        {poll.nParticipants.toLocaleString()}명 참여
      </div>

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {poll.options.map((o, i) => {
          const isTop = voted && o.pct === top
          return (
            <button key={i} onClick={() => setVoted(true)} style={{
              position: 'relative', overflow: 'hidden',
              width: '100%', padding: '8px 10px', textAlign: 'left',
              background: '#fff',
              border: `1px solid ${voted && o.self ? T.color : 'var(--line)'}`,
              borderRadius: 10, cursor: 'pointer',
              fontSize: 13.5, fontWeight: 600, color: 'var(--ink-2)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
            }}>
              {voted && (
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${o.pct}%`,
                  background: o.self ? T.soft : 'rgba(11,14,20,.04)',
                  transition: 'width .4s',
                }} />
              )}
              <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {voted && o.self && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                )}
                {o.label}
                {isTop && <span style={{ fontSize: 9.5, fontWeight: 700, color: T.ink, background: T.soft, padding: '1px 5px', borderRadius: 4 }}>1위</span>}
              </span>
              {voted && (
                <span style={{ position: 'relative', zIndex: 1, fontSize: 13.5, fontWeight: 700, color: o.self ? T.color : 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
                  {o.pct}%
                </span>
              )}
            </button>
          )
        })}
      </div>

      {voted && (
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button
            onClick={() => onAskAI?.(poll.title)}
            style={{
              padding: '9px 10px',
              background: '#fff', border: `1px dashed ${T.color}55`, borderRadius: 10,
              fontSize: 13, fontWeight: 600, color: T.ink, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            }}>
            <Sparkle s={11} c={T.color} /> AI에게 물어보기
          </button>
          <button
            onClick={onNext}
            style={{
              padding: '9px 10px',
              background: T.color, border: `1px solid ${T.color}`, borderRadius: 10,
              fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            }}>
            다음 투표 <Chevron s={12} dir="right" c="#fff" />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Article row ──────────────────────────────────────────────────────────────
function ArticleRow({ article, hero = false }) {
  const T = CONTENT_TYPES.article
  if (hero) {
    return (
      <div style={{ background: '#fff', border: '1px solid var(--line-2)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ height: 148, background: article.cover, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 12, top: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, background: 'rgba(255,255,255,.94)', padding: '3px 8px', borderRadius: 99 }}>
              {article.tag}
            </span>
          </div>
          <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: T.ink, background: 'rgba(255,255,255,.94)', padding: '3px 8px', borderRadius: 99 }}>
            <Clock s={10} c={T.ink} /> {article.minutes}분
          </div>
        </div>
        <div style={{ padding: '14px 14px 12px' }}>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.025em', color: 'var(--ink)', lineHeight: 1.35 }}>{article.title}</div>
          <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55, marginTop: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</div>
          <div style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 8 }}>{article.author} · {article.date}</div>
        </div>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', gap: 12, background: '#fff', border: '1px solid var(--line-2)', borderRadius: 14, padding: 12, alignItems: 'stretch' }}>
      <div style={{ width: 86, minHeight: 86, borderRadius: 10, background: article.cover, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, letterSpacing: '.04em', marginBottom: 3 }}>{article.tag}</div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted-2)', marginTop: 6 }}>
          <span>{article.date}</span>
          <span>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Clock s={11} /> {article.minutes}분</span>
        </div>
      </div>
    </div>
  )
}

// ─── Contest card ─────────────────────────────────────────────────────────────
function ContestCard({ contest }) {
  const T = CONTENT_TYPES.contest
  return (
    <div style={{
      background: '#fff', border: `1px solid ${T.soft}`, borderRadius: 16, padding: '14px 14px 12px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: T.color }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, background: T.soft, padding: '2px 8px', borderRadius: 99 }}>{contest.tag}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: T.color, fontVariantNumeric: 'tabular-nums' }}>D-{contest.daysLeft}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.35 }}>{contest.title}</div>
      <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55, marginTop: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{contest.excerpt}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, gap: 8 }}>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--muted)' }}>
          <span>🏆 상금 <b style={{ color: T.ink, fontWeight: 700 }}>{contest.prize}</b></span>
          <span>·</span>
          <span>{contest.nApplied}명 응모</span>
        </div>
        <button style={{
          padding: '6px 11px', borderRadius: 8, border: 'none', background: T.color, color: '#fff',
          fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>참여하기</button>
      </div>
    </div>
  )
}

// ─── Word card ────────────────────────────────────────────────────────────────
function WordCard({ word, onAskAI }) {
  const T = CONTENT_TYPES.word
  return (
    <div style={{
      background: `linear-gradient(180deg, #FFFFFF 0%, ${T.soft} 100%)`,
      border: `1px solid ${T.soft}`, borderRadius: 16, padding: '16px 16px 14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, background: '#fff', border: `1px solid ${T.soft}`, padding: '2px 8px', borderRadius: 99 }}>
          {word.tag}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--ink)' }}>{word.word}</div>
        <div style={{ fontSize: 14, color: 'var(--muted)', fontStyle: 'italic' }}>{word.pron}</div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>{word.def}</div>
      <div style={{ marginTop: 10, padding: '10px 12px', borderLeft: `2px solid ${T.color}`, fontSize: 14, color: 'var(--muted)', lineHeight: 1.55, fontStyle: 'italic', background: 'rgba(255,255,255,.5)' }}>
        예) {word.example}
      </div>
      <AskAICta type="word" label="이 단어, AI에게 더 설명해달라기" onAskAI={onAskAI} context={word.word} />
    </div>
  )
}

// ─── Tip card (2-col grid) ────────────────────────────────────────────────────
function TipCard({ tip }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--line-2)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 92, background: tip.cover }} />
      <div style={{ padding: '10px 11px 11px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-.015em', color: 'var(--ink)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {tip.title}
        </div>
      </div>
    </div>
  )
}

// ─── Personalized recommendation card ─────────────────────────────────────────
function PersonalizedCard({ onAskAI }) {
  const recs = [
    { type: 'poll',    title: '마케팅 직군 연봉 협상 타이밍, 언제가 좋을까요?', tag: '#연봉협상', meta: '마케팅 1–3년차 823명 참여' },
    { type: 'article', title: '신입 마케터 첫 3개월, 이것만은 꼭 챙기세요',    tag: '#커리어',  meta: '5분 읽기' },
    { type: 'tip',     title: '주간 보고 깔끔하게 쓰는 3단 구조',              tag: '#업무스킬', meta: '카드뉴스' },
  ]
  const typeColor = { poll: '#3B5BFF', article: '#D97757', tip: '#0EA5E9' }
  const typeSoft  = { poll: '#EEF1FF', article: '#FBEFE8', tip: '#E4F4FC' }
  const typeLabel = { poll: '투표',    article: '아티클',  tip: '팁' }

  return (
    <section style={{ marginTop: 14 }}>
      <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
        </svg>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.025em', color: 'var(--ink)' }}>
          {me.jobLabel} · {me.yearsLabel} 맞춤 추천
        </span>
      </div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px 22px', scrollbarWidth: 'none' }}>
        {recs.map((r, i) => (
          <button key={i} onClick={() => onAskAI?.(r.title)} style={{
            flex: '0 0 232px', minHeight: 122,
            textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12,
            background: '#fff', border: '1px solid var(--line-2)', borderRadius: 14, padding: '13px 13px 12px', cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(11,14,20,.03)',
          }}>
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '3px 8px', borderRadius: 99, background: typeSoft[r.type],
                fontSize: 11, fontWeight: 700, color: typeColor[r.type],
              }}>{typeLabel[r.type]}</span>
              <div style={{ marginTop: 9, fontSize: 14.5, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.title}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: typeColor[r.type], whiteSpace: 'nowrap' }}>{r.tag}</span>
              <span style={{ fontSize: 12, color: 'var(--muted-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>· {r.meta}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

// ─── ContentScreen ────────────────────────────────────────────────────────────
export default function ContentScreen({ onAskAI }) {
  const [topic, setTopic] = useState('all')
  const [pollIndex, setPollIndex] = useState(0)

  const byTopic = (arr) => topic === 'all' ? arr : arr.filter(x => x.topic === topic)
  const visiblePolls = byTopic(CONTENT_POLLS)
  const currentPoll = visiblePolls.length > 0 ? visiblePolls[pollIndex % visiblePolls.length] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 44, paddingBottom: 80, minHeight: '100%' }}>
      <Header />

      {/* 개인화 추천 */}
      <PersonalizedCard onAskAI={onAskAI} />

      <TopicChips value={topic} onChange={setTopic} />

      {/* 투표 */}
      <Section title="이번 주 투표" subtitle="선배들의 실제 선택을 확인해보세요">
        <div style={{ padding: '0 24px 8px' }}>
          {currentPoll && (
            <PollCard
              key={currentPoll.id}
              poll={currentPoll}
              onAskAI={onAskAI}
              onNext={() => setPollIndex((i) => i + 1)}
            />
          )}
        </div>
      </Section>

      {/* 오늘의 단어 */}
      <Section title="오늘의 단어" subtitle="직장인이라면 알아두면 좋은 용어">
        <div style={{ padding: '0 24px' }}>
          <WordCard word={CONTENT_WORDS[0]} onAskAI={onAskAI} />
        </div>
      </Section>

      {/* 읽을거리 */}
      <Section title="읽을거리" subtitle="주제별 심층 기사">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 24px' }}>
          {byTopic(CONTENT_ARTICLES).map((a, i) => <ArticleRow key={a.id} article={a} hero={i === 0} />)}
        </div>
      </Section>

      {/* 콘테스트 */}
      <Section title="진행 중 콘테스트" subtitle="참여하고 상금도 받아보세요">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 24px' }}>
          {byTopic(CONTENT_CONTESTS).map(c => <ContestCard key={c.id} contest={c} />)}
        </div>
      </Section>

      {/* 짧은 팁 */}
      <Section title="짧은 팁" subtitle="1분이면 끝나는 카드뉴스">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 24px' }}>
          {byTopic(CONTENT_TIPS).map(t => <TipCard key={t.id} tip={t} />)}
        </div>
      </Section>

      <div style={{ height: 24 }} />
    </div>
  )
}
