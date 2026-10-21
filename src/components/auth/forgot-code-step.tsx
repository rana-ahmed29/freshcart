"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaShieldHalved } from "react-icons/fa6";
import { toast } from "react-toastify";

import {
  sendResetCodeAction,
  verifyResetCodeAction,
} from "@/actions/password.actions";
import ForgotCardHeader from "@/components/auth/forgot-card-header";
import DotsSpinner from "@/components/common/dots-spinner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  codeSchema,
  type CodeFormValues,
} from "@/lib/schema/forgot-password.schema";

export default function ForgotCodeStep({
  email,
  onVerified,
  onChangeEmail,
}: {
  email: string;
  onVerified: () => void;
  onChangeEmail: () => void;
}) {
  const [isResending, setIsResending] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    mode: "all",
    defaultValues: { resetCode: "" },
  });

  async function submit({ resetCode }: CodeFormValues) {
    try {
      const result = await verifyResetCodeAction(resetCode);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      onVerified();
    } catch {
      toast.error("Could not reach the server. Try again.");
    }
  }

  async function resend() {
    if (isResending) return;
    setIsResending(true);
    try {
      const result = await sendResetCodeAction(email);
      if (result.success) toast.success("A new code was sent");
      else toast.error(result.message);
    } catch {
      toast.error("Could not reach the server. Try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <>
      <ForgotCardHeader
        title="Check Your Email"
        subtitle={`Enter the 6-digit code sent to ${email}`}
        step={2}
      />

      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
        <Controller
          name="resetCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="reset-code"
                className="text-sm font-medium text-gray-800"
              >
                Verification Code
              </FieldLabel>
              <div className="relative">
                <FaShieldHalved className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="reset-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="• • • • • •"
                  aria-invalid={fieldState.invalid}
                  className="h-14 w-full rounded-lg border border-gray-300 bg-transparent pl-11 pr-4 text-center text-xl tracking-[0.5em] shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500"
                  {...field}
                  onChange={(event) =>
                    field.onChange(event.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <p className="text-center text-sm text-gray-600">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={resend}
            disabled={isResending}
            className="font-medium text-primary-600 hover:underline disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="h-14 w-full rounded-xl bg-primary-600 text-lg font-semibold text-white shadow-md transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <DotsSpinner className="size-5 text-white" />
              Verifying...
            </span>
          ) : (
            "Verify Code"
          )}
        </Button>
      </form>

      <button
        type="button"
        onClick={onChangeEmail}
        className="mt-6 flex w-full items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary-600"
      >
        <FaArrowLeft />
        Change email address
      </button>
    </>
  );
}
