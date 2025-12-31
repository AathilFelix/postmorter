import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

// ✅ Updated Interface to match your new Schema
export interface AIReport {
  incident_head: string;
  incident_summary: string;
  severity: "SEV-1" | "SEV-2" | "SEV-3";
  impact: {
    affected_services: string[];
    user_impact: string;
    duration: string;
  };
  root_cause: string;
  timeline: { time: string; event: string }[];
  action_items: {
    heading: string;
    description: string;
    team: string;
    priority: string;
  }[];
}

export interface PostmortemEntry {
  id: string;
  date: string;
  status: string;
  report: AIReport;
}

function readData(): PostmortemEntry[] {
  if (!fs.existsSync(DB_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch (error) {
    return [];
  }
}

function writeData(data: PostmortemEntry[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getAllReports() {
  return readData();
}

export function getLatestReport() {
  return readData()[0] || null;
}

export function getReportById(id: string) {
  const reports = readData();
  const cleanId = id.replace("Inc ", "").trim();
  return reports.find((r) => r.id === cleanId) || null;
}

// ✅ THE CRITICAL UPDATE LOGIC
export function saveOrUpdateReport(report: AIReport, isPreliminary: boolean) {
  const reports = readData();
  const latest = reports[0]; // The one at the top of the stack

  // CONDITION 1: WEBHOOK UPDATE (Real Data)
  // If this comes from Datadog (isPreliminary = false) AND the latest report is waiting for verification...
  if (!isPreliminary && latest && latest.status === "Preliminary Analysis") {
    console.log(
      `🔄 UPDATING Incident ${latest.id} with Verified Datadog Evidence`
    );

    // Overwrite the generic AI guess with the Real Evidence report
    reports[0].report = report;
    reports[0].status = "Verified by Datadog"; // ✅ Change status

    writeData(reports);
    return; // Stop here. Do not create a new file.
  }

  // CONDITION 2: NEW INCIDENT (User clicked Simulate)
  // Generate a new ID (e.g., 060)
  const lastId = reports.length > 0 ? parseInt(reports[0].id) : 44;
  const newId = String(lastId + 1).padStart(3, "0");

  const newEntry: PostmortemEntry = {
    id: newId,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: isPreliminary ? "Preliminary Analysis" : "Resolved",
    report: report,
  };

  reports.unshift(newEntry); // Add to top
  writeData(reports);
  console.log(`💾 CREATED New Incident ${newEntry.id}`);
}
