import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'SparkLab — Impressão 3D sob encomenda em Portugal';

// Card de partilha (WhatsApp / redes / Google). Gerado dinamicamente.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a0a10 0%, #14140f 55%, #1a0d04 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* halo laranja */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.45) 0%, rgba(249,115,22,0) 70%)',
            display: 'flex',
          }}
        />

        {/* marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #fb923c, #ea580c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
            }}
          >
            🖨️
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#fff', letterSpacing: -1 }}>
            Spark<span style={{ color: '#f97316' }}>Lab</span>
          </div>
        </div>

        {/* título */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Impressão 3D sob encomenda.
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 34, color: '#b8b8c0', maxWidth: 880 }}>
            Miniaturas, porta-chaves e peças com acabamento profissional — entrega para todo o Portugal.
          </div>
        </div>

        {/* rodapé */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: '#f97316', fontWeight: 600 }}>
          <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: '#f97316' }} />
          sparklab-loja.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
