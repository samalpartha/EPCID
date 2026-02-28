"""
EPCID Clinical Scoring Module

Evidence-based clinical scoring systems for pediatric risk assessment:
- Phoenix Sepsis Score (2024 JAMA criteria)
- Pediatric Early Warning Score (PEWS)
- Physical Exam Signs Assessment
- Age-adjusted vital sign normalization
"""

from .phoenix_score import PhoenixScoreCalculator, PhoenixScore
from .pews import PEWSCalculator, PEWSScore
from .physical_exam import PhysicalExamAssessment
from .vital_signs import VitalSignNormalizer, AgeAdjustedVitals

__all__ = [
    "PhoenixScoreCalculator",
    "PhoenixScore",
    "PEWSCalculator", 
    "PEWSScore",
    "PhysicalExamAssessment",
    "VitalSignNormalizer",
    "AgeAdjustedVitals",
]
