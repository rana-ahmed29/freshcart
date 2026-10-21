import Link from "next/link";
import { FaFilter, FaLayerGroup, FaTags, FaXmark } from "react-icons/fa6";

export type ActiveFilter = {
  kind: "brand" | "category" | "keyword";
  label: string;
  removeHref: string; // the address without this filter
};

const styles = {
  brand: "bg-purple-50 text-purple-700",
  category: "bg-primary-50 text-primary-700",
  keyword: "bg-gray-100 text-gray-700",
};

export default function ActiveFilters({
  filters,
}: {
  filters: ActiveFilter[];
}) {
  if (filters.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-2 text-sm text-gray-700">
        <FaFilter />
        Active Filters:
      </span>

      {filters.map((filter) => (
        <span
          key={filter.kind}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${styles[filter.kind]}`}
        >
          {filter.kind === "brand" && <FaTags className="text-xs" />}
          {filter.kind === "category" && <FaLayerGroup className="text-xs" />}
          {filter.label}
          <Link
            href={filter.removeHref}
            aria-label={`Remove ${filter.label} filter`}
            className="transition-opacity hover:opacity-60"
          >
            <FaXmark className="text-xs" />
          </Link>
        </span>
      ))}

      <Link
        href="/products"
        className="text-sm text-gray-600 underline transition-colors hover:text-primary-600"
      >
        Clear all
      </Link>
    </div>
  );
}
