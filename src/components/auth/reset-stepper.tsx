import { FaCheck, FaEnvelope, FaKey, FaLock } from "react-icons/fa6";

import { cn } from "@/lib/utils";

const steps = [FaEnvelope, FaKey, FaLock];

export default function ResetStepper({ step }: { step: 1 | 2 | 3 }) {
  return (
    <ol
      className="mx-auto my-8 flex items-center justify-center"
      aria-label={`Step ${step} of 3`}
    >
      {steps.map((Icon, index) => {
        const number = index + 1;
        const done = number < step;
        const current = number === step;

        return (
          <li key={number} className="flex items-center">
            <span
              aria-current={current ? "step" : undefined}
              className={cn(
                "flex size-10 items-center justify-center rounded-full text-sm transition-colors",
                done || current
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-400",
                current && "ring-4 ring-primary-100",
              )}
            >
              {done ? <FaCheck /> : <Icon />}
            </span>

            {number < steps.length && (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-2 h-0.5 w-20 transition-colors sm:w-24",
                  done ? "bg-primary-600" : "bg-gray-200",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
