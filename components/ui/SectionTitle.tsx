import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import { cn } from "@/lib/utils";

type SectionTitleProps = Readonly<{
  overline: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
}>;

export function SectionTitle({
  overline,
  title,
  description,
  align = "left",
  theme = "light",
}: SectionTitleProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <AnimatedWrapper
      className={cn(
        "max-w-4xl",
        isCenter && "mx-auto text-center",
        isDark ? "text-white" : "text-zinc-950",
      )}
    >
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.24em]",
          isDark ? "text-blue-300" : "text-blue-600",
        )}
      >
        {overline}
      </p>
      <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-7xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-8 sm:text-lg",
            isCenter && "mx-auto",
            isDark ? "text-zinc-400" : "text-zinc-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </AnimatedWrapper>
  );
}
