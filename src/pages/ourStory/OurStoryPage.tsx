import './OurStoryPage.css';
import { useEffect, useRef } from 'react';
import { FaWhatsapp, FaInstagram, FaLeaf } from 'react-icons/fa';
import { GiFlowerEmblem } from 'react-icons/gi';

import floridos1  from '../../assets/floridos1.png';
import floridos2  from '../../assets/floridos2.png';
import floridos3  from '../../assets/floridos3.png';
import floridos10 from '../../assets/floridos10.png';
import planta3    from '../../assets/planta3.png';
import planta6    from '../../assets/planta6.png';

/* ── Scroll-reveal hook ── */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* ── Reveal wrapper ── */
const Reveal = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* ── TIMELINE DATA ── */
const TIMELINE = [
  {
    year: '2017',
    label: 'El comienzo',
    title: 'Nos conocimos entre flores',
    body: 'Nos cruzamos en Popayán casi por accidente — en un mercado de flores de domingo. Ahí empezó todo: primero una conversación, luego una amistad, y muy pronto algo mucho más profundo.',
    image: floridos1,
    side: 'left',
  },
  {
    year: '2019',
    label: 'Bogotá',
    title: 'La ciudad nos enseñó a soñar',
    body: 'Decidimos estudiar juntos en Bogotá — ella diseño floral, él administración de empresas. Fueron años de aprender, crecer y descubrir que nuestros sueños apuntaban al mismo lugar.',
    image: floridos2,
    side: 'right',
  },
  {
    year: '2021',
    label: 'El regreso',
    title: 'Popayán nos llamó de vuelta',
    body: 'Con la maleta llena de conocimiento y el corazón lleno de propósito, volvimos a la ciudad blanca. No solo veníamos a quedarnos — veníamos a construir algo nuestro, con raíces en esta tierra.',
    image: planta6,
    side: 'left',
  },
  {
    year: '2022',
    label: 'Floridos nace',
    title: 'Del amor a las flores, al amor hecho empresa',
    body: 'Abrimos las puertas de Floridos con poco más que pasión y dedicación. Cada arreglo que salía de nuestras manos llevaba una historia. Poco a poco, Popayán nos abrió las puertas.',
    image: floridos3,
    side: 'right',
  },
  {
    year: 'Hoy',
    label: 'Presente',
    title: '7 años juntos, miles de momentos floridos',
    body: 'Seguimos siendo esa pareja enamorada del primer domingo en el mercado. Solo que ahora también somos socios, diseñadores, floristas y los mejores cómplices del otro. Floridos es nuestra historia de amor hecha realidad.',
    image: floridos10,
    side: 'left',
  },
];

/* ── STATS ── */
const STATS = [
  { value: '7+',   label: 'Años juntos' },
  { value: '3+',   label: 'Años de Floridos' },
  { value: '4K+',  label: 'Arreglos entregados' },
  { value: '100%', label: 'Hecho con amor' },
];

/* ═══════════════════════════════════════ PAGE ═══ */
const OurStoryPage = () => (
  <div className="story-page">

    {/* ══ HERO ══ */}
    <section className="story-hero">
      <div className="story-hero-bg">
        <img src={floridos2} alt="Floridos" className="story-hero-img" />
        <div className="story-hero-overlay" />
      </div>
      <div className="container story-hero-content">
        <Reveal>
          <p className="story-eyebrow"><FaLeaf size={11} /> Nuestra historia</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="story-hero-title">
            Dos personas,<br />
            un mismo <em>sueño</em>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="story-hero-sub">
            Floridos nació de una historia de amor — y cada flor que diseñamos<br className="br-desk" /> lleva un pedacito de esa historia adentro.
          </p>
        </Reveal>
        <div className="story-hero-scroll-hint">
          <span />
        </div>
      </div>
    </section>

    {/* ══ INTRO ══ */}
    <section className="story-intro">
      <div className="container story-intro-inner">
        <Reveal className="story-intro-quote">
          <GiFlowerEmblem className="quote-deco-icon" />
          <blockquote>
            "Empezamos entre flores sin saber que las flores iban a ser nuestra vida entera."
          </blockquote>
          <cite>— Valentina & Sebastián, fundadores</cite>
        </Reveal>
        <Reveal className="story-intro-text" delay={120}>
          <p>
            Somos Valentina y Sebastián — una pareja de Popayán que lleva siete años construyendo
            una vida juntos, y tres de esos años construyendo también una empresa.
          </p>
          <p>
            Floridos no es solo nuestra forma de ganarnos la vida; es nuestra forma de
            devolverle a esta ciudad la belleza que ella siempre nos ha dado. Cada arreglo,
            cada planta, cada entrega lleva el cuidado de quien trabaja con amor.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ══ STATS ══ */}
    <section className="story-stats">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={i} className="stat-item" delay={i * 80}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ══ TIMELINE ══ */}
    <section className="story-timeline">
      <div className="container">
        <Reveal className="section-heading">
          <p className="section-eyebrow">Cómo llegamos aquí</p>
          <h2 className="section-title">El camino <em>florido</em></h2>
        </Reveal>

        <div className="timeline">
          {/* línea central */}
          <div className="timeline-line" />

          {TIMELINE.map((item, i) => (
            <Reveal
              key={i}
              className={`timeline-item timeline-item--${item.side}`}
              delay={i * 60}
            >
              {/* dot */}
              <div className="timeline-dot">
                <span>{item.year}</span>
              </div>

              {/* card */}
              <div className="timeline-card">
                <div className="timeline-card-image">
                  <img src={item.image} alt={item.title} />
                  <span className="timeline-label">{item.label}</span>
                </div>
                <div className="timeline-card-body">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-body">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ══ VALORES ══ */}
    <section className="story-values">
      <div className="container story-values-inner">
        <Reveal className="values-image-col">
          <div className="values-img-stack">
            <img src={planta3}   alt="planta" className="vimg vimg-back" />
            <img src={floridos1} alt="flores" className="vimg vimg-front" />
            <div className="values-badge">
              <FaLeaf size={14} />
              <span>Desde 2022<br />en Popayán</span>
            </div>
          </div>
        </Reveal>

        <div className="values-text-col">
          <Reveal>
            <p className="section-eyebrow light">Lo que nos mueve</p>
            <h2 className="section-title light">Floridos es más<br />que una <em>floristería</em></h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="values-para">
              Creemos que las flores tienen el poder de decir lo que las palabras no pueden.
              Por eso cada arreglo que hacemos lo pensamos como si fuera para alguien que amamos.
            </p>
          </Reveal>

          <div className="values-list">
            {[
              { title: 'Amor por el oficio', body: 'Diseñamos cada pieza con la misma emoción que el primer día. Para nosotros no hay pedidos pequeños — hay momentos que merecen flores perfectas.' },
              { title: 'Raíces en Popayán', body: 'Nos fue bien en Bogotá, pero elegimos volver. Esta ciudad nos formó y queremos aportar a su florecimiento — en el sentido más literal.' },
              { title: 'Personalización real', body: 'Nada aquí es de molde. Escuchamos, preguntamos, entendemos. Y luego creamos algo que solo tú podrías pedir.' },
            ].map((v, i) => (
              <Reveal key={i} className="value-item" delay={i * 80 + 100}>
                <div className="value-dot" />
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ══ CTA FINAL ══ */}
    <section className="story-cta">
      <div className="story-cta-bg">
        <img src={floridos3} alt="flores" className="cta-bg-img" />
        <div className="cta-overlay" />
      </div>
      <div className="container story-cta-content">
        <Reveal>
          <h2 className="cta-title">¿Quieres ser parte<br />de nuestra historia?</h2>
          <p className="cta-sub">
            Cada cliente que confía en nosotros escribe un capítulo nuevo.<br className="br-desk" />
            Cuéntanos qué necesitas y lo hacemos florecer juntos.
          </p>
          <div className="cta-btns">
            <a
              href="https://wa.me/573146890813"
              target="_blank"
              rel="noreferrer"
              className="cta-btn cta-btn--wa"
            >
              <FaWhatsapp size={17} /> Escríbenos
            </a>
            <a href="/catalogo" className="cta-btn cta-btn--outline">
              Ver catálogo
            </a>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ══ INSTAGRAM STRIP (decorativo) ══ */}
    <section className="story-instagram">
      <div className="container">
        <Reveal className="ig-inner">
          <FaInstagram size={18} />
          <span>Síguenos en Instagram</span>
          <a href="https://instagram.com/floristeriafloridos" target="_blank" rel="noreferrer">
            @floristeriafloridos
          </a>
        </Reveal>
      </div>
    </section>

  </div>
);

export default OurStoryPage;