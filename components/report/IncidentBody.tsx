import React from 'react'
import TextBody from '@/components/ui/TextBody';
import TimeLine from '@/components/ui/TimeLine';
import ActionItem from '@/components/ui/ActionItem';
import HeadsUp from '@/components/ui/HeadsUp';


const impactItems = [
  {
    label: "User Impact",
    description:
      "Approximately 15-18% of production requests failed or experienced significant latency, resulting in slow responses and intermittent timeouts for end users.",
  },
  {
    label: "Availability & SLA",
    description:
      "Service availability dropped to approximately 92-93% for a 30–45 minute window, resulting in SLA breaches for multiple enterprise customers in the APAC region.",
  },
  {
    label: "Internal Impact",
    description:
      "Downstream analytics processing and customer support workflows were temporarily delayed during the incident.",
  },
  {
    label: "Data Integrity",
    description:
      "No data loss occurred. All failed or incomplete transactions were safely rolled back.",
  },
];

const TimelineItems = [
  {
    time: "14:00",
    text: "Elevated P99 latency detected and alert triggered",
  },
  {
    time: "14:05",
    text: "Incident acknowledged; investigation began",
  },
  {
    time: "14:15",
    text: "Recent configuration change identified as a potential contributor",
  },
  {
    time: "14:22",
    text: "Rollback and traffic rebalancing initiated",
  },
  {
    time: "14:35",
    text: "Manual mitigation completed; latency began returning to baseline",
  },
  {
    time: "14:45",
    text: "Metrics stabilized and incident marked as resolved",
  },
];

const ActionItems = [
  {
    heading: "Harden traffic routing during configuration changes",
    content:
      "Prevent uneven traffic distribution across availability zones during load balancer or mesh updates.",
    team: "platform-team",
    priority: "High",
  },
  {
    heading: "Decouple deployments from autoscaling and rollback mechanisms",
    content:
      "Ensure deployments cannot block automated scaling or rollback during incidents.",
    team: "platform",
    priority: "High",
  },
  {
    heading: "Improve rollback safety for critical infrastructure changes",
    content: "Improve rollback safety for critical infrastructure changes.",
    team: "sre",
    priority: "Medium",
  },
  {
    heading: "Add guardrails for database lock contention",
    content:
      "Detect and limit sustained database lock pressure before it impacts request latency.",
    team: "backend",
    priority: "Medium",
  },
  {
    heading: "Refine latency alerting and ownership",
    content:
      "Ensure sustained latency regressions are detected and routed quickly.",
    team: "platform-team",
    priority: "Low",
  },
];

interface IncidentBodyProps {
  isNoObservability ?: boolean;
  isAIUnavailable ?: boolean;
  isBothUnavailable ?: boolean;
}


const IncidentBody = ({
  isNoObservability,
  isAIUnavailable,
  isBothUnavailable,
}: IncidentBodyProps) => {

  const bothUnavailable = isNoObservability && isAIUnavailable;

  return (
    <div>
      {isNoObservability && isAIUnavailable ? (
        <div className="mb-5">
          <HeadsUp
            message="Observability data and AI summarization were unavailable during this incident window. No postmortem analysis could be generated."
            requireLogo={false}
          />
        </div>
      ) : isNoObservability ? (
        <div className="mb-5">
          <HeadsUp
            message="Some observability data was unavailable during this incident window. This postmortem was generated from partial logs and metrics."
            requireLogo={false}
          />
        </div>
      ) : isAIUnavailable ? (
        <div className="mb-5">
          <HeadsUp
            message="The postmortem could not be generated due to a summarization failure. Raw incident data was available, but no narrative analysis was produced."
            requireLogo={false}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-25">
        <div className="flex flex-col gap-17.5">
          <TextBody
            heading="Incident Summary"
            content={
              bothUnavailable
                ? "Incident summary could not be generated."
                : isAIUnavailable
                ? "Incident summary could not be generated."
                : "At approximately 14:00 UTC, the primary inference platform experienced a significant latency spike, with P99 latency increasing by over 300%. This resulted in degraded performance and timeout errors for a portion of production traffic, particularly affecting real-time requests in the Asia-Pacific region. The incident occurred during a scheduled configuration change and was resolved after rollback actions restored normal system behaviour."
            }
            variant="default"
          />
          <section className="flex flex-col ">
            <TextBody
              heading="Impact"
              content={
                bothUnavailable || isAIUnavailable
                  ? "Impact analysis could not be generated."
                  : undefined
              }
              variant={
                isNoObservability && !isAIUnavailable ? "warning" : "default"
              }
              {...(isNoObservability &&
                !isAIUnavailable && {
                  warningText:
                    "Impact assessment is based on partial availability and error data.",
                })}
            />
            {!(bothUnavailable || isAIUnavailable) && (
              <ul className="list-disc space-y-3 pl-6 text-justify">
                {impactItems.map((item) => (
                  <li key={item.label}>
                    <span className="font-bold">{item.label}:</span>{" "}
                    {item.description}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="flex flex-col gap-2.5">
            <TextBody
              heading="Timeline"
              content={
                bothUnavailable
                  ? "Timeline could not be generated."
                  : isAIUnavailable
                  ? "Timeline could not be generated due to AI unavailability."
                  : undefined
              }
              variant={
                isNoObservability && !isAIUnavailable ? "warning" : "default"
              }
              {...(isNoObservability &&
                !isAIUnavailable && {
                  warningText:
                    "Some events may be missing due to unavailable observability data",
                })}
            />
            {!(bothUnavailable || isAIUnavailable) && (
              <div>
                {TimelineItems.map((timeline) => (
                  <TimeLine
                    key={timeline.time}
                    time={timeline.time}
                    text={timeline.text}
                  />
                ))}
              </div>
            )}
          </section>
          <section>
            <TextBody
              heading="Root Cause"
              variant={bothUnavailable || isAIUnavailable ? "default" : "info"}
              isNoObservability={isNoObservability}
              content={
                bothUnavailable
                  ? "Root cause analysis could not be generated. No inferred analysis was produced."
                  : isAIUnavailable
                  ? "Root cause analysis could not be generated due to AI unavailability. No inferred analysis was produced."
                  : "Based on available logs and configuration data, the incident was likely triggered by a misconfiguration introduced during the v2 service mesh deployment. An EnvoyFilter change intended to add tracing headers appears to have interfered with keep-alive connections to the backend pool, increasing connection overhead and contributing to elevated request latency under load."
              }
            />
          </section>
          <section className="border-t border-[#00000033]"></section>
          <section className="flex flex-col gap-5">
            <h1 className="text-xl font-semibold">Action items</h1>
            {bothUnavailable ? (
              <div>
                Action items could not be generated. No inferred analysis was
                produced.
              </div>
            ) : isAIUnavailable ? (
              <div>
                Action items could not be generated due to AI unavailability. No
                inferred analysis was produced.
              </div>
            ) : (
              ActionItems.map((action) => (
                <ActionItem
                  key={action.heading}
                  heading={action.heading}
                  priority={action.priority}
                  content={action.content}
                  team={action.team}
                />
              ))
            )}
          </section>
        </div>
        <footer className="text-[14px] text-center">
          Report generated by Postmortor · Internal use only · Confidential
        </footer>
      </div>
    </div>
  );
};

export default IncidentBody