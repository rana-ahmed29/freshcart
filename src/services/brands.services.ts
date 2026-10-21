const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import type { IBrand } from "@/types/brands";

export async function getAllBrands(): Promise<IBrand[]> {
  // limit=100 so every brand comes back, not only the first 10
  const response = await fetch(`${BASE_URL}/api/v1/brands?limit=100`);
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Failed to load brands");
  }
  return result?.data ?? [];
}


export async function getSpecificBrand(
  brandId: string,
): Promise<IBrand | null> {
  const response = await fetch(`${BASE_URL}/api/v1/brands/${brandId}`);
  const result = await response.json().catch(() => null);

  // an unknown id is not an error: the page just shows no brand
  if (!response.ok || !result?.data) return null;
  return result.data;
}
