'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/LanguageContext';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { fireQuoteConversion } from '@/components/GoogleAdsTag';

const L = {
  pt: {
    title: 'Pedido recebido! 🧡',
    lead: 'Abrimos o WhatsApp com o teu pedido já preenchido. Se a janela não abriu, carrega no botão abaixo — é só enviares a mensagem.',
    nextTitle: 'O que acontece a seguir',
    steps: [
      'Confirmamos os detalhes contigo no WhatsApp (material, tamanho, acabamento).',
      'Enviamos o orçamento com preço e prazo — sem compromisso.',
      'Se aprovares, começamos a produzir na nossa Bambu Lab P1S.',
    ],
    reply: 'Respondemos em até 2 horas úteis.',
    waBtn: 'Abrir o WhatsApp',
    waMsg: 'Olá! Acabei de pedir um orçamento no site.',
    home: 'Voltar ao início',
    catalog: 'Ver catálogo',
  },
  en: {
    title: 'Request received! 🧡',
    lead: "We've opened WhatsApp with your request already filled in. If the window didn't open, tap the button below — just send us the message.",
    nextTitle: 'What happens next',
    steps: [
      'We confirm the details with you on WhatsApp (material, size, finish).',
      'We send the quote with price and timeline — no strings attached.',
      'If you approve it, we start producing on our Bambu Lab P1S.',
    ],
    reply: 'We reply within 2 business hours.',
    waBtn: 'Open WhatsApp',
    waMsg: 'Hello! I just requested a quote on the website.',
    home: 'Back to home',
    catalog: 'View catalog',
  },
} as const;

export default function PedidoRecebidoCard() {
  const { lang } = useLang();
  const t = L[lang];

  // Regista a conversão de lead no Google Ads (no-op se a tag não estiver ativa).
  useEffect(() => {
    fireQuoteConversion();
  }, []);

  return (
    <div className="mx-auto max-w-xl text-center">
      <span className="text-6xl" aria-hidden="true">
        ✅
      </span>
      <h1 className="mt-4 mb-3 text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100">
        {t.title}
      </h1>
      <p className="mb-8 leading-relaxed text-stone-600 dark:text-stone-400">{t.lead}</p>

      <a
        href={getWhatsAppLink(t.waMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1fbd5a]"
      >
        <WhatsAppIcon size={20} />
        {t.waBtn}
      </a>

      <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 px-6 py-5 text-left dark:border-white/10 dark:bg-white/5">
        <h2 className="mb-3 font-bold text-stone-900 dark:text-stone-100">{t.nextTitle}</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-stone-600 dark:text-stone-400">
          {t.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm font-medium text-orange-600 dark:text-orange-400">{t.reply}</p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn--ghost">
          {t.home}
        </Link>
        <Link href="/#catalogo" className="btn btn--primary">
          {t.catalog}
        </Link>
      </div>
    </div>
  );
}
