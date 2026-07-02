'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLang, type Lang } from '@/i18n/LanguageContext';

import AnnouncementBar from './AnnouncementBar';
import { ThemeToggle } from './ThemeToggle';

const L = {
  pt: {
    catalog: 'Catálogo',
    how: 'Como funciona',
    quote: 'Orçamento',
    stl: 'Ficheiros STL',
    faq: 'FAQ',
    cta: 'Fazer orçamento',
    nav: 'Navegação principal',
    openCart: (n: number) => `Abrir carrinho${n > 0 ? ` (${n} itens)` : ''}`,
    toggleMenu: 'Alternar menu',
    langLabel: 'Idioma',
  },
  en: {
    catalog: 'Catalog',
    how: 'How it works',
    quote: 'Get a quote',
    stl: 'STL files',
    faq: 'FAQ',
    cta: 'Get a quote',
    nav: 'Main navigation',
    openCart: (n: number) => `Open cart${n > 0 ? ` (${n} items)` : ''}`,
    toggleMenu: 'Toggle menu',
    langLabel: 'Language',
  },
} as const;

function LangToggle() {
  const { lang, setLang } = useLang();
  const t = L[lang];
  const opt = (l: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      className={`px-2 py-1 text-xs font-bold rounded-full transition-colors ${
        lang === l
          ? 'bg-orange-500 text-white'
          : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
      }`}
    >
      {label}
    </button>
  );
  return (
    <div
      className="flex items-center gap-0.5 p-1 rounded-full bg-stone-100 dark:bg-stone-800"
      role="group"
      aria-label={t.langLabel}
    >
      {opt('pt', 'PT')}
      {opt('en', 'EN')}
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { lang } = useLang();
  const t = L[lang];

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    // Aceita tanto "#id" como "/#id". Sem hash → deixa o Link navegar normalmente.
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    const id = href.slice(hashIndex + 1);
    if (!id) return;

    // Alvo não está nesta página (ex.: vindo de outra rota) → deixa o Link navegar.
    const el = document.getElementById(id);
    if (!el) return;

    // Faz sempre o scroll (mesmo que o hash já seja este), com offset do header sticky.
    e.preventDefault();
    setMobileMenuOpen(false); // Close menu on click
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <AnnouncementBar />
      <header className="nav" id="nav">
        <div className="container nav__inner">
          <Link href="/#" className="logo" aria-label="SparkLab">
          <Image
            src="/logo.jpg"
            alt="SparkLab"
            width={34}
            height={34}
            className="logo__mark"
            priority
          />
          <span>Spark<em>Lab</em></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav__links ${mobileMenuOpen ? 'nav__links--open' : ''}`} aria-label={t.nav}>
          <Link href="/#catalogo"     onClick={handleSmoothScroll}>{t.catalog}</Link>
          <Link href="/#como-funciona" onClick={handleSmoothScroll}>{t.how}</Link>
          <Link href="/#orcamento"   onClick={handleSmoothScroll}>{t.quote}</Link>
          <Link href="/#comunidade"  onClick={handleSmoothScroll}>{t.stl}</Link>
          <Link href="/#faq"         onClick={handleSmoothScroll}>{t.faq}</Link>

          <Link
            href="/#orcamento"
            className="btn btn--sm btn--primary nav__mobile-cta"
            onClick={handleSmoothScroll}
          >
            {t.cta}
          </Link>
        </nav>

        {/* Right-side actions */}
        <div className="nav__actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LangToggle />
        <ThemeToggle />
        {/* Cart button */}
        <button
          type="button"
          className="nav__cart"
          onClick={openCart}
          aria-label={t.openCart(count)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {count > 0 && <span className="nav__cart-badge">{count}</span>}
        </button>

        <Link
          href="/#orcamento"
          className="btn btn--sm btn--primary nav__desktop-cta"
          onClick={handleSmoothScroll}
        >
          {t.cta}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className={`nav__toggle ${mobileMenuOpen ? 'nav__toggle--open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={t.toggleMenu}
          aria-expanded={mobileMenuOpen}
        >
          <span className="nav__toggle-line"></span>
          <span className="nav__toggle-line"></span>
          <span className="nav__toggle-line"></span>
        </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      <div
        className={`nav__overlay ${mobileMenuOpen ? 'nav__overlay--open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
    </header>
    </>
  );
}
