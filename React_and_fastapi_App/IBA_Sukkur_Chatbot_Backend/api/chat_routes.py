from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.rag_service import get_answer

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(req: ChatRequest):
    try:
        return {"response": get_answer(req.message)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
