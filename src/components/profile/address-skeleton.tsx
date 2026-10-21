export default function AddressSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-hidden="true">
      {Array.from({ length: 1 }, (_, i) => (
        <div
          key={i}
          className="flex animate-pulse items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div className="size-11 shrink-0 rounded-xl bg-gray-100" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-40 rounded bg-gray-100" />
            <div className="h-3 w-56 rounded bg-gray-100" />
            <div className="h-3 w-44 rounded bg-gray-100" />
          </div>
          <div className="flex gap-2">
            <div className="size-9 rounded-lg bg-gray-100" />
            <div className="size-9 rounded-lg bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
