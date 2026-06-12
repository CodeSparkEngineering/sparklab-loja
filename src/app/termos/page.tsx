import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Termos e Condições',
  description: 'Condições de compra, envio e utilização dos produtos e arquivos da SparkLab.',
};

export default function TermosPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container max-w-3xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <h1 className="h2 mb-2">Termos e Condições</h1>
        <p className="text-sm text-zinc-500 mb-10">Última atualização: junho de 2026</p>

        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-6">
          <p>
            Ao comprar na <strong>SparkLab</strong>, concordas com as condições abaixo. Os
            preços estão em euros (€) e aplicam-se a Portugal.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">1. Encomendas e pagamento</h2>
          <p>
            Os pagamentos são processados de forma segura pela Stripe. A encomenda é confirmada
            após a aprovação do pagamento. Os produtos podem ser <strong>prontos a enviar</strong> ou
            <strong> sob encomenda</strong> (produzidos após a compra).
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">2. Envio</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Entregamos para todo o Portugal, via CTT.</li>
            <li>Envio grátis em encomendas a partir de 40€; abaixo disso, portes de 4,90€.</li>
            <li>Os prazos são estimativas e podem variar conforme a produção e a transportadora.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">3. Peças personalizadas</h2>
          <p>
            Peças com personalização (nome, cor ou modelo à medida) são feitas especialmente
            para ti. Por isso, salvo defeito, não estão sujeitas ao direito de livre devolução.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">4. Arquivos STL</h2>
          <p>
            A venda de arquivos STL é feita sob encomenda através do WhatsApp. Os arquivos são
            licenciados para <strong>uso pessoal</strong>. Não é permitido revender, redistribuir
            nem partilhar o ficheiro com terceiros.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">5. Defeitos e trocas</h2>
          <p>
            Se a tua peça chegar com defeito, fala connosco pelo WhatsApp até 14 dias após a
            receção e resolvemos — com substituição ou reembolso, conforme o caso.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">6. Propriedade intelectual</h2>
          <p>
            Os modelos, imagens e conteúdos da SparkLab são propriedade da marca e não podem ser
            reproduzidos sem autorização.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">7. Contacto</h2>
          <p>
            Dúvidas sobre uma encomenda? Fala connosco pelo{' '}
            <a href="https://wa.me/351916853802" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              WhatsApp (+351 916 853 802)
            </a>.
          </p>

          <p className="text-sm text-zinc-500 mt-10 border-t border-white/10 pt-6">
            Este documento é um resumo informativo. Recomendamos rever com um profissional antes
            de operar com pagamentos reais.
          </p>
        </div>
      </div>
    </main>
  );
}
