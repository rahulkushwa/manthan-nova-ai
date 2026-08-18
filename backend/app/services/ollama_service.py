import os
import re
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq


# Base backend directory
BASE_DIR = Path(__file__).resolve().parents[2]

# Load environment variables from backend/.env
load_dotenv(BASE_DIR / ".env")


# Get Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


if not GROQ_API_KEY:
    raise RuntimeError(
        "GROQ_API_KEY is missing from the .env file."
    )


# Create Groq client
client = Groq(
    api_key=GROQ_API_KEY
)


# AI model
MODEL_NAME = "qwen/qwen3.6-27b"


def ask_ollama(prompt: str) -> str:
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.7,
        max_completion_tokens=2048,
    )

    # Get AI response safely
    answer = (
        response.choices[0]
        .message
        .content
        or ""
    )

    # Remove <think>...</think> reasoning blocks
    answer = re.sub(
        r"<think>.*?</think>",
        "",
        answer,
        flags=re.DOTALL,
    ).strip()

    # Safety check
    if not answer:
        raise RuntimeError(
            "The AI returned an empty response."
        )

    return answer