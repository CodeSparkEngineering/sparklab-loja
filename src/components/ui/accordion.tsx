"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Accordion({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full max-w-3xl mx-auto flex flex-col gap-4 ${className}`}>{children}</div>;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 rounded-2xl overflow-hidden shadow-sm transition-colors hover:border-orange-300 dark:hover:border-orange-500/50">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-medium text-stone-800 dark:text-stone-200 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50"
      >
        <span className="pr-8">{question}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-orange-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-stone-600 dark:text-stone-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
