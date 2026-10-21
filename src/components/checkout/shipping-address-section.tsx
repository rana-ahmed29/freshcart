"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Controller,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import {
  FaBookmark,
  FaBuilding,
  FaCircleInfo,
  FaHouse,
  FaLocationDot,
  FaPhone,
  FaPlus,
} from "react-icons/fa6";

import { getSavedAddressesAction } from "@/actions/order.actions";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { CheckoutFormValues } from "@/lib/schema/checkout.schema";
import type { ISavedAddress } from "@/types/address";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-300 bg-transparent pl-11 pr-4 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500";
const labelClass = "text-sm font-medium text-gray-800";

type Props = {
  control: Control<CheckoutFormValues>;
  setValue: UseFormSetValue<CheckoutFormValues>;
};

export default function ShippingAddressSection({ control, setValue }: Props) {
  // null = the user is typing a new address
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: addresses = [] } = useQuery({
    queryKey: ["checkout-addresses"],
   
    queryFn: getSavedAddressesAction,
  });

  function selectSaved(address: ISavedAddress) {
    setSelectedId(address._id);
    const options = { shouldValidate: true, shouldDirty: true };
    setValue("city", address.city, options);
    setValue("details", address.details, options);
    setValue("phone", address.phone, options);
  }

  function useNewAddress() {
    setSelectedId(null);
    setValue("city", "");
    setValue("details", "");
    setValue("phone", "");
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <FaHouse />
          Shipping Address
        </h2>
        <p className="mt-1 text-sm text-primary-100">
          Where should we deliver your order?
        </p>
      </div>

      <div className="space-y-5 p-6">
        {/* saved addresses */}
        {addresses.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-gray-900">
              <FaBookmark className="text-sm text-primary-600" />
              Saved Addresses
            </h3>
            <p className="mb-4 mt-1 text-sm text-gray-500">
              Select a saved address or enter a new one below
            </p>

            <div className="space-y-3">
              {addresses.map((address) => (
                <button
                  key={address._id}
                  type="button"
                  onClick={() => selectSaved(address)}
                  aria-pressed={selectedId === address._id}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                    selectedId === address._id
                      ? "border-primary-600 bg-primary-50/50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                    <FaLocationDot />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-gray-900">
                      {address.name}
                    </span>
                    <span className="block text-sm text-gray-500">
                      {address.details}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaPhone />
                        {address.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBuilding />
                        {address.city}
                      </span>
                    </span>
                  </span>
                </button>
              ))}

              {/* use a different address */}
              <button
                type="button"
                onClick={useNewAddress}
                aria-pressed={selectedId === null}
                className="flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-primary-400 bg-primary-50/40 p-4 text-left transition-colors hover:bg-primary-50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
                  <FaPlus />
                </span>
                <span>
                  <span className="block font-semibold text-primary-700">
                    Use a different address
                  </span>
                  <span className="block text-xs text-gray-500">
                    Enter a new shipping address manually
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}

       
   {/* delivery note */}
<div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
    <FaCircleInfo className="text-sm text-blue-600" />
  </div>
  <div>
    <p className="text-sm font-medium text-blue-800">Delivery Information</p>
    <p className="mt-0.5 text-xs text-blue-600">
      Please ensure your address is accurate for smooth delivery
    </p>
  </div>
</div>

        {/* city */}
        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="city" className={labelClass}>
                City <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <FaBuilding className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="city"
                  autoComplete="address-level2"
                  placeholder="e.g. Cairo, Alexandria, Giza"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* street address */}
        <Controller
          name="details"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="details" className={labelClass}>
                Street Address <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <FaLocationDot className="pointer-events-none absolute left-4 top-4 size-4 text-gray-400" />
                <textarea
                  id="details"
                  rows={3}
                  autoComplete="street-address"
                  placeholder="Street name, building number, floor, apartment..."
                  aria-invalid={fieldState.invalid}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-transparent py-3 pl-11 pr-4 text-base placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:outline-none aria-invalid:border-red-500"
                  {...field}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone" className={labelClass}>
                Phone Number <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <FaPhone className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="01xxxxxxxxx"
                  aria-invalid={fieldState.invalid}
                  className={`${inputClass} pr-36`}
                  {...field}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  Egyptian numbers only
                </span>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </section>
  );
}
