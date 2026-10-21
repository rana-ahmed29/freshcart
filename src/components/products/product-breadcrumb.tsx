import Link from "next/link";
import { FaChevronRight, FaHouse } from "react-icons/fa6";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { IProduct } from "@/types/product";

const linkClass =
  "flex items-center gap-1.5 text-gray-500 transition hover:text-primary-600";

// the ">" arrow between steps, using a react-icon
function Separator() {
  return (
    <BreadcrumbSeparator className="text-gray-400 [&>svg]:size-3">
      <FaChevronRight />
    </BreadcrumbSeparator>
  );
}

export default function ProductBreadcrumb({ product }: { product: IProduct }) {
  const subcategory = product.subcategory?.[0];

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home */}
            <BreadcrumbItem>
              <Link href="/" className={linkClass}>
                <FaHouse className="text-xs" />
                Home
              </Link>
            </BreadcrumbItem>
            <Separator />

            {/* Category */}
            <BreadcrumbItem>
              <Link
                href={`/categories/${product.category._id}`}
                className={linkClass}
              >
                {product.category.name}
              </Link>
            </BreadcrumbItem>
            <Separator />

            {/* Subcategory (only if the product has one) */}
            {subcategory && (
              <>
                <BreadcrumbItem>
                  <Link
                    href={`/categories/${product.category._id}/${subcategory._id}`}
                    className={linkClass}
                  >
                    {subcategory.name}
                  </Link>
                </BreadcrumbItem>
                <Separator />
              </>
            )}

            {/* Current product */}
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-xs truncate font-medium text-gray-900">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
