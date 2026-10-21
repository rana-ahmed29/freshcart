import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getApiToken() {
  const store = await cookies();

  const raw =
    store.get("__Secure-next-auth.session-token")?.value ??
    store.get("next-auth.session-token")?.value;

  if (!raw) return null;

  const jwt = await decode({
    token: raw,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return jwt?.token ?? null;
}
