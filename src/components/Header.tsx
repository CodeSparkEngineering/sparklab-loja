'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

import AnnouncementBar from './AnnouncementBar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, openCart } = useCart();

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
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId || targetId.length <= 1 || !targetId.startsWith('#')) return;

    const el = document.querySelector(targetId);
    if (!el) return;

    e.preventDefault();
    setMobileMenuOpen(false); // Close menu on click
    const top = el.getBoundingClientRect().top + window.scrollY - 68;
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
        <nav className={`nav__links ${mobileMenuOpen ? 'nav__links--open' : ''}`} aria-label="Navegação principal">
          <Link href="/#catalogo"     onClick={handleSmoothScroll}>Catálogo</Link>
          <Link href="/#como-funciona" onClick={handleSmoothScroll}>Como funciona</Link>
          <Link href="/#orcamento"   onClick={handleSmoothScroll}>Orçamento</Link>
          <Link href="/#comunidade"  onClick={handleSmoothScroll}>Ficheiros STL</Link>
          <Link href="/#faq"         onClick={handleSmoothScroll}>FAQ</Link>
          
          <Link
            href="/#orcamento"
            className="btn btn--sm btn--primary nav__mobile-cta"
            onClick={handleSmoothScroll}
          >
            Fazer orçamento
          </Link>
        </nav>

        {/* Right-side actions */}
        <div className="nav__actions">
        {/* Cart button */}
        <button
          type="button"
          className="nav__cart"
          onClick={openCart}
          aria-label={`Abrir carrinho${count > 0 ? ` (${count} itens)` : ''}`}
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
          Fazer orçamento
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`nav__toggle ${mobileMenuOpen ? 'nav__toggle--open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Alternar menu"
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
