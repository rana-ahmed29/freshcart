"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaCity,
  FaLocationDot,
  FaPen,
  FaPhone,
  FaTrash,
} from "react-icons/fa6";
import { toast } from "react-toastify";

import { removeAddressAction } from "@/actions/profile.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { addressesKey } from "@/hooks/use-addresses";
import type { ISavedAddress } from "@/types/address";

export default function AddressCard({
  address,
  onEdit,
}: {
  address: ISavedAddress;
  onEdit: (address: ISavedAddress) => void;
}) {
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: () => removeAddressAction(address._id),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success(result.message);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: addressesKey }),
          queryClient.invalidateQueries({ queryKey: ["checkout-addresses"] }),
        ]);
      } else {
        toast.error(result.message);
      }
    },
    onError: () => toast.error("Could not reach the server. Try again."),
  });

  return (
    <div
      className={`group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary-100 hover:shadow-md ${
        removeMutation.isPending ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100">
            <FaLocationDot className="text-lg text-primary-600" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-1 font-bold text-gray-900">{address.name}</h3>
            <p className="mb-3 line-clamp-2 text-sm text-gray-600">
              {address.details}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <FaPhone className="text-xs" />
                {address.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <FaCity className="text-xs" />
                {address.city}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit address"
            aria-label={`Edit ${address.name}`}
            disabled={removeMutation.isPending}
            onClick={() => onEdit(address)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 disabled:opacity-50"
          >
            <FaPen className="text-sm" />
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                title="Delete address"
                aria-label={`Delete ${address.name}`}
                disabled={removeMutation.isPending}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
              >
                {removeMutation.isPending ? (
                  <DotsSpinner className="size-4" />
                ) : (
                  <FaTrash className="text-sm" />
                )}
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="gap-0 rounded-2xl border-0 p-0 shadow-2xl ring-0 data-[size=default]:max-w-[calc(100%-2rem)] data-[size=default]:sm:max-w-lg">
              <div className="p-6 py-8 text-center">
                <AlertDialogTitle className="mb-2 text-2xl font-bold text-gray-900">
                  Delete Address?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm leading-relaxed text-gray-500">
                  Delete{" "}
                  <span className="font-semibold text-gray-700">
                    {address.name}
                  </span>{" "}
                  from your saved addresses?
                </AlertDialogDescription>
              </div>
              <AlertDialogFooter className="flex-row-reverse justify-center gap-3 px-6 pb-6 pt-0 sm:flex-row-reverse sm:justify-center">
                <AlertDialogAction
                  onClick={() => removeMutation.mutate()}
                  className="h-auto rounded-xl bg-red-500 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
                <AlertDialogCancel className="h-auto rounded-xl border-0 bg-gray-100 px-6 py-3 text-base font-semibold text-gray-700 shadow-none transition-all hover:bg-gray-200">
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
