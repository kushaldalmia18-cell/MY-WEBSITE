import Head from "next/head";
import { useState } from "react";
import { INTRO, CHAPTERS, NOTES, QUESTIONS } from "../data/questions";

export default function Home() {
  const [tab, setTab] = useState("chapters");
  const [selectedChapter, setSelectedChapter] = useState(1);

  function goToChapterNotes(n) {
    setSelectedChapter(n);
    setTab("notes");
  }

  return (
    <div className="wrap">
      <Head>
        <title>CS1 Prep — IFoA Actuarial Statistics</title>
      </Head>

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
        <NotesTab selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter} />
      )}
      {tab === "practice" && <PracticeTab />}

      <footer>
        <span>CS1 Prep — built for IFoA students</span>
        <span>Not affiliated with the Institute and Faculty of Actuaries</span>
      </footer>
    </div>
  );
}

function ChaptersTab({ onSelect }) {
  return (
    <div>
      {CHAPTERS.map((c) => (
        <div key={c.n} className="toc-entry" onClick={() => onSelect(c.n)}>
          <span className="toc-num">{c.n < 10 ? "0" + c.n : c.n}</span>
          <span className="toc-title">{c.title}</span>
        </div>
      ))}
    </div>
  );
}

function NotesTab({ selectedChapter, setSelectedChapter }) {
  const chapterNum = selectedChapter || 1;
  const note = NOTES[chapterNum];
  return (
    <div className="page">
      <select
        className="page-select"
        value={chapterNum}
        onChange={(e) => setSelectedChapter(Number(e.target.value))}
      >
        {CHAPTERS.map((c) => (
          <option key={c.n} value={c.n}>
            {c.n}. {c.title}
          </option>
        ))}
      </select>
      <h2>
        {chapterNum}. {note.title}
      </h2>
      <p>{note.body}</p>
    </div>
  );
}

function PracticeTab() {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null);
  const q = QUESTIONS[idx];

  function choose(i) {
    if (answered) return;
    setChosen(i);
    setAnswered(true);
  }
  function next() {
    setAnswered(false);
    setChosen(null);
    setIdx((idx + 1) % QUESTIONS.length);
  }

  return (
    <div className="q-card">
      <span className="q-progress">
        {idx + 1} / {QUESTIONS.length}
      </span>
      <span className="q-topic">{q.topic}</span>
      <p className="q-text">{q.text}</p>
      {q.options.map((o, i) => {
        let cls = "opt";
        if (answered && i === q.correct) cls += " correct";
        else if (answered && i === chosen) cls += " incorrect";
        return (
          <div key={i} className={cls} onClick={() => choose(i)}>
            {o}
          </div>
        );
      })}
      {answered && <div className="explain">{q.explain}</div>}
      {answered && (
        <button className="cta" style={{ marginTop: 14 }} onClick={next}>
          Next question
        </button>
      )}
    </div>
  );
}
