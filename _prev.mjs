import fs from 'fs';
const src = fs.readFileSync('src/app/api/stripe-webhook/route.ts','utf8');
const SITE_URL='https://www.sparklab3d.pt', CONTACT_EMAIL='sparklabimpress3d@outlook.pt';
const grab = n => src.match(new RegExp(`function ${n}\([^)]*\): string \{[\s\S]*?\n\}`))[0];
let code = ['emailHeader','emailFooter','emailShell'].map(grab).join('\n\n');
// Remover anotações de tipo (é TS; new Function só aceita JS).
code = code
  .replace(/function (\w+)\(([^)]*)\): string/g, (m,n,a) =>
    `function ${n}(${a.replace(/:\s*'pt'\s*\|\s*'en'/g,'').replace(/:\s*string/g,'')})`)
  .replace(/\(href: string, label: string\)/g, '(href, label)');
const f = new Function('SITE_URL','CONTACT_EMAIL','INSTAGRAM_URL','WHATSAPP_URL',
  code + '\nreturn emailShell;');
const shell = f(SITE_URL, CONTACT_EMAIL, 'https://www.instagram.com/sparklabs.3d','https://wa.me/351916853802');

const corpo = `
    <h2 style="color:#ea580c;margin:0 0 6px;font-size:22px">Olá Alex, obrigado! 🧡</h2>
    <p style="color:#57534e;margin:0 0 18px">Recebemos a tua encomenda e o pagamento está confirmado. Aqui fica o resumo:</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:6px">
      <tr><td style="padding:8px 0;border-bottom:1px solid #e7e5e4">Candeeiro Dragão × 1</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e5e4;text-align:right">44,90 €</td></tr>
    </table>
    <p style="text-align:right;margin:0 0 24px;font-size:16px"><strong>Total pago: 44,90 €</strong></p>
    <h3 style="margin:0 0 8px">O que acontece a seguir</h3>
    <ol style="margin:0 0 24px;padding-left:20px;color:#44403c;line-height:1.7">
      <li>Começamos a produzir a(s) tua(s) peça(s) nas nossas Bambu Lab P1S.</li>
      <li>Avisamos-te no WhatsApp com o prazo e o número de seguimento.</li>
      <li>Enviamos via CTT registado para a tua morada, com tracking.</li>
    </ol>
    <p style="margin:0 0 10px;color:#57534e">Alguma dúvida sobre a tua encomenda?</p>
    <a href="https://wa.me/351916853802" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:bold;padding:11px 22px;border-radius:999px">Falar no WhatsApp</a>
    <p style="color:#a8a29e;font-size:12px;margin:30px 0 0">SparkLab · Impressão 3D sob encomenda, em Portugal</p>`;

const out = 'C:/Users/Mrshi/Downloads/preview-email-sparklab.html';
fs.writeFileSync(out, `<!doctype html><meta charset="utf-8"><title>Email SparkLab</title>${shell(corpo,'pt')}`);
console.log('escrito:', out, '·', Math.round(fs.statSync(out).size/1024)+'KB');
