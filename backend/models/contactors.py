from sqlalchemy import Integer, ForeignKey, String, Boolean, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from backend.config.connection import Base
from datetime import datetime

class Contractor(Base):
    __tablename__ = 'contractors'

    pass