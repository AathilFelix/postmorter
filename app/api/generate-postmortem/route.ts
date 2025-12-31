import { NextResponse } from "next/server";
import { LLMLog } from "@/lib/logSchema";

export async function POST() {
  const start = Date.now();

  // 1. DEFINE MISSING VARIABLES (Mock Data for Simulation)
  const model_name = "gemini-2.5-flash-lite";
  const messages = [{ role: "user", content: "This is a test trigger for Datadog." }];
  const aiText = "This is a simulated AI response.";
  const usage = { prompt: 120, completion: 80, total: 200 };

  // simulate work (latency)
  await new Promise((r) => setTimeout(r, 1200));

  // 2. CALCULATE DURATION
  const duration = Date.now() - start;

  const log = {
    service: "llm-postmortem-app",
    env: "hackathon",
    request_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),

    // Metrics (Now these variables exist)
    latency_ms: duration,
    tokens_prompt: usage.prompt,
    tokens_completion: usage.completion,
    tokens_total: usage.total,

    // Context for Postmortem
    model_name: model_name,
    user_prompt_snapshot: messages?.[messages.length - 1]?.content || "No message found",
    ai_response_snapshot: aiText,

    status: "success",
    is_error: false,

    
    token_usage: 950,
   
    error: false,
    mode: "simulated"

  };

  console.log("API key length:", process.env.DATADOG_API_KEY?.length);

  // 👉 SEND TO DATADOG (US5)
  const ddRes = await fetch(
    "https://http-intake.logs.us5.datadoghq.com/api/v2/logs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "DD-API-KEY": process.env.DATADOG_API_KEY!,
      },
      body: JSON.stringify([
        {
          ...log,
          // Optional: Add specific tags for easier filtering in Datadog
          ddsource: "nextjs", 
          ddtags: "env:hackathon,team:ai-hackathon"
        },
      ]),
    }
  );

  // We await text() to see the error message if it fails
  console.log("Datadog status:", ddRes.status, await ddRes.text());

  return NextResponse.json({ ok: true });
}
