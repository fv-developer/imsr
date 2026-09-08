"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  text,
  variant = "primary",
  size = "md",
  href,
  className,
  icon,
  ...props
}: ButtonProps) {
  const content = children || text;

  const baseStyles =
    "inline-flex items-center justify-center font-kanit font-medium transition-all duration-300 rounded-full select-none active:scale-95";

  const variants = {
    primary:
      "bg-brand-secondary text-white hover:bg-brand-secondary/90 shadow-sm border border-transparent",
    secondary:
      "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm border border-transparent",
    outline:
      "bg-transparent text-zinc-900 border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-50",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
    link: "bg-transparent text-brand-primary hover:underline p-0 h-auto",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-2.5 gap-2",
    lg: "text-base px-8 py-3.5 gap-2.5",
  };

  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        <span>{content}</span>
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span>{content}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
