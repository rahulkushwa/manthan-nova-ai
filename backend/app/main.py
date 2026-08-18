from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.conversation import (
    add_message,
    conversation_exists,
    create_conversation,
    delete_conversation,
    get_conversation_messages,
    get_history,
    get_user_conversations,
)
from app.services.tutor import solve_doubt


app = FastAPI(
    title="Manthan Nova AI",
    description="AI-powered education platform",
    version="0.6.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TutorRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
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
        "message": "Manthan Nova AI backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# ==========================================
# GET ALL CONVERSATIONS FOR A SPECIFIC USER
# ==========================================

@app.get("/api/conversations/{user_id}")
def get_conversations(
    user_id: str,
    db: Session = Depends(get_db),
):
    conversations = get_user_conversations(
        db=db,
        user_id=user_id,
    )

    return {
        "conversations": conversations,
    }


# ==========================================
# GET MESSAGES FROM ONE CONVERSATION
# ==========================================

@app.get(
    "/api/conversations/{conversation_id}/messages"
)
def get_messages(
    conversation_id: str,
    user_id: str,
    db: Session = Depends(get_db),
):
    messages = get_conversation_messages(
        db=db,
        conversation_id=conversation_id,
        user_id=user_id,
    )

    if messages is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return {
        "conversation_id": conversation_id,
        "messages": messages,
    }

# ==========================================
# DELETE ONE CONVERSATION
# ==========================================

@app.delete(
    "/api/conversations/{conversation_id}"
)
def delete_user_conversation(
    conversation_id: str,
    user_id: str,
    db: Session = Depends(get_db),
):
    deleted = delete_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=user_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return {
        "message": "Conversation deleted successfully",
        "conversation_id": conversation_id,
    }

# ==========================================
# AI TUTOR
# ==========================================

@app.post(
    "/api/ai/tutor",
    response_model=TutorResponse,
)
def tutor(
    request: TutorRequest,
    db: Session = Depends(get_db),
):
    try:
        # Create the conversation if it does not exist
        # for this specific user.
        if not conversation_exists(
            db=db,
            conversation_id=request.conversation_id,
            user_id=request.user_id,
        ):
            create_conversation(
                db=db,
                conversation_id=request.conversation_id,
                user_id=request.user_id,
                title=request.question[:100],
            )

        # Load previous messages.
        history = get_history(
            db=db,
            conversation_id=request.conversation_id,
        )

        # Ask the AI.
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

        print("\n========== AI TUTOR ERROR ==========")
        print(repr(error))
        print("====================================\n")

        raise HTTPException(
            status_code=500,
            detail=f"AI tutor error: {str(error)}",
        )