'use client';

import { useEffect, useState } from 'react';
import { formatEUR, WHOLESALE_DISCOUNT, WHOLESALE_MIN_QTY } from '@/data/products';

/**
 * Calculadora de preços interna — só para a SparkLab.
 *
 * Fórmula: Custo direto = material + energia + tempo de trabalho;
 *          Preço = Custo direto × multiplicador (3× por defeito).
 *
 * Números-base reais (podes editar em "Definições de custo"; ficam guardados
 * no teu navegador):
 *   • Filamento: 0,0125 €/g (média Bambu Lab EU)
 *   • Energia:   0,19 €/kWh (Galp, com IVA)
 *   • Consumo P1S: 0,15 kWh/h
 *   • A tua hora: 12 €/h
 *   • Multiplicador: 3×
 */

const DEFAULT_CFG = {
  filamentoG: '0.0125',
  energiaKwh: '0.19',
  consumo: '0.15',
  hora: '12',
  mult: '3',
};
type Cfg = typeof DEFAULT_CFG;
const CFG_KEY = 'sparklab-calc-config';

/** Aceita vírgula ou ponto; devolve 0 se inválido. */
function num(s: string): number {
  const v = parseFloat(String(s).replace(',', '.'));
  return Number.isFinite(v) ? v : 0;
}

export default function CalculadoraContent() {
  // Peça (valores por defeito = o tubarão articulado, como exemplo vivo)
  const [peso, setPeso] = useState('20.47');
  const [horas, setHoras] = useState('1');
  const [minutos, setMinutos] = useState('3');
  const [trabalho, setTrabalho] = useState('6');
  const [cfg, setCfg] = useState<Cfg>(DEFAULT_CFG);

  // Carrega definições guardadas (uma vez)
  useEffect(() => {
    try {
      const s = localStorage.getItem(CFG_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (s) setCfg({ ...DEFAULT_CFG, ...JSON.parse(s) });
    } catch {
      // storage indisponível — usa defaults
    }
  }, []);

  // Guarda sempre que mudam
  useEffect(() => {
    try {
      localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
    } catch {
      // ignora
    }
  }, [cfg]);

  const grams = num(peso);
  const printH = num(horas) + num(minutos) / 60;
  const material = grams * num(cfg.filamentoG);
  const energia = printH * num(cfg.consumo) * num(cfg.energiaKwh);
  const mao = (num(trabalho) / 60) * num(cfg.hora);
  const custo = material + energia + mao;
  const preco = custo * num(cfg.mult);
  const redondo = Math.round(preco * 2) / 2; // ao 0,50 mais próximo
  const atacado = preco * (1 - WHOLESALE_DISCOUNT);
  const lucro = preco - custo;

  const setCfgField = (k: keyof Cfg) => (v: string) => setCfg((c) => ({ ...c, [k]: v }));

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[var(--bg)]">
      <div className="container mx-auto max-w-3xl px-4">
        <header className="mb-8">
          <span className="inline-block rounded-full bg-stone-200 dark:bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-300">
            Interna · só SparkLab
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Calculadora de preços
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Mete os números do fatiador (Bambu Studio) e recebe o preço.
            Fórmula: <strong>(material + energia + o teu tempo) × {num(cfg.mult)}</strong>.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Entradas */}
          <section className="rounded-2xl border border-[var(--line-strong)] bg-[var(--bg-card)] p-5">
            <h2 className="mb-4 font-bold text-stone-900 dark:text-stone-100">A tua peça</h2>

            <Campo label="Peso (gramas)" value={peso} onChange={setPeso} suffix="g" />

            <div className="mt-3">
              <span className="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">
                Tempo de impressão
              </span>
              <div className="grid grid-cols-2 gap-3">
                <Campo value={horas} onChange={setHoras} suffix="h" />
                <Campo value={minutos} onChange={setMinutos} suffix="min" />
              </div>
            </div>

            <div className="mt-3">
              <Campo label="Trabalho (mãos na peça)" value={trabalho} onChange={setTrabalho} suffix="min" />
              <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
                Tirar do prato, soltar juntas, lixar, embalar. É o custo que mais pesa nas peças pequenas.
              </p>
            </div>
          </section>

          {/* Resultado */}
          <section className="rounded-2xl border border-orange-200 dark:border-orange-500/25 bg-orange-50 dark:bg-orange-500/10 p-5">
            <h2 className="mb-4 font-bold text-stone-900 dark:text-stone-100">Resultado</h2>

            <dl className="space-y-1.5 text-sm">
              <Linha label="Material" val={material} />
              <Linha label="Energia" val={energia} />
              <Linha label="Mão de obra" val={mao} />
              <div className="my-2 border-t border-orange-200/70 dark:border-orange-500/20" />
              <Linha label="Custo direto" val={custo} bold />
            </dl>

            <div className="mt-5 rounded-xl bg-white dark:bg-white/5 border border-orange-200 dark:border-orange-500/20 p-4 text-center">
              <span className="block text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Preço de venda (× {num(cfg.mult)})
              </span>
              <span data-testid="preco" className="block text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                {formatEUR(preco)}
              </span>
              <span className="mt-1 block text-sm text-stone-600 dark:text-stone-300">
                Sugestão p/ etiqueta: <strong data-testid="preco-redondo">{formatEUR(redondo)}</strong>
              </span>
            </div>

            <dl className="mt-4 space-y-1.5 text-sm">
              <Linha label="Lucro por peça" val={lucro} />
              <Linha label={`Atacado (${WHOLESALE_MIN_QTY}+ un., −${Math.round(WHOLESALE_DISCOUNT * 100)}%)`} val={atacado} />
            </dl>
          </section>
        </div>

        {/* Definições editáveis */}
        <details className="mt-6 rounded-2xl border border-[var(--line-strong)] bg-[var(--bg-card)] p-5">
          <summary className="cursor-pointer font-bold text-stone-900 dark:text-stone-100">
            Definições de custo (os teus números-base)
          </summary>
          <p className="mt-2 mb-4 text-xs text-stone-500 dark:text-stone-400">
            Guardados automaticamente neste navegador. Atualiza quando o preço do filamento ou a fatura da luz mudarem.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Campo label="Filamento" value={cfg.filamentoG} onChange={setCfgField('filamentoG')} suffix="€/g" />
            <Campo label="Energia" value={cfg.energiaKwh} onChange={setCfgField('energiaKwh')} suffix="€/kWh" />
            <Campo label="Consumo da impressora" value={cfg.consumo} onChange={setCfgField('consumo')} suffix="kWh/h" />
            <Campo label="A tua hora" value={cfg.hora} onChange={setCfgField('hora')} suffix="€/h" />
            <Campo label="Multiplicador" value={cfg.mult} onChange={setCfgField('mult')} suffix="×" />
          </div>
          <button
            type="button"
            onClick={() => setCfg(DEFAULT_CFG)}
            className="mt-4 text-sm text-stone-500 dark:text-stone-400 underline underline-offset-2 hover:text-orange-600 dark:hover:text-orange-400"
          >
            Repor valores originais
          </button>
        </details>

        <p className="mt-6 text-center text-xs text-stone-400 dark:text-stone-500">
          Dica: imprime em lote (2–3 no prato) e divide o tempo de trabalho pelas peças — o custo por unidade cai e a margem sobe.
        </p>
      </div>
    </main>
  );
}

function Campo({
  label,
  value,
  onChange,
  suffix,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm font-medium text-stone-600 dark:text-stone-300">{label}</span>
      )}
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-[var(--line-strong)] bg-white dark:bg-white/5 px-3 py-2.5 pr-12 text-stone-900 dark:text-stone-100 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-stone-400 dark:text-stone-500">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function Linha({ label, val, bold = false }: { label: string; val: number; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? 'font-bold text-stone-900 dark:text-stone-100' : 'text-stone-600 dark:text-stone-300'}`}>
      <dt>{label}</dt>
      <dd>{formatEUR(val)}</dd>
    </div>
  );
}
