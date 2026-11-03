
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  onScroll?: boolean;
};

export default function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.35,
  distance = 16,
  once = true,
  onScroll = false,
}: FadeUpProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : distance;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      {...(onScroll
        ? {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once, amount: 0.15 },
          }
        : {
            animate: { opacity: 1, y: 0 },
          })}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
