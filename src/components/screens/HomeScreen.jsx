import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as mockDataKo from "../../data/mockData";
import * as mockDataEn from "../../data/mockDataEn";
import { useLanguage } from "../../contexts/LanguageContext";
import faceImg from "../images/face.png";
import { translations } from "../../data/translations";
import keyboardImg from "../images/Keyboard - iPhone.png";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

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
  const { lang } = useLanguage();
  const t = translations[lang].home;
  const MD = lang === "en" ? mockDataEn : mockDataKo;
  const me = MD.me;

  if (!dataCard) return null;
  const view = MD.computeDataView(dataCard.matrix, job, years);
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
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900">{dataCard.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {view.n.toLocaleString()} {t.responses}
          </p>
        </div>
        <button
          type="button"
          onClick={handleToggleProfile}
          aria-pressed={isMyProfile}
          className="shrink-0 h-8 flex items-center gap-2 text-xs font-semibold text-gray-500"
        >
          <span>{t.myJobLevel}</span>
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
        {t.seeMoreData}
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
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
            </svg>
            {item.likes}
          </span>
          <span className="flex items-center gap-0.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
function FeedbackStrip({ feedback, onFeedback, threadId, followUps, onFollowUp, isLoadingAnswer }) {
  const { lang } = useLanguage();
  const t = translations[lang].home;
  const [showReasonSheet, setShowReasonSheet] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [followUpText, setFollowUpText] = useState("");
  const followUpInputRef = useRef(null);

  const isLastFollowUpLoading =
    followUps && followUps.length > 0 && followUps[followUps.length - 1].isLoading;

  const handleFollowUpToggle = () => {
    setFollowUpOpen((open) => {
      if (open) { setFollowUpText(""); return false; }
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
        <span className="text-sm text-gray-400">{t.feedbackThanks(feedback)}</span>
      </div>
    );
  }

  return (
    <>
      <div className="py-3.5 border-t border-gray-100" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{t.feedbackPrompt}</span>
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
                  : "border-[#E1E6F2] bg-[#F3F5FB] text-gray-500"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ transform: "rotate(180deg)" }}>
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2l-.01-.01L23 10z" />
              </svg>
            </button>
            <button
              onClick={handleFollowUpToggle}
              disabled={isLoadingAnswer || isLastFollowUpLoading}
              className={`w-[34px] h-[34px] rounded-[10px] border flex items-center justify-center disabled:opacity-40 transition-colors ${
                followUpOpen
                  ? "border-brand-blue bg-[#DFF1FF] text-brand-blue"
                  : "border-[#E1E6F2] bg-[#F3F5FB] text-gray-500"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
              placeholder={t.followUpPlaceholder}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
              style={{ minHeight: 36 }}
            />
            <button onClick={handleFollowUpSend} disabled={!followUpText.trim()} className="w-8 h-8 flex items-center justify-center shrink-0">
              <svg className={`w-5 h-5 transition-colors ${followUpText.trim() ? "text-brand-blue" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        )}

        {showReasonSheet && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-semibold text-gray-800">{t.feedbackReasonPrompt}</p>
            {t.reasons.map((reason) => (
              <button
                key={reason}
                onClick={() => { onFeedback("down", reason); setShowReasonSheet(false); }}
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
  const { lang } = useLanguage();
  const t = translations[lang].home;
  if (!attachment || !["poll", "community", "word"].includes(attachment.type)) return null;
  const label = attachment.type === "poll"
    ? t.attachmentLabelPoll
    : attachment.type === "word"
    ? t.attachmentLabelWord
    : t.attachmentLabelCommunity;

  return (
    <button
      type="button"
      onClick={(event) => { event.stopPropagation(); onOpen?.(attachment); }}
      className={`inline-flex max-w-full text-left rounded-xl border border-brand-blue/20 bg-brand-blue-light px-3 py-2 items-start gap-2 cursor-pointer active:bg-[#E3E8FF] ${className}`}
    >
      <div className="shrink-0 mt-0.5 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-brand-blue">
        {label}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">{attachment.title}</p>
        {attachment.meta && <p className="mt-0.5 text-[11px] text-gray-400">{attachment.meta}</p>}
      </div>
      {onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="shrink-0 text-gray-400" aria-label={t.removeAttachment} type="button">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </button>
  );
}

function AttachmentModal({ attachment, onClose }) {
  const { lang } = useLanguage();
  const t = translations[lang].home;
  if (!attachment) return null;

  const top = Math.max(...(attachment.options || []).map((o) => o.pct));
  const isPoll = attachment.type === "poll";
  const isWord = attachment.type === "word";
  const modalLabel = isPoll ? t.pollResultLabel : isWord ? t.wordDetailLabel : t.activeDiscussionLabel;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center px-5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                {modalLabel}
              </span>
              <h3 className="mt-2 text-[15px] font-bold leading-snug text-gray-900">{attachment.title}</h3>
              {attachment.meta && <p className="mt-1 text-xs text-gray-400">{attachment.meta}</p>}
            </div>
            <button type="button" onClick={onClose} className="shrink-0 text-gray-400" aria-label={t.closeLabel}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          {isPoll ? (
            <div className="flex flex-col gap-2">
              {(attachment.options || []).map((option, index) => {
                const isTop = option.pct === top;
                return (
                  <div key={`${option.label}-${index}`} className="relative overflow-hidden rounded-xl border border-gray-100 bg-white px-3 py-2.5">
                    <div className={`absolute inset-y-0 left-0 ${isTop ? "bg-brand-blue-light" : "bg-gray-100"}`} style={{ width: `${option.pct}%` }} />
                    <div className="relative z-10 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-gray-700">{option.label}</span>
                      <span className={`text-sm font-bold ${isTop ? "text-brand-blue" : "text-gray-400"}`}>{option.pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : isWord ? (
            <div>
              {attachment.body && <p className="text-sm leading-relaxed text-gray-600">{attachment.body}</p>}
            </div>
          ) : (
            <div>
              {attachment.summary && <p className="text-[16px] font-bold leading-snug text-gray-900">{attachment.summary}</p>}
              {attachment.body && <p className="mt-3 text-sm leading-relaxed text-gray-600">{attachment.body}</p>}
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
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
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
          <p className="text-sm font-bold text-gray-900 mb-1">{item.aiAnswer.headline}</p>
          <p className="text-sm text-gray-600 mb-1">{item.aiAnswer.highlight}</p>
          <p className="text-xs text-gray-400">{item.aiAnswer.body}</p>
        </div>
      ) : null}
    </motion.div>
  );
}

// ─── FollowUpSection ──────────────────────────────────────────────────────────
function FollowUpSection({ threadId, followUps, onSend, isLoadingAnswer }) {
  const { lang } = useLanguage();
  const t = translations[lang].home;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const isLastLoading = followUps && followUps.length > 0 && followUps[followUps.length - 1].isLoading;

  const handleOpen = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 100); };
  const handleSend = () => {
    if (!text.trim()) return;
    onSend(threadId, text.trim());
    setText(""); setOpen(false);
  };

  return (
    <div className="px-[18px] pb-4">
      {(followUps || []).map((fu) => <FollowUpItem key={fu.id} item={fu} />)}
      {!open ? (
        <button
          onClick={handleOpen}
          disabled={isLoadingAnswer || isLastLoading}
          className="mt-4 w-full border border-dashed border-gray-200 bg-white rounded-xl py-3 text-sm text-gray-400 font-medium flex items-center justify-center gap-2 disabled:opacity-40 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14m-7-7h14" />
          </svg>
          {t.followUpBtn}
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <input
            ref={inputRef} type="text" value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t.followUpPlaceholder}
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
            style={{ minHeight: 36 }}
          />
          <button onClick={handleSend} disabled={!text.trim()} className="w-8 h-8 flex items-center justify-center shrink-0">
            <svg className={`w-5 h-5 transition-colors ${text.trim() ? "text-brand-blue" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 24 24">
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
  const path = type === "content"
    ? "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"
    : "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z";
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
      {type === "content" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 4v6h6" />}
    </svg>
  );
}

function AnalysisSource({ body }) {
  if (!body) return null;
  const articleMatch  = body.match(/(\d+)\s+articles?/i) || body.match(/콘텐츠\s+(\d+)건/);
  const communityMatch = body.match(/(\d+)\s+community\s+posts?/i) || body.match(/커뮤니티\s+(\d+)건/);
  const articles  = articleMatch  ? parseInt(articleMatch[1])  : 0;
  const community = communityMatch ? parseInt(communityMatch[1]) : 0;
  if (!articles && !community) return null;
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-400 ml-auto shrink-0">
      <span>based on</span>
      {articles > 0 && (
        <>
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
            <path d="M13 4v6h6" />
          </svg>
          <span>{articles}</span>
        </>
      )}
      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>{community}</span>
    </span>
  );
}

function AIAnswerBody({ aiAnswer, isLoading, job, years, onJobChange, onYearsChange, showDataCard, hideEvidence }) {
  const { lang } = useLanguage();
  const t = translations[lang].home;

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
      <p className="text-[17px] font-bold text-gray-900 leading-snug">{aiAnswer.headline}</p>
      <p className="mt-1 text-[15px] font-medium text-gray-900 mb-1.5">{aiAnswer.highlight}</p>
      {!hideEvidence && (aiAnswer.dataSummary || aiAnswer.communitySummary || aiAnswer.evidenceSummary) && (
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
          {!aiAnswer.dataSummary && !aiAnswer.communitySummary && aiAnswer.evidenceSummary && <p>{aiAnswer.evidenceSummary}</p>}
        </div>
      )}
      {showDataCard && (
        <DataCard dataCard={aiAnswer.dataCard} job={job} years={years} onJobChange={onJobChange} onYearsChange={onYearsChange} />
      )}
      {showDataCard && aiAnswer.communityPosts && aiAnswer.communityPosts.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold text-gray-900">{t.relatedPosts}</p>
            <button className="text-xs text-gray-400 font-medium flex items-center gap-0.5">
              {t.viewAll}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {aiAnswer.communityPosts.slice(0, 2).map((p) => <CommunityRow key={p.id} item={p} />)}
        </div>
      )}
    </div>
  );
}

// ─── ThreadContent ────────────────────────────────────────────────────────────
function ThreadContent({ thread, onFeedback, onFollowUp, job, years, onJobChange, onYearsChange, onOpenAttachment, previewMode = false }) {
  const { lang } = useLanguage();
  const t = translations[lang].home;
  const answered = !thread.isLoadingAnswer && thread.aiAnswer;
  const hasData = !previewMode && answered && thread.aiAnswer.dataCard;
  const hasPosts = !previewMode && answered && thread.aiAnswer.communityPosts?.length > 0;
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
    return () => { observer.disconnect(); window.removeEventListener("resize", updateLineHeight); };
  }, [thread.isLoadingAnswer, hasData, hasPosts, previewMode]);

  return (
    <div>
      <div ref={timelineRef} className={`px-[18px] pt-4 relative ${previewMode ? "pb-3" : "pb-2"}`}>
        <div className="absolute bg-gray-200" style={{ left: 27, top: 40, height: lineHeight, width: 1 }} />

        {/* My Question */}
        {!previewMode && (
        <div className="grid gap-3 mb-7" style={{ gridTemplateColumns: "20px 1fr" }}>
          <div className="flex justify-center pt-1 relative z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border-2 border-white shrink-0" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-gray-700 tracking-[0.04em] uppercase">{t.myQuestion}</span>
              <span className="text-xs text-gray-400">{thread.timestamp}</span>
            </div>
            {thread.attachment && (
              <AttachmentPreview attachment={thread.attachment} onOpen={onOpenAttachment} className="mb-2" />
            )}
            <p className="text-sm text-gray-700 leading-relaxed">{thread.question}</p>
          </div>
        </div>
        )}

        {/* AI Answer */}
        <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
          <div className="flex justify-center pt-[5px] relative z-10">
            <div
              ref={previewMode || thread.isLoadingAnswer ? lastDotRef : null}
              className="w-2.5 h-2.5 rounded-full bg-brand-blue border-2 border-white shrink-0"
            />
          </div>
          <div className={hasData || hasPosts ? "mb-7" : ""}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[13px] font-bold text-brand-blue tracking-[0.04em] uppercase">{t.aiAnswer}</span>
              {answered && <AnalysisSource body={thread.aiAnswer.body} />}
            </div>
            <AIAnswerBody aiAnswer={thread.aiAnswer} isLoading={thread.isLoadingAnswer} job={job} years={years} onJobChange={onJobChange} onYearsChange={onYearsChange} showDataCard={false} hideEvidence={previewMode} />
          </div>
        </div>

        {/* Data */}
        {hasData && (
          <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
            <div className="flex justify-center pt-[26px] relative z-10">
              <div ref={!hasPosts && thread.isLoadingAnswer ? lastDotRef : null} className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0" />
            </div>
            <div className={hasPosts ? "mb-7" : ""}>
              <DataCard dataCard={thread.aiAnswer.dataCard} job={job} years={years} onJobChange={onJobChange} onYearsChange={onYearsChange} />
            </div>
          </div>
        )}

        {/* Related posts */}
        {hasPosts && (
          <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
            <div className="flex justify-center pt-1.5 relative z-10">
              <div ref={thread.isLoadingAnswer ? lastDotRef : null} className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0" />
            </div>
            <div className={!previewMode ? "mb-3" : ""}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-gray-900">{t.relatedPosts}</p>
              </div>
              {thread.aiAnswer.communityPosts.slice(0, 2).map((p) => <CommunityRow key={p.id} item={p} />)}
              <button
                onClick={(event) => event.stopPropagation()}
                className="mt-4 w-full bg-[#F3F5FB] border border-[#E1E6F2] rounded-[10px] py-2.5 text-sm font-semibold text-brand-blue flex items-center justify-center gap-1"
              >
                {t.morePosts}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {!previewMode && !thread.isLoadingAnswer && (
          <div className="grid gap-3" style={{ gridTemplateColumns: "20px 1fr" }}>
            <div className="flex justify-center pt-[27px] relative z-10">
              <div ref={lastDotRef} className="w-2 h-2 rounded-full bg-gray-300 border-2 border-white shrink-0" />
            </div>
            <FeedbackStrip feedback={thread.feedback} onFeedback={onFeedback} threadId={thread.id} followUps={thread.followUps} onFollowUp={onFollowUp} isLoadingAnswer={thread.isLoadingAnswer} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ThreadItem ───────────────────────────────────────────────────────────────
function ThreadItem({ thread, isOpen, onToggle, onFeedback, onFollowUp, job, years, onJobChange, onYearsChange, cardRef, onOpenAttachment }) {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-3 rounded-2xl"
      style={{ boxShadow: "0 1px 3px rgba(11,14,20,.06)" }}
    >
      <div
        onClick={onToggle}
        className={`rounded-2xl transition-colors duration-200 cursor-pointer ${isOpen ? "overflow-clip" : "border border-gray-100 overflow-hidden"}`}
        style={{ background: "#FFFFFF" }}
      >
        <button
          onClick={(event) => { event.stopPropagation(); onToggle(); }}
          className={`relative w-full text-left px-[18px] py-4 flex items-center justify-between gap-3 ${isOpen ? "sticky top-0 z-30 bg-white" : ""}`}
          style={{ minHeight: 52 }}
        >
          {/* Opaque square white fill (covers content bleeding behind rounded corners) + rounded border drawn on top */}
          {isOpen && <span className="pointer-events-none absolute inset-0 rounded-t-2xl border border-gray-100" aria-hidden="true" />}
          <div className="flex-1 min-w-0">
            {thread.isLoadingTitle ? <Skeleton className="h-5 w-40" /> : (
              <p className="text-[17px] font-bold text-gray-900 leading-snug truncate">{thread.title}</p>
            )}
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
        <div className={isOpen ? "border-x border-b border-gray-100 rounded-b-2xl" : "border-t border-gray-100"}>
          <ThreadContent thread={thread} onFeedback={onFeedback} onFollowUp={onFollowUp} job={job} years={years} onJobChange={onJobChange} onYearsChange={onYearsChange} onOpenAttachment={onOpenAttachment} previewMode={!isOpen} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── BottomComposer ───────────────────────────────────────────────────────────
function BottomComposer({ onSubmit, prefillContent, onClearPrefill, onOpenAttachment, composerPlaceholder, suggestedQuestions, suggestedLabel }) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [composerHeight, setComposerHeight] = useState(74);
  const textareaRef = useRef(null);
  const composerRef = useRef(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setKeyboardHeight(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => { vv.removeEventListener("resize", update); vv.removeEventListener("scroll", update); };
  }, []);


  useEffect(() => {
    if (prefillContent) {
      if (typeof prefillContent === "string") { setText(prefillContent); setAttachment(null); }
      else if (prefillContent.type === "word") { setText(prefillContent.prefillText || ""); setAttachment(prefillContent); }
      else if (["poll", "community"].includes(prefillContent.type)) { setText(""); setAttachment(prefillContent); }
      onClearPrefill();
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [prefillContent]);

  useEffect(() => {
    const composer = composerRef.current;
    if (!composer) return undefined;
    const updateHeight = () => setComposerHeight(Math.ceil(composer.getBoundingClientRect().height));
    updateHeight();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
    const observer = new ResizeObserver(updateHeight);
    observer.observe(composer);
    window.addEventListener("resize", updateHeight);
    return () => { observer.disconnect(); window.removeEventListener("resize", updateHeight); };
  }, []);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  };

  const handleChange = (e) => { setText(e.target.value); adjustHeight(); };

  const handleSuggestionClick = (question) => {
    setText(question);
    setAttachment(null);
    requestAnimationFrame(() => { adjustHeight(); textareaRef.current?.focus(); });
  };

  const handleSubmit = () => {
    if (!text.trim() && !attachment) return;
    onSubmit(text.trim() || attachment.title, attachment);
    setText("");
    setAttachment(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    textareaRef.current?.blur();
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } };

  // Treat as mobile only when the primary pointer is a touch (coarse) device.
  // Otherwise (desktop, incl. emulated frames) show the keyboard image on focus.
  const isMobile = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const effectiveKeyboardHeight = keyboardHeight > 0 ? keyboardHeight : (isFocused && !isMobile ? 280 : 0);

  const suggestionsBottom = `calc(${effectiveKeyboardHeight + composerHeight + 28}px + 64px + env(safe-area-inset-bottom, 0px))`;

  return (
    <>
      <AnimatePresence>
        {isFocused && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40" style={{ background: "rgba(11,14,20,.25)" }}
            onMouseDown={() => textareaRef.current?.blur()}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 z-50 mx-auto w-full max-w-[430px] px-4"
            style={{ bottom: suggestionsBottom, transition: "bottom 0.25s ease" }}
          >
            <div className="flex flex-col items-start gap-2">
              <p className="mb-1 text-[24px] font-extrabold text-white leading-snug">
  <span style={{ background: "rgba(11,14,20,0.38)", padding: "2px 8px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
    {suggestedLabel}
  </span>
</p>
              {suggestedQuestions.map((question) => (
                <button
                  key={question} type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSuggestionClick(question)}
                  className="w-full rounded-xl border border-[#E1E6F2] bg-white px-3.5 py-3 text-left text-sm font-semibold leading-snug text-gray-700 shadow-sm transition-colors active:bg-brand-blue-light"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="fixed left-1/2 -translate-x-1/2 w-full max-w-[430px]"
        style={{ bottom: "calc(60px + env(safe-area-inset-bottom, 0px))", zIndex: 45 }}
      >
        <motion.div
          ref={composerRef}
          className="w-full bg-[#F5F7FF] px-4"
          animate={isFocused
            ? { borderRadius: "20px 20px 0 0", paddingTop: 12, paddingBottom: 20, boxShadow: "0 -8px 32px rgba(11,14,20,.12)" }
            : { borderRadius: "0px", paddingTop: 10, paddingBottom: 10, boxShadow: "0 -6px 20px rgba(11,14,20,.14)" }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        >
          {isFocused && <div style={{ width: 36, height: 4, background: "#E2E8F0", borderRadius: 99, margin: "0 auto 14px" }} />}

          {["poll", "community", "word"].includes(attachment?.type) && (
            <AttachmentPreview attachment={attachment} onRemove={() => setAttachment(null)} onOpen={onOpenAttachment} className="mb-2" />
          )}
          <div className="flex items-center gap-2 bg-brand-blue-light rounded-2xl px-4 py-2 border-[1.5px] border-[#BCC9FF]">
            <div className="relative flex-1">
              {!text && (
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-sm font-semibold leading-5 text-[#97AAF7]">
                  {composerPlaceholder}
                </div>
              )}
              <textarea
                ref={textareaRef} value={text} onChange={handleChange} onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                placeholder="" rows={1}
                className="relative z-10 w-full bg-transparent text-sm font-medium text-gray-800 outline-none resize-none leading-5"
                style={{ minHeight: 20, maxHeight: 100 }}
              />
            </div>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSubmit} disabled={!text.trim() && !attachment}
              className={`shrink-0 w-[34px] h-[34px] rounded-[10px] flex items-center justify-center transition-colors ${
                text.trim() || attachment ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-300"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </motion.div>

        <div style={{ height: effectiveKeyboardHeight, overflow: "hidden", transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
          <img src={keyboardImg} alt="" className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────
let nextId = 100;

export default function HomeScreen({ prefillContent, onClearPrefill }) {
  const { lang, nickname } = useLanguage();
  const t = translations[lang].home;
  const MD = lang === "en" ? mockDataEn : mockDataKo;

  const [threads, setThreads] = useState(() =>
    MD.mockData.threads.map((thread) => ({ ...thread, followUps: [...(thread.followUps || [])] })),
  );
  const [openId, setOpenId] = useState(() => MD.mockData.threads[MD.mockData.threads.length - 1]?.id ?? null);
  const [searching, setSearching] = useState(false);
  const [showQuestionSummary, setShowQuestionSummary] = useState(true);
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [job, setJob] = useState(MD.me.job);
  const [years, setYears] = useState(MD.me.years);
  const [openAttachment, setOpenAttachment] = useState(null);
  const feedRef = useRef(null);
  const isFirstQuestion = useRef(true);

  const visibleThreads = threads;

  const keywordStats = useMemo(() => {
    const counts = threads.reduce((acc, thread) => {
      (thread.tags || []).forEach((tag) => {
        const keyword = tag.replace(/^#/, "");
        acc[keyword] = (acc[keyword] || 0) + 1;
      });
      return acc;
    }, {});
    const topKeywords = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const maxCount = Math.max(...topKeywords.map(([, count]) => count), 1);
    return topKeywords.map(([keyword, count]) => ({
      keyword, count, width: `${Math.max(24, (count / maxCount) * 100)}%`,
    }));
  }, [threads]);

  const topKeywordLabel = keywordStats[0]?.keyword ?? "work life";

  useEffect(() => {
    requestAnimationFrame(() => {
      if (feedRef.current) feedRef.current.scrollTop = 0;
      setShowQuestionSummary(true);
    });
  }, []);

  // ANIMATION PAUSED FOR FIGMA CAPTURE
  // useEffect(() => {
  //   if (!showQuestionSummary) return undefined;
  //   const timer = setInterval(() => setSummaryIndex((index) => (index + 1) % 3), 3600);
  //   return () => clearInterval(timer);
  // }, [showQuestionSummary]);

  const handleToggle = useCallback((id) => setOpenId((prev) => (prev === id ? null : id)), []);

  const handleFeedScroll = useCallback(() => {
    const scrollTop = feedRef.current?.scrollTop ?? 0;
    setShowQuestionSummary(scrollTop <= 2);
  }, []);

  const handleFeedback = useCallback((threadId, type) => {
    setThreads((prev) => prev.map((thread) => (thread.id === threadId ? { ...thread, feedback: type } : thread)));
  }, []);

  const handleFollowUp = useCallback(async (threadId, question) => {
    const tempId = Date.now();
    setThreads((prev) => prev.map((thread) => {
      if (thread.id !== threadId) return thread;
      return { ...thread, followUps: [...thread.followUps, { id: tempId, question, isLoading: true, aiAnswer: null }] };
    }));
    await delay(1000);
    setThreads((prev) => prev.map((thread) => {
      if (thread.id !== threadId) return thread;
      return { ...thread, followUps: thread.followUps.map((fu) => fu.id === tempId ? { ...fu, isLoading: false, aiAnswer: MD.MOCK_FOLLOWUP_ANSWER } : fu) };
    }));
  }, [MD]);

  const handleNewQuestion = useCallback(async (question, attachment = null) => {
    const id = ++nextId;
    setThreads((prev) => [{
      id, title: "...", category: "all", question, attachment, tags: [],
      timestamp: t.justNow, isLoadingTitle: true, isLoadingAnswer: true,
      aiAnswer: null, followUps: [], feedback: null,
    }, ...prev]);
    setOpenId(id);
    setShowQuestionSummary(true);
    requestAnimationFrame(() => { if (feedRef.current) feedRef.current.scrollTop = 0; });

    await delay(800);
    const title = isFirstQuestion.current
      ? MD.MOCK_NEW_TITLES[0]
      : MD.MOCK_NEW_TITLES[Math.floor(Math.random() * MD.MOCK_NEW_TITLES.length)];
    isFirstQuestion.current = false;
    setThreads((prev) => prev.map((thread) => thread.id === id ? { ...thread, title, isLoadingTitle: false } : thread));

    await delay(600);
    setThreads((prev) => prev.map((thread) => thread.id === id ? { ...thread, aiAnswer: MD.MOCK_NEW_ANSWER, isLoadingAnswer: false } : thread));
  }, [MD, t]);

  return (
    <div className="flex flex-col h-full">
      {/* Fixed header */}
      <div className="bg-white z-20 shrink-0">
        <div className="flex items-center justify-between px-5 pt-[14px] pb-[10px]">
            <div className="flex items-center gap-[6px]">
              <h1 className="text-[20px] font-extrabold text-gray-900" style={{ letterSpacing: "-0.03em" }}>unwritten</h1>
              <div className="w-[5px] h-[5px] rounded-full bg-brand-blue" />
            </div>
            <div className="flex items-center gap-1">
              <button style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 30, padding: "0 10px", background: "#EEF2FF", borderRadius: 99, border: "none", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="var(--brand)" />
                  <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="inherit">P</text>
                </svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand)" }}>1,240 P</span>
              </button>
              <button onClick={() => setSearching((s) => !s)} className={`w-[34px] h-[34px] rounded-[10px] flex items-center justify-center transition-colors ${searching ? "text-brand-blue bg-brand-blue-light" : "text-gray-500 bg-white"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
                </svg>
              </button>
            </div>
          </div>

        <AnimatePresence>
              {searching && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="mx-5 mb-2 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5">
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
                    </svg>
                    <input autoFocus placeholder={t.archiveSearch} className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent" />
                    <button onClick={() => setSearching(false)} className="text-sm text-gray-400 font-medium">{t.cancelSearch}</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="overflow-hidden bg-white" initial={false}
              animate={{ height: showQuestionSummary ? "auto" : 0, opacity: showQuestionSummary ? 1 : 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative py-5 bg-[#F3F6FC]">
                <div className="relative z-10 flex items-center gap-2.5 px-5">
                  <span
                    style={{
                      flexShrink: 0, width: 28, height: 28, borderRadius: 99,
                      background: "#4F6EFF",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <img src={faceImg} alt="" style={{ width: "65%", height: "65%", objectFit: "contain" }} />
                  </span>
                  <p className="text-[20px] font-extrabold leading-snug text-gray-900">{t.greeting(nickname)}</p>
                </div>
                <div className="relative z-10 mt-3">
                  <div className="min-w-full px-5">
                    <div className="flex flex-col">
                      <p className="text-[16px] font-semibold leading-snug text-gray-900">
                        {(() => {
                          const label = t.keywordSummaryLabel(topKeywordLabel);
                          const [before, ...after] = label.split(topKeywordLabel);
                          return (
                            <>
                              {before}
                              <span className="font-extrabold underline underline-offset-2">{topKeywordLabel}</span>
                              {after.join(topKeywordLabel)}
                            </>
                          );
                        })()}
                      </p>
                      <div className="mt-4 border-t border-[#E8ECF5]" />
                      <div className="mt-4 mb-3 flex items-center gap-1.5 text-[12px] font-bold text-brand-blue">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 20V10M12 20V4M20 20v-6" />
                        </svg>
                        <span>{t.keywordTop3}</span>
                      </div>
                      <div className="flex-1 space-y-2">
                        {keywordStats.map((item, index) => (
                          <div key={item.keyword} className="grid items-center gap-2.5" style={{ gridTemplateColumns: "116px 1fr" }}>
                            <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-gray-700">
                              <span className="shrink-0 text-gray-400">{index + 1}</span>
                              <span className="truncate">{item.keyword}</span>
                            </span>
                            <div className="h-2.5 mr-3 overflow-hidden rounded-full bg-gray-100">
                              <motion.div
                                className={index === 0 ? "h-full rounded-full bg-brand-blue" : "h-full rounded-full bg-[#DCE3FF]"}
                                initial={false} animate={{ width: item.width }} transition={{ duration: 0.28, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
      </div>

      {/* Thread feed */}
      <div
        ref={feedRef} onScroll={handleFeedScroll}
        className="flex-1 min-h-0 overflow-y-auto px-4 pb-28"
        style={{ background: "#FFFFFF" }}
      >
        <div className="pt-4">
        <AnimatePresence mode="popLayout" initial={false}>
              {visibleThreads.map((thread) => (
                <ThreadItem
                  key={thread.id} thread={thread} isOpen={openId === thread.id}
                  onToggle={() => handleToggle(thread.id)}
                  onFeedback={(type) => handleFeedback(thread.id, type)}
                  onFollowUp={handleFollowUp} job={job} years={years}
                  onJobChange={setJob} onYearsChange={setYears}
                  onOpenAttachment={setOpenAttachment} cardRef={null}
                />
              ))}
            </AnimatePresence>

            {visibleThreads.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-24 text-center px-8">
                <p className="text-3xl mb-3">✏️</p>
                <p className="text-base font-bold text-gray-800 mb-1.5">{t.emptyTitle}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{t.emptyBody}</p>
              </div>
        )}
        </div>
      </div>

      <BottomComposer
        onSubmit={handleNewQuestion}
        prefillContent={prefillContent}
        onClearPrefill={onClearPrefill}
        onOpenAttachment={setOpenAttachment}
        composerPlaceholder={t.composerPlaceholder}
        suggestedQuestions={t.suggestedQuestions}
        suggestedLabel={t.suggestedLabel}
      />
      <AttachmentModal attachment={openAttachment} onClose={() => setOpenAttachment(null)} />
    </div>
  );
}
