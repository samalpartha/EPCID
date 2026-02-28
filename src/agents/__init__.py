"""
EPCID Agents Module

Specialized agents for pediatric health assessment:
- IngestionAgent: Normalizes multimodal inputs
- PhenotypeAgent: Derives clinical phenotypes
- RiskAgent: Risk stratification with rules + ML
- GuidelineRAGAgent: Retrieves validated guidelines
- MedicationSafetyAgent: Drug safety awareness
- GeoExposureAgent: Environmental exposure analysis
- EscalationAgent: Workflow and care navigation
"""

from .base_agent import BaseAgent, AgentConfig, AgentResponse
from .ingestion_agent import IngestionAgent
from .phenotype_agent import PhenotypeAgent
from .risk_agent import RiskAgent
from .guideline_rag_agent import GuidelineRAGAgent
from .medication_safety_agent import MedicationSafetyAgent
from .geo_exposure_agent import GeoExposureAgent
from .escalation_agent import EscalationAgent

__all__ = [
    "BaseAgent",
    "AgentConfig",
    "AgentResponse",
    "IngestionAgent",
    "PhenotypeAgent",
    "RiskAgent",
    "GuidelineRAGAgent",
    "MedicationSafetyAgent",
    "GeoExposureAgent",
    "EscalationAgent",
]
