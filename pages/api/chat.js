import Anthropic from "@anthropic-ai/sdk";

// This key lives on the SERVER only. It is never sent to the browser.
// Set it in your hosting provider's environment variables (see README).
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a patient, precise actuarial science tutor helping a student
preparing for IFoA exams (CM1, CM2, CS1, CS2, CB1, CB2, CB3, CP1-3, SP/SA papers).
Explain concepts clearly with intuition first, then technical detail. Use worked examples
where useful. Keep answers focused and exam-relevant. Do not reproduce or quote IFoA Core
Reading or past exam papers verbatim -- explain everything in your own words. If a question
is outside actuarial science, answer briefly and redirect back to exam topics.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, subject } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  // Basic guardrails: cap history length and message size to control cost/abuse.
  const trimmed = messages.slice(-20).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 4000),
  }));

  try {
    const contextLine =
      subject && subject !== "General"
        ? `The student is currently focused on subject ${subject}. `
        : "";

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT + " " + contextLine,
      messages: trimmed,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return res.status(200).json({ reply: textBlock ? textBlock.text : "" });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return res.status(500).json({ error: "AI request failed. Try again shortly." });
  }
}
