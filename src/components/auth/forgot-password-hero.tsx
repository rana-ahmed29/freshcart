import { FaEnvelope, FaLock, FaShieldHalved } from "react-icons/fa6";

const features = [
  { icon: FaEnvelope, label: "Email Verification" },
  { icon: FaShieldHalved, label: "Secure Reset" },
  { icon: FaLock, label: "Encrypted" },
];

export default function ForgotPasswordHero() {
  return (
    <div className="hidden lg:block">
      <div className="space-y-6 text-center">
        <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary-50 to-white shadow-lg">
          <span className="absolute left-10 top-12 size-28 rounded-full bg-primary-100/60" />
          <span className="absolute right-24 top-20 size-20 rounded-full bg-primary-100/60" />
          <span className="absolute -bottom-8 right-14 size-48 rounded-full bg-primary-100/50" />

          <div className="relative flex items-center gap-2">
            <span className="-rotate-12 rounded-2xl bg-white p-4 text-primary-600 shadow-lg">
              <FaEnvelope className="text-xl" />
            </span>
            <span className="rounded-3xl bg-white p-5 shadow-xl">
              <span className="flex size-24 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                <FaLock className="text-4xl" />
              </span>
            </span>
            <span className="rotate-12 rounded-2xl bg-white p-4 text-primary-600 shadow-lg">
              <FaShieldHalved className="text-xl" />
            </span>
          </div>

          <div className="absolute bottom-16 flex gap-3" aria-hidden="true">
            <span className="size-3 rounded-full bg-primary-400" />
            <span className="size-3 rounded-full bg-primary-500" />
            <span className="size-3 rounded-full bg-primary-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-lg text-gray-600">
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you
            get back into your account in no time.
          </p>

          <ul className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center">
                <Icon className="mr-2 text-primary-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
