export interface IShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export type PaymentMethod = "cash" | "online";

// POST /orders/{cartId} (cash)
export interface ICashOrderResponse {
  status: string;
  data?: { _id: string };
}

// POST /orders/checkout-session/{cartId} (online)
export interface ICheckoutSessionResponse {
  status: string;
  session: { url: string };
}
