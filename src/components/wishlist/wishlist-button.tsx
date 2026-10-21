"use client";

import { useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-toastify";

import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlist.actions";
import { cn } from "@/lib/utils";
import { useWishlistIds, wishlistKey } from "@/hooks/use-wishlist";

type WishlistButtonProps = {
  productId: string;
  variant?: "icon" | "full";
};

// false on the server and while hydrating, true once the page is in the browser
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function WishlistButton({
  productId,
  variant = "icon",
}: WishlistButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const wishlistIds = useWishlistIds();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const isWished = mounted && wishlistIds.includes(productId);

  const mutation = useMutation({
    // true = it is in the list now, so remove it
    mutationFn: (remove: boolean) =>
      remove
        ? removeFromWishlistAction(productId)
        : addToWishlistAction(productId),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(result.message);
        // reloads the hearts, the navbar badge and the wishlist page
        await queryClient.invalidateQueries({ queryKey: wishlistKey });
        return;
      }

      // old behavior kept: send to login if the server asks for it
      if (result.message === "Please login first") {
        toast.info("Please login to use your wishlist");
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }

      toast.error(result.message);
    },
    onError: () => toast.error("Could not reach the server. Try again."),
  });

  function handleClick() {
    if (mutation.isPending) return;
    mutation.mutate(isWished);
  }

  const label = isWished ? "Remove from wishlist" : "Add to wishlist";

  // small round icon, used on the product card
  if (variant === "icon") {
    return (
      <button
        type="button"
        title={label}
        aria-label={label}
        aria-pressed={isWished}
        disabled={mutation.isPending}
        onClick={handleClick}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition disabled:opacity-60",
          isWished ? "text-red-500" : "text-gray-600 hover:text-red-500",
        )}
      >
        {isWished ? (
          <FaHeart className="size-4" />
        ) : (
          <FaRegHeart className="size-4" />
        )}
      </button>
    );
  }

  // wide button, used on the product details page
  return (
    <button
      type="button"
      aria-pressed={isWished}
      disabled={mutation.isPending}
      onClick={handleClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-medium transition disabled:opacity-60",
        isWished
          ? "border-red-200 bg-red-50 text-red-500"
          : "border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600",
      )}
    >
      {isWished ? <FaHeart /> : <FaRegHeart />}
      {isWished ? "In Wishlist" : "Add to Wishlist"}
    </button>
  );
}
