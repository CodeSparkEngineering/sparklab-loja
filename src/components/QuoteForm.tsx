'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { useLang } from '@/i18n/LanguageContext';

const MATERIALS = {
  pt: [
    { value: 'Não tenho a certeza — ajudem-me', label: 'Não tenho a certeza', hint: 'Recomendamos para ti' },
    { value: 'PLA (decorativo)', label: 'PLA', hint: 'Decorativo · fácil acabamento' },
    { value: 'PETG (resistente)', label: 'PETG', hint: 'Resistente · uso geral' },
    { value: 'ABS (técnico)', label: 'ABS', hint: 'Técnico · alta temperatura' },
    { value: 'ASA (exterior)', label: 'ASA', hint: 'Resistência UV · exterior' },
    { value: 'TPU (flexível)', label: 'TPU', hint: 'Flexível · borrachoso' },
    { value: 'PC (policarbonato)', label: 'PC', hint: 'Alta resistência · técnico' },
  ],
  en: [
    { value: "I'm not sure — help me choose", label: "I'm not sure", hint: "We'll recommend one" },
    { value: 'PLA (decorative)', label: 'PLA', hint: 'Decorative · easy finish' },
    { value: 'PETG (durable)', label: 'PETG', hint: 'Durable · general use' },
    { value: 'ABS (technical)', label: 'ABS', hint: 'Technical · high temperature' },
    { value: 'ASA (outdoor)', label: 'ASA', hint: 'UV resistant · outdoor' },
    { value: 'TPU (flexible)', label: 'TPU', hint: 'Flexible · rubbery' },
    { value: 'PC (polycarbonate)', label: 'PC', hint: 'High strength · technical' },
  ],
} as const;

const L = {
  pt: {
    asideTitle: 'Como funciona',
    asideText: 'Preenche o formulário e anexa o teu ficheiro. Respondemos em até 2 horas úteis no WhatsApp com o prazo e o valor.',
    points: [
      'Formatos aceitos: STL, OBJ, 3MF, STEP',
      'Sem ficheiro? Descreve a ideia — a nossa equipa trata da modelação.',
      'Orçamento e dúvidas sem compromisso.',
      'Entrega para todo Portugal.',
    ],
    name: 'Nome',
    namePh: 'O teu nome',
    phone: 'WhatsApp',
    material: 'Material',
    qty: 'Quantidade',
    file: 'Ficheiro 3D (opcional)',
    fileHint: 'Não tens ficheiro? Sem problema — descreve a ideia e nós desenhamos.',
    filePick: 'Clica para anexar STL, OBJ, 3MF ou STEP',
    desc: 'Descrição da peça',
    descPh: 'Dimensões aproximadas, cor desejada, uso final, prazo ideal…',
    submit: 'Enviar pelo WhatsApp',
    alertFill: 'Por favor, preenche o nome e o WhatsApp para continuarmos.',
    waIntro: 'Olá! Gostaria de um orçamento.',
    waName: '*Nome:*',
    waPhone: '*WhatsApp:*',
    waMaterial: '*Material:*',
    waQty: '*Quantidade:*',
    waDesc: '*Descrição:*',
    waFile: (f: string) => `Vou anexar o ficheiro *${f}* aqui no chat de seguida.`,
    waFileLink: '*Ficheiro 3D:*',
    waNoFile: 'Ainda não tenho ficheiro 3D — preciso de ajuda com a modelação.',
    fileUploading: 'a carregar…',
    fileReady: 'anexado ✓',
    fileError: 'não foi possível carregar — envia-o depois no WhatsApp',
    submitUploading: 'A carregar o ficheiro…',
    privacyPre: 'Ao enviar, concordas com a nossa',
    privacyLink: 'Política de Privacidade',
  },
  en: {
    asideTitle: 'How it works',
    asideText: "Fill in the form and attach your file. We reply within 2 business hours on WhatsApp with timeline and price.",
    points: [
      'Accepted formats: STL, OBJ, 3MF, STEP',
      "No file? Describe the idea — our team handles the modeling.",
      'Quotes and questions, no strings attached.',
      'Delivery all over Portugal.',
    ],
    name: 'Name',
    namePh: 'Your name',
    phone: 'WhatsApp',
    material: 'Material',
    qty: 'Quantity',
    file: '3D file (optional)',
    fileHint: "No file? No problem — describe your idea and we'll design it for you.",
    filePick: 'Click to attach STL, OBJ, 3MF or STEP',
    desc: 'Part description',
    descPh: 'Approximate dimensions, desired color, final use, ideal deadline…',
    submit: 'Send via WhatsApp',
    alertFill: 'Please fill in your name and WhatsApp so we can continue.',
    waIntro: "Hello! I'd like a quote.",
    waName: '*Name:*',
    waPhone: '*WhatsApp:*',
    waMaterial: '*Material:*',
    waQty: '*Quantity:*',
    waDesc: '*Description:*',
    waFile: (f: string) => `I'll attach the file *${f}* here in the chat next.`,
    waFileLink: '*3D file:*',
    waNoFile: "I don't have a 3D file yet — I need help with the modeling.",
    fileUploading: 'uploading…',
    fileReady: 'attached ✓',
    fileError: "couldn't upload — send it later on WhatsApp",
    submitUploading: 'Uploading the file…',
    privacyPre: 'By submitting, you agree to our',
    privacyLink: 'Privacy Policy',
  },
} as const;

/**
 * Formulário de orçamento — partilhado pela secção da homepage (#orcamento)
 * e pela landing page dedicada (/orcamento).
 *
 * aside=false → variante "só formulário" (form-first), usada na landing page
 * do anúncio; o grid passa a uma coluna centrada (.quote-form--solo).
 */
export default function QuoteForm({ aside = true }: { aside?: boolean }) {
  const { lang } = useLang();
  const t = L[lang];
  const materials = MATERIALS[lang];
  const router = useRouter();

  const [fileData, setFileData] = useState<{
    name: string;
    size: number;
    status: 'uploading' | 'done' | 'error';
    url?: string;
  } | null>(null);
  const [material, setMaterial] = useState<string>(MATERIALS.pt[0].value);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<Promise<string | null> | null>(null);

  useEffect(() => {
    const inCurrent = materials.some((m) => m.value === material);
    if (!inCurrent) {
      const other = MATERIALS[lang === 'pt' ? 'en' : 'pt'];
      const idx = other.findIndex((m) => m.value === material);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMaterial(materials[idx >= 0 ? idx : 0].value);
    }
  }, [lang, material, materials]);

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
    if (!file) {
      setFileData(null);
      uploadRef.current = null;
      return;
    }
    setFileData({ name: file.name, size: file.size, status: 'uploading' });
    uploadRef.current = upload(
      `orcamentos/${crypto.randomUUID().slice(0, 8)}-${file.name}`,
      file,
      { access: 'public', handleUploadUrl: '/api/upload-orcamento', multipart: true }
    )
      .then((blob) => {
        setFileData((prev) => (prev ? { ...prev, status: 'done', url: blob.url } : prev));
        return blob.url;
      })
      .catch(() => {
        setFileData((prev) => (prev ? { ...prev, status: 'error' } : prev));
        return null;
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();

    if (!name || !phone) {
      setFormError(t.alertFill);
      (document.getElementById(!name ? 'qf-name' : 'qf-phone') as HTMLInputElement | null)?.focus();
      return;
    }

    const materialVal = formData.get('material') as string;
    const qty = formData.get('qty') as string;
    const desc = (formData.get('desc') as string || '').trim();

    setSending(true);
    const fileUrl = uploadRef.current ? await uploadRef.current : null;
    setSending(false);

    const parts = [
      t.waIntro,
      ``,
      `${t.waName} ${name}`,
      `${t.waPhone} ${phone}`,
      `${t.waMaterial} ${materialVal}`,
      `${t.waQty} ${qty}`,
    ];

    if (desc) parts.push(`${t.waDesc} ${desc}`);
    if (fileUrl) parts.push(``, `${t.waFileLink} ${fileUrl}`);
    else if (fileData) parts.push(``, t.waFile(fileData.name));
    else parts.push(``, t.waNoFile);

    const message = parts.join('\n');

    try {
      sessionStorage.setItem('sparklab-quote-msg', message);
    } catch {
      // storage indisponível (modo privado estrito) — o botão usa o texto genérico
    }

    window.open(getWhatsAppLink(message), '_blank', 'noopener');
    router.push('/pedido-recebido');
  };

  return (
    <form className={`quote-form reveal${aside ? '' : ' quote-form--solo'}`} id="quote-form" noValidate onSubmit={handleSubmit}>
      {aside && (
        <div className="quote-form__aside">
          <h3>{t.asideTitle}</h3>
          <p>{t.asideText}</p>
          <ul className="quote-form__list">
            {t.points.map((point) => (
              <li key={point}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="qf">
        <div className="qf__row">
          <div className="qf__field">
            <label htmlFor="qf-name">{t.name}</label>
            <input id="qf-name" name="name" type="text" required autoComplete="name" placeholder={t.namePh} />
          </div>
          <div className="qf__field">
            <label htmlFor="qf-phone">{t.phone}</label>
            <input id="qf-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+351 912 345 678" />
          </div>
        </div>

        <div className="qf__row">
          <div className="qf__field">
            <label htmlFor="qf-material">{t.material}</label>
            <div ref={selectRef} className={`qf__select ${open ? 'qf__select--open' : ''}`}>
              <button
                type="button"
                id="qf-material"
                className="qf__select-trigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
              >
                <span className="qf__select-value">
                  {materials.find(m => m.value === material)?.label ?? materials[0].label}
                </span>
                <svg className="qf__select-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {open && (
                <ul className="qf__select-list" role="listbox">
                  {materials.map(m => (
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
            <label htmlFor="qf-qty">{t.qty}</label>
            <input id="qf-qty" name="qty" type="number" min="1" defaultValue="1" />
          </div>
        </div>

        <div className="qf__field">
          <label htmlFor="qf-file">{t.file}</label>
          <p className="text-[13px] leading-snug text-stone-500 dark:text-stone-400 -mt-1 mb-2 normal-case tracking-normal">{t.fileHint}</p>
          <label className={`qf__file ${fileData ? 'qf__file--has' : ''}`} id="qf-file-label" htmlFor="qf-file">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            <span id="qf-file-text">
              {fileData
                ? `${fileData.status === 'done' ? '✓' : fileData.status === 'error' ? '⚠' : '⏳'} ${fileData.name} (${(fileData.size / 1024 / 1024).toFixed(2)} MB) — ${
                    fileData.status === 'done'
                      ? t.fileReady
                      : fileData.status === 'error'
                        ? t.fileError
                        : t.fileUploading
                  }`
                : t.filePick}
            </span>
            <input id="qf-file" name="file" type="file" accept=".stl,.obj,.3mf,.step,.stp" onChange={handleFileChange} />
          </label>
        </div>

        <div className="qf__field">
          <label htmlFor="qf-desc">{t.desc}</label>
          <textarea id="qf-desc" name="desc" placeholder={t.descPh}></textarea>
        </div>

        {formError && (
          <p className="text-sm text-red-500 -mt-1" role="alert">{formError}</p>
        )}
        <button type="submit" className="btn btn--primary qf__submit" disabled={sending}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8z" /></svg>
          {sending ? t.submitUploading : t.submit}
        </button>
        <p className="text-xs text-stone-500 dark:text-stone-400 text-center -mt-1">
          {t.privacyPre}{' '}
          <Link href="/privacidade" className="underline underline-offset-2 hover:text-orange-600 dark:hover:text-orange-400">
            {t.privacyLink}
          </Link>.
        </p>
      </div>
    </form>
  );
}
