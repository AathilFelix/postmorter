export type LogEntry = {
  incident_id?: string;
  latency_ms?: number;
  token_usage?: number;
  is_error?: boolean;
  timestamp?: string;
};

export type MetricPoint = {
  metric: string;
  value: number;
};

export function buildNormalizedIncident(
  logs: LogEntry[],
  metrics: MetricPoint[]
) {
  // ---- NO DATA CASE ----
  if (!logs || logs.length === 0) {
    return {
      incident: { id: "unknown", source: "datadog" },

      impact: {
        requests_total: 0,
        errors_total: 0,
        error_rate: "unknown",
      },

      timeline: {},

      signals: {
        latency: {
          avg_ms: "unknown",
          max_ms: "unknown",
          baseline: "unknown",
        },

        errors: { total: 0 },

        tokens: {
          avg: "unknown",
          total: "unknown",
        },
      },
    };
  }

  // ---- INCIDENT ID ----
  const incidentId =
    logs.find((l) => l.incident_id)?.incident_id ?? "unknown";

  // ---- LATENCY ----
  const latencies = logs
    .map((l) => l.latency_ms)
    .filter((x): x is number => typeof x === "number");

  const avgLatency =
    latencies.length > 0
      ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
      : "unknown";

  const maxLatency =
    latencies.length > 0 ? Math.max(...latencies) : "unknown";

  // ---- TOKENS ----
  const tokens = logs
    .map((l) => l.token_usage)
    .filter((x): x is number => typeof x === "number");

  const avgTokens =
    tokens.length > 0
      ? Math.round(tokens.reduce((a, b) => a + b, 0) / tokens.length)
      : "unknown";

  const totalTokens =
    tokens.length > 0 ? tokens.reduce((a, b) => a + b, 0) : "unknown";

  // ---- METRICS (REQUEST + ERROR COUNTS) ----
  const requests = metrics.find(
    (m) => m.metric === "llm.request.count"
  )?.value;

  const errors = metrics.find(
    (m) => m.metric === "llm.error.count"
  )?.value;

  let errorRate: string | number = "unknown";

  if (requests !== undefined && errors !== undefined) {
    errorRate =
      requests === 0
        ? "0%"
        : ((errors / requests) * 100).toFixed(2) + "%";
  }

  return {
    incident: {
      id: incidentId,
      source: "datadog",
    },

    impact: {
      requests_total: requests ?? "unknown",
      errors_total: errors ?? "unknown",
      error_rate: errorRate,
    },

    timeline: {}, // we will fill later

    signals: {
      latency: {
        avg_ms: avgLatency,
        max_ms: maxLatency,
        baseline: "unknown",
      },

      errors: {
        total: errors ?? 0,
      },

      tokens: {
        avg: avgTokens,
        total: totalTokens,
      },
    },
  };
}
