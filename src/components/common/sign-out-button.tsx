"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FaRightFromBracket } from "react-icons/fa6";
import { signOut } from "next-auth/react";

import { cartKey } from "@/hooks/use-cart";
import { wishlistKey } from "@/hooks/use-wishlist";

export default function SignOutButton() {
  const queryClient = useQueryClient();

  async function handleSignOut() {
    // Remove the current user's cart and wishlist from the cache.
    queryClient.removeQueries({ queryKey: cartKey });
    queryClient.removeQueries({ queryKey: wishlistKey });

    await signOut({ callbackUrl: "/" });
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-green-600"
    >
      <FaRightFromBracket className="size-3.5" />
      <span>Sign Out</span>
    </button>
  );
}
