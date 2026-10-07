"use client";

import { cn } from "@/lib";
import type { HTMLAttributes, HTMLInputTypeAttribute } from "react";

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  attempt: number;
  type?: HTMLInputTypeAttribute;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  error?: string;
  className?: string;
};

export default function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  attempt,
  type = "text",
  inputMode,
  error,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className={cn("text-label", error && "text-danger")}
        >
          {label}
        </label>
        {error && (
          <p
            key={attempt}
            id={`${id}-error`}
            role="alert"
            className="text-label text-danger font-medium"
          >
            {error}
          </p>
        )}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        value={value}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "text-field placeholder:text-muted mt-2.25 h-14 w-full rounded-lg border px-6 transition-[border-color] duration-200",
          error
            ? "border-danger border-2"
            : "border-line hover:border-brand-on-dark",
        )}
      />
    </div>
  );
}
