import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthorizedWebhook } from "@/lib/webhookAuth";
import { sendWhatsAppTemplate } from "@/lib/whatsapp";

// Supabase Database Webhook payload shape for an UPDATE event.
// Configure in Supabase: Dashboard -> Database -> Webhooks -> Create a new
// webhook -> Table: orders -> Events: Update -> Type: HTTP Request ->
// URL: https://<your-vercel-domain>/api/webhooks/order-confirmed
// Add the x-webhook-secret header described in lib/webhookAuth.ts.
interface OrderWebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: {
    id: string;
    order_number: number;
    customer_name: string;
    customer_phone: string;
    status: string;
  };
  old_record: {
    status: string;
  } | null;
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedWebhook(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as OrderWebhookPayload;

  const justConfirmed =
    payload.type === "UPDATE" &&
    payload.table === "orders" &&
    payload.record.status === "confirmed" &&
    payload.old_record?.status !== "confirmed";

  if (!justConfirmed) {
    return NextResponse.json({ skipped: true });
  }

  const { customer_name, customer_phone, order_number } = payload.record;

  // Approved English (US) template: {{1}} is the customer name, {{2}} the order number.
  const result = await sendWhatsAppTemplate({
    to: customer_phone,
    templateName: "payment_received__order_confirmed",
    languageCode: "en_US",
    bodyParams: [customer_name, String(order_number)],
  });

  if (!result.ok) {
    console.error("WhatsApp send failed (order-confirmed):", result.error);
    return NextResponse.json({ sent: false, error: result.error }, { status: 502 });
  }

  console.log(
    `WhatsApp "order confirmed" sent to ${customer_name} for order #${order_number} (${result.messageId})`
  );
  return NextResponse.json({ sent: true, messageId: result.messageId });
}
