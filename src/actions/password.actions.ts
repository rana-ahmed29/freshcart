"use server";

type ActionResult = { success: boolean; message: string };

import {
  resetPassword,
  sendResetCode,
  verifyResetCode,
} from "@/services/password.services";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

export async function sendResetCodeAction(
  email: string,
): Promise<ActionResult> {
  const clean = String(email ?? "").trim();
  if (!EMAIL_REGEX.test(clean)) {
    return { success: false, message: "Enter a valid email" };
  }

  try {
    await sendResetCode(clean);
    return { success: true, message: "Reset code sent to your email!" };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function verifyResetCodeAction(
  resetCode: string,
): Promise<ActionResult> {
  const clean = String(resetCode ?? "").trim();
  if (!/^\d{6}$/.test(clean)) {
    return { success: false, message: "Enter the 6-digit code" };
  }

  try {
    await verifyResetCode(clean);
    return { success: true, message: "Code verified" };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function resetPasswordAction(
  email: string,
  newPassword: string,
): Promise<ActionResult> {
  const cleanEmail = String(email ?? "").trim();
  const password = String(newPassword ?? "");

  if (!EMAIL_REGEX.test(cleanEmail)) {
    return { success: false, message: "Enter a valid email" };
  }
  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters",
    };
  }

  try {
    await resetPassword(cleanEmail, password);
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}
