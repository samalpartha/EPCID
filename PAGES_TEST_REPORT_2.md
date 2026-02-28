# EPCID Dashboard Pages - Test Report (Batch 2)

**URL:** https://epcid-frontend-365415503294.us-central1.run.app  
**Session:** Demo login with Emma selected  
**Date:** February 27, 2025  

---

## PAGE 1: AI Assistant (`/dashboard/chat`)

### Screenshots
- `page1-chat-initial.png` – Initial load
- `page1-chat-after-send.png` – After sending message and waiting 5 seconds

### Chat Interface Visible?
✅ **Yes** – Full chat UI with header, message area, input, and suggested prompts

### Pre-loaded Messages?
✅ **Yes** – Welcome message from EPCID Assistant:
- "I'm your AI-powered pediatric health assistant, here to help you monitor **Emma's** health and detect early warning signs of illness"
- **How I can help:** Assess symptoms, flag warning signs, home care guidance, prepare for visits, medication/dosing questions
- **Smart Features:** Auto-log vitals, set reminders, quick actions for dosages/care
- **Important:** Not a doctor, can't diagnose; call 911 for emergencies
- "How can I help you today?"
- **Suggested prompts:** "My child has a fever of 101°F...", "What are warning signs...", "When should I take my child to the ER?", "How do I know if it's just a cold..."

### Message Sent
- **User:** "What should I do about Emma's fever?"
- **System:** "✓ Logged symptoms to Emma's record: Fever" (auto-extracted from message)

### AI Response?
❌ **Error** – AI did not return a normal answer. Response shown:
> "I'm having trouble connecting to my AI services right now. For immediate medical concerns, please call your pediatrician or go to the nearest emergency room. You can also try again in a moment."

- **Connect with Nurse** button shown below the error

### UI Issues
- **Disclaimer:** May be truncated ("professio..." vs "professionals") on some viewports
- **Status:** "fallback" tag visible next to "Online" in header

---

## PAGE 2: Mental Wellness (`/dashboard/mental-health`)

### Screenshots
- `page2-mental-initial.png` – Mood Tracker tab
- `page2-mental-coping.png` – Coping Tools tab
- `page2-mental-journal.png` – Journal tab

### Tabs Visible?
✅ **Yes** – Mood Tracker, Coping Tools, Journal, Get Help

### Demo Mood Data?
✅ **Yes** – On Mood Tracker:
- **Summary:** Average Mood 3.0/5 (improving), Anxiety 4.3/10, Energy 3.0/5, Entries 3 (Last 7 days)
- **Mood History:**
  - **Good** (2/26/2026): Energy 4/5, Anxiety 2/10, Sleep 4/5 – "Had a great day at school!"
  - **Okay** (2/25/2026): Energy 3/5, Anxiety 5/10, Sleep 3/5 – "Worried about the math test" – Tags: Tests/homework
  - **Not Great** (2/24/2026): Energy 2/5, Anxiety 6/10, Sleep 2/5 – Tags: Friendship issues, Sleep problems

### Tab Content

**Mood Tracker (default):**
- Summary cards and mood history as above
- "+ Log Mood" button

**Coping Tools:**
- **Filters:** All, Breathing, Grounding, Movement, Creative, Social, Mindfulness, Distraction
- **Content:** "Bubble Breathing" – "Pretend you're blowing bubbles to slow down your breathing" (3 min) – "Try It >"

**Journal:**
- **Prompt:** "Writing about your feelings can help you understand them better"
- **"+ New Entry"** button
- **Demo entries:**
  1. **"Best Day Ever!"** (Feb 26, 2026) – Soccer goal, surprise party – Tags: #happy, #friends, #soccer
  2. **"Feeling worried"** (Feb 24, 2026) – Big presentation, tried breathing exercises – Tags: #anxious, #school

**Get Help:** Not captured in screenshots; tab is present

### UI Issues
- None observed

---

## PAGE 3: Telehealth (`/dashboard/telehealth`)

### Screenshot
- `page3-telehealth.png`

### Content

**Telehealth Services:**
- **Video Consultation:** Connect with pediatric nurse via secure video – Avg wait 5–10 min
- **Nurse Hotline:** 24/7 pediatric nurse advice line – HIPAA Compliant

**Smart Health Handoff (Preview):**
- **Emma:** 3yo female, 32 lbs, mild asthma
- **Risk Score:** 50
- **Summary:** "3yo female presenting with temperature of 101.3°F (recorded 1h ago). Recent symptoms: Fever; Fever, Cough, Runny Nose. 3 medication dose(s) in last 24h."
- **Vitals:** 101.3°F (1h ago), Heart Rate 112, O2 Sat 97%
- **Temperature Trend (24h):** Chart
- **Recent Medications (24h):** Children's Tylenol 7.5 mL (05:13 PM), Children's Motrin 7.5 mL (11:13 AM), Children's Tylenol 7.5 mL (05:13 AM)
- **Recent Symptoms:** Fever, Cough, Runny Nose, Fatigue, Congestion
- **Actions:** Preview, Share with Doctor, Copy

### Video Call Options?
✅ **Yes** – Video Consultation and Nurse Hotline

### Doctor List?
❌ **No** – Service types (video, hotline) only; no named doctor list

### UI Issues
- None observed

---

## PAGE 4: Find Care (`/dashboard/find-care`)

### Screenshot
- `page4-find-care.png`

### Map?
✅ **Yes** – Map with markers for facilities
- **Your Location** (blue dot)
- **Recommended** (star)
- Facility markers (stethoscope, video, heart, building icons)

### Care Facility Listings?
✅ **Yes** – 6 facilities:
- Pediatric Associates of SF – Open, In-Network, 3.5 mi
- Teladoc Pediatrics – Virtual Visit, Available 24/7
- CVS Pharmacy – 0.5 mi
- QuickCare Pediatric Urgent Care
- Children's Hospital Emergency
- CityMed Urgent Care – Out-of-Network

**Per listing:** Name, status, network, description, address, distance, hours, rating, wait time, Call/Directions/Ride

### Other
- **Emergency:** Call 911 banner
- **Find Care Near You** – "Finding care for Emma"
- **Use My Location**
- **Insurance Filter:** BlueCross BlueShield, In-Network Only
- **Category filters:** All, Emergency Room, Urgent Care, Telehealth, Pediatrician, Pharmacy
- **"Skip the Wait - See a Doctor Now"** – Start Video Visit

### UI Issues
- None observed

---

## PAGE 5: Night Mode (`/dashboard/night-vitals`)

### Screenshot
- `page5-night-mode.png`

### Simplified Dark View?
✅ **Yes** – Dark theme with white/amber text

### Vital Signs?
✅ **Yes** – All shown:
- **Temperature:** 101.3°F – "Falling" (green) – 1h ago
- **Heart Rate:** 112 bpm – 1h ago
- **Oxygen Saturation:** 97% – 1h ago

### Other
- **Time:** 07:14 PM
- **Child:** Emma
- **Medication reminder:** Wait 1h 59m, Next dose 9:13 PM – Children's Tylenol 7.5 mL, Given 2h 0m ago
- **Actions:** Log Dose, Log Symptom, Whisper Temp (voice input)
- **Footer:** "Night mode active • Whisper 'temp 101.2' to log"

### UI Issues
- None observed

---

## Summary Table

| Page | Works | Key Content | Errors | UI Issues |
|------|-------|-------------|--------|-----------|
| AI Assistant | Partial | Chat UI, welcome, suggestions | AI connection error | Disclaimer truncation |
| Mental Wellness | ✅ | Tabs, mood data, coping, journal | None | None |
| Telehealth | ✅ | Video, hotline, health handoff | None | None |
| Find Care | ✅ | Map, 6 facilities | None | None |
| Night Mode | ✅ | Dark view, vitals, med reminder | None | None |

---

Screenshots: `pages-screenshots-2/page1-chat-initial.png` through `page5-night-mode.png`
