import "server-only";
import type { NextRequest } from "next/server";

/**
 * Supabase Database Webhooks let you attach custom HTTP headers to every
 * request they send. Set one named `x-webhook-secret` (Dashboard -> Database
 * -> Webhooks -> your webhook -> HTTP Headers) with the same value as
 * WEBHOOK_SECRET below, so random internet traffic can't trigger WhatsApp
 * sends by POSTing to these endpoints.
 */
export function isAuthorizedWebhook(request: NextRequest): boolean {
  const expected = process.env.WEBHOOK_SECRET;
  if (!expected) return false;
  return request.headers.get("x-webhook-secret") === expected;
}
