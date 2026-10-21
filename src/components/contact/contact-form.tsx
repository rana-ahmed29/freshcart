
// src/components/contact/contact-form.tsx
"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  FaCheck,
  FaHeadset,
  FaPaperPlane,
} from "react-icons/fa6";
import { toast } from "react-toastify";

import { sendContactMessageAction } from "@/actions/contact.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  contactSubjects,
  type ContactFormValues,
} from "@/lib/schema/contact.schema";

const controlClass =
  "h-[53px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-normal text-gray-900 shadow-none outline-none transition-colors placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/15";

const labelClass = "text-sm font-medium text-gray-800";

export default function ContactForm() {
  const { control, handleSubmit, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: sendContactMessageAction,
  });

  function onSubmit(values: ContactFormValues) {
    mutation.mutate(values, {
      onSuccess: (result) => {
        if (result.success) {
          reset();
        } else {
          toast.error(result.message);
        }
      },
      onError: () => {
        toast.error("Could not reach the server. Try again.");
      },
    });
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
      {/* Form heading */}
      <div className="mb-7 flex items-center gap-3">
        <div className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-primary-50">
          <FaHeadset className="text-xl text-primary-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold leading-tight text-gray-900">
            Send us a Message
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Fill out the form and we&apos;ll get back to you
          </p>
        </div>
      </div>

      {/* Success message */}
      {mutation.data?.success && (
        <div
          role="status"
          className="mb-6 flex items-center gap-4 rounded-xl border border-primary-100 bg-primary-50 p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <FaCheck />
          </span>

          <div>
            <p className="font-semibold text-primary-800">
              Message sent successfully!
            </p>

            <p className="text-sm text-primary-700">
              We&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      )}

      {/* Contact form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-5">
          {/* Name and email */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={!!fieldState.error}
                  className="gap-2"
                >
                  <FieldLabel htmlFor="name" className={labelClass}>
                    Full Name
                  </FieldLabel>

                  <Input
                    id="name"
                    placeholder="Rana Ahmed"
                    autoComplete="name"
                    className={controlClass}
                    {...field}
                  />

                  <FieldError>
                    {fieldState.error?.message}
                  </FieldError>
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={!!fieldState.error}
                  className="gap-2"
                >
                  <FieldLabel htmlFor="email" className={labelClass}>
                    Email Address
                  </FieldLabel>

                  <Input
                    id="email"
                    type="email"
                    placeholder="rana@example.com"
                    autoComplete="email"
                    className={controlClass}
                    {...field}
                  />

                  <FieldError>
                    {fieldState.error?.message}
                  </FieldError>
                </Field>
              )}
            />
          </div>

          {/* Subject */}
          <Controller
            name="subject"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={!!fieldState.error}
                className="gap-2"
              >
                <FieldLabel htmlFor="subject" className={labelClass}>
                  Subject
                </FieldLabel>

                <select
                  id="subject"
                  className={`${controlClass} appearance-auto cursor-pointer`}
                  {...field}
                >
                  <option value="">Select a subject</option>

                  {contactSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>

                <FieldError>
                  {fieldState.error?.message}
                </FieldError>
              </Field>
            )}
          />

          {/* Message */}
          <Controller
            name="message"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={!!fieldState.error}
                className="gap-2"
              >
                <FieldLabel htmlFor="message" className={labelClass}>
                  Message
                </FieldLabel>

                <Textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  className="min-h-39 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-normal text-gray-900 shadow-none outline-none transition-colors placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/15"
                  {...field}
                />

                <FieldError>
                  {fieldState.error?.message}
                </FieldError>
              </Field>
            )}
          />

          {/* Submit button */}
          <div className="pt-1">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-8 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
            >
              {mutation.isPending ? (
                <>
                  <DotsSpinner className="size-5 text-white" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-base" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
