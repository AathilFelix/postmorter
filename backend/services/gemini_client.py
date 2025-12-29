from google.cloud import aiplatform

aiplatform.init(location="us-central1")

async def call_gemini(prompt: str) -> str:
    model = aiplatform.GenerativeModel("gemini-1.5-flash")

    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 0.2,
            "max_output_tokens": 500
        }
    )

    return response.text
