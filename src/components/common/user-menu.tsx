"use client";

import Link from "next/link";
import {
  FaBoxOpen,
  FaGear,
  FaRegAddressBook,
  FaRegCircleUser,
  FaRegHeart,
  FaRegUser,
  FaRightFromBracket,
} from "react-icons/fa6";
import { signOut } from "next-auth/react";

const menuLinks = [
  { label: "My Profile", href: "/profile", icon: FaRegUser },
  { label: "My Orders", href: "/orders", icon: FaBoxOpen },
  { label: "My Wishlist", href: "/wishlist", icon: FaRegHeart },
  { label: "Addresses", href: "/profile/addresses", icon: FaRegAddressBook },
  { label: "Settings", href: "/profile/settings", icon: FaGear },
];

export default function UserMenu({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <div className="group relative hidden lg:block">
      <button
        type="button"
        title="Account"
        className="relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
      >
        <FaRegCircleUser className="text-xl text-gray-500 transition-colors group-hover:text-primary-600" />
      </button>

      <div className="invisible absolute right-0 top-full z-50 w-64 origin-top-right scale-95 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-xl">
          {/* user info */}
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100">
                <FaRegCircleUser className="text-xl text-primary-600" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {name}
                </p>
                <p className="truncate text-xs text-gray-400">{email}</p>
              </div>
            </div>
          </div>

          {/* links */}
          <div className="py-2">
            {menuLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
              >
                <Icon className="w-4 text-gray-400" />
                {label}
              </Link>
            ))}
          </div>

          {/* sign out */}
          <div className="border-t border-gray-100 py-2">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
            >
              <FaRightFromBracket className="w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
