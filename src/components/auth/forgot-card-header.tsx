import ResetStepper from "@/components/auth/reset-stepper";

export default function ForgotCardHeader({
  title,
  subtitle,
  step,
}: {
  title: string;
  subtitle: string;
  step: 1 | 2 | 3;
}) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold">
        <span className="text-primary-600">Fresh</span>
        <span className="text-gray-800">Cart</span>
      </p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-3 text-sm text-gray-700 sm:text-base">{subtitle}</p>
      <ResetStepper step={step} />
    </div>
  );
}
