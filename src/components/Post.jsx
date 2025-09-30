// src/components/Post.jsx
import React from "react";

/* ===== shared icon sizing for the larger pill look ===== */
const ICON_SIZE = 18;
const STROKE_W = 1.7;

/* ===== Icons (normalized) ===== */
function HeartIcon({ filled = false, size = ICON_SIZE }) {
  return filled ? (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.645 20.91a.75.75 0 0 0 .71 0c1.79-1.002 3.293-2.124 4.56-3.346 2.54-2.41 4.085-4.997 4.085-7.564 0-2.79-2.137-5-4.77-5-1.38 0-2.66.62-3.585 1.613A4.98 4.98 0 0 0 9.06 5c-2.633 0-4.77 2.21-4.77 5 0 2.567 1.546 5.154 4.085 7.564 1.267 1.222 2.77 2.344 4.57 3.346z"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_W}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 9.9c0 5-5.5 8.5-8.5 10.2-3-1.7-8.5-5.2-8.5-10.2C3.5 7.2 5.6 5 8.2 5c1.5 0 2.9.7 3.8 1.8A5 5 0 0 1 15.8 5c2.6 0 4.7 2.2 4.7 4.9Z"
      />
    </svg>
  );
}

function ChatIcon({ size = ICON_SIZE }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompassIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_W}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.8 9.2-2 4.6-4.6 2 2-4.6 4.6-2ZM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
      />
    </svg>
  );
}

function ResetIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_W}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7V4m0 0h-3m3 0-4.5 4.5M20 13a7 7 0 1 1-4.95-6.72"
      />
    </svg>
  );
}

/* ===== Post ===== */
export default function Post({
  post,
  onToggleLike,
  onSubmitComment,
  comment,
  setComment,
  busy,
  onViewData,
  onReset,
}) {
  const dateStr = new Date(post.createdAt).toLocaleString();

  // Larger, softer pill like your 2nd screenshot
  const pillBase =
    "inline-flex items-center gap-2 rounded-2xl border border-white/14 bg-white/[0.055] px-3.5 py-2 text-[13px] text-white/90 hover:bg-white/[0.075]";

  return (
    <article aria-label="Main post">
      {/* Header */}
      <header className="mb-3 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-9 w-9 rounded-full bg-white/10" aria-hidden="true" />
          <div>
            <div className="text-[14px] font-medium leading-5">Name Surname</div>
            <div className="text-[11px] leading-5 text-white/45">{dateStr}</div>
          </div>
        </div>

        <div className="flex gap-2">
          {/* ONLY CHANGE: fixed 44×44 buttons for consistent sizing */}
          <button
            type="button"
            onClick={onViewData}
            title="View Data"
            className="h-11 w-11 grid place-items-center rounded-xl border border-white/12 bg-white/6 text-white/80 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <CompassIcon />
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Reset Demo"
            className="h-11 w-11 grid place-items-center rounded-xl border border-white/12 bg-white/6 text-white/80 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <ResetIcon />
          </button>
        </div>
      </header>

      {/* Body — allow multi-line text */}
      <p className="mb-3 whitespace-pre-line break-words text-[14px] leading-6 text-white/85">
        {post.content}
      </p>

      <div
        className="mb-4 h-56 w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 [background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,.06)_0_16px,transparent_16px_32px)]"
        aria-hidden="true"
      />

      {/* Action pills */}
      <div className="mb-3 flex items-center gap-3">
        {/* Like */}
        <button
          type="button"
          onClick={onToggleLike}
          aria-pressed={post.liked}
          className={
            post.liked
              ? "inline-flex items-center gap-2 rounded-2xl border border-rose-300/45 bg-rose-300/12 px-3.5 py-2 text-[13px] text-rose-200 hover:bg-rose-300/18"
              : pillBase
          }
        >
          <HeartIcon size={ICON_SIZE} filled={post.liked} />
          <span>{post.likes}</span>
        </button>

        {/* Comments (status only) */}
        <div role="status" aria-label={`${post.replies.length} replies`} className={pillBase}>
          <ChatIcon size={ICON_SIZE} />
          <span>{post.replies.length}</span>
        </div>
      </div>

      {/* Comment input */}
      <form onSubmit={onSubmitComment} className="mb-2">
        <div className="flex items-center gap-2 rounded-2xl border border-white/25 bg-white/[0.025] p-1 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus-within:border-white/35">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full bg-transparent text-[14px] leading-6 text-white/90 placeholder:text-white/35 outline-none"
            disabled={busy}
            aria-label="Write a comment"
          />
          <button
            type="submit"
            disabled={busy || !comment.trim()}
            className="rounded-xl border border-white/15 bg-[#32415F] px-4 py-2 text-[13px] font-semibold text-white/92 hover:bg-[#364769] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 disabled:opacity-55"
          >
            {busy ? "Posting…" : "Comment"}
          </button>
        </div>
      </form>
    </article>
  );
}
