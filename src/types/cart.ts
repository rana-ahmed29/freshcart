import { IProduct } from "./product";

export interface ICartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}


export interface ICartProduct {
  count: number;
  _id: string;
  product:IProduct;
  price: number;
}


