import type { IProduct } from "@/types/product";

export interface IOrderItem {
  _id: string;
  count: number;
  price: number;
  product: IProduct;
}

export interface IUserOrder {
  _id: string;
  id?: number;
  cartItems: IOrderItem[];
  shippingAddress?: { details: string; phone: string; city: string };
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  createdAt: string;
}
