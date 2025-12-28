export type LLMLog = {
  incident_id: string;
  request_id: string;
  latency_ms: number;
  token_usage: number;
  model_name: string;
  error: boolean;
  mode: "live" | "simulated";
};
