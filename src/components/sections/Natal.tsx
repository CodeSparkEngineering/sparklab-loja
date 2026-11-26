'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatEUR } from '@/data/products';
import {
  PECAS_NATAL,
  GRUPOS_NATAL,
  NATAL,
  diasAteUltimoDia,
  faseNatal,
  grupoNatal,
  type GrupoNatal,
} from '@/data/natal';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { useAgora } from '@/components/natal/useAgora';
import { useLang, pName } from '@/i18n/LanguageContext';

/**
 * Secção de Natal da home — faixa vermelha a toda a largura com luzes,
 * contagem para o último dia de encomenda e as peças de Natal em destaque
 * (produtos do catálogo: cada cartão leva à página do produto).
 * Sazonal: esconde-se sozinha a partir de NATAL.fim.
 *
 * Fica ANTES do catálogo, por isso não pode crescer muito em altura (no
 * telemóvel as peças viram uma faixa horizontal): não pode voltar a empurrar
 * o primeiro produto para longe do topo.
 */

const L = {
  pt: {
    eyebrow: `🎄 Natal ${NATAL.ano}`,
    desc: 'Impressas por nós em Sangalhos, na cor que escolheres. Escolhe a peça e encomenda online em dois minutos.',
    prazo: (data: string) => (
      <>
        Encomenda até <strong>{data}</strong> e chega antes do Natal.
      </>
    ),
    conta: (n: number) =>
      n === 0
        ? { num: 'Hoje', label: 'último dia para encomendar' }
        : { num: String(n), label: n === 1 ? 'dia para encomendar' : 'dias para encomendar' },
    tarde: (
      <>
        A data garantida já passou — <strong>fala connosco</strong> e vemos o que ainda dá.
      </>
    ),
    tardeMsg: 'Olá! Ainda vou a tempo de uma prenda de Natal? Queria saber o que conseguem entregar.',
    pecasLabel: 'Peças de Natal',
    filtrosLabel: 'Filtrar peças de Natal',
    tudo: 'Tudo',
    grupos: {
      arvore: 'Para a árvore',
      decoracao: 'Decoração',
      mesa: 'Mesa e cozinha',
      oferecer: 'Para oferecer',
    },
    comNome: 'Com nome',
    personalizar: 'Personalizar',
    ver: 'Ver peça',
    customTitle: 'Queres uma prenda que só essa pessoa tem?',
    customDesc: 'Nome, clube, hobby, uma piada só vossa — desenhamos e imprimimos à medida.',
    customCta: 'Pedir orçamento',
    guia: 'Ver ideias de prendas',
  },
  en: {
    eyebrow: `🎄 Christmas ${NATAL.ano}`,
    desc: 'Printed by us in Sangalhos, in the color you pick. Choose a piece and order online in two minutes.',
    prazo: (data: string) => (
      <>
        Order by <strong>{data}</strong> and it arrives before Christmas.
      </>
    ),
    conta: (n: number) =>
      n === 0
        ? { num: 'Today', label: 'last day to order' }
        : { num: String(n), label: n === 1 ? 'day left to order' : 'days left to order' },
    tarde: (
      <>
        The guaranteed date has passed — <strong>message us</strong> and we will see what is still possible.
      </>
    ),
    tardeMsg: 'Hi! Am I still in time for a Christmas gift? I would like to know what you can deliver.',
    pecasLabel: 'Christmas pieces',
    filtrosLabel: 'Filter Christmas pieces',
    tudo: 'All',
    grupos: {
      arvore: 'For the tree',
      decoracao: 'Décor',
      mesa: 'Table & kitchen',
      oferecer: 'To give',
    },
    comNome: 'With a name',
    personalizar: 'Personalize',
    ver: 'View piece',
    customTitle: 'Want a gift only that person has?',
    customDesc: 'A name, a club, a hobby, an inside joke — we design and print it to order.',
    customCta: 'Get a quote',
    guia: 'See gift ideas',
  },
} as const;

/** Lâmpadas do fio de luzes (o CSS esconde as que sobram em ecrãs estreitos). */
const LUZES = Array.from({ length: 24 }, (_, i) => i);

/** Filtros com pelo menos uma peça (em produção há menos peças do que em dev). */
const FILTROS = GRUPOS_NATAL.map((g) => ({
  grupo: g,
  total: PECAS_NATAL.filter((p) => grupoNatal(p.id) === g).length,
})).filter((f) => f.total > 0);

/** Com poucas peças os filtros só atrapalham: vêem-se todas de uma vez. */
const MOSTRAR_FILTROS = PECAS_NATAL.length >= 8 && FILTROS.length > 1;

export default function Natal() {
  const { lang } = useLang();
  const t = L[lang];

  // null até hidratar (a home é estática) — nesse instante mostra o prazo sem
  // a contagem de dias.
  const agora = useAgora();

  const [filtro, setFiltro] = useState<GrupoNatal | 'tudo'>('tudo');
  const listaRef = useRef<HTMLUListElement>(null);
  const escolher = (f: GrupoNatal | 'tudo') => {
    setFiltro(f);
    // no telemóvel a lista é uma faixa horizontal: volta ao início
    listaRef.current?.scrollTo({ left: 0 });
  };
  const pecas =
    filtro === 'tudo' ? PECAS_NATAL : PECAS_NATAL.filter((p) => grupoNatal(p.id) === filtro);

  const fase = agora ? faseNatal(agora) : 'a-tempo';
  if (fase === 'terminada' || PECAS_NATAL.length === 0) return null;

  const dataLimite = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'pt-PT', {
    day: 'numeric',
    month: 'long',
  }).format(NATAL.ultimoDia);

  const conta = agora ? t.conta(diasAteUltimoDia(agora)) : null;

  return (
    <section className="natal" id="natal" aria-labelledby="natal-title">
      <div className="natal__luzes" aria-hidden="true">
        {LUZES.map((i) => (
          <span key={i} className="natal__luz" />
        ))}
      </div>
      <span className="natal__deco natal__deco--a" aria-hidden="true">❄</span>
      <span className="natal__deco natal__deco--b" aria-hidden="true">❄</span>
      <span className="natal__deco natal__deco--c" aria-hidden="true">❄</span>

      <div className="container">
        <div className="natal__head reveal">
          <div>
            <span className="eyebrow--hand natal__eyebrow">{t.eyebrow}</span>
            {lang === 'pt' ? (
              <h2 className="h2" id="natal-title">
                Prendas que mais <span className="hand-underline">ninguém</span> vai dar.
              </h2>
            ) : (
              <h2 className="h2" id="natal-title">
                Gifts <span className="hand-underline">nobody else</span> will give.
              </h2>
            )}
            <p className="natal__desc">{t.desc}</p>
          </div>

          {fase === 'a-tempo' ? (
            <div className="natal__prazo">
              {conta ? (
                <span className="natal__conta">
                  <span
                    className={`natal__conta-num${
                      /^\d+$/.test(conta.num) ? '' : ' natal__conta-num--texto'
                    }`}
                  >
                    {conta.num}
                  </span>
                  <span className="natal__conta-label">{conta.label}</span>
                </span>
              ) : (
                <TreeIcon />
              )}
              <p className="natal__prazo-texto">{t.prazo(dataLimite)}</p>
            </div>
          ) : (
            <a
              className="natal__prazo natal__prazo--tarde"
              href={getWhatsAppLink(t.tardeMsg)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TreeIcon />
              <span className="natal__prazo-texto">{t.tarde}</span>
            </a>
          )}
        </div>

        {MOSTRAR_FILTROS && (
          <div className="natal__filtros reveal" role="group" aria-label={t.filtrosLabel}>
            <button
              type="button"
              className="natal__filtro"
              aria-pressed={filtro === 'tudo'}
              onClick={() => escolher('tudo')}
            >
              {t.tudo}
              <span className="natal__filtro-n">{PECAS_NATAL.length}</span>
            </button>
            {FILTROS.map((f) => (
              <button
                key={f.grupo}
                type="button"
                className="natal__filtro"
                aria-pressed={filtro === f.grupo}
                onClick={() => escolher(f.grupo)}
              >
                {t.grupos[f.grupo]}
                <span className="natal__filtro-n">{f.total}</span>
              </button>
            ))}
          </div>
        )}

        <ul className="natal__pecas" ref={listaRef} aria-label={t.pecasLabel}>
          {pecas.map((p) => {
            const nome = pName(p, lang);
            const comNome = p.customizations?.some((c) => c.id === 'nome');
            return (
              <li key={`${filtro}-${p.id}`} className="natal__peca">
                <Link href={`/produto/${p.id}`} className="natal__peca-link">
                  <span className="natal__moldura">
                    <span className="natal__foto">
                      <Image
                        src={p.images![0]}
                        alt={nome}
                        fill
                        sizes="(max-width: 899px) 58vw, (max-width: 1199px) 24vw, 230px"
                        className="natal__foto-img"
                      />
                      {p.images![1] && (
                        <Image
                          src={p.images![1]}
                          alt=""
                          fill
                          sizes="(max-width: 1199px) 24vw, 230px"
                          className="natal__foto-img natal__foto-img--alt"
                        />
                      )}
                      {p.credit && (
                        <span className="natal__credito">
                          Design: {p.credit.autor} · {p.credit.licenca}
                        </span>
                      )}
                    </span>
                    {comNome && <span className="natal__etiqueta">✎ {t.comNome}</span>}
                    <span className="natal__price">{formatEUR(p.price)}</span>
                  </span>
                  <span className="natal__corpo">
                    <span className="natal__kicker">{t.grupos[grupoNatal(p.id)]}</span>
                    <span className="natal__name">{nome}</span>
                    <span className="natal__acao">
                      {comNome ? t.personalizar : t.ver}
                      <span className="natal__seta" aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="natal__custom reveal">
          <div>
            <p className="natal__custom-title">{t.customTitle}</p>
            <p className="natal__custom-desc">{t.customDesc}</p>
          </div>
          <div className="natal__custom-acoes">
            <Link href="/#orcamento" className="natal__btn">
              <span aria-hidden="true">🎁</span>
              {t.customCta}
            </Link>
            <Link href="/guias/prendas-personalizadas-impressao-3d" className="natal__link">
              {t.guia}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TreeIcon() {
  return (
    <svg
      className="natal__icone"
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3 7.5 9h2.2L6 14h3l-3 4h12l-3-4h3l-3.7-5h2.2L12 3Z" />
      <path d="M12 18v3" />
    </svg>
  );
}
