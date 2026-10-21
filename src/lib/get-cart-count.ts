import { getApiToken } from "@/lib/get-api-token";
import { getGuestCart } from "@/lib/guest-cart";
import { getLoggedUserCart } from "@/services/cart.services";

// counts total units (2 + 1 + 8 ...), so + and - change the badge
export async function getCartCount(): Promise<number> {
  const token = await getApiToken();

  // guest: add up the quantities in the cookie
  if (!token) {
    const items = await getGuestCart();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // logged in: add up the quantities from the API cart
  try {
    const cart = await getLoggedUserCart(token);
    const products = cart.data?.products ?? [];
    return products.reduce((sum, p) => sum + p.count, 0);
  } catch {
    return 0;
  }
}
