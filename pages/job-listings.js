import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { decodeEntitiesFully, stripHtml, extractTag, extractTagAll, extractItems, fetchFeedXml } from '../lib/feedUtils';

// ---------------------------------------------------------------------------
// Live job listings: fetched server-side at build time and re-fetched
// automatically by Next.js ISR every REVALIDATE_SECONDS. Source is a public,
// no-API-key RSS feed from a dedicated UK actuarial jobs board. If it's ever
// down or empty, we fall back to a small set of evergreen search links (not
// specific postings, since a specific vacancy can go stale/404 — a search
// results page never does).
// ---------------------------------------------------------------------------
const REVALIDATE_SECONDS = 60 * 60 * 24; // refresh roughly once a day
const MAX_JOBS = 40;

const JOBS_FEED_URL = 'http://www.actuarialpostjobs.co.uk/rss_jobs/actuarialpostjobs.xml';
const JOBS_USER_AGENT = 'ActuarialGuideBot/1.0 (+https://actuarialguide.com)';

const FALLBACK_JOBS = [
  { tag: 'Browse', categories: ['Browse'], href: 'http://www.actuarialpostjobs.co.uk/', title: 'Search actuarial jobs on Actuarial Post Jobs', body: 'The UK actuarial job board this page normally pulls live listings from — browse directly if the live feed is temporarily unavailable.', date: null },
  { tag: 'Browse', categories: ['Browse'], href: 'https://www.theactuaryjobs.com/jobs/', title: 'Search actuarial jobs on TheActuaryJobs.com', body: 'A dedicated UK and international actuarial job board covering insurance, pensions, consulting and reinsurance roles.', date: null },
  { tag: 'Browse', categories: ['Browse'], href: 'https://uk.indeed.com/jobs?q=actuarial', title: 'Search "actuarial" on Indeed UK', body: 'General job search filtered to actuarial roles across all sectors and experience levels.', date: null },
  { tag: 'Browse', categories: ['Browse'], href: 'https://www.linkedin.com/jobs/search/?keywords=actuarial', title: 'Search "actuarial" on LinkedIn Jobs', body: 'LinkedIn’s job search filtered to actuarial roles, useful for seeing who in your network is connected to the employer.', date: null }
];

// Shown as a supplement whenever the "Entry level" filter has zero matches
// (the live feed skews toward qualified/experienced hires some days) — real
// search URLs filtered toward graduate schemes specifically, not a vague
// "try again later".
const GRAD_SEARCH_LINKS = [
  { title: 'Search "actuarial graduate scheme" on Indeed UK', href: 'https://uk.indeed.com/jobs?q=actuarial+graduate+scheme' },
  { title: 'Search graduate roles on TheActuaryJobs.com', href: 'https://www.theactuaryjobs.com/jobs/graduate/' },
  { title: 'Search "actuarial graduate" on LinkedIn Jobs', href: 'https://www.linkedin.com/jobs/search/?keywords=actuarial%20graduate' }
];

// No structured "experience level" field exists in the feed, so this is a
// best-effort keyword read of the title + description — not a guarantee.
// A senior-role signal always wins over a weaker entry-level one (e.g. a
// posting that mentions "graduate scheme" it ran years ago inside a senior
// manager's bio would still get excluded).
const ENTRY_LEVEL_KEYWORDS = [
  'graduate', 'trainee', 'entry level', 'entry-level', 'junior',
  'intern', 'internship', 'placement', 'school leaver', 'apprentice',
  'apprenticeship', 'part qualified', 'part-qualified', 'actuarial analyst',
  'student actuary', 'undergraduate'
];
const SENIOR_EXCLUDE_KEYWORDS = [
  'senior', 'head of', 'director', 'chief', 'principal', 'lead actuary',
  'manager', 'managing', 'partner', 'vice president', 'president',
  'committee member', 'cro,', 'cfo,', 'cro -', 'cfo -'
];

function isEntryLevel(job) {
  const text = (job.title + ' ' + job.body).toLowerCase();
  if (SENIOR_EXCLUDE_KEYWORDS.some((kw) => text.includes(kw))) return false;
  return ENTRY_LEVEL_KEYWORDS.some((kw) => text.includes(kw));
}

function parseJobBlock(block) {
  const title = decodeEntitiesFully(extractTag(block, 'title'));
  const link = extractTag(block, 'link');
  const pubDateRaw = extractTag(block, 'pubDate');
  const descRaw = extractTag(block, 'description');
  const categories = extractTagAll(block, 'category').map((c) => decodeEntitiesFully(c)).filter(Boolean);
  let body = decodeEntitiesFully(stripHtml(decodeEntitiesFully(descRaw)));
  if (body.length > 220) body = body.slice(0, 217).replace(/\s+\S*$/, '') + '…';
  const date = pubDateRaw ? new Date(pubDateRaw) : null;
  return {
    title,
    href: link,
    categories,
    tag: categories[0] || 'Actuarial',
    body,
    date: date && !isNaN(date.getTime()) ? date.toISOString() : null
  };
}

async function getLiveJobs() {
  const xml = await fetchFeedXml(JOBS_FEED_URL, { userAgent: JOBS_USER_AGENT });
  if (!xml) return [];
  let jobs = extractItems(xml)
    .map(parseJobBlock)
    .filter((job) => job.title && job.href);
  jobs.sort((a, b) => (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0));
  const seen = new Set();
  jobs = jobs.filter((job) => {
    if (seen.has(job.href)) return false;
    seen.add(job.href);
    return true;
  });
  return jobs.slice(0, MAX_JOBS);
}

export async function getStaticProps() {
  let jobs = [];
  try {
    jobs = await getLiveJobs();
  } catch (e) {
    jobs = [];
  }
  const isLive = jobs && jobs.length >= 3;
  if (!isLive) jobs = FALLBACK_JOBS;
  return {
    props: { jobs, isLive },
    revalidate: REVALIDATE_SECONDS
  };
}

export default function JobListings({ jobs, isLive }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [levelFilter, setLevelFilter] = useState('entry'); // 'entry' | 'all'

  const rawJobList = jobs && jobs.length > 0 ? jobs : FALLBACK_JOBS;

  // Browse-link fallback cards (both the total-outage FALLBACK_JOBS and the
  // GRAD_SEARCH_LINKS shown below) aren't real postings, so the entry-level
  // keyword read doesn't apply to them — treat them as always matching.
  const jobList = useMemo(
    () => rawJobList.map((job) => ({ ...job, _entry: job.tag === 'Browse' ? true : isEntryLevel(job) })),
    [rawJobList]
  );

  const categories = useMemo(() => {
    const set = new Set();
    jobList.forEach((job) => (job.categories || [job.tag]).forEach((c) => set.add(c)));
    return ['All', ...Array.from(set).sort()];
  }, [jobList]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobList.filter((job) => {
      const matchesQuery = !q || job.title.toLowerCase().includes(q) || job.body.toLowerCase().includes(q);
      const matchesCategory = activeCategory === 'All' || (job.categories || [job.tag]).includes(activeCategory);
      const matchesLevel = levelFilter === 'all' || job._entry;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [jobList, query, activeCategory, levelFilter]);

  const noEntryLevelMatches = isLive && levelFilter === 'entry' && filtered.length === 0;

  return (
    <>
      <Head>
        <title>Job Listings — Actuarial Guide</title>
        <meta name="description" content="Live actuarial graduate and part-qualified job listings, pulled automatically from UK actuarial job boards." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
      </Head>

      <div className="ag-topbar">
        <Link href="/" className="ag-logo">Actuarial<span>Guide</span></Link>
        <Link href="/" className="ag-back-link">← Back home</Link>
      </div>

      <div className="ag-jobspage">
        <div className="jl-hero">
          <h1>Actuarial roles, <span className="jl-hero-accent">in one place</span>.</h1>
          <p className="ag-sub">
            {isLive
              ? 'Live listings pulled automatically from UK actuarial job boards, refreshed roughly once a day. Showing entry-level and graduate roles by default.'
              : 'Live listings are temporarily unavailable, so here are direct links to search actuarial roles yourself.'}
          </p>
        </div>

        <div className="jl-controls">
          <input
            className="jl-search"
            type="text"
            placeholder="Search by title or keyword…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="jl-levelbar">
            <button
              className={'jl-levelbtn' + (levelFilter === 'entry' ? ' active' : '')}
              onClick={() => setLevelFilter('entry')}
            >
              Entry level / graduate
            </button>
            <button
              className={'jl-levelbtn' + (levelFilter === 'all' ? ' active' : '')}
              onClick={() => setLevelFilter('all')}
            >
              All levels
            </button>
          </div>
          <div className="jl-catbar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={'jl-catbtn' + (activeCategory === cat ? ' active' : '')}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="jl-count">{filtered.length} role{filtered.length === 1 ? '' : 's'}{query || activeCategory !== 'All' || levelFilter === 'entry' ? ' matching your filters' : ''}</p>

        <div className="jl-grid">
          {filtered.map((job) => (
            <a className="jl-card" href={job.href} target="_blank" rel="noopener noreferrer" key={job.href}>
              <div className="jl-card-tags">
                {(job.categories && job.categories.length > 0 ? job.categories : [job.tag]).map((c) => (
                  <span className="jl-tag" key={c}>{c}</span>
                ))}
              </div>
              {job.date && (
                <span className="jl-date">
                  Posted {new Date(job.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              )}
              <h3>{job.title}</h3>
              <p>{job.body}</p>
              <span className="jl-view">View &amp; apply →</span>
            </a>
          ))}
          {filtered.length === 0 && !noEntryLevelMatches && (
            <div className="jl-empty">No roles match that search. Try a different keyword or category.</div>
          )}
        </div>

        {noEntryLevelMatches && (
          <div className="jl-gradfallback">
            <p className="jl-gradfallback-title">No entry-level roles in the live feed right now — it skews toward qualified hires some days.</p>
            <div className="jl-grid">
              {GRAD_SEARCH_LINKS.map((link) => (
                <a className="jl-card jl-card-search" href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
                  <span className="jl-tag">Browse</span>
                  <h3>{link.title}</h3>
                  <span className="jl-view">Search →</span>
                </a>
              ))}
            </div>
            <button className="jl-levelbtn" style={{ marginTop: 16 }} onClick={() => setLevelFilter('all')}>
              Or see all {jobList.length} live roles →
            </button>
          </div>
        )}

        <p className="jl-note">
          {isLive
            ? '"Entry level / graduate" is a best-effort keyword match on each posting’s title and description (graduate, trainee, junior, intern, part-qualified, etc.) — it won’t be perfect, so switch to "All levels" if you want to see everything. Listings link out to the original job board; applications happen there, not on this site.'
            : 'These are search links to job boards, not specific postings — click through to see current openings.'}
        </p>
      </div>

      <style jsx global>{`
        :root{
          --ag-bg:#FAF9F5; --ag-surface:#ffffff; --ag-ink:#15171C; --ag-muted:#6B7280;
          --ag-accent:#146B4D; --ag-accent-ink:#ffffff;
          --ag-teal:#2E3A59; --ag-pink:#B5563B; --ag-gold:#B8862E; --ag-purple:#5B4C6B; --ag-navy2:#44576B;
          --ag-line:#E3E1DA;
          --ag-font-display:'Newsreader',Georgia,serif; --ag-font-body:'Inter',system-ui,sans-serif; --ag-font-mono:'IBM Plex Mono',ui-monospace,monospace;
          color-scheme:light;
        }
        *{box-sizing:border-box;}
        html{background-color:var(--ag-bg) !important;}
        body{
          background-color:var(--ag-bg) !important;
          color:var(--ag-ink) !important; font-family:var(--ag-font-body); margin:0; padding-inline:16px;
        }
        h1,h2,h3{font-family:var(--ag-font-display); font-style:italic; font-weight:500; text-wrap:balance; margin:0; color:var(--ag-ink) !important;}
        p{line-height:1.55; color:var(--ag-muted); margin:0;}

        .ag-topbar{display:flex; align-items:center; justify-content:space-between; padding-block:18px;}
        .ag-logo{font-family:var(--ag-font-display); font-weight:700; font-size:21px; text-decoration:none; color:var(--ag-ink);}
        .ag-logo span{color:var(--ag-accent);}
        .ag-back-link{font-family:var(--ag-font-mono); font-size:12.5px; font-weight:600; color:var(--ag-accent); text-decoration:none;}

        .ag-jobspage{padding-block:12px 70px;}

        .jl-hero h1{font-size:clamp(30px,4.4vw,44px); max-width:760px;}
        .jl-hero-accent{color:var(--ag-accent);}
        .jl-hero .ag-sub{margin-top:14px; font-size:15.5px; max-width:600px;}

        .jl-controls{display:flex; flex-direction:column; gap:14px; margin-top:30px;}
        .jl-search{width:100%; max-width:420px; border:1.5px solid var(--ag-line); background:var(--ag-surface); border-radius:30px; padding:12px 18px; font-family:var(--ag-font-body); font-size:14px; color:var(--ag-ink); outline:none;}
        .jl-search:focus{border-color:var(--ag-accent);}
        .jl-catbar{display:flex; gap:8px; flex-wrap:wrap;}
        .jl-catbtn{border:1.5px solid var(--ag-line); background:var(--ag-surface); color:var(--ag-ink); font-family:var(--ag-font-body); font-weight:600; font-size:12.5px; padding:8px 16px; border-radius:30px; cursor:pointer;}
        .jl-catbtn.active{background:var(--ag-accent); border-color:var(--ag-accent); color:#fff;}

        .jl-levelbar{display:flex; gap:8px; flex-wrap:wrap;}
        .jl-levelbtn{border:1.5px solid var(--ag-gold); background:var(--ag-surface); color:var(--ag-ink); font-family:var(--ag-font-mono); font-weight:600; font-size:12px; padding:9px 16px; border-radius:30px; cursor:pointer;}
        .jl-levelbtn.active{background:var(--ag-gold); border-color:var(--ag-gold); color:#fff;}

        .jl-gradfallback{margin-top:10px; padding:24px; border:1.5px dashed var(--ag-line); border-radius:16px; text-align:center;}
        .jl-gradfallback-title{font-size:13.5px; margin-bottom:18px;}
        .jl-gradfallback .jl-grid{margin-top:0;}
        .jl-card-search{align-items:flex-start;}

        .jl-count{margin-top:22px; font-family:var(--ag-font-mono); font-size:12px;}

        .jl-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; margin-top:18px;}
        .jl-card{background:var(--ag-surface); border:1px solid var(--ag-line); border-radius:16px; padding:22px; display:flex; flex-direction:column; gap:8px; text-decoration:none; transition:transform .15s,box-shadow .15s;}
        .jl-card:hover{transform:translateY(-3px); box-shadow:0 10px 24px rgba(0,0,0,.08);}
        .jl-card-tags{display:flex; flex-wrap:wrap; gap:6px;}
        .jl-tag{display:inline-block; font-family:var(--ag-font-mono); font-size:10px; font-weight:600; letter-spacing:.03em; text-transform:uppercase; background:var(--ag-accent); color:#fff; padding:3px 9px; border-radius:20px;}
        .jl-date{font-family:var(--ag-font-mono); font-size:11px; color:var(--ag-muted);}
        .jl-card h3{font-size:16px; margin-top:4px; font-weight:600; font-style:normal; font-family:var(--ag-font-body); line-height:1.3;}
        .jl-card p{font-size:13px; flex:1;}
        .jl-view{font-family:var(--ag-font-mono); font-size:12px; font-weight:600; color:var(--ag-accent); margin-top:6px;}
        .jl-empty{grid-column:1/-1; text-align:center; padding:40px 20px; color:var(--ag-muted); font-size:14px;}

        .jl-note{text-align:center; font-size:12px; margin-top:34px;}

        @media (max-width:640px){
          .ag-jobspage{padding-block:8px 50px;}
        }
      `}</style>
    </>
  );
}
