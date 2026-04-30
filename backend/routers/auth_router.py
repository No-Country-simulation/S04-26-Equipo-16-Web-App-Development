from fastapi.routing import APIRouter
from fastapi import Form
from typing import Annotated

from backend.schemas.user_schema import UserRegisterScheme
from backend.config.connection import DB_DEPENDS


auth_router = APIRouter(tags=['Rutas de autenticación'])

@auth_router.post('/api/auth/register')
def register_user(user: Annotated[UserRegisterScheme, Form(...)], db = DB_DEPENDS):
    try:
        pass
    except Exception as e:
        pass

@auth_router.post('/api/auth/login')
def login_user():
    pass