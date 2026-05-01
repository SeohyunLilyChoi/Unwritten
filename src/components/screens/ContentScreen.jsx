import { useEffect, useRef, useState } from "react";
import { Sparkle, Arrow, Clock, Chevron } from "../common/Icons";
import { me } from "../../data/mockData";
import curiousImg from "../images/curious.png";
import voteIconImg from "../images/vote_icon.png";
import attendanceImg from "../images/attendance.png";
import tipsImg from "../images/tips.png";
import contestImg from "../images/contest.png";
import happyImg from "../images/happy.png";
import thumbsUpImg from "../images/thumbs_up.png";
import {
  CONTENT_TYPES,
  CONTENT_POLLS,
  CONTENT_ARTICLES,
  CONTENT_CONTESTS,
  CONTENT_WORDS,
  CONTENT_TIPS,
} from "../../data/contentData";

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ points }) {
  const [displayPoints, setDisplayPoints] = useState(0);
  const displayRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const end = points;
    timerRef.current = setInterval(() => {
      displayRef.current += 1;
      setDisplayPoints(displayRef.current);
      if (displayRef.current >= end) clearInterval(timerRef.current);
    }, 28);
    return () => clearInterval(timerRef.current);
  }, [points]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
        padding: "14px 20px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-.03em",
            color: "var(--ink)",
          }}
        >
          unwritten
        </div>
        <div
          style={{
            width: 5,
            height: 5,
            background: "var(--brand)",
            borderRadius: 99,
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            height: 30, padding: "0 10px",
            background: "#EEF2FF", borderRadius: 99,
            border: "none", cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="var(--brand)" />
            <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="inherit">P</text>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand)" }}>{displayPoints} P</span>
        </button>
        <button
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-2)",
            cursor: "pointer",
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, subtitle, children }) {
  return (
    <section style={{ marginTop: 32 }}>
      <div
        style={{
          padding: "0 20px 12px",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-.025em",
              color: "var(--ink)",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}
            >
              {subtitle}
            </div>
          )}
        </div>
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          전체 보기 <Chevron s={12} dir="right" c="var(--muted)" />
        </button>
      </div>
      {children}
    </section>
  );
}

// ─── AI CTA button ────────────────────────────────────────────────────────────
function AskAICta({
  type = "poll",
  label = "이 내용, AI에게 물어보기",
  onAskAI,
  context,
}) {
  const T = CONTENT_TYPES[type] || CONTENT_TYPES.poll;
  return (
    <button
      onClick={() => onAskAI?.(context || label)}
      style={{
        marginTop: 12,
        width: "100%",
        padding: "9px 10px",
        background: "#fff",
        border: `1px dashed ${T.color}55`,
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        color: T.ink,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Sparkle s={11} c={T.color} /> {label} <Arrow s={11} c={T.ink} />
    </button>
  );
}

// ─── Poll card ────────────────────────────────────────────────────────────────
function PollCard({ poll, onAskAI, onNext }) {
  const T = CONTENT_TYPES.poll;
  const [voted, setVoted] = useState(poll.options.some((o) => o.self));
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const selfIndex = poll.options.findIndex((o) => o.self);
    return selfIndex >= 0 ? selfIndex : null;
  });
  const [showResultBars, setShowResultBars] = useState(voted);
  const top = Math.max(...poll.options.map((o) => o.pct));
  const handleVote = (index) => {
    if (voted) return;
    setSelectedIndex(index);
    setVoted(true);
    requestAnimationFrame(() => setShowResultBars(true));
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        border: `1px solid ${T.soft}`,
        borderRadius: 16,
        padding: "14px 14px 12px",
        boxShadow: "0 1px 2px rgba(11,14,20,.03)",
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-.02em",
          color: "var(--ink)",
          lineHeight: 1.35,
        }}
      >
        {poll.title}
      </div>
      <div
        style={{
          fontSize: 11.5,
          color: "var(--muted)",
          fontWeight: 500,
          marginTop: 6,
          textAlign: "right",
        }}
      >
        {poll.nParticipants.toLocaleString()}명 참여
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {poll.options.map((o, i) => {
          const isTop = voted && o.pct === top;
          const isSelected = voted && selectedIndex === i;
          return (
            <button
              key={i}
              onClick={() => handleVote(i)}
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                padding: "8px 10px",
                textAlign: "left",
                background: "#fff",
                border: `1px solid ${isSelected ? T.color : "var(--line)"}`,
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 13.5,
                fontWeight: 600,
                color: "var(--ink-2)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
              }}
            >
              {voted && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: showResultBars ? `${o.pct}%` : 0,
                    background: isTop ? T.soft : "rgba(11,14,20,.04)",
                    transition: "width .45s ease-out",
                  }}
                />
              )}
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {isSelected && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={T.color}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                )}
                {o.label}
                {isTop && (
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: T.ink,
                      background: T.soft,
                      padding: "1px 5px",
                      borderRadius: 4,
                    }}
                  >
                    1위
                  </span>
                )}
              </span>
              {voted && (
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: isTop ? T.color : "var(--muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {o.pct}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {voted && (
        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          <button
            onClick={() =>
              onAskAI?.({
                type: "poll",
                title: poll.title,
                meta: `${poll.nParticipants.toLocaleString()}명 참여`,
                options: poll.options,
              })
            }
            style={{
              padding: "9px 10px",
              background: "#fff",
              border: `1px dashed ${T.color}55`,
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: T.ink,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Sparkle s={11} c={T.color} /> AI에게 물어보기
          </button>
          <button
            onClick={onNext}
            style={{
              padding: "9px 10px",
              background: T.color,
              border: `1px solid ${T.color}`,
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            다음 투표 <Chevron s={12} dir="right" c="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Article row ──────────────────────────────────────────────────────────────
function ArticleRow({ article, hero = false }) {
  const T = CONTENT_TYPES.article;
  if (hero) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--line-2)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 148,
            background: article.cover,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", left: 12, top: 12 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.ink,
                background: "rgba(255,255,255,.94)",
                padding: "3px 8px",
                borderRadius: 99,
              }}
            >
              {article.tag}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: T.ink,
              background: "rgba(255,255,255,.94)",
              padding: "3px 8px",
              borderRadius: 99,
            }}
          >
            <Clock s={10} c={T.ink} /> {article.minutes}분
          </div>
        </div>
        <div style={{ padding: "14px 14px 12px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "-.025em",
              color: "var(--ink)",
              lineHeight: 1.35,
            }}
          >
            {article.title}
          </div>
          <div
            style={{
              fontSize: 13.5,
              color: "var(--muted)",
              lineHeight: 1.55,
              marginTop: 6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted-2)", marginTop: 8 }}>
            {article.author} · {article.date}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        background: "#fff",
        border: "1px solid var(--line-2)",
        borderRadius: 14,
        padding: 12,
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          width: 86,
          minHeight: 86,
          borderRadius: 10,
          background: article.cover,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: T.ink,
              letterSpacing: ".04em",
              marginBottom: 3,
            }}
          >
            {article.tag}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-.02em",
              color: "var(--ink)",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "var(--muted-2)",
            marginTop: 6,
          }}
        >
          <span>{article.date}</span>
          <span>·</span>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 3 }}
          >
            <Clock s={11} /> {article.minutes}분
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Contest card ─────────────────────────────────────────────────────────────
function ContestCard({ contest }) {
  const T = CONTENT_TYPES.contest;
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${T.soft}`,
        borderRadius: 16,
        padding: "14px 14px 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: T.color,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: T.ink,
            background: T.soft,
            padding: "2px 8px",
            borderRadius: 99,
          }}
        >
          {contest.tag}
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: T.color,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          D-{contest.daysLeft}
        </span>
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "-.02em",
          color: "var(--ink)",
          lineHeight: 1.35,
        }}
      >
        {contest.title}
      </div>
      <div
        style={{
          fontSize: 13.5,
          color: "var(--muted)",
          lineHeight: 1.55,
          marginTop: 4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {contest.excerpt}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 12,
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          <span>
            🏆 상금{" "}
            <b style={{ color: T.ink, fontWeight: 700 }}>{contest.prize}</b>
          </span>
          <span>·</span>
          <span>{contest.nApplied}명 응모</span>
        </div>
        <button
          style={{
            padding: "6px 11px",
            borderRadius: 8,
            border: "none",
            background: T.color,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          참여하기
        </button>
      </div>
    </div>
  );
}

// ─── Point toast ─────────────────────────────────────────────────────────────
function PointToast({ amount, visible }) {
  return (
    <div style={{
      position: "fixed",
      top: 72,
      left: "50%",
      transform: `translateX(-50%) translateY(${visible ? 0 : -8}px)`,
      opacity: visible ? 1 : 0,
      transition: "opacity .25s ease, transform .25s ease",
      zIndex: 200,
      pointerEvents: "none",
      background: "rgba(17,17,17,.88)",
      color: "#fff",
      fontSize: 13,
      fontWeight: 700,
      padding: "9px 18px",
      borderRadius: 99,
      whiteSpace: "nowrap",
      backdropFilter: "blur(6px)",
    }}>
      +{amount}포인트를 획득했어요! 🎉
    </div>
  );
}

// ─── Word quiz card ───────────────────────────────────────────────────────────
function WordCard({ word, onAskAI, onNext, onEarnPoint }) {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);

  const answered = selected !== null;
  const isCorrect = selected === word.answer;

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
  };

  const optionStyle = (i) => {
    const base = {
      width: "100%", textAlign: "left", cursor: answered ? "default" : "pointer",
      border: "1px solid var(--line)", borderRadius: 10,
      padding: "10px 12px", fontSize: 14, fontWeight: 500,
      background: "#fff", color: "var(--ink-2)",
      display: "flex", alignItems: "center", gap: 10,
    };
    if (!answered) return base;
    if (i === word.answer) return { ...base, background: "#E7F6EC", border: "1px solid #16A34A", color: "#15803D", fontWeight: 600 };
    if (i === selected)   return { ...base, background: "#FFF0F0", border: "1px solid #EF4444", color: "#DC2626" };
    return { ...base, opacity: 0.4 };
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <div style={{
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform .65s cubic-bezier(.4,0,.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>

        {/* ── FRONT: 퀴즈 ── */}
        <div style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          background: "#fff",
          border: "1px solid var(--line-2)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid var(--line-2)", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.025em", color: "var(--ink)" }}>
              "{word.word}"
            </div>
          </div>
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {word.options.map((opt, i) => (
              <button key={i} onClick={() => handleSelect(i)} style={optionStyle(i)}>
                <span style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: 99,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800,
                  background: answered && i === word.answer ? "#16A34A"
                    : answered && i === selected ? "#EF4444"
                    : "var(--line)",
                  color: answered && (i === word.answer || i === selected) ? "#fff" : "var(--muted)",
                }}>
                  {answered && i === word.answer ? "✓" : answered && i === selected ? "✗" : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
            {answered && (
              <button
                onClick={() => { onEarnPoint?.(10); setTimeout(() => setFlipped(true), 900); }}
                style={{
                  alignSelf: "center",
                  marginTop: 4,
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "7px 16px",
                  background: "var(--brand)",
                  border: "none", borderRadius: 99,
                  fontSize: 13, fontWeight: 700, color: "#fff",
                  cursor: "pointer",
                }}
              >
                포인트 받고 설명 보기
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ── BACK: 단어장 ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: "#fff",
          border: "1px solid var(--line-2)",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px 16px 16px",
        }}>
          {/* 스크랩 버튼 */}
          <div style={{ position: "absolute", top: 14, right: 14, display: "flex", alignItems: "center", gap: 6 }}>
            {saved && (
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)" }}>저장 완료</span>
            )}
            <button
              onClick={() => setSaved(v => !v)}
              style={{ background: "none", border: "none", padding: 2, cursor: "pointer", lineHeight: 0 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#111" : "none"} stroke={saved ? "#111" : "var(--muted)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 10,
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)" }}>
              {word.word}
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65, whiteSpace: "pre-line" }}>
              {word.explanation.replace(/\. /g, '.\n')}
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, textAlign: "left" }}>
              <div style={{
                flexShrink: 0,
                fontSize: 11, fontWeight: 700, color: "var(--muted)",
                letterSpacing: ".04em",
                background: "rgba(0,0,0,.06)", borderRadius: 6,
                padding: "2px 7px", lineHeight: 1.8,
              }}>
                예시
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, fontStyle: "italic", whiteSpace: "pre-line" }}>
                {word.example.replace(/\. /g, '.\n')}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
            <button
              onClick={() => onAskAI?.({ type: "word", title: word.word, body: word.explanation })}
              style={{
                padding: "9px 10px", background: "#fff",
                border: "1px dashed rgba(59,91,255,.35)", borderRadius: 10,
                fontSize: 13, fontWeight: 600, color: "var(--brand)",
                cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}
            >
              <Sparkle s={11} c="var(--brand)" /> AI에게 물어보기
            </button>
            <button
              onClick={onNext}
              style={{
                padding: "9px 10px", background: "var(--brand)", border: "none",
                borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#fff",
                cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}
            >
              다음 단어 <Chevron s={12} dir="right" c="#fff" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Tip card (2-col grid) ────────────────────────────────────────────────────
function TipCard({ tip }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line-2)",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 92, background: tip.cover }} />
      <div style={{ padding: "10px 11px 11px" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "-.015em",
            color: "var(--ink)",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tip.title}
        </div>
      </div>
    </div>
  );
}

// ─── Personalized recommendation hero banner ──────────────────────────────────
function PersonalizedCard({ onAskAI }) {
  const [recIndex, setRecIndex] = useState(0);
  const recs = [
    {
      type: "poll",
      title: "마케팅 직군 연봉 협상 타이밍, 언제가 좋을까요?",
      tag: "#연봉협상",
      meta: "마케팅 1–3년차 823명 참여",
      img: curiousImg,
    },
    {
      type: "article",
      title: "신입 마케터 첫 3개월, 이것만은 꼭 챙기세요",
      tag: "#커리어",
      meta: "5분 읽기",
      img: happyImg,
    },
    {
      type: "tip",
      title: "주간 보고 깔끔하게 쓰는 3단 구조",
      tag: "#업무스킬",
      meta: "카드뉴스",
      img: thumbsUpImg,
    },
  ];

  const typeConfig = {
    poll:    { label: "투표",   gradient: "linear-gradient(135deg,#3B5BFF 0%,#6B84FF 100%)" },
    article: { label: "아티클", gradient: "linear-gradient(135deg,#0D9488 0%,#2DD4BF 100%)" },
    tip:     { label: "팁",    gradient: "linear-gradient(135deg,#0EA5E9 0%,#38BDF8 100%)" },
  };

  useEffect(() => {
    const timer = setInterval(() => setRecIndex((i) => (i + 1) % recs.length), 3200);
    return () => clearInterval(timer);
  }, [recs.length]);

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* Slides */}
      <div
        style={{
          display: "flex",
          transform: `translateX(-${recIndex * 100}%)`,
          transition: "transform .45s ease",
        }}
      >
        {recs.map((r, i) => {
          const cfg = typeConfig[r.type];
          return (
            <button
              key={i}
              onClick={() => onAskAI?.(r.title)}
              style={{
                flex: "0 0 100%",
                height: 260,
                background: cfg.gradient,
                border: "none",
                cursor: "pointer",
                padding: "28px 24px 52px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div style={{
                position: "absolute", right: -50, top: -50,
                width: 200, height: 200, borderRadius: "50%",
                background: "rgba(255,255,255,.08)", pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", left: -30, bottom: -30,
                width: 140, height: 140, borderRadius: "50%",
                background: "rgba(255,255,255,.06)", pointerEvents: "none",
              }} />

              {/* Character image */}
              <img
                src={r.img}
                alt=""
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: 20,
                  height: 130,
                  width: "auto",
                  objectFit: "contain",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Top-left: type badge + tag/meta in a row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: "#fff",
                    background: "rgba(255,255,255,.22)",
                    padding: "3px 10px", borderRadius: 99,
                    flexShrink: 0,
                  }}>
                    {cfg.label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.9)" }}>
                    {r.tag}
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.65)" }}>
                    · {r.meta}
                  </span>
                </div>

                {/* Title */}
                <div style={{
                  fontSize: 21, fontWeight: 800,
                  color: "#fff", letterSpacing: "-.035em", lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {r.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: 18, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 5,
      }}>
        {recs.map((_, i) => (
          <button
            key={i}
            onClick={() => setRecIndex(i)}
            aria-label={`추천 ${i + 1} 보기`}
            style={{
              width: recIndex === i ? 16 : 5,
              height: 5,
              borderRadius: 99,
              border: "none",
              background: recIndex === i ? "#fff" : "rgba(255,255,255,.4)",
              padding: 0,
              cursor: "pointer",
              transition: "width .2s, background .2s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Quick menu ───────────────────────────────────────────────────────────────
const QUICK_MENUS = [
  {
    label: "출석 체크",
    color: "#3B5BFF",
    icon: <img src={attendanceImg} alt="출석 체크" width={32} height={32} style={{ objectFit: "contain" }} />,
  },
  {
    label: "직장인 투표",
    color: "#16A34A",
    icon: <img src={voteIconImg} alt="직장인 투표" width={32} height={32} style={{ objectFit: "contain" }} />,
  },
  {
    label: "직장생활\n꿀팁 모음",
    color: "#D97706",
    icon: <img src={tipsImg} alt="직장생활 꿀팁 모음" width={32} height={32} style={{ objectFit: "contain" }} />,
  },
  {
    label: "사회생활\n콘테스트",
    color: "#7C3AED",
    icon: <img src={contestImg} alt="사회생활 콘테스트" width={32} height={32} style={{ objectFit: "contain" }} />,
  },
];

function QuickMenu() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 8,
      padding: "18px 16px 14px",
      marginTop: 20,
      background: "#fff",
    }}>
      {QUICK_MENUS.map((m, i) => (
        <button
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: "0 10px",
          }}
        >
          <div style={{
            width: 52,
            height: 52,
            color: m.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#EEF2FF",
            borderRadius: 14,
          }}>
            {m.icon}
          </div>
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--ink-2)",
            textAlign: "center",
            lineHeight: 1.4,
            whiteSpace: "pre-line",
            wordBreak: "keep-all",
          }}>
            {m.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Weekly ranking ───────────────────────────────────────────────────────────
const WEEKLY_RANKING = [
  { rank: 2, nickname: "마케터J", job: "마케팅 4년차", score: 1842, avatarBg: "#C7D2FE", avatarColor: "#3730A3", initial: "J" },
  { rank: 1, nickname: "직장인박과장", job: "기획 7년차", score: 3210, avatarBg: "#FDE68A", avatarColor: "#92400E", initial: "박" },
  { rank: 3, nickname: "개발자K", job: "개발 2년차", score: 1490, avatarBg: "#BBF7D0", avatarColor: "#065F46", initial: "K" },
];

const RANK_CONFIG = {
  1: { medal: "🥇", labelColor: "#B45309", labelBg: "#FEF3C7", podiumH: 56 },
  2: { medal: "🥈", labelColor: "#4B5563", labelBg: "#F3F4F6", podiumH: 36 },
  3: { medal: "🥉", labelColor: "#92400E", labelBg: "#FEF3C7", podiumH: 20 },
};

function WeeklyRanking() {
  const order = [
    WEEKLY_RANKING.find(u => u.rank === 2),
    WEEKLY_RANKING.find(u => u.rank === 1),
    WEEKLY_RANKING.find(u => u.rank === 3),
  ];
  const avatarSize = { 1: 68, 2: 54, 3: 54 };

  return (
    <section style={{ padding: "28px 20px 24px" }}>
      {/* Title row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 28,
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.025em", color: "var(--ink)" }}>
          이번주 랭킹
        </span>
        <button style={{
          border: "none", background: "none", cursor: "pointer",
          fontSize: 13.5, fontWeight: 600, color: "var(--muted)",
          display: "inline-flex", alignItems: "center", gap: 3,
        }}>
          전체 보기 <Chevron s={12} dir="right" c="var(--muted)" />
        </button>
      </div>

      {/* Podium */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 12,
      }}>
        {order.map((user) => {
          const cfg = RANK_CONFIG[user.rank];
          const size = avatarSize[user.rank];
          const isFirst = user.rank === 1;
          return (
            <div key={user.rank} style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}>
              {/* Medal */}
              <span style={{ fontSize: isFirst ? 22 : 18, lineHeight: 1 }}>{cfg.medal}</span>

              {/* Avatar */}
              <div style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: user.avatarBg,
                color: user.avatarColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isFirst ? 22 : 18,
                fontWeight: 800,
                boxShadow: isFirst
                  ? "0 4px 16px -4px rgba(59,91,255,.22)"
                  : "0 2px 8px -2px rgba(11,14,20,.10)",
                border: isFirst ? "2.5px solid #FCD34D" : "2px solid rgba(255,255,255,.8)",
              }}>
                {user.initial}
              </div>

              {/* Nickname + job */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: isFirst ? 13.5 : 12.5,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-.01em",
                }}>
                  {user.nickname}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted-2)", marginTop: 2 }}>
                  {user.job}
                </div>
              </div>

              {/* Score */}
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: cfg.labelColor,
                background: cfg.labelBg,
                padding: "3px 10px",
                borderRadius: 99,
              }}>
                {user.score.toLocaleString()}점
              </div>

              {/* Podium step */}
              <div style={{
                width: "100%",
                height: cfg.podiumH,
                borderRadius: "8px 8px 0 0",
                background: isFirst
                  ? "linear-gradient(180deg,#FDE68A,#FCD34D)"
                  : "linear-gradient(180deg,var(--line-2),var(--line))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{
                  fontSize: 15,
                  fontWeight: 900,
                  color: isFirst ? "#92400E" : "var(--muted)",
                }}>
                  {user.rank}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── ContentScreen ────────────────────────────────────────────────────────────
export default function ContentScreen({ onAskAI }) {
  const [pollIndex, setPollIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [toast, setToast] = useState({ visible: false, amount: 0 });
  const toastTimerRef = useRef(null);

  const handleEarnPoint = (p) => {
    setPoints((prev) => prev + p);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, amount: p });
    toastTimerRef.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 1600);
  };

  const currentPoll =
    CONTENT_POLLS.length > 0
      ? CONTENT_POLLS[pollIndex % CONTENT_POLLS.length]
      : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: 80,
        minHeight: "100%",
      }}
    >
      <PointToast amount={toast.amount} visible={toast.visible} />
      <Header points={points} />

      {/* 개인화 추천 */}
      <PersonalizedCard onAskAI={onAskAI} />

      {/* 퀵메뉴 */}
      <QuickMenu />

      {/* 이번주 랭킹 */}
      <WeeklyRanking />

      {/* 투표 */}
      <Section
        title="A vs B, 000님의 선택은?"
        subtitle="선배들의 실제 선택을 확인해보세요"
      >
        <div style={{ padding: "0 24px 8px" }}>
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
      <Section title="오늘의 단어" subtitle="직장 용어, 얼마나 알고 있나요?">
        <div style={{ padding: "0 24px" }}>
          <WordCard
            key={CONTENT_WORDS[wordIndex % CONTENT_WORDS.length].id}
            word={CONTENT_WORDS[wordIndex % CONTENT_WORDS.length]}
            onAskAI={onAskAI}
            onNext={() => setWordIndex((i) => i + 1)}
            onEarnPoint={handleEarnPoint}
          />
        </div>
      </Section>

      {/* 짧은 팁 */}
      <Section title="짧은 팁" subtitle="1분이면 끝나는 카드뉴스">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            padding: "0 24px",
          }}
        >
          {CONTENT_TIPS.map((t) => (
            <TipCard key={t.id} tip={t} />
          ))}
        </div>
      </Section>

      {/* 읽을거리 */}
      <Section title="읽을거리" subtitle="주제별 심층 기사">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "0 24px",
          }}
        >
          {CONTENT_ARTICLES.map((a, i) => (
            <ArticleRow key={a.id} article={a} hero={i === 0} />
          ))}
        </div>
      </Section>

      <div style={{ height: 24 }} />
    </div>
  );
}
