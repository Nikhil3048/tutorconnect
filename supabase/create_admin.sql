-- ========================================================
-- TUTORCONNECT: SQL SCRIPT TO CREATE AND GRANT ADMIN ACCESS
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ========================================================

-- OPTION 1: Promote an existing user by email to Admin role
-- Replace 'admin@example.com' with the email address of your user
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@example.com';


-- OPTION 2: Create a helper SQL function to easily grant admin role by email
CREATE OR REPLACE FUNCTION public.make_admin_by_email(target_email TEXT)
RETURNS TEXT AS $$
DECLARE
  updated_count INT;
BEGIN
  UPDATE public.profiles
  SET role = 'admin'
  WHERE LOWER(email) = LOWER(target_email);
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  IF updated_count > 0 THEN
    RETURN 'Success: User ' || target_email || ' is now an Admin.';
  ELSE
    -- If user profile doesn't exist yet, insert profile record
    INSERT INTO public.profiles (id, role, full_name, email)
    VALUES (
      gen_random_uuid(),
      'admin',
      'Administrator',
      LOWER(target_email)
    )
    ON CONFLICT (email) DO UPDATE SET role = 'admin';
    
    RETURN 'Success: Profile created for ' || target_email || ' with Admin role.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- EXAMPLES OF HOW TO CALL THE FUNCTION IN SUPABASE SQL EDITOR:
-- SELECT public.make_admin_by_email('admin@tutorconnect.com');
-- SELECT public.make_admin_by_email('yourname@domain.com');
