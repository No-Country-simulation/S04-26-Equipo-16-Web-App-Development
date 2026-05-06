from fastapi import APIRouter

from .contractor_router import router as contractor_router

# from .auth_router import router as auth_router

api_router = APIRouter()

api_router.include_router(contractor_router)
# api_router.include_router(auth_router)
