import bcrypt

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), salt=bcrypt.gensalt()).decode("utf-8")

def check_password(password_text, password_hash) -> bool:
    return bcrypt.checkpw(password_text.encode("utf-8"), password_hash.encode("utf-8"))