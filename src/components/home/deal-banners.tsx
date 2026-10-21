"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const deals = [
  {
    badgeIcon: "🔥",
    badge: "Deal of the Day",
    title: "Fresh Organic Fruits",
    text: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    buttonLabel: "Shop Now",
    href: "/products",
    gradient: "from-emerald-500 to-emerald-700",
    buttonColor: "text-emerald-600",
  },
  {
    badgeIcon: "✨",
    badge: "New Arrivals",
    title: "Exotic Vegetables",
    text: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    buttonLabel: "Explore Now",
    href: "/products?sort=newest",
    gradient: "from-orange-400 to-rose-500",
    buttonColor: "text-orange-500",
  },
];

export default function DealBanners() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-br p-8 text-white ${deal.gradient}`}
            >
              {/* decorative circles */}
              <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10" />
              <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                  <span>{deal.badgeIcon}</span>
                  <span>{deal.badge}</span>
                </div>

                <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                  {deal.title}
                </h3>
                <p className="mb-4 text-white/80">{deal.text}</p>

                <div className="mb-6 flex items-center gap-4">
                  <div className="text-3xl font-bold">{deal.discount}</div>
                  <div className="text-sm text-white/70">
                    Use code:{" "}
                    <span className="font-bold text-white">{deal.code}</span>
                  </div>
                </div>

                <Link
                  href={deal.href}
                  className={`inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold transition-colors hover:bg-gray-100 ${deal.buttonColor}`}
                >
                  {deal.buttonLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
