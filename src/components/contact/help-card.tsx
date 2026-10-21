import Link from "next/link";
import { FaCircleQuestion } from "react-icons/fa6";

export default function HelpCard() {
  return (
    <div className="flex gap-4 rounded-2xl border border-primary-100 bg-primary-50 p-6">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
        <FaCircleQuestion className="text-xl" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">
          Looking for quick answers?
        </h3>
        <p className="mt-1 text-gray-600">
          Check out our Help Center for frequently asked questions about orders,
          shipping, returns, and more.
        </p>
        <Link
          href="/help"
          className="mt-3 inline-block font-medium text-primary-600 hover:text-primary-700"
        >
          Visit Help Center →
        </Link>
      </div>
    </div>
  );
}
