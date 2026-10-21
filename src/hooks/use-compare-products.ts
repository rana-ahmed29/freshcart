"use client";

import { useQuery } from "@tanstack/react-query";

import { useAppSelector } from "@/redux/hooks";
import { getSpecificProduct } from "@/services/products.services";
import type { IProduct } from "@/types/product";

export const compareKey = ["compare"] as const;

export function useCompareProducts() {
  const ids = useAppSelector((state) => state.compare.ids);
  const hydrated = useAppSelector((state) => state.compare.hydrated);

  const query = useQuery({
    // the ids are part of the key, so adding or removing a product reloads
    queryKey: [...compareKey, ids],
    queryFn: async (): Promise<IProduct[]> => {
      // load all products at the same time; a deleted product is skipped
      const results = await Promise.allSettled(
        ids.map((id) => getSpecificProduct(id)),
      );

      return results.flatMap((result) =>
        result.status === "fulfilled" && result.value ? [result.value] : [],
      );
    },
    // wait until the saved list is restored, and skip when it is empty
    enabled: hydrated && ids.length > 0,
  });

  return {
    ids,
    hydrated,
    products: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
