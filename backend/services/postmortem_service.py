import json
from services.prompt_builder import build_prompt
from services.gemini_client import call_gemini
from utils.json_validator import is_valid_postmortem
from mock.simulated_postmortem import SIMULATED_POSTMORTEM


async def generate_postmortem(data: dict) -> dict:
    try:
        prompt = build_prompt({**data, "mode": "live"})
        raw = await call_gemini(prompt)
        parsed = json.loads(raw)

        if not is_valid_postmortem(parsed):
            raise ValueError("Invalid Gemini output")

        return {
            "mode": "live",
            "postmortem": parsed
        }

    except Exception:
        return {
            "mode": "simulated",
            "postmortem": SIMULATED_POSTMORTEM
        }
