"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { useLang } from "@/i18n/LanguageContext";

type QA = { q: string; a: string };

const L = {
  pt: { heading: "Perguntas frequentes" },
  en: { heading: "Frequently asked questions" },
} as const;

/**
 * Bloco de FAQ no fim de um guia + JSON-LD FAQPage.
 * Uso no page.mdx (depois dos <GuiaLang> e antes do <GuiaRodape>):
 *   <GuiaFAQ pt={[{ q: "...", a: "..." }]} en={[{ q: "...", a: "..." }]} />
 *
 * O JSON-LD é sempre construído a partir do PT — o SEO do site é PT (igual à
 * FAQ da homepage). A parte visível troca PT/EN com o resto do site.
 */
export function GuiaFAQ({ pt, en }: { pt: QA[]; en: QA[] }) {
  const { lang } = useLang();
  const t = L[lang];
  const faqs = lang === "en" && en.length ? en : pt;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pt.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="mt-14" aria-label={t.heading}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">{t.heading}</h2>
      <Accordion className="max-w-none">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </Accordion>
    </section>
  );
}
