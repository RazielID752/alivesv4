import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  Readonly<{
    children: ReactNode;
    icon?: LucideIcon;
    variant?: "primary" | "secondary";
  }>;

const variants = {
  primary:
    "bg-white text-zinc-950 shadow-[0_24px_90px_rgba(0,0,0,0.24)] hover:shadow-[0_30px_110px_rgba(255,255,255,0.16)] focus:ring-white focus:ring-offset-[#010318]",
  secondary:
    "border border-zinc-950/15 bg-transparent text-zinc-950 shadow-none hover:border-zinc-950/35 hover:bg-zinc-950/[0.04] focus:ring-zinc-950 focus:ring-offset-white",
} as const;

const iconVariants = {
  primary: "bg-zinc-950 text-white",
  secondary: "border border-zinc-950/20 bg-transparent text-zinc-950",
} as const;

export function Button({
  children,
  className,
  icon: Icon = ArrowUpRight,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "group inline-flex min-h-14 w-fit items-center gap-3 rounded-full px-4 pr-6 text-sm font-semibold transition duration-300 hover:scale-[1.035] focus:outline-none focus:ring-2 focus:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1",
          iconVariants[variant],
        )}
      >
        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </span>
      {children}
    </a>
  );
}
