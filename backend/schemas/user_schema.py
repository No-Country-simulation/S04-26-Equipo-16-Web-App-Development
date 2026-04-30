from pydantic import BaseModel
from backend.utils.enum_roles import Roles

class UserRegisterScheme(BaseModel):
    email: str 
    password: str
    role: Roles 
    is_active: bool
    updated_at: str

class UserLoginScheme(BaseModel):
    pass
