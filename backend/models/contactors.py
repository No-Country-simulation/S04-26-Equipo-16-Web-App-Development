from sqlalchemy import Integer, ForeignKey, String, Boolean, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from config.connection import Base
from datetime import datetime


class Contractor(Base):
    __tablename__ = "contractors"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
