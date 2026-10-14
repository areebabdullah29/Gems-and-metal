import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Service-role client: full read/write, bypasses Row Level Security entirely.
// Server-only (admin actions, product/order data layer). Never import this
// from a Client Component or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
let client: ReturnType<typeof createClient<Database>> | null = null;

export function supabaseAdmin() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (see .env.local.example)."
    );
  }

  client = createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
  return client;
}
