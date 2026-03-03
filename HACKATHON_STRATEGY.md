# EPCID Hackathon Strategy — Gemini Live Agent Challenge

## Current State Assessment

### ✅ What We Have

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Gemini Model | ✅ | Gemini 2.5 Flash, Gemini Live API |
| Google GenAI SDK | ✅ | `@google/genai` v1.43+ |
| Google Cloud Service | ✅ | Cloud Run (frontend + backend) |
| Live API (Voice + Vision) | ✅ | `voiceTriage.ts` with camera support |
| Barge-in Support | ✅ | Native in Gemini Live API |
| Cloud Deployment | ✅ | Cloud Build configs exist |

### ⚠️ Gaps to Address

| Requirement | Status | Action Needed |
|-------------|--------|---------------|
| Proof of GCP Deployment | ⚠️ | Screen recording or code file showing GCP |
| Architecture Diagram Image | ⚠️ | Convert Mermaid to PNG/SVG for judges |
| Demo Video (<4 min) | ⚠️ | Create video showing Live API features |
| Vertex AI Integration | 💡 | OPTIONAL but strengthens GCP story |
| ADK Usage | 💡 | OPTIONAL alternative to GenAI SDK |

---

## Strategy: Vertex AI Integration

### Option A: Hybrid Approach (Recommended)

**Frontend (Keep as-is):**
- `@google/genai` SDK for Gemini Live API (client-side voice/vision)
- Works well for real-time streaming

**Backend (Add Vertex AI):**
- Use `@google-cloud/vertexai` for Python agents
- Better enterprise security (IAM vs API keys)
- Native GCP integration
- Enables Search & Grounding features

```
┌─────────────────────────────────────────────────────────────────┐
│                        EPCID Architecture                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Browser (Next.js)                      │   │
│  │  ┌─────────────────┐    ┌─────────────────────────────┐  │   │
│  │  │ Voice Triage    │    │ AI Chat                     │  │   │
│  │  │ @google/genai   │    │ @google/genai               │  │   │
│  │  │ Live API        │    │ Gemini 2.5 Flash           │  │   │
│  │  │ (Client-side)   │    │ (Server API Route)          │  │   │
│  │  └─────────────────┘    └─────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              FastAPI Backend (Cloud Run)                  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │   │
│  │  │ Vertex AI   │  │ Cloud SQL   │  │ Secret Manager  │   │   │
│  │  │ Gemini API  │  │ (Postgres)  │  │ (API Keys)      │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Vertex AI Benefits for Hackathon

1. **Shows Multiple GCP Services** — Cloud Run + Vertex AI + Secret Manager
2. **Better Security** — IAM authentication instead of API keys
3. **Grounding** — Connect to Google Search for fact-checking
4. **RAG Ready** — Vertex AI Search for medical guidelines
5. **Enterprise Story** — HIPAA-ready architecture

---

## Implementation Plan

### Phase 1: Add Vertex AI to Backend (High Impact)

**File: `src/services/vertex_ai_service.py`**

```python
"""
Vertex AI Gemini Service — Enterprise-grade AI for EPCID agents
"""
from google.cloud import aiplatform
from vertexai.generative_models import GenerativeModel, Part
import vertexai

class VertexAIService:
    def __init__(self, project_id: str, location: str = "us-central1"):
        vertexai.init(project=project_id, location=location)
        self.model = GenerativeModel("gemini-2.5-flash")
    
    async def analyze_symptoms(self, symptoms: list, age: int) -> dict:
        prompt = f"""Analyze these pediatric symptoms for a {age}-year-old:
        Symptoms: {', '.join(symptoms)}
        
        Return JSON with: urgency, recommendation, warningSignsToWatch
        """
        
        response = await self.model.generate_content_async(
            prompt,
            generation_config={
                "temperature": 0.3,
                "response_mime_type": "application/json",
            }
        )
        return response.text
```

### Phase 2: Add Secret Manager (Security Best Practice)

**File: `src/services/secrets_service.py`**

```python
from google.cloud import secretmanager

def get_secret(secret_id: str, project_id: str) -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")
```

### Phase 3: Update Cloud Build for Vertex AI

**File: `cloudbuild-backend.yaml`**

```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/epcid-backend', '.']
  
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/epcid-backend']
  
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    args:
      - 'run'
      - 'deploy'
      - 'epcid-backend'
      - '--image=gcr.io/$PROJECT_ID/epcid-backend'
      - '--region=us-central1'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--set-env-vars=PROJECT_ID=$PROJECT_ID'
      # Service account with Vertex AI permissions
      - '--service-account=epcid-backend@$PROJECT_ID.iam.gserviceaccount.com'
```

---

## Submission Checklist

### Required Items

- [ ] **Text Description** — README.md ✅
- [ ] **Public Code Repository** — GitHub ✅
- [ ] **Spin-up Instructions** — In README ✅
- [ ] **Proof of GCP Deployment** 
  - Option A: Screen recording of Cloud Console
  - Option B: Link to `vertex_ai_service.py` showing Vertex AI usage
- [ ] **Architecture Diagram** — Create PNG from Mermaid
- [ ] **Demo Video (<4 min)**
  - Show voice triage with camera
  - Show barge-in interruption
  - Show symptom analysis
  - Explain problem & solution

### Bonus Points

- [ ] **Blog/Podcast/Video** about building with Google AI
  - Include `#GeminiLiveAgentChallenge` hashtag
  - Mention "created for hackathon purposes"
- [ ] **Automated Cloud Deployment** ✅ (Cloud Build configs)
- [ ] **GDG Membership** — Sign up at developers.google.com/community/gdg

---

## Demo Video Script (4 Minutes)

### 0:00-0:30 — Problem Statement
> "Every year, thousands of children die from conditions like sepsis that show warning signs 24+ hours before critical deterioration. Parents struggle to know when symptoms are serious enough to seek care."

### 0:30-1:30 — Voice Triage Demo (Gemini Live API)
> "EPCID lets parents TALK to an AI pediatric nurse. Watch as I describe symptoms naturally... [show voice interaction] ...and now I'll show a rash via camera... [enable camera] ...the AI sees and assesses in real-time. Notice I can interrupt at any time — this is barge-in support from the Gemini Live API."

### 1:30-2:30 — Symptom Checker & Clinical Scoring
> "For parents who prefer typing, our symptom checker uses Gemini 2.5 Flash with structured JSON output to provide clinical risk scores based on Phoenix Sepsis Criteria and PEWS..."

### 2:30-3:15 — Architecture & Google Cloud
> "Let me show the architecture... [show diagram] ...Frontend on Cloud Run, backend with Vertex AI Gemini API, all secured with Secret Manager. Here's our Cloud Console showing the deployment..."

### 3:15-4:00 — Value & Future
> "EPCID helps parents detect critical illness early — before it becomes an emergency. Early detection saves lives. Thank you."

---

## Quick Wins to Maximize Score

### Innovation & Multimodal UX (40%)
- [x] Voice-first interaction (Gemini Live API)
- [x] Vision during voice calls (camera streaming)
- [x] Barge-in support
- [x] Real-time transcription
- [ ] Add distinct AI persona/voice customization

### Technical Implementation (30%)
- [x] Google GenAI SDK
- [x] Cloud Run deployment
- [ ] Add Vertex AI for backend agents
- [ ] Add Secret Manager for API keys
- [x] Error handling & fallbacks (Groq backup)
- [x] Grounding via clinical guidelines

### Demo & Presentation (30%)
- [x] Architecture diagram
- [ ] Create video demo
- [ ] Screen recording of Cloud Console
- [ ] Clear problem/solution narrative

---

## Recommended Immediate Actions

### Priority 1 (Must Do)
1. Create 4-minute demo video
2. Take screen recording of Cloud Console (proof of GCP)
3. Export architecture diagram as PNG

### Priority 2 (Nice to Have)
4. Add Vertex AI service to backend
5. Add Secret Manager integration
6. Write blog post with #GeminiLiveAgentChallenge

### Priority 3 (Bonus)
7. Sign up for GDG
8. Add ADK alongside GenAI SDK

---

## Vertex AI vs GenAI SDK Decision

| Aspect | @google/genai | Vertex AI |
|--------|---------------|-----------|
| **Best For** | Client-side, Live API | Server-side, enterprise |
| **Auth** | API Key | IAM (Service Account) |
| **Live API** | ✅ Full support | ⚠️ Limited |
| **Grounding** | ⚠️ Manual | ✅ Built-in |
| **Security** | Basic | Enterprise (HIPAA-ready) |
| **Cost** | Pay-per-use | Pay-per-use + quotas |

**Recommendation:** Use BOTH
- `@google/genai` for frontend (Live API, voice/vision)
- `Vertex AI` for backend (agents, structured analysis)

This shows judges you understand the Google Cloud ecosystem deeply.
