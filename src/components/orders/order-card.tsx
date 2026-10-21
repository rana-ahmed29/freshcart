"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaBox,
  FaCalendarDays,
  FaChevronDown,
  FaClock,
  FaCreditCard,
  FaHashtag,
  FaLocationDot,
  FaMoneyBill,
  FaPhone,
  FaReceipt,
  FaTruck,
} from "react-icons/fa6";

import { cn } from "@/lib/utils";
import type { IUserOrder } from "@/types/user-order";

function getStatus(order: IUserOrder) {
  if (order.isDelivered) {
    return {
      label: "Delivered",
      box: "bg-green-100",
      text: "text-green-600",
      icon: FaBox,
    };
  }
  if (order.isPaid) {
    return {
      label: "On the way",
      box: "bg-blue-100",
      text: "text-blue-600",
      icon: FaTruck,
    };
  }
  return {
    label: "Processing",
    box: "bg-amber-100",
    text: "text-amber-600",
    icon: FaClock,
  };
}

export default function OrderCard({
  order,
  defaultOpen = false,
}: {
  order: IUserOrder;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const status = getStatus(order);
  const StatusIcon = status.icon;
  const isCard = order.paymentMethodType === "card";

  const items = order.cartItems ?? [];
  const unitsCount = items.reduce((sum, item) => sum + item.count, 0);
  const first = items[0];
  const extra = items.length - 1;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );
  const orderNumber = order._id.slice(-6).toUpperCase();
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
        open
          ? "border-primary-200 shadow-lg shadow-primary-100/50"
          : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md",
      )}
    >
      {/* summary */}
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          <div className="relative shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 to-white p-2.5 sm:h-28 sm:w-28">
              {first && (
                <Image
                  src={first.product.imageCover}
                  alt={first.product.title}
                  fill
                  sizes="112px"
                  className="object-contain p-2.5"
                />
              )}
            </div>
            {extra > 0 && (
              <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white shadow-lg">
                +{extra}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div
                  className={cn(
                    "mb-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1",
                    status.box,
                  )}
                >
                  <StatusIcon className={cn("text-xs", status.text)} />
                  <span className={cn("text-xs font-semibold", status.text)}>
                    {status.label}
                  </span>
                </div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <FaHashtag className="text-xs text-gray-400" />
                  {orderNumber}
                </h3>
              </div>

              <div
                title={isCard ? "Paid online" : "Cash on delivery"}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  isCard ? "bg-purple-100" : "bg-gray-100",
                )}
              >
                {isCard ? (
                  <FaCreditCard className="text-purple-600" />
                ) : (
                  <FaMoneyBill className="text-gray-600" />
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <FaCalendarDays className="text-xs text-gray-400" />
                {date}
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <FaBox className="text-xs text-gray-400" />
                {unitsCount} {unitsCount === 1 ? "item" : "items"}
              </span>
              {order.shippingAddress?.city && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1.5">
                    <FaLocationDot className="text-xs text-gray-400" />
                    {order.shippingAddress.city}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice.toLocaleString()}
                </span>
                <span className="ml-1 text-sm font-medium text-gray-400">
                  EGP
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                  open
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                {open ? "Hide" : "Details"}
                <FaChevronDown
                  className={cn(
                    "text-xs transition-transform duration-300",
                    open && "rotate-180",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* details */}
      {open && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100">
                <FaReceipt className="text-xs text-primary-600" />
              </div>
              Order Items
            </h4>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
                >
                  <div className="relative h-16 w-16 shrink-0 rounded-xl bg-gray-50 p-2">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">
                      {item.product.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>{" "}
                      × {item.price.toLocaleString()} EGP
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {(item.price * item.count).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 px-5 pb-5 sm:grid-cols-2 sm:px-6 sm:pb-6">
            {/* delivery address */}
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100">
                  <FaLocationDot className="text-xs text-blue-600" />
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.city}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {order.shippingAddress?.details}
                </p>
                <p className="flex items-center gap-2 pt-1 text-sm text-gray-600">
                  <FaPhone className="text-xs text-gray-400" />
                  {order.shippingAddress?.phone}
                </p>
              </div>
            </div>

            {/* order summary */}
            <div className="rounded-xl border border-amber-200 bg-amber-100 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500">
                  <FaClock className="text-xs text-white" />
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {order.shippingPrice === 0
                      ? "Free"
                      : `${order.shippingPrice.toLocaleString()} EGP`}
                  </span>
                </div>
                {order.taxPrice > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">
                      {order.taxPrice.toLocaleString()} EGP
                    </span>
                  </div>
                )}
                <hr className="my-2 border-gray-200/50" />
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
