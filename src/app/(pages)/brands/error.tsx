"use client";

export default function BrandsError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-lg text-gray-600">We could not load the brands.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        Try again
      </button>
    </div>
  );
}
