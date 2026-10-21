"use client";

import { useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaLock,
  FaStar,
  FaUsers,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import { mergeGuestCartAction } from "@/actions/cart.actions";
import { mergeGuestWishlistAction } from "@/actions/wishlist.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cartKey } from "@/hooks/use-cart";
import { wishlistKey } from "@/hooks/use-wishlist";
import { loginSchema, type LoginFormValues } from "@/lib/schema/auth.schema";
import DotsSpinner from "../common/dots-spinner";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-300 bg-transparent pl-11 pr-4 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500";
const labelClass = "text-sm font-medium text-gray-800";
const socialButtonClass =
  "h-12 w-full rounded-lg border border-gray-300 bg-white text-base font-normal text-gray-800 shadow-none hover:bg-gray-50";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const rawCallback = searchParams.get("callbackUrl");

  // only allow paths inside our own site
  const callbackUrl =
    rawCallback && rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/";

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function submitData(formData: LoginFormValues) {
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login successful");

    try {
      // move guest cart products into the account (runs once)
      const { merged } = await mergeGuestCartAction();

      // move guest wishlist products into the account (runs once)
      await mergeGuestWishlistAction();

      // the saved numbers may still be the guest ones: reload them
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: cartKey }),
        queryClient.invalidateQueries({ queryKey: wishlistKey }),
      ]);

      if (merged > 0) {
        toast.info("Your cart items have been saved!");
      }
    } catch {
      // merge failed: still continue to the site
    }

    // full page navigation: the navbar reads the new session
    setTimeout(() => {
      window.location.href = callbackUrl;
    }, 800);
  }

  return (
    <div className="rounded-2xl bg-white px-5 py-8 shadow-lg sm:px-10 sm:py-10">
      {/* heading */}
      <div className="text-center">
        <p className="text-3xl font-bold">
          <span className="text-primary-600">Fresh</span>
          <span className="text-gray-800">Cart</span>
        </p>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="mt-3 text-sm text-gray-700 sm:text-base">
          Sign in to continue your fresh shopping experience
        </p>
      </div>

      {/* social buttons */}
      <div className="mt-8 space-y-3">
        <Button
          type="button"
          variant="outline"
          className={socialButtonClass}
          aria-label="Continue with Google"
        >
          <FcGoogle className="me-2 size-5" />
          <span>Continue with Google</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className={socialButtonClass}
          aria-label="Continue with Facebook"
        >
          <FaFacebook className="me-2 size-5 text-blue-600" />
          <span>Continue with Facebook</span>
        </Button>
      </div>

      {/* divider */}
      <div
        className="my-6 flex items-center gap-4 text-xs uppercase text-gray-600"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-gray-200" />
        or continue with email
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <form onSubmit={handleSubmit(submitData)} noValidate>
        <FieldGroup className="gap-5">
          {/* email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className={labelClass}>
                  Email Address
                </FieldLabel>
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                    {...field}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password" className={labelClass}>
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={fieldState.invalid}
                    className={`${inputClass} pr-12`}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="size-4" />
                    ) : (
                      <FaEye className="size-4" />
                    )}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* keep me signed in */}
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal" className="items-center gap-3">
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="size-4 shrink-0 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
                />
                <FieldLabel
                  htmlFor="rememberMe"
                  className="text-sm font-normal text-gray-800"
                >
                  Keep me signed in
                </FieldLabel>
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="h-16 w-full rounded-xl bg-primary-600 text-xl font-semibold text-white shadow-md transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <DotsSpinner className="size-6 text-white" />
                <span>Signing in...</span>
              </span>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* bottom */}
      <div className="mt-6 border-t border-gray-200 pt-6 text-center">
        <p className="text-gray-700">
          New to FreshCart?{" "}
          <Link
            href="/register"
            className="font-medium text-primary-600 hover:underline"
          >
            Create an account
          </Link>
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
          <span className="flex items-center gap-1.5">
            <FaLock className="size-3" /> SSL Secured
          </span>
          <span className="flex items-center gap-1.5">
            <FaUsers className="size-3.5" /> 50K+ Users
          </span>
          <span className="flex items-center gap-1.5">
            <FaStar className="size-3" /> 4.9 Rating
          </span>
        </div>
      </div>
    </div>
  );
}
