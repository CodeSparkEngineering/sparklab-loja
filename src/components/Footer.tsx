'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { useLang } from '@/i18n/LanguageContext';
import TrustBadges from '@/components/TrustBadges';

const L = {
  pt: {
    tag: 'SparkLab — impressão 3D sob encomenda, com acabamento que impressiona.',
    shop: 'Loja',
    catalog: 'Catálogo',
    madeToOrder: 'Sob encomenda',
    stl: 'Ficheiros STL',
    how: 'Como funciona',
    guides: 'Guias de impressão 3D',
    support: 'Atendimento',
    quote: 'Orçamento',
    faq: 'Perguntas frequentes',
    terms: 'Termos e condições',
    social: 'Redes',
    copyright: '© 2026 SparkLab. Feito com cuidado, camada por camada.',
    updated: 'Última atualização: Junho de 2026 · Verificado por SparkLab Maker',
    privacy: 'Privacidade',
    termsShort: 'Termos',
    devBy: 'Site desenvolvido por',
    waMsg: 'Olá! Gostaria de conversar sobre uma impressão 3D.',
  },
  en: {
    tag: 'SparkLab — made-to-order 3D printing, with a finish that impresses.',
    shop: 'Shop',
    catalog: 'Catalog',
    madeToOrder: 'Made to order',
    stl: 'STL files',
    how: 'How it works',
    guides: '3D printing guides',
    support: 'Support',
    quote: 'Get a quote',
    faq: 'FAQ',
    terms: 'Terms & conditions',
    social: 'Social',
    copyright: '© 2026 SparkLab. Made with care, layer by layer.',
    updated: 'Last updated: June 2026 · Verified by SparkLab Maker',
    privacy: 'Privacy',
    termsShort: 'Terms',
    devBy: 'Website developed by',
    waMsg: "Hello! I'd like to talk about a 3D print.",
  },
} as const;

export default function Footer() {
  const { lang } = useLang();
  const t = L[lang];
  const pathname = usePathname();

  // Logo → topo da homepage (a hero). Ver a mesma lógica no Header.
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
  };

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(getWhatsAppLink(t.waMsg), '_blank', 'noopener');
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link href="/" className="logo" onClick={handleLogoClick}>
            <Image
              src="/logo.jpg"
              alt="SparkLab"
              width={32}
              height={32}
              className="logo__mark"
            />
            <span>Spark<em>Lab</em></span>
          </Link>
          <p className="footer__tag">{t.tag}</p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>{t.shop}</h4>
            <ul>
              <li><Link href="/#catalogo">{t.catalog}</Link></li>
              <li><Link href="/#orcamento">{t.madeToOrder}</Link></li>
              <li><Link href="/#comunidade">{t.stl}</Link></li>
              <li><Link href="/#como-funciona">{t.how}</Link></li>
              <li><Link href="/guias">{t.guides}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.support}</h4>
            <ul>
              <li><a href="#" onClick={handleContact}>WhatsApp</a></li>
              <li><Link href="/#orcamento">{t.quote}</Link></li>
              <li><Link href="/#faq">{t.faq}</Link></li>
              <li><Link href="/termos">{t.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.social}</h4>
            <ul className="socials">
              <li><a href="https://wa.me/351916853802" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5 0-.1-.3-.2-.6-.4z" /></svg>
                WhatsApp
              </a></li>
              <li><a href="https://www.instagram.com/sparklabs.3d/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#FEDA75" />
                      <stop offset="0.25" stopColor="#FA7E1E" />
                      <stop offset="0.5" stopColor="#D62976" />
                      <stop offset="0.75" stopColor="#962FBF" />
                      <stop offset="1" stopColor="#4F5BD5" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-grad)" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.4a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
                Instagram
              </a></li>
            </ul>
          </div>
        </div>
      </div>

      <TrustBadges />

      <div className="container footer__base" style={{ flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <small>{t.copyright}</small>
          <small style={{ opacity: 0.7 }}>{t.updated}</small>
          <small><Link href="/privacidade">{t.privacy}</Link> · <Link href="/termos">{t.termsShort}</Link></small>
        </div>
        <small style={{ opacity: 0.7 }}>
          {t.devBy}{' '}
          <a
            href="https://www.codesparkengineering.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--orange)', fontWeight: 600 }}
          >
            CodeSpark Engineering
          </a>
        </small>
      </div>
    </footer>
  );
}
