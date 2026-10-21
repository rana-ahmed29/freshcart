import { getGuestCart } from "@/lib/guest-cart";
import { getSpecificProduct } from "@/services/products.services";
import type { ICartProduct } from "@/types/cart";

// turns the cookie ([{ productId, quantity }]) into the same shape
// the logged-in cart uses, so the cart page works for both
export async function getGuestCartDetails(): Promise<ICartProduct[]> {
  const items = await getGuestCart();
  if (items.length === 0) return [];

  // load all products at the same time; one failed product must not break the cart
  const results = await Promise.allSettled(
    items.map((item) => getSpecificProduct(item.productId)),
  );

  const products: ICartProduct[] = [];

  results.forEach((result, index) => {
    // product deleted or API error: skip it
    if (result.status !== "fulfilled" || !result.value) return;

    const product = result.value;
    const hasDiscount =
      product.priceAfterDiscount !== undefined &&
      product.priceAfterDiscount < product.price;

    products.push({
      _id: product._id,
      product,
      count: items[index].quantity,
      price: hasDiscount ? product.priceAfterDiscount! : product.price,
    });
  });

  return products;
}
