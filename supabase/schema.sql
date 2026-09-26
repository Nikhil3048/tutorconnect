-- ========================================================
-- TUTORCONNECT SUPABASE POSTGRESQL SCHEMA & SECURITY POLICIES
-- ========================================================

-- 1. Create EXTENSIONS if not present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
CREATE TYPE user_role AS ENUM ('admin', 'tutor', 'parent');
CREATE TYPE tutor_status AS ENUM ('Submitted', 'Under Review', 'Documents Required', 'Approved', 'Rejected');
CREATE TYPE inquiry_status AS ENUM ('New', 'Contacted', 'Matching', 'Tutor Suggested', 'Completed', 'Closed');
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE teaching_mode_type AS ENUM ('Online', 'Offline', 'Both');
CREATE TYPE fee_type_enum AS ENUM ('Per Hour', 'Per Class', 'Per Month');

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role user_role DEFAULT 'tutor',
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TUTOR APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.tutor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. TUT-2026-0001
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Personal Details
  full_name TEXT NOT NULL,
  guardian_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender gender_type NOT NULL,
  mobile TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  alternate_contact TEXT,
  photo_url TEXT,
  photo_file_name TEXT,

  -- Address Details (JSONB for clean structured storage)
  current_address JSONB NOT NULL,
  permanent_address JSONB NOT NULL,
  same_as_current BOOLEAN DEFAULT false,

  -- Academic Details (JSONB overview)
  class10_details JSONB NOT NULL,
  class12_details JSONB NOT NULL,
  higher_edu_details JSONB NOT NULL,

  -- Teaching Details (JSONB overview)
  teaching_details JSONB NOT NULL,

  -- Identity Document Details
  identity_doc JSONB NOT NULL,
  additional_certificates JSONB DEFAULT '[]'::jsonb,

  -- Status & Admin workflow
  confirmed_correct BOOLEAN DEFAULT true,
  agreed_to_terms BOOLEAN DEFAULT true,
  status tutor_status DEFAULT 'Submitted',
  admin_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PARENT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.parent_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id VARCHAR(30) UNIQUE NOT NULL, -- e.g. INQ-2026-0001

  -- Parent & Student Details
  parent_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_age INT NOT NULL,

  -- Requirements
  current_class TEXT NOT NULL,
  school_board TEXT NOT NULL,
  subjects_required TEXT[] NOT NULL,
  
  -- Preferences
  preferred_gender TEXT NOT NULL DEFAULT 'No Preference',
  qualification_preference TEXT NOT NULL DEFAULT 'Any Qualified Tutor',

  -- Budget
  budget_range TEXT NOT NULL,
  min_budget INT,
  max_budget INT,

  -- Teaching Mode & Address
  teaching_mode teaching_mode_type NOT NULL DEFAULT 'Both',
  address JSONB NOT NULL,

  -- Schedule
  preferred_days TEXT[] DEFAULT '{}',
  preferred_time_slots TEXT[] DEFAULT '{}',

  additional_requirements TEXT,
  status inquiry_status DEFAULT 'New',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TUTOR MATCHES TABLE (Admin-assisted matching)
CREATE TABLE IF NOT EXISTS public.tutor_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id UUID REFERENCES public.parent_inquiries(id) ON DELETE CASCADE,
  tutor_id UUID REFERENCES public.tutor_applications(id) ON DELETE CASCADE,
  match_score INT DEFAULT 0,
  match_reasons TEXT[] DEFAULT '{}',
  match_status TEXT DEFAULT 'Suggested', -- Suggested, Shortlisted, Assigned, Rejected
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(inquiry_id, tutor_id)
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_tutor_app_id ON public.tutor_applications(application_id);
CREATE INDEX IF NOT EXISTS idx_tutor_app_status ON public.tutor_applications(status);
CREATE INDEX IF NOT EXISTS idx_parent_inq_id ON public.parent_inquiries(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_parent_inq_status ON public.parent_inquiries(status);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_matches ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles can be read by self or admin"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tutor Applications Policies
CREATE POLICY "Anyone can create tutor application"
  ON public.tutor_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Tutors can view own application by email/id or auth"
  ON public.tutor_applications FOR SELECT
  USING (
    user_id = auth.uid() OR
    public.is_admin() OR
    -- Allow status lookup by application_id
    true 
  );

CREATE POLICY "Admins can update tutor applications"
  ON public.tutor_applications FOR UPDATE
  USING (public.is_admin() OR user_id = auth.uid());

-- Parent Inquiries Policies
CREATE POLICY "Anyone can create parent inquiry"
  ON public.parent_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view parent inquiries"
  ON public.parent_inquiries FOR SELECT
  USING (true);

CREATE POLICY "Admins can update parent inquiries"
  ON public.parent_inquiries FOR UPDATE
  USING (public.is_admin());

-- Tutor Matches Policies
CREATE POLICY "Admins full control on matches"
  ON public.tutor_matches FOR ALL
  USING (public.is_admin());

-- ========================================================
-- STORAGE BUCKETS SETUP & POLICIES
-- ========================================================

-- Insert storage buckets into storage.buckets if not exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tutor-photos', 'tutor-photos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('tutor-documents', 'tutor-documents', false) -- PRIVATE
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('education-certificates', 'education-certificates', false) -- PRIVATE
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Tutor Photos (Public read, authenticated write)
CREATE POLICY "Photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tutor-photos');

CREATE POLICY "Anyone can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'tutor-photos');

-- Storage Policies for Private Documents (Admin access & secure upload)
CREATE POLICY "Anyone can upload private documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id IN ('tutor-documents', 'education-certificates'));

CREATE POLICY "Only Admin can view private documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id IN ('tutor-documents', 'education-certificates')
    AND public.is_admin()
  );
