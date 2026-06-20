import { type ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export function FormField({ id, label, error, required, children }: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function getAriaDescribedBy(id: string, hasError: boolean) {
  return hasError ? `${id}-error` : undefined;
}
