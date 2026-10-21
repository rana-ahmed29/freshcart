"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaReceipt } from "react-icons/fa6";
import { toast } from "react-toastify";

import { placeOrderAction } from "@/actions/order.actions";
import CheckoutOrderSummary from "@/components/checkout/checkout-order-summary";
import PaymentMethodSection from "@/components/checkout/payment-method-section";
import ShippingAddressSection from "@/components/checkout/shipping-address-section";
import EmptyCart from "@/components/cart/empty-cart";
import PageLoader from "@/components/common/page-loader";
import { cartKey, useCart } from "@/hooks/use-cart";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/schema/checkout.schema";
import type { PaymentMethod } from "@/types/order";

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { status } = useSession();
  const { data, isPending } = useCart();

  const [method, setMethod] = useState<PaymentMethod>("cash");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "all",
    defaultValues: { city: "", details: "", phone: "" },
  });

  const products = data?.data?.products ?? [];

  async function submitOrder(values: CheckoutFormValues) {
    try {
      const result = await placeOrderAction(
        method,
        values,
        window.location.origin,
      );

      if (!result.success) {
        if (result.message === "Please login first") {
          router.push("/login?callbackUrl=/checkout");
          return;
        }
        toast.error(result.message);
        return;
      }

      // online payment: go to the Stripe page
     
      if (result.redirectUrl) {
        window.location.assign(result.redirectUrl);
        return;
      }

      // cash order: the cart is empty now
      toast.success(result.message);
      await queryClient.invalidateQueries({ queryKey: cartKey });
      router.push("/orders");
    } catch {
      toast.error("Could not reach the server. Try again.");
    }
  }

  if (status === "loading" || isPending) {
    return <PageLoader title="Loading checkout..." subtitle="Just a moment" />;
  }

  // checkout needs an account
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Please sign in to checkout
        </h1>
        <p className="max-w-md text-gray-500">
          Your cart items will be saved and moved to your account.
        </p>
        <Link
          href="/login?callbackUrl=/checkout"
          className="rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* header */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="transition hover:text-primary-600">
            Cart
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Checkout</span>
        </nav>

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-white">
                <FaReceipt />
              </span>
              Complete Your Order
            </h1>
            <p className="mt-2 text-gray-500">
              Review your items and complete your purchase
            </p>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <FaArrowLeft />
            Back to Cart
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(submitOrder)}
          noValidate
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <div className="space-y-6 lg:col-span-2">
            <ShippingAddressSection control={control} setValue={setValue} />
            <PaymentMethodSection value={method} onChange={setMethod} />
          </div>

          <div className="lg:col-span-1">
            <CheckoutOrderSummary
              products={products}
              method={method}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
