"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUpVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

type AnimatedWrapperProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> &
  Omit<HTMLMotionProps<"div">, "children">;

export function AnimatedWrapper({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={{
        ...fadeUpVariants,
        visible: {
          ...fadeUpVariants.visible,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type AnimatedListProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function AnimatedList({ children, className }: AnimatedListProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type AnimatedItemProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function AnimatedItem({ children, className }: AnimatedItemProps) {
  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}
