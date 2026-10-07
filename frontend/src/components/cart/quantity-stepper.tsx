"use client";

import { cn, maxQuantity } from "@/lib";

const sizes = {
  sm: { box: "h-8 w-24", step: "w-10" },
  lg: { box: "h-12 w-30", step: "w-11.75" },
};

type QuantityStepperProps = {
  value: number;
  label: string;
  onChange: (update: (current: number) => number) => void;
  min?: number;
  size?: keyof typeof sizes;
};

export default function QuantityStepper({
  value,
  label,
  onChange,
  min = 1,
  size = "sm",
}: QuantityStepperProps) {
  const step =
    "text-button text-muted disabled:text-line h-full transition-[color] duration-200 hover:text-black";

  return (
    <div className={cn("bg-haze flex items-center", sizes[size].box)}>
      <button
        type="button"
        aria-label={`Decrease ${label} quantity`}
        disabled={value <= min}
        onClick={() => onChange((current) => Math.max(current - 1, min))}
        className={cn(step, sizes[size].step)}
      >
        &minus;
      </button>
      <span aria-live="polite" className="text-button flex-1 text-center">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label} quantity`}
        disabled={value >= maxQuantity}
        onClick={() =>
          onChange((current) => Math.min(current + 1, maxQuantity))
        }
        className={cn(step, sizes[size].step)}
      >
        +
      </button>
    </div>
  );
}
