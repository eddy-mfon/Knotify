from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/auth", tags=["Auth"])


class SignupRequest(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(payload: SignupRequest):
    # 1. check whether the email already exists
    # 2. hash the password
    # 3. insert the user
    # 4. return a token or success message
    return {"message": "Account created"}


@router.post("/login")
async def login(payload: LoginRequest):
    # 1. find the user by email
    # 2. verify password hash
    # 3. create access token
    # 4. return token to the frontend
    return {"access_token": "token-here", "token_type": "bearer"}