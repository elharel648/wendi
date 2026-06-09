import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base = cn(
    "group inline-flex h-[60px] min-w-[200px] shrink-0 select-none items-center justify-center gap-3 whitespace-nowrap",
    "rounded-full px-12 text-[15px] font-semibold tracking-tight",
    "transition-all duration-200 ease-out",
  );

  const styles: Record<ButtonVariant, string> = {
    primary: cn(
      "bg-black !text-white",
      "shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)]",
      "hover:bg-black/90 hover:-translate-y-[1px] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)]",
    ),
    secondary: cn(
      "bg-white !text-[#0B1437]",
      "border border-[#0B1437]/12",
      "shadow-[0_2px_8px_-4px_rgba(11,20,55,0.12)]",
      "hover:bg-[#F9FAFB] hover:-translate-y-[1px]",
    ),
  };

  return (
    <a className={cn(base, styles[variant], className)} {...props}>
      {children}
      {withArrow && (
        <span className="text-[18px] transition-transform group-hover:-translate-x-1">
          ←
        </span>
      )}
    </a>
  );
}
