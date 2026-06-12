import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a SparkLab recolhe, usa e protege os teus dados.',
};

export default function PrivacidadePage() {
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

        <h1 className="h2 mb-2">Política de Privacidade</h1>
        <p className="text-sm text-zinc-500 mb-10">Última atualização: junho de 2026</p>

        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-6">
          <p>
            A <strong>SparkLab</strong> é uma loja de impressão 3D sediada em Portugal. Esta
            política explica que dados recolhemos quando usas o nosso site e como os tratamos,
            de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD).
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">1. Dados que recolhemos</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Encomendas:</strong> nome, email, telefone/WhatsApp e morada de entrega, recolhidos no momento da compra.</li>
            <li><strong>Pagamento:</strong> processado de forma segura pela Stripe. <strong>Nunca</strong> vemos nem guardamos os dados do teu cartão.</li>
            <li><strong>Contacto:</strong> o conteúdo das mensagens que nos envias (ex.: WhatsApp, formulário de orçamento).</li>
            <li><strong>Carrinho:</strong> guardado localmente no teu navegador (localStorage) para a tua conveniência.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">2. Como usamos os teus dados</h2>
          <p>
            Usamos os teus dados apenas para processar e entregar as tuas encomendas, responder
            a pedidos de orçamento e prestar apoio ao cliente. Não enviamos comunicações de
            marketing sem o teu consentimento.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">3. Com quem partilhamos</h2>
          <p>
            Só partilhamos o estritamente necessário com parceiros que tornam a compra possível:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Stripe</strong> — processamento do pagamento.</li>
            <li><strong>CTT / transportadora</strong> — entrega da encomenda.</li>
          </ul>
          <p>Não vendemos nem alugamos os teus dados a terceiros.</p>

          <h2 className="text-xl font-semibold text-white mt-8">4. Os teus direitos</h2>
          <p>
            Tens o direito de aceder, corrigir ou eliminar os teus dados, bem como de retirar
            o consentimento a qualquer momento. Para o fazer, contacta-nos pelo WhatsApp.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8">5. Contacto</h2>
          <p>
            Para qualquer questão sobre privacidade, fala connosco pelo{' '}
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
