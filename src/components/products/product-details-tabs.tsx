"use client";

import { useState } from "react";
import {
  FaBox,
  FaCheck,
  FaRegStar,
  FaRegStarHalfStroke,
  FaRotateLeft,
  FaShieldHalved,
  FaStar,
  FaTruck,
} from "react-icons/fa6";
import type { IProduct } from "@/types/product";

type TabKey = "details" | "reviews" | "shipping";

const features = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

const ratingBreakdown = [
  { stars: 5, percent: 25 },
  { stars: 4, percent: 60 },
  { stars: 3, percent: 25 },
  { stars: 2, percent: 5 },
  { stars: 1, percent: 5 },
];

const shippingInfo = [
  "Free shipping on orders over 500 EGP",
  "Standard delivery: 3-5 business days",
  "Express delivery available (1-2 business days)",
  "Track your order in real-time",
];

const returnsInfo = [
  "30-day hassle-free returns",
  "Full refund or exchange available",
  "Free return shipping on defective items",
  "Easy online return process",
];

// the API sometimes sends a huge broken number, so we protect the page
function formatSold(sold: number) {
  return Number.isFinite(sold) && sold < 1_000_000
    ? `${sold}+ sold`
    : "1M+ sold";
}

// full star, half star or empty star (yellow outline)
function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex justify-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <FaStar key={i} />;
        if (i === full && half) return <FaRegStarHalfStroke key={i} />;
        return <FaRegStar key={i} />;
      })}
    </div>
  );
}

export default function ProductDetailsTabs({ product }: { product: IProduct }) {
  const [activeTab, setActiveTab] = useState<TabKey>("details");

  const subcategoryList = product.subcategory ?? [];
  const subcategory = subcategoryList.length > 0 ? subcategoryList[0] : null;

  const tabClass = (tab: TabKey) =>
    `flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
      activeTab === tab
        ? "border-b-2 border-primary bg-primary/5 text-primary"
        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
    }`;

  return (
    <section id="product-details-tabs" className="py-8">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {/* tab bar */}
          <div className="border-b border-gray-200">
            <div className="scrollbar-hide flex overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={tabClass("details")}
              >
                <FaBox className="text-sm" />
                Product Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={tabClass("reviews")}
              >
                <FaStar className="text-sm" />
                Reviews ({product.ratingsQuantity})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={tabClass("shipping")}
              >
                <FaTruck className="text-sm" />
                Shipping &amp; Returns
              </button>
            </div>
          </div>

          {/* Product Details */}
          {activeTab === "details" && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    About this Product
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 font-medium text-gray-900">
                      Product Information
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Category</span>
                        <span className="font-medium text-gray-900">
                          {product.category.name}
                        </span>
                      </li>
                      {subcategory && (
                        <li className="flex justify-between text-sm">
                          <span className="text-gray-500">Subcategory</span>
                          <span className="font-medium text-gray-900">
                            {subcategory.name}
                          </span>
                        </li>
                      )}
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Brand</span>
                        <span className="font-medium text-gray-900">
                          {product.brand.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Items Sold</span>
                        <span className="font-medium text-gray-900">
                          {formatSold(product.sold)}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 font-medium text-gray-900">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <FaCheck className="mr-2 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                  {/* average rating */}
                  <div className="text-center">
                    <div className="mb-2 text-5xl font-bold text-gray-900">
                      {product.ratingsAverage}
                    </div>
                    <Stars rating={product.ratingsAverage} />
                    <p className="mt-2 text-sm text-gray-500">
                      Based on {product.ratingsQuantity} reviews
                    </p>
                  </div>

                  {/* bars */}
                  <div className="w-full flex-1">
                    {ratingBreakdown.map(({ stars, percent }) => (
                      <div key={stars} className="mb-2 flex items-center gap-3">
                        <span className="w-12 shrink-0 text-sm text-gray-600">
                          {stars} star
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-yellow-400 transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-sm text-gray-500">
                          {percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* empty reviews message */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="py-8 text-center">
                    <FaStar className="mx-auto mb-3 block text-4xl text-gray-300" />
                    <p className="text-gray-500">
                      Customer reviews will be displayed here.
                    </p>
                    <button
                      type="button"
                      className="mt-4 font-medium text-primary hover:text-primary/80"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping & Returns */}
          {activeTab === "shipping" && (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-primary/5 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                      <FaTruck />
                    </span>
                    <h4 className="font-semibold text-gray-900">
                      Shipping Information
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {shippingInfo.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <FaCheck className="shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-primary/5 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                      <FaRotateLeft />
                    </span>
                    <h4 className="font-semibold text-gray-900">
                      Returns &amp; Refunds
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {returnsInfo.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <FaCheck className="shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4 rounded-lg bg-gray-50 p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  <FaShieldHalved />
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    Buyer Protection Guarantee
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get a full refund if your order doesn&apos;t arrive or
                    isn&apos;t as described. We ensure your shopping experience
                    is safe and secure.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
