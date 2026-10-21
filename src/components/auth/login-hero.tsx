import Image from "next/image";
import { FaClock, FaShieldHalved, FaTruck } from "react-icons/fa6";

import loginHero from "@/assets/images/login-hero.png";

export default function LoginHero() {
  return (
    <div className="hidden lg:block">
      <div className="space-y-6 text-center">
        <Image
          src={loginHero}
          alt="Fresh vegetables and fruits shopping cart illustration"
          priority
          sizes="50vw"
          className="h-96 w-full rounded-2xl object-cover shadow-lg"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <FaTruck className="mr-2 text-primary-600" />
              Free Delivery
            </div>
            <div className="flex items-center">
              <FaShieldHalved className="mr-2 text-primary-600" />
              Secure Payment
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-primary-600" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
