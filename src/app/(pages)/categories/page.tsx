import { FaLayerGroup } from "react-icons/fa6";

import CategoryCard from "@/components/categories/category-card";
import PageHeader from "@/components/common/page-header";
import { getAllCategories } from "@/services/categories.services";

// refresh the list at most once an hour
export const revalidate = 3600;

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <>
      <PageHeader
        title="All Categories"
        description="Browse our wide range of product categories"
        icon={<FaLayerGroup className="text-2xl" />}
      />

      <section className="bg-gray-50/50 py-10">
        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No categories found.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
