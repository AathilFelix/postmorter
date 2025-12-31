import { NextResponse } from "next/server";
import { saveOrUpdateReport } from "@/lib/store";
import { google } from "@ai-sdk/google"; // ✅ Using Google Provider
import { generateObject } from "ai";
import { z } from "zod";

// 1. Define the Schema
const PostmortemSchema = z.object({
  incident_head: z.string(),
  severity: z.enum(["SEV-1", "SEV-2", "SEV-3"]),
  incident_summary: z.string(),
  impact: z.object({
    affected_services: z.array(z.string()),
    user_impact: z.string(),
    duration: z.string(),
  }),
  timeline: z.array(z.object({ time: z.string(), event: z.string() })),
  root_cause: z.string(),
  action_items: z.array(
    z.object({
      heading: z.string(),
      description: z.string(),
      team: z.enum(["backend", "sre", "platform"]),
      priority: z.enum(["High", "Medium", "Low"]),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const alertData = await req.json();
    console.log("🚨 Webhook received (Late Verify).");

    // 2. Generate Report using Google Gemini
    const { object: postmortemReport } = await generateObject({
      model: google("gemini-2.5-flash"), // 👈 Changed to Google Gemini
      schema: PostmortemSchema,
      prompt: `
        You are verifying an existing incident.
        Alert: "${alertData.alert_title}"
        Message: "${alertData.raw_message}"
        
        Generate a confirmation Postmortem.
        Assume Root Cause is "Database Pool Exhaustion" based on previous analysis.
      `,
    });

    // Save as VERIFIED (false) -> Updates the preliminary one
    saveOrUpdateReport(postmortemReport, false);

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Webhook Error:", error); // Added logging for debugging
    return NextResponse.json({ status: "ignored" });
  }
}
