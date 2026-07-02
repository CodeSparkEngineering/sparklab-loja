import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/**
 * Estilos globais dos artigos MDX (/guias). O site não usa o plugin de
 * typography do Tailwind, por isso mapeamos os elementos à mão com a
 * paleta da marca (stone + laranja) e suporte a dark mode.
 */
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-6 mt-2 text-balance">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-5">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-stone-600 dark:text-stone-400 leading-relaxed marker:text-orange-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-stone-600 dark:text-stone-400 leading-relaxed marker:text-orange-500 marker:font-semibold">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-stone-900 dark:text-stone-100">{children}</strong>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? '#'}
      className="text-orange-600 dark:text-orange-400 font-medium underline decoration-orange-300 underline-offset-2 hover:text-orange-500 transition-colors"
    >
      {children}
    </Link>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-orange-400 pl-5 my-6 italic text-stone-600 dark:text-stone-400 [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-2xl border border-stone-200 dark:border-white/10">
      <table className="w-full text-left text-stone-700 dark:text-stone-300 text-base">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-stone-100 dark:bg-white/5 text-stone-900 dark:text-stone-100">{children}</thead>
  ),
  th: ({ children }) => <th className="px-4 py-3 font-semibold whitespace-nowrap">{children}</th>,
  td: ({ children }) => (
    <td className="px-4 py-3 border-t border-stone-200 dark:border-white/10 align-top">{children}</td>
  ),
  hr: () => <hr className="my-10 border-stone-200 dark:border-white/10" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
