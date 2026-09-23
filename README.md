# 🎓 TutorConnect — Teacher Registration & Parent Inquiry Management Platform

A modern, responsive, full-stack tutoring and educational management web application built with **React 18, TypeScript, Tailwind CSS, and Supabase**.

---

## 🌟 Key Features

### 👨‍🏫 1. Teacher/Tutor Registration Wizard
- **6-Step Progress Wizard**:
  - **Step 1 — Personal Details**: Name, Guardian Name, DOB, Gender, Phone, WhatsApp, Email, Profile/Passport Photo upload with instant preview.
  - **Step 2 — Address Details**: Current & Permanent Address with auto-copy ("Permanent address is same as current").
  - **Step 3 — Educational Qualification**: Class 10 (Board, Year, School, Percentage, Marksheet PDF/Image upload), Class 12 (Board, Stream, Year, School, Percentage, Marksheet upload), Higher Education (Highest degree, University, Passing year, Certificate upload).
  - **Step 4 — Teaching Details**: Multi-select subjects (+ custom subject entry), Class grades (Class 1-5 to College), Experience history, Teaching mode (Online/Offline/Both), Preferred locations, Available days & time slots, Min/Max fee budget & fee structure.
  - **Step 5 — Identity Document Upload**: Select ID type (Aadhaar, Voter ID, PAN, Driving Licence, Passport), enter document number, and securely upload scanned copy with encrypted storage policies.
  - **Step 6 — Review & Submit**: Comprehensive preview summary card, mandatory accuracy declaration & terms agreement checkboxes. Generates unique Application ID e.g., `TUT-2026-0001`.

### 🔍 2. Application Status Checker
- Tutors can check application status anytime by Application ID (`TUT-2026-XXXX`) or Email.
- Displays current status (`Submitted`, `Under Review`, `Documents Required`, `Approved`, `Rejected`) alongside admin messages & requested doc details.

### 👨‍👩‍👧 3. Parent Inquiry Form ("Find a Tutor")
- Parent & Student details, Grade, Required subjects, Tutor gender preference, Qualification preference, Budget range selector, Teaching mode, City & PIN code, Preferred schedule, and custom requirements.
- Generates Inquiry ID e.g., `INQ-2026-0001`.

### 🛡️ 4. Admin Dashboard & Control Portal
- **Admin Authentication**: Access at `/admin/login` (pre-configured with demo login `admin@tutorconnect.com` / `admin123`).
- **Dashboard Stats**: Real-time counters for Total Applications, Pending Verification, Approved Tutors, Rejected Tutors, Total Parent Inquiries, and New Inquiries.
- **Tutor Applications Manager**: Interactive table with search (Name, Phone, ID, City) and filters (Status, Gender, Subject, Qualification).
- **Tutor Profile Inspector & Document Vault**: Complete preview of academic marksheets and identity proofs with **Approve**, **Reject (with reason)**, and **Request Documents** action buttons.
- **Parent Inquiries Table**: Status workflow management (`New`, `Contacted`, `Matching`, `Tutor Suggested`, `Completed`, `Closed`).
- **Smart Tutor Matching Engine**: Algorithmically scores approved tutors against parent inquiry criteria (Subject, Grade, Budget, Location, Gender, Teaching Mode), displays ranked match cards with breakdown reasons, and enables instant tutor allocation to inquiries.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Storage Buckets)
- **Local Fallback Engine**: Transparent LocalStorage fallback for zero-config offline/demo testing
- **Deployment Ready**: Vercel

---

## 🚀 Setup & Local Development Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Installation
```bash
# Install dependencies
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Supabase Setup Instructions

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **New Project** and choose a project name (e.g., `tutorconnect`).

### 2. Execute SQL Schema
1. Open your Supabase Dashboard -> **SQL Editor**.
2. Copy the entire contents of the [`supabase/schema.sql`](./supabase/schema.sql) file in this repository.
3. Click **Run** to execute the script. This will create:
   - Tables: `profiles`, `tutor_applications`, `parent_inquiries`, `tutor_matches`
   - Enums & Indexes
   - Row Level Security (RLS) policies
   - Storage Buckets: `tutor-photos` (public), `tutor-documents` (private), `education-certificates` (private)

### 3. Environment Variables Configuration
1. Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Retrieve your credentials from Supabase Dashboard -> **Project Settings** -> **API**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Add them to your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Go to [https://vercel.com](https://vercel.com) and click **Add New Project**.
3. Select your GitHub repository.
4. Set Build Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**.

---

## 🔐 Security & Privacy Implementation

- **Document Privacy**: Identity cards and marksheets are saved in **PRIVATE** Supabase Storage buckets (`tutor-documents` & `education-certificates`).
- **RLS Policies**: Row-Level Security policies ensure public users and parents cannot access private identity documents. Only authenticated admins with the `admin` role can preview uploaded verification files.
- **Frontend Protection**: Service role keys are NEVER exposed in client code.

---

## 🔑 Demo Credentials

- **Admin Login**: `/admin/login`
- **Email**: `admin@tutorconnect.com`
- **Password**: `admin123`
*(Includes a 1-click Auto-Fill & Login button on the login form for testing!)*
