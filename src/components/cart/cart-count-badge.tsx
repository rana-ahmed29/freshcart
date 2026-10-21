// "use client";

// import { useCartCount } from "@/hooks/use-cart-count";

// type CartCountBadgeProps = {
//   initialCount: number;
//   className: string;
// };

// export default function CartCountBadge({
//   initialCount,
//   className,
// }: CartCountBadgeProps) {
//   const { data: count = 0 } = useCartCount(initialCount);

//   if (count <= 0) return null;

//   return <span className={className}>{count > 9 ? "9+" : count}</span>;
// }

"use client";

import { useCartCount } from "@/hooks/use-cart-count";

type CartCountBadgeProps = {
  initialCount: number;
  className: string;
};

export default function CartCountBadge({
  initialCount,
  className,
}: CartCountBadgeProps) {
  const { data: count = 0 } = useCartCount(initialCount);

  if (count <= 0) return null;

  return <span className={className}>{count > 9 ? "9+" : count}</span>;
}
