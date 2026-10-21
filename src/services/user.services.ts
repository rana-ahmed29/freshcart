const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import type {
  IChangePasswordInput,
  IChangePasswordResponse,
  IUpdateUserInput,
  IUpdateUserResponse,
} from "@/types/user";

export async function updateLoggedUserData(
  input: IUpdateUserInput,
  token: string,
): Promise<IUpdateUserResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/users/updateMe/`, {
    method: "PUT",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.errors?.msg ?? data?.message ?? "Failed to update your data",
    );
  }
  return data;
}

export async function changeLoggedUserPassword(
  input: IChangePasswordInput,
  token: string,
): Promise<IChangePasswordResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/users/changeMyPassword`, {
    method: "PUT",
    headers: { token, "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.errors?.msg ?? data?.message ?? "Failed to change the password",
    );
  }
  return data;
}
