import { NextResponse } from "next/server";
import { LLMLog } from "@/lib/logSchema";

export async function POST() {
  const start = Date.now();

  // simulate LLM work
  await new Promise(r => setTimeout(r, 1200));

  const log: LLMLog = {
    incident_id: "inc_demo",
    request_id: crypto.randomUUID(),
    latency_ms: Date.now() - start,
    token_usage: 950,
    model_name: "gemini-2.0-flash",
    error: false,
    mode: "simulated"
  };

  // 👇 THIS is the important part
  console.log(JSON.stringify(log));

  return NextResponse.json({ ok: true });
}
