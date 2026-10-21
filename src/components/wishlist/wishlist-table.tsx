"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCartShopping, FaCheck, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

import { addToCartAction } from "@/actions/cart.actions";
import { removeFromWishlistAction } from "@/actions/wishlist.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import RemoveWishlistDialog from "@/components/wishlist/remove-wishlist-dialog";
import { cartKey, useCart } from "@/hooks/use-cart";
import { wishlistKey } from "@/hooks/use-wishlist";
import type { IProduct } from "@/types/product";

function WishlistRow({
  product,
  inCart,
  cartLoading,
}: {
  product: IProduct;
  inCart: boolean;
  cartLoading: boolean;
}) {
  const queryClient = useQueryClient();
  const [isAdding, startTransition] = useTransition();
  const inStock = product.quantity > 0;

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;
  const price = hasDiscount ? product.priceAfterDiscount! : product.price;

  const removeMutation = useMutation({
    mutationFn: () => removeFromWishlistAction(product._id),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(result.message);
        await queryClient.invalidateQueries({ queryKey: wishlistKey });
      } else {
        toast.error(result.message);
      }
    },
    onError: () => toast.error("Could not reach the server. Try again."),
  });

  function handleAddToCart() {
    if (isAdding || !inStock) return;

    startTransition(async () => {
      const result = await addToCartAction(product._id);

      if (result.success) {
        toast.success(result.message);
        await queryClient.invalidateQueries({ queryKey: cartKey });
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div
      className={`grid grid-cols-1 items-center gap-4 p-4 transition-colors hover:bg-gray-50/50 md:grid-cols-12 md:px-6 md:py-5 ${
        removeMutation.isPending ? "opacity-50" : ""
      }`}
    >
      {/* product */}
      <div className="flex items-center gap-4 md:col-span-6">
        <Link
          href={`/products/${product._id}`}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="80px"
            className="object-contain p-2"
          />
        </Link>

        <div className="min-w-0">
          <Link
            href={`/products/${product._id}`}
            className="line-clamp-2 font-medium text-gray-900 transition-colors hover:text-primary-600"
          >
            {product.title}
          </Link>
          <p className="mt-1 text-sm text-gray-400">{product.category.name}</p>
        </div>
      </div>

      {/* price */}
      <div className="flex items-center gap-2 md:col-span-2 md:justify-center">
        <span className="text-sm text-gray-500 md:hidden">Price:</span>
        <div className="text-right md:text-center">
          <div className="font-semibold text-gray-900">
            {price.toLocaleString()} EGP
          </div>
          {hasDiscount && (
            <div className="text-sm text-gray-400 line-through">
              {product.price.toLocaleString()} EGP
            </div>
          )}
        </div>
      </div>

      {/* status */}
      <div className="flex md:col-span-2 md:justify-center">
        <span className="mr-2 text-sm text-gray-500 md:hidden">Status:</span>

        {cartLoading ? (
          <span className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
        ) : !inStock ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
            Out of Stock
          </span>
        ) : inCart ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            <FaCartShopping className="text-[10px]" />
            In Cart
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            <span className="size-1.5 rounded-full bg-green-500" />
            In Stock
          </span>
        )}
      </div>

      {/* actions */}
      <div className="flex items-center gap-2 md:col-span-2 md:justify-center">
        {cartLoading ? (
          <span className="h-10 w-28 animate-pulse rounded-lg bg-gray-100" />
        ) : inCart ? (
          <Link
            href="/cart"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 md:flex-none"
          >
            <FaCheck className="text-xs text-green-600" />
            <span className="md:hidden lg:inline">View Cart</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || !inStock}
            aria-busy={isAdding}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 md:flex-none"
          >
            {isAdding ? (
              <DotsSpinner className="size-5 text-white" />
            ) : (
              <>
                <FaCartShopping className="text-xs" />
                <span className="md:hidden lg:inline">Add to Cart</span>
              </>
            )}
          </button>
        )}

        <RemoveWishlistDialog
          productName={product.title}
          onConfirm={() => removeMutation.mutate()}
        >
          <button
            type="button"
            title="Remove"
            aria-label={`Remove ${product.title} from wishlist`}
            disabled={removeMutation.isPending}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
          >
            <FaTrash className="text-sm" />
          </button>
        </RemoveWishlistDialog>
      </div>
    </div>
  );
}

export default function WishlistTable({ products }: { products: IProduct[] }) {
  // isPending is true only on the first load, before the cart is known
  const { data: cart, isPending: cartLoading } = useCart();
  const cartIds = new Set(
    (cart?.data?.products ?? []).map((item) => item.product._id),
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      {/* header (desktop only) */}
      <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500 md:grid">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      {/* rows */}
      <div className="divide-y divide-gray-100">
        {products.map((product) => (
          <WishlistRow
            key={product._id}
            product={product}
            inCart={cartIds.has(product._id)}
            cartLoading={cartLoading}
          />
        ))}
      </div>
    </div>
  );
}
