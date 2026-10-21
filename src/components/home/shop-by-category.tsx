import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import music from "@/assets/images/music.webp";
import mensFashion from "@/assets/images/mens-fashion.webp";
import womensFashion from "@/assets/images/womens-fashion.png";
import supermarket from "@/assets/images/supermarket.webp";
import babyToys from "@/assets/images/baby-toys.webp";
import home from "@/assets/images/home.webp";
import books from "@/assets/images/books.webp";
import beautyHealth from "@/assets/images/beauty-health.webp";
import mobiles from "@/assets/images/mobiles.webp";
import electronics from "@/assets/images/electronics.webp";

const categories = [
  { id: "6439d61c0049ad0b52b90051", name: "Music", image: music },
  { id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", image: mensFashion },
  {
    id: "6439d58a0049ad0b52b9003f",
    name: "Women's Fashion",
    image: womensFashion,
  },
  { id: "6439d41c67d9aa4ca97064d5", name: "SuperMarket", image: supermarket },
  { id: "6439d40367d9aa4ca97064cc", name: "Baby & Toys", image: babyToys },
  { id: "6439d3e067d9aa4ca97064c3", name: "Home", image: home },
  { id: "6439d3c867d9aa4ca97064ba", name: "Books", image: books },
  {
    id: "6439d30b67d9aa4ca97064b1",
    name: "Beauty & Health",
    image: beautyHealth,
  },
  { id: "6439d2f467d9aa4ca97064a8", name: "Mobiles", image: mobiles },
  { id: "6439d2d167d9aa4ca970649f", name: "Electronics", image: electronics },
];

export default function ShopByCategory() {
  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="my-8 flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700" />
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="flex items-center self-end font-medium text-green-600 hover:text-green-700 sm:self-auto"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group rounded-lg bg-white p-4 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full bg-green-100 transition group-hover:bg-green-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
