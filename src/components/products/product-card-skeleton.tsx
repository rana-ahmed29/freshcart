import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white p-4">
      <Skeleton className="aspect-square w-full rounded-lg" />

      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}
