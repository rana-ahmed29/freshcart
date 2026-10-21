
import { FaTags } from "react-icons/fa6";
import DotsSpinner from "@/components/common/dots-spinner";
import PageHeader from "@/components/common/page-header";

export default function BrandsLoading() {
  return (
    <>
      <PageHeader
        title="Top Brands"
        description="Shop from your favorite brands"
        crumbs={[{ label: "Brands" }]}
        gradient="from-purple-600 via-purple-500 to-fuchsia-400"
        icon={<FaTags className="size-7" />}
      />

      <section className="bg-gray-50/50 py-10">
        <div className="container mx-auto px-4">
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-4 py-24"
          >
            <DotsSpinner className="size-12 text-purple-600!" />
            <p className="text-lg text-gray-500">Loading brands...</p>
          </div>
        </div>
      </section>
    </>
  );
}
