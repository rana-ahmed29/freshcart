import Link from "next/link";
import { FaArrowRight, FaRegHeart } from "react-icons/fa6";

export default function EmptyWishlist({ isGuest }: { isGuest: boolean }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
          <FaRegHeart className="text-3xl text-gray-400" />
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Your wishlist is empty
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Browse products and save your favorites here.
          {isGuest && " Sign in to sync your wishlist across devices."}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Browse Products
            <FaArrowRight className="text-sm" />
          </Link>

          {isGuest && (
            <Link
              href="/login?callbackUrl=/wishlist"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
