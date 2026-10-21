import { FaBoxOpen } from "react-icons/fa6";

import DotsSpinner from "@/components/common/dots-spinner";
import PageHeader from "@/components/common/page-header";

export default function ProductsLoading() {
  return (
    <>
      <PageHeader
        title="All Products"
        description="Explore our complete product collection"
        icon={<FaBoxOpen className="text-3xl" />}
      />

      <section className="py-8">
        <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center gap-4 px-4">
          <DotsSpinner />
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </section>
    </>
  );
}
