"use client";

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

export default function ClearCompareDialog({
  onConfirm,
  children,
}: {
  onConfirm: () => void;
  children: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="gap-0 rounded-2xl border-0 p-0 shadow-2xl ring-0 data-[size=default]:max-w-[calc(100%-2rem)] data-[size=default]:sm:max-w-lg">
        <div className="p-6 py-8 text-center">
          <AlertDialogTitle className="mb-2 text-2xl font-bold text-gray-900">
            Clear Compare List?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-relaxed text-gray-500">
            All products will be removed from your compare list. This action
            cannot be undone.
          </AlertDialogDescription>
        </div>

        <AlertDialogFooter className="flex-row-reverse justify-center gap-3 px-6 pb-6 pt-0 sm:flex-row-reverse sm:justify-center">
          <AlertDialogAction
            onClick={onConfirm}
            className="h-auto rounded-xl bg-red-500 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-red-600"
          >
            Yes, Clear All
          </AlertDialogAction>
          <AlertDialogCancel className="h-auto rounded-xl border-0 bg-gray-100 px-6 py-3 text-base font-semibold text-gray-700 shadow-none transition-all hover:bg-gray-200">
            Keep Comparing
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
