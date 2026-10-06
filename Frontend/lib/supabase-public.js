import { createClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client using anon key + Row Level Security (RLS).
 * Safe to use on the client for direct inserts to public.registration_extras.
 */
let client = null;

export function getSupabasePublic() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
    client = createClient(url, key);
  }
  return client;
}
