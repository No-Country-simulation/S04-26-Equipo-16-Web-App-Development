from backend.config.connection import DB_DEPENDS
from backend.helpers.JWT import decode_token
from backend.models.user import User
from backend.utils.enum_roles import Roles

from fastapi.exceptions import HTTPException
from fastapi import status, Depends

def get_permission_role(token: str = Depends(decode_token), db = DB_DEPENDS):
    user = db.query(User).filter(User.email == token.email).first()
    if not user or user.role not in (Roles.ADMIN, Roles.OPERATOR):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Permisos denegados")
        
    