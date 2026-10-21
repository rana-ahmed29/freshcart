const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import type {
  ICashOrderResponse,
  ICheckoutSessionResponse,
  IShippingAddress,
} from "@/types/order";
import type { IUserOrder } from "@/types/user-order";

export async function createCashOrder(
  cartId: string,
  token: string,
  shippingAddress: IShippingAddress,
): Promise<ICashOrderResponse> {
  const response = await fetch(`${BASE_URL}/api/v2/orders/${cartId}`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ shippingAddress }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to place the order");
  }
  return data;
}

export async function createCheckoutSession(
  cartId: string,
  token: string,
  shippingAddress: IShippingAddress,
  returnUrl: string,
): Promise<ICheckoutSessionResponse> {
  const response = await fetch(
    `${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
    {
      method: "POST",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress }),
      cache: "no-store",
    },
  );

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to start the payment");
  }
  return data;
}

export async function getUserOrders(userId: string): Promise<IUserOrder[]> {
  const response = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load orders");
  }

  // this endpoint returns the list directly (some versions wrap it in data)
  return Array.isArray(data) ? data : (data?.data ?? []);
}
