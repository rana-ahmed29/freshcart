import Link from "next/link";
import Image from "next/image";
import { getUserWishlistAction } from "@/actions/wishlist.actions";
import { getServerSession } from "next-auth";
import {
  FaArrowRightArrowLeft,
  FaCartShopping,
  FaGift,
  FaHeadphones,
  FaMagnifyingGlass,
  FaPhone,
  FaRegEnvelope,
  FaRegHeart,
  FaRegUser,
  FaTruck,
  FaUserPlus,
} from "react-icons/fa6";
import { cookies } from "next/headers";

import CartCountBadge from "@/components/cart/cart-count-badge";
import CategoriesDropdown from "@/components/common/categories-dropdown";
import CompareCountBadge from "@/components/compare/compare-count-badge";
import WishlistCountBadge from "@/components/wishlist/wishlist-count-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { authOptions } from "@/lib/authOptions";
import { getCartCount } from "@/lib/get-cart-count";
import { getAllCategories } from "@/services/categories.services";

import MobileMenu from "./mobile-menu";
import SignOutButton from "./sign-out-button";
import UserMenu from "./user-menu";

import FreshCartLogo from "@/assets/images/freshcart-logo.49f1b44d.svg";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Initial cart count from the server.
  const cartCount = await getCartCount();

  // Compare count from the cookie.
  const compareCookie = (await cookies()).get("compare-count")?.value;
  const compareCount = Math.min(Math.max(Number(compareCookie) || 0, 0), 4);

  // Initial wishlist count from the server.
  const wishlistCount = (await getUserWishlistAction())?.count ?? 0;

  // Real categories for the dropdown (empty list if the request fails).
  const categories = await getAllCategories().catch(() => []);

  return (
    <>
      {/* Top info bar */}
      <div className="hidden border-b border-gray-100 text-sm lg:block">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <FaTruck className="size-3.5 text-green-600" />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>

              <span className="flex items-center gap-2">
                <FaGift className="size-3.5 text-green-600" />
                <span>New Arrivals Daily</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 transition-colors hover:text-green-600"
                >
                  <FaPhone className="size-3.5" />
                  <span>+1 (800) 123-4567</span>
                </a>

                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 transition-colors hover:text-green-600"
                >
                  <FaRegEnvelope className="size-3.5" />
                  <span>support@freshcart.com</span>
                </a>
              </div>

              <span className="h-4 w-px bg-gray-200" />

              {user ? (
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <FaRegUser className="size-3.5" />
                    <span>{user.name}</span>
                  </span>

                  <SignOutButton />
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-green-600"
                  >
                    <FaRegUser className="size-3.5" />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    href="/register"
                    className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-green-600"
                  >
                    <FaUserPlus className="size-3.5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between gap-4 lg:h-18 lg:gap-8">
              {/* Logo */}
              <Link href="/" className="shrink-0">
                <Image
                  src={FreshCartLogo}
                  alt="FreshCart"
                  className="h-6 w-auto lg:h-8"
                  priority
                />
              </Link>

              {/* Search */}
              <form
                action="/products"
                method="GET"
                className="hidden max-w-2xl flex-1 lg:flex"
              >
                <div className="relative w-full">
                  <Input
                    type="text"
                    name="keyword"
                    placeholder="Search for products, brands and more..."
                    className="h-12 rounded-full border border-gray-200 bg-gray-50/50 px-5 py-4 pr-14 text-sm transition-all focus-visible:border-green-500 focus-visible:ring-green-500/20 focus:bg-white focus:outline-none focus:ring-2"
                  />

                  <Button
                    type="submit"
                    size="icon"
                    aria-label="Search"
                    className="absolute right-1.5 top-1/2 size-9 -translate-y-1/2 rounded-full bg-green-600 transition-colors hover:bg-green-700"
                  >
                    <FaMagnifyingGlass className="size-4 text-white" />
                  </Button>
                </div>
              </form>

              {/* Desktop navigation */}
              <nav className="hidden items-center gap-6 xl:flex">
                <Link
                  href="/"
                  className="font-medium text-gray-700 transition-colors hover:text-green-600"
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className="font-medium text-gray-700 transition-colors hover:text-green-600"
                >
                  Shop
                </Link>

                <CategoriesDropdown categories={categories} />

                <Link
                  href="/brands"
                  className="font-medium text-gray-700 transition-colors hover:text-green-600"
                >
                  Brands
                </Link>
              </nav>

              {/* Header actions */}
              <div className="flex items-center gap-1 lg:gap-2">
                <Link
                  href="/contact"
                  className="mr-2 hidden items-center gap-2 border-r border-gray-200 pr-3 transition-opacity hover:opacity-80 lg:flex"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-green-50">
                    <FaHeadphones className="size-5 text-green-600" />
                  </span>

                  <span className="text-xs">
                    <span className="block text-gray-400">Support</span>
                    <span className="block font-semibold text-gray-700">
                      24/7 Help
                    </span>
                  </span>
                </Link>

                {/* Compare */}
                <Link
                  href="/compare"
                  title="Compare"
                  aria-label="Compare"
                  className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
                >
                  <FaArrowRightArrowLeft className="size-5 text-gray-500 transition-colors group-hover:text-green-600" />

                  <CompareCountBadge
                    initialCount={compareCount}
                    className="absolute right-0.5 top-0.5 flex size-4.5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white ring-2 ring-white"
                  />
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  title="Wishlist"
                  aria-label="Wishlist"
                  className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
                >
                  <FaRegHeart className="size-5.5 text-gray-500 transition-colors group-hover:text-green-600" />

                  <WishlistCountBadge
                    initialCount={wishlistCount}
                    className="absolute right-0.5 top-0.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white"
                  />
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  title="Cart"
                  aria-label="Cart"
                  className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
                >
                  <FaCartShopping className="h-6 w-auto text-gray-500 transition-colors group-hover:text-green-600" />

                  <CartCountBadge
                    initialCount={cartCount}
                    className="absolute right-0.5 top-0.5 flex size-4.5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white ring-2 ring-white"
                  />
                </Link>

                {/* User menu */}
                {user ? (
                  <div className="ml-2">
                    <UserMenu name={user.name} email={user.email} />
                  </div>
                ) : (
                  <Button
                    asChild
                    className="ml-2 hidden items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition-colors hover:bg-green-700 lg:flex"
                  >
                    <Link href="/login">
                      <FaRegUser className="size-3.5" />
                      Sign In
                    </Link>
                  </Button>
                )}

                {/* Mobile menu */}
                <MobileMenu
                  user={
                    user
                      ? {
                          name: user.name,
                          email: user.email,
                        }
                      : null
                  }
                  cartCount={cartCount}
                  wishlistCount={wishlistCount}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
