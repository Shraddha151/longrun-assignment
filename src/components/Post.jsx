import LikeButton from "./LikeButton.jsx";
import CommentInput from "./CommentInput.jsx";

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
    <Card className="p-6">
      <div className="flex items-start gap-3">
        <Avatar />
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-slate-100">{post.author.name}</div>
          <div className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleString()}</div>
        </div>

        <div className="flex gap-2">
          <IconButton onClick={onViewData} title="View Data" ariaLabel="View Data">
            <span className="text-[12px]">🧭</span>
          </IconButton>
          <IconButton onClick={onReset} title="Reset Demo" ariaLabel="Reset Demo">
            <span className="text-[12px]">↺</span>
          </IconButton>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-6 text-slate-300">{post.content}</p>

      {/* media placeholder */}
      <div className="mt-4 h-[190px] w-full rounded-xl border border-slate-700/50 bg-[linear-gradient(45deg,rgba(255,255,255,0.07)_25%,transparent_25%),linear-gradient(-45deg,rgba(255,255,255,0.07)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(255,255,255,0.07)_75%),linear-gradient(-45deg,transparent_75%,rgba(255,255,255,0.07)_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0]" />

      {/* actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LikeButton pressed={post.liked} count={post.likes} onClick={onToggleLike} />
          <CommentChip count={post.replies.length} />
        </div>
        <div className="text-[11px] text-slate-400">{post.replies.length} Replies</div>
      </div>

      {/* comment box */}
      <CommentInput value={comment} onChange={setComment} onSubmit={onSubmitComment} busy={busy} />
    </Card>
  );
}

/* local primitives */
function Card({ className = "", children }) {
  return (
    <section
      className={
        "rounded-2xl border border-[#1D2A3B] bg-[#0E1624]/75 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur " +
        className
      }
    >
      {children}
    </section>
  );
}
function Avatar() {
  return (
    <div
      aria-hidden
      className="h-9 w-9 shrink-0 rounded-full border border-slate-700/70 bg-gradient-to-br from-slate-600/40 to-slate-800/40"
    />
  );
}
function IconButton({ children, onClick, ariaLabel, title }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      className="grid h-7 w-7 place-items-center rounded-lg border border-slate-700/70 bg-slate-800/40 text-slate-300 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
    >
      {children}
    </button>
  );
}
function CommentChip({ count }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-transparent px-3 h-9 text-[13px] text-slate-300">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-8 8H9l-4 3v-3a8 8 0 1 1 16-8Z" strokeLinejoin="round" />
      </svg>
      <span className="tabular-nums">{count}</span>
    </div>
  );
}
