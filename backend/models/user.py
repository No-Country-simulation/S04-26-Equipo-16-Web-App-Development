
from sqlalchemy import Integer, ForeignKey, String, Boolean, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from backend.config.connection import Base

from sqlalchemy import Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column
from config.connection import Base
from datetime import timezone, datetime
from backend.utils.enum_roles import Roles


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(256), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(256), nullable=False)
    role: Mapped[Roles] = mapped_column(Enum(Roles), nullable=False, default=Roles.USER)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=timezone.utc)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
