import React from "react";
import { motion } from "framer-motion";

/**
 * SVG-drawn X/O mark with neon glow. Uses stroke draw animation.
 */
export function Mark({ value, size = 84 }) {
  if (!value) return null;
  const isX = value === "X";
  const stroke = isX ? "#F472B6" : "#22D3EE";
  const glowClass = isX ? "glow-x" : "glow-o";

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.svg
      className={glowClass}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      aria-label={value}
    >
      {isX ? (
        <g
          stroke={stroke}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        >
          <motion.line
            x1="20"
            y1="20"
            x2="80"
            y2="80"
            variants={draw}
            initial="hidden"
            animate="visible"
          />
          <motion.line
            x1="80"
            y1="20"
            x2="20"
            y2="80"
            variants={draw}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
          />
        </g>
      ) : (
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          stroke={stroke}
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      )}
    </motion.svg>
  );
}
