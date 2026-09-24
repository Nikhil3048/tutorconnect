import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

const isValidSupabaseUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (
    trimmed.includes('your-supabase-project') ||
    trimmed.includes('your-project-id') ||
    trimmed.includes('your-anon-key') ||
    trimmed.includes('YOUR_') ||
    trimmed.includes('example.com') ||
    trimmed.includes('placeholder')
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && !parsed.hostname.includes('your-');
  } catch {
    return false;
  }
};

export const createClient = () => {
  if (!isValidSupabaseUrl(supabaseUrl)) {
    return null;
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
};
