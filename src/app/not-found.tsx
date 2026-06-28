import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-8xl font-bold text-stone-200 dark:text-stone-800 select-none">404</span>
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-4 mb-3">
          Página não encontrada
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
          A peça que procuras não está aqui — mas temos muitas outras a ganhar forma
          na oficina. Espreita o catálogo!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn btn--primary">
            Voltar ao início
          </Link>
          <Link href="/#catalogo" className="btn btn--ghost">
            Ver catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
