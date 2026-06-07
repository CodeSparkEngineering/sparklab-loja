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
    <div className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/20">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-medium text-foreground transition-colors hover:bg-white/5"
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
            <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
