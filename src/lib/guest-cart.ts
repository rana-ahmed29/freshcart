
import { cookies } from "next/headers";

const COOKIE_NAME = "guest-cart";

const MAX_ITEMS = 20;

const MAX_QUANTITY = 10;

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
  sameSite: "lax" as const,
  httpOnly: true, // only the server reads this cookie
};

export type GuestCartItem = {
  productId: string;
  quantity: number;
};

function isValidItem(item: unknown): item is GuestCartItem {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const { productId, quantity } = item as Record<string, unknown>;

  return (
    typeof productId === "string" &&
    productId.length > 0 &&
    productId.length <= 40 &&
    Number.isInteger(quantity) &&
    (quantity as number) > 0
  );
}

export async function getGuestCart(): Promise<GuestCartItem[]> {
  const store = await cookies();

  try {
    const parsed = JSON.parse(
      store.get(COOKIE_NAME)?.value ?? "[]"
    );

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(isValidItem)
      .slice(0, MAX_ITEMS)
      .map((item) => ({
        productId: item.productId,
        quantity: Math.min(item.quantity, MAX_QUANTITY),
      }));
  } catch {
    return [];
  }
}

// Validate items before writing the cookie.
export async function setGuestCart(items: GuestCartItem[]) {
  const store = await cookies();

  const validItems = Array.isArray(items)
    ? items
        .filter(isValidItem)
        .slice(0, MAX_ITEMS)
        .map((item) => ({
          productId: item.productId,
          quantity: Math.min(item.quantity, MAX_QUANTITY),
        }))
    : [];

  // An empty or invalid cart deletes the cookie.
  if (validItems.length === 0) {
    store.delete(COOKIE_NAME);
  } else {
    store.set(
      COOKIE_NAME,
      JSON.stringify(validItems),
      COOKIE_OPTIONS
    );
  }
}

export async function addToGuestCart(productId: string) {
  if (
    typeof productId !== "string" ||
    productId.length === 0 ||
    productId.length > 40
  ) {
    return;
  }

  const items = await getGuestCart();

  const existing = items.find(
    (item) => item.productId === productId
  );

  if (existing) {
    existing.quantity = Math.min(
      existing.quantity + 1,
      MAX_QUANTITY
    );
  } else if (items.length < MAX_ITEMS) {
    items.push({
      productId,
      quantity: 1,
    });
  }

  await setGuestCart(items);
}

export async function removeFromGuestCart(productId: string) {
  const items = await getGuestCart();

  await setGuestCart(
    items.filter((item) => item.productId !== productId)
  );
}