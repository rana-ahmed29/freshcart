"use client";
import RemoveCompareDialog from "@/components/compare/remove-compare-dialog";
import ClearCompareDialog from "@/components/compare/clear-compare-dialog";
import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { FaCartShopping, FaStar, FaTrash, FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

import { addToCartAction } from "@/actions/cart.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import { cartKey } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { clearCompare, removeFromCompare } from "@/redux/slices/compare-slice";
import type { IProduct } from "@/types/product";

// one product's "Add to cart" button, with its own loading state
function AddToCartButton({ product }: { product: IProduct }) {
  const [isAdding, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const inStock = product.quantity > 0;

  function handleAdd() {
    if (isAdding || !inStock) return;

    startTransition(async () => {
      const result = await addToCartAction(product._id);

      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: cartKey });
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isAdding || !inStock}
      aria-busy={isAdding}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isAdding ? (
        <DotsSpinner className="size-5 text-white" />
      ) : (
        <>
          <FaCartShopping />
          Add to Cart
        </>
      )}
    </button>
  );
}

// a row of the table: label on the left, one cell per product
function Row({
  label,
  products,
  render,
}: {
  label: string;
  products: IProduct[];
  render: (product: IProduct) => React.ReactNode;
}) {
  return (
    <tr className="border-t border-gray-100">
      <th
        scope="row"
        className="w-36 bg-gray-50 px-4 py-4 text-left text-sm font-semibold text-gray-600"
      >
        {label}
      </th>
      {products.map((product) => (
        <td key={product._id} className="min-w-52 px-4 py-4 align-top text-sm">
          {render(product)}
        </td>
      ))}
    </tr>
  );
}

export default function CompareTable({ products }: { products: IProduct[] }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-gray-500">
          Comparing{" "}
          <span className="font-semibold text-primary-600">
            {products.length} {products.length === 1 ? "product" : "products"}
          </span>
        </p>

        <ClearCompareDialog onConfirm={() => dispatch(clearCompare())}>
          <button
            type="button"
            className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-500"
          >
            <FaTrash className="text-xs transition-transform group-hover:scale-110" />
            Clear all
          </button>
        </ClearCompareDialog>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-36 bg-gray-50" />
              {products.map((product) => (
                <th
                  key={product._id}
                  className="relative min-w-52 px-4 pb-4 pt-6 align-top font-normal"
                >
                  <RemoveCompareDialog
                    productName={product.title}
                    onConfirm={() => dispatch(removeFromCompare(product._id))}
                  >
                    <button
                      type="button"
                      aria-label={`Remove ${product.title} from compare`}
                      title="Remove"
                      className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-red-500 hover:text-white"
                    >
                      <FaXmark className="size-3.5" />
                    </button>
                  </RemoveCompareDialog>

                  <Link
                    href={`/products/${product._id}`}
                    className="group block text-left"
                  >
                    <div className="relative mx-auto h-40 w-full">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="208px"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h2 className="mt-3 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                      {product.title}
                    </h2>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <Row
              label="Price"
              products={products}
              render={(product) => {
                const hasDiscount =
                  product.priceAfterDiscount !== undefined &&
                  product.priceAfterDiscount < product.price;
                const price = hasDiscount
                  ? product.priceAfterDiscount!
                  : product.price;

                return (
                  <div>
                    <span
                      className={cn(
                        "text-lg font-bold",
                        hasDiscount ? "text-primary-600" : "text-gray-900",
                      )}
                    >
                      {price.toLocaleString()} EGP
                    </span>
                    {hasDiscount && (
                      <span className="ml-2 text-gray-400 line-through">
                        {product.price.toLocaleString()} EGP
                      </span>
                    )}
                  </div>
                );
              }}
            />

            <Row
              label="Rating"
              products={products}
              render={(product) => (
                <span className="flex items-center gap-1.5 text-gray-700">
                  <FaStar className="text-yellow-400" />
                  {product.ratingsAverage}
                  <span className="text-gray-400">
                    ({product.ratingsQuantity})
                  </span>
                </span>
              )}
            />

            <Row
              label="Brand"
              products={products}
              render={(product) => (
                <span className="text-gray-700">{product.brand.name}</span>
              )}
            />

            <Row
              label="Category"
              products={products}
              render={(product) => (
                <span className="inline-block rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                  {product.category.name}
                </span>
              )}
            />

            <Row
              label="Availability"
              products={products}
              render={(product) =>
                product.quantity > 0 ? (
                  <span className="font-medium text-green-600">
                    In Stock ({product.quantity})
                  </span>
                ) : (
                  <span className="font-medium text-red-500">Out of Stock</span>
                )
              }
            />

            <Row
              label="Description"
              products={products}
              render={(product) => (
                <p className="line-clamp-4 text-gray-500">
                  {product.description}
                </p>
              )}
            />

            <Row
              label=""
              products={products}
              render={(product) => <AddToCartButton product={product} />}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
