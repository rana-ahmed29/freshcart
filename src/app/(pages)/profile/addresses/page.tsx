"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa6";

import AddressCard from "@/components/profile/address-card";
import AddressFormDialog from "@/components/profile/address-form-dialog";
import AddressSkeleton from "@/components/profile/address-skeleton";
import EmptyAddresses from "@/components/profile/empty-addresses";
import { useAddresses } from "@/hooks/use-addresses";
import type { ISavedAddress } from "@/types/address";

// undefined = closed, null = adding, address = editing
type DialogState = undefined | null | ISavedAddress;

export default function AddressesPage() {
  const { status } = useSession();
  const { data: addresses = [], isPending, isError, refetch } = useAddresses();
  const [dialog, setDialog] = useState<DialogState>(undefined);

  const header = (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your saved delivery addresses
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDialog(null)}
        className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-colors hover:bg-primary-700"
      >
        <FaPlus />
        Add Address
      </button>
    </div>
  );

  // guests have no account addresses
  if (status === "unauthenticated") {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Please sign in to manage your addresses
        </h2>
        <Link
          href="/login?callbackUrl=/profile/addresses"
          className="mt-6 inline-block rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const loading = status === "loading" || isPending;

  return (
    <div>
      {header}

      {loading ? (
        <AddressSkeleton />
      ) : isError ? (
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-gray-600">We could not load your addresses.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700"
          >
            Try again
          </button>
        </div>
      ) : addresses.length === 0 ? (
        <EmptyAddresses onAdd={() => setDialog(null)} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={setDialog}
            />
          ))}
        </div>
      )}

      {dialog !== undefined && (
        <AddressFormDialog
          key={dialog?._id ?? "new"}
          address={dialog}
          onClose={() => setDialog(undefined)}
        />
      )}
    </div>
  );
}
