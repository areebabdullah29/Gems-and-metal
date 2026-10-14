"use server";

import { createOrder, type OrderItem, type PaymentMethod } from "@/lib/orders";

export interface PlaceOrderInput {
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

export async function placeOrderAction(
  input: PlaceOrderInput
): Promise<{ orderNumber: number } | { error: string }> {
  try {
    const orderNumber = await createOrder(input);
    return { orderNumber };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }
}
