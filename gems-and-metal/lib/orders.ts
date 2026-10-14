import "server-only";
import { connection } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export type OrderStatus = "awaiting_verification" | "confirmed" | "shipped" | "cancelled";
export type PaymentMethod = "COD" | "Bank/Wallet";

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  qty: number;
  is_custom: boolean;
}

export interface Order {
  id: string;
  orderNumber: number;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalPrice: number;
  amountPaidNow: number;
  remainingBalance: number;
  paymentMethod: PaymentMethod;
  screenshotPath: string | null;
  status: OrderStatus;
  createdAt: string;
}

interface OrderRow {
  id: string;
  order_number: number;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  items: OrderItem[];
  total_price: number;
  amount_paid_now: number;
  remaining_balance: number;
  payment_method: PaymentMethod;
  screenshot_url: string | null;
  status: OrderStatus;
  created_at: string;
}

function fromRow(row: OrderRow): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    shippingAddress: row.shipping_address,
    items: row.items,
    totalPrice: Number(row.total_price),
    amountPaidNow: Number(row.amount_paid_now),
    remainingBalance: Number(row.remaining_balance),
    paymentMethod: row.payment_method,
    screenshotPath: row.screenshot_url,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function listOrders(status?: OrderStatus): Promise<Order[]> {
  await connection();
  const db = supabaseAdmin();
  let query = db.from("orders").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(`Failed to load orders: ${error.message}`);
  return (data as OrderRow[]).map(fromRow);
}

export async function getOrderById(id: string): Promise<Order | null> {
  await connection();
  const db = supabaseAdmin();
  const { data, error } = await db.from("orders").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Failed to load order: ${error.message}`);
  return data ? fromRow(data as OrderRow) : null;
}

/**
 * The payment-screenshots bucket is private, so screenshot_url stores the
 * storage object path, not a public URL. This returns a short-lived signed
 * URL the admin page can render in an <img>.
 */
export async function getScreenshotSignedUrl(path: string): Promise<string | null> {
  const db = supabaseAdmin();
  const { data, error } = await db.storage
    .from("payment-screenshots")
    .createSignedUrl(path, 60 * 10); // 10 minutes
  if (error) return null;
  return data.signedUrl;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const db = supabaseAdmin();
  const { error } = await db.from("orders").update({ status }).eq("id", id);
  if (error) throw new Error(`Failed to update order: ${error.message}`);
}

export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalPrice: number;
  amountPaidNow: number;
  remainingBalance: number;
  paymentMethod: PaymentMethod;
  screenshotPath: string | null;
}

/**
 * Runs with the service role, bypassing RLS entirely. The public anon key
 * intentionally has no SELECT policy on orders (so one customer can't read
 * another's name/phone/address), which means a client-side
 * `.insert().select()` fails under RLS even though the insert itself would
 * be allowed — Postgres requires the inserted row be visible to RETURN it.
 * Routing order creation through this server-only function sidesteps that.
 */
export async function createOrder(input: CreateOrderInput): Promise<number> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("orders")
    .insert({
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      shipping_address: input.shippingAddress,
      items: input.items,
      total_price: input.totalPrice,
      amount_paid_now: input.amountPaidNow,
      remaining_balance: input.remainingBalance,
      payment_method: input.paymentMethod,
      screenshot_url: input.screenshotPath,
      status: "awaiting_verification",
    })
    .select("order_number")
    .single();
  if (error) throw new Error(`Could not place order: ${error.message}`);
  return (data as { order_number: number }).order_number;
}
