"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

import {
  addAddressAction,
  updateAddressAction,
} from "@/actions/profile.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addressesKey } from "@/hooks/use-addresses";
import {
  addressSchema,
  type AddressFormValues,
} from "@/lib/schema/profile.schema";
import type { ISavedAddress } from "@/types/address";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500";
const labelClass = "text-sm font-medium text-gray-800";

export default function AddressFormDialog({
  address,
  onClose,
}: {
  // null = add a new address, otherwise edit this one
  address: ISavedAddress | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const isEdit = address !== null;

  const { control, handleSubmit } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    mode: "all",
    defaultValues: {
      name: address?.name ?? "",
      details: address?.details ?? "",
      phone: address?.phone ?? "",
      city: address?.city ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: AddressFormValues) =>
      address
        ? updateAddressAction(address._id, values)
        : addAddressAction(values),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: addressesKey }),
        queryClient.invalidateQueries({ queryKey: ["checkout-addresses"] }),
      ]);
      onClose();
    },
    onError: () => toast.error("Could not reach the server. Try again."),
  });

  // close with the Escape key
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !mutation.isPending) onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, mutation.isPending]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => !mutation.isPending && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-dialog-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="address-dialog-title"
            className="text-2xl font-bold text-gray-900"
          >
            {isEdit ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={mutation.isPending}
            aria-label="Close"
            className="flex size-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-50"
          >
            <FaXmark />
          </button>
        </div>

        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          noValidate
          className="space-y-5"
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address-name" className={labelClass}>
                  Address Name
                </FieldLabel>
                <Input
                  id="address-name"
                  placeholder="e.g. Home, Office"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address-details" className={labelClass}>
                  Full Address
                </FieldLabel>
                <textarea
                  id="address-details"
                  rows={3}
                  placeholder="Street, building, apartment..."
                  aria-invalid={fieldState.invalid}
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-base placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:outline-none aria-invalid:border-red-500"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address-phone" className={labelClass}>
                    Phone Number
                  </FieldLabel>
                  <Input
                    id="address-phone"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address-city" className={labelClass}>
                    City
                  </FieldLabel>
                  <Input
                    id="address-city"
                    placeholder="Cairo"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="flex-1 rounded-xl bg-gray-100 py-3.5 font-semibold text-gray-800 transition-colors hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              aria-busy={mutation.isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/20 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? (
                <DotsSpinner className="size-5 text-white" />
              ) : isEdit ? (
                "Update"
              ) : (
                "Add Address"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
