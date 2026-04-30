from fastapi.routing import APIRouter

auth_router = APIRouter(tags=['Rutas de autenticación'])

@auth_router.post('/api/auth/register')
def register_user():
    pass

@auth_router.post('/api/auth/login')
def login_user():
    pass