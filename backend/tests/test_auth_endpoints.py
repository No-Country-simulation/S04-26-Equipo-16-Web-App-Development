from fastapi.testclient import TestClient
from unittest.mock import patch
from backend.main import app
from backend.config.connection import get_database
from backend.tests.mocks_auth import override_user_register, override_user_register_conflict, override_get_permission_role
from backend.utils.enum_roles import Roles
from backend.helpers.auth_depend import get_permission_role


client = TestClient(app)

def test_auth_register_success():

    app.dependency_overrides[get_database] = override_user_register
    app.dependency_overrides[get_permission_role] = override_get_permission_role
    response = client.post(
        "/api/auth/register",
        json = {
            "email": "test@gmail.com",
            "password": "1234",
            "role": Roles.OPERATOR.value
        }
    )

    assert response.status_code == 200
    app.dependency_overrides.clear()

def test_auth_register_conflict():
    app.dependency_overrides[get_database] = override_user_register_conflict
    app.dependency_overrides[get_permission_role] = override_get_permission_role
    response = client.post(
        "/api/auth/register",
        json = {
            "email": "test@gmail.com",
            "password": "1234",
            "role": Roles.OPERATOR.value
        }
    )

    assert response.status_code == 409
    app.dependency_overrides.clear()

def test_auth_register_unauthorized():
    app.dependency_overrides[get_database] = override_user_register_conflict
    response = client.post(
        "/api/auth/register",
        json = {
            "email": "test@gmail.com",
            "password": "1234",
            "role": Roles.OPERATOR.value
        }
    )

    assert response.status_code == 401
    app.dependency_overrides.clear()
  
 
    
