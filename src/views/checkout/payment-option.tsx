"use client";

import { cn } from "@/lib";

type PaymentOptionProps = {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
};

export default function PaymentOption({
  value,
  label,
  checked,
  onChange,
}: PaymentOptionProps) {
  return (
    <label
      className={cn(
        "flex h-14 cursor-pointer items-center gap-4 rounded-lg border px-4 transition-[border-color] duration-200",
        checked
          ? "border-brand-on-dark"
          : "border-line hover:border-brand-on-dark",
      )}
    >
      <input
        type="radio"
        name="payment"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="border-line checked:bg-brand-on-dark size-5 shrink-0 appearance-none rounded-full border bg-clip-content p-1"
      />
      <span className="text-field">{label}</span>
    </label>
  );
}
