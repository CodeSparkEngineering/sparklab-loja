'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: { noImage: 'Sem imagem', image: 'Imagem', thumb: 'Miniatura' },
  en: { noImage: 'No image', image: 'Image', thumb: 'Thumbnail' },
} as const;

export default function ProductGallery({ images, alt }: { images: string[], alt: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const { lang } = useLang();
  const t = L[lang];

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-stone-100 rounded-2xl flex items-center justify-center border border-stone-200">
        <span className="text-stone-400">{t.noImage}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
        <Image
          src={images[activeImage]}
          alt={`${alt} - ${t.image} ${activeImage + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(idx)}
              aria-current={activeImage === idx}
              className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${
                activeImage === idx ? 'border-orange-500' : 'border-transparent opacity-60 hover:opacity-100'
              } bg-black/40`}
            >
              <Image
                src={img}
                alt={`${alt} - ${t.thumb} ${idx + 1}`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
