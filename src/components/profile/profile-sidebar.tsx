"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight, FaGear, FaLocationDot } from "react-icons/fa6";

import { cn } from "@/lib/utils";

const links = [
  { href: "/profile/addresses", label: "My Addresses", icon: FaLocationDot },
  { href: "/profile/settings", label: "Settings", icon: FaGear },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-fit overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <h2 className="border-b border-gray-100 px-6 py-5 font-bold text-gray-900">
        My Account
      </h2>

      <nav className="space-y-1 p-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                active
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50",
              )}
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg text-sm",
                  active
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-500",
                )}
              >
                <Icon />
              </span>
              <span className="flex-1 font-medium">{label}</span>
              <FaChevronRight className="text-xs" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
