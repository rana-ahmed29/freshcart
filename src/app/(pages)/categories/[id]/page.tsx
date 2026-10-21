// src/app/(pages)/categories/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaFolderOpen, FaLayerGroup } from "react-icons/fa6";

import {
  getSpecificCategory,
  getSubCategoriesOnCategory,
} from "@/services/categories.services";

export const revalidate = 3600;

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // an unknown id or a failed request shows the 404 page
  const [category, subCategories] = await Promise.all([
    getSpecificCategory(id),
    getSubCategoriesOnCategory(id),
  ]).catch(() => notFound());

  return (
    <>
      {/* header */}
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/categories"
              className="transition-colors hover:text-white"
            >
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="font-medium text-white">{category.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {category.name}
              </h1>
              <p className="mt-1 text-white/80">
                Browse subcategories in {category.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-50/50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <FaLayerGroup className="text-primary-600" />
              Subcategories
              <span className="text-sm font-normal text-gray-400">
                ({subCategories.length})
              </span>
            </h2>

            <Link
              href={`/products?category=${category._id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-colors hover:bg-primary-700"
            >
              View all products
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {subCategories.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <p className="text-gray-500">
                This category has no subcategories yet.
              </p>
              <Link
                href={`/products?category=${category._id}`}
                className="mt-4 inline-block font-medium text-primary-600 hover:text-primary-700"
              >
                Browse all {category.name} products →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {subCategories.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/products?category=${category._id}`}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl"
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100">
                    <FaFolderOpen className="text-2xl text-primary-600" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                    {sub.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                    <span>Browse Products</span>
                    <FaArrowRight className="text-xs" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
