import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiPineTree, GiBalloons, GiDiamondRing, GiRose, GiGraduateCap } from 'react-icons/gi';
import './styles.css';
import floridos from '../../assets/floridos.png';
import floridos2 from '../../assets/floridos2.png';
import floridos10 from '../../assets/floridos10.png';
import floridos11 from '../../assets/floridos11.png';
import floridos12 from '../../assets/floridos12.png';

const occasions = [
  {
    id: 'navidad',
    icon: GiPineTree,
    name: 'Navidad',
    subtitle: 'Arreglos festivos & coronas',
    color: '#c84b31',
    accent: 'rgba(200, 75, 49, 0.12)',
    size: 'tall',
    image: floridos11,
    // → catálogo de flores sin filtro de ocasión específico para navidad
    // (no existe en FILTER_OPTIONS), mandamos al catálogo general
    href: '/catalogo?occasion=Navidad',
  },
  {
    id: 'cumpleanos',
    icon: GiBalloons,
    name: 'Cumpleaños',
    subtitle: 'Bouquets coloridos & sorpresas',
    color: '#d4a843',
    accent: 'rgba(212, 168, 67, 0.12)',
    size: 'tall',
    image: floridos12,
    // "Cumpleaños" coincide exactamente con el valor en PRODUCTS
    href: '/catalogo?occasion=Cumplea%C3%B1os',
  },
  {
    id: 'aniversario',
    icon: GiDiamondRing,
    name: 'Aniversario',
    subtitle: 'Rosas & arreglos románticos',
    color: '#c9637a',
    accent: 'rgba(201, 99, 122, 0.12)',
    size: 'wide',
    image: floridos10,
    href: '/catalogo?occasion=Aniversario',
  },
  {
    id: 'amor',
    icon: GiRose,
    name: 'San Valentín',
    subtitle: 'Ramos de amor eterno',
    color: '#e05a5a',
    accent: 'rgba(224, 90, 90, 0.12)',
    size: 'normal',
    image: floridos,
    // "Solo porque si" es la ocasión más cercana a regalo romántico sin evento
    href: '/catalogo?occasion=Solo%20porque%20si',
  },
  {
    id: 'graduacion',
    icon: GiGraduateCap,
    name: 'Graduación',
    subtitle: 'Celebra el logro más grande',
    color: '#7aacde',
    accent: 'rgba(90, 143, 201, 0.12)',
    size: 'normal',
    image: floridos2,
    href: '/catalogo?occasion=Cumplea%C3%B1os',
  },
];

const OccasionsSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className='occasions-section'>

      {/* ── HEADER ── */}
      <div className='occasions-header'>
        <div className='occasions-header-text'>
          <span className='occasions-eyebrow'>Para cada momento</span>
          <h2 className='occasions-title'>
            ¿Cuál es<br />
            <em>tu ocasión?</em>
          </h2>
          <p className='occasions-subtitle'>
            Encuentra el arreglo perfecto diseñado especialmente
            para la celebración que tienes en mente.
          </p>
          <Link to='/catalogo' className='occasions-cta'>
            Ver todas las ocasiones <span>↗</span>
          </Link>
        </div>

        <div className='occasions-deco'>
          <div className='deco-ring deco-ring--1' />
          <div className='deco-ring deco-ring--2' />
          <div className='deco-ring deco-ring--3' />
        </div>
      </div>

      {/* ── GRID ── */}
      <div className='occasions-grid'>
        {occasions.map((occ) => {
          const Icon = occ.icon;
          const isHovered = hovered === occ.id;
          const isDimmed  = hovered !== null && !isHovered;
          return (
            <Link
              to={occ.href}                          // ← URL de catálogo con filtro
              key={occ.id}
              className={`occ-card occ-card--${occ.size} ${isHovered ? 'hovered' : ''} ${isDimmed ? 'dimmed' : ''}`}
              onMouseEnter={() => setHovered(occ.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ '--accent': occ.accent, '--color': occ.color } as React.CSSProperties}
            >
              <div className='occ-card__bg' />

              {occ.image && (
                <img src={occ.image} alt={occ.name} className='occ-card__floral-img' />
              )}

              <div className='occ-card__content'>
                <div className='occ-card__icon-wrap'>
                  <Icon size={22} />
                </div>
                <div className='occ-card__info'>
                  <h3 className='occ-card__name'>{occ.name}</h3>
                  <p className='occ-card__sub'>{occ.subtitle}</p>
                </div>
                <span className='occ-card__arrow'>→</span>
              </div>
            </Link>
          );
        })}
      </div>

    </section>
  );
};

export default OccasionsSection;