-- ========================================================
-- TUTORCONNECT SUPABASE: ADD & REMOVE ADMIN MANAGEMENT SQL
-- Run these queries in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ========================================================

-- --------------------------------------------------------
-- PREPARATION: Drop strict Foreign Key constraint on profiles table
-- (Allows adding profiles without requiring Supabase Auth user linkage)
-- --------------------------------------------------------
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- --------------------------------------------------------
-- 1. ADD / GRANT ADMIN ROLE TO A USER
-- --------------------------------------------------------

-- Direct SQL: Grant Admin role to an existing email
UPDATE public.profiles
SET role = 'admin'
WHERE LOWER(email) = LOWER('admin@tutorconnect.com');

-- If profile does not exist yet, insert profile as Admin:
INSERT INTO public.profiles (id, role, full_name, email)
VALUES (
  gen_random_uuid(),
  'admin',
  'Platform Administrator',
  LOWER('admin@tutorconnect.com')
)
ON CONFLICT (email) DO UPDATE SET role = 'admin';


-- --------------------------------------------------------
-- 2. REMOVE / REVOKE ADMIN ROLE FROM A USER
-- --------------------------------------------------------

-- Revoke Admin role (Demote user back to 'tutor' or 'parent')
UPDATE public.profiles
SET role = 'tutor' -- Change to 'parent' or 'tutor'
WHERE LOWER(email) = LOWER('user@example.com') AND role = 'admin';

-- Alternatively, delete admin profile record completely:
-- DELETE FROM public.profiles WHERE LOWER(email) = LOWER('user@example.com') AND role = 'admin';


-- --------------------------------------------------------
-- 3. REUSABLE HELPER FUNCTIONS (STORED PROCEDURES)
-- --------------------------------------------------------

-- Helper Function A: Add / Promote user to Admin
CREATE OR REPLACE FUNCTION public.add_admin_by_email(target_email TEXT)
RETURNS TEXT AS $$
DECLARE
  updated_rows INT;
BEGIN
  UPDATE public.profiles
  SET role = 'admin'
  WHERE LOWER(email) = LOWER(target_email);
  
  GET DIAGNOSTICS updated_rows = ROW_COUNT;
  
  IF updated_rows > 0 THEN
    RETURN 'Success: Admin role granted to ' || target_email;
  ELSE
    INSERT INTO public.profiles (id, role, full_name, email)
    VALUES (gen_random_uuid(), 'admin', 'Administrator', LOWER(target_email))
    ON CONFLICT (email) DO UPDATE SET role = 'admin';
    
    RETURN 'Success: Created new profile for ' || target_email || ' with Admin role.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Helper Function B: Remove / Revoke Admin role from user
CREATE OR REPLACE FUNCTION public.remove_admin_by_email(target_email TEXT, default_new_role user_role DEFAULT 'tutor')
RETURNS TEXT AS $$
DECLARE
  updated_rows INT;
BEGIN
  UPDATE public.profiles
  SET role = default_new_role
  WHERE LOWER(email) = LOWER(target_email) AND role = 'admin';
  
  GET DIAGNOSTICS updated_rows = ROW_COUNT;
  
  IF updated_rows > 0 THEN
    RETURN 'Success: Admin role revoked from ' || target_email || '. New role: ' || default_new_role;
  ELSE
    RETURN 'Notice: User ' || target_email || ' was not found or is not currently an Admin.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- --------------------------------------------------------
-- 4. VIEW ALL ACTIVE ADMINS
-- --------------------------------------------------------

SELECT id, full_name, email, role, created_at 
FROM public.profiles 
WHERE role = 'admin'
ORDER BY created_at DESC;


-- --------------------------------------------------------
-- USAGE EXAMPLES IN SUPABASE SQL EDITOR:
-- --------------------------------------------------------
-- To Add Admin:    SELECT public.add_admin_by_email('newadmin@example.com');
-- To Remove Admin: SELECT public.remove_admin_by_email('oldadmin@example.com');
-- To List Admins:  SELECT * FROM public.profiles WHERE role = 'admin';
