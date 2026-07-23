# dependencies.py

from fastapi import Depends, HTTPException, status


def get_current_user(token: str = Depends(oauth2_scheme)):
    # Decode the token and return the authenticated user.
    # Raise 401 if the token is missing, invalid, or expired.