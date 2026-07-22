'use client';

/**
 * Bloco de citação do especialista (E-E-A-T / AEO). Dá voz humana e autoridade
 * ao artigo — os motores de resposta valorizam opinião de especialista atribuída.
 *
 * Coloca-se DENTRO do <GuiaLang> respetivo (o texto é específico de cada idioma):
 *   <GuiaLang lang="pt"> … <GuiaCitacao text="…" role="co-fundador da SparkLab" /> … </GuiaLang>
 *
 * O autor liga à mesma pessoa da entidade Person do schema (ver GuiaTopo).
 */
export function GuiaCitacao({
  text,
  author = 'Israel',
  role,
}: {
  text: string;
  author?: string;
  role?: string;
}) {
  return (
    <figure className="my-8 rounded-2xl border border-orange-200/70 dark:border-orange-500/25 bg-orange-50/60 dark:bg-orange-500/5 px-6 py-5">
      <blockquote className="m-0 border-0 p-0 text-lg leading-relaxed font-medium text-stone-800 dark:text-stone-100">
        “{text}”
      </blockquote>
      <figcaption className="mt-3 text-sm text-stone-600 dark:text-stone-400">
        — <strong className="text-stone-800 dark:text-stone-200">{author}</strong>
        {role ? `, ${role}` : ''}
      </figcaption>
    </figure>
  );
}
