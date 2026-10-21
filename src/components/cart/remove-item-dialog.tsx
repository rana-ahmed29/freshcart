"use client";

import type { ReactNode } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

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

type RemoveItemDialogProps = {
  productName: string;
  onConfirm: () => void;
  children: ReactNode; // the button that opens the dialog
};

export default function RemoveItemDialog({
  productName,
  onConfirm,
  children,
}: RemoveItemDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="gap-0 rounded-lg p-8 text-center data-[size=default]:max-w-[calc(100%-2rem)] data-[size=default]:sm:max-w-[640px]">
        {/* red circle with the trash icon */}
        <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-red-100 text-red-500">
          <FaRegTrashCan className="size-7" />
        </div>

        <AlertDialogTitle className="text-2xl font-bold text-gray-900">
          Remove Item?
        </AlertDialogTitle>

        <AlertDialogDescription className="mt-3 text-base text-gray-600">
          Remove{" "}
          <span className="font-semibold text-gray-900">{productName}</span>{" "}
          from your cart?
        </AlertDialogDescription>

        <AlertDialogFooter className="mt-10 gap-4 sm:justify-center">
          <AlertDialogCancel
            variant="secondary"
            className="h-15 rounded-lg bg-gray-100 px-8 text-lg font-semibold text-gray-900 hover:bg-gray-200"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onConfirm}
            className="h-15 rounded-lg bg-red-500 px-8 text-lg font-semibold text-white hover:bg-red-600"
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
