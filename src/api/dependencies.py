"""
EPCID API Dependencies

FastAPI dependency injection for authentication and common resources.
"""

from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from .security import verify_token

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login/form", auto_error=False)


# Simulated user database (shared with auth routes)
fake_users_db = {
    "demo@epcid.health": {
        "id": "user-001",
        "email": "demo@epcid.health",
        "full_name": "Demo User",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "is_active": True,
        "is_verified": True,
        "created_at": "2024-01-01T00:00:00Z",
    }
}


async def get_current_user(token: Optional[str] = Depends(oauth2_scheme)) -> Optional[dict]:
    """
    Get the current user from the JWT token.
    
    Returns None if no token is provided or token is invalid.
    """
    if not token:
        return None
    
    payload = verify_token(token, token_type="access")
    if not payload:
        return None
    
    email = payload.get("sub")
    if not email:
        return None
    
    user = fake_users_db.get(email)
    return user


async def get_current_active_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Get the current authenticated user.
    
    Raises HTTPException if not authenticated.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    payload = verify_token(token, token_type="access")
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = fake_users_db.get(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    if not user.get("is_active"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is disabled",
        )
    
    return user


async def get_optional_user(token: Optional[str] = Depends(oauth2_scheme)) -> Optional[dict]:
    """
    Get the current user if authenticated, otherwise None.
    
    Useful for endpoints that work with or without authentication.
    """
    return await get_current_user(token)


def require_verified_user(user: dict = Depends(get_current_active_user)) -> dict:
    """
    Require a verified user account.
    
    Raises HTTPException if user email is not verified.
    """
    if not user.get("is_verified"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email verification required",
        )
    return user
