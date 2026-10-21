// 
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheck, FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";

import {
  removeProductFromCartAction,
  updateCartProductQuantityAction,
} from "@/actions/cart.actions";

import RemoveItemDialog from "@/components/cart/remove-item-dialog";
import { cartKey } from "@/hooks/use-cart";
import { cartCountKey } from "@/hooks/use-cart-count";
import type { ICartProduct } from "@/types/cart";

type CartItemProps = {
  product: ICartProduct;
  onRemoved?: (productId: string) => void;
  onUpdated?: (productId: string, count: number) => void;
};

export default function CartItem({
  product,
  onRemoved,
  onUpdated,
}: CartItemProps) {
  const queryClient = useQueryClient();
  const productId = product.product._id;

  const refreshCart = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: cartKey }),
      queryClient.invalidateQueries({ queryKey: cartCountKey }),
    ]);
  };

  const removeMutation = useMutation({
    mutationFn: () => removeProductFromCartAction(productId),

    onSuccess: async (result) => {
      if (result.success) {
        onRemoved?.(productId);
        toast.success(result.message);
        await refreshCart();
      } else {
        toast.error(result.message);
      }
    },

    onError: () => {
      toast.error("Could not reach the server. Try again.");
    },
  });

  const quantityMutation = useMutation({
    mutationFn: (count: number) =>
      updateCartProductQuantityAction(productId, count),

    onSuccess: async (result, count) => {
      if (result.success) {
        onUpdated?.(productId, count);
        await refreshCart();
      } else {
        toast.error(result.message);
      }
    },

    onError: () => {
      toast.error("Could not reach the server. Try again.");
    },
  });

  const isRemoving = removeMutation.isPending;
  const isUpdating = quantityMutation.isPending;
  const isBusy = isRemoving || isUpdating;

  function handleRemove() {
    removeMutation.mutate();
  }

  function handleUpdate(count: number) {
    if (count < 1 || isBusy) return;
    quantityMutation.mutate(count);
  }

  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div
        className={`p-4 transition-all duration-200 sm:p-5 ${
          isBusy ? "pointer-events-none opacity-50 blur-[2px]" : ""
        }`}
      >
        <div className="flex gap-4 sm:gap-6">
          <Link
            href={`/products/${productId}`}
            className="group relative shrink-0"
          >
            <div className="h-28 w-28 overflow-hidden rounded-xl border border-gray-100 bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 sm:h-32 sm:w-32">
              <div className="relative h-full w-full">
                <Image
                  src={product.product.imageCover}
                  alt={product.product.title}
                  fill
                  sizes="128px"
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white">
              <FaCheck className="text-[8px]" />
              In Stock
            </div>
          </Link>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-3">
              <Link href={`/products/${productId}`} className="group/title">
                <h3 className="text-base font-semibold leading-relaxed text-gray-900 transition-colors group-hover/title:text-primary-600 sm:text-lg">
                  {product.product.title}
                </h3>
              </Link>

              <div className="mt-2 flex items-center gap-2">
                <span className="inline-block rounded-full bg-linear-to-r from-primary-50 to-emerald-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                  {product.product.category.name}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-primary-600">
                  {product.price} EGP
                </span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={isBusy || product.count <= 1}
                    onClick={() => handleUpdate(product.count - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    <FaMinus className="text-xs" />
                  </button>

                  <span className="w-12 text-center font-bold text-gray-900">
                    {product.count}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={isBusy}
                    onClick={() => handleUpdate(product.count + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm shadow-primary-600/30 transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="mb-0.5 text-xs text-gray-400">Total</p>

                  <p className="text-xl font-bold text-gray-900">
                    {(product.price * product.count).toLocaleString()}
                    <span className="text-sm font-medium text-gray-400">
                      {" "}
                      EGP
                    </span>
                  </p>
                </div>

                <RemoveItemDialog
                  productName={product.product.title}
                  onConfirm={handleRemove}
                >
                  <button
                    type="button"
                    title="Remove item"
                    aria-label="Remove from cart"
                    disabled={isBusy}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white disabled:opacity-40"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </RemoveItemDialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isBusy && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-lg">
            <ImSpinner2 className="animate-spin text-primary-600" />
            <span className="text-sm font-medium text-gray-700">
              {isRemoving ? "Removing..." : "Updating..."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
