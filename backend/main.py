from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn 
load_dotenv('../.env')

app = FastAPI()

if __name__ == '__main__':
    uvicorn.run('./backend/main:app', reload=True)