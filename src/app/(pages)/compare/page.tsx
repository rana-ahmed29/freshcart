"use client";

import Link from "next/link";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

import CompareTable from "@/components/compare/compare-table";
import EmptyCompare from "@/components/compare/empty-compare";
import PageLoader from "@/components/common/page-loader";
import { useCompareProducts } from "@/hooks/use-compare-products";

export default function ComparePage() {
  const { ids, hydrated, products, isLoading, isError, refetch } =
    useCompareProducts();

  // the saved list is still being restored from localStorage
  if (!hydrated || isLoading) {
    return (
      <PageLoader
        title="Loading your compare list..."
        subtitle="Just a moment"
      />
    );
  }

  if (ids.length === 0) {
    return <EmptyCompare />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg text-gray-600">
          We could not load your compare list.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Try again
        </button>
      </div>
    );
  }

  // every saved product was deleted from the store
  if (products.length === 0) {
    return <EmptyCompare />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Compare</span>
          </nav>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-white">
              <FaArrowRightArrowLeft />
            </span>
            Compare Products
          </h1>
        </div>

        <CompareTable products={products} />

        <div className="mt-6 border-t border-gray-200 pt-6">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <span>←</span>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
