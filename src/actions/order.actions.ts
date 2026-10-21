"use server";

import { revalidatePath } from "next/cache";

import { getApiToken } from "@/lib/get-api-token";
import { getLoggedUserAddresses } from "@/services/addresses.services";
import { getLoggedUserCart } from "@/services/cart.services";
import {
  createCashOrder,
  createCheckoutSession,
  getUserOrders,
} from "@/services/orders.services";
import type { IShippingAddress, PaymentMethod } from "@/types/order";

type OrderResult =
  | { success: true; message: string; redirectUrl?: string }
  | { success: false; message: string };

// saved addresses (empty list for guests or on any error)
export async function getSavedAddressesAction() {
  const token = await getApiToken();
  if (!token) return [];

  try {
    const result = await getLoggedUserAddresses(token);
    return result.data ?? [];
  } catch {
    return [];
  }
}

export async function placeOrderAction(
  method: PaymentMethod,
  address: IShippingAddress,
  returnUrl: string,
): Promise<OrderResult> {
  // server actions can be called by anyone, so never trust the input
  if (method !== "cash" && method !== "online") {
    return { success: false, message: "Invalid payment method" };
  }

  const city = String(address?.city ?? "").trim();
  const details = String(address?.details ?? "").trim();
  const phone = String(address?.phone ?? "").trim();

  if (!city || !details || !/^(?:\+20|0)1[0125][0-9]{8}$/.test(phone)) {
    return { success: false, message: "Please check your address details" };
  }

  try {
    const token = await getApiToken();
    if (!token) return { success: false, message: "Please login first" };

    // the cart id comes from the server, not from the browser
    const cart = await getLoggedUserCart(token);
    if (!cart.cartId || !cart.data?.products?.length) {
      return { success: false, message: "Your cart is empty" };
    }

    const shippingAddress: IShippingAddress = { details, phone, city };

    if (method === "cash") {
      await createCashOrder(cart.cartId, token, shippingAddress);
      revalidatePath("/", "layout");
      return { success: true, message: "Order placed successfully" };
    }

    // only allow a real web address as the return address
    const safeUrl = returnUrl.startsWith("http") ? returnUrl : "";
    const session = await createCheckoutSession(
      cart.cartId,
      token,
      shippingAddress,
      safeUrl,
    );

    return {
      success: true,
      message: "Redirecting to payment...",
      redirectUrl: session.session.url,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

// the token is a JWT: its payload holds the user id
function getUserIdFromToken(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    const json = Buffer.from(payload, "base64url").toString("utf8");
    const id = JSON.parse(json)?.id;
    return typeof id === "string" ? id : null;
  } catch {
    return null;
  }
}

// null = guest or error, [] = no orders yet
export async function getUserOrdersAction() {
  const token = await getApiToken();
  if (!token) return null;

  const userId = getUserIdFromToken(token);
  if (!userId) return null;

  try {
    const orders = await getUserOrders(userId);
    // newest first
    return [...orders].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
  } catch {
    return null;
  }
}
