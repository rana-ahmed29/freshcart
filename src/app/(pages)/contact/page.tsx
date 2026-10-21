import type { Metadata } from "next";
import { FaHeadset } from "react-icons/fa6";

import PageHeader from "@/components/common/page-header";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import HelpCard from "@/components/contact/help-card";

export const metadata: Metadata = { title: "Contact Us | FreshCart" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        icon={<FaHeadset className="size-7" />}
        title="Contact Us"
        description="We'd love to hear from you. Get in touch with our team."
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <ContactInfo />

            <div className="space-y-8 lg:col-span-2">
              <ContactForm />
              <HelpCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
