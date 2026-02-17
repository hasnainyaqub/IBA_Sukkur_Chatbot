import streamlit as st
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

api_key = st.secrets['GROQ_API_KEY']

headers = {
       "authorization": f"Bearer {api_key}",
        "content-type": "application/json"
}

embed_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = FAISS.load_local(
    "vectorstore",
    embed_model,
    allow_dangerous_deserialization=True
)

retriever = vectorstore.as_retriever(k=5)

llm = ChatGroq(
    model_name="groq/compound",
    temperature=0
)

prompt = ChatPromptTemplate.from_template("""
Answer the question based on the provided Context.
If the answer is not contained within the Context, respond with "I don't know".
Context:
{context}

Question:
{question}

Answer:
""")
def format_docs(docs):
    return "\n\n".join(d.page_content for d in docs)

rag_chain = (
    {
        "context": retriever | format_docs,
        "question": RunnablePassthrough(),
    }
    | prompt
    | llm
    | StrOutputParser()
)


# UI code below

st.set_page_config(
    page_title="IBA Sukkur Assistant",
    page_icon="🎓",
    layout="centered"
)

import streamlit as st
import time

st.set_page_config(
    page_title="IBA Sukkur Assistant",
    page_icon="🎓",
    layout="centered"
)

st.title("🎓 IBA Sukkur Assistant")

# -------------------------
# UI memory only
# -------------------------
if "chat" not in st.session_state:
    st.session_state.chat = []

# -------------------------
# Chat area (above input)
# -------------------------
chat_container = st.container()

with chat_container:
    for role, msg in st.session_state.chat:
        if role == "user":
            st.chat_message("user").write(msg)
        else:
            st.chat_message("assistant").write(msg)

# -------------------------
# Bottom input (ChatGPT style)
# -------------------------
prompt = st.chat_input("Ask about IBA Sukkur...")

# -------------------------
# Handle send (no freeze, no rerun)
# -------------------------
if prompt:
    st.session_state.chat.append(("user", prompt))
    st.chat_message("user").write(prompt)

    with st.spinner("Thinking..."):
        reply = rag_chain.invoke(prompt)

    st.session_state.chat.append(("assistant", reply))
    st.chat_message("assistant").write(reply)
