"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getAccountInfoAction } from "@/actions/profile.actions";
import ChangePasswordForm from "@/components/profile/change-password-form";
import ProfileInfoForm from "@/components/profile/profile-info-form";
import SettingsSkeleton from "@/components/profile/settings-skeleton";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const { data: account, isPending } = useQuery({
    queryKey: ["account-info"],
    queryFn: getAccountInfoAction,
    enabled: status === "authenticated",
  });

  if (status === "unauthenticated") {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Please sign in to manage your account
        </h2>
        <Link
          href="/login?callbackUrl=/profile/settings"
          className="mt-6 inline-block rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white hover:bg-primary-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const loading = status === "loading" || isPending;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and change your password
        </p>
      </div>

      {loading ? (
        <SettingsSkeleton />
      ) : (
        <div className="space-y-6">
          <ProfileInfoForm
            name={session?.user?.name ?? ""}
            email={session?.user?.email ?? ""}
            userId={account?.id ?? ""}
            role={account?.role ?? "user"}
          />
          <ChangePasswordForm />
        </div>
      )}
    </div>
  );
}
