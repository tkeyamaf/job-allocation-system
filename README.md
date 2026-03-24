# CareerBridge — Your Bridge to the Career You Deserve

## Overview

CareerBridge is a full-stack job matching and allocation platform that connects candidates with high-paying opportunities. The system uses intelligent rule-based matching to ensure fair, transparent, and personalized job placements.

Whether you're a recent grad, a career changer, or a seasoned professional — CareerBridge helps you find a career that pays well, fits your life, and excites you every day.

## Live Site

**[https://job-allocation-system.onrender.com](https://job-allocation-system.onrender.com)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express |
| Database | PostgreSQL (hosted on Render) |
| Authentication | JWT + bcryptjs |
| Email | Nodemailer + Gmail |
| AI Features | Anthropic Claude API |
| Job Listings | JSearch API (RapidAPI) |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Hosting | Render (backend + DB) |

---

## Features

### User Accounts
- Sign up with full name, email, and password
- Auto-generated unique student number (format: `CB-XXXXXX`)
- Welcome email sent on signup with student number and next steps
- JWT-based authentication (7-day tokens)
- Persistent login via localStorage

### Dashboard
- Student number display
- Fit score indicator
- Saved jobs count and list
- Recent applications tracker
- Profile completion status
- Next steps guidance

### Jobs
- Real job listings pulled from JSearch API (LinkedIn, Indeed, Glassdoor)
- Search by keyword, filter by status and location
- Save jobs to your profile
- Apply to jobs directly from the listing
- Falls back to sample jobs if API is unavailable

### Eligibility Checker
- Check if you qualify for a job before applying
- Auto-fills student ID and fit score when logged in
- Job selector dropdown (no manual ID entry needed)
- Human-readable explanations for every rule outcome

### Job Recommendations
- Personalized job list based on your student ID and fit score
- Auto-filled from your account when logged in
- Filtered by allocation rules (cooldown, caps, fit threshold)

### AI Resume Builder
- Generate a professional resume using Claude AI
- Based on your profile data
- Available from the dashboard

### AI Interview Prep
- Get custom interview questions for any job
- Powered by Claude AI
- Tailored to the specific job title and description

### Email Notifications
- Welcome email on account creation
- Interview readiness alerts sent to the applicant's email

### Candidate Profile
- Full profile form: personal info, job preferences, skills, education, experience
- Tags input for skills, industries, certifications
- Resume upload
- Profile picture upload
- Saves to PostgreSQL candidates table

---

## Allocation Rules

| Rule | Behavior |
|---|---|
| **FIT_THRESHOLD** | Fit score must be ≥ 70 |
| **JOB_CAP** | Max 12 allocations per job within 7 days |
| **COMPANY_CAP** | Max 30 allocations per company within 7 days |
| **STUDENT_WEEKLY_CAP** | Max 5 allocations per student within 7 days |
| **COOLDOWN** | 14-day cooldown before reapplying to the same job (bypassed if job is REOPENED) |

---

## API Endpoints

### Auth
```
POST /api/auth/signup        — Create account, get JWT + student number
POST /api/auth/login         — Login, get JWT
GET  /api/auth/me            — Get current user (requires Bearer token)
```

### Jobs
```
GET  /api/jobs               — List all jobs (supports ?search=&status=&location=)
POST /api/jobs/save          — Save a job (auth required)
DELETE /api/jobs/save/:jobId — Unsave a job (auth required)
GET  /api/jobs/saved         — Get saved jobs (auth required)
POST /api/jobs/apply         — Apply to a job (auth required)
GET  /api/jobs/applications  — Get applications (auth required)
GET  /jobs/recommend         — Get recommended jobs (?studentId=&fitScore=)
```

### Allocation
```
GET  /allocate/check         — Check eligibility without writing to DB
POST /allocate               — Submit allocation (full transaction)
```

### Candidates
```
POST /api/candidates         — Create/update candidate profile
GET  /api/candidates/:id     — Get candidate by ID
```

### AI
```
POST /api/ai/resume          — Generate AI resume
POST /api/ai/interview-prep  — Generate interview questions
```

### Notifications
```
POST /api/notifications/interview — Send interview alert email
```

### Dashboard
```
GET  /api/dashboard          — Get user dashboard data (auth required)
```

---

## Database Tables

| Table | Purpose |
|---|---|
| `users` | Accounts, student numbers, JWT auth |
| `students` | Student records for allocation engine |
| `companies` | Company records |
| `jobs` | Job listings |
| `allocation_ledger` | All allocation records with rule enforcement |
| `candidates` | Full candidate profiles |
| `saved_jobs` | Jobs saved by users |
| `job_applications` | Applications submitted by users |

---

## Environment Variables

```env
DATABASE_URL=postgresql://...
PORT=3000
RAPIDAPI_KEY=...         # JSearch API key from RapidAPI
ANTHROPIC_API_KEY=...    # Claude AI API key
EMAIL_FROM=...           # Gmail address for sending emails
EMAIL_APP_PASSWORD=...   # Gmail App Password
JWT_SECRET=...           # Secret key for signing JWT tokens
```

---

## Project Structure

```
src/
  config/
    database.ts
  db/
    schema.sql
    migration_v2.sql     (candidates table)
    migration_v4.sql     (users, saved_jobs, job_applications)
    runSchema.ts
    runMigrationV2.ts
    runMigrationV4.ts
    seed.sql
  routes/
    auth.ts
    jobs.ts
    candidates.ts
    savedJobs.ts
    ai.ts
    notifications.ts
  services/
    allocationService.ts
    allocationTransactionService.ts
    recommendationService.ts
    jobImportService.ts
  index.ts

public/
  index.html
  styles.css
  app.js
```

---

## How to Run Locally

```bash
npm install
npm run dev
```

Server runs on: http://localhost:3000

### Database Setup

```bash
npm run db:schema       # Create core tables
npm run db:migrate      # Run migration v2
npm run db:migrate4     # Run migration v4
```

---

## Deployment

Hosted on **Render** with a managed PostgreSQL database.

- Push to `main` branch triggers auto-deploy
- Build command: `npm install && npm run build`
- Start command: `npm start`

---

**Last Updated**: 2026-03-24
