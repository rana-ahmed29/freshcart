"use client";

import type { ReactNode } from "react";

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

type ClearCartDialogProps = {
  onConfirm: () => void;
  children: ReactNode; // the button that opens the dialog
};

export default function ClearCartDialog({
  onConfirm,
  children,
}: ClearCartDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg! gap-0! rounded-md! border-0 bg-white p-0! shadow-2xl">
        {/* body */}
        <div className="p-6">
          <div className="py-2 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-red-50 to-orange-50">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <AlertDialogTitle className="mb-2 text-center text-2xl font-bold text-gray-900">
              Clear Your Cart?
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto max-w-xs text-center text-sm leading-relaxed text-gray-500">
              All items will be removed from your cart. This action cannot be
              undone.
            </AlertDialogDescription>
          </div>
        </div>

        {/* actions: confirm on the right, cancel on the left */}
        <AlertDialogFooter className="flex-row-reverse justify-center gap-3 px-6 pb-6 pt-0 sm:flex-row-reverse sm:justify-center">
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600"
          >
            Yes, Clear All
          </AlertDialogAction>
          <AlertDialogCancel className="mt-0 h-auto rounded-xl border-0 bg-gray-100 px-6 py-3 font-semibold text-gray-700 shadow-none transition-all hover:bg-gray-200">
            Keep Shopping
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
