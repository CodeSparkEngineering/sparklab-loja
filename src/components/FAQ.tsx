"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "./ui/accordion";

const faqs = [
  {
    q: "Com que materiais e cores trabalham?",
    a: "Trabalhamos exclusivamente com filamentos oficiais da Bambu Lab (PLA, PETG, ABS, TPU, ASA, PC, entre outros) nas nossas impressoras Bambu Lab P1S. Temos várias cores em stock — cores especiais são confirmadas no orçamento.",
  },
  {
    q: "Posso enviar o meu próprio ficheiro 3D?",
    a: "Sim. Aceitamos STL, OBJ, 3MF e STEP. Se o ficheiro tiver algum problema de malha, avisamos antes de imprimir e, regra geral, corrigimos sem custo.",
  },
  {
    q: "Não tenho o modelo 3D — fazem a modelação?",
    a: "Fazemos, sim. Envia fotos, medidas ou um desenho — orçamos a modelação + impressão em conjunto. O valor da modelação é cobrado uma única vez; reimpressões futuras pagam só o material.",
  },
  {
    q: "Qual o prazo de produção e entrega?",
    a: "As peças do catálogo costumam estar prontas em poucos dias úteis; as personalizadas variam conforme o tamanho e o acabamento. Confirmamos sempre o prazo estimado no orçamento, antes de avançar — sem promessas que não possamos cumprir.",
  },
  {
    q: "Qual o tamanho máximo de peça?",
    a: "Imprimimos peças únicas até 30×30×35 cm. Peças maiores são feitas em partes modulares com encaixes quase invisíveis — dá para montar projetos grandes sem perder a estética.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "O pagamento é feito de forma segura por cartão (Visa, Mastercard) através da Stripe, no momento da encomenda. Para encomendas de maior volume, podemos combinar 50% no início e 50% antes do envio.",
  },
  {
    q: "Fazem acabamento (lixagem, pintura, montagem)?",
    a: "Sim — oferecemos lixagem, primário, pintura à pistola ou aerógrafo e montagem para peças que vêm em partes. Cada acabamento é orçado à parte.",
  },
  {
    q: "Atendem empresas e grandes volumes?",
    a: "Sim. Temos preços escalonados para lotes a partir de 10 peças e fatura para empresas. Fala connosco pelo WhatsApp a indicar o projeto e o volume previsto.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Keep first open by default

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section__head reveal" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="eyebrow"><span className="dot"></span> Perguntas frequentes</span>
          <h2 className="h2">Tudo o que precisas de saber<br />antes de encomendar.</h2>
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
