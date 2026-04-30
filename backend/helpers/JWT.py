from jose import jwt
from jose.exceptions import JWSAlgorithmError, JWTClaimsError
from fastapi.exceptions import HTTPException
from datetime import timedelta, timezone

import os

SECRET_KEY_JWT = os.getenv('SECRET_KEY_JWT')

def encode_token(payload: dict, exp: int):
    try:
        copy = payload.copy()
        copy['exp'] = timezone.utc() + timedelta(hours=exp)
        token = jwt.encode(copy, key=SECRET_KEY_JWT, algorithm=['HS256'])
        return token
    except JWTClaimsError as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="Error del servidor")
    except JWSAlgorithmError as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="Error del servidor")

"""FALTA DECODE_TOKEN """
def decode_token(token: str):
    pass

