from ollama import Client


MODEL_NAME = "qwen3:4b-instruct"


client = Client(host="http://127.0.0.1:11434")


def ask_ollama(prompt: str) -> str:
    response = client.chat(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": f"/no_think\n\n{prompt}",
            }
        ],
        think=False,
    )

    # Ollama separates reasoning from the final response.
    # MANthan AI should only return the final educational answer.
    answer = response["message"].get("content", "").strip()

    if not answer:
        raise RuntimeError("The AI returned an empty response.")

    return answer