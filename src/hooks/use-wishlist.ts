"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserWishlistAction } from "@/actions/wishlist.actions";
import type { IProduct } from "@/types/product";

// invalidating this key reloads the heart icons, the badge and the page
export const wishlistKey = ["wishlist"] as const;

export function useWishlist() {
  return useQuery({
    queryKey: wishlistKey,
    queryFn: async (): Promise<IProduct[]> => {
      const wishlist = await getUserWishlistAction();

      // guests (or an error): the list is empty, not an error screen
      return wishlist?.data ?? [];
    },
  });
}

// the product ids in the wishlist, used to fill the heart icons
export function useWishlistIds() {
  const { data } = useWishlist();
  return (data ?? []).map((product) => product._id);
}
