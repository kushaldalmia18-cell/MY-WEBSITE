import Head from "next/head";
import { useState } from "react";
import { QUESTIONS, NOTES } from "../data/questions";

export default function Home() {
  const [tab, setTab] = useState("study");

  return (
    <div className="wrap">
      <Head>
        <title>IFoA Prep — Notes & Mock Exams</title>
      </Head>
      <h1>IFoA Prep</h1>
      <div className="tag">Free question bank and notes for IFoA exam students.</div>

      <div className="tabs">
        {[
          ["study", "Study"],
          ["notes", "Notes"],
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

      {tab === "study" && <StudyTab />}
      {tab === "notes" && <NotesTab />}
    </div>
  );
}

function StudyTab() {
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
      <span className="q-topic">
        {q.subject} · {q.topic}
      </span>
      <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>{q.text}</p>
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

function NotesTab() {
  const subjects = Object.keys(NOTES);
  const [subject, setSubject] = useState(subjects[0]);
  return (
    <div className="panel">
      <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ marginBottom: 16 }}>
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {NOTES[subject].map((n, i) => (
        <div className="note-topic" key={i}>
          <h3>{n.topic}</h3>
          <p>{n.body}</p>
        </div>
      ))}
    </div>
  );
}
