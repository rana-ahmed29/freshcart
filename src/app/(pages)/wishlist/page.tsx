"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa6";

import PageLoader from "@/components/common/page-loader";
import EmptyWishlist from "@/components/wishlist/empty-wishlist";
import WishlistTable from "@/components/wishlist/wishlist-table";
import { useWishlist } from "@/hooks/use-wishlist";
import { useSession } from "next-auth/react";

export default function WishlistPage() {
  const { status } = useSession();
  const { data: products = [], isPending } = useWishlist();

  // wait for the session and the first load, so no wrong screen flashes
  if (status === "loading" || isPending) {
    return (
      <PageLoader title="Loading your wishlist..." subtitle="Just a moment" />
    );
  }

  // nothing saved (guests see the Sign In button too)
  if (products.length === 0) {
    return <EmptyWishlist isGuest={status === "unauthenticated"} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* header */}
      <div className="border-b border-gray-100 bg-white py-6">
        <div className="container mx-auto px-4">
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Wishlist</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-red-50">
              <FaHeart className="size-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-sm text-gray-500">
                {products.length} {products.length === 1 ? "item" : "items"}{" "}
                saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <WishlistTable products={products} />

          <div className="mt-6">
            <Link
              href="/products"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
            >
              <span>←</span>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
