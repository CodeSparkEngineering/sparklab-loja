import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { SITE_URL } from '@/data/site';
import FaixaConfianca from '@/components/FaixaConfianca';
import Destaques from '@/components/Destaques';
import Diferenciais from '@/components/Diferenciais';
import Catalogo from '@/components/Catalogo';
import ComoFunciona from '@/components/ComoFunciona';
import Orcamento from '@/components/Orcamento';
import AOficina from '@/components/AOficina';
import Depoimentos from '@/components/Depoimentos';
import Comunidade from '@/components/Comunidade';
import FAQ from '@/components/FAQ';
import CtaFinal from '@/components/CtaFinal';
import Footer from '@/components/Footer';

// AEO: processo de encomenda em passos estruturados — permite a motores de
// resposta (Google AI Overviews, ChatGPT, Perplexity) citar o "como funciona".
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como encomendar uma impressão 3D na SparkLab",
  "description": "Do ficheiro (ou ideia) à peça entregue em casa, em três passos.",
  "totalTime": "P5D",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Envia a tua ideia ou modelo 3D",
      "text": "Envia um ficheiro 3D (STL, OBJ, 3MF ou STEP) ou descreve a tua ideia — a equipa avalia a viabilidade da impressão."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Afinamos os detalhes contigo",
      "text": "Cor, tamanho, material (PLA, PETG, ABS, ASA, TPU ou PC) e acabamento são definidos em conjunto pelo WhatsApp, com orçamento claro."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Imprimimos, revemos e enviamos",
      "text": "A peça é impressa numa Bambu Lab P1S, revista e enviada via CTT registado com seguimento para qualquer ponto de Portugal."
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#servico-impressao-3d`,
  "serviceType": "Impressão 3D sob encomenda",
  "name": "Impressão 3D personalizada e modelação",
  "description": "Serviço de impressão 3D sob encomenda em Portugal: peças personalizadas, protótipos, peças de substituição e modelação 3D. Materiais PLA, PETG, ABS, ASA, TPU e PC. Envio grátis a partir de 40€.",
  "provider": { "@id": `${SITE_URL}/#business` },
  "areaServed": { "@type": "Country", "name": "Portugal" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": `${SITE_URL}/#orcamento`,
    "availableLanguage": ["Portuguese", "English"]
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <Header />
      <main>
        <Hero />
        <FaixaConfianca />
        <Destaques />
        <Diferenciais />
        <Catalogo />
        <ComoFunciona />
        <Orcamento />
        <AOficina />
        <Depoimentos />
        <Comunidade />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
