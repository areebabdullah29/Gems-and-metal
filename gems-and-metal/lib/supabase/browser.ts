"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Anon-key client: safe to ship to the browser. Governed entirely by the
// Row Level Security policies in supabase/schema.sql — it can read products,
// insert orders, and upload payment screenshots, and nothing else.
let client: ReturnType<typeof createClient<Database>> | null = null;

export function supabaseBrowser() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set (see .env.local.example)."
    );
  }

  client = createClient<Database>(url, key, {
    auth: { persistSession: false },
  });
  return client;
}
