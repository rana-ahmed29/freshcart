import ProductBreadcrumb from "@/components/products/product-breadcrumb";
import ProductGallery from "@/components/products/product-gallery";
import ProductInfo from "@/components/products/product-info";
import ProductDetailsTabs from "@/components/products/product-details-tabs";
import RelatedProducts from "@/components/products/related-products";
import {
  getRelatedProducts,
  getSpecificProduct,
} from "@/services/products.services";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getSpecificProduct(productId);
  const relatedProducts = await getRelatedProducts(
    product.category._id,
    product._id,
  );

  return (
    <>
      <ProductBreadcrumb product={product} />

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-1/4">
              <ProductGallery product={product} />
            </div>

            <div className="lg:w-3/4">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsTabs product={product} />
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
