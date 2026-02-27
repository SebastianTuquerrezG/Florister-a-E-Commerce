import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Scrollbar  } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './styles.css';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

const flores: Product[] = [
  { id: 1, name: 'Rosas Rojas',       price: 35000, originalPrice: 42000, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=500&fit=crop', badge: 'Popular' },
  { id: 2, name: 'Tulipanes Rosa',    price: 28000,                        image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc11?w=400&h=500&fit=crop' },
  { id: 3, name: 'Orquídeas Blancas', price: 55000, originalPrice: 65000,  image: 'https://images.unsplash.com/photo-1566907225472-514215c9e6a5?w=400&h=500&fit=crop', badge: 'Nuevo' },
  { id: 4, name: 'Girasoles',         price: 22000,                        image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=500&fit=crop' },
  { id: 5, name: 'Lirios Morados',    price: 40000,                        image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=500&fit=crop' },
  { id: 6, name: 'Peonías',           price: 48000, originalPrice: 56000,  image: 'https://images.unsplash.com/photo-1444930694458-01babf71870c?w=400&h=500&fit=crop', badge: 'Oferta' },
];

const plantas: Product[] = [
  { id: 7,  name: 'Pothos',         price: 18000,                        image: 'https://images.unsplash.com/photo-1585351923407-d4b6a252d65c?w=400&h=500&fit=crop' },
  { id: 8,  name: 'Suculenta Mix',  price: 12000,                        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=500&fit=crop', badge: 'Popular' },
  { id: 9,  name: 'Helecho Boston', price: 25000, originalPrice: 30000,  image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=500&fit=crop' },
  { id: 10, name: 'Monstera',       price: 65000,                        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=500&fit=crop', badge: 'Nuevo' },
  { id: 11, name: 'Cactus Barrel',  price: 15000,                        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=500&fit=crop' },
  { id: 12, name: 'Paz Lily',       price: 32000, originalPrice: 38000,  image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7a?w=400&h=500&fit=crop', badge: 'Oferta' },
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
            onClick={() => setActiveTab('flores')}
          >
            Flores
          </button>
          <button
            className={`cat-tab ${activeTab === 'plantas' ? 'active' : ''}`}
            onClick={() => setActiveTab('plantas')}
          >
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
          className='cat-swiper'
        >
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