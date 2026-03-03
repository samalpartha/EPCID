# Google Cloud Deployment Proof — EPCID

This document provides evidence that EPCID's backend is running on Google Cloud, as required by the Gemini Live Agent Challenge.

## Google Cloud Services Used

| Service | Purpose | Evidence |
|---------|---------|----------|
| **Cloud Run** | Hosting frontend & backend | Live URLs below |
| **Vertex AI** | Enterprise Gemini API | `src/services/vertex_ai_service.py` |
| **Cloud Build** | Automated CI/CD | `cloudbuild-*.yaml` files |
| **Secret Manager** | API key storage | Referenced in code |
| **Artifact Registry** | Container images | Part of Cloud Build |

## Live Deployment URLs

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [https://epcid-frontend-365415503294.us-central1.run.app](https://epcid-frontend-365415503294.us-central1.run.app) | ✅ Live |
| **Backend API** | [https://epcid-backend-365415503294.us-central1.run.app](https://epcid-backend-365415503294.us-central1.run.app) | ✅ Live |
| **API Docs** | [https://epcid-backend-365415503294.us-central1.run.app/docs](https://epcid-backend-365415503294.us-central1.run.app/docs) | ✅ Live |

## Vertex AI API Endpoints (Live)

These endpoints demonstrate active Vertex AI integration:

| Endpoint | Method | Description | Try It |
|----------|--------|-------------|--------|
| `/api/v1/ai/status` | GET | Check Vertex AI status | [Link](https://epcid-backend-365415503294.us-central1.run.app/api/v1/ai/status) |
| `/api/v1/ai/analyze-symptoms` | POST | AI symptom analysis | [Docs](https://epcid-backend-365415503294.us-central1.run.app/docs#/AI%20Analysis%20(Vertex%20AI)/analyze_symptoms_with_ai_api_v1_ai_analyze_symptoms_post) |
| `/api/v1/ai/care-advice` | POST | AI care advice | [Docs](https://epcid-backend-365415503294.us-central1.run.app/docs#/AI%20Analysis%20(Vertex%20AI)/get_ai_care_advice_api_v1_ai_care_advice_post) |
| `/health/vertex-ai` | GET | Vertex AI health check | [Link](https://epcid-backend-365415503294.us-central1.run.app/health/vertex-ai) |

### Test Command

```bash
# Check Vertex AI status
curl https://epcid-backend-365415503294.us-central1.run.app/api/v1/ai/status

# Test AI symptom analysis
curl -X POST https://epcid-backend-365415503294.us-central1.run.app/api/v1/ai/analyze-symptoms \
  -H "Content-Type: application/json" \
  -d '{"child_age_years": 2, "symptoms": ["fever", "cough", "runny nose"]}'
```

## Code Evidence

### 1. Vertex AI Integration

**File:** `src/services/vertex_ai_service.py`

```python
import vertexai
from vertexai.generative_models import GenerativeModel, GenerationConfig

class VertexAIService:
    def __init__(self, project_id: str, location: str = "us-central1"):
        vertexai.init(project=project_id, location=location)
        self.model = GenerativeModel("gemini-2.5-flash")
    
    async def analyze_symptoms(self, symptoms: list, child_age_years: float) -> dict:
        response = await self.model.generate_content_async(
            prompt,
            generation_config=GenerationConfig(
                temperature=0.2,
                response_mime_type="application/json",
            ),
        )
        return response.text
```

### 2. Cloud Build Configuration

**File:** `cloudbuild-backend.yaml`

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
```

### 3. Cloud Run Detection in Code

**File:** `src/services/vertex_ai_service.py`

```python
# Detect if running on Google Cloud
IS_GOOGLE_CLOUD = os.environ.get("K_SERVICE") is not None

if IS_GOOGLE_CLOUD:
    import vertexai
    from vertexai.generative_models import GenerativeModel
```

### 4. Google Cloud Dependencies

**File:** `requirements.txt`

```
google-cloud-aiplatform>=1.38.0
google-cloud-secret-manager>=2.16.0
google-generativeai>=0.3.0
vertexai>=1.38.0
```

## Deployment Commands

```bash
# Deploy backend to Cloud Run
gcloud builds submit --config cloudbuild-backend.yaml

# Deploy frontend to Cloud Run
gcloud builds submit --config cloudbuild-frontend.yaml

# Verify deployment
gcloud run services list --region us-central1
```

## Cloud Console Screenshots

For the screen recording requirement, the following should be captured:

1. **Cloud Run Services** — Show both `epcid-frontend` and `epcid-backend` running
2. **Cloud Build History** — Show successful builds
3. **Vertex AI Model** — Show Gemini model access
4. **Logs Explorer** — Show live request logs

## Project Configuration

```
Project ID: [Your GCP Project ID]
Region: us-central1
Services:
  - epcid-frontend (Cloud Run)
  - epcid-backend (Cloud Run)
  - Vertex AI API (enabled)
  - Secret Manager API (enabled)
  - Cloud Build API (enabled)
```

---

**This document serves as proof of Google Cloud deployment for the Gemini Live Agent Challenge hackathon submission.**
