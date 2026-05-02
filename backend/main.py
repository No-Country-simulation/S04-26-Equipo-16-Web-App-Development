from fastapi import FastAPI
import uvicorn 

from backend.routers.auth_router import auth_router

app = FastAPI()
app.include_router(auth_router)

if __name__ == '__main__':
    uvicorn.run('backend.main:app', reload=True)