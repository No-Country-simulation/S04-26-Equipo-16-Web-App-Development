import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from fastapi import Depends
from dotenv import load_dotenv

load_dotenv()

"""URL DE CONEXION AL MOTOR DE BASE DE DATOS (Postgresql | sqlite | mysql)"""
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

"""SE CREA LA SESION A LA BASE DE DATOS"""
session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

"""VARIABLE DECLARATIVA PARA LOS MODELOS BASE DE DATOS"""
Base = declarative_base()

"""GENERADOR DE DEPENDENCIA PARA OBTENER LA SESION DE LA BASE DE DATOS"""


def get_database():
    try:
        db = session()
        yield db
    finally:
        db.close()


"""CONSTANTE PARA UTILIZAR LA BASE DE DATOS PARA INYECTAR A LOS ENDPOINT"""
DB_DEPENDS: Session = Depends(get_database)
