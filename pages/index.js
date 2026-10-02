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

const CODE_DATA = {
  r: {
    label: "R problems",
    icon: "📊",
    problems: [
      {
        id: 0, name: "Mean claim size", topic: "Descriptive stats", diff: "Easy",
        desc: "A sample of 8 motor insurance claims (in £) is given below. Write R code to calculate the sample mean claim size.",
        formula: "claims <- c(1200, 950, 3200, 410, 2750, 1890, 640, 1100)",
        example: "Expected output:\nmean(claims) = 1517.5",
        starter: "# claims vector is already defined for you\nclaims <- c(1200, 950, 3200, 410, 2750, 1890, 640, 1100)\n\n# write your code below\nmean_claim <- \n\nprint(mean_claim)",
        output: "[1] 1517.5\n\n✓ Correct! mean(claims) matches the expected value.",
        pass: true, defaultDone: true,
      },
      {
        id: 1, name: "Variance of losses", topic: "Descriptive stats", diff: "Easy",
        desc: "Using the same claims vector, calculate the sample variance using R's built-in function.",
        formula: "Var(X) = Σ(xᵢ − x̄)² / (n − 1)",
        example: "Expected output:\nvar(claims) ≈ 1073850",
        starter: "claims <- c(1200, 950, 3200, 410, 2750, 1890, 640, 1100)\n\nclaim_var <- \n\nprint(claim_var)",
        output: "Run your code to see the output here.",
      },
      {
        id: 2, name: "Fit a linear model", topic: "Linear regression", diff: "Medium",
        desc: "Fit a simple linear regression of y on x using lm() and print the coefficients.",
        formula: "y = β₀ + β₁x + ε",
        example: "Expected output includes:\n(Intercept)   x\n   2.1       0.87",
        starter: "x <- c(1,2,3,4,5)\ny <- c(2.9, 4.8, 7.1, 8.9, 11.2)\n\nmodel <- lm(y ~ x)\nprint(coef(model))",
        output: "Run your code to see the output here.",
      },
      {
        id: 3, name: "Poisson probability", topic: "Distributions", diff: "Medium",
        desc: "The number of claims per month follows a Poisson distribution with mean 3.2. Find P(X = 5).",
        formula: "P(X = k) = e^(−λ) λᵏ / k!",
        example: "Expected output:\ndpois(5, lambda=3.2) ≈ 0.1140",
        starter: "lambda <- 3.2\n\nprob <- \n\nprint(prob)",
        output: "Run your code to see the output here.",
      },
    ],
  },
  python: {
    label: "Python problems",
    icon: "🐍",
    problems: [
      {
        id: 0, name: "Mean with pandas", topic: "Descriptive stats", diff: "Easy",
        desc: "Given a list of claim amounts, use pandas to compute the mean.",
        formula: "mean = sum(x) / n",
        example: "Expected output:\n1517.5",
        starter: "import pandas as pd\n\nclaims = [1200, 950, 3200, 410, 2750, 1890, 640, 1100]\nseries = pd.Series(claims)\n\n# your code here\nmean_claim = \n\nprint(mean_claim)",
        output: "Run your code to see the output here.",
      },
      {
        id: 1, name: "Loss ratio function", topic: "General insurance", diff: "Easy",
        desc: "Write a function loss_ratio(claims, premium) that returns claims incurred divided by premium earned.",
        formula: "Loss ratio = Claims incurred / Premium earned",
        example: "loss_ratio(80000, 100000) → 0.8",
        starter: "def loss_ratio(claims, premium):\n    # your code here\n    pass\n\nprint(loss_ratio(80000, 100000))",
        output: "Run your code to see the output here.",
      },
      {
        id: 2, name: "Simulate claim counts", topic: "Simulation", diff: "Hard",
        desc: "Using numpy, simulate 10,000 draws from a Poisson(λ=4) distribution and print the sample mean.",
        formula: "X ~ Poisson(λ)",
        example: "Expected output close to:\n4.0 (will vary slightly by seed)",
        starter: "import numpy as np\nnp.random.seed(1)\n\n# your code here\nsims = \nprint(sims.mean())",
        output: "Run your code to see the output here.",
      },
    ],
  },
  sql: {
    label: "SQL problems",
    icon: "🗄️",
    problems: [
      {
        id: 0, name: "Top 3 largest claims", topic: "Querying", diff: "Easy",
        desc: "From the claims table (columns: id, policyholder, amount, claim_date), write a query returning the top 3 claims by amount.",
        formula: "claims(id, policyholder, amount, claim_date)",
        example: "Expected: 3 rows, ordered by amount descending",
        starter: "SELECT *\nFROM claims\n-- add your ORDER BY and LIMIT here\n;",
        output: "Run your code to see the output here.",
      },
      {
        id: 1, name: "Average claim by region", topic: "Aggregation", diff: "Medium",
        desc: "Return the average claim amount grouped by region, from highest to lowest.",
        formula: "claims(id, region, amount)",
        example: "Columns expected: region, avg_amount",
        starter: "SELECT region, AVG(amount) AS avg_amount\nFROM claims\n-- complete the query\n;",
        output: "Run your code to see the output here.",
      },
    ],
  },
  excel: {
    label: "Excel problems",
    icon: "📗",
    problems: [
      {
        id: 0, name: "SUMPRODUCT premium calc", topic: "Formulas", diff: "Easy",
        desc: "Column B has policy premiums and column C has a discount rate per row. In cell D2, write a formula to calculate the discounted premium for each row.",
        formula: "Discounted premium = Premium × (1 − Discount)",
        example: "If B2=1000 and C2=0.1, D2 should show 900",
      },
      {
        id: 1, name: "VLOOKUP policy type", topic: "Lookups", diff: "Medium",
        desc: "Use VLOOKUP (or XLOOKUP) in column D to pull the policy type from a reference table based on the policy code in column A.",
        formula: "=VLOOKUP(A2, RefTable, 2, FALSE)",
        example: "Each row should show the matching policy type text",
      },
    ],
  },
  powerbi: {
    label: "Power BI concept questions",
    icon: "📶",
    problems: [
      {
        id: 0, name: "DAX: Total claims measure", topic: "DAX basics", diff: "Easy",
        desc: "Which DAX function would you use to create a measure that sums the Amount column across all visible rows?",
        quiz: true,
        options: ["SUMX(Claims, Claims[Amount])", "SUM(Claims[Amount])", "AVERAGE(Claims[Amount])", "COUNT(Claims[Amount])"],
        answer: 1,
        explain: "SUM() directly aggregates a numeric column. SUMX is for row-by-row calculations across a table expression.",
      },
      {
        id: 1, name: "Relationships", topic: "Data modelling", diff: "Medium",
        desc: "In a star schema with a Claims fact table and a Policy dimension table, what type of relationship should normally connect them?",
        quiz: true,
        options: ["Many-to-many", "One-to-many (Policy to Claims)", "Many-to-one (Claims to Policy)", "No relationship needed"],
        answer: 1,
        explain: "One Policy can have many Claims, so the relationship runs one-to-many from the Policy dimension to the Claims fact table.",
      },
    ],
  },
};

const INTERVIEW_DATA = {
  behavioral: {
    label: "Behavioural",
    icon: "🧩",
    items: [
      {
        q: "Tell me about yourself.",
        tag: "Opener",
        tips: ["Keep it under 90 seconds: background, why actuarial, what you're doing now.", "End on something that leads naturally into their next question, not your whole life story.", "Skip anything not relevant to the role, save the detail for when they ask."],
      },
      {
        q: "Describe a time you worked as part of a team under pressure.",
        tag: "STAR",
        tips: ["Use STAR: Situation, Task, Action, Result.", "Pick a real example, a university group project or a deadline at work.", "Focus the \"Action\" on what you specifically did, not what the team did.", "Give a concrete result: a grade, a deadline met, feedback received."],
      },
      {
        q: "Tell me about a time you made a mistake. What did you do?",
        tag: "STAR",
        tips: ["Choose a real, moderate mistake, not something trivial or something career ending.", "Own it directly, no blaming others or circumstances.", "Spend most of the answer on what you changed afterwards."],
      },
      {
        q: "Describe a situation where you had to explain something technical to a non-technical person.",
        tag: "Communication",
        tips: ["Actuaries constantly translate numbers for underwriters, boards and clients.", "Give a specific example and the simpler language or analogy you used.", "Mention how you checked they actually understood."],
      },
    ],
  },
  motivational: {
    label: "Motivational",
    icon: "💬",
    items: [
      {
        q: "Why do you want to become an actuary?",
        tag: "Why actuarial",
        tips: ["Connect your interest in maths/stats to a real reason, not just \"I'm good at maths\".", "Mention something specific about the exams, the long-term career path, or a project that hooked you.", "Avoid generic lines like \"I like problem solving\", be specific about what kind."],
      },
      {
        q: "Why general insurance (or life, or pensions) rather than another area?",
        tag: "Why this field",
        tips: ["Show you understand what the field actually involves day to day.", "Mention a specific reason: short-tail vs long-tail risk, the pace of GI, the long horizon of pensions.", "If you're not sure yet, it's fine to say you're keeping an open mind, but explain why this field interests you now."],
      },
      {
        q: "Why do you want to work at this company specifically?",
        tag: "Why us",
        tips: ["Research something real: a recent deal, a specific team, their graduate scheme structure.", "Avoid saying things that apply to literally every insurer.", "Connect it back to your own goals, not just flattery."],
      },
      {
        q: "Where do you see yourself in five years?",
        tag: "Career path",
        tips: ["Mention realistic exam progress (e.g. aiming to be qualified or close to it).", "Show ambition without sounding like you'll leave the moment you qualify.", "It's fine to be honest that the specialism may shift as you learn more."],
      },
    ],
  },
  technical: {
    label: "Technical",
    icon: "📐",
    items: [
      {
        q: "In one sentence, what does an actuary do?",
        tag: "Core concept",
        tips: ["Uses maths and statistics to measure financial risk and advise on it.", "Have a second sentence ready with a concrete example (pricing, reserving, funding)."],
      },
      {
        q: "What is the difference between pricing and reserving?",
        tag: "GI basics",
        tips: ["Pricing: setting the premium for a policy before it's sold.", "Reserving: estimating how much money is needed to pay for claims that have already happened (or will happen) but aren't fully settled.", "A clean way to contrast them: pricing looks forward, reserving looks at what's already on the books."],
      },
      {
        q: "What is a loss ratio and why does it matter?",
        tag: "GI basics",
        tips: ["Loss ratio = claims incurred / premium earned.", "A higher loss ratio means more of the premium is going out as claims, which affects profitability.", "Mention it's one of several ratios insurers track, alongside expense ratio and combined ratio."],
      },
      {
        q: "Explain Bayes' theorem in plain English.",
        tag: "CS1",
        tips: ["It updates a belief (probability) once new evidence comes in.", "Use a simple example: updating the chance someone has a disease after a positive test result.", "Avoid diving into the formula first, start with the intuition, then the formula if asked."],
      },
      {
        q: "What's the difference between CS1 and CS2?",
        tag: "Exams",
        tips: ["CS1: core statistical methods, including Bayesian statistics, GLMs and regression.", "CS2: risk modelling and survival analysis, including Markov chains and machine learning basics.", "You can mention which one you've done and one thing you found interesting in it."],
      },
    ],
  },
  case: {
    label: "Case & Numerical",
    icon: "🧠",
    items: [
      {
        q: "Estimate how many cars are in London.",
        tag: "Market sizing",
        tips: ["Think out loud, interviewers care about the approach more than the exact number.", "Build it up: population of London, average household size, rough car ownership rate.", "State your assumptions clearly as you make them."],
      },
      {
        q: "A fair coin is flipped 3 times. What's the probability of getting exactly 2 heads?",
        tag: "Probability",
        tips: ["List the outcomes or use the binomial formula: C(3,2) × 0.5² × 0.5¹.", "Answer: 3/8 = 0.375.", "Say the formula out loud as you go, don't just state the final number."],
      },
      {
        q: "An insurer's claims have gone up 20% this year. How would you investigate why?",
        tag: "Applied reasoning",
        tips: ["Break it into volume (more policies, more claims) versus severity (claims costing more each).", "Consider external factors: inflation, a change in regulation, a one-off large loss event.", "Mention you'd check the data first before assuming a single cause."],
      },
    ],
  },
};

export default function Home() {
  const [screen, setScreen] = useState("welcome"); // welcome | papers | study | progress | coding | cv | interview | jobs | about
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
          <button className="lp-side-link" onClick={() => navFromMenu("coding")}><span>💻</span> Coding Practice</button>
          <button className="lp-side-link" onClick={() => navFromMenu("cv")}><span>📄</span> CV Templates</button>
          <button className="lp-side-link" onClick={() => navFromMenu("interview")}><span>🎤</span> Interview Prep</button>
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

      {screen === "coding" && <CodingTab onBack={() => setScreen("welcome")} />}
      {screen === "cv" && <CvTab onBack={() => setScreen("welcome")} />}
      {screen === "interview" && <InterviewTab onBack={() => setScreen("welcome")} />}

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
          --code-bg:#1E2030; --code-ink:#E4E4E8;
          background:var(--bg); color:var(--ink); font-family:'Inter',system-ui,sans-serif; }
        .lp-root h1, .lp-root h2, .lp-root h3, .lp-root h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .lp-root p { line-height:1.6; margin:0; }
        .lp-root code, .lp-root .mono { font-family:'JetBrains Mono',monospace; }

        .lp-topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1000px;margin:0 auto;position:relative;z-index:2}
        .lp-logo{font-family:'Fraunces',Georgia,serif;font-weight:700;font-size:1.15rem;color:var(--navy)}
        .lp-logo span{color:var(--accent)}
        .lp-hamburger{width:42px;height:42px;border-radius:50%;background:#fff;border:1px solid var(--line);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;box-shadow:0 2px 8px rgba(20,20,40,.06)}
        .lp-hamburger span{width:18px;height:2px;background:var(--navy);border-radius:2px}

        .lp-menu-overlay{position:fixed;inset:0;background:rgba(20,20,35,.35);z-index:30}
        .lp-side-menu{position:fixed;top:0;right:-300px;width:280px;height:100%;background:var(--paper);z-index:31;box-shadow:-8px 0 30px rgba(20,20,40,.18);transition:right .22s ease;display:flex;flex-direction:column;overflow-y:auto}
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

        /* ===== CODING PRACTICE ===== */
        .cp-online-pill{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1px solid var(--line);padding:7px 14px;border-radius:20px;font-size:.78rem;font-weight:700;color:var(--navy);box-shadow:0 2px 8px rgba(20,20,40,.06);margin-top:14px}
        .cp-online-dot{width:8px;height:8px;border-radius:50%;background:var(--teal);box-shadow:0 0 0 3px rgba(47,182,163,.18);animation:cpPulse 1.8s infinite}
        @keyframes cpPulse{0%{box-shadow:0 0 0 0 rgba(47,182,163,.35)}70%{box-shadow:0 0 0 7px rgba(47,182,163,0)}100%{box-shadow:0 0 0 0 rgba(47,182,163,0)}}
        .cp-lang-tabs{display:flex;gap:8px;max-width:1000px;margin:26px auto 0;padding:0 24px;overflow-x:auto}
        .cp-lang-tab{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);padding:10px 18px;border-radius:12px 12px 0 0;font-size:.88rem;font-weight:700;color:var(--muted);cursor:pointer;white-space:nowrap;border-bottom:none;position:relative;top:1px}
        .cp-lang-tab.active{color:var(--ink);background:var(--paper);border-color:var(--line);box-shadow:0 -4px 12px rgba(20,20,40,.04);border-bottom:1px solid var(--paper)}
        .cp-lang-tab:not(.active):hover{background:#fdfcf9;color:var(--ink)}
        .cp-workspace{max-width:1000px;margin:0 auto;padding:22px 24px 50px;background:var(--paper);border:1px solid var(--line);border-radius:0 14px 14px 14px;box-shadow:0 4px 20px rgba(20,20,40,.06)}
        .cp-quiz-banner{display:flex;gap:12px;align-items:flex-start;background:var(--accent-soft);border-radius:12px;padding:14px 16px;margin-bottom:18px;font-size:.84rem;color:var(--accent-deep)}
        .cp-quiz-banner b{display:block;margin-bottom:2px;color:var(--ink)}
        .cp-panes{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        @media(max-width:820px){.cp-panes{grid-template-columns:1fr}}
        .cp-problem-panel{border:1px solid var(--line);border-radius:12px;padding:20px;background:#fdfcf9}
        .cp-diff-badge{display:inline-block;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;padding:4px 11px;border-radius:14px;margin-bottom:10px}
        .cp-diff-easy{background:#E3F6EF;color:#1C8A6B}
        .cp-diff-medium{background:#FFF1DA;color:#B5790A}
        .cp-diff-hard{background:#FBE3E3;color:#C23B3B}
        .cp-problem-panel h3{font-size:1.08rem;margin-bottom:10px}
        .cp-problem-panel .ptext{color:var(--ink);font-size:.9rem;margin-bottom:14px}
        .cp-formula-box{background:#fff;border:1px dashed var(--line);border-radius:8px;padding:10px 14px;font-size:.86rem;margin-bottom:14px}
        .cp-example-box{background:#fff;border:1px solid var(--line);border-radius:8px;padding:12px 14px;font-size:.84rem}
        .cp-example-box .elabel{font-weight:700;color:var(--muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
        .cp-code-panel{display:flex;flex-direction:column;gap:12px}
        .cp-editor-wrap{border-radius:12px;overflow:hidden;background:var(--code-bg);box-shadow:0 4px 14px rgba(20,20,40,.1)}
        .cp-editor-bar{display:flex;align-items:center;justify-content:space-between;padding:9px 14px;background:#15161F;color:#9496A8;font-size:.76rem}
        .cp-editor-bar .dots{display:flex;gap:5px}
        .cp-editor-bar .dots span{width:9px;height:9px;border-radius:50%}
        .cp-editor-bar .d1{background:#FF6159}.cp-editor-bar .d2{background:#FFBD2E}.cp-editor-bar .d3{background:#28C840}
        .cp-code-editor{width:100%;min-height:200px;background:var(--code-bg);color:var(--code-ink);border:none;font-family:'JetBrains Mono',monospace;font-size:.86rem;line-height:1.6;padding:16px;resize:vertical;outline:none}
        .cp-run-row{display:flex;gap:10px}
        .cp-btn{border:none;cursor:pointer;font-weight:700;font-size:.86rem;border-radius:9px;padding:11px 20px;display:inline-flex;align-items:center;gap:7px}
        .cp-btn-run{background:var(--navy);color:#fff}
        .cp-btn-run:hover{background:var(--navy2)}
        .cp-btn-submit{background:linear-gradient(135deg,var(--accent),var(--accent-deep));color:#fff;box-shadow:0 6px 16px rgba(255,122,69,.3)}
        .cp-btn-submit:hover{filter:brightness(1.05)}
        .cp-output-panel{background:#101119;border-radius:12px;padding:14px 16px;min-height:90px;font-family:'JetBrains Mono',monospace;font-size:.84rem;color:#D7F5E4;white-space:pre-wrap}
        .cp-output-panel.idle{color:#6F7180}
        .cp-output-label{color:#7D8098;font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;font-family:'Inter',sans-serif;font-weight:700}
        .cp-verdict{display:inline-flex;align-items:center;gap:6px;font-size:.78rem;font-weight:800;padding:5px 12px;border-radius:14px;margin-bottom:10px}
        .cp-verdict.pass{background:#1C3B2E;color:#6FE3AE}
        .cp-verdict.fail{background:#3B1C1C;color:#F19A9A}
        .cp-excel-wrap{border:1px solid var(--line);border-radius:10px;overflow:hidden}
        .cp-excel-grid{display:grid;grid-template-columns:40px repeat(4,1fr);width:100%}
        .cp-excel-grid .cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:8px 10px;font-size:.82rem;background:#fff}
        .cp-excel-grid .hcell{background:#F3F1EA;font-weight:700;text-align:center;color:var(--muted);font-size:.76rem}
        .cp-excel-grid input{width:100%;border:none;outline:none;font-family:'JetBrains Mono',monospace;font-size:.82rem;background:transparent}
        .cp-problems-wrap{max-width:1000px;margin:34px auto 0;padding:0 24px}
        .cp-problems-wrap h2{font-size:1.2rem;margin-bottom:14px}
        .cp-plist{display:flex;flex-direction:column;gap:10px}
        .cp-prow{display:flex;align-items:center;gap:14px;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:14px 18px;cursor:pointer}
        .cp-prow:hover{border-color:var(--accent);box-shadow:0 4px 14px rgba(255,122,69,.1)}
        .cp-prow.active{border-color:var(--accent);background:var(--accent-soft)}
        .cp-pstatus{width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:800}
        .cp-pstatus.done{background:var(--teal);color:#fff}
        .cp-pstatus.todo{background:var(--line);color:var(--muted)}
        .cp-prow .pname{font-weight:700;font-size:.9rem;flex:1}
        .cp-prow .ptopic{color:var(--muted);font-size:.78rem}

        /* ===== CV TEMPLATES ===== */
        .cv-card-grid{max-width:860px;margin:30px auto 0;padding:0 24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
        .cv-card{background:var(--paper);border:1px solid var(--line);border-left:4px solid var(--line);border-radius:12px;padding:20px 22px;cursor:pointer;box-shadow:0 2px 10px rgba(20,20,40,.05)}
        .cv-card:hover{box-shadow:0 6px 16px rgba(20,20,40,.1)}
        .cv-card.active{border-left-color:var(--accent);background:var(--accent-soft)}
        .cv-card .cvc-title{font-weight:700;font-size:.96rem;color:var(--ink)}
        .cv-card .cvc-desc{color:var(--muted);font-size:.78rem;margin-top:5px;line-height:1.4}
        .cv-wrap{max-width:980px;margin:30px auto 36px;padding:0 24px;display:grid;grid-template-columns:1fr 1.15fr;gap:28px;align-items:start}
        .cv-wrap.single-col{grid-template-columns:1fr;max-width:760px}
        @media(max-width:860px){.cv-wrap{grid-template-columns:1fr}}
        .cv-info h2{font-size:1.2rem;margin-bottom:10px}
        .cv-info p{color:var(--muted);font-size:.9rem;margin-bottom:18px}
        .cv-tip-list{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}
        .cv-tip{display:flex;gap:12px;align-items:flex-start}
        .cv-tip .tick{width:22px;height:22px;border-radius:50%;background:var(--accent-soft);color:var(--accent-deep);display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:800;flex-shrink:0;margin-top:1px}
        .cv-tip p{margin:0;color:var(--ink);font-size:.86rem;line-height:1.5}
        .cv-download-btn{display:inline-flex;align-items:center;gap:9px;background:linear-gradient(135deg,var(--accent),var(--accent-deep));color:#fff;border:none;padding:14px 26px;border-radius:12px;font-size:.95rem;font-weight:700;cursor:pointer;box-shadow:0 8px 20px rgba(255,122,69,.3)}
        .cv-download-btn:hover{filter:brightness(1.05)}
        .cv-download-note{color:var(--muted);font-size:.78rem;margin-top:10px}
        .cv-page{background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 10px 30px rgba(20,20,40,.1);padding:34px 32px;position:relative}
        .cv-page::before{content:'PREVIEW';position:absolute;top:16px;right:-34px;background:var(--navy);color:#fff;font-size:.62rem;font-weight:800;letter-spacing:.1em;padding:5px 40px;transform:rotate(35deg);box-shadow:0 2px 8px rgba(20,20,40,.2)}
        .cv-page h3{font-size:1.3rem;text-align:center;color:var(--navy);font-family:'Inter',sans-serif;font-weight:800;margin-bottom:3px}
        .cv-role{text-align:center;color:var(--accent-deep);font-weight:700;font-size:.82rem;margin-bottom:8px}
        .cv-contact{text-align:center;color:var(--muted);font-size:.72rem;padding-bottom:14px;border-bottom:2px solid var(--navy);margin-bottom:16px}
        .cv-section-h{font-size:.74rem;font-weight:800;letter-spacing:.06em;color:var(--navy);text-transform:uppercase;border-bottom:1px solid var(--line);padding-bottom:4px;margin-bottom:8px;margin-top:16px}
        .cv-section-h:first-of-type{margin-top:0}
        .cv-entry{display:flex;justify-content:space-between;font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:2px}
        .cv-entry span.date{font-weight:500;color:var(--muted)}
        .cv-sub{color:var(--muted);font-size:.72rem;font-style:italic;margin-bottom:4px}
        .cv-bullets{margin:0 0 10px 16px;padding:0;font-size:.74rem;color:var(--ink);line-height:1.6}
        .cv-bullets li{margin-bottom:2px}
        .cv-profile-text{font-size:.74rem;color:var(--ink);line-height:1.6;margin:0 0 4px}
        .cv-skills-text{font-size:.74rem;color:var(--ink);margin:0}

        /* ===== INTERVIEW PREP ===== */
        .ip-cat-tabs{display:flex;gap:8px;max-width:760px;margin:26px auto 0;padding:0 24px;overflow-x:auto}
        .ip-cat-tab{display:flex;align-items:center;gap:7px;background:#fff;border:1px solid var(--line);padding:9px 16px;border-radius:20px;font-size:.84rem;font-weight:700;color:var(--muted);cursor:pointer;white-space:nowrap}
        .ip-cat-tab.active{color:#fff;background:var(--navy);border-color:var(--navy)}
        .ip-cat-tab:not(.active):hover{background:var(--accent-soft);color:var(--ink)}
        .ip-qa-wrap{max-width:760px;margin:20px auto 0;padding:0 24px;display:flex;flex-direction:column;gap:12px}
        .ip-qa-item{background:var(--paper);border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(20,20,40,.04)}
        .ip-qa-q{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;cursor:pointer}
        .ip-qa-q b{font-size:.92rem;font-weight:700;color:var(--ink)}
        .ip-qa-chevron{color:var(--accent-deep);font-size:.9rem;transition:transform .15s ease;flex-shrink:0}
        .ip-qa-item.open .ip-qa-chevron{transform:rotate(180deg)}
        .ip-qa-a{padding:0 20px 18px;color:var(--muted);font-size:.85rem;line-height:1.65}
        .ip-qa-a ul{margin:6px 0 0;padding-left:18px}
        .ip-qa-a li{margin-bottom:5px}
        .ip-qa-label{display:inline-block;font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--accent-deep);margin-bottom:6px}
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

/* ===================== CODING PRACTICE TAB ===================== */
function CodingTab({ onBack }) {
  const [lang, setLang] = useState("r");
  const [problemIndex, setProblemIndex] = useState(0);
  const [doneSet, setDoneSet] = useState(() => {
    const init = new Set();
    Object.entries(CODE_DATA).forEach(([langKey, langData]) => {
      langData.problems.forEach((p) => {
        if (p.defaultDone) init.add(langKey + "-" + p.id);
      });
    });
    return init;
  });
  const [codeMap, setCodeMap] = useState({});
  const [outputMap, setOutputMap] = useState({});
  const [excelFormula, setExcelFormula] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [onlineN, setOnlineN] = useState(47);

  useEffect(() => {
    const id = setInterval(() => {
      setOnlineN((n) => {
        const next = n + (Math.random() > 0.5 ? 1 : -1);
        return Math.max(12, Math.min(89, next));
      });
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const langData = CODE_DATA[lang];
  const problem = langData.problems[problemIndex];
  const key = lang + "-" + problem.id;
  const isDone = doneSet.has(key);
  const code = codeMap[key] !== undefined ? codeMap[key] : problem.starter || "";
  const output = outputMap[key];

  function switchLang(l) {
    setLang(l);
    setProblemIndex(0);
    setExcelFormula("");
    setQuizResult(null);
  }

  function selectProblem(i) {
    setProblemIndex(i);
    setExcelFormula("");
    setQuizResult(null);
  }

  function markDone() {
    setDoneSet((prev) => new Set(prev).add(key));
  }

  function runCode() {
    setOutputMap((prev) => ({ ...prev, [key]: problem.output }));
  }

  function submitCode() {
    if (problem.pass !== false) markDone();
    runCode();
  }

  function runExcel() {
    const f = excelFormula.toUpperCase();
    if (f.includes("B2") && f.includes("C2") && f.includes("*")) {
      setOutputMap((prev) => ({ ...prev, [key]: "CORRECT|D2 = 900\nNice, that correctly discounts the premium." }));
    } else {
      setOutputMap((prev) => ({ ...prev, [key]: "FAIL|Think about multiplying B2 by (1 − C2)." }));
    }
  }

  function answerQuiz(i) {
    if (i === problem.answer) {
      setQuizResult({ correct: true, text: problem.explain });
      markDone();
    } else {
      setQuizResult({ correct: false, text: problem.explain });
    }
  }

  const diffClass = problem.diff === "Easy" ? "cp-diff-easy" : problem.diff === "Medium" ? "cp-diff-medium" : "cp-diff-hard";
  const excelOutput = output && output.startsWith("CORRECT|") ? { ok: true, text: output.slice(8) }
    : output && output.startsWith("FAIL|") ? { ok: false, text: output.slice(5) } : null;

  return (
    <div>
      <div className="lp-papers-header">
        <button className="lp-back-btn" onClick={onBack}>← Back</button>
        <h1>Coding Practice</h1>
        <p>Write real code, check it instantly, and build the technical skills actuarial employers test for.</p>
        <div className="cp-online-pill"><span className="cp-online-dot"></span>{onlineN} students practicing now</div>
      </div>

      <div className="cp-lang-tabs">
        {Object.entries(CODE_DATA).map(([key2, data]) => (
          <div key={key2} className={"cp-lang-tab" + (lang === key2 ? " active" : "")} onClick={() => switchLang(key2)}>
            <span>{data.icon}</span> {key2 === "powerbi" ? "Power BI" : key2.charAt(0).toUpperCase() + key2.slice(1)}
          </div>
        ))}
      </div>

      <div className="cp-workspace">
        {lang === "powerbi" ? (
          <>
            <div className="cp-quiz-banner">
              <div>⚡</div>
              <div><b>Power BI works a little differently here</b>Building a live Power BI report needs a licensed Microsoft account and can't run freely in a browser, so this section is concept quiz questions instead, the kind that come up in technical interviews.</div>
            </div>
            <div className="cp-problem-panel" style={{ maxWidth: 640, margin: "0 auto" }}>
              <span className={"cp-diff-badge " + diffClass}>{problem.diff}</span>
              <h3>{problem.name}</h3>
              <div className="ptext">{problem.desc}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {problem.options.map((opt, i) => (
                  <button
                    key={i}
                    className="cp-btn"
                    style={{ background: "#fff", border: "1px solid var(--line)", color: "var(--ink)", justifyContent: "flex-start", textAlign: "left", fontWeight: 600 }}
                    onClick={() => answerQuiz(i)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizResult && (
                <div style={{ marginTop: 14, fontSize: ".86rem" }}>
                  <span style={{ color: quizResult.correct ? "#1C8A6B" : "#C23B3B", fontWeight: 800 }}>
                    {quizResult.correct ? "✓ Correct." : "✗ Not quite."}
                  </span>{" "}
                  {quizResult.text}
                </div>
              )}
            </div>
          </>
        ) : lang === "excel" ? (
          <div className="cp-panes">
            <div className="cp-problem-panel">
              <span className={"cp-diff-badge " + diffClass}>{problem.diff}</span>
              <h3>{problem.name}</h3>
              <div className="ptext">{problem.desc}</div>
              <div className="cp-formula-box mono">{problem.formula}</div>
              <div className="cp-example-box"><div className="elabel">Example</div><div className="mono">{problem.example}</div></div>
            </div>
            <div className="cp-code-panel">
              <div className="cp-excel-wrap">
                <div className="cp-excel-grid">
                  <div className="cell hcell"></div><div className="cell hcell">A</div><div className="cell hcell">B</div><div className="cell hcell">C</div><div className="cell hcell">D</div>
                  <div className="cell hcell">1</div><div className="cell">Policy</div><div className="cell">Premium</div><div className="cell">Discount</div><div className="cell"></div>
                  <div className="cell hcell">2</div><div className="cell">P001</div><div className="cell">1000</div><div className="cell">0.1</div>
                  <div className="cell"><input placeholder="=..." value={excelFormula} onChange={(e) => setExcelFormula(e.target.value)} /></div>
                  <div className="cell hcell">3</div><div className="cell">P002</div><div className="cell">2500</div><div className="cell">0.05</div><div className="cell"></div>
                  <div className="cell hcell">4</div><div className="cell">P003</div><div className="cell">800</div><div className="cell">0.2</div><div className="cell"></div>
                </div>
              </div>
              <div className="cp-run-row">
                <button className="cp-btn cp-btn-run" onClick={runExcel}>▶ Calculate</button>
                <button className="cp-btn cp-btn-submit" onClick={markDone}>Submit</button>
              </div>
              <div className={"cp-output-panel" + (excelOutput ? "" : " idle")}>
                <div className="cp-output-label">Output</div>
                {excelOutput ? (
                  <>
                    <span className={"cp-verdict " + (excelOutput.ok ? "pass" : "fail")}>{excelOutput.ok ? "✓ CORRECT" : "try again"}</span>
                    {"\n" + excelOutput.text}
                  </>
                ) : "Type a formula in D2 and press Calculate."}
              </div>
            </div>
          </div>
        ) : (
          <div className="cp-panes">
            <div className="cp-problem-panel">
              <span className={"cp-diff-badge " + diffClass}>{problem.diff}</span>
              <h3>{problem.name}</h3>
              <div className="ptext">{problem.desc}</div>
              <div className="cp-formula-box mono">{problem.formula}</div>
              <div className="cp-example-box"><div className="elabel">Example</div><div className="mono">{problem.example}</div></div>
            </div>
            <div className="cp-code-panel">
              <div className="cp-editor-wrap">
                <div className="cp-editor-bar">
                  <div className="dots"><span className="d1"></span><span className="d2"></span><span className="d3"></span></div>
                  <span>{lang}</span>
                </div>
                <textarea
                  className="cp-code-editor mono"
                  spellCheck="false"
                  value={code}
                  onChange={(e) => setCodeMap((prev) => ({ ...prev, [key]: e.target.value }))}
                />
              </div>
              <div className="cp-run-row">
                <button className="cp-btn cp-btn-run" onClick={runCode}>▶ Run</button>
                <button className="cp-btn cp-btn-submit" onClick={submitCode}>Submit</button>
              </div>
              <div className={"cp-output-panel" + (output ? "" : " idle")}>
                <div className="cp-output-label">Output</div>
                {output || "Press Run to see what your code prints."}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cp-problems-wrap">
        <h2>{langData.label}</h2>
        <div className="cp-plist">
          {langData.problems.map((p, i) => (
            <div key={p.id} className={"cp-prow" + (i === problemIndex ? " active" : "")} onClick={() => selectProblem(i)}>
              <div className={"cp-pstatus " + (doneSet.has(lang + "-" + p.id) ? "done" : "todo")}>
                {doneSet.has(lang + "-" + p.id) ? "✓" : i + 1}
              </div>
              <div className="pname">{p.name}</div>
              <div className="ptopic">{p.topic} · {p.diff}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-footer">
        <span>IFoA Prep: built for actuarial exam students</span>
        <span>Coding Practice preview, not yet wired to a real code runner</span>
      </div>
    </div>
  );
}

/* ===================== CV TEMPLATES TAB ===================== */
function CvTab({ onBack }) {
  const [cvKey, setCvKey] = useState("grad");
  const [downloadNote, setDownloadNote] = useState("Free, editable in Word or Google Docs.");

  const cards = [
    { key: "grad", title: "Graduate-Level CV Template", desc: "For students and new graduates with exams, a degree and maybe one internship." },
    { key: "exp", title: "Experienced CV Template", desc: "For actuarial analysts with a role or two already behind them." },
    { key: "tips", title: "Resume Tips", desc: "What to include, what to cut, and how recruiters actually read a CV." },
    { key: "ats", title: "ATS Compliance", desc: "Formatting that survives an applicant tracking system before a human sees it." },
  ];

  function download() {
    setDownloadNote("In the real site this downloads the .docx file straight away.");
  }

  return (
    <div>
      <div className="lp-papers-header">
        <button className="lp-back-btn" onClick={onBack}>← Back</button>
        <h1>Proven CV Templates</h1>
        <p>Formats that have helped students land actuarial graduate and experienced roles.</p>
      </div>

      <div className="cv-card-grid">
        {cards.map((c) => (
          <div key={c.key} className={"cv-card" + (cvKey === c.key ? " active" : "")} onClick={() => setCvKey(c.key)}>
            <div className="cvc-title">{c.title}</div>
            <div className="cvc-desc">{c.desc}</div>
          </div>
        ))}
      </div>

      {(cvKey === "grad" || cvKey === "exp") && (
        <div className="cv-wrap">
          <div className="cv-info">
            <h2>Why this format</h2>
            <p>
              {cvKey === "grad"
                ? "Built for someone with exams and a degree but limited work history, it puts your potential front and centre."
                : "Built for someone with a track record, it leads with measurable achievements rather than exam results alone."}
            </p>
            <div className="cv-tip-list">
              <div className="cv-tip"><div className="tick">✓</div><p>Exams and exemptions sit near the top, since that's the first thing an actuarial recruiter looks for.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>One page only. Every bullet leads with an action verb and ends with a measurable result.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>A dedicated Skills line for the tools you'll actually use: Excel, R, Python, SQL.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Clean, single-colour layout that prints and scans cleanly through applicant tracking systems.</p></div>
            </div>
            <button className="cv-download-btn" onClick={download}>⬇ Download this template (.docx)</button>
            <div className="cv-download-note">{downloadNote}</div>
          </div>

          {cvKey === "grad" ? (
            <div className="cv-page">
              <h3>YOUR FULL NAME</h3>
              <div className="cv-role">Aspiring Actuary · General Insurance / Life / Pensions</div>
              <div className="cv-contact">email@example.com &nbsp;|&nbsp; +44 7000 000000 &nbsp;|&nbsp; London, UK &nbsp;|&nbsp; linkedin.com/in/yourname</div>
              <div className="cv-section-h">Profile</div>
              <p className="cv-profile-text">Part-qualified actuary with [X] IFoA exams passed, studying [Degree] at [University]. Strong background in statistics and financial mathematics, with hands on experience in [pricing / data analysis / R &amp; Excel].</p>
              <div className="cv-section-h">Exams &amp; Qualifications</div>
              <div className="cv-entry">Institute and Faculty of Actuaries (IFoA) <span className="date">20XX – Present</span></div>
              <ul className="cv-bullets"><li>Exams passed: CS1, CM1, CB1 (update with your own)</li><li>Currently studying: CS2, CM2</li></ul>
              <div className="cv-entry">[Degree title], [University name] <span className="date">20XX – 20XX</span></div>
              <div className="cv-sub">Relevant modules: Statistics, Financial Mathematics, Programming</div>
              <div className="cv-section-h">Work Experience</div>
              <div className="cv-entry">[Internship / Part-time role], [Company] <span className="date">Mon 20XX – Mon 20XX</span></div>
              <ul className="cv-bullets"><li>One concrete task and its measurable result, e.g. "Built a pricing model in Excel that cut calculation time by 30%."</li></ul>
              <div className="cv-section-h">Skills</div>
              <p className="cv-skills-text">Technical: Excel (advanced), R, Python, SQL · Professional: communication, teamwork, exam workload management</p>
            </div>
          ) : (
            <div className="cv-page">
              <h3>YOUR FULL NAME</h3>
              <div className="cv-role">Actuarial Analyst · General Insurance Pricing</div>
              <div className="cv-contact">email@example.com &nbsp;|&nbsp; +44 7000 000000 &nbsp;|&nbsp; London, UK &nbsp;|&nbsp; linkedin.com/in/yourname</div>
              <div className="cv-section-h">Profile</div>
              <p className="cv-profile-text">Actuarial analyst with [X] years' GI pricing experience and [Y] IFoA exams passed. Track record of building and maintaining pricing models used across [X] product lines, with strong R/Python and stakeholder communication skills.</p>
              <div className="cv-section-h">Exams &amp; Qualifications</div>
              <div className="cv-entry">Institute and Faculty of Actuaries (IFoA) <span className="date">20XX – Present</span></div>
              <ul className="cv-bullets"><li>Exams passed: CS1, CS2, CM1, CM2, CB1, CB2 (update with your own)</li><li>On track for Associate (AIFoA) by 20XX</li></ul>
              <div className="cv-section-h">Work Experience</div>
              <div className="cv-entry">Actuarial Analyst, [Company] <span className="date">20XX – Present</span></div>
              <ul className="cv-bullets"><li>Rebuilt the motor pricing model, cutting rating run time by [X]% and removing [Y] manual steps.</li><li>Presented quarterly reserving results to [stakeholder group], flagging a [X]% adverse development trend.</li></ul>
              <div className="cv-entry">[Prior Job Title], [Company] <span className="date">20XX – 20XX</span></div>
              <ul className="cv-bullets"><li>One achievement with a number attached, scoped to what you actually owned.</li></ul>
              <div className="cv-section-h">Skills</div>
              <p className="cv-skills-text">Technical: R, Python, SQL, Excel/VBA, Radar · Professional: stakeholder management, mentoring, project delivery</p>
            </div>
          )}
        </div>
      )}

      {cvKey === "tips" && (
        <div className="cv-wrap single-col">
          <div className="cv-info" style={{ width: "100%" }}>
            <h2>Resume tips that actually matter</h2>
            <p>What recruiters at insurers and consultancies have told us they look for first, and what gets a CV binned.</p>
            <div className="cv-tip-list">
              <div className="cv-tip"><div className="tick">✓</div><p>Keep it to one page. Two pages is acceptable only with 5+ years of experience.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Lead with exams passed and exemptions, actuarial recruiters scan for this within seconds.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Every bullet should follow Action → Task → Result, with a number in the result wherever possible.</p></div>
              <div className="cv-tip"><div className="tick">✗</div><p>Don't list "Microsoft Office" as a skill, it's assumed. List the tools that differentiate you: R, Python, SQL, Power BI, Radar.</p></div>
              <div className="cv-tip"><div className="tick">✗</div><p>Don't use a generic objective statement ("Seeking a challenging role where I can..."). Replace it with a specific profile line.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Match a handful of keywords from the job advert itself, especially the named exams and software.</p></div>
            </div>
          </div>
        </div>
      )}

      {cvKey === "ats" && (
        <div className="cv-wrap single-col">
          <div className="cv-info" style={{ width: "100%" }}>
            <h2>Getting past the ATS</h2>
            <p>Most large insurers filter CVs through an applicant tracking system before anyone reads them. These are the things that trip people up.</p>
            <div className="cv-tip-list">
              <div className="cv-tip"><div className="tick">✓</div><p>Use a standard, single-column layout. Multi-column designs and text boxes often get scrambled or skipped entirely.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Save and submit as a .docx or a text-based PDF, never a scanned image or a PDF exported from a design tool.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Use standard section headings: "Work Experience", "Education", "Skills", not creative alternatives.</p></div>
              <div className="cv-tip"><div className="tick">✗</div><p>Avoid tables, headers/footers, icons and graphics for key information, some systems can't read text placed inside them.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Spell out exam codes in full at least once: "CS1 (Actuarial Statistics)", since some systems match on the full name.</p></div>
              <div className="cv-tip"><div className="tick">✓</div><p>Use a standard font (Calibri, Arial, Georgia) at 10–12pt, unusual fonts can fail to parse.</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="lp-footer">
        <span>IFoA Prep: built for actuarial exam students</span>
        <span>Template preview, the real download will generate an editable Word file</span>
      </div>
    </div>
  );
}

/* ===================== INTERVIEW PREP TAB ===================== */
function InterviewTab({ onBack }) {
  const [cat, setCat] = useState("behavioral");
  const [openIndex, setOpenIndex] = useState(null);

  function switchCat(c) {
    setCat(c);
    setOpenIndex(null);
  }

  const items = INTERVIEW_DATA[cat].items;

  return (
    <div>
      <div className="lp-papers-header">
        <button className="lp-back-btn" onClick={onBack}>← Back</button>
        <h1>Interview Preparation</h1>
        <p>Real actuarial interview questions, grouped by type, with what interviewers are actually listening for.</p>
      </div>

      <div className="ip-cat-tabs">
        {Object.entries(INTERVIEW_DATA).map(([key, data]) => (
          <div key={key} className={"ip-cat-tab" + (cat === key ? " active" : "")} onClick={() => switchCat(key)}>
            {data.icon} {data.label}
          </div>
        ))}
      </div>

      <div className="ip-qa-wrap">
        {items.map((item, i) => (
          <div key={i} className={"ip-qa-item" + (openIndex === i ? " open" : "")}>
            <div className="ip-qa-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div><div className="ip-qa-label">{item.tag}</div><b>{item.q}</b></div>
              <span className="ip-qa-chevron">▾</span>
            </div>
            {openIndex === i && (
              <div className="ip-qa-a">
                <ul>
                  {item.tips.map((t, ti) => <li key={ti}>{t}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="lp-footer" style={{ marginTop: 28 }}>
        <span>IFoA Prep: built for actuarial exam students</span>
        <span>Not affiliated with the Institute and Faculty of Actuaries</span>
      </div>
    </div>
  );
}
