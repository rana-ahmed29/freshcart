import { cookies } from "next/headers";

const COOKIE_NAME = "guest-wishlist";
const MAX_ITEMS = 50;

const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
  sameSite: "lax" as const,
  httpOnly: true, // only the server reads this cookie
};

function isValidId(id: unknown): id is string {
  return typeof id === "string" && id.length > 0 && id.length <= 40;
}

export async function getGuestWishlist(): Promise<string[]> {
  const store = await cookies();

  try {
    const parsed = JSON.parse(store.get(COOKIE_NAME)?.value ?? "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidId).slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

export async function setGuestWishlist(ids: string[]) {
  const store = await cookies();
  const valid = Array.isArray(ids)
    ? [...new Set(ids.filter(isValidId))].slice(0, MAX_ITEMS)
    : [];

  // an empty list deletes the cookie
  if (valid.length === 0) {
    store.delete(COOKIE_NAME);
  } else {
    store.set(COOKIE_NAME, JSON.stringify(valid), COOKIE_OPTIONS);
  }
}

export async function addToGuestWishlist(productId: string) {
  if (!isValidId(productId)) return;

  const ids = await getGuestWishlist();
  if (!ids.includes(productId)) ids.push(productId);

  await setGuestWishlist(ids);
}

export async function removeFromGuestWishlist(productId: string) {
  const ids = await getGuestWishlist();
  await setGuestWishlist(ids.filter((id) => id !== productId));
}
