"use server";

import { revalidatePath } from "next/cache";

import { getApiToken } from "@/lib/get-api-token";
import {
  addToGuestWishlist,
  getGuestWishlist,
  removeFromGuestWishlist,
  setGuestWishlist,
} from "@/lib/guest-wishlist";
import { getSpecificProduct } from "@/services/products.services";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/services/wishlist.services";
import type { IProduct } from "@/types/product";

type ActionResult = { success: boolean; message: string };

// logged in: the account wishlist. guest: products from the cookie
export async function getUserWishlistAction() {
  const token = await getApiToken();

  if (!token) {
    const ids = await getGuestWishlist();

    // a deleted product must not break the list
    const results = await Promise.allSettled(
      ids.map((id) => getSpecificProduct(id)),
    );
    const products = results.flatMap((result) =>
      result.status === "fulfilled" && result.value ? [result.value] : [],
    ) as IProduct[];

    // same shape as the API response
    return { status: "success", count: products.length, data: products };
  }

  try {
    return await getLoggedUserWishlist(token);
  } catch {
    return null;
  }
}

export async function addToWishlistAction(
  productId: string,
): Promise<ActionResult> {
  // server actions can be called by anyone, so never trust the input
  if (
    typeof productId !== "string" ||
    productId.length === 0 ||
    productId.length > 40
  ) {
    return { success: false, message: "Invalid product" };
  }

  try {
    const token = await getApiToken();
    let message = "Product added to wishlist";

    if (token) {
      const data = await addProductToWishlist(productId, token);
      message = data?.message ?? message;
    } else {
      await addToGuestWishlist(productId);
    }

    revalidatePath("/", "layout");
    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function removeFromWishlistAction(
  productId: string,
): Promise<ActionResult> {
  if (
    typeof productId !== "string" ||
    productId.length === 0 ||
    productId.length > 40
  ) {
    return { success: false, message: "Invalid product" };
  }

  try {
    const token = await getApiToken();

    if (token) {
      await removeProductFromWishlist(productId, token);
    } else {
      await removeFromGuestWishlist(productId);
    }

    revalidatePath("/", "layout");
    return { success: true, message: "Product removed from wishlist" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

// after login: move guest cookie products into the account wishlist
export async function mergeGuestWishlistAction(): Promise<{ merged: number }> {
  const token = await getApiToken();
  if (!token) return { merged: 0 };

  const ids = await getGuestWishlist();
  const failed: string[] = [];

  for (const id of ids) {
    try {
      await addProductToWishlist(id, token);
    } catch {
      failed.push(id); // keep it in the cookie for next time
    }
  }

  await setGuestWishlist(failed); // empty list = the cookie is deleted
  revalidatePath("/", "layout");

  return { merged: ids.length - failed.length };
}
