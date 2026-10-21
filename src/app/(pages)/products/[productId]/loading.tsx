import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsLoading() {
  return (
    <>
      {/* breadcrumb skeleton */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* gallery skeleton */}
            <div className="min-w-0 lg:w-1/4">
              <div className="overflow-hidden rounded-xl bg-white p-4 shadow-sm">
                <Skeleton className="aspect-[4/5] w-full rounded-lg" />
                {/* same width as the real thumbnails (3.5 per view, 12px gap) */}
                <div className="mt-4 flex gap-3 overflow-hidden">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="aspect-[4/5] w-[calc((100%-36px)/3.5)] shrink-0 rounded"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* info skeleton */}
            <div className="lg:w-3/4">
              <div className="space-y-5 rounded-xl bg-white p-6 shadow-sm">
                {/* tags */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                {/* title */}
                <Skeleton className="h-8 w-2/3" />
                {/* rating */}
                <Skeleton className="h-5 w-40" />
                {/* price */}
                <Skeleton className="h-9 w-32" />
                {/* stock badge */}
                <Skeleton className="h-7 w-28 rounded-full" />
                {/* description */}
                <div className="space-y-2 border-t border-gray-100 pt-5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                {/* quantity */}
                <Skeleton className="h-12 w-48 rounded-lg" />
                {/* total price box */}
                <Skeleton className="h-16 w-full rounded-lg" />
                {/* add to cart / buy now */}
                <div className="flex gap-3">
                  <Skeleton className="h-14 flex-1 rounded-xl" />
                  <Skeleton className="h-14 flex-1 rounded-xl" />
                </div>
                {/* wishlist / share */}
                <div className="flex gap-3">
                  <Skeleton className="h-12 flex-1 rounded-xl" />
                  <Skeleton className="h-12 w-14 rounded-xl" />
                </div>
                {/* feature icons row */}
                <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="size-10 shrink-0 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3.5 w-20" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tabs skeleton */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="flex gap-2 border-b border-gray-200 p-2">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="space-y-6 p-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Skeleton className="h-40 rounded-lg" />
                <Skeleton className="h-40 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related products skeleton */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Skeleton className="mb-6 h-7 w-48" />
          {/* same breakpoints as the real related products slider */}
          <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
