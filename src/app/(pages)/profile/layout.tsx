import { FaUser } from "react-icons/fa6";

import PageHeader from "@/components/common/page-header";
import ProfileSidebar from "@/components/profile/profile-sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader
        title="My Account"
        description="Manage your addresses and account settings"
        icon={<FaUser className="text-2xl" />}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
          <ProfileSidebar />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
