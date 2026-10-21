"use client";

import {
  FaCcAmex,
  FaCcMastercard,
  FaCcVisa,
  FaCheck,
  FaCreditCard,
  FaMoneyBillWave,
  FaShieldHalved,
  FaWallet,
} from "react-icons/fa6";

import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types/order";

export default function PaymentMethodSection({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <FaWallet />
          Payment Method
        </h2>
        <p className="mt-1 text-sm text-primary-100">
          Choose how you&apos;d like to pay
        </p>
      </div>

      <div
        className="space-y-4 p-6"
        role="radiogroup"
        aria-label="Payment method"
      >
        {/* cash on delivery */}
        <button
          type="button"
          role="radio"
          aria-checked={value === "cash"}
          onClick={() => onChange("cash")}
          className={cn(
            "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
            value === "cash"
              ? "border-primary-600 bg-primary-50/50"
              : "border-gray-200 hover:border-gray-300",
          )}
        >
          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl",
              value === "cash"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-400",
            )}
          >
            <FaMoneyBillWave className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-gray-900">
              Cash on Delivery
            </span>
            <span className="block text-sm text-gray-500">
              Pay when your order arrives at your doorstep
            </span>
          </span>
          <Radio checked={value === "cash"} />
        </button>

        {/* pay online */}
        <button
          type="button"
          role="radio"
          aria-checked={value === "online"}
          onClick={() => onChange("online")}
          className={cn(
            "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
            value === "online"
              ? "border-primary-600 bg-linear-to-r from-primary-50 to-blue-50"
              : "border-gray-200 hover:border-gray-300",
          )}
        >
          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl",
              value === "online"
                ? "bg-linear-to-br from-primary-500 to-blue-500 text-white"
                : "bg-gray-100 text-gray-400",
            )}
          >
            <FaCreditCard className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-gray-900">
              Pay Online
            </span>
            <span className="block text-sm text-gray-500">
              Secure payment with Credit/Debit Card via Stripe
            </span>
            <span className="mt-2 flex items-center gap-2 text-2xl text-gray-400">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcAmex />
            </span>
          </span>
          <Radio checked={value === "online"} />
        </button>

        {/* secure note */}
        <div className="flex items-center gap-3 rounded-xl bg-primary-50 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <FaShieldHalved />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Secure &amp; Encrypted
            </p>
            <p className="text-xs text-primary-700">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// the round indicator on the right of each option
function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
        checked
          ? "border-primary-600 bg-primary-600 text-white"
          : "border-gray-300",
      )}
    >
      {checked && <FaCheck className="size-3" />}
    </span>
  );
}
