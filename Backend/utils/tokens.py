# utils/tokens.py

from datetime import datetime, timedelta, timezone
from jose import jwt


def create_access_token(data: dict, secret_key: str, algorithm: str = "HS256", expires_minutes: int = 60):
    # Attach an expiry so the token cannot live forever.
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    return jwt.encode(payload, secret_key, algorithm=algorithm)