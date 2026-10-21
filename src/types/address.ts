export interface ISavedAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

// the body of POST /addresses
export interface IAddressInput {
  name: string;
  details: string;
  phone: string;
  city: string;
}

// GET returns the list; POST and DELETE return the updated list
export interface IAddressesResponse {
  status: string;
  message?: string;
  results?: number;
  data: ISavedAddress[];
}
