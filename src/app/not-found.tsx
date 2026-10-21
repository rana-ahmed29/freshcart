// src/app/not-found.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FaAppleWhole,
  FaArrowLeft,
  FaCarrot,
  FaCartShopping,
  FaHouse,
  FaLemon,
  FaSeedling,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

type Floater = {
  Icon: IconType;
  position: string;
  size: string;
  color: string;
  duration: number;
  delay: number;
};

const floaters: Floater[] = [
  {
    Icon: FaAppleWhole,
    position: "top-[10%] left-[5%]",
    size: "text-4xl",
    color: "text-primary-200",
    duration: 6,
    delay: 0,
  },
  {
    Icon: FaCarrot,
    position: "top-[20%] right-[10%]",
    size: "text-3xl",
    color: "text-primary-200",
    duration: 8,
    delay: 1,
  },
  {
    Icon: FaLemon,
    position: "bottom-[25%] left-[8%]",
    size: "text-3xl",
    color: "text-primary-200",
    duration: 7,
    delay: 0.5,
  },
  {
    Icon: FaSeedling,
    position: "bottom-[15%] right-[15%]",
    size: "text-4xl",
    color: "text-primary-200",
    duration: 9,
    delay: 2,
  },
  {
    Icon: FaAppleWhole,
    position: "top-[50%] left-[15%]",
    size: "text-2xl",
    color: "text-primary-100",
    duration: 5,
    delay: 1.5,
  },
  {
    Icon: FaCarrot,
    position: "top-[40%] right-[5%]",
    size: "text-2xl",
    color: "text-primary-100",
    duration: 6,
    delay: 0.8,
  },
];

const destinations = [
  { label: "All Products", href: "/products", primary: true },
  { label: "Categories", href: "/categories" },
  { label: "Today's Deals", href: "/deals" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafbfc] px-4 py-16">
      {/* background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {floaters.map(({ Icon, position, size, color, duration, delay }, i) => (
          <motion.div
            key={i}
            className={`absolute ${position} ${size} ${color}`}
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon />
          </motion.div>
        ))}
        <div className="absolute right-0 top-0 size-125 rounded-full bg-linear-to-bl from-primary-100/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 size-100 rounded-full bg-linear-to-tr from-primary-100/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 h-52 w-64 rounded-[32px] bg-primary-100/50 blur-2xl sm:h-60 sm:w-72" />

            <div className="relative h-52 w-64 sm:h-60 sm:w-72">
              <div className="absolute inset-x-0 top-4 mx-auto flex h-40 w-52 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 sm:h-44 sm:w-60">
                <div className="absolute inset-0 bg-linear-to-br from-primary-50/80 via-transparent to-primary-100/40" />
                <FaCartShopping className="relative text-6xl text-primary-400/80 sm:text-7xl" />
              </div>

              {/* 404 badge */}
              <div className="absolute -right-2 -top-2 sm:right-0 sm:top-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-linear-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/40 sm:size-20">
                    <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                      404
                    </span>
                  </div>
                </div>
              </div>

              {/* sad face */}
              <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4">
                <div className="size-2.5 rounded-full bg-primary-400" />
                <div className="h-4 w-8 rounded-b-full border-b-[3px] border-primary-400" />
                <div className="size-2.5 rounded-full bg-primary-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* text */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Oops! Nothing Here
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-500">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
        </div>

        {/* buttons */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 sm:w-auto"
          >
            <FaHouse className="transition-transform duration-300 group-hover:scale-110" />
            Go to Homepage
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-lg sm:w-auto"
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>

        {/* popular destinations */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-gray-400">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {destinations.map(({ label, href, primary }) => (
              <Link
                key={href}
                href={href}
                className={
                  primary
                    ? "rounded-xl bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100"
                    : "rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
