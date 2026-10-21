const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import type { IAddressesResponse, IAddressInput } from "@/types/address";

export async function getLoggedUserAddresses(
  token: string,
): Promise<IAddressesResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load addresses");
  }
  return data;
}

export async function addAddress(
  address: IAddressInput,
  token: string,
): Promise<IAddressesResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "POST",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify(address),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to add the address");
  }
  return data;
}

export async function removeAddress(
  addressId: string,
  token: string,
): Promise<IAddressesResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/addresses/${addressId}`, {
    method: "DELETE",
    headers: { token },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to remove the address");
  }
  return data;
}
