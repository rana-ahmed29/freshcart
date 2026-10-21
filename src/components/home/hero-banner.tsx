"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import homeSlider from "@/assets/images/home-slider-1.d79601a8.png";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    text: "Get 20% off your first order",
    primary: { label: "Shop Now", href: "/products", color: "text-green-500" },
    secondary: { label: "View Deals", href: "/deals" },
  },
  {
    title: "Premium Quality Guaranteed",
    text: "Fresh from farm to your table",
    primary: { label: "Shop Now", href: "/products", color: "text-blue-500" },
    secondary: { label: "Learn More", href: "/about" },
  },
  {
    title: "Fast & Free Delivery",
    text: "Same day delivery available",
    primary: {
      label: "Order Now",
      href: "/products",
      color: "text-purple-500",
    },
    secondary: { label: "Delivery Info", href: "/delivery" },
  },
];

// fade + slide up, with a delay so items appear one after another
const fadeUp = (isActive: boolean, delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  transition: { duration: 0.6, delay: isActive ? delay : 0 },
});

export default function HeroBanner() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            {({ isActive }) => (
              <div className="relative h-100">
                <Image
                  src={homeSlider}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50" />

                <div className="container relative mx-auto flex h-full flex-col justify-center px-4 text-white">
                  <motion.h2
                    className="mb-4 max-w-96 text-3xl font-bold"
                    {...fadeUp(isActive, 0.1)}
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p {...fadeUp(isActive, 0.3)}>{slide.text}</motion.p>

                  <motion.div
                    className="mt-4 flex gap-2"
                    {...fadeUp(isActive, 0.5)}
                  >
                    <Link
                      href={slide.primary.href}
                      className={`rounded-lg border-2 border-white/50 bg-white px-6 py-2 font-semibold transition-transform hover:scale-105 ${slide.primary.color}`}
                    >
                      {slide.primary.label}
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      className="rounded-lg border-2 border-white/50 px-6 py-2 font-semibold text-white transition-transform hover:scale-105"
                    >
                      {slide.secondary.label}
                    </Link>
                  </motion.div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-green-500 shadow-lg transition hover:scale-110 hover:bg-white md:flex"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-green-500 shadow-lg transition hover:scale-110 hover:bg-white md:flex"
      >
        <ChevronRight />
      </button>
    </section>
  );
}
