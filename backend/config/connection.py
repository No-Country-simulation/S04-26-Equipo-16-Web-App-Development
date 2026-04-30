from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from fastapi import Depends

"""URL DE CONEXION AL MOTOR DE BASE DE DATOS (Postgresql | sqlite | mysql)"""
engine = create_engine('sqlite:///database.db')

"""SE CREA LA SESION A LA BASE DE DATOS"""
session = sessionmaker(engine, autoflush=False, autocommit=False)

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
DB_DEPENDS = Depends(get_database)