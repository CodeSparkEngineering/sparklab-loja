'use client';

import { useState, useRef, useEffect } from 'react';
import { getWhatsAppLink } from '@/utils/whatsapp';

const MATERIALS = [
  { value: 'Não tenho a certeza — ajudem-me', label: 'Não tenho a certeza', hint: 'Recomendamos para ti' },
  { value: 'PLA (decorativo)', label: 'PLA', hint: 'Decorativo · fácil acabamento' },
  { value: 'PETG (resistente)', label: 'PETG', hint: 'Resistente · uso geral' },
  { value: 'ABS (técnico)', label: 'ABS', hint: 'Técnico · alta temperatura' },
  { value: 'ASA (exterior)', label: 'ASA', hint: 'Resistência UV · exterior' },
  { value: 'TPU (flexível)', label: 'TPU', hint: 'Flexível · borrachoso' },
  { value: 'PC (policarbonato)', label: 'PC', hint: 'Alta resistência · técnico' },
];

export default function Orcamento() {
  const [fileData, setFileData] = useState<{ name: string; size: number } | null>(null);
  const [material, setMaterial] = useState(MATERIALS[0].value);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileData({ name: file.name, size: file.size });
    } else {
      setFileData(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();

    if (!name || !phone) {
      alert('Por favor, preenche o nome e o WhatsApp para continuarmos.');
      return;
    }

    const material = formData.get('material') as string;
    const qty = formData.get('qty') as string;
    const desc = (formData.get('desc') as string || '').trim();

    const parts = [
      `Olá! Gostaria de um orçamento.`,
      ``,
      `*Nome:* ${name}`,
      `*WhatsApp:* ${phone}`,
      `*Material:* ${material}`,
      `*Quantidade:* ${qty}`,
    ];

    if (desc) parts.push(`*Descrição:* ${desc}`);
    if (fileData) parts.push(``, `Vou anexar o ficheiro *${fileData.name}* aqui no chat de seguida.`);
    else parts.push(``, `Ainda não tenho ficheiro 3D — preciso de ajuda com a modelação.`);

    window.open(getWhatsAppLink(parts.join('\n')), '_blank', 'noopener');
  };

  return (
    <section className="section" id="orcamento">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow eyebrow--olive"><span className="dot dot--olive"></span> Orçamento rápido</span>
          <h2 className="h2">Tens um ficheiro?<br />Recebe um orçamento hoje.</h2>
        </div>

        <form className="quote-form reveal" id="quote-form" noValidate onSubmit={handleSubmit}>
          <div className="quote-form__aside">
            <h3>Como funciona</h3>
            <p>Preenche o formulário e anexa o teu ficheiro. Respondemos em até 2 horas úteis no WhatsApp com o prazo e o valor.</p>
            <ul className="quote-form__list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Formatos aceitos: STL, OBJ, 3MF, STEP
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Sem ficheiro? Descreve a ideia — a nossa equipa trata da modelação.
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Orçamento e dúvidas sem compromisso.
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Entrega para todo Portugal.
              </li>
            </ul>
          </div>

          <div className="qf">
            <div className="qf__row">
              <div className="qf__field">
                <label htmlFor="qf-name">Nome</label>
                <input id="qf-name" name="name" type="text" required placeholder="Seu nome" />
              </div>
              <div className="qf__field">
                <label htmlFor="qf-phone">WhatsApp</label>
                <input id="qf-phone" name="phone" type="tel" required placeholder="+351 912 345 678" />
              </div>
            </div>

            <div className="qf__row">
              <div className="qf__field">
                <label htmlFor="qf-material">Material</label>
                <div
                  ref={selectRef}
                  className={`qf__select ${open ? 'qf__select--open' : ''}`}
                >
                  <button
                    type="button"
                    id="qf-material"
                    className="qf__select-trigger"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => setOpen(v => !v)}
                  >
                    <span className="qf__select-value">
                      {MATERIALS.find(m => m.value === material)?.label}
                    </span>
                    <svg className="qf__select-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  {open && (
                    <ul className="qf__select-list" role="listbox">
                      {MATERIALS.map(m => (
                        <li
                          key={m.value}
                          role="option"
                          aria-selected={material === m.value}
                          className={`qf__select-option ${material === m.value ? 'is-selected' : ''}`}
                          onClick={() => { setMaterial(m.value); setOpen(false); }}
                        >
                          <span className="qf__select-option-label">{m.label}</span>
                          <span className="qf__select-option-hint">{m.hint}</span>
                          {material === m.value && (
                            <svg className="qf__select-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  <input type="hidden" name="material" value={material} />
                </div>
              </div>
              <div className="qf__field">
                <label htmlFor="qf-qty">Quantidade</label>
                <input id="qf-qty" name="qty" type="number" min="1" defaultValue="1" />
              </div>
            </div>

            <div className="qf__field">
              <label htmlFor="qf-file">Ficheiro 3D (opcional)</label>
              <label className={`qf__file ${fileData ? 'qf__file--has' : ''}`} id="qf-file-label" htmlFor="qf-file">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                <span id="qf-file-text">
                  {fileData ? `✓ ${fileData.name} ${(fileData.size / 1024 / 1024).toFixed(2)} MB` : 'Clica para anexar STL, OBJ, 3MF ou STEP'}
                </span>
                <input id="qf-file" name="file" type="file" accept=".stl,.obj,.3mf,.step,.stp" onChange={handleFileChange} />
              </label>
            </div>

            <div className="qf__field">
              <label htmlFor="qf-desc">Descrição da peça</label>
              <textarea id="qf-desc" name="desc" placeholder="Dimensões aproximadas, cor desejada, uso final, prazo ideal…"></textarea>
            </div>

            <button type="submit" className="btn btn--primary qf__submit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8z" /></svg>
              Enviar pelo WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
