import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export default function ProductsHeader({
  title,
  description,
  crumbs,
  image,
  icon,
}: {
  title: string;
  description: string;
  crumbs: Crumb[];
  image?: string; // brand logo or category image
  icon?: ReactNode; // used when there is no image
}) {
  return (
    <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <span className="text-white/40">/</span>
              {crumb.href ? (
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
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="64px"
                className="object-contain p-2"
              />
            ) : (
              icon
            )}
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
