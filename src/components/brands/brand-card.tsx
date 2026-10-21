"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";

import type { IBrand } from "@/types/brands";

export default function BrandCard({
  brand,
  index = 0,
}: {
  brand: IBrand;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 10) * 0.05 }}
    >
      <Link
        href={`/products?brand=${brand._id}`}
        className="group block h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/60 sm:p-6"
      >
        <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            sizes="(min-width:1024px) 16vw, (min-width:640px) 33vw, 50vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <h3 className="text-center font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
          {brand.name}
        </h3>

        <div className="mt-2 flex h-4 justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex items-center gap-1 text-xs text-purple-600">
            View Products
            <FaArrowRight className="text-[10px]" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
