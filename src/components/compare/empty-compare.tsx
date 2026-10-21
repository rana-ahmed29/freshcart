import Link from "next/link";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export default function EmptyCompare() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex size-32 items-center justify-center rounded-full bg-gray-100">
        <FaArrowRightArrowLeft className="size-12 text-gray-300" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        Your compare list is empty
      </h1>

      <p className="mt-3 max-w-md text-gray-500">
        Add up to 4 products using the compare icon on each product card, and
        see them side by side here.
      </p>

      <Link
        href="/products"
        className="mt-8 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 active:scale-[0.98]"
      >
        Browse Products
      </Link>
    </div>
  );
}
