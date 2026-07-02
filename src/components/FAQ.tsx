"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "./ui/accordion";
import { useLang } from "@/i18n/LanguageContext";

const FAQS = {
  pt: [
    {
      q: "Com que materiais e cores trabalham?",
      a: "Trabalhamos exclusivamente com filamentos oficiais da Bambu Lab — PLA, PETG, ABS, ASA, TPU e PC — nas nossas impressoras Bambu Lab P1S. Temos várias cores em stock; cores especiais são confirmadas no orçamento.",
    },
    {
      q: "Posso enviar o meu próprio ficheiro 3D?",
      a: "Sim. Aceitamos STL, OBJ, 3MF e STEP. Se o ficheiro tiver algum problema de malha, avisamos antes de imprimir e, regra geral, corrigimos sem custo.",
    },
    {
      q: "Não tenho o modelo 3D — fazem a modelação?",
      a: "Fazemos, sim. Envia fotos, medidas ou um desenho — orçamos a modelação + impressão em conjunto. O valor da modelação é cobrado uma única vez; reimpressões futuras pagam só o material.",
    },
    {
      q: "Qual o prazo de produção e entrega?",
      a: "As peças do catálogo costumam estar prontas em poucos dias úteis; as personalizadas variam conforme o tamanho e o acabamento. Confirmamos sempre o prazo estimado no orçamento, antes de avançar — sem promessas que não possamos cumprir.",
    },
    {
      q: "Qual o tamanho máximo de peça?",
      a: "Imprimimos peças únicas até 25,6 × 25,6 × 25,6 cm (o volume da Bambu Lab P1S). Peças maiores são feitas em partes modulares com encaixes quase invisíveis — dá para montar projetos grandes sem perder a estética.",
    },
    {
      q: "Como funciona o pagamento?",
      a: "O pagamento é feito de forma segura por cartão (Visa, Mastercard) através da Stripe, no momento da encomenda. Para encomendas de maior volume, podemos combinar 50% no início e 50% antes do envio.",
    },
    {
      q: "Fazem acabamento (lixagem, pintura, montagem)?",
      a: "Sim — oferecemos lixagem, primário, pintura à pistola ou aerógrafo e montagem para peças que vêm em partes. Cada acabamento é orçado à parte.",
    },
    {
      q: "Atendem empresas e grandes volumes?",
      a: "Sim. Temos preços escalonados para lotes a partir de 10 peças e fatura para empresas. Fala connosco pelo WhatsApp a indicar o projeto e o volume previsto.",
    },
  ],
  en: [
    {
      q: "What materials and colors do you work with?",
      a: "We work exclusively with official Bambu Lab filaments — PLA, PETG, ABS, ASA, TPU and PC — on our Bambu Lab P1S printers. We keep several colors in stock; special colors are confirmed in the quote.",
    },
    {
      q: "Can I send my own 3D file?",
      a: "Yes. We accept STL, OBJ, 3MF and STEP. If your file has any mesh issues, we'll let you know before printing and, as a rule, fix them at no extra cost.",
    },
    {
      q: "I don't have a 3D model — do you do the modeling?",
      a: "We do. Send us photos, measurements or a sketch — we quote the modeling + printing together. The modeling fee is charged only once; future reprints only pay for the material.",
    },
    {
      q: "How long do production and delivery take?",
      a: "Catalog pieces are usually ready within a few business days; custom pieces vary with size and finish. We always confirm the estimated timeline in the quote, before moving forward — no promises we can't keep.",
    },
    {
      q: "What's the maximum piece size?",
      a: "We print single pieces up to 25.6 × 25.6 × 25.6 cm (the Bambu Lab P1S build volume). Larger pieces are made in modular parts with nearly invisible joints — you can build big projects without compromising the look.",
    },
    {
      q: "How does payment work?",
      a: "Payment is made securely by card (Visa, Mastercard) through Stripe when you place your order. For larger orders, we can arrange 50% upfront and 50% before shipping.",
    },
    {
      q: "Do you offer finishing (sanding, painting, assembly)?",
      a: "Yes — we offer sanding, priming, spray gun or airbrush painting, and assembly for pieces that come in parts. Each finish is quoted separately.",
    },
    {
      q: "Do you work with businesses and large volumes?",
      a: "Yes. We offer tiered pricing for batches of 10+ pieces and invoicing for businesses. Message us on WhatsApp with your project and expected volume.",
    },
  ],
} as const;

// O JSON-LD é sempre construído a partir da versão PT — o SEO do site é PT.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.pt.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a,
    },
  })),
};

const L = {
  pt: { heading: "Ainda tens dúvidas sobre como trabalhamos?" },
  en: { heading: "Still have questions about how we work?" },
} as const;

export default function FAQ() {
  const { lang } = useLang();
  const t = L[lang];
  const faqs = FAQS[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Keep first open by default

  return (
    <section className="section" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <div className="container">
        <div className="mb-12" style={{ textAlign: 'center', maxWidth: '600px', marginInline: 'auto' }}>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">{t.heading}</h2>
        </div>

        <div className="mt-12 reveal">
          <Accordion>
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
        </div>
      </div>
    </section>
  );
}
