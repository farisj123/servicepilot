from fastapi import FastAPI

app = FastAPI(title="ServicePilot API", version="0.1.0")


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    """Return a simple response to show that the API is running."""
    return {"status": "ok"}
