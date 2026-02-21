"use client";
import { motion, MotionProps, Variants } from "motion/react";
import React, { forwardRef } from "react";

/* ---------------------------------- */
/* Shared Animation Variants */
/* ---------------------------------- */

export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
    },
  },
};

export const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/* ---------------------------------- */
/* Scroll Reveal Section */
/* ---------------------------------- */

export const MotionSection = forwardRef<
  HTMLDivElement,
  MotionProps & { className?: string }
>(({ children, className, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

MotionSection.displayName = "MotionSection";

/* ---------------------------------- */
/* Stagger Container */
/* ---------------------------------- */

export const MotionContainer = forwardRef<
  HTMLDivElement,
  MotionProps & { className?: string }
>(({ children, className, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

MotionContainer.displayName = "MotionContainer";

/* ---------------------------------- */
/* Child Item */
/* ---------------------------------- */

export const MotionItem = forwardRef<
  HTMLDivElement,
  MotionProps & { className?: string }
>(({ children, className, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

MotionItem.displayName = "MotionItem";