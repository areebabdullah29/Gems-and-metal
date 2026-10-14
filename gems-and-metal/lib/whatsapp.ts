import "server-only";

// Official Meta WhatsApp Cloud API client. No Baileys/whatsapp-web.js here —
// this is a plain HTTPS call to Meta's Graph API, so it runs fine inside a
// normal Vercel serverless function. No persistent session, no separate
// always-on server to host.
//
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

const GRAPH_API_VERSION = "v21.0";

function graphApiUrl(phoneNumberId: string): string {
  return `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`;
}

interface SendTemplateMessageArgs {
  to: string;
  templateName: string;
  languageCode?: string;
  /** Ordered body variables, e.g. ["Ali", "1042"] for a template with {{1}} {{2}}. */
  bodyParams?: string[];
}

interface WhatsAppApiResponse {
  messaging_product: "whatsapp";
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
}

interface WhatsAppApiError {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id: string;
  };
}

/**
 * Normalizes a Pakistani number (or already-international one) to the
 * country-code-prefixed digits WhatsApp's API expects, e.g. "03001234567"
 * -> "923001234567". Adjust if you expect customers from other countries.
 */
export function toWhatsAppNumber(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.startsWith("92")) return digits;
  if (digits.startsWith("0")) return `92${digits.slice(1)}`;
  return digits;
}

/**
 * Sends a WhatsApp template message via the official Cloud API.
 *
 * Template messages are required for business-initiated contact outside the
 * 24-hour customer-service window, and every template (other than Meta's
 * built-in "hello_world") must be pre-approved in the Meta Business Suite
 * before it can be sent. In the sandbox, only "hello_world" works out of
 * the box with no approval step.
 */
export async function sendWhatsAppTemplate({
  to,
  templateName,
  languageCode = "en_US",
  bodyParams = [],
}: SendTemplateMessageArgs): Promise<{ ok: true; messageId: string } | { ok: false; error: string }> {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    return {
      ok: false,
      error: "META_ACCESS_TOKEN and META_PHONE_NUMBER_ID must be set (see .env.local.example).",
    };
  }

  const payload = {
    messaging_product: "whatsapp" as const,
    to: toWhatsAppNumber(to),
    type: "template" as const,
    template: {
      name: templateName,
      language: { code: languageCode },
      ...(bodyParams.length > 0
        ? {
            components: [
              {
                type: "body",
                parameters: bodyParams.map((text) => ({ type: "text", text })),
              },
            ],
          }
        : {}),
    },
  };

  const res = await fetch(graphApiUrl(phoneNumberId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = (await res.json()) as WhatsAppApiResponse | WhatsAppApiError;

  if (!res.ok || "error" in json) {
    const message = "error" in json ? json.error.message : `HTTP ${res.status}`;
    return { ok: false, error: message };
  }

  return { ok: true, messageId: json.messages[0]?.id ?? "" };
}
