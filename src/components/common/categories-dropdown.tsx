"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import type { ICategory } from "@/types/category";

export default function CategoriesDropdown({
  categories,
}: {
  categories: ICategory[];
}) {
  const activeId = useSearchParams().get("category");

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1.5 py-2 font-medium text-gray-700 transition-colors hover:text-green-600"
      >
        Categories
        <FaChevronDown className="size-3 transition-transform group-hover:rotate-180" />
      </button>

      <div className="invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="min-w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
          <Link
            href="/categories"
            className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600"
          >
            All Categories
          </Link>

          {categories.slice(0, 5).map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className={cn(
                "block px-4 py-2.5 transition-colors hover:bg-green-50 hover:text-green-600",
                activeId === category._id
                  ? "bg-green-50 text-green-600"
                  : "text-gray-600",
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
