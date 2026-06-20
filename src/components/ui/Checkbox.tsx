import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          "h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-2 focus:ring-blue-700",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
