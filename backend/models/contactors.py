from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column
from config.connection import Base


class Contractor(Base):
    __tablename__ = "contractors"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
