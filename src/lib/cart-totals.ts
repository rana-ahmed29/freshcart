import type { ICartProduct } from "@/types/cart";

// same rule as the top bar: "Free Shipping on Orders 500 EGP"
export const FREE_SHIPPING_MIN = 500;
export const SHIPPING_FEE = 50;

export function getCartTotals(products: ICartProduct[]) {
  // total units: 2 + 1 + 8 ... (so + and - change it)
  const itemsCount = products.reduce((sum, p) => sum + p.count, 0);

  // price x count for every product, added up
  const subtotal = products.reduce((sum, p) => sum + p.price * p.count, 0);

  const isFreeShipping = subtotal >= FREE_SHIPPING_MIN;
  const remaining = Math.max(FREE_SHIPPING_MIN - subtotal, 0);

  // 0 when free (or the cart is empty), otherwise the fixed fee
  const shipping = isFreeShipping || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  // 0 to 100, for the progress bar
  const progress = Math.min(
    Math.round((subtotal / FREE_SHIPPING_MIN) * 100),
    100,
  );

  const itemsLabel = `${itemsCount} ${itemsCount === 1 ? "item" : "items"}`;

  return {
    itemsCount,
    subtotal,
    isFreeShipping,
    remaining,
    shipping,
    total,
    progress,
    itemsLabel,
  };
}
