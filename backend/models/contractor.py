from sqlalchemy import Integer, ForeignKey, String, Boolean, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column
from config.connection import Base
from datetime import datetime, timezone
from utils.enum_document_type import DocumentType


class Contractor(Base):
    __tablename__ = "contractors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=False, unique=True
    )

    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    birth_date: Mapped[datetime] = mapped_column(nullable=False)
    nationality: Mapped[str] = mapped_column(String(100), nullable=False)
    address: Mapped[str] = mapped_column(String(255), nullable=False)

    document_type: Mapped[DocumentType] = mapped_column(
        Enum(DocumentType), nullable=False
    )

    identification_number: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(50), nullable=False)

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
