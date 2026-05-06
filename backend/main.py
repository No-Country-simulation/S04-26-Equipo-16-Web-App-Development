from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn
from routers import api_router

# handlers
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import IntegrityError

from core.handlers import (
    app_exception_handler,
    validation_exception_handler,
    db_exception_handler,
    generic_exception_handler,
)
from core.exceptions import AppException

load_dotenv("../.env")

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Good deploy 🚀"}


app.include_router(api_router)

# 👉 registro de handlers globales
app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(IntegrityError, db_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
