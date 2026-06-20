import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={clsx(
          "w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900",
          "focus:outline-none focus:ring-2 focus:ring-blue-700",
          invalid ? "border-red-500" : "border-slate-300",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
