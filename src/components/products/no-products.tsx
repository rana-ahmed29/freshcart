import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa6";

export default function NoProducts() {
  return (
    <div className="flex flex-col items-center px-4 py-16 text-center">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
        <FaBoxOpen className="text-3xl text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900">No Products Found</h2>
      <p className="mt-2 text-gray-500">
        No products match your current filters.
      </p>
      <Link
        href="/products"
        className="mt-6 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-colors hover:bg-primary-700"
      >
        View All Products
      </Link>
    </div>
  );
}
