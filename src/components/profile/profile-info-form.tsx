"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { FaFloppyDisk, FaUser } from "react-icons/fa6";
import { toast } from "react-toastify";

import { updateProfileAction } from "@/actions/profile.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/schema/profile.schema";

const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-base shadow-none placeholder:text-gray-400 focus-visible:border-primary-600 focus-visible:ring-0 aria-invalid:border-red-500";
const labelClass = "text-sm font-medium text-gray-800";

export default function ProfileInfoForm({
  name,
  email,
  userId,
  role,
}: {
  name: string;
  email: string;
  userId: string;
  role: string;
}) {
  const router = useRouter();
  const { update } = useSession();

  const { control, handleSubmit } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "all",
    defaultValues: { name, email, phone: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: ProfileFormValues) => updateProfileAction(values),
    onSuccess: async (result, values) => {
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      // refresh the session, so the navbar shows the new name
      await update({ name: values.name, email: values.email });
      router.refresh();
    },
    onError: () => toast.error("Could not reach the server. Try again."),
  });

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <FaUser />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Profile Information</h3>
            <p className="text-sm text-gray-500">
              Update your personal details
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          noValidate
          className="space-y-5"
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="profile-name" className={labelClass}>
                  Full Name
                </FieldLabel>
                <Input
                  id="profile-name"
                  autoComplete="name"
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

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="profile-email" className={labelClass}>
                  Email Address
                </FieldLabel>
                <Input
                  id="profile-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
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

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="profile-phone" className={labelClass}>
                  Phone Number
                </FieldLabel>
                <Input
                  id="profile-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="01xxxxxxxxx"
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

          <button
            type="submit"
            disabled={mutation.isPending}
            aria-busy={mutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? (
              <>
                <DotsSpinner className="size-5 text-white" />
                Saving...
              </>
            ) : (
              <>
                <FaFloppyDisk />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/70 p-6 sm:p-8">
        <h4 className="mb-4 font-bold text-gray-900">Account Information</h4>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">User ID</dt>
            <dd className="truncate font-mono text-xs text-gray-700">
              {userId || "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">Role</dt>
            <dd className="rounded-lg bg-primary-50 px-3 py-1 text-xs font-medium capitalize text-primary-700">
              {role}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
