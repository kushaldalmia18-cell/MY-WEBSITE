import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import INTERVIEW_BANKS from '../data/interviewBanks';

const PAPER_KEYS = ['cb1', 'cb2', 'cm1', 'cs1'];

export default function InterviewPrep() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

  function openBank(key) {
    setSelectedPaper(key);
    setOpenQuestions({});
  }
  function closeBank() {
    setSelectedPaper(null);
  }
  function toggleQuestion(tierIdx, itemIdx) {
    const k = tierIdx + '-' + itemIdx;
    setOpenQuestions((prev) => {
      const next = Object.assign({}, prev);
      next[k] = !next[k];
      return next;
    });
  }

  const bank = selectedPaper ? INTERVIEW_BANKS[selectedPaper] : null;

  return (
    <>
      <Head>
        <title>Interview Prep — Actuarial Guide</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
      </Head>

      <div className="ag-topbar">
        <Link href="/" className="ag-logo">Actuarial<span>Guide</span></Link>
        <Link href="/" className="ag-back-link">← Back home</Link>
      </div>

      <div className="ag-ivpage">
        <h1>Interview Prep</h1>
        <p className="ag-sub">
          {selectedPaper ? 'Work through each tier, tap a question to reveal the model answer.' : 'Pick a paper to open its question bank'}
        </p>

        {!selectedPaper && (
          <div className="iv-paper-grid">
            {PAPER_KEYS.map((key) => (
              <button className="iv-paper-card" key={key} onClick={() => openBank(key)}>
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
        )}

        {selectedPaper && bank && (
          <div className="iv-bank-page">
            <button className="iv-back" onClick={closeBank}>← All papers</button>
            <h2>{bank.code} — {bank.name}</h2>
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
          </div>
        )}
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

        .ag-ivpage{padding-block:20px 60px;}
        .ag-ivpage h1{font-size:34px;}
        .ag-ivpage > p.ag-sub{margin-top:10px; font-size:15px;}

        .iv-paper-grid{display:flex; gap:14px; margin-top:28px; flex-wrap:wrap;}
        .iv-paper-card{background:var(--ag-surface); border:1.5px solid var(--ag-line); border-radius:14px; padding:18px 20px; cursor:pointer; text-align:left; flex:1 1 200px; min-width:180px; transition:transform .15s,border-color .15s; font-family:var(--ag-font-body);}
        .iv-paper-card:hover{transform:translateY(-2px); border-color:var(--ag-accent);}
        .iv-paper-code{font-family:var(--ag-font-mono); font-weight:700; font-size:16px; color:var(--ag-accent); margin-bottom:4px;}
        .iv-paper-name{font-size:14px; font-weight:600; color:var(--ag-ink); margin-bottom:6px;}
        .iv-paper-count{font-size:12px; color:var(--ag-muted);}
        .iv-paper-soon{opacity:.5; cursor:default;}
        .iv-paper-soon:hover{transform:none; border-color:var(--ag-line);}

        .iv-bank-page{margin-top:24px; background:var(--ag-surface); border:3px solid var(--ag-accent); border-radius:18px; padding:30px 28px 36px;}
        .iv-back{border:none; background:transparent; color:var(--ag-accent); font-family:var(--ag-font-mono); font-size:12.5px; font-weight:600; cursor:pointer; padding:0; margin-bottom:18px; display:block;}
        .iv-bank-page h2{font-size:24px; margin-bottom:6px; font-style:italic;}
        .iv-bank-sub{font-size:13.5px; margin-bottom:6px;}
        .iv-tier-title{font-family:var(--ag-font-mono); font-size:11.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--ag-accent); margin:24px 0 8px;}
        .iv-tier:first-of-type .iv-tier-title{margin-top:18px;}
        .iv-q{border-bottom:1px solid var(--ag-line);}
        .iv-q-head{width:100%; text-align:left; background:transparent; border:none; cursor:pointer; padding:12px 0; font-family:var(--ag-font-body); font-size:14px; font-weight:600; color:var(--ag-ink); display:flex; justify-content:space-between; gap:10px; align-items:flex-start;}
        .iv-q-chevron{flex:none; color:var(--ag-accent); font-size:12px; transition:transform .15s; margin-top:3px;}
        .iv-q.open .iv-q-chevron{transform:rotate(90deg);}
        .iv-q-body{display:none; padding:0 0 16px; font-size:13.5px; color:var(--ag-muted); line-height:1.6;}
        .iv-q.open .iv-q-body{display:block;}

        @media (max-width:640px){
          .ag-ivpage{padding-block:16px 40px;}
          .iv-bank-page{padding:22px 18px 28px;}
        }
      `}</style>
    </>
  );
}
