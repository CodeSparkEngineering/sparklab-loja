'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FaixaConfianca from '@/components/FaixaConfianca';
import Destaques from '@/components/Destaques';
import Diferenciais from '@/components/Diferenciais';
import Catalogo from '@/components/Catalogo';
import ComoFunciona from '@/components/ComoFunciona';
import Orcamento from '@/components/Orcamento';
import Depoimentos from '@/components/Depoimentos';
import Comunidade from '@/components/Comunidade';
import FAQ from '@/components/FAQ';
import CtaFinal from '@/components/CtaFinal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FaixaConfianca />
        <Destaques />
        <Diferenciais />
        <Catalogo />
        <ComoFunciona />
        <Orcamento />
        <Depoimentos />
        <Comunidade />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
