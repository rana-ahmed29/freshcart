import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/products/product-card-skeleton";

export default function FeaturedProductsSkeleton({
  count = 10,
}: {
  count?: number;
}) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Skeleton className="mb-6 h-9 w-64" />

        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
