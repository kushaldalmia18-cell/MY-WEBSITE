import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { QUESTIONS, NOTES } from "../data/questions";

export default function Home() {
  const [tab, setTab] = useState("study");

  return (
    <div className="wrap">
      <Head>
        <title>IFoA Prep — AI Tutor, Notes & Mock Exams</title>
      </Head>
      <h1>IFoA Prep</h1>
      <div className="tag">AI tutor, notes and question bank for IFoA exam students.</div>

      <div className="tabs">
        {[
          ["study", "Study"],
          ["ai", "Ask AI"],
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
      {tab === "ai" && <AiTab />}
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

function AiTab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  async function send() {
    const question = input.trim();
    if (!question || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, subject: "General" }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong." }]);
      }
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Network error — try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <div className="chat-box" ref={boxRef}>
        {messages.length === 0 && (
          <div className="msg ai">Ask me anything about your IFoA syllabus.</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={"msg " + (m.role === "user" ? "user" : "ai")}>
            {m.content}
          </div>
        ))}
        {loading && <div className="msg ai">Thinking...</div>}
      </div>
      <div className="chat-input-row">
        <textarea
          rows={2}
          value={input}
          placeholder="e.g. Why does immunisation require convexity?"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button className="btn" onClick={send} disabled={loading}>
          Ask
        </button>
      </div>
    </div>
  );
}
