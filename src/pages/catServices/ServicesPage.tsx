import './ServicesPage.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTimes, FaWhatsapp, FaLeaf, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineFormatQuote } from 'react-icons/md';

import floridos1 from '../../assets/floridos1.png';
import floridos2 from '../../assets/floridos2.png';
import floridos3 from '../../assets/floridos3.png';
import floridos4 from '../../assets/floridos4.png';
import floridos5 from '../../assets/floridos5.png';
import floridos6 from '../../assets/floridos6.png';
import floridos7 from '../../assets/floridos7.png';
import floridos8 from '../../assets/floridos8.png';
import floridos9 from '../../assets/floridos9.png';

/* ────────────────────────────── BÚSQUEDA FLEXIBLE ── */

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const levenshtein = (a: string, b: string): number => {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const row = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = row[0]; row[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = row[j];
      row[j] = a[i-1] === b[j-1] ? prev : 1 + Math.min(prev, row[j], row[j-1]);
      prev = tmp;
    }
  }
  return row[n];
};

/** Un token encaja si está como substring o tiene un typo (distancia ≤ 1 en palabras ≥ 4 chars) */
const tokenFits = (token: string, text: string): boolean => {
  if (text.includes(token)) return true;
  if (token.length >= 4)
    return text.split(/\s+/).some(w => levenshtein(token, w) <= 1);
  return false;
};

/** Busca en todos los campos de un servicio */
const serviceMatches = (query: string, s: typeof SERVICES[0]): boolean => {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const haystack = normalize(
    [s.name, s.description, s.category, s.scale, ...s.includes].join(' ')
  );
  return tokens.every(t => tokenFits(t, haystack));
};

/* ────────────────────────────────────────── DATOS ── */

const SERVICES = [
  { id: 1,  name: 'Decoración Floral para Bodas',    category: 'Bodas',        scale: 'Grande',     image: floridos1, tag: 'Más solicitado',
    description: 'Transformamos tu día especial en un jardín de ensueño. Desde el arco nupcial hasta la última mesa, cada detalle cuenta una historia de amor.',
    includes: ['Arco o altar floral personalizado', 'Decoración de mesas y centros florales', 'Ramo de novia y boutonnière', 'Flores para damas y padrinos', 'Consulta previa y moodboard'] },
  { id: 2,  name: 'Ramo de Novia Personalizado',     category: 'Bodas',        scale: 'Pequeño',    image: floridos2, tag: null,
    description: 'Tu ramo es el accesorio más importante del día. Lo diseñamos contigo, flor por flor, para que sea exactamente lo que soñaste.',
    includes: ['Consulta de estilo y paleta de colores', 'Selección de flores de temporada', 'Ramo principal + boutonnière a juego', 'Entrega el día del evento'] },
  { id: 3,  name: 'Eventos Corporativos',            category: 'Corporativo',  scale: 'Grande',     image: floridos3, tag: null,
    description: 'Eleva la imagen de tu empresa con arreglos florales que impresionan. Desde lanzamientos de producto hasta galas anuales.',
    includes: ['Centros de mesa para salones de eventos', 'Arreglos para lobby y recepción', 'Decoración de escenarios y tarimas', 'Coordinación el día del evento'] },
  { id: 4,  name: 'Suscripción Floral Semanal',      category: 'Suscripción',  scale: 'Recurrente', image: floridos4, tag: 'Novedad',
    description: 'Flores frescas en tu hogar u oficina cada semana. Elige tu estilo una vez y nosotros hacemos el resto — siempre con lo mejor de la temporada.',
    includes: ['Arreglo fresco cada 7 o 14 días', 'Elección de estilo: romántico, silvestre o minimalista', 'Entrega a domicilio incluida', 'Flexibilidad para pausar o cancelar'] },
  { id: 5,  name: 'Quinceañeras & Celebraciones',    category: 'Celebración',  scale: 'Grande',     image: floridos5, tag: null,
    description: 'Un cumpleaños, una quinceañera, un grado — cada celebración merece flores que lo hagan inolvidable. Diseñamos la atmósfera completa.',
    includes: ['Decoración del salón completo', 'Corona floral o tocado', 'Bouquet y accesorios florales', 'Mesa principal y de dulces'] },
  { id: 6,  name: 'Arreglos de Simpatía',            category: 'Simpatía',     scale: 'Mediano',    image: floridos6, tag: null,
    description: 'En los momentos más difíciles, las flores dicen lo que las palabras no pueden. Preparamos arreglos con delicadeza y entrega oportuna.',
    includes: ['Corona fúnebre o arreglo de condolencias', 'Mensaje personalizado incluido', 'Entrega urgente disponible', 'Discreción y acompañamiento'] },
  { id: 7,  name: 'Espacios Comerciales & Oficinas', category: 'Corporativo',  scale: 'Mediano',    image: floridos7, tag: null,
    description: 'Una recepción con plantas bien diseñadas comunica cuidado y profesionalismo. Asesoramos, instalamos y renovamos tu espacio verde.',
    includes: ['Asesoría de espacios y selección de plantas', 'Instalación y macetería decorativa', 'Renovación mensual o bimensual', 'Mantenimiento opcional incluido'] },
  { id: 8,  name: 'Regalo Sorpresa Personalizado',   category: 'Regalo',       scale: 'Pequeño',    image: floridos8, tag: null,
    description: 'Cuando quieres sorprender de verdad. Diseñamos una experiencia completa: flores, mensaje y presentación para que el momento sea perfecto.',
    includes: ['Caja o empaque premium personalizado', 'Carta manuscrita o tarjeta', 'Flores o planta a elección', 'Entrega sorpresa con coordinación'] },
  { id: 9,  name: 'Decoración para Baby Shower',     category: 'Celebración',  scale: 'Mediano',    image: floridos9, tag: null,
    description: 'La llegada de una nueva vida merece un ambiente lleno de suavidad y color. Creamos decoraciones florales que hacen el momento aún más especial.',
    includes: ['Arco floral para fotos', 'Centros de mesa temáticos', 'Mesa de honor decorada', 'Globos y flores coordinadas'] },
];

const FILTER_OPTIONS = {
  category: ['Bodas', 'Corporativo', 'Celebración', 'Simpatía', 'Suscripción', 'Regalo'],
  scale:    ['Pequeño', 'Mediano', 'Grande', 'Recurrente'],
};

/* ───────────────────────────────────── QUOTE MODAL ── */
interface QuoteForm { name: string; phone: string; date: string; message: string; }

const QuoteModal = ({ service, onClose }: { service: typeof SERVICES[0] | null; onClose: () => void }) => {
  const [form, setForm] = useState<QuoteForm>({ name: '', phone: '', date: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => { setSent(false); setForm({ name: '', phone: '', date: '', message: '' }); }, [service]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  if (!service) return null;

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    const msg = [`🌸 *Solicitud de Cotización — Floridos*`, ``, `*Servicio:* ${service.name}`,
      `*Nombre:* ${form.name}`, `*Teléfono:* ${form.phone}`,
      form.date    ? `*Fecha del evento:* ${form.date}` : '',
      form.message ? `*Mensaje:* ${form.message}` : '',
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/573146890813?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        {!sent ? (
          <>
            <div className="modal-header">
              <span className="modal-eyebrow">Solicitar cotización</span>
              <h2 className="modal-title">{service.name}</h2>
              <p className="modal-desc">Cuéntanos un poco sobre lo que necesitas y te contactamos con una propuesta personalizada.</p>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Tu nombre *</label>
                  <input type="text" placeholder="ej. María García" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>WhatsApp / Teléfono *</label>
                  <input type="tel" placeholder="ej. 3001234567" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label><FaCalendarAlt size={11} /> Fecha del evento (opcional)</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Cuéntanos más (opcional)</label>
                <textarea rows={3} placeholder="Número de personas, estilo, colores, presupuesto aproximado..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <div className="modal-includes">
                <span className="includes-label">Este servicio incluye:</span>
                <ul>{service.includes.map((item, i) => <li key={i}><FaCheck size={9} />{item}</li>)}</ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-whatsapp" onClick={handleSubmit} disabled={!form.name || !form.phone}>
                <FaWhatsapp size={18} /> Enviar por WhatsApp
              </button>
              <p className="modal-note">Te responderemos en menos de 2 horas en horario hábil</p>
            </div>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon"><FaWhatsapp size={32} /></div>
            <h3>¡Listo! Te estamos esperando 🌸</h3>
            <p>Se abrió WhatsApp con tu mensaje. Si no se abrió, <a href="https://wa.me/573146890813" target="_blank" rel="noreferrer">haz clic aquí</a>.</p>
            <button className="btn-close-success" onClick={onClose}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────── SERVICE CARD ── */
const ServiceCard = ({ service, onQuote }: { service: typeof SERVICES[0]; onQuote: (s: typeof SERVICES[0]) => void }) => (
  <article className="service-card">
    <div className="service-image-wrapper">
      <img src={service.image} alt={service.name} className="service-image" />
      <div className="service-image-overlay" />
      {service.tag && <span className="service-tag">{service.tag}</span>}
      <span className="service-scale-badge">{service.scale}</span>
    </div>
    <div className="service-body">
      <span className="service-category">{service.category}</span>
      <h3 className="service-name">{service.name}</h3>
      <p className="service-description">{service.description}</p>
      <ul className="service-includes">
        {service.includes.slice(0, 3).map((item, i) => <li key={i}><FaCheck size={9} />{item}</li>)}
        {service.includes.length > 3 && <li className="includes-more">+{service.includes.length - 3} más incluidos</li>}
      </ul>
    </div>
    <div className="service-footer">
      <span className="service-cta-hint"><MdOutlineFormatQuote size={14} /> Precio según tu proyecto</span>
      <button className="btn-quote" onClick={() => onQuote(service)}>Cotizar este servicio</button>
    </div>
  </article>
);

/* ──────────────────────────────────── MAIN PAGE ── */
const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeService,     setActiveService]     = useState<typeof SERVICES[0] | null>(null);

  // ── búsqueda de texto ──────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');

  const activeFilters = {
    category: searchParams.get('category') || '',
    scale:    searchParams.get('scale')    || '',
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileFiltersOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const applyFilter     = (key: string, value: string) => { const p = new URLSearchParams(searchParams); value ? p.set(key, value) : p.delete(key); setSearchParams(p); };
  const clearFilter     = (key: string) => { const p = new URLSearchParams(searchParams); p.delete(key); setSearchParams(p); };
  const clearAllFilters = () => { setSearchParams({}); setSearchQuery(''); };

  const activeFilterCount = Object.values(activeFilters).filter(v => v !== '').length;

  // 1. filtrar por sidebar
  const byFilters = SERVICES.filter(s => {
    if (activeFilters.category && s.category !== activeFilters.category) return false;
    if (activeFilters.scale    && s.scale    !== activeFilters.scale)    return false;
    return true;
  });

  // 2. filtrar por búsqueda de texto
  const displayed = searchQuery.trim()
    ? byFilters.filter(s => serviceMatches(searchQuery, s))
    : byFilters;

  const activeLabel = activeFilters.category || activeFilters.scale || '';
  const totalShown  = displayed.length;

  return (
    <>
      <div className="services-page">

        {/* ── HEADER ── */}
        <div className="services-header">
          <div className="container">
            <p className="services-eyebrow"><FaLeaf size={11} /> Servicios profesionales</p>
            <h1 className="services-title">
              {activeLabel ? <><em>{activeLabel}</em></> : <>Nuestros <em>Servicios</em></>}
            </h1>
            <p className="services-subtitle">
              Cada proyecto es único — trabajamos contigo para crear exactamente lo que imaginas
            </p>

            {/* ── BARRA DE BÚSQUEDA ── */}
            <div className="svc-search-bar">
              <FiSearch size={16} className="svc-search-icon" />
              <input
                type="text"
                className="svc-search-input"
                placeholder="Busca por tipo de evento, ocasión, detalles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="svc-search-clear" onClick={() => setSearchQuery('')}>
                  <FaTimes size={11} />
                </button>
              )}
            </div>
          </div>
          <div className="header-deco-ring ring-1" />
          <div className="header-deco-ring ring-2" />
        </div>

        <div className="container services-container">

          {/* ── CHIPS ── */}
          {(activeFilterCount > 0 || searchQuery) && (
            <div className="active-filters">
              <span className="active-filters-label">Filtros:</span>
              {activeFilters.category && (
                <div className="filter-chip">
                  <span>Categoría: {activeFilters.category}</span>
                  <button onClick={() => clearFilter('category')}><FaTimes size={10} /></button>
                </div>
              )}
              {activeFilters.scale && (
                <div className="filter-chip">
                  <span>Escala: {activeFilters.scale}</span>
                  <button onClick={() => clearFilter('scale')}><FaTimes size={10} /></button>
                </div>
              )}
              {searchQuery && (
                <div className="filter-chip filter-chip--search">
                  <span>🔍 "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}><FaTimes size={10} /></button>
                </div>
              )}
              <button className="clear-all-filters" onClick={clearAllFilters}>Limpiar todo</button>
            </div>
          )}

          <div className="services-content">
            <div className={`sidebar-overlay ${mobileFiltersOpen ? 'visible' : ''}`} onClick={() => setMobileFiltersOpen(false)} />

            {/* ── SIDEBAR ── */}
            <aside className={`services-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
              <div className="sidebar-header">
                <h3>Filtros</h3>
                <button className="sidebar-close" onClick={() => setMobileFiltersOpen(false)}><FaTimes /></button>
              </div>
              <div className="filter-section">
                <h4 className="filter-title">Categoría</h4>
                <div className="filter-options">
                  {FILTER_OPTIONS.category.map(c => (
                    <label key={c} className="filter-option">
                      <input type="radio" name="category" checked={activeFilters.category === c} onChange={() => applyFilter('category', c)} />
                      <span>{c}</span>
                    </label>
                  ))}
                  {activeFilters.category && <button className="clear-filter-inline" onClick={() => clearFilter('category')}>✕ Quitar filtro</button>}
                </div>
              </div>
              <div className="filter-section">
                <h4 className="filter-title">Escala del proyecto</h4>
                <div className="filter-options">
                  {FILTER_OPTIONS.scale.map(s => (
                    <label key={s} className="filter-option">
                      <input type="radio" name="scale" checked={activeFilters.scale === s} onChange={() => applyFilter('scale', s)} />
                      <span>{s}</span>
                    </label>
                  ))}
                  {activeFilters.scale && <button className="clear-filter-inline" onClick={() => clearFilter('scale')}>✕ Quitar filtro</button>}
                </div>
              </div>
              <div className="sidebar-cta">
                <p>¿Tienes algo en mente que no ves aquí?</p>
                <button className="sidebar-cta-btn" onClick={() => setActiveService(SERVICES[0])}>
                  <FaWhatsapp size={13} /> Escríbenos
                </button>
              </div>
            </aside>

            {/* ── MAIN ── */}
            <main className="services-main">
              <div className="services-toolbar">
                <button className="mobile-filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
                  <FaFilter size={13} /> Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <span className="results-count">
                  {totalShown} {totalShown === 1 ? 'servicio' : 'servicios'}
                  {searchQuery && <> para <em>"{searchQuery}"</em></>}
                </span>
              </div>

              {displayed.length === 0 ? (
                <div className="no-results">
                  <p>
                    {searchQuery
                      ? <>No encontramos servicios para <strong>"{searchQuery}"</strong>. Intenta con otras palabras.</>
                      : <>No se encontraron servicios con los filtros seleccionados.</>
                    }
                  </p>
                  <button className="btn-clear" onClick={clearAllFilters}>Limpiar todo</button>
                </div>
              ) : (
                <div className="services-grid">
                  {displayed.map(s => <ServiceCard key={s.id} service={s} onQuote={setActiveService} />)}
                </div>
              )}

              {/* ── BANNER FINAL ── */}
              <div className="custom-banner">
                <div className="custom-banner-text">
                  <h3>¿Tienes un proyecto especial en mente?</h3>
                  <p>Cuéntanos tu idea y creamos algo único juntos — sin moldes, sin límites.</p>
                </div>
                <button className="custom-banner-btn" onClick={() => {
                  const msg = `🌸 *Floridos — Cotización personalizada*\n\nHola, me gustaría cotizar un servicio personalizado.`;
                  window.open(`https://wa.me/573146890813?text=${encodeURIComponent(msg)}`, '_blank');
                }}>
                  <FaWhatsapp size={16} /> Cotización personalizada
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>

      {activeService && <QuoteModal service={activeService} onClose={() => setActiveService(null)} />}
    </>
  );
};

export default ServicesPage;