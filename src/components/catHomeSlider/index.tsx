import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Scrollbar } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './styles.css';
import { useCart }     from '../../context/CartContext';
import { useWishlist } from '../../context/WishListContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import floridos1 from '../../assets/floridos1.png';
import floridos5 from '../../assets/floridos5.png';
import floridos6 from '../../assets/floridos6.png';
import floridos7 from '../../assets/floridos7.png';
import floridos8 from '../../assets/floridos8.png';
import floridos9 from '../../assets/floridos9.png';

import planta  from '../../assets/planta.png';
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
  category: string;
}

const flores: Product[] = [
  { id: 1, name: 'Duo Floridos',        price: 75000,  originalPrice: 80000,  image: floridos1, badge: 'Popular', category: 'flores' },
  { id: 2, name: 'Bouchon Rosa',        price: 114000,                        image: floridos5,                  category: 'flores' },
  { id: 3, name: 'Cilindro Inspirados', price: 115000, originalPrice: 130000, image: floridos6, badge: 'Nuevo',   category: 'flores' },
  { id: 4, name: 'Bouquet Felicidad',   price: 46000,                         image: floridos7,                  category: 'flores' },
  { id: 5, name: 'Amatista',            price: 60000,                         image: floridos8,                  category: 'flores' },
  { id: 6, name: 'Bouquet Floridos1',   price: 55000,  originalPrice: 60000,  image: floridos9, badge: 'Oferta',  category: 'flores' },
];

const plantas: Product[] = [
  { id: 101, name: 'Cactus Barril Dorado',       price: 18000,                       image: planta,  category: 'plantas' },
  { id: 102, name: 'Suculenta Echeveria',         price: 12000,                       image: planta2, badge: 'Popular', category: 'plantas' },
  { id: 103, name: 'Suculenta Haworthia Cebra',   price: 25000, originalPrice: 30000, image: planta3, category: 'plantas' },
  { id: 104, name: 'Cactus Euphorbia trigona',    price: 25000,                       image: planta4, badge: 'Nuevo',   category: 'plantas' },
  { id: 105, name: 'Cactus Echinopsis',           price: 25000,                       image: planta5, category: 'plantas' },
  { id: 106, name: 'Planta Zamioculca',           price: 20000, originalPrice: 38000, image: planta6, badge: 'Oferta',  category: 'plantas' },
];

const formatPrice = (price: number) =>
  `$${price.toLocaleString('es-CO')}`;

/* ─────────────────────────────────── PRODUCT CARD ─── */

const SliderCard = ({ product }: { product: Product }) => {
  const { addItem, isInCart }        = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const inCart     = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    product.image,
      category: product.category,
    });
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    product.image,
      category: product.category,
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img src={product.image} alt={product.name} />

        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}

        {/* Corazón — siempre visible si está en wishlist, al hover si no */}
        <button
          className={`product-card__wish${inWishlist ? ' active' : ''}`}
          onClick={handleWish}
          aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {inWishlist ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
        </button>

        {/* Botón carrito — sube al hover */}
        <button
          className={`product-card__add${inCart ? ' in-cart' : ''}`}
          onClick={handleAdd}
        >
          {inCart ? '✓ En el carrito' : '+ Agregar al carrito'}
        </button>
      </div>

      <div className="product-card__info">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">
          {formatPrice(product.price)}
          {product.originalPrice && (
            <span className="original">{formatPrice(product.originalPrice)}</span>
          )}
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────── MAIN COMPONENT ─── */

const CatHomeSlider = () => {
  const [activeTab, setActiveTab] = useState<'flores' | 'plantas'>('flores');
  const swiperRef = useRef<SwiperType | null>(null);

  const products = activeTab === 'flores' ? flores : plantas;
  const title    = activeTab === 'flores' ? 'Nuestras Flores' : 'Nuestras Plantas';
  const label    = activeTab === 'flores' ? 'Colección floral' : 'Colección verde';

  return (
    <section className="cat-section">
      <div className="container">

        {/* ── TABS ── */}
        <div className="cat-tabs">
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
        <div className="cat-header">
          <div className="cat-title-block">
            <span className="cat-label">{label}</span>
            <h2 className="cat-title">{title}</h2>
          </div>
          <button className="cat-see-all">Ver todo</button>
        </div>

        {/* ── SLIDER ── */}
        <Swiper
          key={activeTab}
          modules={[Navigation, A11y, Scrollbar]}
          navigation={true}
          scrollbar={{ draggable: true, hide: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          slidesPerView={3}
          spaceBetween={24}
          grabCursor={true}
          simulateTouch={true}
          allowTouchMove={true}
          breakpoints={{
            0:    { slidesPerView: 1.2, spaceBetween: 16 },
            640:  { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3,   spaceBetween: 24 },
          }}
          className="cat-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <SliderCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CatHomeSlider;