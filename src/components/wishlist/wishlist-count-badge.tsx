
"use client";

import { useWishlist } from "@/hooks/use-wishlist";

type WishlistCountBadgeProps = {
  className: string;
  initialCount?: number;
};

export default function WishlistCountBadge({
  className,
  initialCount = 0,
}: WishlistCountBadgeProps) {
  const { data, isPending, isError } = useWishlist();

  // Use the server count until the wishlist query finishes.
  const count = isPending
    ? initialCount
    : isError
      ? initialCount
      : (data?.length ?? 0);

  if (count <= 0) return null;

  return (
    <span className={className}>
      {count > 9 ? "9+" : count}
    </span>
  );
}
;
