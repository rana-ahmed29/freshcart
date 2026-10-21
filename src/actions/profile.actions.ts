"use server";

import { revalidatePath } from "next/cache";

import { getApiToken } from "@/lib/get-api-token";
import {
  addAddress,
  getLoggedUserAddresses,
  removeAddress,
} from "@/services/addresses.services";
import {
  changeLoggedUserPassword,
  updateLoggedUserData,
} from "@/services/user.services";

type ActionResult = { success: boolean; message: string };

const PHONE_REGEX = /^(?:\+20|0)1[0125][0-9]{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidId(id: unknown): id is string {
  return typeof id === "string" && id.length > 0 && id.length <= 40;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

// ---------- addresses ----------

// null = guest or error, [] = no addresses yet
export async function getAddressesAction() {
  const token = await getApiToken();
  if (!token) return null;

  try {
    const result = await getLoggedUserAddresses(token);
    return result.data ?? [];
  } catch {
    return null;
  }
}

export async function addAddressAction(input: {
  name: string;
  details: string;
  phone: string;
  city: string;
}): Promise<ActionResult> {
  // server actions can be called by anyone, so never trust the input
  const name = String(input?.name ?? "").trim();
  const details = String(input?.details ?? "").trim();
  const phone = String(input?.phone ?? "").trim();
  const city = String(input?.city ?? "").trim();

  if (!name || !details || !city || !PHONE_REGEX.test(phone)) {
    return { success: false, message: "Please check the address details" };
  }

  try {
    const token = await getApiToken();
    if (!token) return { success: false, message: "Please login first" };

    await addAddress({ name, details, phone, city }, token);

    revalidatePath("/", "layout");
    return { success: true, message: "Address added successfully" };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function removeAddressAction(
  addressId: string,
): Promise<ActionResult> {
  if (!isValidId(addressId)) {
    return { success: false, message: "Invalid address" };
  }

  try {
    const token = await getApiToken();
    if (!token) return { success: false, message: "Please login first" };

    await removeAddress(addressId, token);

    revalidatePath("/", "layout");
    return { success: true, message: "Address removed" };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

// the API has no "update address": add the new one, then remove the old one
export async function updateAddressAction(
  oldAddressId: string,
  input: { name: string; details: string; phone: string; city: string },
): Promise<ActionResult> {
  if (!isValidId(oldAddressId)) {
    return { success: false, message: "Invalid address" };
  }

  const added = await addAddressAction(input);
  if (!added.success) return added;

  // the new one is saved: now remove the old one
  const removed = await removeAddressAction(oldAddressId);
  if (!removed.success) {
    return {
      success: false,
      message: "Saved the new address, but could not remove the old one",
    };
  }

  return { success: true, message: "Address updated successfully" };
}

// ---------- settings ----------

export async function updateProfileAction(input: {
  name: string;
  email: string;
  phone: string;
}): Promise<ActionResult> {
  const name = String(input?.name ?? "").trim();
  const email = String(input?.email ?? "").trim();
  const phone = String(input?.phone ?? "").trim();

  if (name.length < 3 || name.length > 30) {
    return { success: false, message: "Name must be 3 to 30 characters" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { success: false, message: "Enter a valid email" };
  }
  if (!PHONE_REGEX.test(phone)) {
    return { success: false, message: "Enter a valid Egyptian phone number" };
  }

  try {
    const token = await getApiToken();
    if (!token) return { success: false, message: "Please login first" };

    const data = await updateLoggedUserData({ name, email, phone }, token);

    revalidatePath("/", "layout");
    return { success: true, message: data?.message ?? "Profile updated" };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function changePasswordAction(input: {
  currentPassword: string;
  password: string;
  rePassword: string;
}): Promise<ActionResult> {
  const currentPassword = String(input?.currentPassword ?? "");
  const password = String(input?.password ?? "");
  const rePassword = String(input?.rePassword ?? "");

  if (!currentPassword) {
    return { success: false, message: "Enter your current password" };
  }
  if (password.length < 6) {
    return {
      success: false,
      message: "New password must be at least 6 characters",
    };
  }
  if (password !== rePassword) {
    return { success: false, message: "Passwords do not match" };
  }

  try {
    const token = await getApiToken();
    if (!token) return { success: false, message: "Please login first" };

    await changeLoggedUserPassword(
      { currentPassword, password, rePassword },
      token,
    );

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

// the token is a JWT: its payload holds the user id and role
export async function getAccountInfoAction() {
  const token = await getApiToken();
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return {
      id: typeof json?.id === "string" ? json.id : "",
      role: typeof json?.role === "string" ? json.role : "user",
    };
  } catch {
    return null;
  }
}
