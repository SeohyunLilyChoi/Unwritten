import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faceImg from "../images/face.png";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

// ─── Korean data ──────────────────────────────────────────────────────────────
const CM_TABS_KO = [
  { id: "hot",    label: "🔥 핫이슈", count: 12 },
  { id: "office", label: "회사생활",  count: 48 },
  { id: "skill",  label: "업무스킬",  count: 31 },
  { id: "career", label: "커리어",    count: 24 },
  { id: "money",  label: "돈·협상",   count: 9  },
];

const CM_THREADS_KO = [
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
        post: { title: '연차 사유 "개인 사유"로 썼다가 반려된 적 있어요', body: "반기 초에 연차 상신했는데 팀장님이 좀 더 구체적으로 써달라고 하셨어요. 저만 겪는 건지 궁금합니다." },
        agree:    { role: "마케팅", year: "3년차", text: '보수적인 팀이라면 "병원 진료", "가족 행사" 같은 구체적 표현이 더 안전해요.' },
        disagree: { role: "개발",   year: "5년차", text: "그건 팀장 스타일 문제예요. 개인 사유도 엄연히 유효한 사유인데, 저는 한 번도 반려된 적 없어요." },
      },
      {
        post: { title: "연차 다 쓰면 정말 눈치 안 봐도 되는 건가요?", body: "입사 2년차인데 연차가 15개인데 팀원들이 다 10개 미만으로 쓰는 것 같아서 눈치보여요." },
        agree:    { role: "기획", year: "2년차", text: "저도 같은 고민이에요. 결국 쓰긴 했는데 팀장님 눈치가 신경 쓰이더라고요." },
        disagree: { role: "인사", year: "6년차", text: "연차는 권리예요. 눈치 볼 필요 없고, 오히려 당당하게 쓰는 게 문화를 바꾸는 거예요." },
      },
      {
        post: { title: "연속 연차 3일 이상은 팀장 허락 따로 받아야 하나요?", body: "내부 규정엔 없는데 분위기상 3일 이상은 사전에 보고하는 것 같아서 어떻게 해야 할지 모르겠어요." },
        agree:    { role: "영업",   year: "4년차", text: "저희 팀은 3일 이상이면 2주 전에 미리 말하는 게 암묵적 룰이에요. 그냥 따르는 게 편해요." },
        disagree: { role: "디자인", year: "3년차", text: "규정에 없으면 그냥 결재 올리면 되는 거예요. 암묵적 룰을 당연시하면 관행이 되어버려요." },
      },
    ],
    likeCount: 2147, commentCount: 384, viewCount: "8.4만",
  },
];

const CM_TRENDING_KO = [
  '#연봉협상', '#재택근무', '#팀장관계',
  '#야근거절', '#워라밸', '#회식문화',
];

const CM_BOARDS_KO = [
  { name: '전체 게시판',        latest: '신입 팀장님 인사법' },
  { name: '직장생활 게시판',    latest: '회식 2차 자연스럽게 빠지기' },
  { name: '취미/동호회 게시판', latest: '주말 러닝 크루 모집' },
  { name: '연애/결혼 게시판',   latest: '직장 동료랑 사귀어도 될까요' },
];

const CM_BOARD_POSTS_KO = [
  {
    title: "회식 2차 자연스럽게 빠지는 말 뭐가 좋을까요?",
    preview: "신입이라 매번 끝까지 남았는데 다음 날 일정이 있을 때는 어떻게 말해야 할지 고민돼요.",
    body: "신입이라 회식 2차까지 계속 남았는데, 다음 날 일정이 있거나 컨디션이 안 좋을 때는 자연스럽게 빠지고 싶어요. 분위기를 깨지 않으면서 말할 수 있는 표현이 있을까요?",
    board: "직장생활", role: "마케팅 · 2년차", uploadedAt: "지금", comments: 38, likes: 124,
    replies: [
      { role: "기획 · 4년차",   text: '"내일 오전 일정이 있어서 먼저 들어가보겠습니다" 정도면 충분했어요.' },
      { role: "개발 · 3년차",   text: "처음부터 1차만 참석 가능하다고 미리 말하면 훨씬 자연스럽더라고요." },
      { role: "마케팅 · 5년차", text: "팀 분위기가 빡빡하면 팀장님께 먼저 짧게 말하고 나오는 게 안전해요." },
    ],
  },
  {
    title: "신입 팀장님께 첫 인사 어떻게 해야 자연스러울까요?",
    preview: "이번 주부터 새 팀장님이 오시는데 너무 딱딱하지 않으면서도 예의 있게 인사하고 싶어요.",
    body: "이번 주부터 새 팀장님이 오시는데 첫 인사를 어떻게 해야 할지 고민이에요. 너무 딱딱하지 않으면서도 예의 있어 보이고 싶습니다.",
    board: "전체", role: "기획 · 1년차", uploadedAt: "1분 전", comments: 21, likes: 87,
    replies: [
      { role: "인사 · 6년차",   text: "짧게 본인 업무와 이름만 말하고 앞으로 잘 부탁드린다고 하면 충분해요." },
      { role: "디자인 · 2년차", text: "메신저보다 직접 마주쳤을 때 가볍게 인사하는 게 더 자연스러웠어요." },
    ],
  },
  {
    title: "점심시간에 혼자 쉬고 싶은 날, 다들 어떻게 하세요?",
    preview: "계속 같이 먹는 분위기인데 가끔은 혼자 산책하거나 쉬고 싶어서요.",
    body: "점심을 계속 같이 먹는 분위기인데 가끔은 혼자 산책하거나 조용히 쉬고 싶어요. 매번 같이 나가야 하는 분위기에서 어떻게 말하면 좋을까요?",
    board: "직장생활", role: "디자인 · 3년차", uploadedAt: "05/06", comments: 46, likes: 153,
    replies: [
      { role: "마케팅 · 3년차", text: '"오늘은 잠깐 볼일이 있어서 따로 먹을게요"라고 말하면 대부분 신경 안 써요.' },
      { role: "기획 · 5년차",   text: "한두 번 자연스럽게 빠지면 이후에는 훨씬 편해져요." },
    ],
  },
  {
    title: "상사에게 중간보고 타이밍 잡는 기준이 있나요?",
    preview: "너무 자주 보고하면 부담스럽고, 늦으면 놓친 것처럼 보일까 봐 어렵네요.",
    body: "업무를 어느 정도 진행했을 때 중간보고를 해야 하는지 기준을 잡기 어렵습니다. 너무 자주 보고하면 부담스럽고, 늦으면 놓친 것처럼 보일까 봐 걱정돼요.",
    board: "업무스킬", role: "개발 · 4년차", uploadedAt: "05/06", comments: 17, likes: 64,
    replies: [
      { role: "기획 · 7년차", text: "방향이 바뀔 수 있는 지점에서는 완성도보다 빨리 공유하는 게 좋아요." },
      { role: "개발 · 6년차", text: "저는 30%, 70%, 완료 직전 세 번 정도를 기준으로 잡아요." },
    ],
  },
  {
    title: "주말 러닝 크루 모집합니다",
    preview: "토요일 오전 한강에서 가볍게 5km 뛰는 모임이에요. 초보도 환영합니다.",
    body: "토요일 오전 한강에서 가볍게 5km 뛰는 러닝 크루를 모집합니다. 기록보다 꾸준히 움직이는 게 목표라 초보도 편하게 오셔도 됩니다.",
    board: "취미/동호회", role: "영업 · 5년차", uploadedAt: "05/05", comments: 12, likes: 41,
    replies: [
      { role: "마케팅 · 2년차", text: "초보도 괜찮다면 참여하고 싶어요. 장소는 어디쯤인가요?" },
      { role: "영업 · 4년차",   text: "저도 주말 아침 루틴 만들고 싶었는데 좋네요." },
    ],
  },
];

const SUMMARY_HEADLINES_KO = {
  "th-1": "개인 사유로 적는 게 가장 무난해요",
  "th-2": "혼밥은 꽤 자연스러운 선택이에요",
  "th-3": "완료, 진행, 다음 계획 순서가 깔끔해요",
};

// ─── English data ─────────────────────────────────────────────────────────────
const CM_TABS_EN = [
  { id: "hot",    label: "🔥 Hot Issues",        count: 12 },
  { id: "office", label: "Work Life",             count: 48 },
  { id: "skill",  label: "Work Skills",           count: 31 },
  { id: "career", label: "Career",                count: 24 },
  { id: "money",  label: "Money & Negotiation",   count: 9  },
];

const CM_THREADS_EN = [
  {
    id: "th-1",
    merged: 1248,
    tag: "#TimeOff",
    hot: true,
    question: "What should I write for the reason when submitting a leave request?",
    aiSummary:
      'At most companies, writing "personal reason" or "personal errand" is the standard. Asking for specific reasons is becoming less common, but in conservative organizations it\'s safer to write a general purpose like "medical appointment" or "bank errand".',
    aiTags: ["#PersonalReason wins", "#DependsOnCulture", "#NewHires feel the pressure"],
    opinionCards: [
      {
        post: { title: 'My leave was rejected for writing "personal reason"', body: "I submitted leave at the start of the half-year and my manager asked me to be more specific. I wonder if it's just me." },
        agree:    { role: "Marketing", year: "3 Yrs", text: '"Medical appointment" or "family event" is safer in conservative teams.' },
        disagree: { role: "Dev",       year: "5 Yrs", text: "That's the manager's style. Personal reason is valid — I've never had one rejected." },
      },
      {
        post: { title: "Can I really use all my leave days without guilt?", body: "I'm in my 2nd year with 15 days of leave, but everyone else seems to use fewer than 10. I feel self-conscious." },
        agree:    { role: "Planning", year: "2 Yrs", text: "Same concern. I used them but kept worrying about my manager's reaction." },
        disagree: { role: "HR",       year: "6 Yrs", text: "Leave is your right. Being assertive about it is what changes the culture." },
      },
      {
        post: { title: "Do I need extra approval for 3+ consecutive leave days?", body: "It's not in the internal policy, but it seems like 3+ days needs advance notice. Not sure what to do." },
        agree:    { role: "Sales",  year: "4 Yrs", text: "Our unspoken rule is 2 weeks notice for 3+ days. Easier to just go with it." },
        disagree: { role: "Design", year: "3 Yrs", text: "If it's not in policy, just submit it. Treating unwritten rules as normal makes them real." },
      },
    ],
    likeCount: 2147, commentCount: 384, viewCount: "84K",
  },
];

const CM_TRENDING_EN = [
  '#SalaryNeg', '#RemoteWork', '#ManagerRelations',
  '#OvertimeNo', '#WorkLifeBalance', '#TeamDinners',
];

const CM_BOARDS_EN = [
  { name: 'All Boards',        latest: 'First greeting to new manager' },
  { name: 'Work Life Board',   latest: 'How to skip team dinner 2nd round' },
  { name: 'Hobbies Board',     latest: 'Weekend running crew forming' },
  { name: 'Dating & Marriage', latest: 'Dating a coworker — is it OK?' },
];

const CM_BOARD_POSTS_EN = [
  {
    title: "What's a natural way to leave team dinner early?",
    preview: "I've stayed till the end every time as a new hire, and I'm not sure what to say when I have plans the next morning.",
    body: "As a new hire I've been going to every round of team dinner, but sometimes I have plans the next day or I'm just not feeling well. Is there a natural way to leave without ruining the vibe?",
    board: "Work Life", role: "Marketing · 2 Yrs", uploadedAt: "Just now", comments: 38, likes: 124,
    replies: [
      { role: "Planning · 4 Yrs",  text: '"I have a morning commitment so I\'ll head out first" is usually enough.' },
      { role: "Dev · 3 Yrs",       text: "Saying from the start that you can only make round 1 is much more natural." },
      { role: "Marketing · 5 Yrs", text: "If the team culture is strict, tell your manager briefly first before leaving." },
    ],
  },
  {
    title: "What's a natural way to greet my new manager?",
    preview: "My new manager starts this week and I want to introduce myself professionally but not stiffly.",
    body: "My new manager starts this week and I'm wondering how to introduce myself. I want to seem professional but not overly formal.",
    board: "All", role: "Planning · 1 Yr", uploadedAt: "1 min ago", comments: 21, likes: 87,
    replies: [
      { role: "HR · 6 Yrs",     text: "Just briefly state your name, your role, and say you're looking forward to working together." },
      { role: "Design · 2 Yrs", text: "Saying hi in person when you run into them felt more natural than a messenger message." },
    ],
  },
  {
    title: "How do you handle wanting to eat lunch alone?",
    preview: "The team always eats together but sometimes I just want to take a walk by myself or rest quietly.",
    body: "There's a culture of always eating lunch together, but sometimes I just want to take a walk alone or rest quietly. How do you say it when you're always expected to go out as a group?",
    board: "Work Life", role: "Design · 3 Yrs", uploadedAt: "05/06", comments: 46, likes: 153,
    replies: [
      { role: "Marketing · 3 Yrs", text: '"I have a quick errand so I\'ll eat separately today" — most people don\'t mind.' },
      { role: "Planning · 5 Yrs",  text: "Once you naturally skip once or twice, it gets much easier after that." },
    ],
  },
  {
    title: "What's the right timing for mid-task progress updates?",
    preview: "Too frequent feels burdensome, but too late and it looks like I missed something.",
    body: "I find it hard to know when to give a progress update during a task. Too frequent feels pushy, but waiting too long might make it look like I've lost track.",
    board: "Work Skills", role: "Dev · 4 Yrs", uploadedAt: "05/06", comments: 17, likes: 64,
    replies: [
      { role: "Planning · 7 Yrs", text: "At any point where direction could change, share sooner rather than waiting for completion." },
      { role: "Dev · 6 Yrs",      text: "I aim for around 30%, 70%, and just before completion — three touch points." },
    ],
  },
  {
    title: "Weekend running crew forming",
    preview: "A casual 5km run along the Han River on Saturday mornings. Beginners welcome.",
    body: "Forming a running crew for casual 5km runs along the Han River on Saturday mornings. The goal is consistency over performance — beginners are very welcome.",
    board: "Hobbies", role: "Sales · 5 Yrs", uploadedAt: "05/05", comments: 12, likes: 41,
    replies: [
      { role: "Marketing · 2 Yrs", text: "If beginners are welcome I'd love to join. Where along the river?" },
      { role: "Sales · 4 Yrs",     text: "I've been wanting to build a morning weekend routine — this sounds great." },
    ],
  },
];

const SUMMARY_HEADLINES_EN = {
  "th-1": "Writing 'personal reason' is the safest bet",
  "th-2": "Eating alone is a pretty natural choice",
  "th-3": "Done → In Progress → Next Steps is the cleanest format",
};

// ─── OpinionChat ──────────────────────────────────────────────────────────────
function OpinionChat({ opinionCards }) {
  const { lang } = useLanguage();
  const t = translations[lang].community;
  const [setIdx, setSetIdx] = useState(0);
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    const timers = [];
    let si = 0;
    let mc = 0;

    const step = () => {
      if (mc < 3) {
        mc++;
        setMsgCount(mc);
        timers.push(setTimeout(step, 1300));
      } else {
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
    { id: "post",    type: "post",    text: card.post.title, meta: null },
    { id: "agree",   type: "agree",   text: card.agree.text,    meta: `${card.agree.role} · ${card.agree.year}` },
    { id: "disagree",type: "disagree",text: card.disagree.text, meta: `${card.disagree.role} · ${card.disagree.year}` },
  ];
  const visible = allMsgs.slice(0, msgCount);

  const style = (type) => ({
    post:     { bg: "#fff", border: "1px solid var(--line-2)", radius: "12px 12px 12px 3px",  align: "flex-start", text: "var(--ink)",   label: null,      labelBg: null      },
    agree:    { bg: "#fff", border: "1px solid var(--line-2)", radius: "12px 12px 3px 12px",  align: "flex-end",   text: "var(--ink-2)", label: "#16A34A", labelBg: "#E7F6EC" },
    disagree: { bg: "#fff", border: "1px solid var(--line-2)", radius: "12px 12px 3px 12px",  align: "flex-end",   text: "var(--ink-2)", label: "#EF4444", labelBg: "#FFF0F0" },
  })[type];

  return (
    <div style={{ padding: "0 14px 2px", height: 220, overflow: "hidden" }}>
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
              style={{ display: "flex", justifyContent: s.align, marginBottom: 7 }}
            >
              <div style={{ background: s.bg, border: s.border, borderRadius: s.radius, padding: "8px 11px", maxWidth: "88%" }}>
                {msg.meta && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: s.label, background: s.labelBg, padding: "1px 6px", borderRadius: 4 }}>
                      {msg.type === "agree" ? t.agree : t.disagree}
                    </span>
                    <span style={{ fontSize: 10, color: "var(--muted-2)" }}>{msg.meta}</span>
                  </div>
                )}
                <div style={{ fontSize: 12.5, fontWeight: msg.type === "post" ? 600 : 400, color: s.text, lineHeight: 1.5, wordBreak: "keep-all", overflowWrap: "break-word" }}>
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
function ThreadCard({ thread: th, onAskAI, onOpenDetail, summaryHeadlines }) {
  const { lang } = useLanguage();
  const t = translations[lang].community;

  return (
    <article
      style={{
        background: "#fff", borderRadius: 16, border: "1px solid var(--line-2)",
        boxShadow: th.hot
          ? "0 4px 20px -8px rgba(59,91,255,.18), 0 1px 3px rgba(11,14,20,.04)"
          : "var(--shadow-sm)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "14px 14px 12px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
              <div style={{ display: "inline-flex", flexShrink: 0 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 20, height: 20, borderRadius: 99, border: "1.5px solid #fff",
                      background: ["#4F6EFF", "#7B8FFF", "#8B72FF"][i],
                      marginLeft: i === 0 ? 0 : -6, fontSize: 8, color: "#fff", fontWeight: 700,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <img src={faceImg} alt="" style={{ width: "65%", height: "65%", objectFit: "contain" }} />
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--brand)", whiteSpace: "nowrap" }}>
                {t.mergedLabel(th.merged)}
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)", background: "#fff", border: "1px solid var(--line)", padding: "5px 11px", borderRadius: 99, flexShrink: 0 }}>
              {th.tag}
            </span>
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-.025em", lineHeight: 1.35, color: "var(--ink)", textAlign: "left" }}>
            {th.question}
          </div>
        </div>
      </div>

      <>
        <div style={{ margin: "0 14px 12px", background: "#fff", border: "1px solid var(--line-2)", borderRadius: 12, padding: "12px 12px 11px" }}>
          <p style={{ display: "inline", margin: 0, fontSize: 16, fontWeight: 800, letterSpacing: "-.025em", lineHeight: 1.35, color: "var(--ink)" }}>
            {summaryHeadlines[th.id]}
          </p>
          <p style={{ margin: "9px 0 0", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
            {th.aiSummary}
          </p>
        </div>

        <div style={{ padding: "0 14px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9AA1AE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
              <circle cx="17" cy="9" r="2.5" /><path d="M15 15c3 0 6 1.5 6 5" />
            </svg>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-2)" }}>{t.communityOpinions}</span>
          </div>
          <button style={{ width: "100%", textAlign: "left", cursor: "pointer", background: "var(--line-2)", border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", padding: "14px 0" }}>
            <OpinionChat opinionCards={th.opinionCards} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, padding: "14px" }}>
          <button
            onClick={() => onAskAI?.({ type: "community", title: th.question, meta: `${t.mergedLabel(th.merged)} · ${th.tag}`, summary: summaryHeadlines[th.id], body: th.aiSummary })}
            style={{
              flex: 1, padding: "10px 0", background: "#fff", border: "1px dashed rgba(59,91,255,.35)",
              borderRadius: 12, fontSize: 14, fontWeight: 600, color: "var(--brand)", cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
            </svg>
            {t.askAI}
          </button>
          <button
            onClick={() => onOpenDetail?.(th)}
            style={{
              flex: 1, padding: "10px 0", background: "var(--brand)", border: "none",
              borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
              boxShadow: "0 4px 12px -4px rgba(59,91,255,.4)",
            }}
          >
            {t.viewDetail}
          </button>
        </div>
      </>
    </article>
  );
}

// ─── CommunityScreen ──────────────────────────────────────────────────────────
export default function CommunityScreen({ onAskAI }) {
  const { lang } = useLanguage();
  const t = translations[lang].community;

  const CM_TABS          = lang === "en" ? CM_TABS_EN          : CM_TABS_KO;
  const CM_THREADS       = lang === "en" ? CM_THREADS_EN       : CM_THREADS_KO;
  const CM_TRENDING      = lang === "en" ? CM_TRENDING_EN      : CM_TRENDING_KO;
  const CM_BOARDS        = lang === "en" ? CM_BOARDS_EN        : CM_BOARDS_KO;
  const CM_BOARD_POSTS   = lang === "en" ? CM_BOARD_POSTS_EN   : CM_BOARD_POSTS_KO;
  const SUMMARY_HEADLINES = lang === "en" ? SUMMARY_HEADLINES_EN : SUMMARY_HEADLINES_KO;

  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [scrappedPosts, setScrappedPosts] = useState({});
  const [commentText, setCommentText] = useState("");
  const [commentReactions, setCommentReactions] = useState({});
  const [showCommentFilters, setShowCommentFilters] = useState(false);
  const feedRef = useRef(null);
  const rootRef = useRef(null);

  const handleBoardSelect = (board) => { setSelectedBoard(board); setSelectedDiscussion(null); setSelectedPost(null); };
  const handleDiscussionSelect = (discussion) => { setSelectedDiscussion(discussion); setSelectedBoard(null); setSelectedPost(null); setCommentText(""); setShowCommentFilters(false); };
  const handlePostSelect = (post) => { setSelectedPost(post); setCommentText(""); setShowCommentFilters(false); };

  useLayoutEffect(() => {
    if (!selectedBoard && !selectedDiscussion && !selectedPost) return;
    requestAnimationFrame(() => {
      feedRef.current?.scrollTo({ top: 0, left: 0 });
      rootRef.current?.closest("main")?.scrollTo({ top: 0, left: 0 });
    });
  }, [selectedBoard, selectedDiscussion, selectedPost]);

  const selectedPostLikeCount = selectedPost ? selectedPost.likes + (likedPosts[selectedPost.title] ? 1 : 0) : 0;
  const isSelectedPostLiked   = selectedPost ? Boolean(likedPosts[selectedPost.title])   : false;
  const isSelectedPostScrapped = selectedPost ? Boolean(scrappedPosts[selectedPost.title]) : false;
  const detailTitle = selectedDiscussion ? t.activeDiscussions : selectedBoard?.name;

  return (
    <div ref={rootRef} style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, overflow: "hidden" }}>
      {/* Header */}
      <header
        style={{
          padding: "14px 20px 10px", display: "flex", alignItems: "center",
          justifyContent: detailTitle ? "center" : "space-between",
          position: "relative", flexShrink: 0, zIndex: 20, background: "#fff",
        }}
      >
        {detailTitle ? (
          <>
            <button
              type="button"
              aria-label={t.back}
              onClick={() => {
                if (selectedPost)       { setSelectedPost(null);       return; }
                if (selectedDiscussion) { setSelectedDiscussion(null); return; }
                setSelectedBoard(null);
              }}
              style={{
                position: "absolute", left: 20, top: 14, width: 34, height: 34,
                borderRadius: 10, background: "#fff", display: "inline-flex",
                alignItems: "center", justifyContent: "center", color: "var(--ink-2)", cursor: "pointer",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div style={{ height: 34, display: "inline-flex", alignItems: "center", fontSize: 17, fontWeight: 800, color: "var(--ink)", letterSpacing: "-.02em" }}>
              {detailTitle}
            </div>
            <button
              type="button"
              aria-label={`${detailTitle} search`}
              style={{
                position: "absolute", right: 20, top: 14, width: 34, height: 34,
                borderRadius: 10, background: "#fff", display: "inline-flex",
                alignItems: "center", justifyContent: "center", color: "var(--ink-2)", cursor: "pointer",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.03em", color: "var(--ink)" }}>unwritten</div>
              <div style={{ width: 5, height: 5, background: "var(--brand)", borderRadius: 99 }} />
            </div>
            <button style={{ width: 34, height: 34, borderRadius: 10, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </>
        )}
      </header>

      {/* Feed */}
      <div
        ref={feedRef}
        style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: detailTitle ? "0 0 100px" : "14px 20px 100px" }}
      >
        {selectedPost ? (
          <div style={{ background: "#fff" }}>
            <article style={{ padding: "24px 20px 18px", borderBottom: "7px solid #F3F5FA" }}>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 800, lineHeight: 1.38, letterSpacing: "-.025em", color: "var(--ink)" }}>
                {selectedPost.title}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 99, background: "#EEF1FF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <img src={faceImg} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--muted-2)", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {selectedPost.role}
                  </span>
                </div>
                <span style={{ fontSize: 12.5, color: "var(--muted-2)", fontWeight: 600, flexShrink: 0 }}>{selectedPost.uploadedAt}</span>
              </div>
              <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)", wordBreak: "keep-all" }}>
                {selectedPost.body}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 18 }}>
                <button
                  type="button"
                  onClick={() => onAskAI?.({ type: "community", title: selectedPost.title, meta: `${selectedPost.uploadedAt} · ${selectedPost.role}`, summary: selectedPost.preview, body: selectedPost.body })}
                  style={{
                    height: 34, padding: "0 12px", borderRadius: 10, border: "1px dashed rgba(59,91,255,.35)",
                    background: "#fff", color: "var(--brand)", display: "inline-flex", alignItems: "center",
                    justifyContent: "center", gap: 5, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
                  </svg>
                  {t.askAI}
                </button>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setLikedPosts((prev) => ({ ...prev, [selectedPost.title]: !prev[selectedPost.title] }))}
                    style={{
                      height: 34, padding: "0 11px", borderRadius: 10,
                      border: isSelectedPostLiked ? "1px solid rgba(59,91,255,.35)" : "1px solid var(--line)",
                      background: isSelectedPostLiked ? "var(--brand-soft)" : "#fff",
                      color: isSelectedPostLiked ? "var(--brand)" : "var(--muted)",
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" />
                    </svg>
                    {selectedPostLikeCount}
                  </button>
                  <button
                    type="button"
                    aria-label={t.savePost}
                    onClick={() => setScrappedPosts((prev) => ({ ...prev, [selectedPost.title]: !prev[selectedPost.title] }))}
                    style={{
                      width: 34, height: 34, borderRadius: 10, border: "1px solid var(--line)",
                      background: "#fff", color: isSelectedPostScrapped ? "var(--brand)" : "var(--muted)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={isSelectedPostScrapped ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            <section style={{ padding: "18px 20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>
                  {t.commentsLabel(selectedPost.replies.length)}
                </p>
                <button
                  type="button"
                  onClick={() => setShowCommentFilters((show) => !show)}
                  style={{
                    height: 30, padding: "0 10px", borderRadius: 99,
                    border: showCommentFilters ? "1px solid rgba(59,91,255,.35)" : "1px solid var(--line)",
                    background: showCommentFilters ? "var(--brand-soft)" : "#fff",
                    color: showCommentFilters ? "var(--brand)" : "var(--muted)",
                    fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {t.filterBtn}
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFD", border: "1px solid var(--line-2)", borderRadius: 12, padding: "9px 10px 9px 12px", marginBottom: showCommentFilters ? 12 : 8 }}>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t.commentPlaceholder}
                  style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "var(--ink)" }}
                />
                <button
                  type="button"
                  disabled={!commentText.trim()}
                  onClick={() => setCommentText("")}
                  style={{
                    width: 30, height: 30, borderRadius: 8, border: "none",
                    background: commentText.trim() ? "var(--brand)" : "#E5E7EB",
                    color: commentText.trim() ? "#fff" : "#9AA1AE",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    cursor: commentText.trim() ? "pointer" : "default", flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>

              {showCommentFilters && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "0 0 12px" }}>
                  <div style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {t.filterJobs.map((label, index) => (
                      <button key={label} type="button" style={{ flexShrink: 0, height: 30, padding: "0 10px", borderRadius: 99, border: index === 0 ? "1px solid var(--brand)" : "1px solid var(--line)", background: index === 0 ? "var(--brand)" : "#fff", color: index === 0 ? "#fff" : "var(--ink-2)", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {t.filterYears.map((label, index) => (
                      <button key={label} type="button" style={{ flexShrink: 0, height: 30, padding: "0 10px", borderRadius: 99, border: index === 0 ? "1px solid var(--brand)" : "1px solid var(--line)", background: index === 0 ? "var(--brand)" : "#fff", color: index === 0 ? "#fff" : "var(--ink-2)", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: 2, border: "1px solid var(--line-2)", borderRadius: 12, background: "#F8FAFD", padding: "10px 12px" }}>
                    <p style={{ margin: 0, fontSize: 12.5, fontWeight: 800, color: "var(--brand)" }}>{t.filterSummaryLabel}</p>
                    <p style={{ margin: "5px 0 0", fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)", wordBreak: "keep-all" }}>{t.filterSummaryText}</p>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {selectedPost.replies.map((reply, index) => {
                  const replyKey = `${selectedPost.title}-${index}`;
                  const selectedReaction = commentReactions[replyKey];
                  const likeCount    = (reply.likes    ?? 8 + index * 3) + (selectedReaction === "like"    ? 1 : 0);
                  const dislikeCount = (reply.dislikes ?? index)          + (selectedReaction === "dislike" ? 1 : 0);
                  return (
                    <div
                      key={`${reply.role}-${index}`}
                      style={{ padding: "14px 0", borderBottom: index === selectedPost.replies.length - 1 ? "none" : "1px solid var(--line-2)" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 99, background: "#EEF1FF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <img src={faceImg} alt="" style={{ width: 15, height: 15, objectFit: "contain" }} />
                        </span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--muted-2)" }}>{reply.role}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)" }}>{reply.text}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 10 }}>
                        <span style={{ fontSize: 12, color: "var(--muted-2)", fontWeight: 600 }}>
                          {reply.createdAt || t.commentTimes[index % t.commentTimes.length]}
                        </span>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <button type="button"
                            onClick={() => setCommentReactions((prev) => ({ ...prev, [replyKey]: prev[replyKey] === "like" ? null : "like" }))}
                            style={{ height: 28, padding: "0 8px", borderRadius: 8, border: selectedReaction === "like" ? "1px solid rgba(59,91,255,.35)" : "1px solid var(--line)", background: selectedReaction === "like" ? "var(--brand-soft)" : "#fff", color: selectedReaction === "like" ? "var(--brand)" : "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" />
                            </svg>
                            {likeCount}
                          </button>
                          <button type="button"
                            onClick={() => setCommentReactions((prev) => ({ ...prev, [replyKey]: prev[replyKey] === "dislike" ? null : "dislike" }))}
                            style={{ height: 28, padding: "0 8px", borderRadius: 8, border: selectedReaction === "dislike" ? "1px solid rgba(239,68,68,.28)" : "1px solid var(--line)", background: selectedReaction === "dislike" ? "#FFF0F0" : "#fff", color: selectedReaction === "dislike" ? "#EF4444" : "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
                              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" />
                            </svg>
                            {dislikeCount}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

        ) : selectedDiscussion ? (
          <div style={{ background: "#fff" }}>
            <div style={{ padding: "18px 20px 16px", borderBottom: "7px solid #F3F5FA" }}>
              <p style={{ margin: "0 0 8px", fontSize: 12.5, fontWeight: 800, color: "var(--brand)" }}>{t.summarizedQ}</p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 800, lineHeight: 1.38, letterSpacing: "-.025em", color: "var(--ink)" }}>
                {selectedDiscussion.question}
              </p>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)" }}>
                {SUMMARY_HEADLINES[selectedDiscussion.id]}
              </p>
            </div>
            <div>
              {selectedDiscussion.opinionCards.map((card, index) => {
                const uploadTimes = t.commentTimes;
                const roles = lang === "en"
                  ? ["Marketing · 3 Yrs", "Planning · 2 Yrs", "Sales · 4 Yrs"]
                  : ["마케팅 · 3년차", "기획 · 2년차", "영업 · 4년차"];
                const relatedPost = {
                  title: card.post.title,
                  preview: card.post.body,
                  body: card.post.body,
                  role: roles[index] ?? roles[0],
                  uploadedAt: uploadTimes[index] ?? uploadTimes[0],
                  comments: [18, 24, 11][index] ?? 8,
                  likes: [64, 82, 37][index] ?? 21,
                  replies: [
                    { role: card.agree.role    + " · " + card.agree.year,    text: card.agree.text    },
                    { role: card.disagree.role + " · " + card.disagree.year, text: card.disagree.text },
                  ],
                };
                return (
                  <button
                    key={`${card.post.title}-${index}`}
                    type="button"
                    onClick={() => handlePostSelect(relatedPost)}
                    style={{ width: "100%", textAlign: "left", background: "#fff", border: "none", borderBottom: "1px solid var(--line-2)", borderRadius: 0, padding: "16px 20px 13px", cursor: "pointer", boxShadow: "none" }}
                  >
                    <p style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.35, color: "var(--ink)", margin: 0 }}>{relatedPost.title}</p>
                    <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{relatedPost.preview}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 10, fontSize: 12.5, color: "var(--muted-2)", fontWeight: 600 }}>
                      <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{relatedPost.uploadedAt} | {relatedPost.role}</span>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6z" /></svg>
                          {relatedPost.comments}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" /></svg>
                          {relatedPost.likes}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        ) : selectedBoard ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CM_BOARD_POSTS.map((post, index) => (
              <button
                key={`${post.title}-${index}`}
                type="button"
                onClick={() => handlePostSelect(post)}
                style={{ width: "100%", textAlign: "left", background: "#fff", border: "none", borderBottom: "1px solid var(--line-2)", borderRadius: 0, padding: "16px 20px 13px", cursor: "pointer", boxShadow: "none" }}
              >
                <p style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.35, color: "var(--ink)", margin: 0 }}>{post.title}</p>
                <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.preview}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 10, fontSize: 12.5, color: "var(--muted-2)", fontWeight: 600 }}>
                  <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.uploadedAt} | {post.role}</span>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6z" /></svg>
                      {post.comments}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" /></svg>
                      {post.likes}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

        ) : (
          <>
            {/* Active Discussions */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.02em", color: "var(--ink)" }}>
                {t.activeDiscussions}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 0 }}>
              <ThreadCard
                thread={CM_THREADS[0]}
                onAskAI={onAskAI}
                onOpenDetail={handleDiscussionSelect}
                summaryHeadlines={SUMMARY_HEADLINES}
              />
            </div>

            <div style={{ height: 7, background: "#F3F5FA", margin: "24px -20px" }} />

            {/* Trending */}
            <div style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.02em", color: "var(--ink)" }}>
                    {t.trendingTitle}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {CM_TRENDING.map((tag, i) => (
                  <button key={i} style={{ padding: "5px 11px", borderRadius: 99, background: "#fff", border: "1px solid var(--line)", fontSize: 13, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer", whiteSpace: "nowrap" }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: 7, background: "#F3F5FA", margin: "24px -20px" }} />

            {/* Favorite boards */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.02em", color: "var(--ink)" }}>
                  {t.favBoards}
                </span>
              </div>
              <div>
                {CM_BOARDS.map((board, i) => (
                  <button
                    key={i}
                    onClick={() => handleBoardSelect(board)}
                    style={{ width: "100%", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: "6px 0", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap", flexShrink: 0 }}>{board.name}</span>
                    <span style={{ fontSize: 12.5, color: "var(--muted-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{board.latest}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
