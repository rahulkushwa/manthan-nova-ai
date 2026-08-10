from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Conversation, Message


def get_history(
    db: Session,
    conversation_id: str,
) -> list[dict]:

    statement = (
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc(), Message.id.asc())
    )

    messages = db.scalars(statement).all()

    return [
        {
            "role": message.role,
            "content": message.content,
        }
        for message in messages
    ]


def create_conversation(
    db: Session,
    conversation_id: str,
    title: str | None = None,
) -> Conversation:

    conversation = Conversation(
        id=conversation_id,
        title=title,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def conversation_exists(
    db: Session,
    conversation_id: str,
) -> bool:

    statement = select(Conversation).where(
        Conversation.id == conversation_id
    )

    return db.scalar(statement) is not None


def add_message(
    db: Session,
    conversation_id: str,
    role: str,
    content: str,
) -> None:

    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content,
    )

    db.add(message)
    db.commit()