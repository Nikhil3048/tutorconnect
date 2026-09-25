-- ========================================================
-- TUTORCONNECT: SQL SCRIPT TO REMOVE ALL DUMMY / SAMPLE DATA
-- Run this in your Supabase SQL Editor to wipe test data
-- ========================================================

-- 1. Truncate all application data tables
TRUNCATE TABLE public.tutor_matches CASCADE;
TRUNCATE TABLE public.parent_inquiries CASCADE;
TRUNCATE TABLE public.tutor_applications CASCADE;

-- 2. Optional: Remove test profiles (except admins)
DELETE FROM public.profiles WHERE role != 'admin';

-- 3. Optional: Clear storage bucket uploaded test documents & photos
DELETE FROM storage.objects 
WHERE bucket_id IN ('tutor-photos', 'tutor-documents', 'education-certificates');

-- Success confirmation query
SELECT 
  (SELECT COUNT(*) FROM public.tutor_applications) AS total_tutors,
  (SELECT COUNT(*) FROM public.parent_inquiries) AS total_inquiries,
  (SELECT COUNT(*) FROM public.tutor_matches) AS total_matches;
