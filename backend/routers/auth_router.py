from fastapi.routing import APIRouter
from fastapi import Form, Depends, HTTPException, status
from typing import Annotated

from backend.schemas.user_schema import UserRegisterScheme, UserLoginScheme
from backend.config.connection import DB_DEPENDS
from backend.helpers.auth_depend import get_permission_role
from backend.helpers.JWT import encode_token
from backend.models.user import User
from backend.helpers.hashed_password import hash_password, check_password


auth_router = APIRouter(tags=['Rutas de autenticación'])

@auth_router.post('/api/auth/register')
def register_user(user_form: UserRegisterScheme, db = DB_DEPENDS, _:None = Depends(get_permission_role)):
    try:
        user = db.query(User).filter(User.email == user_form.email).first()
        if user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No se pudo registrar al usuario")
        password_hash = hash_password(user_form.password)
        new_user = User(
            email = user_form.email,
            password_hash = password_hash,
            role = user_form.role
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except HTTPException:
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error del servidor")

@auth_router.post('/api/auth/login')
def login_user(user_form: Annotated[UserLoginScheme, Form(...)], db = DB_DEPENDS):
    try:
        user = db.query(User).filter(User.email == user_form.email).first()
        if user is None or not check_password(user_form.password, user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email o contraseña incorrectos")
        
        payload_token = {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
        token = encode_token(payload=payload_token, exp=24) # 24hs de uso
        return token
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error del servidor")

