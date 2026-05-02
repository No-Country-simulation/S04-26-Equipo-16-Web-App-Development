from pydantic import BaseModel
from backend.utils.enum_roles import Roles

class UserRegisterScheme(BaseModel):
    email: str 
    password: str
    role: Roles 

class UserLoginScheme(BaseModel):
    email: str
    password: str


class UserTokenData(BaseModel):
    id: str
    email: str
    role: Roles
    