import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Hi({ c, children }) {
  return <span className={'cv-hi cv-hi-' + c}>{children}</span>;
}

const CV_SECTIONS = [
  { num: '1', title: 'Header', body: 'Full name, phone, email, LinkedIn, location, and your right-to-work / visa status stated clearly near the top — graduate schemes screen on this before anything else.' },
  { num: '2', title: 'Education', body: 'Degree, university, grade, and only the modules relevant to the role (statistics, finance, programming). Drop A-levels once you have a degree, unless the grades are strong and the role is entry-level.' },
  { num: '3', title: 'Exam progress', body: 'A clean, scannable line: exams passed, by paper code, exams exempted, and what you’re sitting next. Never blur "passed" with "exempted" — recruiters check this against IFoA records.' },
  { num: '4', title: 'Technical skills', body: 'Group by type: statistical / programming (R, Python, SQL), actuarial software (Prophet, Moses, ResQ), and office tools (Excel including VBA, Power BI). List only what you can defend in an interview.' },
  { num: '5', title: 'Work experience', body: 'Reverse chronological. Each bullet: an action verb, what you did, and a measurable result. Non-actuarial jobs still count — frame the transferable skills (accuracy under pressure, client handling, deadlines).' },
  { num: '6', title: 'Projects', body: 'Academic or personal projects that show actuarial thinking: a pricing model, a reserving exercise, a dissertation, a data competition. Say what you built, what tool you used, and what it showed.' },
  { num: '7', title: 'Extracurricular & leadership', body: 'Society committee roles, volunteering, sports captaincy. Graduate recruiters weight this more than people expect, especially where there’s a culture-fit interview stage.' }
];

const EXPERIENCED_TIPS = [
  'Lead with Experience, not Education — recruiters already know you’re part-qualified; show them what you’ve delivered.',
  'Group exams passed and exemptions in one "Qualifications" line near the top so progression is instantly clear.',
  'Each role’s bullets should show increasing scope or responsibility versus the role before it, not a flat list of duties.',
  'One and a half to two pages is fine once you have 2+ years of experience — don’t compress real achievements to force a one-pager.',
  'Name the business impact of your work (reserve movements, pricing changes, capital released), not just the task you did.'
];

const WRITING_TIPS = [
  'Start every bullet with an active verb — never "Responsible for" or "Involved in".',
  'One idea per bullet: what you did, how, and what changed because of it.',
  'Keep tense consistent — past tense for past roles, present tense only for what you do right now.',
  'Cut "I", "my" and "we" entirely — a CV bullet doesn’t need a subject.'
];

const BULLET_STARTERS = [
  'Built / developed / designed a [pricing model / reserving tool / dashboard] in [R / Python / Excel] that…',
  'Analysed [X years / X claims] of data to identify…, resulting in…',
  'Automated [a manual process] using [VBA / Python], cutting processing time by [X%].',
  'Presented findings on [topic] to [audience], informing a decision to…',
  'Collaborated with [team] to deliver [project] against a [deadline / constraint].',
  'Validated / reconciled [data or model output] against [benchmark], catching [X discrepancies].'
];

const ATS_TIPS = [
  'Keep it to one page for graduate and internship applications.',
  'Use a simple single-column layout and a standard font (Calibri, Arial, Georgia). Avoid tables, text boxes, graphics and icons — many ATS parsers mangle or skip them entirely.',
  'Mirror the exact keywords from the job description (“pricing”, “reserving”, “IFRS 17”, “Solvency II”, “capital modelling”) — most systems rank on keyword match before a person opens it.',
  'Submit whatever format the application asks for; if it doesn’t say, .docx tends to parse more reliably than PDF on older ATS platforms.',
  'Quantify wherever you can — “reduced model run-time by 30%” beats “improved a model”.',
  'Name the file FirstName-LastName-CV, not CV_final_v3.'
];

const MISTAKES = [
  'Vague exam progress (“studying towards fellowship”) instead of exact paper codes and status.',
  'Mixing up exams passed with exams exempted — recruiters and HR screens check this against IFoA records.',
  'Burying or omitting visa / right-to-work status, which gets CVs filtered out automatically at larger employers.',
  'A generic technical skills list that doesn’t match what’s actually been used, and can’t be defended at interview.',
  'Sending the same CV to every employer instead of re-ordering bullets and keywords to match each job description.',
  'Leaving visible white space at the bottom of the page — it reads as a thin CV even when the content is solid.'
];

const CV_TABS = [
  { key: 'grad', label: 'Graduate-level CV' },
  { key: 'exp', label: 'Experienced CV' },
  { key: 'tips', label: 'Resume tips' },
  { key: 'ats', label: 'ATS compliance' }
];

export default function CVTemplates() {
  const [activeTab, setActiveTab] = useState('grad');

  return (
    <>
      <Head>
        <title>CV Templates — Actuarial Guide</title>
        <meta name="description" content="A worked example actuarial CV with the structure, keywords and metrics that pass screening, plus graduate and experienced templates." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
      </Head>

      <div className="ag-topbar">
        <Link href="/" className="ag-logo">Actuarial<span>Guide</span></Link>
        <Link href="/" className="ag-back-link">← Back home</Link>
      </div>

      <div className="ag-cvpage">
        <div className="cv-hero">
          <h1>Proven CVs that <span className="cv-hero-accent">pass the initial screening</span>.</h1>
          <p className="ag-sub">Actuarial-specific structure, the right keywords, and quantified impact — built around what UK graduate schemes actually screen for.</p>
          <div className="cv-hero-cta">
            <a href="#cv-template-tabs" className="cv-cta-btn">See the templates →</a>
            <span className="cv-cta-note">ATS-friendly, built for actuarial screening.</span>
          </div>
        </div>

        <div className="cv-legend">
          <div className="cv-legend-item"><span className="cv-legend-dot cv-legend-edu"></span>Education, qualifications, exams</div>
          <div className="cv-legend-item"><span className="cv-legend-dot cv-legend-verb"></span>Action verbs</div>
          <div className="cv-legend-item"><span className="cv-legend-dot cv-legend-metric"></span>Metrics and specifics</div>
          <div className="cv-legend-item"><span className="cv-legend-dot cv-legend-tech"></span>Technical skills and tools</div>
        </div>

        <div className="cv-group" style={{ marginTop: 40 }}>
          <div className="cv-group-title">A worked example — graduate CV</div>

          <div className="cv-annotated-wrap">
            <div className="cv-annot cv-annot-left" style={{ gridRow: 2, gridColumn: 1 }}>
              <span className="cv-annot-text">Education</span><span className="cv-annot-arrow">→</span>
            </div>
            <div className="cv-annot cv-annot-left" style={{ gridRow: 4, gridColumn: 1 }}>
              <span className="cv-annot-text">Projects</span><span className="cv-annot-arrow">→</span>
            </div>

            <div className="cv-ex-section-row cv-ex-row-first" style={{ gridRow: 1, gridColumn: 2 }}>
              <div className="cv-ex-header">
                <h2>Name Surname</h2>
                <p className="cv-ex-contact">+44 7XXX XXXXXX &nbsp;|&nbsp; namesurname@email.com &nbsp;|&nbsp; linkedin.com/in/namesurname &nbsp;|&nbsp; London, UK</p>
              </div>
            </div>

            <div className="cv-ex-section-row" style={{ gridRow: 2, gridColumn: 2 }}>
              <h3>Education</h3>
              <div className="cv-ex-row">
                <div><strong>University of Nottingham</strong><br /><em><Hi c="edu">MSc Actuarial Science, Distinction</Hi></em></div>
                <span className="cv-ex-date">Sep 2024 – Sep 2025</span>
              </div>
              <div className="cv-ex-row" style={{ marginTop: 10 }}>
                <div><strong>Institute and Faculty of Actuaries</strong><br /><em><Hi c="edu">CS1, CM1, CB1, CB2 passed · CP1, CP2, CP3, SP7, SP8 exempt</Hi></em></div>
              </div>
              <p className="cv-ex-line" style={{ marginTop: 10 }}>Coursework: <Hi c="tech">Statistical Modelling (R)</Hi>, Financial Mathematics, Survival Models</p>
            </div>

            <div className="cv-annot cv-annot-right" style={{ gridRow: 1, gridColumn: 3 }}>
              <span className="cv-annot-arrow">←</span><span className="cv-annot-text">Personal info</span>
            </div>
            <div className="cv-annot cv-annot-right" style={{ gridRow: 3, gridColumn: 3 }}>
              <span className="cv-annot-arrow">←</span><span className="cv-annot-text">Experience</span>
            </div>
            <div className="cv-annot cv-annot-right" style={{ gridRow: 5, gridColumn: 3 }}>
              <span className="cv-annot-arrow">←</span><span className="cv-annot-text">Skills &amp; certifications</span>
            </div>

            <div className="cv-ex-section-row" style={{ gridRow: 3, gridColumn: 2 }}>
              <h3>Experience</h3>
              <div className="cv-ex-row">
                <div><strong>Aviva</strong> — Pricing Actuarial Intern</div>
                <span className="cv-ex-date">Jun 2025 – Aug 2025 · London</span>
              </div>
              <ul>
                <li><Hi c="verb">Built</Hi> a <Hi c="tech">GLM pricing model in R</Hi> across 3 product lines, cutting manual rating adjustments by <Hi c="metric">25%</Hi></li>
                <li><Hi c="verb">Automated</Hi> a monthly reserving reconciliation in <Hi c="tech">Excel/VBA</Hi>, saving the team roughly <Hi c="metric">6 hours a week</Hi></li>
                <li><Hi c="verb">Presented</Hi> loss-ratio findings to the senior pricing team, informing a Q3 rate change recommendation</li>
              </ul>
              <div className="cv-ex-row" style={{ marginTop: 14 }}>
                <div><strong>Kent Actuarial Society</strong> — Corporate Relations Officer</div>
                <span className="cv-ex-date">Sep 2024 – present</span>
              </div>
              <ul>
                <li><Hi c="verb">Secured</Hi> 4 new employer partnerships for society events, raising attendance by <Hi c="metric">40%</Hi></li>
                <li><Hi c="verb">Coordinated</Hi> speaker visits from 3 UK insurers, each with <Hi c="metric">80+</Hi> student attendees</li>
              </ul>
            </div>

            <div className="cv-ex-section-row" style={{ gridRow: 4, gridColumn: 2 }}>
              <h3>Projects</h3>
              <p className="cv-ex-line"><strong>Telematics Pricing Model</strong> (MSc dissertation) — <Hi c="tech">R, GLM</Hi></p>
              <ul>
                <li><Hi c="verb">Modelled</Hi> usage-based motor insurance pricing on <Hi c="metric">50,000+</Hi> simulated policies, validated against a held-out test set</li>
              </ul>
              <p className="cv-ex-line" style={{ marginTop: 10 }}><strong>Solvency Review of a Life Assurance Company</strong> — <Hi c="tech">Excel, cash-flow modelling</Hi></p>
              <ul>
                <li><Hi c="verb">Built</Hi> a <Hi c="metric">20-year</Hi> cash-flow projection to assess capital adequacy under two investment strategies</li>
              </ul>
            </div>

            <div className="cv-ex-section-row cv-ex-row-last" style={{ gridRow: 5, gridColumn: 2 }}>
              <h3>Skills &amp; Certifications</h3>
              <p className="cv-ex-line"><strong>Technical:</strong> <Hi c="tech">R, Python, SQL, Excel (incl. VBA), Power BI</Hi></p>
              <p className="cv-ex-line" style={{ marginTop: 8 }}><strong>Exams:</strong> <Hi c="edu">CS1, CM1, CB1, CB2 passed · CP1, CP2, CP3, SP7, SP8 exempt</Hi></p>
              <p className="cv-ex-line" style={{ marginTop: 8 }}><strong>Right to work:</strong> Full right to work in the UK, no sponsorship required</p>
            </div>
          </div>
        </div>

        <div className="cv-group" id="cv-template-tabs" style={{ marginTop: 56 }}>
          <div className="cv-group-title">Build your own</div>
          <div className="cv-tabbar" role="tablist">
            {CV_TABS.map((tab) => (
              <button
                key={tab.key}
                className={'cv-tabbtn' + (activeTab === tab.key ? ' active' : '')}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'grad' && (
            <div className="cv-tabpanel">
              <p className="ag-sub cv-panel-intro">Limited work experience is normal at this stage — lead with education and exam progress, and let your projects do the talking. Keep it to one page.</p>
              <div className="cv-section-grid">
                {CV_SECTIONS.map((s) => (
                  <div className="cv-section-card" key={s.num}>
                    <div className="cv-section-num">{s.num}</div>
                    <div><h3>{s.title}</h3><p>{s.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'exp' && (
            <div className="cv-tabpanel">
              <p className="ag-sub cv-panel-intro">Once you’re part-qualified with real work behind you, the CV should prove impact and progression, not potential.</p>
              <ul className="cv-list cv-list-good">
                {EXPERIENCED_TIPS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="cv-tabpanel">
              <p className="ag-sub cv-panel-intro">General writing habits, plus a phrasing bank for turning a task into a result-shaped bullet.</p>
              <ul className="cv-list cv-list-good" style={{ marginBottom: 28 }}>
                {WRITING_TIPS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <div className="cv-bullet-grid">
                {BULLET_STARTERS.map((b, i) => <div className="cv-bullet-card" key={i}>{b}</div>)}
              </div>
            </div>
          )}

          {activeTab === 'ats' && (
            <div className="cv-tabpanel">
              <p className="ag-sub cv-panel-intro">Most applications are read by software before they’re read by a person. These are the things that get a CV auto-rejected or mis-parsed.</p>
              <div className="cv-two-col">
                <ul className="cv-list cv-list-good">
                  {ATS_TIPS.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
                <ul className="cv-list cv-list-bad">
                  {MISTAKES.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
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
        ul{margin:0; padding:0;}

        .ag-topbar{display:flex; align-items:center; justify-content:space-between; padding-block:18px;}
        .ag-logo{font-family:var(--ag-font-display); font-weight:700; font-size:21px; text-decoration:none; color:var(--ag-ink);}
        .ag-logo span{color:var(--ag-accent);}
        .ag-back-link{font-family:var(--ag-font-mono); font-size:12.5px; font-weight:600; color:var(--ag-accent); text-decoration:none;}

        .ag-cvpage{padding-block:12px 70px;}
        .ag-cvpage > p.ag-sub{margin-top:10px; font-size:15px; max-width:640px;}

        .cv-hero h1{font-size:clamp(30px,4.4vw,44px); max-width:760px;}
        .cv-hero-accent{color:var(--ag-accent);}
        .cv-hero .ag-sub{margin-top:14px; font-size:15.5px; max-width:580px;}
        .cv-hero-cta{display:flex; align-items:center; flex-wrap:wrap; gap:14px; margin-top:22px;}
        .cv-cta-btn{display:inline-block; background:var(--ag-accent); color:#fff; font-family:var(--ag-font-mono); font-weight:600; font-size:13.5px; padding:13px 24px; border-radius:30px; text-decoration:none;}
        .cv-cta-note{font-family:var(--ag-font-mono); font-size:12px; color:var(--ag-muted);}

        .cv-legend{display:flex; flex-wrap:wrap; gap:12px 26px; margin-top:30px; font-size:12.5px; font-family:var(--ag-font-mono); color:var(--ag-ink);}
        .cv-legend-item{display:flex; align-items:center; gap:7px;}
        .cv-legend-dot{width:9px; height:9px; border-radius:50%; flex:none;}
        .cv-legend-edu{background:var(--ag-navy2);}
        .cv-legend-verb{background:var(--ag-purple);}
        .cv-legend-metric{background:var(--ag-accent);}
        .cv-legend-tech{background:var(--ag-gold);}

        .cv-group-title{font-family:var(--ag-font-mono); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--ag-accent); margin-bottom:16px;}

        .cv-hi{padding:1px 4px; border-radius:4px; font-weight:600;}
        .cv-hi-edu{background:rgba(68,87,107,.15); color:var(--ag-navy2);}
        .cv-hi-verb{background:rgba(91,76,107,.15); color:var(--ag-purple);}
        .cv-hi-metric{background:rgba(20,107,77,.14); color:var(--ag-accent);}
        .cv-hi-tech{background:rgba(184,134,46,.18); color:#7A5C1A;}

        .cv-annotated-wrap{display:grid; grid-template-columns:150px 1fr 150px; gap:0 18px; align-items:start;}
        .cv-annot{display:flex; align-items:center; gap:7px; padding-top:22px;}
        .cv-annot-left{justify-content:flex-end; text-align:right;}
        .cv-annot-right{justify-content:flex-start; text-align:left;}
        .cv-annot-arrow{color:var(--ag-accent); font-size:16px; font-weight:700; line-height:1;}
        .cv-annot-text{font-family:var(--ag-font-mono); font-weight:700; font-size:11px; letter-spacing:.03em; color:var(--ag-accent); text-transform:uppercase;}

        .cv-ex-section-row{background:var(--ag-surface); border-left:1.5px solid var(--ag-line); border-right:1.5px solid var(--ag-line); border-top:1px solid var(--ag-line); padding:20px 28px;}
        .cv-ex-row-first{border-top:1.5px solid var(--ag-line); border-radius:16px 16px 0 0; padding-top:30px; padding-bottom:22px;}
        .cv-ex-row-last{border-bottom:1.5px solid var(--ag-line); border-radius:0 0 16px 16px; padding-bottom:30px; box-shadow:0 14px 34px rgba(0,0,0,.06);}
        .cv-ex-header{text-align:center;}
        .cv-ex-header h2{font-size:25px;}
        .cv-ex-contact{font-size:12px; margin-top:8px; text-align:center;}
        .cv-ex-section-row h3{font-family:var(--ag-font-mono); font-style:normal; font-weight:700; font-size:11.5px; text-transform:uppercase; letter-spacing:.05em; color:var(--ag-accent); border-bottom:1.5px solid var(--ag-ink); padding-bottom:7px; margin-bottom:14px;}
        .cv-ex-row{display:flex; align-items:flex-start; justify-content:space-between; gap:12px; font-size:13.5px; color:var(--ag-ink);}
        .cv-ex-row strong{font-weight:700;}
        .cv-ex-row em{font-style:italic; color:var(--ag-muted); display:block; margin-top:2px;}
        .cv-ex-date{font-family:var(--ag-font-mono); font-size:11.5px; color:var(--ag-muted); white-space:nowrap; flex:none;}
        .cv-ex-line{font-size:13.5px; color:var(--ag-ink); line-height:1.6;}
        .cv-ex-section-row ul{list-style:none; margin-top:8px; display:flex; flex-direction:column; gap:7px;}
        .cv-ex-section-row li{position:relative; padding-left:16px; font-size:13.5px; color:var(--ag-ink); line-height:1.55;}
        .cv-ex-section-row li::before{content:"•"; position:absolute; left:0; color:var(--ag-accent); font-weight:700;}

        .cv-tabbar{display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px;}
        .cv-tabbtn{border:1.5px solid var(--ag-line); background:var(--ag-surface); color:var(--ag-ink); font-family:var(--ag-font-body); font-weight:600; font-size:13px; padding:10px 18px; border-radius:30px; cursor:pointer;}
        .cv-tabbtn.active{background:var(--ag-accent); border-color:var(--ag-accent); color:#fff;}

        .cv-panel-intro{text-align:left; max-width:680px; margin-bottom:24px;}

        .cv-section-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px;}
        .cv-section-card{display:flex; gap:14px; background:var(--ag-surface); border:1px solid var(--ag-line); border-radius:14px; padding:20px;}
        .cv-section-num{width:28px; height:28px; flex:none; border-radius:50%; border:1.5px solid var(--ag-accent); color:var(--ag-accent); font-family:var(--ag-font-mono); font-weight:600; font-size:12.5px; display:flex; align-items:center; justify-content:center;}
        .cv-section-card h3{font-size:15px; font-weight:600; font-style:normal; font-family:var(--ag-font-body); margin-bottom:5px;}
        .cv-section-card p{font-size:13.5px;}

        .cv-two-col{display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:32px;}

        .cv-list{list-style:none; display:flex; flex-direction:column; gap:11px;}
        .cv-list li{position:relative; padding-left:24px; font-size:13.5px; color:var(--ag-ink); line-height:1.5;}
        .cv-list li::before{position:absolute; left:0; top:0; font-family:var(--ag-font-mono); font-weight:700; font-size:13px;}
        .cv-list-good li::before{content:"✓"; color:var(--ag-accent);}
        .cv-list-bad li::before{content:"✕"; color:var(--ag-pink);}

        .cv-bullet-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:12px;}
        .cv-bullet-card{background:var(--ag-surface); border:1px solid var(--ag-line); border-radius:12px; padding:14px 16px; font-family:var(--ag-font-mono); font-size:12.5px; color:var(--ag-ink); line-height:1.5;}

        @media (max-width:860px){
          .cv-annotated-wrap{display:block;}
          .cv-annot{display:none;}
          .cv-ex-section-row{border-left:1.5px solid var(--ag-line); border-right:1.5px solid var(--ag-line);}
        }
        @media (max-width:640px){
          .ag-cvpage{padding-block:8px 50px;}
          .cv-ex-row{flex-direction:column; gap:3px;}
        }
      `}</style>
    </>
  );
}
