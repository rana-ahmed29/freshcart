const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import type { IWishlistIdsResponse, IWishlistResponse } from "@/types/wishlist";

export async function addProductToWishlist(
  productId: string,
  token: string,
): Promise<IWishlistIdsResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to add to wishlist");
  }
  return data;
}

export async function getLoggedUserWishlist(
  token: string,
): Promise<IWishlistResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load wishlist");
  }
  return data;
}

export async function removeProductFromWishlist(
  productId: string,
  token: string,
): Promise<IWishlistIdsResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to remove from wishlist");
  }
  return data;
}
