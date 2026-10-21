"use client";

import { useQuery } from "@tanstack/react-query";

import { getAddressesAction } from "@/actions/profile.actions";

export const addressesKey = ["addresses"] as const;

export function useAddresses() {
  return useQuery({
    queryKey: addressesKey,
    queryFn: async () => {
      const addresses = await getAddressesAction();
      // null = guest or error: the page decides what to show
      if (addresses === null) throw new Error("Could not load addresses");
      return addresses;
    },
    retry: false,
  });
}
