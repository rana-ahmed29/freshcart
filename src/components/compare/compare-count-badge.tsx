"use client";

import { useAppSelector } from "@/redux/hooks";

export default function CompareCountBadge({
  className,
  initialCount = 0,
}: {
  className: string;
  initialCount?: number; // number read from the cookie on the server
}) {
  const hydrated = useAppSelector((state) => state.compare.hydrated);
  const idsCount = useAppSelector((state) => state.compare.ids.length);

  // before the saved list is restored, show the cookie number
  const count = hydrated ? idsCount : initialCount;

  if (count <= 0) return null;

  return <span className={className}>{count}</span>;
}
