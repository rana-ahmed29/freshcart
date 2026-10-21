export default function DotsSpinner({
  className = "size-12",
}: {
  className?: string;
}) {
  const dots = 8;

  return (
    <svg
      viewBox="0 0 48 48"
      className={`animate-spin text-primary-600 ${className}`}
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: dots }).map((_, i) => {
        const angle = (i * 2 * Math.PI) / dots;
        const x = (24 + 18 * Math.cos(angle)).toFixed(2);
        const y = (24 + 18 * Math.sin(angle)).toFixed(2);
        const r = (4 - i * 0.3).toFixed(2); // big dot first, small dot last

        return <circle key={i} cx={x} cy={y} r={r} fill="currentColor" />;
      })}
    </svg>
  );
}
