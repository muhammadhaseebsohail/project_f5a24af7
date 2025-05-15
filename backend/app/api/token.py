To create a user authentication API in FastAPI, we will need the following packages: FastAPI, Pydantic for data validation, passlib[bcrypt] for password hashing, python-jose[cryptography] for JWT encoding and decoding, and python-multipart for form data. 

Here is the complete code:

```python
from datetime import datetime, timedelta
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

SECRET_KEY = "YOUR_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserInDB(BaseModel):
    username: str
    hashed_password: str

class User(BaseModel):
    username: str

class UserIn(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

def get_user(db: dict, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def authenticate_user(fake_db: dict, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/register", response_model=User)
async def create_user(user: UserIn):
    hashed_password = pwd_context.hash(user.password)
    fake_db[user.username] = {"username": user.username, "hashed_password": hashed_password}
    return {"username": user.username}

@app.post("/reset-password", response_model=User)
async def reset_password(user: UserIn):
    user = get_user(fake_db, user.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    user.hashed_password = pwd_context.hash(user.password)
    return {"username": user.username}
```

In the above code, we have created an API that has the following endpoints:
1. POST /token: This endpoint is used to authenticate the user and provide them with a JWT token.
2. POST /register: This endpoint is used to register a new user.
3. POST /reset-password: This endpoint is used to reset the password of an existing user.