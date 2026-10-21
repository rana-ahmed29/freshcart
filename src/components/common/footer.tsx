import Link from "next/link";
import Image from "next/image";
import { CreditCard } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import FreshCartLogo from "@/assets/images/freshcart-logo.49f1b44d.svg";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Electronics", href: "/products?category=electronics" },
  { label: "Men's Fashion", href: "/products?category=mens-fashion" },
  { label: "Women's Fashion", href: "/products?category=womens-fashion" },
];

const accountLinks = [
  { label: "My Account", href: "/profile" },
  { label: "Order History", href: "/profile/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/register" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Help Center", href: "/help" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Track Order", href: "/track-order" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-6 inline-block">
              <div className="inline-block rounded-lg bg-white px-4 py-2">
                <Image
                  src={FreshCartLogo}
                  alt="FreshCart Logo"
                  className="h-8 w-auto"
                />
              </div>
            </Link>

            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

           <div className="mb-6 space-y-3">
  <a
    href="tel:+18001234567"
    className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-green-400"
  >
    <FaPhoneAlt className="size-4 text-green-500" />
    <span>+1 (800) 123-4567</span>
  </a>

  <a
    href="mailto:support@freshcart.com"
    className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-green-400"
  >
    <FaEnvelope className="size-4 text-green-500" />
    <span>support@freshcart.com</span>
  </a>

  <div className="flex items-start gap-3 text-sm text-gray-400">
    <FaMapMarkerAlt className="mt-0.5 size-4 text-green-500" />
    <span>123 Commerce Street, New York, NY 10001</span>
  </div>
</div>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-green-600 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-lg font-semibold">Shop</h3>

            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-lg font-semibold">Account</h3>

            <ul className="space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-lg font-semibold">Support</h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-lg font-semibold">Legal</h3>

            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-green-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 md:text-left">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {["Visa", "Mastercard", "PayPal"].map((method) => (
                <div
                  key={method}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <CreditCard className="size-4" />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
