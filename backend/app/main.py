from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.conversation import (
    add_message,
    conversation_exists,
    create_conversation,
    get_history,
)
from app.services.tutor import solve_doubt


app = FastAPI(
    title="MANthan AI",
    description="AI-powered education platform",
    version="0.4.0",
)


class TutorRequest(BaseModel):
    conversation_id: str = Field(..., min_length=1)
    question: str = Field(..., min_length=1)
    class_level: int = Field(..., ge=1, le=12)
    subject: str = Field(..., min_length=1)
    mode: str = "explain"


class TutorResponse(BaseModel):
    conversation_id: str
    answer: str


@app.get("/")
def root():
    return {
        "message": "MANthan AI backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/api/ai/tutor", response_model=TutorResponse)
def tutor(
    request: TutorRequest,
    db: Session = Depends(get_db),
):

    try:
        # Create the conversation if it doesn't exist.
        if not conversation_exists(
            db,
            request.conversation_id,
        ):
            create_conversation(
                db,
                request.conversation_id,
                title=request.question[:100],
            )

        # Load previous messages from PostgreSQL.
        history = get_history(
            db,
            request.conversation_id,
        )

        # Ask the local AI.
        answer = solve_doubt(
            question=request.question,
            class_level=request.class_level,
            subject=request.subject,
            mode=request.mode,
            history=history,
        )

        # Save both sides of the conversation.
        add_message(
            db,
            request.conversation_id,
            "user",
            request.question,
        )

        add_message(
            db,
            request.conversation_id,
            "assistant",
            answer,
        )

        return {
            "conversation_id": request.conversation_id,
            "answer": answer,
        }

    except Exception as error:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"AI tutor error: {str(error)}",
        )