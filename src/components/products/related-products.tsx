"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "swiper/css";

import ProductCard from "@/components/products/product-card";
import type { IProduct } from "@/types/product";

const arrowClass =
  "flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-primary/10 hover:text-primary";

export default function RelatedProducts({
  products,
}: {
  products: IProduct[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  // nothing to show, so hide the whole section
  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto min-w-0 px-4">
        {/* heading + arrows */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700" />
            <h2 className="text-2xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className={arrowClass}
            >
              <FaChevronLeft />
              <span className="sr-only">Previous</span>
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className={arrowClass}
            >
              <FaChevronRight />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        {/* slider */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="w-full"
          // space so the card hover (lift + shadow) is not cut off
          style={{ paddingTop: 8, paddingBottom: 32 }}
        >
          {products.map((product) => (
            <SwiperSlide
              key={product._id}
              // same widths Swiper calculates later, so the server HTML
              // already looks right and nothing jumps
              className="
                mr-5 h-auto w-full!
                min-[480px]:w-[calc((100%-20px)/2)]!
                md:w-[calc((100%-40px)/3)]!
                lg:w-[calc((100%-60px)/4)]!
                xl:w-[calc((100%-80px)/5)]!
              "
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
