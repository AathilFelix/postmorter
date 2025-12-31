from fastapi import APIRouter
from typing import Dict

router = APIRouter()

@router.post("/generate-postmortem")
def generate_postmortem(incident: Dict):
    return {
        "mode": "simulated",
        "postmortem": {
            "summary": "Simulated postmortem generated from incident data.",
            "impact": "Latency and error rates were elevated.",
            "timeline": [
                {
                    "timestamp": e["timestamp"],
                    "event": e["message"]
                }
                for e in incident.get("events", [])
            ],
            "root_cause": "Root cause could not be definitively determined.",
            "action_items": []
        }
    }
