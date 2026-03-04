import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiFlowerPot } from 'react-icons/gi';
import { TbArrowUpRight } from 'react-icons/tb';
import './styles.css';
import storyImg from '../../assets/planta6.png';

const stats = [
  { value: '12+',  label: 'Años de experiencia' },
  { value: '4K+',  label: 'Clientes felices'    },
  { value: '200+', label: 'Diseños únicos'      },
];

const OurStorySection = () => {
  const [visible,    setVisible]    = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setBtnVisible(true), 700);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div  className='story-wrapper'>
      <section
        className={`story-section ${visible ? 'in-view' : ''}`}
        ref={sectionRef}
      >
        {/* Decoracion de fondo */}
        <div className='story-bg-circle story-bg-circle--1' />
        <div className='story-bg-circle story-bg-circle--2' />

        {/* IMAGEN */}
        <div className='story-image-side'>
          <div className='story-image-frame'>
            <img src={storyImg} alt="Nuestra historia" className='story-img' />
            <div className='story-badge'>
              <GiFlowerPot size={18} />
              <span>Desde 2012</span>
            </div>
          </div>

          <div className='story-stats'>
            {stats.map((s, i) => (
              <div key={i} className='story-stat'>
                <span className='story-stat__value'>{s.value}</span>
                <span className='story-stat__label'>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TEXTO */}
        <div className='story-text-side'>
          <span className='story-eyebrow'>Quiénes somos</span>
          <div className='story-accent-line' />

          <h2 className='story-title'>
            Nacimos del amor<br />
            por <em>cada flor</em>
          </h2>

          <p className='story-body'>
            Floridos nació en Popayán con una sola idea: que cada bouquet
            cuente una historia. Lo que empezó como un pequeño taller
            familiar se convirtió en el lugar donde la gente de nuestra
            ciudad trae sus momentos más especiales.
          </p>

          <p className='story-body story-body--light'>
            Trabajamos con flores frescas de cultivos locales, diseñamos
            con alma y entregamos con cuidado. Porque para nosotros, cada
            arreglo es una carta de amor.
          </p>

          {/* BOTON EMERGENTE */}
          <div className={`story-cta-wrap ${btnVisible ? 'revealed' : ''}`}>
            <div className='story-cta-line' />
            <Link to='/our-story' className='story-cta-btn'>
              <span className='story-cta-btn__text'>Conoce nuestra historia</span>
              <span className='story-cta-btn__icon'>
                <TbArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStorySection;