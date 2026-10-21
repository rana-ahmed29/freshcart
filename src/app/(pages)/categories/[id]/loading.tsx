import DotsSpinner from "@/components/common/dots-spinner";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-24"
    >
      <DotsSpinner />
      <p className="text-lg text-gray-500">Loading subcategories...</p>
    </div>
  );
}
