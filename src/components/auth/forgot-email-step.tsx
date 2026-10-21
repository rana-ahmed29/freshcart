"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import { toast } from "react-toastify";

import { sendResetCodeAction } from "@/actions/password.actions";
import ForgotCardHeader from "@/components/auth/forgot-card-header";
import DotsSpinner from "@/components/common/dots-spinner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  emailSchema,
  type EmailFormValues,
} from "@/lib/schema/forgot-password.schema";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-300 bg-transparent pl-11 pr-4 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500";

export default function ForgotEmailStep({
  defaultEmail,
  onSent,
}: {
  defaultEmail: string;
  onSent: (email: string) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: "all",
    defaultValues: { email: defaultEmail },
  });

  async function submit({ email }: EmailFormValues) {
    try {
      const result = await sendResetCodeAction(email);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      onSent(email);
    } catch {
      toast.error("Could not reach the server. Try again.");
    }
  }

  return (
    <>
      <ForgotCardHeader
        title="Forgot Password?"
        subtitle="No worries, we'll send you a reset code"
        step={1}
      />

      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="reset-email"
                className="text-sm font-medium text-gray-800"
              >
                Email Address
              </FieldLabel>
              <div className="relative">
                <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                  {...field}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="h-14 w-full rounded-xl bg-primary-600 text-lg font-semibold text-white shadow-md transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <DotsSpinner className="size-5 text-white" />
              Sending Code...
            </span>
          ) : (
            "Send Reset Code"
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-primary-600 hover:underline"
      >
        <FaArrowLeft />
        Back to Sign In
      </Link>

      <div className="mt-6 border-t border-gray-200 pt-6 text-center text-gray-700">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign In
        </Link>
      </div>
    </>
  );
}
