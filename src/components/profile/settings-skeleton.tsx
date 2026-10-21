export default function SettingsSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      {[3, 3].map((fields, i) => (
        <div
          key={i}
          className="animate-pulse rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-gray-100" />
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-gray-100" />
              <div className="h-3 w-56 rounded bg-gray-100" />
            </div>
          </div>
          <div className="space-y-5">
            {Array.from({ length: fields }, (_, j) => (
              <div key={j} className="space-y-2">
                <div className="h-3 w-24 rounded bg-gray-100" />
                <div className="h-12 w-full rounded-lg bg-gray-100" />
              </div>
            ))}
            <div className="h-12 w-40 rounded-xl bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
