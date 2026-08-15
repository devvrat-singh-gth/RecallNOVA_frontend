"use client";

import { motion } from "framer-motion";

export function StaggerContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="my-5"
      variants={{
        hidden: {
          opacity: 0,
          y: 10,
        },
        show: {
          opacity: 1,
          y: 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
}