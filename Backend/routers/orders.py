from fastapi.responses import JSONResponse
from fastapi import APIRouter, HTTPException, status


router = APIRouter(prefix="/api", tags=["Payment Initiaion pipeline"])

@router.get("/order")
async def sendForth():
    return JSONResponse(content="SHarp")