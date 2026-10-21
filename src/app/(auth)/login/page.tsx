
import { Suspense } from "react";

import LoginForm from "@/components/auth/login-form";
import LoginHero from "@/components/auth/login-hero";
import DotsSpinner from "@/components/common/dots-spinner";

export default function LoginPage() {
  return (
    <main className="py-10">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 p-4 lg:grid-cols-2">
        <LoginHero />

        {/* reserves the form's height, so the image does not jump when the form loads */}
        <Suspense
          fallback={
            <div className="flex min-h-96 items-center justify-center lg:min-h-200">
              <DotsSpinner />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}