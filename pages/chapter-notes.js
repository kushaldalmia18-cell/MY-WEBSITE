import Head from 'next/head';
import Link from 'next/link';

const PAPER_GROUPS = [
  {
    title: 'Core Principles',
    papers: [
      { code: 'CS1', name: 'Actuarial Statistics 1' },
      { code: 'CS2', name: 'Actuarial Statistics 2' },
      { code: 'CM1', name: 'Actuarial Mathematics 1' },
      { code: 'CM2', name: 'Actuarial Mathematics 2' },
      { code: 'CB1', name: 'Business Finance' },
      { code: 'CB2', name: 'Business Economics' },
      { code: 'CB3', name: 'Business Management' }
    ]
  },
  {
    title: 'Core Practices',
    papers: [
      { code: 'CP1', name: 'Actuarial Practice' },
      { code: 'CP2', name: 'Modelling Practice' },
      { code: 'CP3', name: 'Communications Practice' }
    ]
  },
  {
    title: 'Specialist Principles',
    papers: [
      { code: 'SP1', name: 'Health and Care' },
      { code: 'SP2', name: 'Life Insurance' },
      { code: 'SP4', name: 'Pensions and Other Benefits' },
      { code: 'SP5', name: 'Investment and Finance' },
      { code: 'SP6', name: 'Financial Derivatives' },
      { code: 'SP7', name: 'General Insurance — Reserving and Capital Modelling' },
      { code: 'SP8', name: 'General Insurance — Pricing' },
      { code: 'SP9', name: 'Enterprise Risk Management' }
    ]
  },
  {
    title: 'Specialist Advanced',
    papers: [
      { code: 'SA1', name: 'Health and Care' },
      { code: 'SA2', name: 'Life Insurance' },
      { code: 'SA3', name: 'General Insurance' },
      { code: 'SA4', name: 'Pensions and Other Benefits' },
      { code: 'SA7', name: 'Enterprise Risk Management' }
    ]
  }
];

export default function ChapterNotes() {
  return (
    <>
      <Head>
        <title>Chapter-by-chapter notes — Actuarial Guide</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
      </Head>

      <div className="ag-topbar">
        <Link href="/" className="ag-logo">Actuarial<span>Guide</span></Link>
        <Link href="/" className="ag-back-link">← Back home</Link>
      </div>

      <div className="ag-notespage">
        <h1>Chapter-by-chapter notes</h1>
        <p className="ag-sub">We&apos;re writing clear, exam-focused notes for every paper, chapter by chapter. Here&apos;s the full syllabus — notes are coming soon across the board.</p>

        {PAPER_GROUPS.map((group) => (
          <div className="cn-group" key={group.title}>
            <div className="cn-group-title">{group.title}</div>
            <div className="cn-grid">
              {group.papers.map((paper) => (
                <div className="cn-card" key={paper.code}>
                  <div className="cn-badge">Coming soon</div>
                  <div className="cn-code">{paper.code}</div>
                  <div className="cn-name">{paper.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
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

        .ag-notespage{padding-block:20px 60px;}
        .ag-notespage h1{font-size:34px;}
        .ag-notespage > p.ag-sub{margin-top:10px; font-size:15px; max-width:620px;}

        .cn-group{margin-top:34px;}
        .cn-group-title{font-family:var(--ag-font-mono); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--ag-accent); margin-bottom:14px;}
        .cn-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px;}
        .cn-card{position:relative; background:var(--ag-surface); border:1.5px solid var(--ag-line); border-radius:14px; padding:18px 20px 16px; opacity:.6;}
        .cn-badge{position:absolute; top:14px; right:14px; font-family:var(--ag-font-mono); font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.03em; background:var(--ag-bg); color:var(--ag-muted); padding:3px 8px; border-radius:20px; border:1px solid var(--ag-line);}
        .cn-code{font-family:var(--ag-font-mono); font-weight:700; font-size:16px; color:var(--ag-accent); margin-bottom:4px; padding-right:72px;}
        .cn-name{font-size:13.5px; font-weight:600; color:var(--ag-ink);}

        @media (max-width:640px){
          .ag-notespage{padding-block:16px 40px;}
          .cn-badge{position:static; display:inline-block; margin-bottom:8px;}
          .cn-code{padding-right:0;}
        }
      `}</style>
    </>
  );
}
