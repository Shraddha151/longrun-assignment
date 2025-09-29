// src/App.jsx
import { useMemo, useState } from "react";
import Post from "./components/Post.jsx";
import Reply from "./components/Reply.jsx";

const LS_KEY = "longrun.post.v1";

/* ---------- helpers ---------- */
function mkReply(text) {
  return {
    id: crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    author: { name: "Name Surname", avatar: "" },
    content: text,
    createdAt: new Date().toISOString(),
    liked: false,
    likes: Math.floor(Math.random() * 5) + 1,
  };
}

/** Demo seed */
const seedPost = {
  id: "post-1",
  author: { name: "Name Surname", avatar: "" },
  content:
    "Lorem ipsum dolor sit amet. Ea labore officia sed eligendi adipisci aut voluptate maxime ut tempore omnis aut molestias quam.",
  createdAt: new Date().toISOString(),
  liked: false,
  likes: 12,
  replies: [
    mkReply("Great write-up! Thanks for sharing."),
    mkReply("Totally agree with the point about subtle animations."),
    mkReply("Could you also add keyboard support?"),
    mkReply("Looks neat. Dark UI feels premium."),
  ],
  settings: { sort: "newest" },
};

/** Read once so refresh keeps your state */
function loadInitialState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return seedPost;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.replies)) return seedPost;
    return parsed;
  } catch {
    return seedPost;
  }
}

export default function App() {
  const [post, setPost] = useState(loadInitialState);
  const [busy, setBusy] = useState(false);
  const [comment, setComment] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);

  // one path to persist (used by ALL mutations)
  const persist = (next) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 600);
      // eslint-disable-next-line no-console
      console.log("[persist]", next);
    } catch (e) {
      console.warn("Failed to persist", e);
    }
  };

  const setPostAndPersist = (updater) => {
    setPost((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      persist(next);
      return next;
    });
  };

  // sort (Newest vs Top; tie -> newer first)
  const sortedReplies = useMemo(() => {
    const arr = [...post.replies];
    if (post.settings.sort === "newest") {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      arr.sort((a, b) => (b.likes - a.likes) || (new Date(b.createdAt) - new Date(a.createdAt)));
    }
    return arr;
  }, [post.replies, post.settings.sort]);

  // mutations (ALL go through setPostAndPersist)
  const togglePostLike = () =>
    setPostAndPersist((p) => ({ ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }));

  const toggleReplyLike = (id) =>
    setPostAndPersist((p) => ({
      ...p,
      replies: p.replies.map((r) =>
        r.id === id ? { ...r, liked: !r.liked, likes: r.likes + (r.liked ? -1 : 1) } : r
      ),
    }));

  const submitComment = async (e) => {
    e.preventDefault();
    const text = comment.trim();
    if (!text) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 200)); // mock loading within 150–250ms
    setPostAndPersist((p) => ({ ...p, replies: [mkReply(text), ...p.replies] }));
    setComment("");
    setBusy(false);
  };

  const viewData = () => {
    const payload = {
      post: { id: post.id, author: post.author, content: post.content, createdAt: post.createdAt },
      replies: post.replies,
      likes: {
        postLikes: post.likes,
        totalReplyLikes: post.replies.reduce((a, x) => a + x.likes, 0),
      },
      commentsCount: post.replies.length,
      settings: post.settings,
    };
    // eslint-disable-next-line no-console
    console.log("POST_STATE", payload);
  };

  const resetDemo = () => setPostAndPersist(seedPost);

  const setSort = (sort) =>
    setPostAndPersist((p) => ({ ...p, settings: { ...p.settings, sort } }));

  return (
    <div className="min-h-screen text-slate-200 antialiased">
      {/* background */}
      <div className="fixed inset-0 -z-10 bg-[#0B1220]" />
      <div
        className="fixed inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -200px,#132033 0%,transparent 60%),radial-gradient(1000px 600px at 40% 120%,#0F1A2A 0%,transparent 60%),#0A0F1A",
        }}
      />

      {/* tiny "Saved" flash */}
      {savedFlash && (
        <div className="fixed right-4 top-4 z-50 rounded-md border border-emerald-600/40 bg-emerald-900/40 px-2 py-1 text-xs text-emerald-200">
          Saved
        </div>
      )}

      <main className="mx-auto w-full max-w-[760px] px-4 py-10">
        {/* Post card */}
        <Post
          post={post}
          onToggleLike={togglePostLike}
          onSubmitComment={submitComment}
          comment={comment}
          setComment={setComment}
          busy={busy}
          onViewData={viewData}
          onReset={resetDemo}
        />

        {/* Replies header + sort */}
        <div className="mt-8 flex items-center justify-between px-1">
          <div className="text-[11px] uppercase tracking-wide text-slate-400">Replies</div>
          <div className="flex items-center gap-6 text-[12px]">
            <button
              onClick={() => setSort("newest")}
              className={
                "rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 " +
                (post.settings.sort === "newest"
                  ? "bg-slate-800/60 text-slate-200 border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40")
              }
            >
              Newest
            </button>
            <button
              onClick={() => setSort("top")}
              className={
                "rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 " +
                (post.settings.sort === "top"
                  ? "bg-slate-800/60 text-slate-200 border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40")
              }
            >
              Top
            </button>
          </div>
        </div>

        {/* Replies */}
        <div className="mt-3 space-y-3">
          {sortedReplies.map((r) => (
            <Reply key={r.id} reply={r} onToggleLike={() => toggleReplyLike(r.id)} />
          ))}
        </div>
      </main>
    </div>
  );
}
