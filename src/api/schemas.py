"""
EPCID API Schemas

Pydantic models for API request/response validation.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, EmailStr, Field, validator


# Enums
class RiskLevel(str, Enum):
    """Risk level classification."""
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    CRITICAL = "critical"


class SymptomSeverity(str, Enum):
    """Symptom severity levels."""
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"


class Gender(str, Enum):
    """Gender options."""
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


# Authentication Schemas
class Token(BaseModel):
    """JWT token model."""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Token payload data."""
    email: Optional[str] = None
    user_id: Optional[str] = None
    scopes: List[str] = []


class UserBase(BaseModel):
    """Base user model."""
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    """User creation model."""
    password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    """User response model."""
    id: str
    email: EmailStr
    full_name: str
    is_active: bool = True
    is_verified: bool = False
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Child Schemas
class ChildBase(BaseModel):
    """Base child model."""
    name: str = Field(..., min_length=1, max_length=100)
    date_of_birth: datetime
    gender: Gender

    @validator("date_of_birth")
    def validate_dob(cls, v):
        if v > datetime.now():
            raise ValueError("Date of birth cannot be in the future")
        return v


class ChildCreate(ChildBase):
    """Child creation model."""
    medical_conditions: List[str] = []
    allergies: List[str] = []
    medications: List[str] = []


class ChildUpdate(BaseModel):
    """Child update model."""
    name: Optional[str] = None
    medical_conditions: Optional[List[str]] = None
    allergies: Optional[List[str]] = None
    medications: Optional[List[str]] = None


class ChildResponse(ChildBase):
    """Child response model."""
    id: str
    age_months: int
    medical_conditions: List[str] = []
    allergies: List[str] = []
    medications: List[str] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Symptom Schemas
class SymptomBase(BaseModel):
    """Base symptom model."""
    symptom_type: str = Field(..., description="Type of symptom (e.g., fever, cough)")
    severity: SymptomSeverity
    notes: Optional[str] = None


class SymptomCreate(SymptomBase):
    """Symptom creation model."""
    child_id: str
    onset_time: Optional[datetime] = None
    measurements: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional measurements (e.g., temperature: 101.5)",
    )

    class Config:
        json_schema_extra = {
            "example": {
                "child_id": "child-001",
                "symptom_type": "fever",
                "severity": "moderate",
                "onset_time": "2024-01-15T08:00:00Z",
                "measurements": {
                    "temperature": 101.5,
                    "unit": "fahrenheit"
                },
                "notes": "Started this morning, seems uncomfortable"
            }
        }


class SymptomResponse(SymptomBase):
    """Symptom response model."""
    id: str
    child_id: str
    recorded_at: datetime
    onset_time: Optional[datetime]
    measurements: Optional[Dict[str, Any]]

    class Config:
        from_attributes = True


class SymptomHistory(BaseModel):
    """Symptom history response."""
    child_id: str
    symptoms: List[SymptomResponse]
    total_count: int
    date_range: Dict[str, datetime]


# Assessment Schemas
class AssessmentRequest(BaseModel):
    """Risk assessment request."""
    child_id: str
    symptoms: List[SymptomCreate]
    location: Optional[Dict[str, float]] = Field(
        default=None,
        description="Location for environmental context (lat, lng)",
    )
    include_guidelines: bool = True
    include_environmental: bool = True

    class Config:
        json_schema_extra = {
            "example": {
                "child_id": "child-001",
                "symptoms": [
                    {
                        "child_id": "child-001",
                        "symptom_type": "fever",
                        "severity": "moderate",
                        "measurements": {"temperature": 102.0}
                    },
                    {
                        "child_id": "child-001",
                        "symptom_type": "cough",
                        "severity": "mild"
                    }
                ],
                "location": {"lat": 40.7128, "lng": -74.0060},
                "include_guidelines": True,
                "include_environmental": True
            }
        }


class RiskFactor(BaseModel):
    """Individual risk factor."""
    name: str
    contribution: float = Field(..., ge=0, le=1)
    description: str
    source: str


class AssessmentResponse(BaseModel):
    """Risk assessment response."""
    id: str
    child_id: str
    timestamp: datetime
    risk_level: RiskLevel
    risk_score: float = Field(..., ge=0, le=1)
    confidence: float = Field(..., ge=0, le=1)

    # Risk breakdown
    risk_factors: List[RiskFactor]

    # Recommendations
    primary_recommendation: str
    secondary_recommendations: List[str]

    # Flags
    red_flags: List[str]
    warning_signs: List[str]

    # Explanations
    explanation: str
    clinical_reasoning: str

    # Actions
    suggested_actions: List[str]
    when_to_seek_care: str

    # Disclaimers
    disclaimers: List[str]

    class Config:
        json_schema_extra = {
            "example": {
                "id": "assess-001",
                "child_id": "child-001",
                "timestamp": "2024-01-15T10:30:00Z",
                "risk_level": "moderate",
                "risk_score": 0.45,
                "confidence": 0.85,
                "risk_factors": [
                    {
                        "name": "fever",
                        "contribution": 0.3,
                        "description": "Temperature of 102°F is elevated",
                        "source": "symptom_input"
                    }
                ],
                "primary_recommendation": "Monitor symptoms closely",
                "secondary_recommendations": [
                    "Ensure adequate hydration",
                    "Check temperature every 4 hours"
                ],
                "red_flags": [],
                "warning_signs": ["Fever lasting more than 3 days"],
                "explanation": "Based on the reported symptoms...",
                "clinical_reasoning": "Fever in this age group...",
                "suggested_actions": ["Rest", "Fluids"],
                "when_to_seek_care": "If fever exceeds 104°F or lasts more than 3 days",
                "disclaimers": [
                    "This is not a medical diagnosis",
                    "Consult a healthcare provider for medical advice"
                ]
            }
        }


# Guideline Schemas
class GuidelineRequest(BaseModel):
    """Guideline query request."""
    query: str = Field(..., description="Search query for guidelines")
    symptoms: Optional[List[str]] = None
    age_months: Optional[int] = None
    max_results: int = Field(default=5, ge=1, le=20)


class GuidelineSource(BaseModel):
    """Guideline source information."""
    name: str
    url: Optional[str]
    organization: str
    last_updated: Optional[datetime]


class GuidelineResponse(BaseModel):
    """Guideline response."""
    id: str
    title: str
    content: str
    relevance_score: float
    source: GuidelineSource
    key_points: List[str]
    age_specific: bool
    warning_signs: List[str]


class GuidelinesResponse(BaseModel):
    """Multiple guidelines response."""
    query: str
    results: List[GuidelineResponse]
    total_found: int


# Environment Schemas
class LocationRequest(BaseModel):
    """Location for environmental data."""
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

    class Config:
        json_schema_extra = {
            "example": {
                "latitude": 40.7128,
                "longitude": -74.0060
            }
        }


class AirQualityResponse(BaseModel):
    """Air quality data response."""
    aqi: int = Field(..., ge=0)
    category: str
    dominant_pollutant: str
    pollutants: Dict[str, float]
    health_implications: str
    recommendation: str
    pediatric_advisory: Optional[str]
    data_timestamp: datetime
    location: str


class WeatherResponse(BaseModel):
    """Weather data response."""
    temperature: float
    feels_like: float
    humidity: int
    conditions: str
    wind_speed: float
    uv_index: Optional[float]
    alerts: List[str]
    pediatric_considerations: List[str]
    data_timestamp: datetime
    location: str


class EnvironmentResponse(BaseModel):
    """Combined environmental data."""
    air_quality: AirQualityResponse
    weather: WeatherResponse
    health_impact_summary: str
    recommendations: List[str]


# Generic Schemas
class PaginationParams(BaseModel):
    """Pagination parameters."""
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)


class PaginatedResponse(BaseModel):
    """Generic paginated response."""
    items: List[Any]
    total: int
    page: int
    page_size: int
    total_pages: int


class ErrorResponse(BaseModel):
    """Error response model."""
    error: str
    message: str
    detail: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(__import__('datetime').timezone.utc))


class SuccessResponse(BaseModel):
    """Generic success response."""
    message: str
    data: Optional[Dict[str, Any]] = None
