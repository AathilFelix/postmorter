import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google"; // 👈 1. Import Google Provider
import { generateObject } from "ai";
import { z } from "zod";
import { saveOrUpdateReport } from "@/lib/store";

// ✅ 1. Define the Schema (Matches your frontend props)
const PostmortemSchema = z.object({
  incident_head: z.string().describe("Short heading of the incident"),
  severity: z.enum(["SEV-1", "SEV-2", "SEV-3"]),
  incident_summary: z.string().describe("What happened and when."),
  impact: z.object({
    affected_services: z.array(z.string()),
    user_impact: z.string().describe("User-facing impact description."),
    duration: z.string().describe("Time from start to resolution."),
  }),
  timeline: z.array(
    z.object({
      time: z.string().describe("HH:MM 24hr format"),
      event: z.string().describe("One sentence description"),
    })
  ),
  root_cause: z.string().describe("Best-effort inference of the cause."),
  action_items: z.array(
    z.object({
      heading: z.string().describe("4-5 word heading"),
      description: z.string().describe("2 sentences describing the item"),
      team: z.enum(["backend", "sre", "platform"]),
      priority: z.enum(["High", "Medium", "Low"]),
    })
  ),
});

export async function POST() {
  console.log("🚀 Simulation Triggered: Hybrid Mode");

  // --- 2. GENERATE "JUICY" LOGS (For Datadog & Local Context) ---
  const logs = [];
  const now = Date.now();

  const errorScenarios = [
    {
      msg: "Timeout waiting for connection from pool",
      type: "DB_POOL_EXHAUSTED",
    },
    {
      msg: "Transaction 4921 rolled back due to deadlock",
      type: "DB_DEADLOCK",
    },
    { msg: "upstream request timeout", type: "HTTP_504" },
  ];

  for (let i = 0; i < 30; i++) {
    const timeOffset = i * 10000;
    const historicDate = new Date(now - timeOffset).toISOString();
    const error =
      errorScenarios[Math.floor(Math.random() * errorScenarios.length)];

    logs.push({
      service: "ai-postmortem-app",
      env: "hackathon",
      timestamp: historicDate,
      duration_ms: 15200 + Math.random() * 2000,
      model: "gemini-2.5-flash-lite",
      status: "error",
      ddsource: "nextjs",
      message: `[Error] ${error.msg}`,
      error: { kind: error.type },
    });
  }

  // A. Send to Datadog (Background - Fire & Forget)
  fetch("https://http-intake.logs.us5.datadoghq.com/api/v2/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "DD-API-KEY": process.env.DATADOG_API_KEY!,
    },
    body: JSON.stringify(logs),
  }).catch((e) => console.error("Datadog Upload Failed (Non-critical):", e));

  // B. Generate Report IMMEDIATELY (Foreground)
  try {
    const { object: postmortemReport } = await generateObject({
      // 👇 2. Change Model to Google Gemini
      model: google("gemini-2.0-flash"),
      schema: PostmortemSchema,
      prompt: `
        You are an SRE. Generate a Postmortem based on these logs.
        
        DATA:
        - Incident: High Latency / Database Errors
        - Time: ${new Date().toISOString()}
        - Logs: ${JSON.stringify(logs).slice(0, 10000)}

        GUIDELINES:
        1. Root Cause: Cite specific errors like "DB_POOL_EXHAUSTED" from the logs.
        2. Action Items: Assign to 'backend', 'sre', or 'platform'.
        3. Be concise and professional.
      `,
    });

    // Save as PRELIMINARY (true)
    saveOrUpdateReport(postmortemReport, true);

    console.log("✅ Immediate Report Generated");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ AI Generation Failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
