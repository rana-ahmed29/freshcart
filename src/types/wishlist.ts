import type { IProduct } from "@/types/product";

// GET /wishlist returns the full products
export interface IWishlistResponse {
  status: string;
  count: number;
  data: IProduct[];
}

// POST and DELETE return only the product ids
export interface IWishlistIdsResponse {
  status: string;
  message: string;
  data: string[];
}
