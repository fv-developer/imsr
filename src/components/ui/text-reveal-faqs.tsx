'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HOME_FAQS, FaqItem } from '@/data/faqsData'

export interface FaqCategory {
  name: string;
  items: FaqItem[];
}

export interface FAQsProps {
  items?: FaqItem[];
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  categories?: FaqCategory[];
  id?: string;
}

export default function FAQs({
  items,
  titlePrefix = "Frequently",
  titleHighlight = "Asked Questions",
  subtitle = "Everything you need to know about FV - IMSR Admissions, Programmes, and Career Pathways.",
  categories,
  id = "faqs",
}: FAQsProps) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  // If categories are provided, use the currently selected category items
  // Otherwise, use items prop, or default to HOME_FAQS
  const activeItems: FaqItem[] = categories && categories.length > 0
    ? categories[selectedCategoryIndex]?.items || []
    : (items && items.length > 0 ? items : HOME_FAQS);

  return (
    <section id={id} className="py-16 md:py-24 bg-white text-zinc-900 border-t border-zinc-100 relative z-20 font-sans">
      <div className="mx-auto max-w-7xl px-[15px]">
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          
          {/* LEFT COLUMN: TITLE & CONTEXT */}
          <div className="md:col-span-2 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-zinc-950 tracking-tight leading-tight">
              {titlePrefix} <br />
              <span className="text-[#00bcda] font-serif italic">{titleHighlight}</span>
            </h2>

            <p className="text-zinc-500 mt-5 text-balance text-[16px] sm:text-[17px] font-sans font-light leading-relaxed">
              {subtitle}
            </p>

            {/* CATEGORY TABS (IF MULTIPLE CATEGORIES EXIST) */}
            {categories && categories.length > 1 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategoryIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      selectedCategoryIndex === idx
                        ? "bg-[#00629f] text-white shadow-md shadow-[#00629f]/20"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            <p className="text-zinc-400 mt-8 hidden md:block text-sm font-sans font-light">
              Can’t find what you’re looking for? Reach out to our{' '}
              <Link
                href="/#contact"
                className="text-[#00bcda] font-medium hover:underline"
              >
                admissions desk
              </Link>{' '}
              for assistance.
            </p>
          </div>

          {/* RIGHT COLUMN: ACCORDION ITEMS */}
          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              key={`cat-${selectedCategoryIndex}`}
            >
              {activeItems.map((item, idx) => {
                const itemId = item.id || `faq-item-${idx}`;
                return (
                  <AccordionItem
                    key={itemId}
                    value={itemId}
                    className="border-b border-zinc-200 dark:border-zinc-800"
                  >
                    <AccordionTrigger className="cursor-pointer text-left text-base sm:text-lg font-display font-medium text-zinc-900 hover:text-[#00bcda] hover:no-underline transition-colors py-4">
                      <span className="pr-4">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600">
                      <BlurredStagger text={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          <p className="text-zinc-400 mt-6 md:hidden text-sm">
            Can&apos;t find what you&apos;re looking for? Contact our{' '}
            <Link
              href="/#contact"
              className="text-[#00bcda] font-medium hover:underline"
            >
              counselling team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export const BlurredStagger = ({
  text,
}: {
  text: string;
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.005,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
      y: 2,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-[15px] sm:text-base leading-relaxed text-zinc-600 font-sans font-light break-words whitespace-normal py-2"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};
