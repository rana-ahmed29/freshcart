"use server";

import { revalidatePath } from "next/cache";

import { getApiToken } from "@/lib/get-api-token";
import { getCartCount } from "@/lib/get-cart-count";
import { getGuestCartDetails } from "@/lib/get-guest-cart-details";
import {
  addToGuestCart,
  getGuestCart,
  removeFromGuestCart,
  setGuestCart,
  type GuestCartItem,
} from "@/lib/guest-cart";
import {
  addProductToCart,
  clearUserCart,
  getLoggedUserCart,
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/services/cart.services";

type ActionResult = { success: boolean; message: string };

export async function addToCartAction(
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
    let message = "Product added to cart";

    if (token) {
      // logged in: add to the real cart (API)
      const data = await addProductToCart(productId, token);
      message = (data?.message as string) ?? message;
    } else {
      // not logged in: keep the product in the guest cart cookie
      await addToGuestCart(productId);
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

// logged out users get their cart from the guest cookie
export async function getUserCartAction() {
  const token = await getApiToken();

  if (!token) {
    const products = await getGuestCartDetails();

    // same shape as the API response, so the cart page works for both
    return {
      status: "success",
      numOfCartItems: products.length,
      data: { products },
    };
  }

  try {
    return await getLoggedUserCart(token);
  } catch {
    return null;
  }
}

// used by TanStack Query: works for guests (cookie) and logged-in users (API)
export async function getCartCountAction(): Promise<number> {
  return getCartCount();
}

export async function removeProductFromCartAction(
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
      await removeProductFromCart(productId, token);
    } else {
      await removeFromGuestCart(productId);
    }

    revalidatePath("/", "layout");
    return { success: true, message: "Item removed from cart" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function clearUserCartAction(): Promise<ActionResult> {
  try {
    const token = await getApiToken();

    if (token) {
      await clearUserCart(token);
    } else {
      await setGuestCart([]); // empty list = the cookie is deleted
    }

    revalidatePath("/", "layout");

    return { success: true, message: "Cart cleared successfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function updateCartProductQuantityAction(
  productId: string,
  count: number,
): Promise<ActionResult> {
  if (
    typeof productId !== "string" ||
    productId.length === 0 ||
    productId.length > 40
  ) {
    return { success: false, message: "Invalid product" };
  }

  if (!Number.isInteger(count) || count < 1) {
    return { success: false, message: "Invalid quantity" };
  }

  try {
    const token = await getApiToken();

    if (token) {
      await updateCartProductQuantity(productId, token, count);
    } else {
      // guest: change the quantity inside the cookie
      const items = await getGuestCart();
      const updated = items.map((item) =>
        item.productId === productId ? { ...item, quantity: count } : item,
      );
      await setGuestCart(updated);
    }

    revalidatePath("/", "layout");

    return { success: true, message: "Product quantity updated successfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

// after login: move guest cookie products into the account cart

export async function mergeGuestCartAction(): Promise<{ merged: number }> {
  const token = await getApiToken();

  if (!token) return { merged: 0 };

  const items = await getGuestCart();
  const failed: GuestCartItem[] = [];
  let merged = 0;

  for (const item of items) {
    try {
      for (let i = 0; i < item.quantity; i++) {
        await addProductToCart(item.productId, token);
      }

      merged += 1;
    } catch {
      failed.push(item);
    }
  }

  await setGuestCart(failed);
  revalidatePath("/", "layout");

  return { merged };
}