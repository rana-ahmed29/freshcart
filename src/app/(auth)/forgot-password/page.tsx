import type { Metadata } from "next";

import ForgotPasswordFlow from "@/components/auth/forgot-password-flow";
import ForgotPasswordHero from "@/components/auth/forgot-password-hero";

export const metadata: Metadata = {
  title: "Forgot Password | FreshCart",
};

export default function ForgotPasswordPage() {
  return (
    <main className="py-10">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 p-4 lg:grid-cols-2">
        <ForgotPasswordHero />
        <ForgotPasswordFlow />
      </div>
    </main>
  );
}
