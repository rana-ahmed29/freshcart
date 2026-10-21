"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Eye, Plus, RefreshCw, Star, StarHalf } from "lucide-react";
import { toast } from "react-toastify";

import { addToCartAction } from "@/actions/cart.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import WishlistButton from "@/components/wishlist/wishlist-button";
import { Button } from "@/components/ui/button";
import { cartKey } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MAX_COMPARE, toggleCompare } from "@/redux/slices/compare-slice";
import type { IProduct } from "@/types/product";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) {
          return <Star key={i} className="h-3.5 w-3.5 fill-current" />;
        }
        if (i === full && half) {
          return (
            <span key={i} className="relative inline-block h-3.5 w-3.5">
              <Star className="h-3.5 w-3.5" />
              <StarHalf className="absolute inset-0 h-3.5 w-3.5 fill-current" />
            </span>
          );
        }
        return <Star key={i} className="h-3.5 w-3.5" />;
      })}
    </div>
  );
}

// the icon inside the green button: loading, added, or plus
function CartIcon({
  isAdding,
  isAdded,
}: {
  isAdding: boolean;
  isAdded: boolean;
}) {
  if (isAdding) return <DotsSpinner className="size-5 text-white" />;
  if (isAdded) return <Check className="h-5 w-5" />;
  return <Plus className="h-4 w-4" />;
}

const iconButton =
  "flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition";

// false on the server and while hydrating, true once the page is in the browser
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ProductCard({ product }: { product: IProduct }) {
  const [isAdding, startTransition] = useTransition();
  const [isAdded, setIsAdded] = useState(false);
  const queryClient = useQueryClient();

  // Redux: the compare list
  const dispatch = useAppDispatch();
  const compareIds = useAppSelector((state) => state.compare.ids);

  // the saved list comes from localStorage, so show it only after hydration
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const isCompared = mounted && compareIds.includes(product._id);

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;
  const price = hasDiscount ? product.priceAfterDiscount! : product.price;
  const percent = hasDiscount
    ? Math.round((1 - price / product.price) * 100)
    : 0;

  function handleAddToCart() {
    if (isAdding || isAdded) return;

    startTransition(async () => {
      const result = await addToCartAction(product._id);

      if (result.success) {
        toast.success(result.message);
        // tell TanStack the cart is old, so the navbar badge reloads
        queryClient.invalidateQueries({ queryKey: cartKey });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleCompare() {
    // list is full and this product is not in it: tell the user
    if (!isCompared && compareIds.length >= MAX_COMPARE) {
      toast.info(`You can compare up to ${MAX_COMPARE} products`);
      return;
    }

    dispatch(toggleCompare(product._id));
    toast.success(isCompared ? "Removed from compare" : "Added to compare");
  }

  return (
    <motion.div
      initial={{ boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }}
      whileHover={{
        y: -6,
        boxShadow: "0px 10px 25px 0px rgba(0,0,0,0.12)",
      }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      {/* image + badge + icons */}
      <div className="relative h-60">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-contain"
        />

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs text-white">
            -{percent}%
          </span>
        )}

        <div className="absolute right-3 top-3 flex flex-col space-y-2">
          <WishlistButton productId={product._id} variant="icon" />
          <button
            type="button"
            title={isCompared ? "Remove from compare" : "Compare"}
            aria-label={isCompared ? "Remove from compare" : "Compare"}
            aria-pressed={isCompared}
            onClick={handleCompare}
            className={cn(
              iconButton,
              isCompared ? "bg-primary text-white" : "hover:text-primary",
            )}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link
            href={`/products/${product._id}`}
            title="Quick view"
            aria-label="Quick view"
            className={`${iconButton} hover:text-primary`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* details */}
      <div className="p-4">
        <div className="mb-1 text-xs text-gray-500">
          {product.category.name}
        </div>

        <h3 className="mb-1 font-medium" title={product.title}>
          <Link href={`/products/${product._id}`} className="line-clamp-2">
            {product.title}
          </Link>
        </h3>

        <div className="mb-2 flex items-center gap-2">
          <Stars rating={product.ratingsAverage} />
          <span className="text-xs text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span
              className={cn(
                "text-lg font-bold",
                hasDiscount ? "text-primary" : "text-gray-800",
              )}
            >
              {price} EGP
            </span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <Button
            size="icon"
            onClick={handleAddToCart}
            aria-label={isAdded ? "Added to cart" : "Add to cart"}
            aria-busy={isAdding}
            className={cn(
              "h-10 w-10 rounded-full transition-colors",
              isAdding && "opacity-60",
            )}
          >
            <CartIcon isAdding={isAdding} isAdded={isAdded} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
