"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import { toast } from "react-toastify";

import { changePasswordAction } from "@/actions/profile.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  passwordSchema,
  type PasswordFormValues,
} from "@/lib/schema/profile.schema";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-white pl-4 pr-12 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500";
const labelClass = "text-sm font-medium text-gray-800";

const fields: {
  name: FieldPath<PasswordFormValues>;
  label: string;
  placeholder: string;
  hint?: string;
  autoComplete: string;
}[] = [
  {
    name: "currentPassword",
    label: "Current Password",
    placeholder: "Enter your current password",
    autoComplete: "current-password",
  },
  {
    name: "password",
    label: "New Password",
    placeholder: "Enter your new password",
    hint: "Must be at least 6 characters",
    autoComplete: "new-password",
  },
  {
    name: "rePassword",
    label: "Confirm New Password",
    placeholder: "Confirm your new password",
    autoComplete: "new-password",
  },
];

export default function ChangePasswordForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const { control, handleSubmit } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "all",
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: PasswordFormValues) => changePasswordAction(values),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Password changed. Please sign in again.");

      // the old token no longer works: sign out, then load /login

      
      await signOut({ redirect: false });
      queryClient.clear();
      router.replace("/login");
      router.refresh();
    },
    onError: () => toast.error("Could not reach the server. Try again."),
  });

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <FaLock />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-500">Update your account password</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
        noValidate
        className="space-y-5"
      >
        {fields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={item.name} className={labelClass}>
                  {item.label}
                </FieldLabel>
                <div className="relative">
                  <Input
                    id={item.name}
                    type={visible[item.name] ? "text" : "password"}
                    autoComplete={item.autoComplete}
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
                {item.hint && !fieldState.invalid && (
                  <p className="text-xs text-gray-400">{item.hint}</p>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}

        <button
          type="submit"
          disabled={mutation.isPending}
          aria-busy={mutation.isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-600/20 transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? (
            <>
              <DotsSpinner className="size-5 text-white" />
              Changing...
            </>
          ) : (
            <>
              <FaLock />
              Change Password
            </>
          )}
        </button>
      </form>
    </section>
  );
}
