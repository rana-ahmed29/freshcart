import type { IconType } from "react-icons";
import {
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaTwitter,
} from "react-icons/fa6";

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

// one card: green icon box on the left, content on the right
function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: IconType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
        <Icon />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <InfoCard icon={FaPhone} title="Phone">
        <p className="mt-1 text-sm text-gray-500">Mon-Fri from 8am to 6pm</p>
        <a
          href="tel:+18001234567"
          className="mt-2 inline-block font-medium text-primary-600 hover:text-primary-700"
        >
          +1 (800) 123-4567
        </a>
      </InfoCard>

      <InfoCard icon={FaEnvelope} title="Email">
        <p className="mt-1 text-sm text-gray-500">
          We&apos;ll respond within 24 hours
        </p>
        <a
          href="mailto:support@freshcart.com"
          className="mt-2 inline-block font-medium text-primary-600 hover:text-primary-700"
        >
          support@freshcart.com
        </a>
      </InfoCard>

      <InfoCard icon={FaLocationDot} title="Office">
        <div className="mt-1 space-y-0.5 text-sm text-gray-500">
          <p>123 Commerce Street</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
        </div>
      </InfoCard>

      <InfoCard icon={FaClock} title="Business Hours">
        <div className="mt-1 space-y-0.5 text-sm text-gray-500">
          <p>Monday - Friday: 8am - 6pm</p>
          <p>Saturday: 9am - 4pm</p>
          <p>Sunday: Closed</p>
        </div>
      </InfoCard>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-primary-600 hover:text-white"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
