from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from routes.generate_postmortem import router

app = FastAPI(title="LLM Postmortem API")

app.include_router(router)

@app.get("/health")
def health():
    return {"status": "ok"}
