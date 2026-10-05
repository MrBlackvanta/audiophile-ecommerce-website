"use client";

import { maxQuantity } from "@/lib";

type QuantityStepperProps = {
  value: number;
  label: string;
  onChange: (value: number) => void;
  min?: number;
};

export default function QuantityStepper({
  value,
  label,
  onChange,
  min = 1,
}: QuantityStepperProps) {
  return (
    <div className="bg-haze flex h-8 w-24 items-center">
      <button
        type="button"
        aria-label={`Decrease ${label} quantity`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="text-button text-muted disabled:text-line h-full w-10 transition-[color] duration-200 hover:text-black"
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
        onClick={() => onChange(value + 1)}
        className="text-button text-muted disabled:text-line h-full w-10 transition-[color] duration-200 hover:text-black"
      >
        +
      </button>
    </div>
  );
}
