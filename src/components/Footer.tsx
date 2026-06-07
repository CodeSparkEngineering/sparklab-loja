'use client';

import Image from 'next/image';
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
          <a href="#" className="logo">
            <Image
              src="/logo.jpg"
              alt="SparkLab"
              width={32}
              height={32}
              className="logo__mark"
            />
            <span>Spark<em>Lab</em></span>
          </a>
          <p className="footer__tag">SparkLab — impressão 3D sob encomenda, com acabamento que impressiona.</p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Loja</h4>
            <ul>
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#">Sob encomenda</a></li>
              <li><a href="#">Materiais</a></li>
              <li><a href="#">Prazos e frete</a></li>
            </ul>
          </div>
          <div>
            <h4>Atendimento</h4>
            <ul>
              <li><a href="#" onClick={handleContact}>WhatsApp</a></li>
              <li><a href="#orcamento">Orçamento</a></li>
              <li><a href="#faq">Perguntas frequentes</a></li>
              <li><a href="#">Garantia</a></li>
            </ul>
          </div>
          <div>
            <h4>Redes</h4>
            <ul className="socials">
              <li><a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
                Instagram
              </a></li>
              <li><a href="#" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 4c.5 2.5 2.5 4.5 5 5" /></svg>
                TikTok
              </a></li>
              <li><a href="#" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="3" /><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" /></svg>
                YouTube
              </a></li>
              <li><a href="https://discord.gg/VJcZrPb3" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.074.074 0 0 0-.079.037c-.34.6-.719 1.385-.984 2.001a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-1-2.001.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.17 4.369a.07.07 0 0 0-.032.027C1.978 9.046 1.114 13.58 1.538 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                Discord
              </a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer__base">
        <small>© 2026 SparkLab. Feito com cuidado, camada por camada.</small>
        <small><a href="#">Privacidade</a> · <a href="#">Termos</a></small>
      </div>
    </footer>
  );
}
