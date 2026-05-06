from pydantic import BaseModel, Field, field_validator
from datetime import date
import re

from backend.utils.enum_document_type import DocumentType


class ContractorCreate(BaseModel):
    user_id: int

    full_name: str = Field(min_length=3, max_length=150)
    birth_date: date
    nationality: str = Field(min_length=2, max_length=100)
    address: str = Field(min_length=5, max_length=255)

    document_type: DocumentType
    identification_number: str = Field(min_length=5, max_length=100)

    phone: str = Field(min_length=8, max_length=20)

    # ✅ validación documento
    @field_validator("identification_number")
    @classmethod
    def validate_document(cls, value: str):
        if not value.strip():
            raise ValueError("Invalid identification number")
        return value

    # ✅ validación teléfono (simple MVP)
    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str):
        if not re.match(r"^\+?[0-9]{8,15}$", value):
            raise ValueError("Invalid phone format")
        return value
