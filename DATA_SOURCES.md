# EPCID External Data Sources & API Integration Guide

## Overview

This document outlines the external data sources and APIs that enhance EPCID's clinical decision support capabilities. These integrations transform EPCID from a basic health tracker into an intelligent, context-aware pediatric health platform.

---

## 1. Implemented APIs (Ready to Use)

### 1.1 CDC Data Integration (`/api/v1/external-data/`)

| Endpoint | Data Source | Use Case |
|----------|-------------|----------|
| `GET /disease-activity/{state}` | CDC FluView | Show local flu/RSV activity levels |
| `GET /outbreak-alerts/{state}` | CDC NNDSS | Alert parents to local outbreaks |
| `GET /vaccinations/due` | CDC Schedule | Track vaccination status |
| `POST /growth/percentile` | WHO/CDC Charts | Calculate growth percentiles |
| `GET /vital-ranges` | PALS Guidelines | Age-appropriate vital sign ranges |

**Example Usage:**
```typescript
// Get disease activity for California
const activity = await fetch('/api/v1/external-data/disease-activity/CA');

// Get due vaccinations for 6-month-old
const vaccines = await fetch('/api/v1/external-data/vaccinations/due?age_months=6');
```

### 1.2 OpenFDA Drug Information (`/api/v1/external-data/drug-info/`)

| Endpoint | Data Source | Use Case |
|----------|-------------|----------|
| `GET /drug-info/{name}` | OpenFDA Labels | Drug warnings, pediatric use |
| `GET /drug-interactions` | OpenFDA FAERS | Check drug-symptom correlations |

**Example Usage:**
```typescript
// Get Tylenol information
const drug = await fetch('/api/v1/external-data/drug-info/acetaminophen');

// Check if nausea is commonly reported with ibuprofen
const check = await fetch('/api/v1/external-data/drug-interactions?drug_name=ibuprofen&symptom=nausea');
```

### 1.3 Air Quality (`/api/v1/external-data/air-quality`)

| Endpoint | Data Source | Use Case |
|----------|-------------|----------|
| `GET /air-quality` | AirNow API | Current AQI with pediatric guidance |

---

## 2. Recommended Kaggle Datasets

### 2.1 For Training/Validation (Requires Preprocessing)

| Dataset | Kaggle Link | EPCID Use Case |
|---------|-------------|----------------|
| **MIMIC-III Clinical Database** | Requires PhysioNet access | Vital sign baselines, PEWS validation |
| **Symptom-Disease Dataset** | `niyarrbarman/symptom2disease` | Symptom → condition mapping |
| **Medical Speech, Transcription** | Various | Voice symptom input training |
| **Pediatric Chest X-rays** | `paultimothymooney/chest-xray-pneumonia` | (Future) Image-based screening |

### 2.2 For Reference Data (Static Import)

| Dataset | Kaggle Link | EPCID Use Case |
|---------|-------------|----------------|
| **WHO Child Growth Standards** | `manishp123/who-growth-standards` | Growth percentile calculations |
| **ICD-10 Codes** | `jameslko/icd10-cm-codes` | Standardized condition coding |
| **Drug Database** | `jessicali9530/kuc-hackathon-winter-2018` | Medication information |

---

## 3. Free APIs to Integrate

### 3.1 Health Data APIs

| API | Registration | Rate Limit | Use Case |
|-----|--------------|------------|----------|
| **OpenFDA** | Optional (higher limits with key) | 240/min (no key) | Drug safety data |
| **CDC FluView** | None | Reasonable | Flu surveillance |
| **AirNow** | Free key required | 500/hour | Air quality |
| **OpenWeather** | Free tier available | 60/min | Weather correlation |
| **MedlinePlus Connect** | None | Reasonable | Health topic info |

### 3.2 API Registration Links

```
OpenFDA:        https://open.fda.gov/apis/authentication/
AirNow:         https://docs.airnowapi.org/
OpenWeather:    https://openweathermap.org/api
NLM MedlinePlus: https://medlineplus.gov/connect/overview.html
```

---

## 4. Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         EPCID App                                │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Next.js)                                              │
│  └── /api/external-data/* → Backend proxy routes                 │
├─────────────────────────────────────────────────────────────────┤
│  Backend (FastAPI)                                               │
│  ├── services/cdc_service.py      ← CDC Data                     │
│  ├── services/openfda_service.py  ← OpenFDA                      │
│  ├── services/air_quality_service.py ← AirNow/OpenAQ             │
│  ├── services/weather_service.py  ← OpenWeather                  │
│  └── services/medlineplus_service.py ← MedlinePlus               │
├─────────────────────────────────────────────────────────────────┤
│  Data Layer                                                      │
│  ├── Redis Cache (API responses, 30min-24hr TTL)                 │
│  ├── PostgreSQL (user data, historical readings)                 │
│  └── Static Files (Kaggle datasets, reference tables)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Implementation Priority

### Phase 1: Essential (Implement Now)
1. **✅ CDC Vital Sign Ranges** - Already implemented in `cdc_service.py`
2. **✅ OpenFDA Drug Info** - Already implemented in `openfda_service.py`
3. **✅ Vaccination Schedule** - Already implemented in `cdc_service.py`
4. **🔄 Air Quality with API Key** - Service exists, needs real API key

### Phase 2: High Value
1. **Disease Outbreak Alerts** - Connect to CDC FluView XML feed
2. **Growth Percentiles** - Import full WHO dataset
3. **Weather Correlation** - Connect OpenWeather for symptom patterns

### Phase 3: Advanced
1. **Symptom-Disease ML Model** - Train on Kaggle dataset
2. **Drug Interaction Checker** - Full FAERS integration
3. **Predictive Alerts** - ML model for illness progression

---

## 6. Environment Variables Needed

```bash
# Add to .env file

# OpenFDA (optional, increases rate limit)
OPENFDA_API_KEY=your_key_here

# AirNow (required for real air quality data)
AIRNOW_API_KEY=your_key_here

# OpenWeather (required for weather data)
OPENWEATHER_API_KEY=your_key_here

# CDC (no key required, but may need for specific endpoints)
# Most CDC data is freely accessible
```

---

## 7. Sample Integration Code

### Frontend: Fetch Disease Activity

```typescript
// src/lib/external-data.ts
export async function getDiseaseActivity(state: string) {
  const response = await fetch(`/api/v1/external-data/disease-activity/${state}`);
  if (!response.ok) throw new Error('Failed to fetch disease activity');
  return response.json();
}

export async function getHealthContext(state: string, zipCode?: string, ageMonths?: number) {
  const params = new URLSearchParams({ state });
  if (zipCode) params.append('zip_code', zipCode);
  if (ageMonths) params.append('age_months', String(ageMonths));
  
  const response = await fetch(`/api/v1/external-data/health-context?${params}`);
  return response.json();
}
```

### Dashboard Component: Show Local Alerts

```tsx
// In dashboard component
const [alerts, setAlerts] = useState([]);

useEffect(() => {
  const fetchAlerts = async () => {
    const state = userLocation?.state || 'CA';
    const data = await fetch(`/api/v1/external-data/outbreak-alerts/${state}`);
    setAlerts(await data.json());
  };
  fetchAlerts();
}, [userLocation]);

// Render alerts
{alerts.map(alert => (
  <Alert key={alert.disease} severity={alert.severity}>
    <AlertTitle>{alert.title}</AlertTitle>
    {alert.message}
  </Alert>
))}
```

---

## 8. Data Privacy Considerations

| Data Type | Storage | Retention | Notes |
|-----------|---------|-----------|-------|
| CDC Disease Data | Cache only | 6 hours | Public data, no PII |
| Air Quality | Cache only | 30 min | Location-based, no PII |
| Drug Lookups | Cache only | 24 hours | No user data sent |
| Growth Percentiles | Not stored | N/A | Calculated on-demand |
| User Vitals | PostgreSQL | User-controlled | Encrypted, HIPAA-compliant |

---

## 9. Testing the APIs

```bash
# Test disease activity
curl http://localhost:8090/api/v1/external-data/disease-activity/CA

# Test vaccination schedule
curl "http://localhost:8090/api/v1/external-data/vaccinations/due?age_months=6"

# Test vital ranges
curl "http://localhost:8090/api/v1/external-data/vital-ranges?age_months=12&vital_type=heart_rate"

# Test drug info
curl http://localhost:8090/api/v1/external-data/drug-info/acetaminophen

# Test complete health context
curl "http://localhost:8090/api/v1/external-data/health-context?state=CA&zip_code=94102&age_months=18"
```

---

## 10. Recommended Next Steps

1. **Get API Keys**: Register for AirNow and OpenWeather free tiers
2. **Download WHO Growth Data**: Import full growth chart dataset
3. **Test Endpoints**: Verify all external data routes work
4. **Add to Dashboard**: Display disease alerts and air quality
5. **Cache Strategy**: Implement Redis for production caching

---

## Resources

- [OpenFDA Documentation](https://open.fda.gov/apis/)
- [CDC FluView API](https://www.cdc.gov/flu/weekly/fluviewinteractive.htm)
- [AirNow API](https://docs.airnowapi.org/)
- [WHO Growth Standards](https://www.who.int/tools/child-growth-standards)
- [AAP Bright Futures](https://brightfutures.aap.org/) - Pediatric guidelines
- [PALS Guidelines](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines) - Vital sign ranges
