import React from "react";

/* ---------- icons ---------- */
function HeartIcon({ filled = false, className = "" }) {
  // Rounded, balanced heart (outline + filled)
  // Outline is visible when not liked; filled uses currentColor.
  return filled ? (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      className={className}
      aria-hidden="true"
    >
      {/* Heroicons-style filled heart */}
      <path
        fill="currentColor"
        d="M11.645 20.91a.75.75 0 0 0 .71 0c1.79-1.002 3.293-2.124 4.56-3.346 2.54-2.41 4.085-4.997 4.085-7.564 0-2.79-2.137-5-4.77-5-1.38 0-2.66.62-3.585 1.613A4.98 4.98 0 0 0 9.06 5c-2.633 0-4.77 2.21-4.77 5 0 2.567 1.546 5.154 4.085 7.564 1.267 1.222 2.77 2.344 4.57 3.346z"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      className={className}
      aria-hidden="true"
    >
      {/* Soft outline when not liked */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 9.9c0 5-5.5 8.5-8.5 10.2-3-1.7-8.5-5.2-8.5-10.2C3.5 7.2 5.6 5 8.2 5c1.5 0 2.9.7 3.8 1.8A5 5 0 0 1 15.8 5c2.6 0 4.7 2.2 4.7 4.9Z"
      />
    </svg>
  );
}

function CommentIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className={className} aria-hidden="true">
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

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm3.6 6.4-1.8 4.8-4.8 1.8 1.8-4.8 4.8-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M21 12a9 9 0 1 1-3.07-6.74M21 4v5h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- component ---------- */
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
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/10" aria-hidden="true" />
          <div>
            <div className="text-sm font-medium">{post.author?.name || "Name Surname"}</div>
            <div className="text-xs text-white/55">
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tools (icon only) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onViewData}
            className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 hover:bg-white/10"
            title="View Data"
            aria-label="View Data"
          >
            <CompassIcon />
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 hover:bg-white/10"
            title="Reset Demo"
            aria-label="Reset Demo"
          >
            <ResetIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="mt-4 text-sm leading-6 text-white/85">{post.content}</p>

      {/* Media placeholder */}
      <div
        className="mt-4 h-48 w-full rounded-xl border border-white/10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_100%)] bg-[length:24px_24px]"
        aria-hidden="true"
      />

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleLike}
          aria-pressed={post.liked}
          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 transition
            ${post.liked
              ? "border-rose-300/40 bg-rose-300/10 text-rose-200"
              : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            } ${post.liked ? "scale-[1.02]" : ""} hover:scale-[1.02] active:scale-95 duration-150`}
        >
          <HeartIcon filled={post.liked} />
          <span className="text-sm">{post.likes}</span>
        </button>

        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
          <CommentIcon />
          <span className="text-sm">{post.replies.length}</span>
        </div>
      </div>

      {/* Comment box */}
      <form onSubmit={onSubmitComment} className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-white/25"
        />
        <button
          type="submit"
          disabled={busy || !comment.trim()}
          className="rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-black/90 disabled:cursor-not-allowed disabled:bg-white/40"
        >
          {busy ? "Posting…" : "Comment"}
        </button>
      </form>
    </div>
  );
}
