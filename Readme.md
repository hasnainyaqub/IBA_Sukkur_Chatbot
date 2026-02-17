# 🎓 IBA Sukkur Chatbot

> An AI-powered assistant built to answer queries related to the **Institute of Business Administration Sukkur** using a **Retrieval Augmented Generation (RAG)** approach. The system delivers accurate, context-based responses from institutional data through a scalable FastAPI backend and a live Streamlit interface.

[![Live App](https://img.shields.io/badge/Live%20App-Streamlit-FF4B4B?style=for-the-badge&logo=streamlit)](https://ibasukkurchatbot.streamlit.app/)
[![GitHub Repo](https://img.shields.io/badge/Repository-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/hasnainyaqub/IBA_Sukkur_Chatbot)

---

## 🚀 Project Highlights

- ✅ Context-aware AI responses using RAG
- ✅ FastAPI backend for production-ready APIs
- ✅ Streamlit live frontend interface
- ✅ Lightweight and scalable architecture
- ✅ Frontend ready for React or mobile apps

---

## 🧠 Technology Stack

| Category | Technologies |
|---|---|
| **Backend** | FastAPI, Python |
| **AI / NLP** | LangChain, HuggingFace Embeddings, Groq LLM |
| **Vector Store** | FAISS |
| **Frontend** | Streamlit |

---

## 📡 How It Works

The chatbot retrieves relevant institutional content from a **vector database** and combines it with an **LLM** to generate precise, grounded answers — instead of generic AI responses.

```
User Query
    │
    ▼
HuggingFace Embeddings  ──►  FAISS Vector Search
                                      │
                                      ▼
                             Retrieved Context
                                      │
                                      ▼
                            Groq LLM (LangChain)
                                      │
                                      ▼
                          Grounded, Accurate Answer
```

---

## 📌 Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/hasnainyaqub/IBA_Sukkur_Chatbot.git
   cd IBA_Sukkur_Chatbot
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server**
   ```bash
   uvicorn main:app --reload
   ```

4. **Connect your frontend** to the `/api/chat` endpoint — works with Streamlit, React, or any mobile app.

---

## ✨ Live Demo

Try the chatbot live here:

👉 **[https://ibasukkurchatbot.streamlit.app/](https://ibasukkurchatbot.streamlit.app/)**

---

## 👥 Team

| Role | Name | LinkedIn |
|---|---|---|
| **Backend & AI Pipeline** | Hasnain Yaqub | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/hasnainyaqoob) |
| **Frontend UI** | Asma Shahzadi | [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/asma-shahzadi/) |

---

## 🏷️ Tags

`#AIChatbot` `#RAG` `#FastAPI` `#Streamlit` `#LangChain` `#FAISS` `#Groq` `#HuggingFace` `#Python` `#IBASukkur` `#GenAI` `#PortfolioProject`