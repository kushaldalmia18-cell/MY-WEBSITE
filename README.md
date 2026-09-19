# IFoA Prep — starter site

A real, deployable Next.js project: a question bank, notes, and an AI tutor
backed by a server-side Anthropic API call (your key never reaches the browser).

## 1. Run it locally

```bash
npm install
cp .env.example .env.local
# edit .env.local and paste your real Anthropic API key
npm run dev
```

Open http://localhost:3000.

Get an API key at https://console.anthropic.com (Settings -> API Keys).
Note: API usage is billed separately from a claude.ai subscription — check
current pricing at https://www.anthropic.com/pricing before launching to
real users, since every "Ask AI" message costs you money.

## 2. Put it on the internet (Vercel — free to start)

1. Push this folder to a GitHub repo (create one at github.com, then:
   `git init && git add . && git commit -m "init" && git remote add origin <your-repo-url> && git push -u origin main`)
2. Go to https://vercel.com, sign up with GitHub, click "Add New Project",
   import the repo.
3. In the project's Environment Variables settings, add:
   `ANTHROPIC_API_KEY = <your real key>`
4. Click Deploy. You'll get a live URL like `ifoa-prep.vercel.app` within a minute.

## 3. Buy a domain and connect it

1. Buy a domain at Namecheap, Google Domains, or similar (~£8-12/year for a .com).
2. In Vercel: Project Settings -> Domains -> add your domain.
3. Vercel gives you DNS records to add at your domain registrar (usually one
   A record and one CNAME). Add them there. Takes a few minutes to a few
   hours to propagate.
4. Your site is now live at your own domain with HTTPS handled automatically.

## 4. Get found on Google

1. Go to https://search.google.com/search-console, add your domain, verify
   ownership (Vercel/your registrar will give you a verification method).
2. Submit your homepage URL for indexing.
3. Add real written content over time (a blog post on "how to pass CM1",
   subject guides, etc.) — this is what actually moves search ranking, far
   more than technical SEO tweaks.
4. Keep `pages/_document.js`'s meta description accurate and specific — it's
   what shows up under your listing in Google results.

## 5. What's deliberately NOT built yet

- **User accounts / cross-device progress** — right now there's no login;
  add this only once you have real users asking for it. Supabase (free
  tier) is the easiest route: auth + a Postgres database in one.
- **Payments** — Stripe Checkout is the standard route for a subscription;
  wire it up once you know your API costs per active user.
- **Rate limiting on `/api/chat`** — right now anyone hitting your site
  could run up your Anthropic bill. Before real traffic, add a per-IP or
  per-user daily message cap (Vercel KV or Upstash Redis are simple options
  for this).
- **Full question bank / notes / mock exam / jobs** — this starter only
  ports Study, Ask AI and Notes from the prototype, to keep the codebase
  small and easy to understand. Once this is running for real, the Mock
  Exam and Jobs code from the earlier artifact can be added the same way.

## Project structure

```
pages/
  index.js       <- homepage (Study / Ask AI / Notes tabs)
  api/chat.js    <- server-side AI endpoint (keeps your API key secret)
  _app.js
  _document.js   <- SEO meta tags
data/
  questions.js   <- question bank + notes content, edit this to grow the bank
styles/
  globals.css
```
