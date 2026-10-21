import { FaShieldHalved, FaStar, FaTruckFast } from "react-icons/fa6";

const features = [
  {
    icon: FaStar,
    title: "Premium Quality",
    description: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: FaTruckFast,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: FaShieldHalved,
    title: "Secure Shopping",
    description: "Your data and payments are completely secure",
  },
];

export default function AuthFeatures() {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        Welcome to <span className="text-primary-600">FreshCart</span>
      </h1>
      <p className="mt-2 mb-4 text-xl">
        Join thousands of happy customers who enjoy fresh groceries delivered
        right to their doorstep.
      </p>

      <ul className="my-8 space-y-6">
        {features.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-200 text-xl text-primary-600">
              <Icon />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
