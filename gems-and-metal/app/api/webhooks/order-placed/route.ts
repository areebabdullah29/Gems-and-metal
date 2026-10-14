import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthorizedWebhook } from "@/lib/webhookAuth";
import { sendWhatsAppTemplate } from "@/lib/whatsapp";

// Supabase Database Webhook payload shape for an INSERT event.
// Configure in Supabase: Dashboard -> Database -> Webhooks -> Create a new
// webhook -> Table: orders -> Events: Insert -> Type: HTTP Request ->
// URL: https://<your-vercel-domain>/api/webhooks/order-placed
// Add the x-webhook-secret header described in lib/webhookAuth.ts.
interface OrderWebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: {
    id: string;
    order_number: number;
    customer_name: string;
    customer_phone: string;
  };
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedWebhook(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as OrderWebhookPayload;
  if (payload.type !== "INSERT" || payload.table !== "orders") {
    return NextResponse.json({ skipped: true });
  }

  const { customer_name, customer_phone, order_number } = payload.record;

  // Sandbox demo: Meta's built-in "hello_world" template works with zero
  // approval. Swap `templateName` for your own approved utility template
  // (e.g. "order_received") and pass real bodyParams once you have one —
  // see the commented example below.
  const result = await sendWhatsAppTemplate({
    to: customer_phone,
    templateName: "hello_world",
    languageCode: "en_US",

    // Once you have an approved template with body variables, e.g.:
    //   "Hi {{1}}! Thank you for ordering from Gems and Metal (Order #{{2}}).
    //    We have received your payment screenshot. Our team is verifying the
    //    transfer and will confirm your order shortly!"
    // switch to:
    // templateName: "order_received",
    // bodyParams: [customer_name, String(order_number)],
  });

  if (!result.ok) {
    console.error("WhatsApp send failed (order-placed):", result.error);
    return NextResponse.json({ sent: false, error: result.error }, { status: 502 });
  }

  console.log(
    `WhatsApp "order received" sent to ${customer_name} for order #${order_number} (${result.messageId})`
  );
  return NextResponse.json({ sent: true, messageId: result.messageId });
}
