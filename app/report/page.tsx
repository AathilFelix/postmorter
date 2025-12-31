import Navbar from "@/components/Navbar";
import IncidentBody from "@/components/report/IncidentBody";
import IncidentHeader from "@/components/report/IncidentHeader";
import React from "react";
import { getLatestReport, getReportById } from "@/lib/store";

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

const ReportPage = async ({ searchParams }: PageProps) => {
  // const entry = getLatestReport();
  const params = await searchParams;
  let entry;
  if (params.id) {
    entry = getReportById(params.id);
  } else {
    entry = getLatestReport();
  }

  if (!entry) {
    return (
      <main>
        <Navbar />
        <div className="mt-20 text-center">No report found.</div>
      </main>
    );
  }
  const { report } = entry;
  const formattedImpact = [
    { label: "User Impact", description: report.impact.user_impact },
    {
      label: "Affected Services",
      description: report.impact.affected_services.join(", "),
    },
    { label: "Duration", description: report.impact.duration },
  ];

  const formattedTimeline = report.timeline.map((t) => ({
    time: t.time.includes("T")
      ? new Date(t.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : t.time,
    text: t.event,
  }));

  const formattedActions = report.action_items.map((a: any) => ({
    // 1. Heading: Try new 'heading', fallback to old 'task'
    heading: a.heading || a.task || "Action Item",

    // 2. Content: Try new 'description', fallback to "Assigned to {owner}"
    content:
      a.description ||
      (a.owner ? `Assigned to ${a.owner}` : "No details provided"),

    // 3. Team: Try new 'team', fallback to old 'owner' or default
    team: a.team || a.owner || "unassigned",

    priority: a.priority,
  }));
  return (
    <main>
      <Navbar id={entry.id} />
      <div className="min-h-screen max-w-212 mx-auto flex flex-col gap-25 mt-15">
        <IncidentHeader
          id={entry.id}
          incident={report.incident_summary}
          date={entry.date}
          duration={report.impact.duration}
        />
        <IncidentBody
          summary={report.incident_summary}
          impact={formattedImpact}
          timeline={formattedTimeline}
          rootCause={report.root_cause}
          actionItems={formattedActions}
          isNoObservability={false}
          isAIUnavailable={false}
        />
      </div>
    </main>
  );
};

export default ReportPage;
