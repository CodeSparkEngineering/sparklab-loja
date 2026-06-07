'use client';

const DISCORD_INVITE = 'https://discord.gg/VJcZrPb3';

const PERKS = [
  { icon: '📦', title: 'Arquivos STL', desc: 'Liberados toda semana' },
  { icon: '🎯', title: 'Dicas e tutoriais', desc: 'Slicer, materiais, acabamento' },
  { icon: '💬', title: 'Suporte direto', desc: 'Canais privados com a equipe' },
  { icon: '⚡', title: 'Acesso antecipado', desc: 'Novidades e descontos' },
];

export default function Comunidade() {
  return (
    <section className="section comunidade-section" id="comunidade">
      <div className="container">
        <div className="cmt-head">
          <span className="eyebrow eyebrow--orange">
            <span className="dot"></span> Comunidade premium
          </span>
          <h2 className="h2">Discord da SparkLab</h2>
          <p className="cmt-sub">
            Arquivos STL exclusivos, dicas práticas e suporte direto da nossa equipe.
          </p>
        </div>

        <div className="cmt-card">
          <div className="cmt-glow" aria-hidden="true"></div>

          <div className="cmt-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.074.074 0 0 0-.079.037c-.34.6-.719 1.385-.984 2.001a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-1-2.001.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.17 4.369a.07.07 0 0 0-.032.027C1.978 9.046 1.114 13.58 1.538 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </div>

          <ul className="cmt-perks">
            {PERKS.map((p) => (
              <li key={p.title} className="cmt-perk">
                <span className="cmt-perk-emoji">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="cmt-price-row">
            <div className="cmt-price">
              <span className="cmt-price-amount">$19</span>
              <span className="cmt-price-period">/mês</span>
            </div>
            <span className="cmt-price-tag">Sem fidelidade</span>
          </div>

          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="cmt-cta"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.074.074 0 0 0-.079.037c-.34.6-.719 1.385-.984 2.001a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-1-2.001.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 5.17 4.369a.07.07 0 0 0-.032.027C1.978 9.046 1.114 13.58 1.538 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Entrar na comunidade
          </a>

          <p className="cmt-foot">Acesso liberado em segundos</p>
        </div>
      </div>
    </section>
  );
}
