from fastapi.routing import APIRouter
from backend.config.connection import DB_DEPENDS

auth_router = APIRouter(tags=['Rutas de autenticación'])

@auth_router.post('/api/auth/register')
def register_user(db = DB_DEPENDS):
    pass

@auth_router.post('/api/auth/login')
def login_user():
    pass