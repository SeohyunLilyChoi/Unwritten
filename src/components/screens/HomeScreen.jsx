import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  mockData,
  me,
  categoryChips,
  computeDataView,
  MOCK_NEW_TITLES,
  MOCK_NEW_ANSWER,
  MOCK_FOLLOWUP_ANSWER,
} from "../../data/mockData";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const composerPlaceholders = [
  "출근 몇시까지 해야할까?",
  "점심 혼자 먹어도 될까?",
  "퇴근하고 싶어",
];

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className = "" }) {
  return <div className={`shimmer rounded-md ${className}`} />;
}

// ─── StatBars ─────────────────────────────────────────────────────────────────
function StatBars({ bars, mode = "profile" }) {
  const maxValue = Math.max(...bars.map((b) => b.value));
  const isOverall = mode === "overall";

  return (
    <div className="flex flex-col gap-2.5">
      {bars.map((b, i) => {
        const isMax = b.value === maxValue;
        const active = isOverall ? isMax : b.highlight;
        const barClass = isOverall
          ? isMax
            ? "bg-[#9DB2FF]"
            : "bg-[#DCE3FF]"
          : b.highlight
            ? "bg-brand-blue"
            : "bg-gray-300";

        return (
          <div
            key={i}
            className="grid items-center gap-3"
            style={{ gridTemplateColumns: "64px 1fr 36px" }}
          >
            <span
              className={`text-sm ${active ? "font-bold text-gray-800" : "font-medium text-gray-500"}`}
            >
              {b.label}
            </span>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barClass}`}
                initial={{ width: 0 }}
                animate={{ width: `${b.value}%` }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
            <span
              className={`text-sm text-right font-semibold ${active ? "text-gray-800" : "text-gray-400"}`}
            >
              {b.value}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

function DataCard({ dataCard, job, years, onJobChange, onYearsChange }) {
  if (!dataCard) return null;
  const view = computeDataView(dataCard.matrix, job, years);
  if (!view) return null;
  const isMyProfile = job === me.job && years === me.years;
  const handleToggleProfile = (event) => {
    event.stopPropagation();
    if (isMyProfile) {
      onJobChange("all");
      onYearsChange("all");
      return;
    }

    onJobChange(me.job);
    onYearsChange(me.years);
  };

  return (
    <div className="mt-5">
      {/* Title + profile filters */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900">{dataCard.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {view.n.toLocaleString()}명 응답
          </p>
        </div>
      <button
        type="button"
        onClick={handleToggleProfile}
          aria-pressed={isMyProfile}
          className="shrink-0 h-8 flex items-center gap-2 text-xs font-semibold text-gray-500"
        >
          <span>내 직무/연차</span>
          <span
            className={`relative h-5 w-9 rounded-full transition-colors ${
              isMyProfile ? "bg-brand-blue" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-[left] ${
                isMyProfile ? "left-[18px]" : "left-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      <StatBars bars={view.bars} mode={isMyProfile ? "profile" : "overall"} />

      <button
        onClick={(event) => event.stopPropagation()}
        className="mt-4 w-full bg-[#F3F5FB] border border-[#E1E6F2] rounded-[10px] py-2.5 text-sm font-semibold text-brand-blue flex items-center justify-center gap-1"
      >
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
      onClick={(event) => event.stopPropagation()}
      className="w-full text-left bg-white border border-[#E3E8F2] rounded-xl px-3.5 py-3.5 mb-2 last:mb-0 shadow-sm cursor-pointer transition-colors hover:border-[#D5DCEB] hover:bg-[#F8FAFD] active:bg-[#F1F4FA]"
    >
      <p className="text-sm font-bold text-gray-900 mb-1 leading-snug">
        {item.title}
      </p>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {item.preview}
      </p>
      <div className="flex items-center gap-2 mt-1.5 text-[11.5px] text-gray-400">
        <span>{item.role}</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
            </svg>
            {item.likes}
          </span>
          <span className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6z" />
            </svg>
            {item.comments}
          </span>
        </div>
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
      <div
        className="py-3.5 border-t border-gray-100"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">이 답변이 도움됐나요?</span>
          <div className="flex gap-2">
            <button
              onClick={() => onFeedback("up")}
              className="w-[34px] h-[34px] rounded-[10px] border border-[#E1E6F2] bg-[#F3F5FB] text-gray-500 flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" />
              </svg>
            </button>
            <button
              onClick={() => setShowReasonSheet((open) => !open)}
              className={`w-[34px] h-[34px] rounded-[10px] border flex items-center justify-center transition-colors ${
                showReasonSheet
                  ? "border-brand-blue bg-[#DFF1FF] text-brand-blue"
                  : "border-[#E1E6F2] bg-[#F3F5FB] text-gray-500 hover:border-[#E1E6F2] hover:text-gray-500"
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
                  ? "border-brand-blue bg-[#DFF1FF] text-brand-blue"
                  : "border-[#E1E6F2] bg-[#F3F5FB] text-gray-500 hover:border-[#E1E6F2] hover:text-gray-500"
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

// ─── AttachmentPreview ────────────────────────────────────────────────────────
function AttachmentPreview({ attachment, onRemove, onOpen, className = "" }) {
  if (!attachment || !["poll", "community"].includes(attachment.type))
    return null;
  const label = attachment.type === "poll" ? "투표" : "논의";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onOpen?.(attachment);
      }}
      className={`inline-flex max-w-full text-left rounded-xl border border-brand-blue/20 bg-brand-blue-light px-3 py-2 items-start gap-2 cursor-pointer active:bg-[#E3E8FF] ${className}`}
    >
      <div className="shrink-0 mt-0.5 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-brand-blue">
        {label}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">
          {attachment.title}
        </p>
        {attachment.meta && (
          <p className="mt-0.5 text-[11px] text-gray-400">{attachment.meta}</p>
        )}
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="shrink-0 text-gray-400"
          aria-label="첨부 제거"
          type="button"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
      )}
    </button>
  );
}

function AttachmentModal({ attachment, onClose }) {
  if (!attachment) return null;

  const top = Math.max(...(attachment.options || []).map((o) => o.pct));
  const isPoll = attachment.type === "poll";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-[382px] rounded-2xl bg-white p-4 shadow-xl"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="inline-flex rounded-md bg-brand-blue-light px-2 py-1 text-[11px] font-bold text-brand-blue">
                {isPoll ? "투표 결과" : "활발한 논의"}
              </span>
              <h3 className="mt-2 text-[15px] font-bold leading-snug text-gray-900">
                {attachment.title}
              </h3>
              {attachment.meta && (
                <p className="mt-1 text-xs text-gray-400">{attachment.meta}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 text-gray-400"
              aria-label="닫기"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
          </div>
          {isPoll ? (
            <div className="flex flex-col gap-2">
              {(attachment.options || []).map((option, index) => {
                const isTop = option.pct === top;
                return (
                  <div
                    key={`${option.label}-${index}`}
                    className="relative overflow-hidden rounded-xl border border-gray-100 bg-white px-3 py-2.5"
                  >
                    <div
                      className={`absolute inset-y-0 left-0 ${isTop ? "bg-brand-blue-light" : "bg-gray-100"}`}
                      style={{ width: `${option.pct}%` }}
                    />
                    <div className="relative z-10 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-gray-700">
                        {option.label}
                      </span>
                      <span
                        className={`text-sm font-bold ${isTop ? "text-brand-blue" : "text-gray-400"}`}
                      >
                        {option.pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {attachment.summary && (
                <p className="text-[16px] font-bold leading-snug text-gray-900">
                  {attachment.summary}
                </p>
              )}
              {attachment.body && (
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {attachment.body}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
          <p className="text-sm text-gray-600 mb-1">
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
function EvidenceIcon({ type }) {
  const path =
    type === "content"
      ? "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"
      : "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z";

  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={path}
      />
      {type === "content" && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 4v6h6"
        />
      )}
    </svg>
  );
}

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
      <p className="text-[17px] font-bold text-gray-900 leading-snug">
        {aiAnswer.headline}
      </p>
      <p className="mt-1 text-[15px] font-medium text-gray-900 mb-1.5">{aiAnswer.highlight}</p>

      {(aiAnswer.dataSummary || aiAnswer.communitySummary || aiAnswer.evidenceSummary) && (
        <div className="mt-4 space-y-1.5 text-sm text-gray-600 leading-relaxed">
          {aiAnswer.dataSummary && (
            <p className="flex items-start gap-2.5">
              <EvidenceIcon type="content" />
              <span className="break-keep">{aiAnswer.dataSummary}</span>
            </p>
          )}
          {aiAnswer.communitySummary && (
            <p className="flex items-start gap-2.5">
              <EvidenceIcon type="community" />
              <span className="break-keep">{aiAnswer.communitySummary}</span>
            </p>
          )}
          {!aiAnswer.dataSummary && !aiAnswer.communitySummary && aiAnswer.evidenceSummary && (
            <p>{aiAnswer.evidenceSummary}</p>
          )}
        </div>
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
  onOpenAttachment,
  previewMode = false,
}) {
  const answered = !thread.isLoadingAnswer && thread.aiAnswer;
  const hasData = !previewMode && answered && thread.aiAnswer.dataCard;
  const hasPosts =
    !previewMode && answered && thread.aiAnswer.communityPosts?.length > 0;
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
  }, [thread.isLoadingAnswer, hasData, hasPosts, previewMode]);

  return (
    <div>
      {/* Timeline */}
      <div
        ref={timelineRef}
        className={`px-[18px] pt-4 relative ${previewMode ? "pb-5" : "pb-2"}`}
      >
        {/* Connecting vertical line — behind all dots */}
        <div
          className="absolute bg-gray-200"
          style={{ left: 27, top: 40, height: lineHeight, width: 1 }}
        />

        {/* 나의 질문 */}
        <div
          className="grid gap-3 mb-7"
          style={{ gridTemplateColumns: "20px 1fr" }}
        >
          <div className="flex justify-center pt-1 relative z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border-2 border-white shrink-0" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-gray-700 tracking-[0.04em] uppercase">
                나의 질문
              </span>
              <span className="text-xs text-gray-400">{thread.timestamp}</span>
            </div>
            {thread.attachment && (
              <AttachmentPreview
                attachment={thread.attachment}
                onOpen={onOpenAttachment}
                className="mb-2"
              />
            )}
            <p className="text-sm text-gray-700 leading-relaxed">
              {thread.question}
            </p>
          </div>
        </div>

        {/* AI 답변 */}
        <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
          <div className="flex justify-center pt-1 relative z-10">
            <div
              ref={previewMode || thread.isLoadingAnswer ? lastDotRef : null}
              className="w-2.5 h-2.5 rounded-full bg-brand-blue border-2 border-white shrink-0"
            />
          </div>
          <div className={hasData || hasPosts ? "mb-7" : ""}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[13px] font-bold text-brand-blue tracking-[0.04em] uppercase">
                AI 답변
              </span>
              {answered && (
                <span className="text-xs text-gray-400 ml-auto">
                  {thread.aiAnswer.body}
                </span>
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
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "20px 1fr" }}
          >
            <div className="flex justify-center pt-[26px] relative z-10">
              <div
                ref={!hasPosts && thread.isLoadingAnswer ? lastDotRef : null}
                className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0"
              />
            </div>
            <div className={hasPosts ? "mb-7" : ""}>
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
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "20px 1fr" }}
          >
            <div className="flex justify-center pt-1.5 relative z-10">
              <div
                ref={thread.isLoadingAnswer ? lastDotRef : null}
                className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0"
              />
            </div>
            <div className={!previewMode ? "mb-3" : ""}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-gray-900">
                  관련 커뮤니티 글
                </p>
              </div>
              {thread.aiAnswer.communityPosts.slice(0, 2).map((p) => (
                <CommunityRow key={p.id} item={p} />
              ))}
              <button
                onClick={(event) => event.stopPropagation()}
                className="mt-4 w-full bg-[#F3F5FB] border border-[#E1E6F2] rounded-[10px] py-2.5 text-sm font-semibold text-brand-blue flex items-center justify-center gap-1"
              >
                관련 커뮤니티 글 더보기
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
          </div>
        )}

        {!previewMode && !thread.isLoadingAnswer && (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "20px 1fr" }}
          >
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
  job,
  years,
  onJobChange,
  onYearsChange,
  cardRef,
  onOpenAttachment,
}) {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-3"
    >
      <div
        onClick={onToggle}
        className="rounded-2xl border border-gray-100 overflow-hidden transition-colors duration-200 cursor-pointer"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(11,14,20,.06)",
        }}
      >
        {/* Card header — toggle */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          className="w-full text-left px-[18px] py-4 flex items-center justify-between gap-3"
          style={{ minHeight: 52 }}
        >
          <div className="flex-1 min-w-0">
            {thread.isLoadingTitle ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <p className="text-[17px] font-bold text-gray-900 leading-snug truncate">
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

        <div className="border-t border-gray-100">
          <ThreadContent
            thread={thread}
            onFeedback={onFeedback}
            onFollowUp={onFollowUp}
            job={job}
            years={years}
            onJobChange={onJobChange}
            onYearsChange={onYearsChange}
            onOpenAttachment={onOpenAttachment}
            previewMode={!isOpen}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── BottomComposer ───────────────────────────────────────────────────────────
function BottomComposer({
  onSubmit,
  prefillContent,
  onClearPrefill,
  onOpenAttachment,
}) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const placeholderText = isFocused
    ? "오늘의 고민은 무엇인가요?"
    : composerPlaceholders[placeholderIndex];

  useEffect(() => {
    if (prefillContent) {
      if (typeof prefillContent === "string") {
        setText(prefillContent);
        setAttachment(null);
      } else if (["poll", "community"].includes(prefillContent.type)) {
        setText("");
        setAttachment(prefillContent);
      }
      onClearPrefill();
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [prefillContent]);

  useEffect(() => {
    if (isFocused) return undefined;

    const timer = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % composerPlaceholders.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [isFocused]);

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
    if (!text.trim() && !attachment) return;
    onSubmit(text.trim() || attachment.title, attachment);
    setText("");
    setAttachment(null);
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
      {["poll", "community"].includes(attachment?.type) && (
        <AttachmentPreview
          attachment={attachment}
          onRemove={() => setAttachment(null)}
          onOpen={onOpenAttachment}
          className="mb-2"
        />
      )}
      <div className="flex items-end gap-2 bg-gray-50 rounded-2xl px-4 py-2">
        <div className="relative flex-1">
          {!text && (
            <AnimatePresence mode="wait">
              <motion.div
                key={placeholderText}
                className="pointer-events-none absolute left-0 top-0 text-sm leading-5 text-gray-400"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {placeholderText}
              </motion.div>
            </AnimatePresence>
          )}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            rows={1}
            className="relative z-10 w-full bg-transparent text-sm text-gray-800 outline-none resize-none leading-5"
            style={{ minHeight: 20, maxHeight: 100 }}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!text.trim() && !attachment}
          className={`shrink-0 w-[34px] h-[34px] rounded-[10px] flex items-center justify-center transition-colors ${
            text.trim() || attachment
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

export default function HomeScreen({ prefillContent, onClearPrefill }) {
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
  const [openAttachment, setOpenAttachment] = useState(null);
  const feedRef = useRef(null);
  const lastCardRef = useRef(null);
  const secondLastCardRef = useRef(null);
  const alignTargetCardRef = useRef(null);
  const pendingAlignTargetIdRef = useRef(null);
  const pendingNewQuestionAlignRef = useRef(false);
  const pendingCategoryBottomScrollRef = useRef(false);
  const pendingAllAlignRef = useRef(false);
  const visibleThreads =
    selectedCategory === "all"
      ? threads
      : threads.filter((thread) => thread.category === selectedCategory);

  const alignSecondLastCardToFeedTop = useCallback(() => {
    const feed = feedRef.current;
    const card =
      pendingNewQuestionAlignRef.current && alignTargetCardRef.current
        ? alignTargetCardRef.current
        : secondLastCardRef.current;
    if (!feed || !card) return;

    feed.scrollTop = card.offsetTop + card.offsetHeight;
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

  useLayoutEffect(() => {
    if (!pendingCategoryBottomScrollRef.current) return;

    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
    pendingCategoryBottomScrollRef.current = false;
  }, [selectedCategory, visibleThreads.length, openId]);

  useLayoutEffect(() => {
    if (!pendingAllAlignRef.current) return undefined;

    alignSecondLastCardToFeedTop();
    pendingAllAlignRef.current = false;

    return undefined;
  }, [selectedCategory, openId, visibleThreads.length, alignSecondLastCardToFeedTop]);

  const handleCategorySelect = useCallback((categoryId) => {
    pendingAllAlignRef.current = categoryId === "all";
    pendingCategoryBottomScrollRef.current = categoryId !== "all";
    setOpenId(
      categoryId === "all" ? (threads[threads.length - 1]?.id ?? null) : null,
    );
    setSelectedCategory(categoryId);
  }, [threads]);

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

  const handleNewQuestion = useCallback(async (question, attachment = null) => {
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
          attachment,
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
        <div className="flex items-center justify-between px-5 pt-[14px] pb-[10px]">
          <div className="flex items-center gap-[6px]">
            <h1
              className="text-[20px] font-extrabold text-gray-900"
              style={{ letterSpacing: "-0.03em" }}
            >
              unwritten
            </h1>
            <div className="w-[5px] h-[5px] rounded-full bg-brand-blue" />
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
              onClick={() => handleCategorySelect(c.id)}
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

      </div>

      {/* Thread feed — independent scroll */}
      <div
        ref={feedRef}
        className="flex-1 overflow-y-auto px-4 pt-4 pb-28"
        style={{ background: "#F5F7FF" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleThreads.map((thread, idx) => {
            const isLast = idx === visibleThreads.length - 1;
            const isSecondLast = idx === visibleThreads.length - 2;
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
                job={job}
                years={years}
                onJobChange={setJob}
                onYearsChange={setYears}
                onOpenAttachment={setOpenAttachment}
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

        {visibleThreads.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-24 text-center px-8">
            <p className="text-3xl mb-3">✏️</p>
            <p className="text-base font-bold text-gray-800 mb-1.5">
              해당 주제의 질문이 없어요
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
        prefillContent={prefillContent}
        onClearPrefill={onClearPrefill}
        onOpenAttachment={setOpenAttachment}
      />
      <AttachmentModal
        attachment={openAttachment}
        onClose={() => setOpenAttachment(null)}
      />
    </div>
  );
}
