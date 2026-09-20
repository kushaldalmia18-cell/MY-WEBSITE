import Head from "next/head";
import { useState } from "react";
import { INTRO, CHAPTERS, NOTES, QUESTIONS } from "../data/questions";

export default function Home() {
  const [tab, setTab] = useState("intro");
  const [selectedChapter, setSelectedChapter] = useState(null);

  function goToChapterNotes(n) {
    setSelectedChapter(n);
    setTab("notes");
  }

  return (
    <div className="wrap">
      <Head>
        <title>CS1 Prep — IFoA Actuarial Statistics</title>
      </Head>
      <h1>{INTRO.title}</h1>
      <div className="tag">A free, chapter-by-chapter CS1 study companion.</div>

      <div className="tabs">
        {[
          ["intro", "Introduction"],
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

      {tab === "intro" && <IntroTab />}
      {tab === "chapters" && <ChaptersTab onSelect={goToChapterNotes} />}
      {tab === "notes" && (
        <NotesTab selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter} />
      )}
      {tab === "practice" && <PracticeTab />}
    </div>
  );
}

function IntroTab() {
  return (
    <div className="panel">
      <p style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>{INTRO.body}</p>
    </div>
  );
}

function ChaptersTab({ onSelect }) {
  return (
    <div className="panel">
      <div style={{ fontWeight: 700, marginBottom: 12 }}>CS1 — full chapter list</div>
      {CHAPTERS.map((c) => (
        <div
          key={c.n}
          className="note-topic"
          style={{ cursor: "pointer", borderBottom: "1px solid var(--border)", paddingBottom: 10 }}
          onClick={() => onSelect(c.n)}
        >
          <h3 style={{ margin: 0 }}>
            {c.n}. {c.title}
          </h3>
        </div>
      ))}
      <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: 12 }}>
        Click any chapter to jump straight to its notes.
      </div>
    </div>
  );
}

function NotesTab({ selectedChapter, setSelectedChapter }) {
  const chapterNum = selectedChapter || 1;
  const note = NOTES[chapterNum];
  return (
    <div className="panel">
      <select
        value={chapterNum}
        onChange={(e) => setSelectedChapter(Number(e.target.value))}
        style={{ marginBottom: 16 }}
      >
        {CHAPTERS.map((c) => (
          <option key={c.n} value={c.n}>
            {c.n}. {c.title}
          </option>
        ))}
      </select>
      <div className="note-topic">
        <h3>
          {chapterNum}. {note.title}
        </h3>
        <p>{note.body}</p>
      </div>
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
    <div className="panel">
      <span className="q-topic">{q.topic}</span>
      <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: 6 }}>
        Question {idx + 1} of {QUESTIONS.length}
      </div>
      <p style={{ fontSize: "1rem", lineHeight: 1.5, marginTop: 10 }}>{q.text}</p>
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
        <button className="btn" style={{ marginTop: 14 }} onClick={next}>
          Next question
        </button>
      )}
    </div>
  );
}
