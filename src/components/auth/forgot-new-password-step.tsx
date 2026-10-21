"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import { toast } from "react-toastify";

import { resetPasswordAction } from "@/actions/password.actions";
import ForgotCardHeader from "@/components/auth/forgot-card-header";
import DotsSpinner from "@/components/common/dots-spinner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  newPasswordSchema,
  type NewPasswordFormValues,
} from "@/lib/schema/forgot-password.schema";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-300 bg-transparent pl-11 pr-12 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500";

const fields: {
  name: FieldPath<NewPasswordFormValues>;
  label: string;
  placeholder: string;
}[] = [
  {
    name: "newPassword",
    label: "New Password",
    placeholder: "Enter new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm new password",
  },
];

export default function ForgotNewPasswordStep({
  email,
  onDone,
}: {
  email: string;
  onDone: () => void;
}) {
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    mode: "all",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  async function submit({ newPassword }: NewPasswordFormValues) {
    try {
      const result = await resetPasswordAction(email, newPassword);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Password reset. Please sign in.");
      onDone();
    } catch {
      toast.error("Could not reach the server. Try again.");
    }
  }

  return (
    <>
      <ForgotCardHeader
        title="Create New Password"
        subtitle="Your new password must be different from previous passwords"
        step={3}
      />

      <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
        {fields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={item.name}
                  className="text-sm font-medium text-gray-800"
                >
                  {item.label}
                </FieldLabel>
                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id={item.name}
                    type={visible[item.name] ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={item.placeholder}
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setVisible((prev) => ({
                        ...prev,
                        [item.name]: !prev[item.name],
                      }))
                    }
                    aria-label={
                      visible[item.name] ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {visible[item.name] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="h-14 w-full rounded-xl bg-primary-600 text-lg font-semibold text-white shadow-md transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <DotsSpinner className="size-5 text-white" />
              Resetting...
            </span>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </>
  );
}
