import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/schema/auth.schema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function signUpUser(formData: RegisterFormValues) {
  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    rePassword: formData.rePassword,
    phone: formData.phone,
  };

  const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Something went wrong, try again");
  }

  return result;
}

type SignInInput = Pick<LoginFormValues, "email" | "password">;

export async function signInUser({ email, password }: SignInInput) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message ?? "Something went wrong, try again");
  }

  return result;
}
