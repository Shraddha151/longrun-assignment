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
content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, leo non luctus gravida, nibh elit malesuada nunc, non venenatis justo mi eu augue. Vivamus sodales, nisl sit amet dapibus hendrerit, urna mi tincidunt metus, et hendrerit neque lacus at mi. Sed imperdiet, tortor non ultrices convallis, neque dui molestie velit, vel tristique urna elit nec orci. Cras a quam ut nulla luctus consequat. Maecenas finibus, nunc id lobortis tempor, dui velit posuere est, id feugiat massa tellus non arcu.`,
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

  // persist through one path
  const persist = (next) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      if (import.meta.env.DEV) console.log("[persist]", next);
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

  // mutations
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
    await new Promise((r) => setTimeout(r, 200)); // mock 150–250ms
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
    console.log("POST_STATE", payload);
  };

  const resetDemo = () => setPostAndPersist(seedPost);
  const setSort = (sort) => setPostAndPersist((p) => ({ ...p, settings: { ...p.settings, sort } }));

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

      <main className="mx-auto w-full max-w-[760px] px-4 py-10">
        {/* ONE outer card that contains post + replies; now clips children */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          {/* Post section */}
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

          {/* Replies header */}
          <div className="mt-6 mb-2 flex items-center justify-between px-1">
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

          {/* Replies list fully inside the card */}
          <div className="space-y-3">
            {sortedReplies.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                Be the first to reply.
              </div>
            ) : (
              sortedReplies.map((r) => (
                <Reply key={r.id} reply={r} onToggleLike={() => toggleReplyLike(r.id)} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
