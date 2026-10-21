"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaBagShopping } from "react-icons/fa6";

import PageLoader from "@/components/common/page-loader";
import EmptyOrders from "@/components/orders/empty-orders";
import OrderCard from "@/components/orders/order-card";
import { useOrders } from "@/hooks/use-orders";

export default function OrdersPage() {
  const { status } = useSession();
  const { data: orders = [], isPending, isError, refetch } = useOrders();

  if (status === "loading" || (status === "authenticated" && isPending)) {
    return (
      <PageLoader title="Loading your orders..." subtitle="Just a moment" />
    );
  }

  // orders need an account
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Please sign in to see your orders
        </h1>
        <Link
          href="/login?callbackUrl=/orders"
          className="rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg text-gray-600">We could not load your orders.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">My Orders</span>
        </nav>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20">
              <FaBagShopping className="text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-sm text-gray-500">
                Track and manage your {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <FaBagShopping />
            Continue Shopping
          </Link>
        </div>

        {/* temporary: shows the raw first order so we can check its shape */}
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
}
