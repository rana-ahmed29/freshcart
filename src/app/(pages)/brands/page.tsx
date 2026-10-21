import { FaTags } from "react-icons/fa6";

import BrandCard from "@/components/brands/brand-card";
import PageHeader from "@/components/common/page-header";
import { getAllBrands } from "@/services/brands.services";

// refresh the list at most once an hour
export const revalidate = 3600;

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <>
      <PageHeader
        title="Top Brands"
        description="Shop from your favorite brands"
        icon={<FaTags className="text-2xl" />}
        gradient="from-purple-600 via-purple-500 to-fuchsia-400"
      />

      <section className="bg-gray-50/50 py-10">
        <div className="container mx-auto px-4">
          {brands.length === 0 ? (
            <p className="py-16 text-center text-gray-500">No brands found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
              {brands.map((brand, index) => (
                <BrandCard key={brand._id} brand={brand} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
