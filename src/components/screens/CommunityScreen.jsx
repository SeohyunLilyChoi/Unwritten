import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CM_TABS = [
  { id: "hot", label: "🔥 핫이슈", count: 12 },
  { id: "office", label: "회사생활", count: 48 },
  { id: "skill", label: "업무스킬", count: 31 },
  { id: "career", label: "커리어", count: 24 },
  { id: "money", label: "돈·협상", count: 9 },
];

const CM_THREADS = [
  {
    id: "th-1",
    merged: 1248,
    tag: "#휴가",
    hot: true,
    question: "연차 상신할 때 사유, 뭐라고 적는 게 베스트인가요?",
    aiSummary:
      '대부분의 기업에서는 "개인 사유" 또는 "개인 용무"로 기재하는 것이 표준입니다. 구체적인 사유를 묻는 것은 점차 지양되는 추세이나, 보수적인 조직이라면 "은행 업무", "병원 진료" 등 포괄적인 목적을 적는 것을 추천합니다.',
    aiTags: ["#개인사유 압도적", "#회사 문화 따라다름", "#신입일수록 눈치"],
    opinionCards: [
      {
        post: {
          title: '연차 사유 "개인 사유"로 썼다가 반려된 적 있어요',
          body: "반기 초에 연차 상신했는데 팀장님이 좀 더 구체적으로 써달라고 하셨어요. 저만 겪는 건지 궁금합니다.",
        },
        agree: {
          role: "마케팅",
          year: "3년차",
          text: '보수적인 팀이라면 "병원 진료", "가족 행사" 같은 구체적 표현이 더 안전해요.',
        },
        disagree: {
          role: "개발",
          year: "5년차",
          text: "그건 팀장 스타일 문제예요. 개인 사유도 엄연히 유효한 사유인데, 저는 한 번도 반려된 적 없어요.",
        },
      },
      {
        post: {
          title: "연차 다 쓰면 정말 눈치 안 봐도 되는 건가요?",
          body: "입사 2년차인데 연차가 15개인데 팀원들이 다 10개 미만으로 쓰는 것 같아서 눈치보여요.",
        },
        agree: {
          role: "기획",
          year: "2년차",
          text: "저도 같은 고민이에요. 결국 쓰긴 했는데 팀장님 눈치가 신경 쓰이더라고요.",
        },
        disagree: {
          role: "인사",
          year: "6년차",
          text: "연차는 권리예요. 눈치 볼 필요 없고, 오히려 당당하게 쓰는 게 문화를 바꾸는 거예요.",
        },
      },
      {
        post: {
          title: "연속 연차 3일 이상은 팀장 허락 따로 받아야 하나요?",
          body: "내부 규정엔 없는데 분위기상 3일 이상은 사전에 보고하는 것 같아서 어떻게 해야 할지 모르겠어요.",
        },
        agree: {
          role: "영업",
          year: "4년차",
          text: "저희 팀은 3일 이상이면 2주 전에 미리 말하는 게 암묵적 룰이에요. 그냥 따르는 게 편해요.",
        },
        disagree: {
          role: "디자인",
          year: "3년차",
          text: "규정에 없으면 그냥 결재 올리면 되는 거예요. 암묵적 룰을 당연시하면 관행이 되어버려요.",
        },
      },
    ],
    likeCount: 2147,
    commentCount: 384,
    viewCount: "8.4만",
  },
];

const CM_TRENDING = [
  '#연봉협상', '#퇴직금', '#재택근무', '#팀장관계',
  '#야근거절', '#점심혼밥', '#사내문화', '#이직타이밍',
  '#보고방식', '#워라밸', '#신입생존', '#회식문화',
];
const CM_BOARDS = [
  { name: '전체 게시판',        latest: '신입 팀장님 인사법' },
  { name: '직장생활 게시판',    latest: '회식 2차 자연스럽게 빠지기' },
  { name: '취미/동호회 게시판', latest: '주말 러닝 크루 모집' },
  { name: '연애/결혼 게시판',   latest: '직장 동료랑 사귀어도 될까요' },
]

const SUMMARY_HEADLINES = {
  "th-1": "개인 사유로 적는 게 가장 무난해요",
  "th-2": "혼밥은 꽤 자연스러운 선택이에요",
  "th-3": "완료, 진행, 다음 계획 순서가 깔끔해요",
};

// ─── OpinionChat ─────────────────────────────────────────────────────────────
function OpinionChat({ opinionCards }) {
  const [setIdx, setSetIdx] = useState(0);
  const [msgCount, setMsgCount] = useState(0); // 현재 세트에서 보이는 말풍선 수 (0~3)

  useEffect(() => {
    const timers = [];
    let si = 0; // 현재 세트 인덱스
    let mc = 0; // 현재 세트에서 보인 말풍선 수

    const step = () => {
      if (mc < 3) {
        mc++;
        setMsgCount(mc);
        timers.push(setTimeout(step, 1300));
      } else {
        // 3개 모두 표시 → 잠시 후 클리어 → 다음 세트
        timers.push(
          setTimeout(() => {
            setMsgCount(0);
            mc = 0;
            si = (si + 1) % opinionCards.length;
            setSetIdx(si);
            timers.push(setTimeout(step, 700));
          }, 3200),
        );
      }
    };

    timers.push(setTimeout(step, 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  const card = opinionCards[setIdx];
  const allMsgs = [
    { id: "post", type: "post", text: card.post.title, meta: null },
    {
      id: "agree",
      type: "agree",
      text: card.agree.text,
      meta: `${card.agree.role} · ${card.agree.year}`,
    },
    {
      id: "disagree",
      type: "disagree",
      text: card.disagree.text,
      meta: `${card.disagree.role} · ${card.disagree.year}`,
    },
  ];
  const visible = allMsgs.slice(0, msgCount);

  const style = (type) =>
    ({
      post: {
        bg: "#fff",
        border: "1px solid var(--line-2)",
        radius: "12px 12px 12px 3px",
        align: "flex-start",
        text: "var(--ink)",
        label: null, labelBg: null,
      },
      agree: {
        bg: "#fff",
        border: "1px solid var(--line-2)",
        radius: "12px 12px 3px 12px",
        align: "flex-end",
        text: "var(--ink-2)",
        label: "#16A34A",
        labelBg: "#E7F6EC",
      },
      disagree: {
        bg: "#fff",
        border: "1px solid var(--line-2)",
        radius: "12px 12px 3px 12px",
        align: "flex-end",
        text: "var(--ink-2)",
        label: "#EF4444",
        labelBg: "#FFF0F0",
      },
    })[type];

  return (
    <div style={{ padding: "0 14px 2px", height: 200, overflow: "hidden" }}>
      <AnimatePresence mode="sync">
        {visible.map((msg) => {
          const s = style(msg.type);
          return (
            <motion.div
              key={`${setIdx}-${msg.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.22 } }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                display: "flex",
                justifyContent: s.align,
                marginBottom: 7,
              }}
            >
              <div
                style={{
                  background: s.bg,
                  border: s.border,
                  borderRadius: s.radius,
                  padding: "8px 11px",
                  maxWidth: "88%",
                }}
              >
                {msg.meta && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: s.label,
                      background: s.labelBg, padding: '1px 6px', borderRadius: 4,
                    }}>
                      {msg.type === "agree" ? "공감" : "반대"}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--muted-2)' }}>{msg.meta}</span>
                  </div>
                )}
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: msg.type === "post" ? 600 : 400,
                    color: s.text,
                    lineHeight: 1.5,
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ─── Thread card ──────────────────────────────────────────────────────────────
function ThreadCard({ thread: th, onAskAI }) {
  return (
    <article
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid var(--line-2)",
        boxShadow: th.hot
          ? "0 4px 20px -8px rgba(59,91,255,.18), 0 1px 3px rgba(11,14,20,.04)"
          : "var(--shadow-sm)",
        overflow: "hidden",
      }}
    >
      {/* Question + stats */}
      <div
        style={{
          padding: "14px 14px 12px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                minWidth: 0,
              }}
            >
              <div style={{ display: "inline-flex", flexShrink: 0 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 99,
                      border: "1.5px solid #fff",
                      background: `hsl(${220 + i * 20},60%,${70 - i * 8}%)`,
                      marginLeft: i === 0 ? 0 : -6,
                      fontSize: 8,
                      color: "#fff",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Q
                  </div>
                ))}
              </div>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "var(--brand)",
                  whiteSpace: "nowrap",
                }}
              >
                {th.merged.toLocaleString()}개 질문 병합
              </span>
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink-2)",
                background: "#fff",
                border: "1px solid var(--line)",
                padding: "5px 11px",
                borderRadius: 99,
                flexShrink: 0,
              }}
            >
              {th.tag}
            </span>
          </div>
          <div
            style={{
              fontSize: 15.5,
              fontWeight: 800,
              letterSpacing: "-.025em",
              lineHeight: 1.35,
              color: "var(--ink)",
              textAlign: "left",
            }}
          >
            {th.question}
          </div>
        </div>
      </div>

      <>
        {/* AI 핵심 요약 */}
        <div
          style={{
            margin: "0 14px 12px",
            background: "#fff",
            border: "1px solid var(--line-2)",
            borderRadius: 12,
            padding: "12px 12px 11px",
          }}
        >
          <p
            style={{
              display: "inline",
              margin: 0,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "-.025em",
              lineHeight: 1.35,
              color: "var(--ink)",
              background: "rgba(160,237,224,.3)",
            }}
          >
            {SUMMARY_HEADLINES[th.id]}
          </p>
          <p
            style={{
              margin: "9px 0 0",
              fontSize: 14,
              color: "var(--ink-2)",
              lineHeight: 1.6,
            }}
          >
            {th.aiSummary}
          </p>
        </div>

        {/* 커뮤니티 의견 */}
        <div style={{ padding: '0 14px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3" />
              <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
              <circle cx="17" cy="9" r="2.5" />
              <path d="M15 15c3 0 6 1.5 6 5" />
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink-2)' }}>커뮤니티의 생생한 의견</span>
          </div>
          <button style={{
            width: '100%', textAlign: 'left', cursor: 'pointer',
            background: 'var(--line-2)', border: '1px solid var(--line)',
            borderRadius: 14, overflow: 'hidden',
            padding: '14px 0',
          }}>
            <OpinionChat opinionCards={th.opinionCards} />
          </button>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 8, padding: "14px" }}>
          <button
            onClick={() =>
              onAskAI?.({
                type: "community",
                title: th.question,
                meta: `${th.merged.toLocaleString()}개 질문 병합 · ${th.tag}`,
                summary: SUMMARY_HEADLINES[th.id],
                body: th.aiSummary,
              })
            }
            style={{
              flex: 1,
              padding: "10px 0",
              background: "#fff",
              border: "1px dashed rgba(59,91,255,.35)",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--brand)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
            </svg>
            AI에게 물어보기
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 0",
              background: "var(--brand)",
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 12px -4px rgba(59,91,255,.4)",
            }}
          >
            자세히 보기
          </button>
        </div>
      </>
    </article>
  );
}

// ─── CommunityScreen ──────────────────────────────────────────────────────────
export default function CommunityScreen({ onAskAI }) {

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
    >
      {/* Header */}
      <header
        style={{
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
        <button
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            border: "1px solid var(--line)",
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
      </header>

      {/* Feed */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px 100px" }}>
        {/* Thread list */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: "-.02em",
              color: "var(--ink)",
            }}
          >
            활발한 논의
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 40,
          }}
        >
          <ThreadCard thread={CM_THREADS[0]} onAskAI={onAskAI} />
        </div>

        {/* Trending — visual bar style */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 19 }}>🔥</span>
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  letterSpacing: "-.02em",
                  color: "var(--ink)",
                }}
              >
                지금 뜨는 주제
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'center' }}>
            {[CM_TRENDING.slice(0, 4), CM_TRENDING.slice(4, 8)].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                {row.map((tag, i) => (
                  <button key={i} style={{
                    padding: '5px 11px', borderRadius: 99,
                    background: '#fff', border: '1px solid var(--line)',
                    fontSize: 13, fontWeight: 600, color: 'var(--ink-2)',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>
                    {tag}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 즐겨보는 게시판 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12 }}>
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink)' }}>
              즐겨보는 게시판
            </span>
          </div>
          <div style={{
            background: '#fff', border: '1px solid var(--line-2)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {CM_BOARDS.map((board, i) => (
              <button key={i} style={{
                width: '100%', textAlign: 'left', cursor: 'pointer',
                background: 'none', border: 'none',
                borderBottom: i < CM_BOARDS.length - 1 ? '1px solid var(--line-2)' : 'none',
                padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: 8, minWidth: 0,
              }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {board.name}
                </span>
                <span style={{ fontSize: 12.5, color: 'var(--muted-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
                  {board.latest}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
