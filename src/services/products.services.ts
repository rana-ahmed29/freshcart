import { IProduct } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export async function getAllProducts(): Promise<IProduct[]> {
//   const response = await fetch(`${BASE_URL}/api/v1/products`);
//   const result = await response.json();
//   return result.data;
// }


export type ProductFilters = {
  category?: string;
  brand?: string;
  keyword?: string;
};

export async function getAllProducts(
  filters: ProductFilters = {},
): Promise<IProduct[]> {
  const params = new URLSearchParams({ limit: "100" });
  if (filters.category) params.set("category[in]", filters.category);
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.keyword) params.set("keyword", filters.keyword);

  const response = await fetch(`${BASE_URL}/api/v1/products?${params}`);
  const result = await response.json();
  return result.data ?? [];
}


export async function getSpecificProduct(productId: string): Promise<IProduct> {
  const response = await fetch(`${BASE_URL}/api/v1/products/${productId}`);
  const result = await response.json();
  return result.data;
}


export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string,
): Promise<IProduct[]> {
  const response = await fetch(
    `${BASE_URL}/api/v1/products?category[in]=${categoryId}`,
  );
  const result = await response.json();

  // remove the product we are already looking at
  return (result.data as IProduct[]).filter(
    (item) => item._id !== currentProductId,
  );
}