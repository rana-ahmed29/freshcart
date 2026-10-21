"use server";

import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/schema/contact.schema";

type ActionResult = { success: boolean; message: string };

export async function sendContactMessageAction(
  values: ContactFormValues,
): Promise<ActionResult> {
  // anyone can call a server action, so check the data again here
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Please check the form and try again" };
  }

  try {
    // TODO: send the real email here (Resend, Nodemailer, ...)
    // For now we only wait a little, so you can see the "Sending..." state
    await new Promise((resolve) => setTimeout(resolve, 800));

    return { success: true, message: "Message sent successfully!" };
  } catch {
    return { success: false, message: "Something went wrong, try again" };
  }
}
