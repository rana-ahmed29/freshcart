const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import type { ICategory, ISubcategory } from "@/types/category";

export async function getAllCategories(): Promise<ICategory[]> {
  const response = await fetch(`${BASE_URL}/api/v1/categories`);
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Failed to load categories");
  }
  return result?.data ?? [];
}

export async function getSpecificCategory(
  categoryId: string,
): Promise<ICategory> {
  const response = await fetch(`${BASE_URL}/api/v1/categories/${categoryId}`);
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.data) {
    throw new Error(result?.message ?? "Failed to load the category");
  }
  return result.data;
}

export async function getSubCategoriesOnCategory(
  categoryId: string,
): Promise<ISubcategory[]> {
  const response = await fetch(
    `${BASE_URL}/api/v1/categories/${categoryId}/subcategories`,
  );
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Failed to load subcategories");
  }
  return result?.data ?? [];
}