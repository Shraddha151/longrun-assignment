# React Figma Task – LongRun Assignment

A small web app (built with **React + Vite + Tailwind CSS**) that recreates a Figma design of a single post with comments.  
It supports adding comments, liking the post and replies, sorting replies (Newest/Top), and viewing the current data.  
All changes are saved in the browser so they **survive refresh**.

---

## 🖥️ What you see on the page

- **Main Post Card**
  - **Author & time** (top-left)
  - **“View Data” (◎)** and **“Reset Demo” (↻)** (top-right)
  - **Post text** and a **gray image placeholder**
  - **Action pills** under the post:
    - **Like** (heart + number)
    - **Replies** (bubble + count)
  - **Comment box** (“Write a comment…”, **Comment** button)

- **Replies Section**
  - Title “Replies” with **sorting buttons**: **Newest** / **Top**
  - A list of reply cards. Each reply has:
    - Author & time
    - Reply text
    - Its own **Like** pill (with number)

---

## ◎ How everything works

### 1) Add a comment
1. Type in **“Write a comment…”**.
2. Click **Comment**.
3. A tiny **loading moment (~200ms)** appears, then your comment shows **at the top** of the replies.
4. The **Replies** number increases.
5. Your comment is **saved** (it remains after refresh).

### 2) Like the main post
- Click the **Like** pill (heart).  
- The heart animates slightly and the number **goes up/down**.  
- This like is **saved** and **persists after a refresh**.

### 3) Like a reply
- Each reply has its own **Like** pill.  
- Click it to toggle like for that specific reply.  
- The number changes and the state is **saved**.

### 4) Sort replies
- **Newest:** most recent first (`createdAt` desc).  
- **Top:** most liked first (`likes` desc). **Tie-break:** newer first.  
- Your choice is **remembered**.

### 5) View Data (◎)
- Click **◎ View Data** in the post header.  
- The **full state** is printed in your browser console (DevTools → Console):
  - `post` (id, author, content, createdAt)
  - `replies` (array of all comments)
  - `likes` (post total + sum across replies)
  - `commentsCount` (same as replies length)
  - `settings` (current sort mode)

### 6) Reset Demo (↻)
- Click **↻ Reset Demo** to restore the **original example data**.  
- This overwrites saved changes (likes/comments) with the starting state.

---

## 💾 Where the changes are saved

All likes, comments, and the sorting choice are stored in your browser under  
**Local Storage key:** `longrun.post.v1`.

- **Refresh-safe:** your changes reappear after you reload the page.
- Note: Local Storage is **per site address/port**. Different ports keep separate data.

---

## 🚀 Run the project locally

> Requires **Node.js 18+** and **npm 9+**.

```bash
### Option A — with npm scripts
npm install
npm run dev        # starts the Vite dev server

### Option B — without npm scripts (use Vite directly)
npm install
npx vite
