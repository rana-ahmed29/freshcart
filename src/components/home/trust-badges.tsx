"use client";

import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "On orders over 500 EGP",
    iconStyle: "bg-blue-50 text-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "100% secure transactions",
    iconStyle: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    text: "14-day return policy",
    iconStyle: "bg-orange-50 text-orange-500",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    text: "Dedicated support team",
    iconStyle: "bg-purple-50 text-purple-500",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {badges.map(({ icon: Icon, title, text, iconStyle }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconStyle}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
