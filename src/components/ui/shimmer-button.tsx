"use client";

import React from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = "#FF6B00", // SparkLab Orange
  shimmerSize = "0.1em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "#0f0f11", // Dark background
  className = "",
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={`group relative z-0 flex cursor-none items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-8 py-4 text-white font-medium shadow-[0_0_20px_rgba(255,107,0,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] [background:var(--bg)] [border-radius:var(--radius)] ${className}`}
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0 overflow-visible [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-[spin_var(--speed)_linear_infinite] [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      
      <div className="absolute inset-[var(--cut)] z-10 rounded-[calc(var(--radius)-var(--cut))] bg-[var(--bg)]" />
      
      <span className="relative z-20 flex items-center justify-center gap-2 text-lg">
        {children}
      </span>
    </button>
  );
}
