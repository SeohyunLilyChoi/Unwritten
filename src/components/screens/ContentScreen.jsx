import { useEffect, useRef, useState } from "react";
import { Sparkle, Arrow, Clock, Chevron } from "../common/Icons";
import noteImg from "../images/note.png";
import presentationImg from "../images/presentation.png";
import pigImg from "../images/pig.png";
import voteIconImg from "../images/vote_icon.png";
import attendanceImg from "../images/attendance.png";
import tipsImg from "../images/tips.png";
import contestImg from "../images/contest.png";
import faceImg from "../images/face.png";
import thumb1Img from "../images/thumbnails/Q_thumb1.png";
import thumb2Img from "../images/thumbnails/Q_thumb2.png";
import thumb3Img from "../images/thumbnails/Q_thumb3.png";
import thumb4Img from "../images/thumbnails/Q_thumb4.png";
import rThumb1Img from "../images/thumbnails/R_thumb1.png";
import rThumb2Img from "../images/thumbnails/R_thumb2.png";
import rThumb3Img from "../images/thumbnails/R_thumb3.png";
import { CONTENT_TYPES } from "../../data/contentData";
import * as contentDataEn from "../../data/contentDataEn";
import * as contentDataKo from "../../data/contentData";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePoints } from "../../contexts/PointsContext";
import { translations } from "../../data/translations";

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ points }) {
  const [displayPoints, setDisplayPoints] = useState(points);
  const prevPointsRef = useRef(points);

  useEffect(() => {
    const start = prevPointsRef.current;
    const end = points;
    if (start === end) return;
    let current = start;
    const timer = setInterval(() => {
      current += 1;
      setDisplayPoints(current);
      if (current >= end) {
        clearInterval(timer);
        prevPointsRef.current = end;
      }
    }, 28);
    return () => clearInterval(timer);
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
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            height: 30,
            padding: "0 10px",
            background: "#EEF2FF",
            borderRadius: 99,
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="var(--brand)" />
            <text
              x="12"
              y="16.5"
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill="#fff"
              fontFamily="inherit"
            >
              P
            </text>
          </svg>
          <span
            style={{ fontSize: 12, fontWeight: 700, color: "var(--brand)" }}
          >
            {displayPoints.toLocaleString()} P
          </span>
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

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 7, background: "#F3F5FA", flexShrink: 0 }} />;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, subtitle, children }) {
  const { lang } = useLanguage();
  const t = translations[lang].content;
  return (
    <section style={{ marginTop: 32, paddingBottom: 24 }}>
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
          {t.viewAll} <Chevron s={12} dir="right" c="var(--muted)" />
        </button>
      </div>
      {children}
    </section>
  );
}

// ─── AI CTA button ────────────────────────────────────────────────────────────
function AskAICta({ type = "poll", onAskAI, context }) {
  const { lang } = useLanguage();
  const t = translations[lang].content;
  const T = CONTENT_TYPES[type] || CONTENT_TYPES.poll;
  return (
    <button
      onClick={() => onAskAI?.(context || t.askAICta)}
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
      <Sparkle s={11} c={T.color} /> {t.askAICta} <Arrow s={11} c={T.ink} />
    </button>
  );
}

// ─── Poll card ────────────────────────────────────────────────────────────────
function PollCard({ poll, onAskAI, onNext }) {
  const { lang } = useLanguage();
  const t = translations[lang].content;
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
        {t.participants(poll.nParticipants)}
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
                    {t.rank1}
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
                meta: t.participants(poll.nParticipants),
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
            <Sparkle s={11} c={T.color} /> {t.askAI}
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
            {t.nextPoll} <Chevron s={12} dir="right" c="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Article row ──────────────────────────────────────────────────────────────
function ArticleRow({ article, hero = false, thumb }) {
  const { lang } = useLanguage();
  const t = translations[lang].content;
  const T = CONTENT_TYPES.article;
  if (hero) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E1E2E8",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 148,
            background: article.cover,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {thumb && (
            <img
              src={thumb}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
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
            <Clock s={10} c={T.ink} /> {t.minuteRead(article.minutes)}
          </div>
        </div>
        <div style={{ padding: "14px 14px 12px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
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
        border: "1px solid #E1E2E8",
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
          overflow: "hidden",
          position: "relative",
        }}
      >
        {thumb && (
          <img
            src={thumb}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
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
              fontWeight: 600,
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
            <Clock s={11} /> {t.minuteRead(article.minutes)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Contest card ─────────────────────────────────────────────────────────────
function ContestCard({ contest }) {
  const { lang } = useLanguage();
  const t = translations[lang].content;
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
            {t.prize}{" "}
            <b style={{ color: T.ink, fontWeight: 700 }}>{contest.prize}</b>
          </span>
          <span>·</span>
          <span>
            {contest.nApplied} {t.applied}
          </span>
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
          {t.joinContest}
        </button>
      </div>
    </div>
  );
}

// ─── Word quiz card ───────────────────────────────────────────────────────────
function WordCard({ word, onAskAI, onNext, onEarnPoint }) {
  const { lang } = useLanguage();
  const t = translations[lang].content;
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);
  const [earned, setEarned] = useState(false);

  const answered = selected !== null;

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
  };

  const optionStyle = (i) => {
    const base = {
      width: "100%",
      textAlign: "left",
      cursor: answered ? "default" : "pointer",
      border: "1px solid var(--line)",
      borderRadius: 10,
      padding: "10px 12px",
      fontSize: 14,
      fontWeight: 500,
      background: "#fff",
      color: "var(--ink-2)",
      display: "flex",
      alignItems: "center",
      gap: 10,
    };
    if (!answered) return base;
    if (i === word.answer)
      return {
        ...base,
        background: "#E7F6EC",
        border: "1px solid #16A34A",
        color: "#15803D",
        fontWeight: 600,
      };
    if (i === selected)
      return {
        ...base,
        background: "#FFF0F0",
        border: "1px solid #EF4444",
        color: "#DC2626",
      };
    return { ...base, opacity: 0.4 };
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform .65s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "#fff",
            border: "1px solid var(--line-2)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 16px 14px",
              borderBottom: "1px solid var(--line-2)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-.025em",
                color: "var(--ink)",
              }}
            >
              "{word.word}"
            </div>
          </div>
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {word.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={optionStyle(i)}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: 99,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    background:
                      answered && i === word.answer
                        ? "#16A34A"
                        : answered && i === selected
                          ? "#EF4444"
                          : "var(--line)",
                    color:
                      answered && (i === word.answer || i === selected)
                        ? "#fff"
                        : "var(--muted)",
                  }}
                >
                  {answered && i === word.answer
                    ? "✓"
                    : answered && i === selected
                      ? "✗"
                      : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
            {answered && (
              <button
                onClick={() => {
                  if (earned) return;
                  setEarned(true);
                  onEarnPoint?.(10);
                  setTimeout(() => setFlipped(true), 900);
                }}
                style={{
                  alignSelf: "stretch",
                  marginTop: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  padding: "7px 16px",
                  background: "var(--brand)",
                  border: "none",
                  borderRadius: 99,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: earned ? "default" : "pointer",
                }}
              >
                {earned ? t.pointsEarned : t.earnPoints}
                {!earned && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {saved && (
              <span
                style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)" }}
              >
                {t.saved}
              </span>
            )}
            <button
              onClick={() => setSaved((v) => !v)}
              style={{
                background: "none",
                border: "none",
                padding: 2,
                cursor: "pointer",
                lineHeight: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={saved ? "#111" : "none"}
                stroke={saved ? "#111" : "var(--muted)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "-.03em",
                color: "var(--ink)",
              }}
            >
              {word.word}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--ink-2)",
                lineHeight: 1.65,
                whiteSpace: "pre-line",
              }}
            >
              {word.explanation.replace(/\. /g, ".\n")}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--muted)",
                  letterSpacing: ".04em",
                  background: "rgba(0,0,0,.06)",
                  borderRadius: 6,
                  padding: "2px 7px",
                  lineHeight: 1.8,
                }}
              >
                {t.exampleLabel}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  whiteSpace: "pre-line",
                }}
              >
                {word.example.replace(/\. /g, ".\n")}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginTop: 16,
            }}
          >
            <button
              onClick={() =>
                onAskAI?.({
                  type: "word",
                  title: word.word,
                  body: word.explanation,
                  prefillText: lang === 'en'
                    ? `Tell me more about "${word.word}"`
                    : `"${word.word}"에 대해 더 알려줘`,
                })
              }
              style={{
                padding: "9px 10px",
                background: "#fff",
                border: "1px dashed rgba(59,91,255,.35)",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--brand)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Sparkle s={11} c="var(--brand)" /> {t.askAI}
            </button>
            <button
              onClick={onNext}
              style={{
                padding: "9px 10px",
                background: "var(--brand)",
                border: "none",
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
              {t.nextWord} <Chevron s={12} dir="right" c="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tip card ─────────────────────────────────────────────────────────────────
function TipCard({ tip, thumb }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E1E2E8",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 92, background: tip.cover }}>
        <img
          src={thumb}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>
      <div style={{ padding: "10px 11px 11px" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
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
  const { lang } = useLanguage();
  const t = translations[lang].content;
  const [recIndex, setRecIndex] = useState(0);

  const recs =
    lang === "en"
      ? [
          {
            type: "poll",
            title: "When's the best time to negotiate salary in marketing?",
            tag: "#SalaryNegotiation",
            meta: "823 marketing 1–3yr employees",
            img: noteImg,
            imgRight: -90,
            imgBottom: -120,
            imgHeight: 350,
          },
          {
            type: "article",
            title: "First 3 months as a new marketing hire — what to do",
            titleHtml: "First 3 months<br/>as a new marketing hire<br/>— what to do",
            tag: "#Career",
            meta: "5 min read",
            img: presentationImg,
            imgRight: -70,
            imgBottom: -60,
            imgHeight: 300,
          },
          {
            type: "tip",
            title: "3-step structure for writing clean weekly reports",
            titleHtml: "3-step structure for writing<br/>clean weekly reports",
            tag: "#WorkSkills",
            meta: "Card News",
            img: pigImg,
            imgRight: -90,
            imgBottom: -80,
            imgHeight: 300,
          },
        ]
      : [
          {
            type: "poll",
            title: "마케팅 직군 연봉 협상 타이밍, 언제가 좋을까요?",
            tag: "#연봉협상",
            meta: "마케팅 1–3년차 823명 참여",
            img: noteImg,
            imgRight: -90,
            imgBottom: -120,
            imgHeight: 350,
          },
          {
            type: "article",
            title: "신입 마케터 첫 3개월, 이것만은 꼭 챙기세요",
            tag: "#커리어",
            meta: "5분 읽기",
            img: presentationImg,
            imgRight: -60,
            imgBottom: -30,
            imgHeight: 300,
          },
          {
            type: "tip",
            title: "주간 보고 깔끔하게 쓰는 3단 구조",
            tag: "#업무스킬",
            meta: "카드뉴스",
            img: pigImg,
            imgRight: -70,
            imgBottom: -50,
            imgHeight: 300,
          },
        ];

  const typeLabels = {
    en: { poll: "Poll", article: "Article", tip: "Tip" },
    ko: { poll: "투표", article: "아티클", tip: "팁" },
  };

  // ANIMATION PAUSED FOR FIGMA CAPTURE
  // useEffect(() => {
  //   const timer = setInterval(
  //     () => setRecIndex((i) => (i + 1) % recs.length),
  //     3200,
  //   );
  //   return () => clearInterval(timer);
  // }, [recs.length]);

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          transform: `translateX(-${recIndex * 100}%)`,
          transition: "transform .45s ease",
        }}
      >
        {recs.map((r, i) => (
          <button
            key={i}
            onClick={() => onAskAI?.(r.title)}
            style={{
              flex: "0 0 100%",
              height: 260,
              background: "linear-gradient(135deg,#3B5BFF 0%,#6B84FF 100%)",
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
            <div
              style={{
                position: "absolute",
                right: -50,
                top: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,.08)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -30,
                bottom: -30,
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: "rgba(255,255,255,.06)",
                pointerEvents: "none",
              }}
            />
            <img
              src={r.img}
              alt=""
              style={{
                position: "absolute",
                right: r.imgRight,
                bottom: r.imgBottom,
                height: r.imgHeight,
                width: "auto",
                objectFit: "contain",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    background: "rgba(255,255,255,.22)",
                    padding: "3px 10px",
                    borderRadius: 99,
                    flexShrink: 0,
                  }}
                >
                  {typeLabels[lang][r.type]}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(255,255,255,.9)",
                  }}
                >
                  {r.tag}
                </span>
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-.035em",
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {r.titleHtml
                  ? <span dangerouslySetInnerHTML={{ __html: r.titleHtml }} />
                  : r.title}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 24,
          display: "flex",
          gap: 5,
        }}
      >
        {recs.map((_, i) => (
          <button
            key={i}
            onClick={() => setRecIndex(i)}
            aria-label={t.carouselDot(i)}
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
function QuickMenu() {
  const { lang } = useLanguage();
  const t = translations[lang].content;
  const menuIcons = [
    <img
      src={attendanceImg}
      alt=""
      width={32}
      height={32}
      style={{ objectFit: "contain" }}
    />,
    <img
      src={voteIconImg}
      alt=""
      width={32}
      height={32}
      style={{ objectFit: "contain" }}
    />,
    <img
      src={tipsImg}
      alt=""
      width={32}
      height={32}
      style={{ objectFit: "contain" }}
    />,
    <img
      src={contestImg}
      alt=""
      width={32}
      height={32}
      style={{ objectFit: "contain" }}
    />,
  ];
  const menuColors = ["#3B5BFF", "#16A34A", "#D97706", "#7C3AED"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        padding: "18px 16px 22px",
        marginTop: 20,
        background: "#fff",
      }}
    >
      {t.quickMenus.map((label, i) => (
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
          <div
            style={{
              width: 52,
              height: 52,
              color: menuColors[i],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EEF2FF",
              borderRadius: 14,
            }}
          >
            {menuIcons[i]}
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--ink-2)",
              textAlign: "center",
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              wordBreak: "keep-all",
            }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Weekly ranking ───────────────────────────────────────────────────────────
const RANK_CONFIG = {
  1: { medal: "🥇", labelColor: "#B45309", labelBg: "#FEF3C7", podiumH: 56 },
  2: { medal: "🥈", labelColor: "#4B5563", labelBg: "#F3F4F6", podiumH: 36 },
  3: { medal: "🥉", labelColor: "#4B5563", labelBg: "#F3F4F6", podiumH: 20 },
};

function WeeklyRanking() {
  const { lang } = useLanguage();
  const t = translations[lang].content;

  const WEEKLY_RANKING =
    lang === "en"
      ? [
          {
            rank: 2,
            nickname: "MarketingJ",
            job: "Marketing · 4 Yrs",
            score: 1842,
            avatarBg: "#7B8FFF",
            avatarColor: "#fff",
          },
          {
            rank: 1,
            nickname: "SeniorPark",
            job: "Planning · 7 Yrs",
            score: 3210,
            avatarBg: "#4F6EFF",
            avatarColor: "#fff",
          },
          {
            rank: 3,
            nickname: "DevK",
            job: "Dev · 2 Yrs",
            score: 1490,
            avatarBg: "#8B72FF",
            avatarColor: "#fff",
          },
        ]
      : [
          {
            rank: 2,
            nickname: "마케터J",
            job: "마케팅 4년차",
            score: 1842,
            avatarBg: "#7B8FFF",
            avatarColor: "#fff",
          },
          {
            rank: 1,
            nickname: "직장인박과장",
            job: "기획 7년차",
            score: 3210,
            avatarBg: "#4F6EFF",
            avatarColor: "#fff",
          },
          {
            rank: 3,
            nickname: "개발자K",
            job: "개발 2년차",
            score: 1490,
            avatarBg: "#8B72FF",
            avatarColor: "#fff",
          },
        ];

  const order = [
    WEEKLY_RANKING.find((u) => u.rank === 2),
    WEEKLY_RANKING.find((u) => u.rank === 1),
    WEEKLY_RANKING.find((u) => u.rank === 3),
  ];
  const avatarSize = { 1: 68, 2: 54, 3: 54 };

  return (
    <section style={{ padding: "28px 20px 32px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-.025em",
            color: "var(--ink)",
          }}
        >
          {t.rankingTitle}
        </span>
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
          {t.viewAll} <Chevron s={12} dir="right" c="var(--muted)" />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {order.map((user) => {
          const cfg = RANK_CONFIG[user.rank];
          const size = avatarSize[user.rank];
          const isFirst = user.rank === 1;
          return (
            <div
              key={user.rank}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: isFirst ? 22 : 18, lineHeight: 1 }}>
                {cfg.medal}
              </span>
              <div
                style={{
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
                  border: isFirst
                    ? "2.5px solid #FCD34D"
                    : "2px solid rgba(255,255,255,.8)",
                }}
              >
                <img
                  src={faceImg}
                  alt=""
                  style={{ width: "62%", height: "62%", objectFit: "contain" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: isFirst ? 13.5 : 12.5,
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-.01em",
                  }}
                >
                  {user.nickname}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted-2)",
                    marginTop: 2,
                  }}
                >
                  {user.job}
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: cfg.labelColor,
                  background: cfg.labelBg,
                  padding: "3px 10px",
                  borderRadius: 99,
                }}
              >
                +{user.score.toLocaleString()}P
              </div>
              <div
                style={{
                  width: "100%",
                  height: cfg.podiumH,
                  borderRadius: "8px 8px 0 0",
                  background: isFirst
                    ? "linear-gradient(180deg,#FDE68A,#FCD34D)"
                    : "linear-gradient(180deg,var(--line-2),var(--line))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 900,
                    color: isFirst ? "#92400E" : "var(--muted)",
                  }}
                >
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
  const { lang } = useLanguage();
  const t = translations[lang].content;
  const CD = lang === "en" ? contentDataEn : contentDataKo;

  const [pollIndex, setPollIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const { points, earnPoints } = usePoints();

  const currentPoll =
    CD.CONTENT_POLLS.length > 0
      ? CD.CONTENT_POLLS[pollIndex % CD.CONTENT_POLLS.length]
      : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <Header points={points} />
      <PersonalizedCard onAskAI={onAskAI} />
      <QuickMenu />
      <WeeklyRanking />
      <Divider />

      <Section title={t.pollSection.title} subtitle={t.pollSection.subtitle}>
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

      <Divider />

      <Section title={t.tipSection.title} subtitle={t.tipSection.subtitle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            padding: "0 24px",
          }}
        >
          {CD.CONTENT_TIPS.map((tip, i) => (
            <TipCard
              key={tip.id}
              tip={tip}
              thumb={[thumb1Img, thumb2Img, thumb3Img, thumb4Img][i]}
            />
          ))}
        </div>
      </Section>

      <Divider />

      <Section title={t.wordSection.title} subtitle={t.wordSection.subtitle}>
        <div style={{ padding: "0 24px" }}>
          <WordCard
            key={CD.CONTENT_WORDS[wordIndex % CD.CONTENT_WORDS.length].id}
            word={CD.CONTENT_WORDS[wordIndex % CD.CONTENT_WORDS.length]}
            onAskAI={onAskAI}
            onNext={() => setWordIndex((i) => i + 1)}
            onEarnPoint={earnPoints}
          />
        </div>
      </Section>

      <Divider />

      <Section title={t.readSection.title} subtitle={t.readSection.subtitle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "0 24px",
          }}
        >
          {CD.CONTENT_ARTICLES.map((a, i) => (
            <ArticleRow
              key={a.id}
              article={a}
              hero={i === 0}
              thumb={[rThumb1Img, rThumb2Img, rThumb3Img][i]}
            />
          ))}
        </div>
      </Section>

      <div style={{ height: 24 }} />
    </div>
  );
}
