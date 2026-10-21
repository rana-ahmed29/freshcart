import { FaBoxOpen } from "react-icons/fa6";

import ActiveFilters, {
  type ActiveFilter,
} from "@/components/products/active-filters";
import NoProducts from "@/components/products/no-products";
import ProductCard from "@/components/products/product-card";
import ProductsHeader from "@/components/products/products-header";
import { getSpecificBrand } from "@/services/brands.services";
import { getSpecificCategory } from "@/services/categories.services";
import { getAllProducts } from "@/services/products.services";

type SearchParams = {
  brand?: string;
  category?: string;
  keyword?: string;
};

// builds /products?... without one of the filters
function hrefWithout(params: SearchParams, remove: keyof SearchParams) {
  const next = new URLSearchParams();
  (Object.keys(params) as (keyof SearchParams)[]).forEach((key) => {
    const value = params[key];
    if (key !== remove && value) next.set(key, value);
  });
  const query = next.toString();
  return query ? `/products?${query}` : "/products";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { brand, category, keyword } = params;

  // an unknown id is not an error: the brand or category is just null
  const [products, brandData, categoryData] = await Promise.all([
    getAllProducts({ brand, category, keyword }),
    brand ? getSpecificBrand(brand) : null,
    category ? getSpecificCategory(category).catch(() => null) : null,
  ]);

  const filters: ActiveFilter[] = [];
  if (brandData) {
    filters.push({
      kind: "brand",
      label: brandData.name,
      removeHref: hrefWithout(params, "brand"),
    });
  }
  if (categoryData) {
    filters.push({
      kind: "category",
      label: categoryData.name,
      removeHref: hrefWithout(params, "category"),
    });
  }
  if (keyword) {
    filters.push({
      kind: "keyword",
      label: `"${keyword}"`,
      removeHref: hrefWithout(params, "keyword"),
    });
  }

  // the header follows the main filter: brand, then category, then keyword
  const header = brandData
    ? {
        title: brandData.name,
        description: `Shop ${brandData.name} products`,
        crumbs: [
          { label: "Brands", href: "/brands" },
          { label: brandData.name },
        ],
        image: brandData.image,
      }
    : categoryData
      ? {
          title: categoryData.name,
          description: `Browse products in ${categoryData.name}`,
          crumbs: [
            { label: "Categories", href: "/categories" },
            { label: categoryData.name },
          ],
          image: categoryData.image,
        }
      : keyword
        ? {
            title: "Search Results",
            description: `Results for "${keyword}"`,
            crumbs: [{ label: "Search" }],
          }
        : {
            title: "All Products",
            description: "Explore our complete product collection",
            crumbs: [{ label: "All Products" }],
          };

  return (
    <>
      <ProductsHeader
        {...header}
        icon={<FaBoxOpen className="text-2xl" />}
      />

      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <ActiveFilters filters={filters} />

          <p className="mb-6 text-gray-600">
            Showing {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>

          {products.length === 0 ? (
            <NoProducts />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}