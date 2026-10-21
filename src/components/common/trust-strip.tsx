import { FaTruck, FaHeadset } from "react-icons/fa";
import { FaArrowRotateLeft, FaShieldHalved } from "react-icons/fa6";

const items = [
  {
    icon: FaTruck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
  },
  {
    icon: FaArrowRotateLeft,
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: FaShieldHalved,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Contact us anytime",
  },
];

export default function TrustStrip() {
  return (
    <div className="border-y border-green-100 bg-green-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
                <Icon className="size-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
