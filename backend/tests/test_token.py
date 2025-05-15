Here is the comprehensive unit test for the above FastAPI endpoints:

```python
from fastapi.testclient import TestClient
from main import app, UserIn, get_user, authenticate_user, pwd_context
import pytest

client = TestClient(app)


@pytest.fixture
def fake_db():
    return {
        "testuser": {
            "username": "testuser",
            "hashed_password": pwd_context.hash("testpassword")
        }
    }


# Test for /register endpoint
def test_create_user():
    response = client.post(
        "/register",
        json={"username": "testuser", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert response.json() == {"username": "testuser"}


# Test for /reset-password endpoint
def test_reset_password(fake_db):
    response = client.post(
        "/reset-password",
        json={"username": "testuser", "password": "newpassword"}
    )
    assert response.status_code == 200
    assert response.json() == {"username": "testuser"}
    user = get_user(fake_db, "testuser")
    assert pwd_context.verify("newpassword", user.hashed_password)


# Test for /token endpoint
def test_login_for_access_token(fake_db):
    response = client.post(
        "/token",
        data={"username": "testuser", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"


# Test for error case in /token endpoint
def test_login_for_access_token_error(fake_db):
    response = client.post(
        "/token",
        data={"username": "wronguser", "password": "wrongpassword"}
    )
    assert response.status_code == 401


# Test for error case in /reset-password endpoint
def test_reset_password_error(fake_db):
    response = client.post(
        "/reset-password",
        json={"username": "wronguser", "password": "newpassword"}
    )
    assert response.status_code == 404
```

In this test case, we use the FastAPI TestClient to simulate requests to our app. We also use pytest fixtures to provide a fake database for our tests. We have tests for success cases, error cases, and data validation. 

Note: The above tests should be in a separate test file and not in the main application file.