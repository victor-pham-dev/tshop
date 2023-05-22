import { SUPABASE_CONFIG } from "@/const/app-const";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  SUPABASE_CONFIG.URL,
  SUPABASE_CONFIG.PUBKEY
);
