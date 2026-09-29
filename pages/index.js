import Head from "next/head";
import { useState, useEffect } from "react";
import { INTRO, CHAPTERS, NOTES, QUESTIONS } from "../data/questions";

const JOB_INFO = {
  gi: {
    icon: "🛡️", color: "var(--teal)", title: "General Insurance",
    desc: "Prices and reserves for everyday insurance policies such as car, home and travel cover. GI actuaries work out how much a policy should cost and how much money the insurer needs to keep aside to pay future claims.",
    companies: ["Aviva", "AXA", "Allianz", "Zurich", "Direct Line", "Admiral"],
  },
  life: {
    icon: "❤️", color: "var(--pink)", title: "Life Insurance",
    desc: "Works on long-term products like life cover, critical illness and annuities. These policies can run for decades, so life actuaries model mortality, longevity and how much to charge today for a payout far in the future.",
    companies: ["Legal & General", "Prudential", "Aviva", "Standard Life", "Scottish Widows", "Phoenix Group"],
  },
  pensions: {
    icon: "👴", color: "var(--gold)", title: "Pensions",
    desc: "Advises companies and pension schemes on how much needs to be paid in today so members get their promised retirement income later, and helps schemes stay funded as people live longer.",
    companies: ["Mercer", "Aon", "WTW", "Hymans Robertson", "Barnett Waddingham", "XPS Pensions"],
  },
  consulting: {
    icon: "💼", color: "var(--purple)", title: "Consulting",
    desc: "Actuaries at consulting firms advise multiple clients (insurers, pension schemes, regulators) on risk, pricing and regulation, rather than working inside a single company.",
    companies: ["EY", "PwC", "Deloitte", "KPMG", "Milliman", "Grant Thornton"],
  },
  invest: {
    icon: "📈", color: "var(--accent)", title: "Investment & Banking",
    desc: "Uses the same statistical and risk-modelling skillset for asset management, quantitative trading and investment strategy, where the focus shifts from insurance risk to market and credit risk.",
    companies: ["Goldman Sachs", "JPMorgan", "BlackRock", "Schroders", "M&G", "LGIM"],
  },
  re: {
    icon: "🌍", color: "var(--navy2)", title: "Reinsurance",
    desc: "Reinsurers insure other insurance companies, taking on large or unusual risks (like major disasters) that a single insurer wouldn't want to carry alone. Reinsurance actuaries price these very large, less predictable risks.",
    companies: ["Swiss Re", "Munich Re", "Hannover Re", "SCOR", "RGA", "Gen Re"],
  },
};

const PATH_STEPS = [
  { title: "Pass the core exams", body: "CB1, CB2, CM1, CM2, CS1, CS2. These build the maths, statistics and financial foundations every actuary needs." },
  { title: "Get a graduate role", body: "Most people join an insurer, consultancy or pension firm as a trainee actuary and study for exams alongside full time work." },
  { title: "Pass the specialist exams", body: "CP1 to CP3, then two SP papers in your chosen area (general insurance, life, pensions and so on)." },
  { title: "Pass the SA exam and log work experience", body: "One final advanced paper in your specialism, plus a required period of logged, signed off practical work experience." },
  { title: "Qualify as a Fellow", body: "Once every exam and experience requirement is met, the IFoA awards Fellowship (FIA), the full actuarial qualification." },
];

const PAPERS = [
  { code: "CS1", name: "Actuarial Statistics", desc: "16 chapters · notes & practice questions", live: true },
  { code: "CS2", name: "Risk Modelling & Survival Analysis", desc: "Coming soon", live: false },
  { code: "CM1", name: "Actuarial Mathematics", desc: "Coming soon", live: false },
  { code: "CM2", name: "Financial Engineering & Loss Reserving", desc: "Coming soon", live: false },
];

export default function Home() {
  const [screen, setScreen] = useState("welcome"); // welcome | papers | study | progress | jobs | about
  const [tab, setTab] = useState("chapters");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathOpen, setPathOpen] = useState(false);
  const [jobKey, setJobKey] = useState(null);
  const [progress, setProgress] = useState({ viewed: [], answered: 0 });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cs1-progress") || "{}");
      setProgress({ viewed: saved.viewed || [], answered: saved.answered || 0 });
    } catch (e) {}
  }, []);

  function markViewed(n) {
    setProgress((prev) => {
      const viewed = prev.viewed.includes(n) ? prev.viewed : [...prev.viewed, n];
      const next = { ...prev, viewed };
      try {
        localStorage.setItem("cs1-progress", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }

  function goToChapterNotes(n) {
    setSelectedChapter(n);
    setTab("notes");
    setScreen("study");
    markViewed(n);
  }

  function openPaper(code) {
    if (code === "CS1") setScreen("study");
  }

  function navFromMenu(key) {
    setMenuOpen(false);
    if (key === "mock") {
      setTab("practice");
      setScreen("study");
    } else {
      setScreen(key);
    }
  }

  return (
    <div className="lp-root">
      <Head>
        <title>IFoA Prep — Actuarial Exam Notes</title>
      </Head>

      {/* SHARED: side menu */}
      {menuOpen && <div className="lp-menu-overlay" onClick={() => setMenuOpen(false)} />}
      <div className={"lp-side-menu" + (menuOpen ? " open" : "")}>
        <div className="lp-side-menu-header">
          <span>Menu</span>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <div className="lp-side-menu-links">
          <button className="lp-side-link" onClick={() => navFromMenu("papers")}><span>📚</span> Browse Papers</button>
          <button className="lp-side-link" onClick={() => navFromMenu("progress")}><span>📈</span> Progress</button>
          <button className="lp-side-link" onClick={() => navFromMenu("mock")}><span>📝</span> Mock Questions</button>
          <button className="lp-side-link" onClick={() => navFromMenu("jobs")}><span>💼</span> Job Listings</button>
          <button className="lp-side-link" onClick={() => navFromMenu("about")}><span>👤</span> About Me</button>
        </div>
      </div>

      {/* SHARED: job sector modal */}
      {jobKey && (
        <>
          <div className="lp-modal-overlay" onClick={() => setJobKey(null)} />
          <div className="lp-job-modal">
            <button className="lp-modal-close" onClick={() => setJobKey(null)}>✕</button>
            <div className="lp-job-modal-icon" style={{ background: JOB_INFO[jobKey].color }}>{JOB_INFO[jobKey].icon}</div>
            <h3>{JOB_INFO[jobKey].title}</h3>
            <p>{JOB_INFO[jobKey].desc}</p>
            <div className="lp-jmc-label">Top employers</div>
            <div className="lp-jmc-list">
              {JOB_INFO[jobKey].companies.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* SHARED: actuarial path modal */}
      {pathOpen && (
        <>
          <div className="lp-modal-overlay" onClick={() => setPathOpen(false)} />
          <div className="lp-path-modal">
            <button className="lp-modal-close" onClick={() => setPathOpen(false)}>✕</button>
            <h3 style={{ marginBottom: 6 }}>The actuarial path</h3>
            <p style={{ color: "var(--muted)", fontSize: ".88rem", marginBottom: 20 }}>
              Roughly how it goes from student to qualified actuary in the UK.
            </p>
            {PATH_STEPS.map((step, i) => (
              <div className="lp-path-step" key={step.title}>
                <div className="lp-path-step-num">{i + 1}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {screen === "welcome" && (
        <div>
          <div className="lp-hero">
            <div className="lp-topbar">
              <div className="lp-logo">IFoA<span>Prep</span></div>
              <button className="lp-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                <span></span><span></span><span></span>
              </button>
            </div>
            <div className="lp-hero-content">
              <div className="lp-eyebrow">🎉 Congrats on taking the first step</div>
              <h1><span>Welcome to IFoA Prep.</span></h1>
              <p>Most people never get this far. You've already started, so let's get you exam ready.</p>
              <button className="lp-path-link" onClick={() => setPathOpen(true)}>🗺️ New here? See the actuarial path</button>
            </div>
            <svg className="lp-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none">
              <path d="M0,32 C240,60 480,60 720,36 C960,12 1200,12 1440,32 L1440,60 L0,60 Z" />
            </svg>
          </div>

          <div className="lp-explainer">
            <h2>So, what does an actuary actually do?</h2>
            <p>In plain terms, an actuary uses maths, statistics and business sense to work out how likely something expensive is to happen, and what to do about it.</p>
            <div className="lp-explain-grid">
              <div className="lp-explain-item">
                <div className="lp-explain-num">1</div>
                <div><h3>Measures risk</h3><p>Uses data and statistical models to work out the chance of an event (a car crash, a death, a natural disaster) and how much it would cost.</p></div>
              </div>
              <div className="lp-explain-item">
                <div className="lp-explain-num">2</div>
                <div><h3>Prices products</h3><p>Sets premiums for insurance policies and contribution rates for pension schemes, so the numbers work for both the customer and the business.</p></div>
              </div>
              <div className="lp-explain-item">
                <div className="lp-explain-num">3</div>
                <div><h3>Manages reserves</h3><p>Makes sure companies set aside enough money today to pay out future claims, even decades from now.</p></div>
              </div>
              <div className="lp-explain-item">
                <div className="lp-explain-num">4</div>
                <div><h3>Advises on decisions</h3><p>Turns the numbers into advice for boards and regulators on solvency, investment strategy and long-term financial planning.</p></div>
              </div>
            </div>
          </div>

          <div className="lp-job-wrap">
            <h2>Where actuaries work</h2>
            <div className="lp-job-grid">
              {[
                ["gi", "var(--teal)", "🛡️", "General Insurance", "Pricing & reserving"],
                ["life", "var(--pink)", "❤️", "Life Insurance", "Protection & savings"],
                ["pensions", "var(--gold)", "👴", "Pensions", "Scheme funding"],
                ["consulting", "var(--purple)", "💼", "Consulting", "EY, PwC, Deloitte"],
                ["invest", "var(--accent)", "📈", "Investment & Banking", "Risk & quant roles"],
                ["re", "var(--navy2)", "🌍", "Reinsurance", "Swiss Re, Munich Re"],
              ].map(([key, color, icon, name, desc]) => (
                <div className="lp-job-card" key={key} onClick={() => setJobKey(key)}>
                  <div className="lp-job-icon" style={{ background: color }}>{icon}</div>
                  <div className="lp-job-name">{name}</div>
                  <div className="lp-job-desc">{desc}</div>
                  <div className="lp-tap-hint">Tap to know more →</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-footer">
            <span>IFoA Prep: built for actuarial exam students</span>
            <span>Not affiliated with the Institute and Faculty of Actuaries</span>
          </div>
        </div>
      )}

      {screen === "papers" && (
        <div>
          <div className="lp-papers-header">
            <button className="lp-back-btn" onClick={() => setScreen("welcome")}>← Back</button>
            <h1>All Papers</h1>
            <p>Pick a paper to start studying</p>
          </div>
          <div className="lp-papers-list">
            {PAPERS.map((p) => (
              <div
                key={p.code}
                className={"lp-paper-card" + (p.live ? " live" : "")}
                onClick={() => openPaper(p.code)}
              >
                <div className="lp-paper-icon" style={{ background: p.live ? "var(--accent)" : "var(--muted)" }}>
                  {p.code}
                </div>
                <div className="lp-paper-info">
                  <div className="lp-pname">{p.code}: {p.name}</div>
                  <div className="lp-pdesc">{p.desc}</div>
                </div>
                <span className={"lp-badge" + (p.live ? "" : " soon")}>{p.live ? "Live →" : "Coming soon"}</span>
              </div>
            ))}
          </div>
          <div className="lp-footer">
            <span>IFoA Prep: built for actuarial exam students</span>
            <span>Not affiliated with the Institute and Faculty of Actuaries</span>
          </div>
        </div>
      )}

      {screen === "progress" && (
        <div>
          <div className="lp-papers-header">
            <button className="lp-back-btn" onClick={() => setScreen("welcome")}>← Back</button>
            <h1>Your Progress</h1>
            <p>Tracks chapters viewed, across every paper</p>
          </div>
          <div className="lp-stub">
            <h2>{progress.viewed.length} / {CHAPTERS.length} CS1 chapters viewed</h2>
            <div className="lp-progress-track">
              <div className="lp-progress-fill" style={{ width: `${(progress.viewed.length / CHAPTERS.length) * 100}%` }} />
            </div>
            <p>Progress is saved on this device only, for now. Signing in later will let it follow you anywhere.</p>
          </div>
          <div className="lp-footer">
            <span>IFoA Prep: built for actuarial exam students</span>
            <span>Not affiliated with the Institute and Faculty of Actuaries</span>
          </div>
        </div>
      )}

      {screen === "jobs" && (
        <div>
          <div className="lp-papers-header">
            <button className="lp-back-btn" onClick={() => setScreen("welcome")}>← Back</button>
            <h1>Job Listings</h1>
            <p>Actuarial graduate and trainee roles, in one place</p>
          </div>
          <div className="lp-stub">
            <h2>Coming soon</h2>
            <p>A feed of actuarial graduate schemes and trainee roles pulled from company career pages, so students don't have to check each insurer's site separately.</p>
          </div>
          <div className="lp-footer">
            <span>IFoA Prep: built for actuarial exam students</span>
            <span>Not affiliated with the Institute and Faculty of Actuaries</span>
          </div>
        </div>
      )}

      {screen === "about" && (
        <div>
          <div className="lp-papers-header">
            <button className="lp-back-btn" onClick={() => setScreen("welcome")}>← Back</button>
            <h1>About Me</h1>
          </div>
          <div className="lp-stub">
            <p>
              Built by an actuarial science graduate to give IFoA students free, exam-focused notes
              and practice, the kind of resource I wished existed while studying for it myself.
            </p>
            <p style={{ fontSize: ".85rem", color: "var(--muted)" }}>Not affiliated with the Institute and Faculty of Actuaries.</p>
          </div>
          <div className="lp-footer">
            <span>IFoA Prep: built for actuarial exam students</span>
            <span>Not affiliated with the Institute and Faculty of Actuaries</span>
          </div>
        </div>
      )}

      {screen === "study" && (
        <div className="wrap">
          <div className="topbar">
            <button className="lp-back-btn" style={{ position: "static" }} onClick={() => setScreen("papers")}>← All Papers</button>
            <div className="brand">IFoA Prep</div>
            <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span></span><span></span><span></span>
            </button>
          </div>

          <div className="hero">
            <div className="hero-inner">
              <div className="eyebrow">IFoA · CS1 · Actuarial Statistics</div>
              <h1>
                Make sense of <span className="accent-word">uncertainty</span>,<br />
                one chapter at a time
              </h1>
              <p>{INTRO.body}</p>
              <div className="stat-row">
                <div className="stat">
                  <div className="num">{CHAPTERS.length}</div>
                  <div className="label">Chapters</div>
                </div>
                <div className="stat">
                  <div className="num">{QUESTIONS.length}</div>
                  <div className="label">Practice questions</div>
                </div>
              </div>
              <button className="cta" onClick={() => goToChapterNotes(1)}>
                Start with Chapter 1
              </button>
            </div>
            <div className="histogram">
              {[30, 55, 85, 100, 70, 40, 20].map((h, i) => (
                <div key={i} className="bar" style={{ height: h + "%" }} />
              ))}
            </div>
          </div>

          <div className="tabs">
            {[
              ["chapters", "Chapters"],
              ["notes", "Notes"],
              ["practice", "Practice"],
            ].map(([key, label]) => (
              <button
                key={key}
                className={"tab-btn" + (tab === key ? " active" : "")}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "chapters" && <ChaptersTab onSelect={goToChapterNotes} />}
          {tab === "notes" && (
            <NotesTab
              selectedChapter={selectedChapter}
              setSelectedChapter={(n) => {
                setSelectedChapter(n);
                markViewed(n);
              }}
            />
          )}
          {tab === "practice" && <PracticeTab />}

          <footer>
            <span>IFoA Prep — built for IFoA students</span>
            <span>Not affiliated with the Institute and Faculty of Actuaries</span>
          </footer>
        </div>
      )}

      <style jsx global>{`
        .lp-root { --bg:#FAF8F3; --paper:#FFFFFF; --ink:#191A23; --navy:#1B2350; --navy2:#2F3D82;
          --accent:#FF7A45; --accent-deep:#E45A28; --accent-soft:#FFE4D3; --gold:#F2B84B;
          --teal:#2FB6A3; --purple:#8C6FE0; --pink:#EA5FA0; --line:#EAE4D8; --muted:#6B6F7B;
          background:var(--bg); color:var(--ink); font-family:'Inter',system-ui,sans-serif; }
        .lp-root h1, .lp-root h2, .lp-root h3, .lp-root h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .lp-root p { line-height:1.6; margin:0; }

        .lp-topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1000px;margin:0 auto;position:relative;z-index:2}
        .lp-logo{font-family:'Fraunces',Georgia,serif;font-weight:700;font-size:1.15rem;color:var(--navy)}
        .lp-logo span{color:var(--accent)}
        .lp-hamburger{width:42px;height:42px;border-radius:50%;background:#fff;border:1px solid var(--line);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;box-shadow:0 2px 8px rgba(20,20,40,.06)}
        .lp-hamburger span{width:18px;height:2px;background:var(--navy);border-radius:2px}

        .lp-menu-overlay{position:fixed;inset:0;background:rgba(20,20,35,.35);z-index:30}
        .lp-side-menu{position:fixed;top:0;right:-300px;width:280px;height:100%;background:var(--paper);z-index:31;box-shadow:-8px 0 30px rgba(20,20,40,.18);transition:right .22s ease;display:flex;flex-direction:column}
        .lp-side-menu.open{right:0}
        .lp-side-menu-header{display:flex;justify-content:space-between;align-items:center;padding:20px 22px;border-bottom:1px solid var(--line)}
        .lp-side-menu-header span{font-family:'Fraunces',Georgia,serif;font-weight:700;font-size:1.05rem}
        .lp-side-menu-header button{background:none;border:none;font-size:1.1rem;cursor:pointer;color:var(--muted)}
        .lp-side-menu-links{padding:14px}
        .lp-side-link{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:13px 12px;border-radius:10px;font-size:.95rem;font-weight:600;color:var(--ink)}
        .lp-side-link:hover{background:var(--accent-soft)}

        .lp-modal-overlay{position:fixed;inset:0;background:rgba(20,20,35,.4);z-index:40}
        .lp-job-modal, .lp-path-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,88vw);max-height:82vh;overflow-y:auto;background:var(--paper);border-radius:18px;box-shadow:0 24px 60px rgba(20,20,40,.25);z-index:41;padding:28px 26px}
        .lp-modal-close{position:absolute;top:16px;right:16px;background:var(--bg);border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:1rem;color:var(--muted)}
        .lp-job-modal-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:14px}
        .lp-job-modal h3{font-size:1.25rem;margin-bottom:8px}
        .lp-job-modal p{color:var(--muted);font-size:.92rem;margin-bottom:20px}
        .lp-jmc-label{text-transform:uppercase;letter-spacing:.08em;font-size:.7rem;color:var(--muted);font-weight:700;margin-bottom:10px}
        .lp-jmc-list{display:flex;flex-wrap:wrap;gap:8px}
        .lp-jmc-list span{background:var(--accent-soft);color:var(--accent-deep);font-size:.82rem;font-weight:600;padding:6px 12px;border-radius:16px}
        .lp-path-step{display:flex;gap:14px;margin-bottom:18px}
        .lp-path-step:last-child{margin-bottom:0}
        .lp-path-step-num{width:30px;height:30px;border-radius:50%;background:var(--navy);color:#fff;font-weight:800;font-size:.85rem;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .lp-path-step h4{font-size:.98rem;margin-bottom:3px}
        .lp-path-step p{color:var(--muted);font-size:.85rem;line-height:1.5}

        .lp-hero{position:relative;overflow:hidden;background:radial-gradient(ellipse 60% 50% at 15% 10%, rgba(255,122,69,.22), transparent 60%),radial-gradient(ellipse 55% 45% at 100% 20%, rgba(47,182,163,.20), transparent 60%),radial-gradient(ellipse 50% 40% at 50% 100%, rgba(140,111,224,.14), transparent 60%),var(--bg);padding:0 24px 32px;text-align:center}
        .lp-hero-content{padding-top:36px;position:relative;z-index:1}
        .lp-eyebrow{display:inline-block;text-transform:uppercase;letter-spacing:.14em;font-size:.72rem;color:var(--navy);font-weight:800;margin-bottom:20px;background:var(--gold);padding:6px 16px;border-radius:20px}
        .lp-hero h1{font-size:2.6rem;line-height:1.15;max-width:680px;margin:0 auto 18px}
        .lp-hero h1 span{color:var(--accent)}
        .lp-hero-content > p{color:var(--muted);max-width:580px;margin:0 auto;font-size:1.05rem}
        .lp-path-link{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);color:var(--navy);font-size:.82rem;font-weight:700;padding:9px 18px;border-radius:20px;cursor:pointer;margin-top:22px;box-shadow:0 2px 8px rgba(20,20,40,.06)}
        .lp-path-link:hover{background:var(--accent-soft)}
        .lp-hero-wave{display:block;width:100%;height:56px;margin-top:-2px}
        .lp-hero-wave path{fill:var(--paper)}

        .lp-explainer{max-width:760px;margin:0 auto;padding:16px 24px 8px;background:var(--paper)}
        .lp-explainer h2{font-size:1.3rem;text-align:center;margin-bottom:8px}
        .lp-explainer > p{color:var(--muted);text-align:center;max-width:560px;margin:0 auto 28px;font-size:.96rem}
        .lp-explain-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
        .lp-explain-item{display:flex;gap:14px;align-items:flex-start}
        .lp-explain-num{width:32px;height:32px;border-radius:50%;background:var(--accent-soft);color:var(--accent-deep);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.9rem;flex-shrink:0}
        .lp-explain-item h3{font-size:.98rem;margin-bottom:4px}
        .lp-explain-item p{color:var(--muted);font-size:.86rem;line-height:1.5}

        .lp-job-wrap{max-width:760px;margin:0 auto;padding:36px 24px 48px;background:var(--paper)}
        .lp-job-wrap h2{font-size:1.3rem;margin-bottom:20px;text-align:center}
        .lp-job-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
        .lp-job-card{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:18px 16px;box-shadow:0 4px 14px rgba(20,20,40,.06);transition:transform .15s ease;cursor:pointer}
        .lp-job-card:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(20,20,40,.1)}
        .lp-job-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:10px}
        .lp-job-name{font-weight:700;font-size:.92rem}
        .lp-job-desc{color:var(--muted);font-size:.8rem;margin-top:4px;line-height:1.4}
        .lp-tap-hint{color:var(--accent-deep);font-size:.74rem;font-weight:700;margin-top:10px}

        .lp-papers-header{background:radial-gradient(ellipse 60% 80% at 10% 0%, rgba(255,122,69,.16), transparent 60%),radial-gradient(ellipse 60% 80% at 90% 0%, rgba(47,182,163,.14), transparent 60%),var(--bg);padding:44px 24px 36px;text-align:center;position:relative;border-bottom:1px solid var(--line)}
        .lp-papers-header p{color:var(--muted);margin-top:10px}
        .lp-back-btn{position:absolute;left:20px;top:38px;background:#fff;border:1px solid var(--line);color:var(--navy);padding:7px 16px;border-radius:20px;font-size:.8rem;cursor:pointer;box-shadow:0 2px 8px rgba(20,20,40,.06)}
        .lp-back-btn:hover{background:var(--accent-soft)}

        .lp-papers-list{max-width:760px;margin:36px auto;padding:0 24px;display:flex;flex-direction:column;gap:14px}
        .lp-paper-card{display:flex;align-items:center;gap:16px;background:var(--paper);border:1px solid var(--line);border-left:5px solid var(--line);border-radius:14px;padding:20px 22px;box-shadow:0 4px 14px rgba(20,20,40,.06)}
        .lp-paper-card.live{border-left-color:var(--accent);cursor:pointer}
        .lp-paper-card.live:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(255,122,69,.18)}
        .lp-paper-icon{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:800;color:#fff;flex-shrink:0}
        .lp-paper-info{flex:1}
        .lp-pname{font-weight:700;font-size:1.05rem}
        .lp-pdesc{color:var(--muted);font-size:.85rem;margin-top:3px}
        .lp-badge{font-size:.7rem;padding:5px 12px;border-radius:20px;background:var(--accent);color:#fff;font-weight:700;white-space:nowrap}
        .lp-badge.soon{background:var(--line);color:var(--muted)}

        .lp-stub{padding:60px 24px;text-align:center;max-width:520px;margin:0 auto}
        .lp-stub h2{font-size:1.3rem;margin-bottom:14px}
        .lp-stub p{color:var(--muted);margin-top:10px}
        .lp-progress-track{height:10px;border-radius:6px;background:var(--line);overflow:hidden;margin:18px 0}
        .lp-progress-fill{height:100%;background:var(--accent)}

        .lp-footer{text-align:center;padding:32px 24px 40px;border-top:1px solid var(--line);margin-top:8px;display:flex;flex-direction:column;gap:4px;color:var(--muted);font-size:.8rem}
      `}</style>
    </div>
  );
}

function ChaptersTab({ onSelect }) {
  return (
    <div className="page">
      <div className="toc">
        {CHAPTERS.map((c) => (
          <button key={c.n} className="toc-entry" onClick={() => onSelect(c.n)}>
            <span className="toc-num">{c.n}</span>
            <span className="toc-title">{c.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function NotesTab({ selectedChapter, setSelectedChapter }) {
  const note = NOTES[selectedChapter];
  return (
    <div className="page">
      <select
        className="page-select"
        value={selectedChapter}
        onChange={(e) => setSelectedChapter(Number(e.target.value))}
      >
        {CHAPTERS.map((c) => (
          <option key={c.n} value={c.n}>
            Chapter {c.n}: {c.title}
          </option>
        ))}
      </select>
      {note && (
        <div className="note-body">
          <h2>{note.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: note.body }} />
        </div>
      )}
    </div>
  );
}

function PracticeTab() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const q = QUESTIONS[index];

  function next() {
    setSelected(null);
    setIndex((i) => (i + 1) % QUESTIONS.length);
  }

  return (
    <div className="page">
      <div className="q-card">
        <div className="q-topic">{q.topic}</div>
        <div className="q-progress">
          Question {index + 1} of {QUESTIONS.length}
        </div>
        <div className="q-text">{q.text}</div>
        <div className="opts">
          {q.options.map((opt, i) => {
            let cls = "opt";
            if (selected !== null) {
              if (i === q.correct) cls += " correct";
              else if (i === selected) cls += " incorrect";
            }
            return (
              <button key={i} className={cls} onClick={() => setSelected(i)} disabled={selected !== null}>
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && <div className="explain">{q.explain}</div>}
        <button className="cta" onClick={next}>
          Next question
        </button>
      </div>
    </div>
  );
}
