import { Suspense } from "react";

import DealBanners from "@/components/home/deal-banners";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedProductsSkeleton from "@/components/home/featured-products-skeleton";
import HeroBanner from "@/components/home/hero-banner";
import Newsletter from "@/components/home/newsletter";
import ShopByCategory from "@/components/home/shop-by-category";
import TrustBadges from "@/components/home/trust-badges";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrustBadges />

      
      <ShopByCategory />
     

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <DealBanners />
      <Newsletter />
    </>
  );
}
