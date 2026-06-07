"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "./ui/accordion";

const faqs = [
  {
    q: "Quais materiais e cores vocês trabalham?",
    a: "Trabalhamos exclusivamente com filamentos oficiais da Bambu Lab (PLA, PETG, ABS, TPU, ASA, PC, entre outros) em nossas impressoras Bambu Lab P1S. Temos diversas cores em estoque — cores especiais são confirmadas no orçamento.",
  },
  {
    q: "Posso enviar meu próprio arquivo 3D?",
    a: "Sim. Aceitamos STL, OBJ, 3MF e STEP. Se o arquivo tiver algum problema de malha, avisamos antes de imprimir e, em geral, fazemos a correção sem custo.",
  },
  {
    q: "Não tenho o modelo 3D — vocês modelam?",
    a: "Modelamos sim. Envie fotos, medidas ou um desenho — orçamos modelagem + impressão juntos. O valor da modelagem é cobrado uma única vez; reimpressões futuras são só do material.",
  },
  {
    q: "Qual o prazo de produção e entrega?",
    a: "Peças do catálogo: saem em até 48h. Personalizadas: 2 a 5 dias úteis, conforme tamanho e acabamento. O prazo de entrega depende do CEP — estimamos no orçamento.",
  },
  {
    q: "Qual o tamanho máximo de peça?",
    a: "Imprimimos peças únicas até 30×30×35 cm. Peças maiores são feitas em partes modulares com encaixes quase invisíveis — dá pra montar projetos grandes sem perder a estética.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos Pix, cartão em até 6x sem juros e boleto. Para encomendas acima de R$ 300, trabalhamos com 50% no início e 50% antes do envio.",
  },
  {
    q: "Vocês fazem acabamento (lixa, pintura, montagem)?",
    a: "Sim — oferecemos lixamento, primer, pintura em spray ou aerografia e montagem para peças que vêm em partes. Cada acabamento é orçado separadamente.",
  },
  {
    q: "Atendem empresas e grandes volumes?",
    a: "Sim. Temos preços escalonados para lotes a partir de 10 peças e nota fiscal para empresas. Fale com a gente pelo WhatsApp informando projeto e volume previsto.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Keep first open by default

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section__head reveal" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="eyebrow"><span className="dot"></span> Perguntas frequentes</span>
          <h2 className="h2">Tudo que você quer saber<br />antes de pedir.</h2>
        </div>

        <div className="mt-12 reveal">
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
