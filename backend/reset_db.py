from app.database import Base, engine
from app.models import Conversation, Message, User


print("Deleting existing database tables...")

Base.metadata.drop_all(bind=engine)

print("Creating new database tables...")

Base.metadata.create_all(bind=engine)

print("Database reset successful!")
print("Created tables:")
print("- users")
print("- conversations")
print("- messages")