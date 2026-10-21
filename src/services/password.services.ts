const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function request(path: string, method: "POST" | "PUT", body: object) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.errors?.msg ?? data?.message ?? "Something went wrong, try again",
    );
  }
  return data;
}

export function sendResetCode(email: string) {
  return request("forgotPasswords", "POST", { email });
}

export function verifyResetCode(resetCode: string) {
  return request("verifyResetCode", "POST", { resetCode });
}

export function resetPassword(email: string, newPassword: string) {
  return request("resetPassword", "PUT", { email, newPassword });
}
