import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = {
  label: string;
  href?: string; // no href = current page
};

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  // optional: items shown after "Home" (default: just the title)
  crumbs?: Crumb[];
  // optional: change the header colors (default is the green one)
  gradient?: string;
};

export default function PageHeader({
  title,
  description,
  icon,
  crumbs = [{ label: title }],
  gradient = "from-primary-600 via-primary-500 to-primary-400",
}: Props) {
  return (
    <div className={`bg-linear-to-br ${gradient} text-white`}>
      <div className="container mx-auto px-4 py-10 sm:py-14">
        {/* breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>

          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span
                key={`${crumb.label}-${i}`}
                className="flex items-center gap-2"
              >
                <span className="text-white/40">/</span>
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-white">{crumb.label}</span>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-1 text-white/80">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
