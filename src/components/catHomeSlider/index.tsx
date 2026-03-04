import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Scrollbar  } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './styles.css';
import floridos1 from '../../assets/floridos1.png';
import floridos5 from '../../assets/floridos5.png';
import floridos6 from '../../assets/floridos6.png';
import floridos7 from '../../assets/floridos7.png';
import floridos8 from '../../assets/floridos8.png';
import floridos9 from '../../assets/floridos9.png';

import planta from '../../assets/planta.png';
import planta2 from '../../assets/planta2.png';
import planta3 from '../../assets/planta3.png';
import planta4 from '../../assets/planta4.png';
import planta5 from '../../assets/planta5.png';
import planta6 from '../../assets/planta6.png';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

const flores: Product[] = [
  { id: 1, name: 'Duo Floridos',        price: 75000,  originalPrice: 80000,  image: floridos1, badge: 'Popular' },
  { id: 2, name: 'Bouchon Rosa',        price: 114000,                        image: floridos5 },
  { id: 3, name: 'Cilindro Inspirados', price: 115000, originalPrice: 130000, image: floridos6, badge: 'Nuevo' },
  { id: 4, name: 'Bouquet Felicidad',   price: 46000,                         image: floridos7 },
  { id: 5, name: 'Amatista',            price: 60000,                         image: floridos8 },
  { id: 6, name: 'Bouquet Floridos1',   price: 55000,  originalPrice: 60000,  image: floridos9, badge: 'Oferta' },
];

const plantas: Product[] = [
  { id: 7,  name: 'Cactus Barril Dorado',      price: 18000,                        image: planta },
  { id: 8,  name: 'Suculenta Echeveria',       price: 12000,                        image: planta2, badge: 'Popular' },
  { id: 9,  name: 'Suculenta Haworthia Cebra', price: 25000, originalPrice: 30000,  image: planta3 },
  { id: 10, name: 'Cactus Euphorbia trigona',  price: 25000,                        image: planta4, badge: 'Nuevo' },
  { id: 11, name: 'Cactus Echinopsis',         price: 25000,                        image: planta5 },
  { id: 12, name: 'Planta Zamioculca',         price: 20000, originalPrice: 38000,  image: planta6, badge: 'Oferta' },
];

const formatPrice = (price: number) =>
  `$${price.toLocaleString('es-CO')}`;

const CatHomeSlider = () => {
  const [activeTab, setActiveTab] = useState<'flores' | 'plantas'>('flores');
  const swiperRef = useRef<SwiperType | null>(null);

  const products = activeTab === 'flores' ? flores : plantas;
  const title     = activeTab === 'flores' ? 'Nuestras Flores' : 'Nuestras Plantas';
  const label     = activeTab === 'flores' ? 'Colección floral' : 'Colección verde';

  return (
    <section className='cat-section'>
      <div className='container'>

        {/* ── TABS ── */}
        <div className='cat-tabs'>
          <button 
            className={`cat-tab ${activeTab === 'flores' ? 'active' : ''}`} 
            onClick={() => setActiveTab('flores')}>
            Flores
          </button>
          <button
            className={`cat-tab ${activeTab === 'plantas' ? 'active' : ''}`}
            onClick={() => setActiveTab('plantas')}>
            Plantas
          </button>
        </div>

        {/* ── HEADER ── */}
        <div className='cat-header'>
          <div className='cat-title-block'>
            <span className='cat-label'>{label}</span>
            <h2 className='cat-title'>{title}</h2>
          </div>
          <button className='cat-see-all'>Ver todo</button>
        </div>

        {/* ── SLIDER ── */}
        <Swiper
          key={activeTab}
          modules={[Navigation, A11y, Scrollbar]}
          navigation={true}
          scrollbar={{ draggable: true, hide: false }}
          mousewheel={{ forceToAxis: true, enabled: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          slidesPerView={3}
          spaceBetween={24}
          grabCursor={true}
          simulateTouch={true}
          allowTouchMove={true}
          breakpoints={{
            0:   { slidesPerView: 1.2, spaceBetween: 16 },
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024:{ slidesPerView: 3,   spaceBetween: 24 },
          }}
          className='cat-swiper'>
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className='product-card'>
                <div className='product-card__image-wrapper'>
                  <img src={product.image} alt={product.name} />
                  {product.badge && (
                    <span className='product-card__badge'>{product.badge}</span>
                  )}
                  <button className='product-card__add'>+ Agregar al carrito</button>
                </div>
                <div className='product-card__info'>
                  <p className='product-card__name'>{product.name}</p>
                  <p className='product-card__price'>
                    {formatPrice(product.price)}
                    {product.originalPrice && (
                      <span className='original'>{formatPrice(product.originalPrice)}</span>
                    )}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CatHomeSlider