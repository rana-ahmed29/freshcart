"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import type { IProduct } from "@/types/product";

export default function ProductGallery({ product }: { product: IProduct }) {
  const images = Array.from(
    new Set([product.imageCover, ...(product.images ?? [])]),
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="sticky top-4 min-w-0 overflow-hidden rounded-xl bg-white p-4 shadow-sm">
      {/* big picture */}
      <Swiper
        loop={images.length > 1}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="aspect-[4/5] w-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* thumbnails */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={3.5}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className="mt-4 w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={image}
              className="!w-[calc((100%-36px)/3.5)] cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="relative aspect-[4/5] w-full overflow-hidden border-[3px] border-transparent bg-white transition-colors [.swiper-slide-thumb-active_&]:border-primary-600"
              >
                <Image
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
