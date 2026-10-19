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

  // Approved English template: {{1}} is the customer name, {{2}} the order number.
  const result = await sendWhatsAppTemplate({
    to: customer_phone,
    templateName: "order_received_awaiting_verification",
    languageCode: "en",
    bodyParams: [customer_name, String(order_number)],
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
