import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  mockData,
  me,
  filterOptions,
  categoryChips,
  computeDataView,
  MOCK_NEW_TITLES,
  MOCK_NEW_ANSWER,
  MOCK_FOLLOWUP_ANSWER,
} from "../../data/mockData";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className = "" }) {
  return <div className={`shimmer rounded-md ${className}`} />;
}

// ─── StatBars ─────────────────────────────────────────────────────────────────
function StatBars({ bars }) {
  return (
    <div className="flex flex-col gap-2.5">
      {bars.map((b, i) => (
        <div
          key={i}
          className="grid items-center gap-3"
          style={{ gridTemplateColumns: "64px 1fr 36px" }}
        >
          <span
            className={`text-sm ${b.highlight ? "font-bold text-gray-800" : "font-medium text-gray-500"}`}
          >
            {b.label}
          </span>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${b.highlight ? "bg-brand-blue" : "bg-gray-300"}`}
              initial={{ width: 0 }}
              animate={{ width: `${b.value}%` }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            />
          </div>
          <span
            className={`text-sm text-right font-semibold ${b.highlight ? "text-gray-800" : "text-gray-400"}`}
          >
            {b.value}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── DataCard ─────────────────────────────────────────────────────────────────
function DataCard({ dataCard, job, years, onJobChange, onYearsChange }) {
  if (!dataCard) return null;
  const view = computeDataView(dataCard.matrix, job, years);
  if (!view) return null;
  const isMyProfile = job === me.job && years === me.years;

  return (
    <div
      className="mt-5 rounded-[14px] p-4"
      style={{ background: "#F5F8FF", border: "1px solid #E3E8FF" }}
    >
      {/* Title + 내 프로필 버튼 */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-gray-900">{dataCard.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {view.n.toLocaleString()}명 응답
          </p>
        </div>
        <button
          onClick={() => { onJobChange(me.job); onYearsChange(me.years); }}
          className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
            isMyProfile
              ? "bg-brand-blue-light text-brand-blue border-[#C9D1FF]"
              : "bg-white text-gray-500 border-gray-200"
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M4.5 20c0-4 3.5-6 7.5-6s7.5 2 7.5 6" />
          </svg>
          내 프로필
        </button>
      </div>

      {/* Job filter */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <span
          className="text-[11px] font-bold text-gray-400 uppercase tracking-wide shrink-0"
          style={{ width: 28 }}
        >
          직군
        </span>
        <div
          className="flex gap-1.5 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {filterOptions.jobs.map((o) => (
            <button
              key={o.id}
              onClick={() => onJobChange(o.id)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors duration-150 ${
                job === o.id
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year filter */}
      <div className="flex items-center gap-1.5 mb-3">
        <span
          className="text-[11px] font-bold text-gray-400 uppercase tracking-wide shrink-0"
          style={{ width: 28 }}
        >
          연차
        </span>
        <div
          className="flex gap-1.5 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {filterOptions.years.map((o) => (
            <button
              key={o.id}
              onClick={() => onYearsChange(o.id)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors duration-150 ${
                years === o.id
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <StatBars bars={view.bars} />

      <button className="mt-3 w-full bg-white rounded-[10px] py-2.5 text-sm font-semibold text-brand-blue flex items-center justify-center gap-1">
        관련 데이터 더보기
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ─── CommunityRow ─────────────────────────────────────────────────────────────
function CommunityRow({ item }) {
  return (
    <button
      type="button"
      className="w-full text-left bg-white border border-gray-100 rounded-xl px-3 py-3 mb-2 last:mb-0 shadow-sm cursor-pointer transition-colors hover:border-gray-200 hover:bg-gray-50 active:bg-gray-100"
    >
      <p className="text-sm font-bold text-gray-900 mb-1 leading-snug">
        {item.title}
      </p>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {item.preview}
      </p>
      <div className="flex items-center gap-2 mt-1.5 text-[11.5px] text-gray-400">
        <span>{item.role}</span>
        <span className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
        <span className="flex items-center gap-0.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>
          </svg>
          {item.likes}
        </span>
        <span className="flex items-center gap-0.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6z"/>
          </svg>
          {item.comments}
        </span>
      </div>
    </button>
  );
}

// ─── FeedbackStrip ────────────────────────────────────────────────────────────
function FeedbackStrip({
  feedback,
  onFeedback,
  threadId,
  followUps,
  onFollowUp,
  isLoadingAnswer,
}) {
  const [showReasonSheet, setShowReasonSheet] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [followUpText, setFollowUpText] = useState("");
  const followUpInputRef = useRef(null);

  const isLastFollowUpLoading =
    followUps &&
    followUps.length > 0 &&
    followUps[followUps.length - 1].isLoading;

  const handleFollowUpToggle = () => {
    setFollowUpOpen((open) => {
      if (open) {
        setFollowUpText("");
        return false;
      }

      setTimeout(() => followUpInputRef.current?.focus(), 100);
      return true;
    });
  };

  const handleFollowUpSend = () => {
    if (!followUpText.trim()) return;
    onFollowUp(threadId, followUpText.trim());
    setFollowUpText("");
    setFollowUpOpen(false);
  };

  if (feedback) {
    return (
      <div className="flex items-center py-3.5 border-t border-gray-100">
        <span className="text-sm text-gray-400">
          피드백 감사해요 {feedback === "up" ? "👍" : "👎"}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="py-3.5 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">이 답변이 도움됐나요?</span>
          <div className="flex gap-2">
            <button
              onClick={() => onFeedback("up")}
              className="w-[34px] h-[34px] rounded-[10px] border border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" />
              </svg>
            </button>
            <button
              onClick={() => setShowReasonSheet((open) => !open)}
              className={`w-[34px] h-[34px] rounded-[10px] border flex items-center justify-center transition-colors ${
                showReasonSheet
                  ? "border-red-300 bg-red-50 text-red-400"
                  : "border-gray-200 bg-white text-gray-400 hover:border-gray-200 hover:text-gray-400"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: "rotate(180deg)" }}
              >
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" />
              </svg>
            </button>
            <button
              onClick={handleFollowUpToggle}
              disabled={isLoadingAnswer || isLastFollowUpLoading}
              className={`w-[34px] h-[34px] rounded-[10px] border flex items-center justify-center disabled:opacity-40 transition-colors ${
                followUpOpen
                  ? "border-brand-blue bg-brand-blue-light text-brand-blue"
                  : "border-gray-200 bg-white text-gray-400 hover:border-gray-200 hover:text-gray-400"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14m-7-7h14" />
              </svg>
            </button>
          </div>
        </div>

        {followUpOpen && (
          <div className="mt-3 flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100">
            <input
              ref={followUpInputRef}
              type="text"
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFollowUpSend()}
              placeholder="이 주제로 더 궁금한 게 있나요?"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
              style={{ minHeight: 36 }}
            />
            <button
              onClick={handleFollowUpSend}
              disabled={!followUpText.trim()}
              className="w-8 h-8 flex items-center justify-center shrink-0"
            >
              <svg
                className={`w-5 h-5 transition-colors ${followUpText.trim() ? "text-brand-blue" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        )}

        {showReasonSheet && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-semibold text-gray-800">
              어떤 점이 아쉬웠나요?
            </p>
            {[
              "내 상황과 달라요",
              "답변이 너무 모호해요",
              "정보가 부족해요",
            ].map((reason) => (
              <button
                key={reason}
                onClick={() => {
                  onFeedback("down", reason);
                  setShowReasonSheet(false);
                }}
                className="w-full text-left bg-white px-4 py-3 rounded-xl border border-gray-100 text-sm text-gray-700 active:bg-gray-50"
                style={{ minHeight: 48 }}
              >
                {reason}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ─── FollowUpItem ─────────────────────────────────────────────────────────────
function FollowUpItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="pl-3 border-l-2 border-brand-blue/30 mt-4"
    >
      <div className="flex justify-end mb-2">
        <div className="bg-brand-blue-light rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
          <p className="text-sm text-gray-800">{item.question}</p>
        </div>
      </div>
      {item.isLoading ? (
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ) : item.aiAnswer ? (
        <div>
          <p className="text-sm font-bold text-gray-900 mb-1">
            {item.aiAnswer.headline}
          </p>
          <p className="text-sm text-brand-blue underline underline-offset-2 decoration-brand-blue/40 mb-1">
            {item.aiAnswer.highlight}
          </p>
          <p className="text-xs text-gray-400">{item.aiAnswer.body}</p>
        </div>
      ) : null}
    </motion.div>
  );
}

// ─── FollowUpSection ──────────────────────────────────────────────────────────
function FollowUpSection({ threadId, followUps, onSend, isLoadingAnswer }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const isLastLoading =
    followUps &&
    followUps.length > 0 &&
    followUps[followUps.length - 1].isLoading;

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(threadId, text.trim());
    setText("");
    setOpen(false);
  };

  return (
    <div className="px-[18px] pb-4">
      {(followUps || []).map((fu) => (
        <FollowUpItem key={fu.id} item={fu} />
      ))}

      {!open ? (
        <button
          onClick={handleOpen}
          disabled={isLoadingAnswer || isLastLoading}
          className="mt-4 w-full border border-dashed border-gray-200 bg-white rounded-xl py-3 text-sm text-gray-400 font-medium flex items-center justify-center gap-2 disabled:opacity-40 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
          이 주제로 더 궁금한 게 있나요?
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="이 주제로 더 궁금한 게 있나요?"
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
            style={{ minHeight: 36 }}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-8 h-8 flex items-center justify-center shrink-0"
          >
            <svg
              className={`w-5 h-5 transition-colors ${text.trim() ? "text-brand-blue" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── AIAnswerBody ─────────────────────────────────────────────────────────────
function AIAnswerBody({
  aiAnswer,
  isLoading,
  job,
  years,
  onJobChange,
  onYearsChange,
  showDataCard,
}) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-3 w-2/3 mt-2" />
        <Skeleton className="h-24 w-full mt-3 rounded-xl" />
      </div>
    );
  }
  if (!aiAnswer) return null;

  return (
    <div>
      <p className="text-[17px] font-bold text-gray-900 leading-snug mb-2">
        {aiAnswer.headline}
      </p>
      <p className="text-sm text-brand-blue underline underline-offset-2 decoration-brand-blue/40 mb-1.5">
        {aiAnswer.highlight}
      </p>

      {aiAnswer.takeaways && aiAnswer.takeaways.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2.5">
          {aiAnswer.takeaways.map((t, i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span className="shrink-0 w-[18px] h-[18px] rounded-[6px] bg-brand-blue-light text-brand-blue text-[11px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-gray-600 leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      )}

      {showDataCard && (
        <DataCard
          dataCard={aiAnswer.dataCard}
          job={job}
          years={years}
          onJobChange={onJobChange}
          onYearsChange={onYearsChange}
        />
      )}

      {showDataCard &&
        aiAnswer.communityPosts &&
        aiAnswer.communityPosts.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold text-gray-900">
                관련 커뮤니티 글
              </p>
              <button className="text-xs text-gray-400 font-medium flex items-center gap-0.5">
                전체 보기
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {aiAnswer.communityPosts.slice(0, 2).map((p) => (
              <CommunityRow key={p.id} item={p} />
            ))}
          </div>
        )}
    </div>
  );
}

// ─── ThreadContent ────────────────────────────────────────────────────────────
function ThreadContent({
  thread,
  onFeedback,
  onFollowUp,
  job,
  years,
  onJobChange,
  onYearsChange,
}) {
  const answered = !thread.isLoadingAnswer && thread.aiAnswer
  const hasData = answered && thread.aiAnswer.dataCard
  const hasPosts = answered && thread.aiAnswer.communityPosts?.length > 0
  const timelineRef = useRef(null);
  const lastDotRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const updateLineHeight = () => {
      if (!timelineRef.current || !lastDotRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const dotRect = lastDotRef.current.getBoundingClientRect();
      const dotCenter = dotRect.top - timelineRect.top + dotRect.height / 2;

      setLineHeight(Math.max(0, dotCenter - 40));
    };

    updateLineHeight();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(updateLineHeight);
    if (timelineRef.current) observer.observe(timelineRef.current);
    if (lastDotRef.current) observer.observe(lastDotRef.current);

    window.addEventListener("resize", updateLineHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLineHeight);
    };
  }, [thread.isLoadingAnswer, hasData, hasPosts]);

  return (
    <div>
      {/* Timeline */}
      <div ref={timelineRef} className="px-[18px] pt-4 pb-2 relative">
        {/* Connecting vertical line — behind all dots */}
        <div
          className="absolute bg-gray-200"
          style={{ left: 27, top: 40, height: lineHeight, width: 1 }}
        />

        {/* 나의 질문 */}
        <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: "20px 1fr" }}>
          <div className="flex justify-center pt-1 relative z-10">
            <div
              className="w-2.5 h-2.5 rounded-full bg-gray-900 border-2 border-white shrink-0"
              style={{ boxShadow: "0 0 0 1.5px #111827" }}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-gray-700 tracking-[0.04em] uppercase">나의 질문</span>
              <span className="text-xs text-gray-400">{thread.timestamp}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{thread.question}</p>
          </div>
        </div>

        {/* AI 답변 */}
        <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
          <div className="flex justify-center pt-1 relative z-10">
            <div
              ref={thread.isLoadingAnswer ? lastDotRef : null}
              className="w-2.5 h-2.5 rounded-full bg-brand-blue border-2 border-white shrink-0"
              style={{ boxShadow: "0 0 0 1.5px #3B5BFF" }}
            />
          </div>
          <div className={hasData || hasPosts ? "mb-5" : ""}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-bold text-brand-blue tracking-[0.04em] uppercase">AI 답변</span>
              {answered && (
                <span className="text-xs text-gray-400 ml-auto">{thread.aiAnswer.body}</span>
              )}
            </div>
            <AIAnswerBody
              aiAnswer={thread.aiAnswer}
              isLoading={thread.isLoadingAnswer}
              job={job}
              years={years}
              onJobChange={onJobChange}
              onYearsChange={onYearsChange}
              showDataCard={false}
            />
          </div>
        </div>

        {/* 데이터 */}
        {hasData && (
          <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
            <div className="flex justify-center pt-[37px] relative z-10">
              <div
                ref={!hasPosts && thread.isLoadingAnswer ? lastDotRef : null}
                className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0"
              />
            </div>
            <div className={hasPosts ? "mb-5" : ""}>
              <DataCard
                dataCard={thread.aiAnswer.dataCard}
                job={job}
                years={years}
                onJobChange={onJobChange}
                onYearsChange={onYearsChange}
              />
            </div>
          </div>
        )}

        {/* 관련 커뮤니티 글 */}
        {hasPosts && (
          <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
            <div className="flex justify-center pt-1.5 relative z-10">
              <div
                ref={thread.isLoadingAnswer ? lastDotRef : null}
                className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-gray-900">관련 커뮤니티 글</p>
                <button className="text-xs text-gray-400 font-medium flex items-center gap-0.5">
                  전체 보기
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {thread.aiAnswer.communityPosts.slice(0, 2).map(p => (
                <CommunityRow key={p.id} item={p} />
              ))}
            </div>
          </div>
        )}

        {!thread.isLoadingAnswer && (
          <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
            <div className="flex justify-center pt-[27px] relative z-10">
              <div
                ref={lastDotRef}
                className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0"
              />
            </div>
            <FeedbackStrip
              feedback={thread.feedback}
              onFeedback={onFeedback}
              threadId={thread.id}
              followUps={thread.followUps}
              onFollowUp={onFollowUp}
              isLoadingAnswer={thread.isLoadingAnswer}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ThreadItem ───────────────────────────────────────────────────────────────
function ThreadItem({
  thread,
  isOpen,
  onToggle,
  onFeedback,
  onFollowUp,
  dimmed,
  job,
  years,
  onJobChange,
  onYearsChange,
  cardRef,
}) {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: dimmed ? 0.25 : 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-3"
    >
      <div
        className="rounded-2xl border border-gray-100 overflow-hidden transition-colors duration-200"
        style={{
          background: isOpen ? "#F5F7FF" : "#FFFFFF",
          boxShadow: "0 1px 3px rgba(11,14,20,.06)",
        }}
      >
        {/* Card header — toggle */}
        <button
          onClick={onToggle}
          className="w-full text-left px-[18px] py-4 flex items-center justify-between gap-3"
          style={{ minHeight: 52 }}
        >
          <div className="flex-1 min-w-0">
            {thread.isLoadingTitle ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <p className="text-[15.5px] font-bold text-gray-900 leading-snug truncate">
                {thread.title}
              </p>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="border-t border-gray-100">
                <ThreadContent
                  thread={thread}
                  onFeedback={onFeedback}
                  onFollowUp={onFollowUp}
                  job={job}
                  years={years}
                  onJobChange={onJobChange}
                  onYearsChange={onYearsChange}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── BottomComposer ───────────────────────────────────────────────────────────
function BottomComposer({ onSubmit, prefillText, onClearPrefill }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (prefillText) {
      setText(prefillText);
      onClearPrefill();
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [prefillText]);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  };

  const handleChange = (e) => {
    setText(e.target.value);
    adjustHeight();
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 bg-white border-t border-gray-100 px-4 py-2.5"
      style={{ bottom: "calc(64px + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-end gap-2 bg-gray-50 rounded-2xl px-4 py-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="오늘의 고민은 무엇인가요?"
          rows={1}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none resize-none leading-5"
          style={{ minHeight: 20, maxHeight: 100 }}
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className={`shrink-0 w-[34px] h-[34px] rounded-[10px] flex items-center justify-center transition-colors ${
            text.trim()
              ? "bg-brand-blue text-white"
              : "bg-gray-100 text-gray-300"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────
let nextId = 100;

export default function HomeScreen({ prefillText, onClearPrefill }) {
  const [threads, setThreads] = useState(() =>
    mockData.threads.map((t) => ({
      ...t,
      followUps: [...(t.followUps || [])],
    })),
  );
  const [openId, setOpenId] = useState(
    () => mockData.threads[mockData.threads.length - 1]?.id ?? null,
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searching, setSearching] = useState(false);
  const [job, setJob] = useState(me.job);
  const [years, setYears] = useState(me.years);
  const [scrollSpacerHeight, setScrollSpacerHeight] = useState(0);
  const feedRef = useRef(null);
  const lastCardRef = useRef(null);
  const secondLastCardRef = useRef(null);
  const alignTargetCardRef = useRef(null);
  const pendingAlignTargetIdRef = useRef(null);
  const pendingNewQuestionAlignRef = useRef(false);

  const alignSecondLastCardToFeedTop = useCallback(() => {
    const feed = feedRef.current;
    const card =
      pendingNewQuestionAlignRef.current && alignTargetCardRef.current
        ? alignTargetCardRef.current
        : secondLastCardRef.current;
    if (!feed || !card) return;

    const feedTop = feed.getBoundingClientRect().top;
    const cardBottom = card.getBoundingClientRect().bottom;
    feed.scrollTop += cardBottom - feedTop;
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      alignSecondLastCardToFeedTop();
    });
  }, [alignSecondLastCardToFeedTop]);

  useLayoutEffect(() => {
    if (!pendingNewQuestionAlignRef.current) return undefined;

    const frame = requestAnimationFrame(() => {
      alignSecondLastCardToFeedTop();
    });

    const timer = setTimeout(() => {
      alignSecondLastCardToFeedTop();
      pendingNewQuestionAlignRef.current = false;
    }, 350);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [threads.length, openId, alignSecondLastCardToFeedTop]);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleFeedback = useCallback((threadId, type) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, feedback: type } : t)),
    );
  }, []);

  const handleFollowUp = useCallback(async (threadId, question) => {
    const tempId = Date.now();
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t;
        return {
          ...t,
          followUps: [
            ...t.followUps,
            { id: tempId, question, isLoading: true, aiAnswer: null },
          ],
        };
      }),
    );
    await delay(1000);
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t;
        return {
          ...t,
          followUps: t.followUps.map((fu) =>
            fu.id === tempId
              ? { ...fu, isLoading: false, aiAnswer: MOCK_FOLLOWUP_ANSWER }
              : fu,
          ),
        };
      }),
    );
  }, []);

  const handleNewQuestion = useCallback(async (question) => {
    const id = ++nextId;
    pendingNewQuestionAlignRef.current = true;
    setScrollSpacerHeight(feedRef.current?.clientHeight ?? 0);
    setThreads((prev) => {
      pendingAlignTargetIdRef.current = prev[prev.length - 1]?.id ?? null;

      return [
        ...prev,
        {
          id,
          title: "...",
          category: "all",
          question,
          tags: [],
          timestamp: "방금",
          isLoadingTitle: true,
          isLoadingAnswer: true,
          aiAnswer: null,
          followUps: [],
          feedback: null,
        },
      ];
    });
    setOpenId(id);

    await delay(800);
    const title =
      MOCK_NEW_TITLES[Math.floor(Math.random() * MOCK_NEW_TITLES.length)];
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title, isLoadingTitle: false } : t,
      ),
    );

    await delay(600);
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, aiAnswer: MOCK_NEW_ANSWER, isLoadingAnswer: false }
          : t,
      ),
    );
    requestAnimationFrame(() => {
      setScrollSpacerHeight(0);
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Fixed header */}
      <div className="bg-white z-20 shrink-0">
        {/* App bar */}
        <div className="flex items-center justify-between px-5 pt-12 pb-3">
          <div className="flex items-center gap-1.5">
            <h1
              className="text-xl font-black tracking-tight text-gray-900"
              style={{ letterSpacing: "-0.03em" }}
            >
              unwritten
            </h1>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          </div>
          <button
            onClick={() => setSearching((s) => !s)}
            className={`w-[34px] h-[34px] rounded-[10px] border flex items-center justify-center transition-colors ${
              searching
                ? "border-brand-blue text-brand-blue bg-brand-blue-light"
                : "border-gray-200 text-gray-500 bg-white"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
        </div>

        {/* Expandable search bar */}
        <AnimatePresence>
          {searching && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mx-5 mb-2 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  autoFocus
                  placeholder="지난 대화에서 찾기"
                  className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
                <button
                  onClick={() => setSearching(false)}
                  className="text-sm text-gray-400 font-medium"
                >
                  취소
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category chips */}
        <div
          className="flex gap-2 px-5 pb-3 overflow-x-auto border-b border-gray-100"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categoryChips.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors duration-150 ${
                selectedCategory === c.id
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
              style={{ minHeight: 34 }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {selectedCategory !== "all" && (
          <div className="px-5 py-2 text-sm text-gray-500 border-b border-gray-50">
            <strong className="text-gray-700">
              {categoryChips.find((c) => c.id === selectedCategory)?.label}
            </strong>{" "}
            주제로 필터링됨
          </div>
        )}
      </div>

      {/* Thread feed — independent scroll */}
      <div ref={feedRef} className="flex-1 overflow-y-auto px-4 pt-4 pb-40">
        <AnimatePresence mode="popLayout" initial={false}>
          {threads.map((thread, idx) => {
            const dimmed =
              selectedCategory !== "all" &&
              thread.category !== selectedCategory &&
              thread.category !== undefined;
            const isLast = idx === threads.length - 1;
            const isSecondLast = idx === threads.length - 2;
            const isPendingAlignTarget =
              pendingNewQuestionAlignRef.current &&
              thread.id === pendingAlignTargetIdRef.current;
            return (
              <ThreadItem
                key={thread.id}
                thread={thread}
                isOpen={openId === thread.id}
                onToggle={() => handleToggle(thread.id)}
                onFeedback={(type) => handleFeedback(thread.id, type)}
                onFollowUp={handleFollowUp}
                dimmed={dimmed}
                job={job}
                years={years}
                onJobChange={setJob}
                onYearsChange={setYears}
                cardRef={
                  isPendingAlignTarget
                    ? alignTargetCardRef
                    : isLast
                      ? lastCardRef
                      : isSecondLast
                        ? secondLastCardRef
                        : null
                }
              />
            );
          })}
        </AnimatePresence>

        {threads.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-24 text-center px-8">
            <p className="text-3xl mb-3">✏️</p>
            <p className="text-base font-bold text-gray-800 mb-1.5">
              첫 질문을 해보세요
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              직장생활의 고민을 AI에게 물어보세요
            </p>
          </div>
        )}
        {scrollSpacerHeight > 0 && (
          <div aria-hidden="true" style={{ height: scrollSpacerHeight }} />
        )}
      </div>

      <BottomComposer
        onSubmit={handleNewQuestion}
        prefillText={prefillText}
        onClearPrefill={onClearPrefill}
      />
    </div>
  );
}
