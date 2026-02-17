# IBA Sukkur Assistant API

- FastAPI backend for IBA Sukkur RAG chatbot.

## Structure

    main.py  
    api/  
    services/  
    faiss_index/  

## Installation

    pip install -r requirements.txt

## Run Server

    uvicorn main:app --reload

    Server runs at:
    http://127.0.0.1:8000

## API Endpoint

    POST /api/chat

    Request:
    {
    "message": "Your question here"
    }

    Response:
    {
    "response": "AI answer"
    }

## API Docs

    Open in browser:
    http://127.0.0.1:8000/docs
