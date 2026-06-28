'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getWhatsAppLink } from '@/utils/whatsapp';

export default function Footer() {
  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(getWhatsAppLink('Olá! Gostaria de conversar sobre uma impressão 3D.'), '_blank', 'noopener');
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link href="/" className="logo">
            <Image
              src="/logo.jpg"
              alt="SparkLab"
              width={32}
              height={32}
              className="logo__mark"
            />
            <span>Spark<em>Lab</em></span>
          </Link>
          <p className="footer__tag">SparkLab — impressão 3D sob encomenda, com acabamento que impressiona.</p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Loja</h4>
            <ul>
              <li><Link href="/#catalogo">Catálogo</Link></li>
              <li><Link href="/#orcamento">Sob encomenda</Link></li>
              <li><Link href="/#comunidade">Ficheiros STL</Link></li>
              <li><Link href="/#como-funciona">Como funciona</Link></li>
            </ul>
          </div>
          <div>
            <h4>Atendimento</h4>
            <ul>
              <li><a href="#" onClick={handleContact}>WhatsApp</a></li>
              <li><Link href="/#orcamento">Orçamento</Link></li>
              <li><Link href="/#faq">Perguntas frequentes</Link></li>
              <li><Link href="/termos">Termos e condições</Link></li>
            </ul>
          </div>
          <div>
            <h4>Redes</h4>
            <ul className="socials">
              <li><a href="https://wa.me/351916853802" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5 0-.1-.3-.2-.6-.4z" /></svg>
                WhatsApp
              </a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer__base" style={{ flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <small>© 2026 SparkLab. Feito com cuidado, camada por camada.</small>
          <small style={{ opacity: 0.7 }}>Última atualização: Junho de 2026 · Verificado por SparkLab Maker</small>
          <small><Link href="/privacidade">Privacidade</Link> · <Link href="/termos">Termos</Link></small>
        </div>
        <small style={{ opacity: 0.7 }}>
          Site desenvolvido por{' '}
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
