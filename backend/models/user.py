from sqlalchemy import Integer, ForeignKey, String, Boolean, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from backend.config.connection import Base
from enum import StrEnum
from datetime import datetime

class Roles(StrEnum):
    ADMIN = "ADMIN"
    CLIENT = "CLIENT"
    OPERATOR = "OPERATOR"
    USER =  "USER"

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(256), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(256), nullable=False)
    role: Mapped[Roles] = mapped_column(Roles, nullable=False, default=Roles.USER)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)

