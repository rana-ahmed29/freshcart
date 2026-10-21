import { FaLocationDot, FaPlus } from "react-icons/fa6";

export default function EmptyAddresses({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100">
        <FaLocationDot className="text-3xl text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">No Addresses Yet</h3>
      <p className="mx-auto mt-2 max-w-sm text-gray-500">
        Add your first delivery address to make checkout faster and easier.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/20 transition-colors hover:bg-primary-700"
      >
        <FaPlus />
        Add Your First Address
      </button>
    </div>
  );
}
