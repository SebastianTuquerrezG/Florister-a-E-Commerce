import { Link } from 'react-router-dom';
import { MdOutlineCelebration, MdLocalShipping } from 'react-icons/md';
import { RiScissors2Line } from 'react-icons/ri';
import './styles.css';

const services = [
  {
    icon: <MdOutlineCelebration size={32} />,
    tag: 'Eventos',
    title: 'Decoración & Eventos',
    description: 'Transformamos tus celebraciones en momentos únicos. Bodas, eventos corporativos, quinceañeras y baby showers con arreglos florales que cuentan tu historia.',
    items: ['Planeacion de bodas', 'Eventos Corporativos', 'Quinceañeras', 'Baby Showers'],
    link: '/services/events',
  },
  {
    icon: <MdLocalShipping size={32} />,
    tag: 'Envíos',
    title: 'Entrega a Domicilio',
    description: 'Llevamos la naturaleza hasta tu puerta. Envíos el mismo día, programados, suscripciones mensuales y empaques regalo para ocasiones especiales.',
    items: ['El Mismo Día', 'Programados', 'Suscripciones Mensuales', 'Empaques de Regalo'],
    link: '/services/delivery',
  },
  {
    icon: <RiScissors2Line size={32} />,
    tag: 'Personalizado',
    title: 'Diseños a Medida',
    description: 'Creamos el arreglo de tus sueños. Consultas personalizadas, talleres de floricultura y composiciones únicas diseñadas especialmente para ti.',
    items: ['Arreglos Personalizados', 'Clases de Taller', 'Consultas de Diseño', 'Tarjetas Personalizadas'],
    link: '/services/custom',
  },
];

const HomeServices = () => {
  return (
    <section className='services-section'>
      <div className='container'>

        {/* ── HEADER ── */}
        <div className='services-header'>
          <span className='services-label'>Lo que ofrecemos</span>
          <div className='hero-accent' style={{ margin: '8px 0' }}></div>
          <h2 className='services-title'>Nuestros Servicios</h2>
          <p className='services-subtitle'>
            Cada detalle floral cuenta una historia. Descubre cómo podemos
            hacer especial tu próximo momento.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div className='services-grid'>
          {services.map((service, i) => (
            <div key={i} className='service-card'>
              <div className='service-card__top'>
                <div className='service-card__icon'>{service.icon}</div>
                <span className='service-card__tag'>{service.tag}</span>
              </div>

              <h3 className='service-card__title'>{service.title}</h3>
              <p className='service-card__desc'>{service.description}</p>

              <ul className='service-card__items'>
                {service.items.map((item) => (
                  <li key={item} className='service-card__item'>
                    <span className='service-card__dot' />
                    {item}
                  </li>
                ))}
              </ul>

              <Link to={service.link} className='service-card__cta'>
                Ver más <span>→</span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeServices;