import { useState, useRef } from 'react';
import Head from 'next/head';
import JOBS from '../data/jobs';
import RADIAL from '../data/radial';
import INTERVIEW_BANKS from '../data/interviewBanks';

const NEWS_ITEMS = [
  { tag: 'IFoA', href: 'https://insurancebusinessmag.com/uk/news/breaking-news/institute-and-faculty-of-actuaries-picks-paul-lewis-as-ceo-510261.aspx', title: 'IFoA names Paul Lewis as its new CEO', body: "The Institute and Faculty of Actuaries has appointed Paul Lewis to lead the profession's governing body." },
  { tag: 'Exams', href: 'https://pwcplus.de/en/article/250315/ifoa-launches-eighth-edition-of-formulae-and-tables-book-ahead-of-2026-exams/', title: '8th edition of Formulae and Tables released', body: 'IFoA has published the updated Formulae and Tables book ahead of the 2026 exam sessions. Check which edition your exam permits before sitting.' },
  { tag: 'Events', href: 'https://actuaries.org.uk/learn/events/events-calendar', title: 'IFoA events calendar is open for upcoming sessions', body: "Webinars, CPD events and conferences are listed on the IFoA's own calendar, useful for networking before you qualify." },
  { tag: 'IFoA', href: 'https://www.actuaries.org.uk/', title: 'Council election and President-elect updates', body: 'The IFoA periodically runs Council elections and announces its incoming President-elect. Check the IFoA site for the current cycle.' },
  { tag: 'Exams', href: 'https://actuaries.org.uk/exam-news/april-2026-exam-booking-dates/', title: 'April 2026 exam booking dates published', body: 'IFoA has confirmed booking windows for the April 2026 session. Check your exact paper’s deadline before it closes.' },
  { tag: 'Syllabus', href: 'https://actuaries.org.uk/media/444hp2jy/2026-syllabus-changes.pdf', title: '2026 syllabus changes released', body: 'IFoA has published a document covering syllabus changes for 2026. Worth a read before you plan your revision.' },
  { tag: 'Students', href: 'https://actuaries.org.uk/qualify/student-and-associate-exam-news/', title: 'Student and Associate exam news hub', body: "IFoA's own running feed of newsletters and updates aimed directly at students sitting exams." },
  { tag: 'Strategy', href: 'https://www.actuarialpost.co.uk/article/ifoa-to-release-updated-strategy-9656.htm', title: 'IFoA to release updated 2026-2029 strategy', body: "The Institute and Faculty of Actuaries is rolling out a new multi-year strategy document shaping the profession's direction." }
];

const JOB_CARDS = [
  { key: 'gi', icon: '🛡️', name: 'General Insurance', desc: 'Pricing & reserving' },
  { key: 'life', icon: '❤️', name: 'Life Insurance', desc: 'Protection & savings' },
  { key: 'pensions', icon: '👴', name: 'Pensions', desc: 'Scheme funding' },
  { key: 'consulting', icon: '💼', name: 'Consulting', desc: 'EY, PwC, Deloitte' },
  { key: 'invest', icon: '📈', name: 'Investment & Banking', desc: 'Risk & quant roles' },
  { key: 're', icon: '🌍', name: 'Reinsurance', desc: 'Swiss Re, Munich Re' }
];

const PROVIDE_CARDS = [
  { dest: 'Browse Papers', icon: '📘', color: 'var(--accent)', title: 'Chapter-by-chapter notes', body: 'Clear, exam-focused notes for every chapter, written to get you to the key formulas and ideas fast.' },
  { dest: 'Mock Questions', icon: '✍️', color: 'var(--teal)', title: 'Practice & mock questions', body: 'Question banks mapped to the syllabus so you can test yourself chapter by chapter, not just at the end.' },
  { dest: 'Coding Practice', icon: '💻', color: 'var(--purple)', title: 'Coding practice', body: "R, Python, SQL, Excel and Power BI exercises, the technical skills exams don't test but every employer expects." },
  { dest: 'CV Templates', icon: '📄', color: 'var(--gold)', title: 'CV templates', body: 'Actuarial-specific CV formats and ATS tips, built from what graduate schemes actually screen for.' },
  { dest: 'Interview Prep', icon: '🎤', color: 'var(--pink)', title: 'Interview preparation', body: 'Behavioural, motivational, technical and case questions, with model answers and what interviewers check for.' },
  { dest: 'Job Listings', icon: '📋', color: 'var(--navy2)', title: 'Job listings', body: "Live actuarial graduate and part-qualified roles in one place, so you're not checking six different company career pages." }
];

const RADIAL_SLOTS = [
  { key: 'cp', slot: 'top', nc: 'var(--teal)', meta: 'pass all 7' },
  { key: 'sa', slot: 'left', nc: 'var(--pink)', meta: 'choose 1' },
  { key: 'cpr', slot: 'right', nc: 'var(--gold)', meta: 'pass all 3' },
  { key: 'sp', slot: 'bottom', nc: 'var(--purple)', meta: 'choose 2' }
];

const TABS = [
  { key: 'actuary', label: 'What is an actuary?' },
  { key: 'where', label: 'Where can an actuary work?' },
  { key: 'offer', label: 'What we offer' },
  { key: 'news', label: 'News' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('actuary');
  const [menuOpen, setMenuOpen] = useState(false);

  const [pathOpen, setPathOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(null);

  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [selectedJobKey, setSelectedJobKey] = useState(null);

  const [interviewOpen, setInterviewOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  function openJob(key) {
    setSelectedJobKey(key);
    setJobModalOpen(true);
  }
  function closeJobModal() {
    setJobModalOpen(false);
  }

  function toggleBranch(key) {
    setActiveBranch(function (prev) { return prev === key ? null : key; });
  }
  function closePathModal() {
    setPathOpen(false);
    setActiveBranch(null);
  }

  function openInterviewBank(key) {
    setSelectedPaper(key);
    setOpenQuestions({});
  }
  function closeInterviewBank() {
    setSelectedPaper(null);
  }
  function closeInterviewModal() {
    setInterviewOpen(false);
    setSelectedPaper(null);
  }

  function toggleQuestion(tierIdx, itemIdx) {
    var k = tierIdx + '-' + itemIdx;
    setOpenQuestions(function (prev) {
      var next = Object.assign({}, prev);
      next[k] = !next[k];
      return next;
    });
  }

  function showToast(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(function () { setToast(null); }, 1800);
  }

  function handleProvideClick(dest) {
    if (dest === 'Interview Prep') {
      setInterviewOpen(true);
      return;
    }
    showToast('→ Would open: ' + dest);
  }

  const selectedJob = selectedJobKey ? JOBS[selectedJobKey] : null;
  const branchData = activeBranch ? RADIAL[activeBranch] : null;
  const bank = selectedPaper ? INTERVIEW_BANKS[selectedPaper] : null;

  return (
    <>
      <Head>
        <title>Actuarial Guide Home</title>
        <meta name="description" content="Free IFoA actuarial exam prep: notes, mock questions, coding practice, CV templates, interview prep and job listings." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
      </Head>

      <div className="topbar">
        <div className="logo">Actuarial<span>Guide</span></div>
        <div className="menu-wrap">
          <button className="burger" aria-label="menu" onClick={() => setMenuOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
          {menuOpen && (
            <>
              <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
              <div className="menu-panel">
                <div className="menu-section-title">Browse</div>
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className="menu-item"
                    onClick={() => { setActiveTab(tab.key); setMenuOpen(false); }}
                  >
                    {tab.label}
                  </button>
                ))}
                <div className="menu-divider"></div>
                <div className="menu-section-title">What we offer</div>
                {PROVIDE_CARDS.map((card) => (
                  <button
                    key={card.dest}
                    className="menu-item"
                    onClick={() => { setMenuOpen(false); handleProvideClick(card.dest); }}
                  >
                    {card.title}
                  </button>
                ))}
                <div className="menu-divider"></div>
                <button
                  className="menu-item"
                  onClick={() => { setMenuOpen(false); setPathOpen(true); }}
                >
                  New here? See the actuarial path
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="hero">
        <h1>Welcome to <span>Actuarial Guide.</span></h1>
        <p>Most people never get this far. You&apos;ve already started, so let&apos;s get you exam ready.</p>
        <button className="path-link" onClick={() => setPathOpen(true)}>New here? See the actuarial path →</button>
      </div>

      <div className={'modal-backdrop' + (pathOpen ? ' open' : '')} onClick={(e) => { if (e.target === e.currentTarget) closePathModal(); }}>
        <div className="modal-box path-modal-box">
          <button className="modal-close" aria-label="Close" onClick={closePathModal}>×</button>
          <h3>The actuarial qualification</h3>
          <p className="radial-hint">On a small screen, scroll sideways to see the whole map →</p>

          <div className="radial-scroll">
            <div className="radial-grid">
              {RADIAL_SLOTS.map((node) => (
                <div key={node.key} className={'r-slot r-slot-' + node.slot}>
                  <button
                    className={'r-node' + (activeBranch === node.key ? ' open' : '')}
                    style={{ '--nc': node.nc }}
                    onClick={() => toggleBranch(node.key)}
                  >
                    <span className="r-node-title">{RADIAL[node.key].title}</span>
                    <span className="r-node-meta">{node.meta}</span>
                    <span className="r-node-hint">Tap to know more →</span>
                  </button>
                </div>
              ))}
              <div className="r-slot r-slot-center"><div className="r-hub">Actuarial<br />Qualification</div></div>
            </div>

            <div className={'r-children' + (activeBranch ? ' open' : '')}>
              {branchData && (
                <>
                  <div className="r-children-head">
                    <h4><span className="r-children-dot" style={{ background: branchData.color }}></span><span>{branchData.title}</span></h4>
                    <button className="r-children-close" aria-label="Close" onClick={() => setActiveBranch(null)}>×</button>
                  </div>
                  <div className="r-child-grid">
                    {branchData.children.map((child, i) => (
                      <div className="r-child" key={i}>
                        <div className="r-child-label">{child.label}</div>
                        <div className="mm-codes">
                          {child.codes.map((code) => (
                            <span className="mm-code" key={code}>{code}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="tips-list">
            <div className="tip"><div className="tip-dot"></div><div><strong>No fixed order</strong> — There&apos;s no required sequence for the papers.</div></div>
            <div className="tip"><div className="tip-dot"></div><div><strong>Two sittings a year</strong> — The IFoA runs exams twice a year, usually April and September, each with its own entry deadline.</div></div>
            <div className="tip"><div className="tip-dot"></div><div><strong>Where to start</strong> — If this is your first paper, start with CS1 or CM1. Once you&apos;re confident with that, pair it with CB1 or CB2 in the same sitting.</div></div>
            <div className="tip"><div className="tip-dot"></div><div><strong>Becoming an Associate (AIA)</strong> — All 10 Core papers (Core Principles + Core Practices), plus a minimum of 24 months on your Personal &amp; Professional Development (PPD) record.</div></div>
            <div className="tip"><div className="tip-dot"></div><div><strong>Becoming a Fellow (FIA)</strong> — 13 papers in total (Associate&apos;s 10, plus 2 Specialist Principles and 1 Specialist Advanced paper), plus 36 months on your PPD record and a Professional Skills Course.</div></div>
          </div>

          <p className="path-modal-note">Exam structure can change between syllabus years. Always confirm current requirements on actuaries.org.uk before planning your exam route.</p>
        </div>
      </div>

      <div className="tabbar" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={'tabbtn' + (activeTab === tab.key ? ' active' : '')}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className={'block panel' + (activeTab === 'actuary' ? ' active' : '')}>
        <h2>What does an actuary do?</h2>
        <p className="sub">An actuary applies maths, statistics and financial theory to measure and manage the financial risk of uncertain future events, mainly in insurance and pensions. The four things below cover most of what the job actually involves.</p>
        <div className="explain-grid">
          <div className="explain-item"><div className="explain-num">1</div><div><h3>Risk modelling</h3><p>Estimates the probability and cost of uncertain future events (death, illness, accidents, natural catastrophes) using statistical models built on real historical data.</p></div></div>
          <div className="explain-item"><div className="explain-num">2</div><div><h3>Pricing</h3><p>Sets insurance premiums and pension contribution rates. Price it too low and the provider can&apos;t pay claims; too high and it loses customers, so the number has to reflect the true underlying risk.</p></div></div>
          <div className="explain-item"><div className="explain-num">3</div><div><h3>Reserving and capital</h3><p>Calculates reserves, the money an insurer or pension scheme must hold today to pay claims or benefits owed years or decades from now, and confirms this meets the capital and solvency rules set by regulators.</p></div></div>
          <div className="explain-item"><div className="explain-num">4</div><div><h3>Communication</h3><p>Translates the modelling into advice a board, client or regulator can act on. Exams test the maths; the job itself is as much about explaining it clearly as calculating it.</p></div></div>
        </div>
        <p className="sub" style={{ marginTop: 28, fontSize: 13.5 }}>Like a chartered accountant, a qualified actuary holds a protected professional title and is bound by the IFoA&apos;s professional standards and code of conduct.</p>
      </section>

      <section className={'block panel' + (activeTab === 'where' ? ' active' : '')}>
        <h2>Industries and employers</h2>
        <div className="job-grid">
          {JOB_CARDS.map((card) => (
            <div className="job-card" key={card.key} onClick={() => openJob(card.key)}>
              <div className="job-icon" style={{ background: JOBS[card.key].color }}>{card.icon}</div>
              <div className="job-name">{card.name}</div>
              <div className="job-desc">{card.desc}</div>
              <div className="tap-hint">Tap to know more →</div>
            </div>
          ))}
        </div>
      </section>

      <div className={'modal-backdrop' + (jobModalOpen ? ' open' : '')} onClick={(e) => { if (e.target === e.currentTarget) closeJobModal(); }}>
        <div className="modal-box">
          <button className="modal-close" aria-label="Close" onClick={closeJobModal}>×</button>
          {selectedJob && (
            <>
              <div className="modal-icon" style={{ background: selectedJob.color }}>{selectedJob.icon}</div>
              <h3>{selectedJob.title}</h3>
              <p>{selectedJob.body}</p>
              <div className="modal-row"><span>Typical employers</span><strong>{selectedJob.employers}</strong></div>
              <div className="modal-row"><span>Relevant exams</span><strong>{selectedJob.exams}</strong></div>
            </>
          )}
        </div>
      </div>

      <div className={'modal-backdrop' + (interviewOpen ? ' open' : '')} onClick={(e) => { if (e.target === e.currentTarget) closeInterviewModal(); }}>
        <div className="modal-box interview-modal-box">
          <button className="modal-close" aria-label="Close" onClick={closeInterviewModal}>×</button>
          <h3>Interview Prep</h3>
          <p className="path-modal-sub">Pick a paper to open its question bank</p>

          <div className="iv-paper-grid" style={{ display: selectedPaper ? 'none' : 'flex' }}>
            {['cb1', 'cb2', 'cm1', 'cs1'].map((key) => (
              <button className="iv-paper-card" key={key} onClick={() => openInterviewBank(key)}>
                <div className="iv-paper-code">{INTERVIEW_BANKS[key].code}</div>
                <div className="iv-paper-name">{INTERVIEW_BANKS[key].name}</div>
                <div className="iv-paper-count">100 questions, 4 tiers</div>
              </button>
            ))}
            <div className="iv-paper-card iv-paper-soon">
              <div className="iv-paper-code">More papers</div>
              <div className="iv-paper-name">Coming soon</div>
              <div className="iv-paper-count">CB3, CM2, CS2 and more</div>
            </div>
          </div>

          <div className={'iv-bank' + (selectedPaper ? ' open' : '')}>
            <button className="iv-back" onClick={closeInterviewBank}>← All papers</button>
            {bank && (
              <>
                <h4>{bank.code} — {bank.name}</h4>
                <p className="iv-bank-sub">{bank.note}</p>
                <div>
                  {bank.tiers.map((tier, tierIdx) => (
                    <div className="iv-tier" key={tierIdx}>
                      <div className="iv-tier-title">{tier.name}</div>
                      {tier.items.map((item, itemIdx) => {
                        const k = tierIdx + '-' + itemIdx;
                        const isOpen = !!openQuestions[k];
                        return (
                          <div className={'iv-q' + (isOpen ? ' open' : '')} key={itemIdx}>
                            <button className="iv-q-head" type="button" onClick={() => toggleQuestion(tierIdx, itemIdx)}>
                              <span>{item.q}</span>
                              <span className="iv-q-chevron">▸</span>
                            </button>
                            <div className="iv-q-body"><p>{item.a}</p></div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <section className={'block panel' + (activeTab === 'offer' ? ' active' : '')}>
        <h2>What Actuarial Guide gives you</h2>
        <p className="sub">Everything built around one goal: passing your next exam</p>
        <div className="provide-grid">
          {PROVIDE_CARDS.map((card) => (
            <div className="provide-card" key={card.dest} onClick={() => handleProvideClick(card.dest)}>
              <div className="provide-icon" style={{ background: card.color }}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
        <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>
      </section>

      <section className={'block panel' + (activeTab === 'news' ? ' active' : '')}>
        <h2>Actuarial news &amp; exam updates</h2>
        <p className="sub">What&apos;s happening in the profession right now</p>
        <div className="news-grid">
          {NEWS_ITEMS.map((item) => (
            <a className="news-card" href={item.href} target="_blank" rel="noopener noreferrer" key={item.href}>
              <div className="news-tag">{item.tag}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </a>
          ))}
        </div>
        <p className="news-note">Links go to real, current sources. On the live site this section pulls automatically, no manual editing needed once it&apos;s wired up.</p>
      </section>

      <footer>
        <span>Actuarial Guide: built for actuarial exam students</span>
        <span>Not affiliated with the Institute and Faculty of Actuaries</span>
      </footer>

      <style jsx global>{`
        :root{
          --bg:#FAF9F5; --surface:#ffffff; --ink:#15171C; --muted:#6B7280;
          --accent:#146B4D; --accent-ink:#ffffff;
          --teal:#2E3A59; --pink:#B5563B; --gold:#B8862E; --purple:#5B4C6B; --navy2:#44576B;
          --line:#E3E1DA;
          --font-display:'Newsreader',Georgia,serif; --font-body:'Inter',system-ui,sans-serif; --font-mono:'IBM Plex Mono',ui-monospace,monospace;
          color-scheme:light;
        }
        *{box-sizing:border-box;}
        html{background-color:var(--bg) !important;}
        body{
          background-color:var(--bg) !important;
          color:var(--ink) !important; font-family:var(--font-body); margin:0; padding-inline:16px;
        }
        h1,h2,h3{font-family:var(--font-display); font-style:italic; font-weight:500; text-wrap:balance; margin:0; color:var(--ink) !important;}
        p{line-height:1.55; color:var(--muted); margin:0;}
        .wrap{max-width:1080px; margin:0 auto;}
        .mono{font-family:var(--font-mono); font-style:normal;}

        .topbar{display:flex; align-items:center; justify-content:space-between; padding-block:18px; max-width:1080px; margin:0 auto;}
        .logo{font-family:var(--font-display); font-weight:700; font-size:21px;}
        .logo span{color:var(--accent);}
        .burger{width:38px; height:38px; border-radius:50%; background:var(--surface); border:1px solid var(--line); display:flex; align-items:center; justify-content:center; gap:4px; flex-direction:column; cursor:pointer;}
        .burger span{display:block; width:14px; height:2px; background:var(--ink);}
        .menu-wrap{position:relative;}
        .menu-overlay{position:fixed; inset:0; background:transparent; z-index:55;}
        .menu-panel{position:absolute; top:48px; right:0; width:240px; background:var(--surface); border:1.5px solid var(--accent); border-radius:16px; padding:10px; box-shadow:0 14px 34px rgba(0,0,0,.14); z-index:56; display:flex; flex-direction:column;}
        .menu-section-title{font-family:var(--font-mono); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--accent); padding:8px 8px 4px;}
        .menu-item{display:block; width:100%; text-align:left; background:transparent; border:none; padding:9px 8px; border-radius:9px; font-family:var(--font-body); font-size:13.5px; font-weight:500; color:var(--ink); cursor:pointer;}
        .menu-item:hover{background:var(--bg);}
        .menu-divider{height:1px; background:var(--line); margin:6px 4px;}

        .hero{max-width:1080px; margin:0 auto; padding-block:28px 48px; text-align:center;}
        .eyebrow{display:inline-flex; align-items:center; gap:7px; background:var(--ink); color:#fff; font-family:var(--font-mono); font-weight:500; font-size:12px; padding:7px 14px 7px 10px; border-radius:30px; margin-bottom:20px;}
        .eyebrow::before{content:"✓"; color:var(--accent); font-weight:700;}
        .hero h1{font-size:clamp(34px,5vw,48px); font-weight:500;}
        .hero h1 span{color:var(--accent); text-decoration:underline; text-decoration-thickness:2px; text-underline-offset:8px; text-decoration-color:var(--accent);}
        .hero p{max-width:480px; margin:16px auto 24px; font-size:16px; font-style:normal;}
        .path-link{background:transparent; color:var(--ink); border:1.3px solid var(--ink); font-family:var(--font-mono); font-weight:500; font-size:13.5px; padding:10px 18px; border-radius:30px; cursor:pointer;}

        .tabbar{max-width:560px; margin:0 auto; display:flex; gap:6px; background:transparent; border:none; border-radius:14px; padding:5px; overflow-x:auto;}
        .tabbtn{flex:1; white-space:nowrap; border:1.5px solid var(--accent); background:transparent; color:var(--muted); font-family:var(--font-body); font-weight:600; font-size:13px; padding:10px 10px; border-radius:10px; cursor:pointer;}
        .tabbtn.active{background:var(--accent); color:#fff;}

        section.block{max-width:1080px; margin:0 auto; padding-block:36px 44px;}
        section.block.panel{border:3px solid var(--accent); border-radius:18px; background:var(--surface); padding:36px 28px 44px; margin-top:22px;}
        section.block h2{font-size:28px; font-weight:500; text-align:center; position:relative; display:inline-block; left:50%; transform:translateX(-50%);}
        section.block h2::after{content:""; display:block; width:46px; height:2px; background:var(--accent); margin:14px auto 0;}
        section.block > p.sub{text-align:center; margin:18px auto 0; max-width:520px; font-size:15px;}
        .panel{display:none;}
        .panel.active{display:block; animation:fade .25s ease;}
        @keyframes fade{from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);}}

        .explain-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:22px; margin-top:34px;}
        .explain-item{display:flex; gap:14px;}
        .explain-num{width:30px; height:30px; flex:none; border-radius:50%; border:1.5px solid var(--accent); color:var(--accent); font-family:var(--font-mono); font-weight:600; font-size:13px; display:flex; align-items:center; justify-content:center;}
        .explain-item h3{font-size:16px; font-weight:600; font-style:normal; font-family:var(--font-body); margin-bottom:5px;}
        .explain-item p{font-size:14px;}

        .job-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:16px; margin-top:32px;}
        .job-card{background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:22px 18px; cursor:pointer; transition:transform .15s;}
        .job-card:hover{transform:translateY(-3px);}
        .job-icon{width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:19px; margin-bottom:14px;}
        .job-name{font-weight:600; font-size:15px; font-family:var(--font-body); font-style:normal;}
        .job-desc{font-size:13px; margin-top:4px;}
        .tap-hint{font-size:12px; color:var(--accent); margin-top:10px; font-weight:600;}

        .news-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:16px; margin-top:32px;}
        .news-card{background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:20px; display:block; text-decoration:none;}
        .news-date{font-family:var(--font-mono); font-size:11px; color:var(--muted); margin-bottom:10px; display:block;}
        .news-tag{display:inline-block; font-family:var(--font-mono); font-size:10.5px; font-weight:600; letter-spacing:.03em; text-transform:uppercase; background:var(--accent); color:#fff; padding:3px 10px; border-radius:20px; margin-bottom:12px;}
        .news-card h3{font-size:15.5px; margin-bottom:8px; font-weight:600; font-family:var(--font-body); font-style:normal;}
        .news-card p{font-size:13.5px;}
        .news-note{text-align:center; font-size:12px; margin-top:22px;}

        .provide-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:18px; margin-top:34px;}
        .provide-card{background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:24px; cursor:pointer; transition:transform .15s,box-shadow .15s;}
        .provide-card:hover{transform:translateY(-3px); box-shadow:0 10px 24px rgba(0,0,0,.08);}
        .provide-icon{width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; margin-bottom:14px;}
        .provide-card h3{font-size:16px; margin-bottom:8px; font-weight:600; font-family:var(--font-body); font-style:normal;}
        .provide-card p{font-size:13.5px;}

        footer{text-align:center; padding-block:30px 40px; font-size:12px; color:var(--muted); display:flex; flex-direction:column; gap:4px;}

        .modal-backdrop{position:fixed; inset:0; background:rgba(21,23,28,0.5); display:none; align-items:center; justify-content:center; padding:20px; z-index:50;}
        .modal-backdrop.open{display:flex;}
        .modal-box{background:var(--surface); border-radius:18px; padding:30px; max-width:380px; width:100%; position:relative; max-height:85vh; overflow-y:auto;}
        .modal-close{position:absolute; top:14px; right:14px; width:30px; height:30px; border-radius:50%; border:1px solid var(--line); background:transparent; font-size:18px; color:var(--muted); cursor:pointer; line-height:1;}
        .modal-icon{width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:16px;}
        .modal-box h3{font-size:21px; margin-bottom:10px; font-style:italic;}
        .modal-box > p{font-size:14.5px; margin-bottom:18px;}
        .modal-row{display:flex; flex-direction:column; gap:3px; padding-block:12px; border-top:1px solid var(--line); font-size:13px;}
        .modal-row span{color:var(--muted); font-family:var(--font-mono); font-size:11px; text-transform:uppercase; letter-spacing:.03em;}
        .modal-row strong{font-weight:600; font-size:14px;}

        .path-modal-box{max-width:720px;}
        .path-modal-box h3{font-size:22px; margin-bottom:6px;}
        .path-modal-sub{font-size:13.5px; margin-bottom:22px;}
        .path-steps{display:flex; flex-direction:column; gap:18px;}
        .path-step{display:flex; gap:14px;}
        .path-step-dot{width:9px; height:9px; margin-top:6px; flex:none; border-radius:50%; background:var(--accent);}
        .path-step h4{font-size:14.5px; font-weight:600; font-family:var(--font-body); font-style:normal; margin-bottom:4px;}
        .path-step p{font-size:13px;}
        .path-divider{height:1px; background:var(--line); margin:30px 0 24px;}

        .radial-hint{font-size:11.5px; color:var(--muted); text-align:center; margin-bottom:16px;}
        .radial-scroll{overflow-x:auto; padding:6px 2px 4px;}
        .radial-grid{
          min-width:560px; max-width:600px; margin:0 auto;
          display:grid;
          grid-template-columns:1fr auto 1fr;
          grid-template-rows:auto auto auto;
          align-items:center; justify-items:center;
          gap:34px;
        }
        .r-slot{position:relative; display:flex; justify-content:center;}
        .r-slot-top{grid-column:2; grid-row:1;}
        .r-slot-left{grid-column:1; grid-row:2;}
        .r-slot-center{grid-column:2; grid-row:2;}
        .r-slot-right{grid-column:3; grid-row:2;}
        .r-slot-bottom{grid-column:2; grid-row:3;}
        .r-slot-top::after,.r-slot-bottom::after{content:""; position:absolute; left:50%; width:2px; height:34px; background:var(--line); transform:translateX(-50%); z-index:0;}
        .r-slot-top::after{bottom:-34px;} .r-slot-bottom::after{top:-34px;}
        .r-slot-left::after,.r-slot-right::after{content:""; position:absolute; top:50%; width:34px; height:2px; background:var(--line); transform:translateY(-50%); z-index:0;}
        .r-slot-left::after{right:-34px;} .r-slot-right::after{left:-34px;}
        .r-hub{width:116px; height:116px; border-radius:50%; background:var(--ink); color:#fff; display:flex; align-items:center; justify-content:center; text-align:center; font-family:var(--font-body); font-weight:700; font-size:13.5px; line-height:1.25; padding:10px; position:relative; z-index:1; box-shadow:0 0 0 6px var(--bg);}
        .r-node{font-family:var(--font-body); border:none; cursor:pointer; border-radius:16px; padding:14px 16px; width:148px; text-align:center; color:#fff; background:var(--nc); display:flex; flex-direction:column; gap:3px; transition:transform .15s,box-shadow .15s; position:relative; z-index:1;}
        .r-node:hover{transform:translateY(-2px);}
        .r-node.open{box-shadow:0 0 0 3px var(--ink);}
        .r-node-title{font-weight:600; font-size:13px; line-height:1.25;}
        .r-node-meta{font-family:var(--font-mono); font-size:10.5px; opacity:.85;}
        .r-node-hint{font-size:10px; font-weight:600; opacity:.9; margin-top:3px;}
        .r-children{display:none; margin-top:26px; background:var(--surface); border:1.5px solid var(--accent); border-radius:16px; padding:18px 20px;}
        .r-children.open{display:block; animation:fade .2s ease;}
        .r-children-head{display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;}
        .r-children-head h4{font-size:14.5px; font-weight:600; font-family:var(--font-body); font-style:normal; display:flex; align-items:center; gap:8px;}
        .r-children-dot{width:9px; height:9px; border-radius:50%; flex:none;}
        .r-children-close{border:none; background:transparent; color:var(--muted); font-size:18px; cursor:pointer; line-height:1;}
        .r-child-grid{display:flex; flex-wrap:wrap; gap:10px;}
        .r-child{background:var(--bg); border:1px solid var(--line); border-radius:12px; padding:9px 11px; flex:1 1 128px; min-width:118px;}
        .r-child-label{font-size:11.5px; font-weight:600; color:var(--ink); margin-bottom:7px; line-height:1.3;}
        .mm-codes{display:flex; flex-wrap:wrap; gap:5px;}
        .mm-code{font-family:var(--font-mono); font-size:10.5px; font-weight:600; color:var(--accent); background:var(--surface); border:1px solid var(--line); padding:3px 7px; border-radius:6px;}

        .tips-list{display:flex; flex-direction:column; gap:12px; margin-top:26px; border:1.5px solid var(--accent); border-radius:14px; padding:16px 18px; background:rgba(20,107,77,0.045);}
        .tip{display:flex; gap:10px; font-size:13.5px; align-items:flex-start;}
        .tip-dot{width:7px; height:7px; border-radius:50%; background:var(--accent); flex:none; margin-top:6px;}
        .tip strong{color:var(--ink); font-weight:600;}

        .path-modal-note{font-size:11.5px; margin-top:22px; padding-top:16px; border-top:1px solid var(--line);}

        .interview-modal-box{max-width:680px;}
        .iv-paper-grid{display:flex; gap:14px; margin-top:24px; flex-wrap:wrap;}
        .iv-paper-card{background:var(--surface); border:1.5px solid var(--line); border-radius:14px; padding:18px 20px; cursor:pointer; text-align:left; flex:1 1 160px; min-width:150px; transition:transform .15s,border-color .15s; font-family:var(--font-body);}
        .iv-paper-card:hover{transform:translateY(-2px); border-color:var(--accent);}
        .iv-paper-code{font-family:var(--font-mono); font-weight:700; font-size:15px; color:var(--accent); margin-bottom:4px;}
        .iv-paper-name{font-size:13.5px; font-weight:600; color:var(--ink); margin-bottom:6px;}
        .iv-paper-count{font-size:11.5px; color:var(--muted);}
        .iv-paper-soon{opacity:.5; cursor:default;}
        .iv-paper-soon:hover{transform:none; border-color:var(--line);}
        .iv-bank{display:none; margin-top:10px;}
        .iv-bank.open{display:block;}
        .iv-back{border:none; background:transparent; color:var(--accent); font-family:var(--font-mono); font-size:12.5px; font-weight:600; cursor:pointer; padding:0; margin-bottom:16px;}
        .iv-bank h4{font-size:18px; margin-bottom:4px;}
        .iv-bank-sub{font-size:13px; margin-bottom:6px;}
        .iv-tier-title{font-family:var(--font-mono); font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--accent); margin:22px 0 8px;}
        .iv-tier:first-of-type .iv-tier-title{margin-top:18px;}
        .iv-q{border-bottom:1px solid var(--line);}
        .iv-q-head{width:100%; text-align:left; background:transparent; border:none; cursor:pointer; padding:11px 0; font-family:var(--font-body); font-size:13.5px; font-weight:600; color:var(--ink); display:flex; justify-content:space-between; gap:10px; align-items:flex-start;}
        .iv-q-chevron{flex:none; color:var(--accent); font-size:12px; transition:transform .15s; margin-top:2px;}
        .iv-q.open .iv-q-chevron{transform:rotate(90deg);}
        .iv-q-body{display:none; padding:0 0 14px; font-size:13px; color:var(--muted); line-height:1.55;}
        .iv-q.open .iv-q-body{display:block;}

        .toast{position:fixed; left:50%; bottom:26px; transform:translateX(-50%) translateY(10px); background:var(--ink); color:#fff; font-family:var(--font-mono); font-size:12.5px; padding:11px 18px; border-radius:30px; opacity:0; pointer-events:none; transition:opacity .2s, transform .2s; z-index:60; white-space:nowrap;}
        .toast.show{opacity:1; transform:translateX(-50%) translateY(0);}

        @media (max-width:640px){
          section.block{padding-block:24px 34px;}
        }
      `}</style>
    </>
  );
}
