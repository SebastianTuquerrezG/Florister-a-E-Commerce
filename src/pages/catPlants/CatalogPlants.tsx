import './CatalogPlants.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTh, FaList, FaTimes, FaHeart, FaRegHeart, FaShoppingBasket } from 'react-icons/fa';
import { useCart }     from '../../context/CartContext';
import { useWishlist } from '../../context/WishListContext';

import planta  from '../../assets/planta.png';
import planta1 from '../../assets/planta1.png';
import planta2 from '../../assets/planta2.png';
import planta3 from '../../assets/planta3.png';
import planta4 from '../../assets/planta4.png';
import planta5 from '../../assets/planta5.png';
import planta6 from '../../assets/planta6.png';
import planta7 from '../../assets/planta7.png';
import planta8 from '../../assets/planta8.png';

const PRODUCTS = [
  { id: 201, name: "Pothos Dorado",          type: "Potos",           location: "Interior", care: "Fácil",    price: 18000, image: planta,  description: "Planta trepadora de fácil cuidado, ideal para colgar",           color: "rojo", occasion:"navidad", rating: 4.7, inStock: true,  category: "plantas", slug: "pothos-dorado" },
  { id: 202, name: "Suculenta Mix",          type: "Suculentas",      location: "Interior", care: "Fácil",    price: 12000, image: planta1, description: "Arreglo de suculentas variadas en maceta decorativa",            color: "rojo", occasion:"navidad", rating: 4.8, inStock: true,  category: "plantas", slug: "suculenta-mix" },
  { id: 203, name: "Helecho Boston",         type: "Helechos",        location: "Interior", care: "Moderado", price: 25000, image: planta2, description: "Helecho frondoso ideal para interiores húmedos",                 color: "rojo", occasion:"navidad", rating: 4.5, inStock: true,  category: "plantas", slug: "helecho-boston" },
  { id: 204, name: "Monstera Deliciosa",     type: "Tropicales",      location: "Interior", care: "Moderado", price: 65000, image: planta3, description: "La reina de las plantas de interior, hojas grandes y elegantes", color: "rojo", occasion:"navidad", rating: 4.9, inStock: true,  category: "plantas", slug: "monstera-deliciosa" },
  { id: 205, name: "Cactus Barrel",          type: "Cactus",          location: "Interior", care: "Fácil",    price: 15000, image: planta4, description: "Cactus barril de bajo mantenimiento y larga vida",               color: "rojo", occasion:"navidad", rating: 4.6, inStock: true,  category: "plantas", slug: "cactus-barrel" },
  { id: 206, name: "Lirio de la Paz",        type: "Lirio de la Paz", location: "Interior", care: "Fácil",    price: 32000, image: planta5, description: "Purifica el aire y florece en poca luz",                         color: "rojo", occasion:"navidad", rating: 4.8, inStock: true,  category: "plantas", slug: "lirio-paz" },
  { id: 207, name: "Palmera Areca",          type: "Palmeras",        location: "Interior", care: "Moderado", price: 48000, image: planta6, description: "Palmera tropical que aporta frescura a cualquier espacio",       color: "rojo", occasion:"navidad", rating: 4.7, inStock: false, category: "plantas", slug: "palmera-areca" },
  { id: 208, name: "Cactus San Pedro",       type: "Cactus",          location: "Exterior", care: "Fácil",    price: 22000, image: planta7, description: "Cactus columnar resistente, perfecto para exteriores soleados",  color: "rojo", occasion:"navidad", rating: 4.4, inStock: true,  category: "plantas", slug: "cactus-san-pedro" },
  { id: 209, name: "Orquídea Phalaenopsis",  type: "Tropicales",      location: "Interior", care: "Experto",  price: 55000, image: planta8, description: "La orquídea más popular, flores duraderas y elegantes",          color: "rojo", occasion:"navidad", rating: 5.0, inStock: true,  category: "plantas", slug: "orquidea-phalaenopsis" },
];

const FILTER_OPTIONS = {
  type:     ["Suculentas", "Cactus", "Helechos", "Potos", "Lirio de la Paz", "Tropicales", "Palmeras"],
  location: ["Interior", "Exterior"],
  care:     ["Fácil", "Moderado", "Experto"],
};

const CARE_COLOR: Record<string, string> = {
  'Fácil':    'rgba(33,79,55,0.07)',
  'Moderado': 'rgba(212,168,67,0.1)',
  'Experto':  'rgba(200,75,49,0.08)',
};

type ViewMode   = 'grid' | 'list';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'name' | 'rating';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

/* ════════════════════════════════════════ PAGE ═══ */

const CatalogPlants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode,          setViewMode]          = useState<ViewMode>('grid');
  const [sortBy,            setSortBy]            = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilters = {
    type:     searchParams.get('type')     || '',
    location: searchParams.get('location') || '',
    occasion: searchParams.get('occasion') || '',
    color:    searchParams.get('color')    || '',
    care:     searchParams.get('care')     || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    minRating: searchParams.get('minRating') || '',
    inStock:  searchParams.get('inStock') === 'true',
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileFiltersOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const applyFilter     = (key: string, value: string) => { const p = new URLSearchParams(searchParams); value ? p.set(key, value) : p.delete(key); setSearchParams(p); };
  const clearFilter     = (key: string) => { const p = new URLSearchParams(searchParams); p.delete(key); setSearchParams(p); };
  const clearAllFilters = () => setSearchParams({});

  const activeFilterCount = [
    activeFilters.type,
    activeFilters.occasion,
    activeFilters.color,
    activeFilters.care,
    activeFilters.location,
    activeFilters.priceMin,
    activeFilters.priceMax,
    activeFilters.minRating,
    activeFilters.inStock ? 'true' : '',
  ].filter(v => (typeof v === 'string' ? v !== '' : v === true)).length;

  const filtered = PRODUCTS.filter(p => {
    if (activeFilters.type     && p.type     !== activeFilters.type)     return false;
    if (activeFilters.location && p.location !== activeFilters.location) return false;
    if (activeFilters.care     && p.care     !== activeFilters.care)     return false;
    if (activeFilters.occasion && p.occasion !== activeFilters.occasion) return false;
    if (activeFilters.color    && p.color    !== activeFilters.color)    return false;
    if (activeFilters.priceMin && p.price < parseInt(activeFilters.priceMin)) return false;
    if (activeFilters.priceMax && p.price > parseInt(activeFilters.priceMax)) return false;
    if (activeFilters.minRating && p.rating < parseFloat(activeFilters.minRating)) return false;
    if (activeFilters.inStock  && !p.inStock) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':  return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name':       return a.name.localeCompare(b.name);
      case 'rating':     return b.rating - a.rating;
      default: return 0;
    }
  });

  const activeLabel = activeFilters.type || activeFilters.location || activeFilters.care || '';

  return (
    <div className="plants-page">

      {/* ── HEADER ── */}
      <div className="plants-header">
        <div className="container">
          <h1 className="plants-title">
            {activeLabel ? <><em>{activeLabel}</em></> : <>Catálogo de <em>Plantas</em></>}
          </h1>
          <p className="plants-subtitle">
            {filtered.length} {filtered.length === 1 ? 'planta encontrada' : 'plantas encontradas'}
          </p>
        </div>
      </div>

      <div className="container plants-container">

        {/* ── CHIPS ── */}
        {activeFilterCount > 0 && (
          <div className="active-filters">
            <span className="active-filters-label">Filtros:</span>
            {activeFilters.type     && <div className="filter-chip"><span>Tipo: {activeFilters.type}</span><button onClick={() => clearFilter('type')}><FaTimes size={10}/></button></div>}
            {activeFilters.location && <div className="filter-chip"><span>Lugar: {activeFilters.location}</span><button onClick={() => clearFilter('location')}><FaTimes size={10}/></button></div>}
            {activeFilters.care     && <div className="filter-chip"><span>Cuidado: {activeFilters.care}</span><button onClick={() => clearFilter('care')}><FaTimes size={10}/></button></div>}
            {activeFilters.occasion && <div className="filter-chip"><span>Occasion: {activeFilters.occasion}</span><button onClick={() => clearFilter('occasion')}><FaTimes size={10}/></button></div>}
            {activeFilters.color    && <div className="filter-chip"><span>Color: {activeFilters.color}</span><button onClick={() => clearFilter('color')}><FaTimes size={10}/></button></div>}
            {activeFilters.inStock  && <div className="filter-chip"><span>En stock</span><button onClick={() => clearFilter('inStock')}><FaTimes size={10}/></button></div>}
            {activeFilters.minRating && <div className="filter-chip"><span>Rating mínimo: {activeFilters.minRating}</span><button onClick={() => clearFilter('minRating')}><FaTimes size={10}/></button></div>}
            {activeFilters.priceMin && (<div className="filter-chip"><span>Desde {formatPrice(parseInt(activeFilters.priceMin))}</span><button onClick={() => clearFilter('priceMin')}><FaTimes size={10}/></button></div>)}
            {activeFilters.priceMax && (<div className="filter-chip"><span>Hasta {formatPrice(parseInt(activeFilters.priceMax))}</span><button onClick={() => clearFilter('priceMax')}><FaTimes size={10}/></button></div>)}
            <button className="clear-all-filters" onClick={clearAllFilters}>Limpiar todo</button>
          </div>
        )}

        <div className="plants-content">

          <div className={`sidebar-overlay ${mobileFiltersOpen ? 'visible' : ''}`} onClick={() => setMobileFiltersOpen(false)} />

          {/* ── SIDEBAR ── */}
          <aside className={`plants-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3>Filtros</h3>
              <button className="sidebar-close" onClick={() => setMobileFiltersOpen(false)}><FaTimes /></button>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Por Tipo</h4>
              <div className="filter-options">
                {FILTER_OPTIONS.type.map(t => (
                  <label key={t} className="filter-option">
                    <input type="radio" name="type" checked={activeFilters.type === t} onChange={() => applyFilter('type', t)} />
                    <span>{t}</span>
                  </label>
                ))}
                {activeFilters.type && <button className="clear-filter-inline" onClick={() => clearFilter('type')}>✕ Quitar filtro</button>}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Ubicación</h4>
              <div className="filter-options">
                {FILTER_OPTIONS.location.map(l => (
                  <label key={l} className="filter-option">
                    <input type="radio" name="location" checked={activeFilters.location === l} onChange={() => applyFilter('location', l)} />
                    <span>{l}</span>
                  </label>
                ))}
                {activeFilters.location && <button className="clear-filter-inline" onClick={() => clearFilter('location')}>✕ Quitar filtro</button>}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Nivel de Cuidado</h4>
              <div className="filter-options">
                {FILTER_OPTIONS.care.map(c => (
                  <label key={c} className="filter-option">
                    <input type="radio" name="care" checked={activeFilters.care === c} onChange={() => applyFilter('care', c)} />
                    <span>{c}</span>
                  </label>
                ))}
                {activeFilters.care && <button className="clear-filter-inline" onClick={() => clearFilter('care')}>✕ Quitar filtro</button>}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Disponibilidad</h4>
              <label className="filter-option">
                <input type="checkbox" checked={activeFilters.inStock} onChange={e => applyFilter('inStock', e.target.checked ? 'true' : '')} />
                <span>Solo en stock</span>
              </label>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Rango de Precio</h4>          
              <div className="price-range-wrap">
                <div className="price-inputs">
                  <div className="price-input-group">
                    <label>Mínimo</label>
                    <div className="price-input-inner">
                      <span>$</span>
                      <input
                        type="number"
                        min={0}
                        step={5000}
                        placeholder="0"
                        value={activeFilters.priceMin}
                        onChange={e => applyFilter('priceMin', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="price-range-sep">—</div>
                  <div className="price-input-group">
                    <label>Máximo</label>
                    <div className="price-input-inner">
                      <span>$</span>
                      <input
                        type="number"
                        min={0}
                        step={5000}
                        placeholder="∞"
                        value={activeFilters.priceMax}
                        onChange={e => applyFilter('priceMax', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
          
                <div className="price-shortcuts">
                  {[
                    { label: '< $20k',   min: '',      max: '20000'  },
                    { label: '$20–50k',  min: '20000', max: '50000'  },
                    { label: '$50–100k', min: '50000', max: '100000' },
                    { label: '> $100k',  min: '100000',max: ''       },
                  ].map(({ label, min, max }) => {
                    const active = activeFilters.priceMin === min && activeFilters.priceMax === max;
                    return (
                      <button
                        key={label}
                        className={`price-shortcut${active ? ' active' : ''}`}
                        onClick={() => {
                          const p = new URLSearchParams(searchParams);
                          min ? p.set('priceMin', min) : p.delete('priceMin');
                          max ? p.set('priceMax', max) : p.delete('priceMax');
                          setSearchParams(p);
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>    

            <div className="filter-section">
              <h4 className="filter-title">Calificación Mínima</h4>
              <div className="filter-options">
                {[
                  { value: '4.5', label: '⭐⭐⭐⭐⭐ 4.5+' },
                  { value: '4',   label: '⭐⭐⭐⭐  4.0+' },
                  { value: '3',   label: '⭐⭐⭐   3.0+' },
                ].map(({ value, label }) => (
                  <label key={value} className="filter-option">
                    <input
                      type="radio"
                      name="minRating"
                      checked={activeFilters.minRating === value}
                      onChange={() => applyFilter('minRating', value)}
                    />
                    <span className="rating-option-label">{label}</span>
                  </label>
                ))}
                {activeFilters.minRating && (
                  <button className="clear-filter-inline" onClick={() => clearFilter('minRating')}>
                    ✕ Quitar filtro
                  </button>
                )}
              </div>
            </div>        
          </aside>

          {/* ── MAIN ── */}
          <main className="plants-main">
            <div className="plants-toolbar">
              <button className="mobile-filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
                <FaFilter size={13} /> Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <div className="toolbar-controls">
                <span className="results-count">{sorted.length} plantas</span>
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                  <option value="featured">Destacadas</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="name">Nombre: A–Z</option>
                  <option value="rating">Mejor Calificación</option>
                </select>
                <div className="view-toggle">
                  <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} title="Cuadrícula"><FaTh size={14}/></button>
                  <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} title="Lista"><FaList size={14}/></button>
                </div>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="no-results">
                <p>No se encontraron plantas con los filtros seleccionados.</p>
                <button className="btn-clear-results" onClick={clearAllFilters}>Limpiar filtros</button>
              </div>
            ) : (
              <div className={`products-${viewMode}`}>
                {sorted.map(product => (
                  <PlantCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════ CARD ═══ */

interface PlantCardProps {
  product: typeof PRODUCTS[0];
  viewMode: ViewMode;
}

const PlantCard = ({ product, viewMode }: PlantCardProps) => {
  const { addItem, isInCart }        = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const inCart     = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, slug: product.slug });
  };

  const handleWish = () => {
    toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, slug: product.slug });
  };

  /* ── LISTA ── */
  if (viewMode === 'list') {
    return (
      <div className="product-card-list">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" />
          {!product.inStock && <span className="out-of-stock-badge">Agotado</span>}
        </div>

        <div className="product-info-list">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-meta">
            <span className="product-type">{product.type}</span>
            <span className="product-separator">•</span>
            <span className="product-occasion">{product.location}</span>
            <span className="product-separator">•</span>
            <span className="product-type" style={{ background: CARE_COLOR[product.care] }}>{product.care}</span>
          </div>
          <div className="product-rating">
            {'⭐'.repeat(Math.round(product.rating))}
            <span className="rating-value">{product.rating}</span>
          </div>
        </div>

        <div className="product-actions-list">
          <p className="product-price">{formatPrice(product.price)}</p>
          <button
            className={`btn-cart${inCart ? ' in-cart' : ''}`}
            onClick={handleCart}
            disabled={!product.inStock}
          >
            <FaShoppingBasket size={13} />
            {inCart ? 'En el carrito ✓' : product.inStock ? 'Añadir al carrito' : 'Agotado'}
          </button>
          <button
            className={`btn-wish${inWishlist ? ' active' : ''}`}
            onClick={handleWish}
            aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {inWishlist ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </button>
        </div>
      </div>
    );
  }

  /* ── GRID ── */
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {!product.inStock && <span className="out-of-stock-badge">Agotado</span>}
        <span className="care-badge" style={{ background: CARE_COLOR[product.care] }}>{product.care}</span>

        {/* Corazón flotante */}
        <button
          className={`btn-wish-overlay${inWishlist ? ' active' : ''}`}
          onClick={handleWish}
          aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {inWishlist ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-type">{product.type}</span>
          <span className="product-occasion">{product.location}</span>
        </div>
        <div className="product-rating">
          {'⭐'.repeat(Math.round(product.rating))}
          <span className="rating-value">{product.rating}</span>
        </div>
        <div className="product-footer">
          <p className="product-price">{formatPrice(product.price)}</p>
          <button
            className={`btn-cart${inCart ? ' in-cart' : ''}`}
            onClick={handleCart}
            disabled={!product.inStock}
          >
            {inCart ? '✓ En carrito' : product.inStock ? 'Agregar' : 'Agotado'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogPlants;