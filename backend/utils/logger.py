import json
from datetime import datetime

def log_event(event: dict):
    print(json.dumps({
        "service": "llm-postmortem",
        **event,
        "timestamp": datetime.utcnow().isoformat()
    }))

