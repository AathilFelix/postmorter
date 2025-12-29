from pathlib import Path

def build_prompt(data: dict) -> str:
    template = Path("prompts/postmortem.txt").read_text()

    return (
        template
        .replace("{{incident_id}}", str(data.get("incident_id")))
        .replace("{{latency_ms}}", str(data.get("latency_ms")))
        .replace("{{token_usage}}", str(data.get("token_usage")))
        .replace("{{error}}", str(data.get("error")))
        .replace(
            "{{incident_logs_if_available}}",
            data.get("logs", "No logs provided")
        )
        .replace("{{mode}}", data.get("mode"))
    )
