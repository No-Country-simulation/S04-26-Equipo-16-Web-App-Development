from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, Depends, status
from jose import jwt
from jose.exceptions import JWSSignatureError, JWTError
from fastapi.exceptions import HTTPException
from datetime import timedelta, timezone, datetime
from pydantic import ValidationError

from backend.schemas.user_schema import UserTokenData

import os

SECRET_KEY_JWT = os.getenv('SECRET_KEY_JWT')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def encode_token(payload: dict, exp: int):
    try:
        copy = payload.copy()
        copy['exp'] = datetime.now(timezone.utc) + timedelta(hours=exp)
        token = jwt.encode(copy, key=SECRET_KEY_JWT, algorithm='HS256')
        return token

    except Exception as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error generando token"
        )


def decode_token(token: str = Depends(oauth2_scheme)) -> UserTokenData:
    try:
        data = jwt.decode(token, key=SECRET_KEY_JWT, algorithm="HS256")
        return UserTokenData.model_validate(data)
    except (ValidationError, JWTError, JWSSignatureError) as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )

