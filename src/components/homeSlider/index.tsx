import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import './styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import floridos1 from '../../assets/floridos.png';
import floridos2 from '../../assets/floridos2.png';
import floridos3 from '../../assets/floridos3.png';
import floridos4 from '../../assets/floridos4.png';

const words = ['momento', 'celebración', 'persona', 'hogar', 'evento', 'recuerdo', 'instante', 'ocasión', 'día especial', 'detalle único'];

const HomeSlider = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % words.length);
      setKey(prev => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='hero-section'>

      {/* ── TEXT SIDE 60% ── */}
      <div className='hero-text'>
        <span className='hero-label'>Floristería artesanal</span>
        <div className='hero-accent'></div>

        <h1 className='hero-heading'>
          <span className='static-text'>Encuentra las flores</span>
          <span className='static-text'>perfectas para cada</span>
          <span className='changing-word-wrapper'>
            <span key={key} className='changing-word'>
              {words[wordIndex]}
            </span>
          </span>
        </h1>

        <p className='hero-subtext'>
          Diseños florales únicos hechos con amor, pensados para hacer especial
          cada momento de tu vida.
        </p>

        <div className='hero-cta'>
          <button className='btn-primary'>Ver colección</button>
          <button className='btn-secondary'>
            Nuestros servicios <span>→</span>
          </button>
        </div>
      </div>

      {/* ── SLIDER SIDE 40% ── */}
      <div className='hero-slider'>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className='mySwiper'
        >
          <SwiperSlide>
            <img
              src={floridos4}
              alt="Slider 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img src={floridos1} alt="Slider 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={floridos3} alt="Slider 3" />
          </SwiperSlide>
            <SwiperSlide>
            <img src={floridos2} alt="Slider 5" />
          </SwiperSlide>
        </Swiper>
      </div>

    </section>
  )
};

export default HomeSlider