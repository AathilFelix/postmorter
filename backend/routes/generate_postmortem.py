from fastapi import APIRouter
from services.postmortem_service import generate_postmortem
from utils.logger import log_event

router = APIRouter()

@router.post("/generate-postmortem")
async def generate(request: dict):
    result = await generate_postmortem(request)

    log_event({
        "incident_id": request.get("incident_id"),
        "mode": result["mode"],
        "latency_ms": request.get("latency_ms"),
        "token_usage": request.get("token_usage"),
        "error": request.get("error")
    })

    return result
