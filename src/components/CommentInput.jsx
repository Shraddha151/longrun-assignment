export default function CommentInput({ value, onChange, onSubmit, busy }) {
  return (
    <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a comment..."
        className="h-11 flex-1 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 text-[13px] text-slate-200 placeholder:text-slate-500 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60"
      />
      <button
        type="submit"
        disabled={busy || !value.trim()}
        className="h-11 rounded-xl bg-teal-600 px-4 text-[13px] font-medium text-white enabled:hover:bg-teal-500 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
      >
        {busy ? "Posting…" : "Comment"}
      </button>
    </form>
  );
}
