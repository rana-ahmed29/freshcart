const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import type { ICartResponse } from "@/types/cart";

export async function addProductToCart(productId: string, token: string) {
  const response = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Something went wrong, try again");
  }
  return data;
}


export async function getLoggedUserCart(token: string): Promise<ICartResponse> {
  const response = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load cart");
  }
  return data;
}
export async function removeProductFromCart(
  productId: string,
  token: string,
): Promise<ICartResponse> {
  const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: { token },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to remove item");
  }
  return data;
}

export async function clearUserCart(token: string): Promise<ICartResponse> {
  const response = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to clear cart");
  }

  if (data === null) {
    throw new Error("Invalid or empty response from server");
  }

  return data ;
}


export async function updateCartProductQuantity(
  productId: string,
  token: string,
  count: number
): Promise<ICartResponse> {
  const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to update product quantity");
  }

  return data;
}
