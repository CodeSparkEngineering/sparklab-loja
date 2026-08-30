import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export const runtime = 'nodejs';

/**
 * Autoriza uploads de ficheiros 3D do formulário de orçamento (client upload
 * do @vercel/blob: o browser envia o ficheiro DIRETAMENTE para o Blob store,
 * sem passar pelo servidor — por isso não há limite de 4,5 MB do body).
 *
 * Precisa de um Blob store no projeto Vercel (Storage → Create → Blob);
 * a variável BLOB_READ_WRITE_TOKEN é adicionada automaticamente ao criar.
 * Sem o token, o upload falha e o formulário usa o fallback (o cliente
 * envia o ficheiro no próprio WhatsApp, como antes).
 */

const ALLOWED_EXT = [
  '.stl', '.obj', '.3mf', '.step', '.stp',
  // Sem ficheiro 3D, o cliente pode anexar uma foto/desenho da ideia
  // (o FAQ promete-o). HEIC: fotos tiradas no iPhone.
  '.jpg', '.jpeg', '.png', '.webp', '.heic', '.pdf',
];
const MAX_BYTES = 100 * 1024 * 1024; // 100 MB — STL grandes cabem à vontade

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const lower = pathname.toLowerCase();
        if (!lower.startsWith('orcamentos/')) {
          throw new Error('Destino inválido.');
        }
        if (!ALLOWED_EXT.some((ext) => lower.endsWith(ext))) {
          throw new Error('Formato não suportado (aceites: STL, OBJ, 3MF, STEP, JPG, PNG, WebP, HEIC, PDF).');
        }
        return {
          maximumSizeInBytes: MAX_BYTES,
          // STL/STEP chegam com content-types imprevisíveis (octet-stream,
          // model/stl…) — a validação fiável é a extensão, feita acima.
        };
      },
      onUploadCompleted: async () => {
        // O link segue na mensagem de WhatsApp do cliente — nada a fazer aqui.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    console.error('[upload-orcamento] erro:', msg || err);
    // Só devolvemos ao cliente as NOSSAS mensagens de validação; erros
    // internos (ex.: token em falta) ficam genéricos — não expõem o estado
    // da configuração do servidor.
    const isValidation = msg.startsWith('Formato não suportado') || msg === 'Destino inválido.';
    return NextResponse.json(
      { error: isValidation ? msg : 'Upload indisponível de momento.' },
      { status: 400 }
    );
  }
}
