// "use client";

// import { useState, useTransition } from "react";
// import Link from "next/link";
// import { useQueryClient } from "@tanstack/react-query";
// import {
//   FaArrowRotateLeft,
//   FaBolt,
//   FaCartShopping,
//   FaMinus,
//   FaPlus,
//   FaRegHeart,
//   FaRegStar,
//   FaRegStarHalfStroke,
//   FaShareNodes,
//   FaShieldHalved,
//   FaStar,
//   FaTruckFast,
// } from "react-icons/fa6";
// import { toast } from "react-toastify";

// import { addToCartAction } from "@/actions/cart.actions";
// import DotsSpinner from "@/components/common/dots-spinner";
// import { cartKey } from "@/hooks/use-cart";
// import type { IProduct } from "@/types/product";

// function Stars({ rating }: { rating: number }) {
//   const full = Math.floor(rating);
//   const half = rating - full >= 0.5;

//   return (
//     <div className="flex gap-0.5 text-yellow-400">
//       {Array.from({ length: 5 }, (_, i) => {
//         if (i < full) return <FaStar key={i} />;
//         if (i === full && half) return <FaRegStarHalfStroke key={i} />;
//         return <FaRegStar key={i} />;
//       })}
//     </div>
//   );
// }

// const features = [
//   { icon: FaTruckFast, title: "Free Delivery", text: "Orders over 500 EGP" },
//   { icon: FaArrowRotateLeft, title: "30 Days Return", text: "Money back" },
//   { icon: FaShieldHalved, title: "Secure Payment", text: "100% Protected" },
// ];

// export default function ProductInfo({ product }: { product: IProduct }) {
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, startTransition] = useTransition();
//   const queryClient = useQueryClient();

//   const inStock = product.quantity > 0;
//   const max = Math.max(product.quantity, 1);

//   const hasDiscount =
//     product.priceAfterDiscount !== undefined &&
//     product.priceAfterDiscount < product.price;
//   const price = hasDiscount ? product.priceAfterDiscount! : product.price;
//   const percent = hasDiscount
//     ? Math.round((1 - price / product.price) * 100)
//     : 0;

//   function updateQuantity(value: number) {
//     if (Number.isNaN(value)) return;
//     setQuantity(Math.min(Math.max(value, 1), max));
//   }

//   function handleAddToCart() {
//     if (isAdding || !inStock) return;

//     startTransition(async () => {
//       try {
//         // the action adds one unit per call, so repeat it for the quantity
//         for (let i = 0; i < quantity; i++) {
//           const result = await addToCartAction(product._id);

//           if (!result.success) {
//             toast.error(result.message);
//             // some units may already be added: refresh the badge anyway
//             await queryClient.invalidateQueries({ queryKey: cartKey });
//             return;
//           }
//         }

//         toast.success(
//           quantity === 1
//             ? "Product added to cart"
//             : `${quantity} items added to cart`,
//         );
//         // tell TanStack the cart is old, so the navbar badge reloads
//         await queryClient.invalidateQueries({ queryKey: cartKey });
//       } catch {
//         toast.error("Could not reach the server. Try again.");
//       }
//     });
//   }

//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm">
//       {/* category + brand tags */}
//       <div className="mb-4 flex flex-wrap gap-2">
//         <Link
//           href={`/categories/${product.category._id}`}
//           className="rounded-full bg-primary-50 px-3 py-1.5 text-xs text-primary-700 transition hover:bg-primary-100"
//         >
//           {product.category.name}
//         </Link>
//         <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
//           {product.brand.name}
//         </span>
//       </div>

//       {/* title */}
//       <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
//         {product.title}
//       </h1>

//       {/* rating */}
//       <div className="mb-4 flex items-center gap-3">
//         <Stars rating={product.ratingsAverage} />
//         <span className="text-sm text-gray-600">
//           {product.ratingsAverage} ({product.ratingsQuantity} reviews)
//         </span>
//       </div>

//       {/* price */}
//       <div className="mb-6 flex flex-wrap items-center gap-3">
//         <span className="text-3xl font-bold text-gray-900">{price} EGP</span>
//         {hasDiscount && (
//           <>
//             <span className="text-lg text-gray-500 line-through">
//               {product.price} EGP
//             </span>
//             <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
//               Save {percent}%
//             </span>
//           </>
//         )}
//       </div>

//       {/* stock */}
//       <div className="mb-6 flex items-center gap-2">
//         <span
//           className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
//             inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
//           }`}
//         >
//           <span
//             className={`h-2 w-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
//           />
//           {inStock ? "In Stock" : "Out of Stock"}
//         </span>
//       </div>

//       {/* description */}
//       <div className="mb-6 border-t border-gray-100 pt-5">
//         <p className="leading-relaxed text-gray-600">{product.description}</p>
//       </div>

//       {/* quantity */}
//       <div className="mb-6">
//         <label className="mb-2 block text-sm font-medium text-gray-700">
//           Quantity
//         </label>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-200">
//             <button
//               type="button"
//               onClick={() => updateQuantity(quantity - 1)}
//               disabled={quantity <= 1 || isAdding}
//               aria-label="Decrease quantity"
//               className="px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-primary-600 disabled:opacity-50"
//             >
//               <FaMinus />
//             </button>
//             <input
//               type="number"
//               min={1}
//               max={max}
//               value={quantity}
//               disabled={!inStock || isAdding}
//               onChange={(e) => updateQuantity(Number(e.target.value))}
//               className="w-16 border-0 text-center text-lg font-medium focus:outline-none focus:ring-0"
//             />
//             <button
//               type="button"
//               onClick={() => updateQuantity(quantity + 1)}
//               disabled={quantity >= max || isAdding}
//               aria-label="Increase quantity"
//               className="px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-primary-600 disabled:opacity-50"
//             >
//               <FaPlus />
//             </button>
//           </div>
//           <span className="text-sm text-gray-500">
//             {product.quantity} available
//           </span>
//         </div>
//       </div>

//       {/* total */}
//       <div className="mb-6 rounded-lg bg-gray-50 p-4">
//         <div className="flex items-center justify-between">
//           <span className="text-gray-600">Total Price:</span>
//           <span className="text-2xl font-bold text-primary-600">
//             {(price * quantity).toFixed(2)} EGP
//           </span>
//         </div>
//       </div>

//       {/* add to cart + buy now */}
//       <div className="mb-6 flex flex-col gap-3 sm:flex-row">
//         <button
//           type="button"
//           onClick={handleAddToCart}
//           disabled={!inStock || isAdding}
//           aria-busy={isAdding}
//           className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50"
//         >
//           {isAdding ? (
//             <>
//               <DotsSpinner className="size-5 text-white" />
//               Adding...
//             </>
//           ) : (
//             <>
//               <FaCartShopping />
//               Add to Cart
//             </>
//           )}
//         </button>
//         <button
//           type="button"
//           disabled={!inStock}
//           className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50"
//         >
//           <FaBolt />
//           Buy Now
//         </button>
//       </div>

//       {/* wishlist + share */}
//       <div className="mb-6 flex gap-3">
//         <button
//           type="button"
//           className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 font-medium text-gray-700 transition hover:border-primary-300 hover:text-primary-600"
//         >
//           <FaRegHeart />
//           Add to Wishlist
//         </button>
//         <button
//           type="button"
//           aria-label="Share"
//           className="rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition hover:border-primary-300 hover:text-primary-600"
//         >
//           <FaShareNodes />
//         </button>
//       </div>

//       {/* features */}
//       <div className="border-t border-gray-100 pt-6">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//           {features.map(({ icon: Icon, title, text }) => (
//             <div key={title} className="flex items-center gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
//                 <Icon />
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-900">{title}</h4>
//                 <p className="text-xs text-gray-500">{text}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaArrowRotateLeft,
  FaBolt,
  FaCartShopping,
  FaMinus,
  FaPlus,
  FaRegStar,
  FaRegStarHalfStroke,
  FaShareNodes,
  FaShieldHalved,
  FaStar,
  FaTruckFast,
} from "react-icons/fa6";
import { toast } from "react-toastify";

import { addToCartAction } from "@/actions/cart.actions";
import DotsSpinner from "@/components/common/dots-spinner";
import WishlistButton from "@/components/wishlist/wishlist-button";
import { cartKey } from "@/hooks/use-cart";
import type { IProduct } from "@/types/product";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <FaStar key={i} />;
        if (i === full && half) {
          return <FaRegStarHalfStroke key={i} />;
        }
        return <FaRegStar key={i} />;
      })}
    </div>
  );
}

const features = [
  {
    icon: FaTruckFast,
    title: "Free Delivery",
    text: "Orders over 500 EGP",
  },
  {
    icon: FaArrowRotateLeft,
    title: "30 Days Return",
    text: "Money back",
  },
  {
    icon: FaShieldHalved,
    title: "Secure Payment",
    text: "100% Protected",
  },
];

export default function ProductInfo({
  product,
}: {
  product: IProduct;
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const inStock = product.quantity > 0;
  const max = Math.max(product.quantity, 1);

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;

  const price = hasDiscount
    ? product.priceAfterDiscount!
    : product.price;

  const percent = hasDiscount
    ? Math.round((1 - price / product.price) * 100)
    : 0;

  function updateQuantity(value: number) {
    if (Number.isNaN(value)) return;

    setQuantity(Math.min(Math.max(value, 1), max));
  }

  function handleAddToCart() {
    if (isAdding || !inStock) return;

    startTransition(async () => {
      try {
        for (let i = 0; i < quantity; i++) {
          const result = await addToCartAction(product._id);

          if (!result.success) {
            toast.error(result.message);
            await queryClient.invalidateQueries({
              queryKey: cartKey,
            });
            return;
          }
        }

        toast.success(
          quantity === 1
            ? "Product added to cart"
            : `${quantity} items added to cart`,
        );

        await queryClient.invalidateQueries({
          queryKey: cartKey,
        });
      } catch {
        toast.error("Could not reach the server. Try again.");
      }
    });
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {/* Category and brand */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={`/categories/${product.category._id}`}
          className="rounded-full bg-primary-50 px-3 py-1.5 text-xs text-primary-700 transition hover:bg-primary-100"
        >
          {product.category.name}
        </Link>

        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
          {product.brand.name}
        </span>
      </div>

      {/* Product title */}
      <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="mb-4 flex items-center gap-3">
        <Stars rating={product.ratingsAverage} />

        <span className="text-sm text-gray-600">
          {product.ratingsAverage} ({product.ratingsQuantity} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">
          {price} EGP
        </span>

        {hasDiscount && (
          <>
            <span className="text-lg text-gray-500 line-through">
              {product.price} EGP
            </span>

            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
              Save {percent}%
            </span>
          </>
        )}
      </div>

      {/* Stock status */}
      <div className="mb-6 flex items-center gap-2">
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
            inStock
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              inStock ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6 border-t border-gray-100 pt-5">
        <p className="leading-relaxed text-gray-600">
          {product.description}
        </p>
      </div>

      {/* Quantity selector */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Quantity
        </label>

        <div className="flex items-center gap-4">
          <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-200">
            <button
              type="button"
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1 || isAdding}
              aria-label="Decrease quantity"
              className="px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-primary-600 disabled:opacity-50"
            >
              <FaMinus />
            </button>

            <input
              type="number"
              min={1}
              max={max}
              value={quantity}
              disabled={!inStock || isAdding}
              onChange={(e) =>
                updateQuantity(Number(e.target.value))
              }
              className="w-16 border-0 text-center text-lg font-medium focus:outline-none focus:ring-0"
            />

            <button
              type="button"
              onClick={() => updateQuantity(quantity + 1)}
              disabled={quantity >= max || isAdding}
              aria-label="Increase quantity"
              className="px-4 py-3 text-gray-600 transition hover:bg-gray-100 hover:text-primary-600 disabled:opacity-50"
            >
              <FaPlus />
            </button>
          </div>

          <span className="text-sm text-gray-500">
            {product.quantity} available
          </span>
        </div>
      </div>

      {/* Total price */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Price:</span>

          <span className="text-2xl font-bold text-primary-600">
            {(price * quantity).toFixed(2)} EGP
          </span>
        </div>
      </div>

      {/* Add to cart and buy now */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock || isAdding}
          aria-busy={isAdding}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 active:scale-[0.98] disabled:opacity-50"
        >
          {isAdding ? (
            <>
              <DotsSpinner className="size-5 text-white" />
              Adding...
            </>
          ) : (
            <>
              <FaCartShopping />
              Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          disabled={!inStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50"
        >
          <FaBolt />
          Buy Now
        </button>
      </div>

      {/* Wishlist and share */}
      <div className="mb-6 flex gap-3">
        <WishlistButton
          productId={product._id}
          variant="full"
        />

        <button
          type="button"
          aria-label="Share"
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          <FaShareNodes />
        </button>
      </div>

      {/* Features */}
      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Icon />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {title}
                </h4>

                <p className="text-xs text-gray-500">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

