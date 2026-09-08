"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
  charClassName?: string;
};

export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  charClassName,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 30, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 20, 0]);

  return (
    <motion.span
      className={cn("inline-block text-[#00629f]", isSpace && "w-4 sm:w-6 lg:w-8", charClassName)}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

interface TextScrollAnimationProps {
  text?: string;
  className?: string;
  charClassName?: string;
}

export const TextScrollAnimation = ({
  text = "Experiential Learning",
  className,
  charClassName,
}: TextScrollAnimationProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <div ref={targetRef} className={cn("w-full text-center py-4", className)}>
      <div
        className="w-full text-center text-[42px] sm:text-[68px] lg:text-[100px] font-[600] uppercase tracking-tighter leading-tight text-zinc-950"
        style={{ perspective: "500px" }}
      >
        {characters.map((char, index) => (
          <CharacterV1
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
            charClassName={charClassName}
          />
        ))}
      </div>
    </div>
  );
};

export default TextScrollAnimation;
