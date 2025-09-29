import LikeButton from "./LikeButton.jsx";

export default function Reply({ reply, onToggleLike }) {
  return (
    <section className="rounded-2xl border border-[#1D2A3B] bg-[#0E1624]/75 px-5 py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="flex items-start gap-3">
        <Avatar />
        <div className="flex-1">
          <div className="text-[14px] font-semibold text-slate-100">{reply.author.name}</div>
          <div className="text-[11px] text-slate-400">{new Date(reply.createdAt).toLocaleString()}</div>
          <p className="mt-2 text-[13px] text-slate-300">{reply.content}</p>

          <div className="mt-3">
            <LikeButton small pressed={reply.liked} count={reply.likes} onClick={onToggleLike} />
          </div>
        </div>
      </div>
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
