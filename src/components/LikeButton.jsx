export default function LikeButton({ pressed, count, onClick, small = false }) {
  const px = small ? "px-2.5" : "px-3";
  const h = small ? "h-8" : "h-9";
  const text = small ? "text-[12px]" : "text-[13px]";

  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label="Like"
      title="Like"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl border ${px} ${h} ${text} transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:scale-[0.985] ` +
        (pressed
          ? "border-teal-500/60 bg-teal-900/20 text-teal-200"
          : "border-slate-700/60 bg-transparent text-slate-300 hover:bg-slate-900/30")}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={pressed ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
        style={{ transition: "transform 200ms", transform: pressed ? "scale(1.12)" : "scale(1.0)" }}
      >
        <path
          d="M12 20.5c-.3 0-6.3-3.9-8.6-6.7C1.1 11.3 1.5 8.1 3.7 6.4 5.6 4.9 8.2 5.4 9.8 7c.2.2.5.5.7.8.2-.3.5-.6.7-.8 1.6-1.6 4.2-2.1 6.1-.6 2.2 1.7 2.6 4.9.3 7.4-2.3 2.8-8.3 6.7-8.6 6.7Z"
          strokeLinejoin="round"
        />
      </svg>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}
