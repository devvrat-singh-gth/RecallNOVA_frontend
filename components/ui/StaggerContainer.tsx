
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  onScroll?: boolean;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.05,
  once = true,
  onScroll = false,
}: StaggerContainerProps) {
  const reduceMotion = useReducedMotion();

  const variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(onScroll
        ? {
            whileInView: "show",
            viewport: { once, amount: 0.12 },
          }
        : {
            animate: "show",
          })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: reduceMotion ? 0 : 10,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
