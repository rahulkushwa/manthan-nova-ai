from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from urllib.parse import quote_plus
import os

POSTGRES_PASSWORD = "Manthan@3655"

if not POSTGRES_PASSWORD:
    raise RuntimeError("POSTGRES_PASSWORD environment variable is not set")


DATABASE_URL = (
    "postgresql+psycopg://postgres:"
    + quote_plus(POSTGRES_PASSWORD)
    + "@localhost:5432/manthan_ai"
)


engine = create_engine(
    DATABASE_URL,
    echo=False,
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()