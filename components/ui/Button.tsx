import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "dark" | "light" | "ghost";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  Readonly<{
    children: ReactNode;
    variant?: ButtonVariant;
  }>;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-zinc-950 shadow-[0_18px_60px_rgba(59,130,246,0.28)] hover:bg-blue-50",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-white/35 hover:bg-white/10",
  dark: "bg-zinc-950 text-white hover:bg-zinc-800",
  light:
    "border border-zinc-950/15 bg-white text-zinc-950 hover:border-zinc-950/40 hover:bg-zinc-50",
  ghost:
    "border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/8",
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
