"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ForgotCodeStep from "@/components/auth/forgot-code-step";
import ForgotEmailStep from "@/components/auth/forgot-email-step";
import ForgotNewPasswordStep from "@/components/auth/forgot-new-password-step";

type Step = "email" | "code" | "password";

export default function ForgotPasswordFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  return (
    <div className="rounded-2xl bg-white px-5 py-8 shadow-lg sm:px-10 sm:py-10">
      {step === "email" && (
        <ForgotEmailStep
          defaultEmail={email}
          onSent={(value) => {
            setEmail(value);
            setStep("code");
          }}
        />
      )}

      {step === "code" && (
        <ForgotCodeStep
          email={email}
          onVerified={() => setStep("password")}
          onChangeEmail={() => setStep("email")}
        />
      )}

      {step === "password" && (
        <ForgotNewPasswordStep
          email={email}
          onDone={() => router.replace("/login")}
        />
      )}
    </div>
  );
}
