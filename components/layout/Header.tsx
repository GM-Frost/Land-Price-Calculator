"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Header() {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <div className="min-w-0 flex items-center gap-3">
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { rotate: -6, scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/logo/logo.svg"
            alt="Land Price Calculator"
            width={42}
            height={42}
            priority
          />
        </motion.div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Land Price Calc
          </p>
          <p className="truncate text-lg font-semibold text-slate-950 sm:text-xl">
            Land Value Workspace
          </p>
        </div>
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -2, 0] }}
          transition={{
            duration: 2.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/image/Flag_of_Nepal.gif"
            alt="Land Price Calculator"
            width={20}
            height={20}
          />
        </motion.div>
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        {content}
      </header>
    );
  }

  return (
    <motion.header
      className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.header>
  );
}
