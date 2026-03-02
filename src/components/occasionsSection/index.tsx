import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiPineTree, GiBalloons, GiDiamondRing, GiRose, GiGraduateCap, GiFlowerPot } from 'react-icons/gi';
import './styles.css';
import floridos from '../../assets/floridos.png';
import floridos2 from '../../assets/floridos2.png';
import floridos5 from '../../assets/floridos3.png';
import floridos10 from '../../assets/floridos10.png';
import floridos11 from '../../assets/floridos11.png';
import floridos12 from '../../assets/floridos12.png';

// Importa tus imágenes aquí cuando las tengas:
// import imgNavidad    from '../../assets/occasions/navidad.png';
// import imgCumpleanos from '../../assets/occasions/cumpleanos.png';

const occasions = [
  {
    id: 'navidad',
    icon: GiPineTree,
    name: 'Navidad',
    subtitle: 'Arreglos festivos & coronas',
    color: '#c84b31',
    accent: 'rgba(200, 75, 49, 0.12)',
    size: 'tall',
    image: floridos11, // reemplaza con imgNavidad
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
  },
  // {
  //   id: 'boda',
  //   icon: GiFlowerPot,
  //   name: 'Bodas',
  //   subtitle: 'El día más especial de tu vida',
  //   color: '#a8c4a2',
  //   accent: 'rgba(168, 196, 162, 0.15)',
  //   size: 'normal',
  //   image: floridos5,
  // },
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
          <Link to='/occasions' className='occasions-cta'>
            Ver todas las ocasiones <span>↗</span>
          </Link>
        </div>

        {/* ── DECORATIVE CIRCLES ── */}
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
              to={`/occasions/${occ.id}`}
              key={occ.id}
              className={`occ-card occ-card--${occ.size} ${isHovered ? 'hovered' : ''} ${isDimmed ? 'dimmed' : ''}`}
              onMouseEnter={() => setHovered(occ.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ '--accent': occ.accent, '--color': occ.color } as React.CSSProperties}
            >
              <div className='occ-card__bg' />

              {/* Imagen PNG con fondo transparente — se muestra cuando hay imagen */}
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