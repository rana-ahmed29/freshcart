"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FaFacebook, FaUserPlus } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/schema/auth.schema"
import { signUpUser } from "@/services/auth.services";
import DotsSpinner from "../common/dots-spinner";

// password strength bar (UI only)
function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-orange-500" },
    { label: "Good", color: "bg-blue-500" },
    { label: "Strong", color: "bg-primary-600" },
  ];

  return { ...levels[score], percent: score * 25 };
}

// smaller on mobile, full size from sm up
const inputClass =
  "h-12 w-full rounded-md border border-gray-400/40 bg-transparent px-3 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500 sm:h-[44px] sm:px-4";
const labelClass = "text-base font-normal";
const fieldClass = "gap-2";

const socialButtonClass =
  "h-12 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white text-base font-medium text-gray-800 shadow-none hover:bg-gray-100 sm:h-[52px]";

export default function RegisterForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  const password = useWatch({ control, name: "password" });
  const strength = getStrength(password);

  async function submitData(formData: RegisterFormValues) {
    try {
      await signUpUser(formData);

      toast.success("Account created successfully");
      reset();

      // go to login after the user sees the toast
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      // email already used: also mark the email field
      if (message.toLowerCase().includes("already exist")) {
        setError("email", { type: "server", message });
      }

      toast.error(message);
    }
  }

  return (
    <div className="rounded-2xl bg-white px-4 py-8 shadow-lg sm:px-6 sm:py-10">
      <h2 className="mb-2 text-center text-2xl font-semibold sm:text-3xl">
        Create Your Account
      </h2>
      <p className="text-center text-sm sm:text-base">
        Start your fresh journey with us today
      </p>

      {/* social buttons */}
      <div className="my-6 flex gap-2 sm:my-10">
        <Button
          type="button"
          variant="outline"
          className={socialButtonClass}
          aria-label="Sign up with Google"
        >
          <FcGoogle className="me-2 size-5" />
          <span>Google</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className={socialButtonClass}
          aria-label="Sign up with Facebook"
        >
          <FaFacebook className="me-2 size-5 text-blue-600" />
          <span>Facebook</span>
        </Button>
      </div>

      {/* divider */}
      <div
        className="relative my-4 flex h-0.5 w-full items-center bg-gray-300/30 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:px-4 before:content-['or']"
        aria-hidden="true"
      >
        <span className="sr-only">or</span>
      </div>

      <form onSubmit={handleSubmit(submitData)} noValidate>
        <FieldGroup className="gap-5 sm:gap-7">
          {/* name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field className={fieldClass} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name" className={labelClass}>
                  Name*
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Rana"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field className={fieldClass} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className={labelClass}>
                  Email*
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="rana@example.com"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* password + strength bar */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field className={fieldClass} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password" className={labelClass}>
                  Password*
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="create a strong password"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />

                <div className="flex items-center gap-2">
                  <div
                    className="h-1 grow overflow-hidden rounded-md bg-gray-200"
                    role="progressbar"
                    aria-valuenow={strength.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Password strength: ${strength.label}`}
                  >
                    <div
                      className={`h-full transition-all duration-300 ease-out ${strength.color}`}
                      style={{ width: `${strength.percent}%` }}
                    />
                  </div>
                  <span className="min-w-12.5 text-sm font-medium">
                    {strength.label}
                  </span>
                </div>

                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <p className="-mt-2 text-xs text-gray-500">
                    Must be at least 8 characters with numbers and symbols
                  </p>
                )}
              </Field>
            )}
          />

          {/* confirm password */}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field className={fieldClass} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rePassword" className={labelClass}>
                  Confirm Password*
                </FieldLabel>
                <Input
                  id="rePassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="confirm your password"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* phone */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field className={fieldClass} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone" className={labelClass}>
                  Phone Number*
                </FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 234 567 8900"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* terms */}
          <Controller
            name="terms"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                orientation="horizontal"
                className="flex-wrap items-start gap-x-3 gap-y-1"
                data-invalid={fieldState.invalid}
              >
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className="mt-1 size-4 shrink-0 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
                />
                <FieldLabel
                  htmlFor="terms"
                  className={`${labelClass} block flex-1 leading-relaxed`}
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <span className="whitespace-nowrap">
                    <Link
                      href="/privacy-policy"
                      className="text-primary-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    *
                  </span>
                </FieldLabel>
                {fieldState.invalid && (
                  <div className="basis-full">
                    <FieldError errors={[fieldState.error]} />
                  </div>
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="h-12 w-full rounded-lg bg-primary-700 text-base font-medium text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11"
          >
            {isSubmitting ? (
              <>
                <DotsSpinner className="me-2 size-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <FaUserPlus className="me-2 size-5" />
                <span>Create My Account</span>
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 border-t border-gray-300/30 pt-6 text-center sm:my-4 sm:pt-10">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
