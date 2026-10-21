"use client";

import Link from "next/link";
import { FaArrowLeft, FaFolderOpen, FaLayerGroup } from "react-icons/fa6";
import PageHeader from "@/components/common/page-header";

export default function CategoryError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Category"
        description="Choose a subcategory to browse products"
        crumbs={[
          { label: "Categories", href: "/categories" },
          { label: "Category" },
        ]}
        icon={<FaLayerGroup className="size-7" />}
      />

      <section className="bg-gray-50/50 py-10">
        <div className="container mx-auto px-4">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-primary-600"
          >
            <FaArrowLeft />
            Back to Categories
          </Link>

          <div
            role="alert"
            className="flex flex-col items-center px-4 py-20 text-center"
          >
            <div className="flex size-24 items-center justify-center rounded-full bg-gray-100">
              <FaFolderOpen className="text-4xl text-gray-400" />
            </div>

            <h2 className="mt-8 text-2xl font-bold text-gray-900">
              Something went wrong
            </h2>
            <p className="mt-2 text-lg text-gray-500">
              We could not load this category. Please try again.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-xl bg-primary-600 px-8 py-4 font-bold text-white shadow-lg shadow-primary-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-700"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
