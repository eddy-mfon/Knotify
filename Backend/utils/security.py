
from passlib.context import CryptContext

# Configure a single password hasher for the whole project.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    # Always store hashes, never plaintext passwords.
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Compare the entered password against the stored hash.
    return pwd_context.verify(plain_password, hashed_password)