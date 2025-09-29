import React from "react";

/* ---------- improved heart icon ---------- */
function HeartIcon({ filled = false, className = "" }) {
  return filled ? (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.645 20.91a.75.75 0 0 0 .71 0c1.79-1.002 3.293-2.124 4.56-3.346 2.54-2.41 4.085-4.997 4.085-7.564 0-2.79-2.137-5-4.77-5-1.38 0-2.66.62-3.585 1.613A4.98 4.98 0 0 0 9.06 5c-2.633 0-4.77 2.21-4.77 5 0 2.567 1.546 5.154 4.085 7.564 1.267 1.222 2.77 2.344 4.57 3.346z"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden="true">
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

/* ---------- component ---------- */
export default function Reply({ reply, onToggleLike }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-white/10" aria-hidden="true" />
          <div>
            <div className="text-sm font-medium">{reply.author?.name || "Name Surname"}</div>
            <div className="text-xs text-white/55">
              {new Date(reply.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleLike}
          aria-pressed={reply.liked}
          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 min-h-10 text-xs motion-safe:transition
            ${reply.liked
              ? "border-rose-300/40 bg-rose-300/10 text-rose-200"
              : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            } motion-safe:hover:scale-[1.02] motion-safe:active:scale-95 motion-reduce:transform-none`}
        >
          <HeartIcon filled={reply.liked} />
          <span>{reply.likes}</span>
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/85">{reply.content}</p>
    </div>
  );
}
