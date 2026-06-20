import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_10px_30px_rgba(13,42,84,0.08)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
