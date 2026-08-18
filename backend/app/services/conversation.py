from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Conversation, Message, User


def get_or_create_user(
    db: Session,
    user_id: str,
) -> User:
    """
    Return the user if they already exist.
    Otherwise, create a new anonymous user.
    """

    statement = select(User).where(
        User.id == user_id
    )

    user = db.scalar(statement)

    if user is not None:
        return user

    user = User(
        id=user_id,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_history(
    db: Session,
    conversation_id: str,
) -> list[dict]:
    """
    Return all messages from a conversation.
    """

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


def get_conversation_messages(
    db: Session,
    conversation_id: str,
    user_id: str,
) -> list[dict] | None:
    """
    Return messages only if the conversation belongs
    to the specified user.

    Returns None if the conversation does not exist
    or belongs to another user.
    """

    conversation_statement = select(Conversation).where(
        Conversation.id == conversation_id,
        Conversation.user_id == user_id,
    )

    conversation = db.scalar(
        conversation_statement
    )

    if conversation is None:
        return None

    return get_history(
        db=db,
        conversation_id=conversation_id,
    )


def get_user_conversations(
    db: Session,
    user_id: str,
) -> list[dict]:
    """
    Return all conversations belonging to a user.

    Newest conversations appear first.
    """

    statement = (
        select(Conversation)
        .where(Conversation.user_id == user_id)
        .order_by(
            Conversation.updated_at.desc(),
            Conversation.created_at.desc(),
        )
    )

    conversations = db.scalars(statement).all()

    return [
        {
            "id": conversation.id,
            "title": conversation.title or "New conversation",
            "created_at": conversation.created_at,
            "updated_at": conversation.updated_at,
        }
        for conversation in conversations
    ]


def create_conversation(
    db: Session,
    conversation_id: str,
    user_id: str,
    title: str | None = None,
) -> Conversation:
    """
    Create a conversation belonging to a specific user.
    """

    get_or_create_user(
        db=db,
        user_id=user_id,
    )

    conversation = Conversation(
        id=conversation_id,
        user_id=user_id,
        title=title,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def conversation_exists(
    db: Session,
    conversation_id: str,
    user_id: str,
) -> bool:
    """
    Check whether this conversation belongs to this user.
    """

    statement = select(Conversation).where(
        Conversation.id == conversation_id,
        Conversation.user_id == user_id,
    )

    return db.scalar(statement) is not None


def add_message(
    db: Session,
    conversation_id: str,
    role: str,
    content: str,
) -> None:
    """
    Add a message to an existing conversation.
    """

    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content,
    )

    db.add(message)
    db.commit()

def delete_conversation(
    db: Session,
    conversation_id: str,
    user_id: str,
) -> bool:
    """
    Delete a conversation only if it belongs
    to the specified user.

    Its messages are also deleted automatically
    through the relationship cascade.
    """

    statement = select(Conversation).where(
        Conversation.id == conversation_id,
        Conversation.user_id == user_id,
    )

    conversation = db.scalar(statement)

    if conversation is None:
        return False

    db.delete(conversation)
    db.commit()

    return True