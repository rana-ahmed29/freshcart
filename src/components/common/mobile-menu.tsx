"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import {
  FaArrowRightArrowLeft,
  FaBars,
  FaBoxOpen,
  FaCartShopping,
  FaHeadphones,
  FaMagnifyingGlass,
  FaRegCircleUser,
  FaRegHeart,
  FaRegUser,
  FaRightFromBracket,
  FaXmark,
} from "react-icons/fa6";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import CompareCountBadge from "@/components/compare/compare-count-badge";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import WishlistCountBadge from "@/components/wishlist/wishlist-count-badge";

import { useCartCount } from "@/hooks/use-cart-count";
import { cartKey } from "@/hooks/use-cart";
import { wishlistKey } from "@/hooks/use-wishlist";

import FreshCartLogo from "@/assets/images/freshcart-logo.49f1b44d.svg";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

type MobileMenuProps = {
  user: { name: string; email: string } | null;
  cartCount: number;
  wishlistCount?: number;
};

export default function MobileMenu({
  user,
  cartCount,
  wishlistCount = 0,
}: MobileMenuProps) {
  const queryClient = useQueryClient();

  const { data: count = 0 } = useCartCount(cartCount);

  async function handleSignOut() {
    // Remove the current user's cart and wishlist from the cache.
    // The Compare list is intentionally preserved.
    queryClient.removeQueries({ queryKey: cartKey });
    queryClient.removeQueries({ queryKey: wishlistKey });

    await signOut({ callbackUrl: "/login" });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="ml-1 rounded-full bg-green-600 hover:bg-green-700 lg:hidden"
          aria-label="Open menu"
        >
          <FaBars className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-80 max-w-[85vw] overflow-y-auto p-0 [&>button]:hidden"
      >
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-4">
          <Link href="/" className="shrink-0">
            <Image
              src={FreshCartLogo}
              alt="FreshCart"
              className="h-6 w-auto lg:h-8"
              priority
            />
          </Link>

          <SheetClose asChild>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              aria-label="Close menu"
            >
              <FaXmark className="size-4 text-gray-600" />
            </button>
          </SheetClose>
        </div>

        {/* Search */}
        <form
          action="/products"
          method="GET"
          className="border-b border-gray-100 p-4"
        >
          <div className="relative">
            <input
              type="text"
              name="keyword"
              placeholder="Search products..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />

            <Button
              type="submit"
              size="icon"
              aria-label="Search"
              className="absolute right-2 top-1/2 size-8 -translate-y-1/2 rounded-lg bg-green-600 hover:bg-green-700"
            >
              <FaMagnifyingGlass className="size-4" />
            </Button>
          </div>
        </form>

        {/* Navigation links */}
        <nav className="p-4">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mx-4 border-t border-gray-100" />

        {/* Compare / Wishlist / Cart */}
        <div className="space-y-1 p-4">
          <Link
            href="/compare"
            className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-green-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-blue-50">
                <FaArrowRightArrowLeft className="size-4 text-blue-500" />
              </div>
              <span className="font-medium text-gray-700">Compare</span>
            </div>

            <CompareCountBadge className="rounded-full bg-green-600 px-2.5 py-1 text-xs font-bold text-white" />
          </Link>

          <Link
            href="/wishlist"
            className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-green-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-red-50">
                <FaRegHeart className="size-4 text-red-500" />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>

            <WishlistCountBadge
              initialCount={wishlistCount}
              className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white"
            />
          </Link>

          <Link
            href="/cart"
            className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-green-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-green-50">
                <FaCartShopping className="size-4 text-green-600" />
              </div>
              <span className="font-medium text-gray-700">Cart</span>
            </div>

            {count > 0 && (
              <span className="rounded-full bg-green-600 px-2.5 py-1 text-xs font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
        </div>

        <div className="mx-4 border-t border-gray-100" />

        {/* Authentication */}
        <div className="space-y-1 p-4">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <FaRegCircleUser className="text-xl text-primary-600" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-400">{user.email}</p>
                </div>
              </div>

              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
              >
                <FaRegUser className="size-4 text-gray-400" />
                My Profile
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-600"
              >
                <FaBoxOpen className="size-4 text-gray-400" />
                My Orders
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <FaRightFromBracket className="size-4" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-600 px-4 py-3 font-semibold text-green-600 transition-colors hover:bg-green-50"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Support */}
        <Link
          href="/contact"
          className="mx-4 mt-2 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-green-50"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
            <FaHeadphones className="size-5 text-green-600" />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-700">
              Need Help?
            </div>
            <div className="text-sm text-green-600">Contact Support</div>
          </div>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
