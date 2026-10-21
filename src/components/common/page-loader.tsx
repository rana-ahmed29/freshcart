import DotsSpinner from "@/components/common/dots-spinner";

type PageLoaderProps = {
  title?: string;
  subtitle?: string;
};

export default function PageLoader({
  title = "Loading...",
  subtitle = "Just a moment",
}: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <div className="flex size-20 items-center justify-center rounded-full bg-primary-50">
        <DotsSpinner className="size-9 text-primary-600" />
      </div>

      <div>
        <p className="text-lg font-medium text-gray-700">{title}</p>
        <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
