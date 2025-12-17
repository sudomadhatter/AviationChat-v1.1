from fastapi import FastAPI
from backend.agent import IndocAgent

app = FastAPI()

indoc_agent = IndocAgent()

@app.post("/chat")
def chat(user_input: str):
    return {"response": indoc_agent.run(user_input)}
