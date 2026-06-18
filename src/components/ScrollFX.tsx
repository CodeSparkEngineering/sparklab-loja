'use client';

import { useEffect } from 'react';

/**
 * ScrollFX — efeitos cinematic de scroll do site SparkLab.
 *
 * 1) CURSOR PERSONALIZADO: segue o rato com lag para efeito premium
 * 2) REVEAL DAS SEÇÕES: IntersectionObserver com stagger
 * 3) COUNTER ANIMAÇÃO: números animam ao entrar no viewport
 * 4) HERO PARALLAX: fallback quando animation-timeline não é suportado
 * 5) NAV SCROLL: adiciona is-scrolled ao header quando não estiver no topo
 */
export default function ScrollFX() {
  useEffect(() => {
    const supportsSDA =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline: scroll()');

    // ─── 1. Custom Cursor ─────────────────────────────────────────────
    const cursor    = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className    = 'cursor';
    cursorDot.className = 'cursor-dot';

    // Start off-screen until first mouse move
    cursor.style.opacity    = '0';
    cursorDot.style.opacity = '0';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Half-sizes for centering (updated if hover changes size)
    const RING = 18; // half of 36px
    const DOT  = 3;  // half of 6px

    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let rafCursor = 0;
    let cursorVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly — centered with translate
      cursorDot.style.transform = `translate(${mouseX - DOT}px, ${mouseY - DOT}px)`;

      // Reveal on first move
      if (!cursorVisible) {
        cursorVisible = true;
        cursor.style.opacity    = '1';
        cursorDot.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }
    };

    const animateCursor = () => {
      // Outer ring lags with lerp
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursor.style.transform = `translate(${ringX - RING}px, ${ringY - RING}px)`;
      rafCursor = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    // Hover effect — use event delegation for dynamic elements
    const addHover    = () => cursor.classList.add('cursor--hover');
    const removeHover = () => cursor.classList.remove('cursor--hover');

    const onDocMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label, .cat-pill, .faq__q');
      if (el) addHover();
    };
    const onDocMouseOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select, label, .cat-pill, .faq__q');
      if (el) removeHover();
    };

    document.addEventListener('mouseover', onDocMouseOver, { passive: true });
    document.addEventListener('mouseout',  onDocMouseOut,  { passive: true });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorDot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorDot.style.opacity = '1'; });

    // ─── 2. Section Reveal ────────────────────────────────────────────
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    reveals.forEach(el => el.classList.add('fx-hide'));

    // Stagger siblings within the same parent
    const groups = new Map<Element, HTMLElement[]>();
    for (const el of reveals) {
      const parent = el.parentElement ?? el;
      const arr = groups.get(parent) ?? [];
      arr.push(el);
      groups.set(parent, arr);
    }
    for (const arr of groups.values()) {
      arr.forEach((el, i) => {
        // cascata mais cinematográfica entre irmãos
        el.style.transitionDelay = `${Math.min(i * 130, 520)}ms`;
      });
    }

    let ioReveal: IntersectionObserver | null = null;
    let rafReveal = 0;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('fx-anim', 'is-visible'));
    } else {
      ioReveal = new IntersectionObserver(
        entries => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              ioReveal?.unobserve(e.target);
            }
          }
        },
        { threshold: 0, rootMargin: '0px 0px -8% 0px' }
      );

      rafReveal = requestAnimationFrame(() => {
        reveals.forEach(el => el.classList.add('fx-anim'));
        reveals.forEach(el => ioReveal!.observe(el));
      });
    }

    // Rede de segurança: se o observer não disparar para alguma secção
    // (scroll muito rápido, browser estranho, etc.), revela tudo após 2,5s
    // para nunca ficar uma secção invisível/preta no ecrã.
    const revealFailsafe = setTimeout(() => {
      reveals.forEach(el => el.classList.add('fx-anim', 'is-visible'));
    }, 2500);

    // ─── 3. Counter Animation ─────────────────────────────────────────
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-counter]'));

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateCounter = (el: HTMLElement, target: number, duration = 1800) => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(easeOut(progress) * target);
        el.textContent = value.toLocaleString('pt-PT');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const ioCounter = new IntersectionObserver(
        entries => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const target = parseInt(el.dataset.counter ?? '0', 10);
              animateCounter(el, target);
              ioCounter.unobserve(el);
            }
          }
        },
        { threshold: 0.5 }
      );
      counters.forEach(el => ioCounter.observe(el));
    }

    // ─── 4. Nav Scroll State ──────────────────────────────────────────
    const nav = document.querySelector<HTMLElement>('#nav');
    const updateNav = () => {
      if (!nav) return;
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // ─── 5. Hero Parallax Fallback ────────────────────────────────────
    let removeParallax = () => {};

    if (!supportsSDA) {
      const bar       = document.querySelector<HTMLElement>('.scroll-progress');
      const piece     = document.querySelector<HTMLElement>('.piece');
      const nozzle    = document.querySelector<HTMLElement>('.nozzle');
      const heroText  = document.querySelector<HTMLElement>('.hero__text-block');
      const heroStage = document.querySelector<HTMLElement>('.hero__stage-wrap');

      const clamp = (n: number) => Math.max(0, Math.min(1, n));

      let ticking = false;
      const update = () => {
        ticking = false;
        const y   = window.scrollY;
        const vh  = window.innerHeight || 1;
        const docH = document.documentElement.scrollHeight - vh;

        // Progress bar
        const progress = docH > 0 ? clamp(y / docH) : 0;
        if (bar) bar.style.transform = `scaleX(${progress})`;

        // Hero text fade up
        const tp = clamp(y / (vh * 0.9));
        if (heroText) {
          heroText.style.opacity = String(1 - tp);
          heroText.style.transform = `translateY(${-60 * tp}px)`;
        }

        // Stage parallax
        const vp = clamp(y / (vh * 1.1));
        if (heroStage) {
          heroStage.style.transform = `translateY(calc(-50% + ${60 * vp}px)) scale(${1 - 0.06 * vp})`;
          heroStage.style.opacity   = String(1 - vp * 0.7);
        }

        // Print build
        const hp = clamp(y / (vh * 0.8));
        if (piece) piece.style.clipPath = `inset(${60 - 60 * hp}% 0 0 0)`;
        if (nozzle) {
          nozzle.style.opacity = String(hp < 0.78 ? 1 : 1 - ((hp - 0.78) / 0.22) * 0.9);
        }
      };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      update();

      removeParallax = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
    }

    // ─── Cleanup ──────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafCursor);
      if (rafReveal) cancelAnimationFrame(rafReveal);
      clearTimeout(revealFailsafe);
      ioReveal?.disconnect();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onDocMouseOver);
      document.removeEventListener('mouseout',  onDocMouseOut);
      window.removeEventListener('scroll', updateNav);
      removeParallax();
      cursor.remove();
      cursorDot.remove();
    };
  }, []);

  return null;
}
