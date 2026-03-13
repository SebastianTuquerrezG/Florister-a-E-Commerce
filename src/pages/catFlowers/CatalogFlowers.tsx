import './CatalogFlowers.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTh, FaList, FaTimes, FaHeart, FaRegHeart, FaShoppingBasket } from 'react-icons/fa';
import { useCart }     from '../../context/CartContext';
import { useWishlist } from '../../context/WishListContext';

const PRODUCTS = [
  { id: 1,  name: "Rosas Rojas Premium",       type: "Rosas",     occasion: "Aniversario",     color: "Rojo",       price: 45000, image: "/images/rosas-rojas.jpg",           description: "Docena de rosas rojas colombianas de alta calidad",      rating: 4.8, inStock: true,  category: "flores", slug: "rosas-rojas-premium" },
  { id: 2,  name: "Tulipanes Arcoíris",        type: "Tulipanes", occasion: "Cumpleaños",      color: "Multicolor", price: 38000, image: "/images/tulipanes.jpg",             description: "Hermoso arreglo de tulipanes en colores variados",       rating: 4.6, inStock: true,  category: "flores", slug: "tulipanes-arcoiris" },
  { id: 3,  name: "Orquídea Blanca Elegante",  type: "Orquideas", occasion: "Boda",            color: "Blanco",     price: 65000, image: "/images/orquidea.jpg",              description: "Orquídea phalaenopsis blanca en maceta decorativa",      rating: 4.9, inStock: true,  category: "flores", slug: "orquidea-blanca-elegante" },
  { id: 4,  name: "Girasoles Alegres",         type: "Girasoles", occasion: "Solo porque si",  color: "Amarillo",   price: 32000, image: "/images/girasoles.jpg",             description: "Ramo de girasoles frescos y radiantes",                  rating: 4.7, inStock: true,  category: "flores", slug: "girasoles-alegres" },
  { id: 5,  name: "Lirios Rosados",            type: "Lirios",    occasion: "Simpatia",        color: "Rosa",       price: 42000, image: "/images/lirios.jpg",                description: "Elegante arreglo de lirios orientales rosados",          rating: 4.5, inStock: false, category: "flores", slug: "lirios-rosados" },
  { id: 6,  name: "Rosas Blancas Novia",       type: "Rosas",     occasion: "Boda",            color: "Blanco",     price: 55000, image: "/images/rosas-blancas.jpg",         description: "Bouquet de rosas blancas ideal para novias",             rating: 4.9, inStock: true,  category: "flores", slug: "rosas-blancas-novia" },
  { id: 7,  name: "Tulipanes Amarillos",       type: "Tulipanes", occasion: "Solo porque si",  color: "Amarillo",   price: 35000, image: "/images/tulipanes-amarillos.jpg",   description: "Tulipanes holandeses amarillos brillantes",              rating: 4.6, inStock: true,  category: "flores", slug: "tulipanes-amarillos" },
  { id: 8,  name: "Orquídea Morada Premium",   type: "Orquideas", occasion: "Aniversario",     color: "Morado",     price: 70000, image: "/images/orquidea-morada.jpg",       description: "Exótica orquídea morada de colección",                   rating: 5.0, inStock: true,  category: "flores", slug: "orquidea-morada-premium" },
  { id: 9,  name: "Girasoles y Margaritas",    type: "Girasoles", occasion: "Navidad",         color: "Multicolor", price: 30000, image: "/images/girasoles-margaritas.jpg",  description: "Ramo mixto de girasoles y margaritas frescas",           rating: 4.4, inStock: true,  category: "flores", slug: "girasoles-margaritas" },
  { id: 10, name: "Lirios Blancos Puros",      type: "Lirios",    occasion: "San Valentín",    color: "Blanco",     price: 48000, image: "/images/lirios-blancos.jpg",        description: "Arreglo de lirios blancos orientales puros y elegantes", rating: 4.8, inStock: true,  category: "flores", slug: "lirios-blancos-puros" },
];

const FILTER_OPTIONS = {
  type:     ["Rosas", "Tulipanes", "Orquideas", "Girasoles", "Lirios"],
  occasion: ["Boda", "Cumpleaños", "Aniversario", "Simpatia", "Solo porque si", "Navidad", "San Valentín"],
  color:    ["Rojo", "Blanco", "Amarillo", "Rosa", "Morado", "Multicolor"],
};

type ViewMode   = 'grid' | 'list';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'name' | 'rating';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode,          setViewMode]          = useState<ViewMode>('grid');
  const [sortBy,            setSortBy]            = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilters = {
    type:      searchParams.get('type')      || '',
    occasion:  searchParams.get('occasion')  || '',
    color:     searchParams.get('color')     || '',
    priceMin:  searchParams.get('priceMin')  || '',
    priceMax:  searchParams.get('priceMax')  || '',
    minRating: searchParams.get('minRating') || '',
    inStock:   searchParams.get('inStock') === 'true',
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
    activeFilters.priceMin,
    activeFilters.priceMax,
    activeFilters.minRating,
    activeFilters.inStock ? 'true' : '',
  ].filter(v => v !== '').length;

  const filtered = PRODUCTS.filter(p => {
    if (activeFilters.type      && p.type     !== activeFilters.type)                       return false;
    if (activeFilters.occasion  && p.occasion !== activeFilters.occasion)                   return false;
    if (activeFilters.color     && p.color    !== activeFilters.color)                      return false;
    if (activeFilters.priceMin  && p.price  <  parseInt(activeFilters.priceMin))            return false;
    if (activeFilters.priceMax  && p.price  >  parseInt(activeFilters.priceMax))            return false;
    if (activeFilters.minRating && p.rating <  parseFloat(activeFilters.minRating))         return false;
    if (activeFilters.inStock   && !p.inStock)                                              return false;
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

  const activeLabel = activeFilters.type || activeFilters.occasion || activeFilters.color || '';

  return (
    <div className="catalog-page">

      {/* ── HEADER ── */}
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">
            {activeLabel ? <><em>{activeLabel}</em></> : <>Catálogo de <em>Flores</em></>}
          </h1>
          <p className="catalog-subtitle">
            {filtered.length} {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>
        </div>
      </div>

      <div className="container catalog-container">

        {/* ── CHIPS ── */}
        {activeFilterCount > 0 && (
          <div className="active-filters">
            <span className="active-filters-label">Filtros:</span>
            {activeFilters.type      && <div className="filter-chip"><span>Tipo: {activeFilters.type}</span><button onClick={() => clearFilter('type')}><FaTimes size={10}/></button></div>}
            {activeFilters.occasion  && <div className="filter-chip"><span>Ocasión: {activeFilters.occasion}</span><button onClick={() => clearFilter('occasion')}><FaTimes size={10}/></button></div>}
            {activeFilters.color     && <div className="filter-chip"><span>Color: {activeFilters.color}</span><button onClick={() => clearFilter('color')}><FaTimes size={10}/></button></div>}
            {activeFilters.priceMin  && <div className="filter-chip"><span>Desde ${activeFilters.priceMin}</span><button onClick={() => clearFilter('priceMin')}><FaTimes size={10}/></button></div>}
            {activeFilters.priceMax  && <div className="filter-chip"><span>Hasta ${activeFilters.priceMax}</span><button onClick={() => clearFilter('priceMax')}><FaTimes size={10}/></button></div>}
            {activeFilters.minRating && <div className="filter-chip"><span>Desde {activeFilters.minRating}★</span><button onClick={() => clearFilter('minRating')}><FaTimes size={10}/></button></div>}
            {activeFilters.inStock   && <div className="filter-chip"><span>En stock</span><button onClick={() => clearFilter('inStock')}><FaTimes size={10}/></button></div>}
            <button className="clear-all-filters" onClick={clearAllFilters}>Limpiar todo</button>
          </div>
        )}

        <div className="catalog-content">

          <div className={`sidebar-overlay ${mobileFiltersOpen ? 'visible' : ''}`} onClick={() => setMobileFiltersOpen(false)} />

          {/* ── SIDEBAR ── */}
          <aside className={`catalog-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3>Filtros</h3>
              <button className="sidebar-close" onClick={() => setMobileFiltersOpen(false)}><FaTimes /></button>
            </div>

            {/* Tipo */}
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

            {/* Ocasión */}
            <div className="filter-section">
              <h4 className="filter-title">Por Ocasión</h4>
              <div className="filter-options">
                {FILTER_OPTIONS.occasion.map(o => (
                  <label key={o} className="filter-option">
                    <input type="radio" name="occasion" checked={activeFilters.occasion === o} onChange={() => applyFilter('occasion', o)} />
                    <span>{o}</span>
                  </label>
                ))}
                {activeFilters.occasion && <button className="clear-filter-inline" onClick={() => clearFilter('occasion')}>✕ Quitar filtro</button>}
              </div>
            </div>

            {/* Color */}
            <div className="filter-section">
              <h4 className="filter-title">Por Color</h4>
              <div className="filter-options">
                {FILTER_OPTIONS.color.map(c => (
                  <label key={c} className="filter-option">
                    <input type="radio" name="color" checked={activeFilters.color === c} onChange={() => applyFilter('color', c)} />
                    <span>{c}</span>
                  </label>
                ))}
                {activeFilters.color && <button className="clear-filter-inline" onClick={() => clearFilter('color')}>✕ Quitar filtro</button>}
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="filter-section">
              <h4 className="filter-title">Disponibilidad</h4>
              <label className="filter-option">
                <input type="checkbox" checked={activeFilters.inStock} onChange={e => applyFilter('inStock', e.target.checked ? 'true' : '')} />
                <span>Solo en stock</span>
              </label>
            </div>

            {/* ── PRECIO ── */}
            <div className="filter-section">
              <h4 className="filter-title">Rango de Precio</h4>
              <div className="price-range-wrap">
                <div className="price-inputs">
                  <div className="price-input-group">
                    <label>Mínimo</label>
                    <div className="price-input-inner">
                      <span>$</span>
                      <input
                        type="number" min={0} step={5000} placeholder="0"
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
                        type="number" min={0} step={5000} placeholder="∞"
                        value={activeFilters.priceMax}
                        onChange={e => applyFilter('priceMax', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="price-shortcuts">
                  {[
                    { label: '< $20k',   min: '',       max: '20000'  },
                    { label: '$20–50k',  min: '20000',  max: '50000'  },
                    { label: '$50–100k', min: '50000',  max: '100000' },
                    { label: '> $100k',  min: '100000', max: ''       },
                  ].map(({ label, min, max }) => {
                    const isActive = activeFilters.priceMin === min && activeFilters.priceMax === max;
                    return (
                      <button
                        key={label}
                        className={`price-shortcut${isActive ? ' active' : ''}`}
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

            {/* ── CALIFICACIÓN ── */}
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
                      type="radio" name="minRating"
                      checked={activeFilters.minRating === value}
                      onChange={() => applyFilter('minRating', value)}
                    />
                    <span className="rating-option-label">{label}</span>
                  </label>
                ))}
                {activeFilters.minRating && (
                  <button className="clear-filter-inline" onClick={() => clearFilter('minRating')}>✕ Quitar filtro</button>
                )}
              </div>
            </div>

          </aside>{/* ← cierre correcto del aside, DESPUÉS de todos los filtros */}

          {/* ── MAIN ── */}
          <main className="catalog-main">
            <div className="catalog-toolbar">
              <button className="mobile-filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
                <FaFilter size={13} /> Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <div className="toolbar-controls">
                <span className="results-count">{sorted.length} productos</span>
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="name">Nombre: A–Z</option>
                  <option value="rating">Mejor Calificación</option>
                </select>
                <div className="view-toggle">
                  <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} title="Cuadrícula"><FaTh size={14} /></button>
                  <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} title="Lista"><FaList size={14} /></button>
                </div>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="no-results">
                <p>No se encontraron productos con los filtros seleccionados.</p>
                <button className="btn-clear-results" onClick={clearAllFilters}>Limpiar filtros</button>
              </div>
            ) : (
              <div className={`products-${viewMode}`}>
                {sorted.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
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

interface ProductCardProps {
  product: typeof PRODUCTS[0];
  viewMode: ViewMode;
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const { addItem, isInCart }        = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const inCart     = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, slug: product.slug });
  const handleWishlist  = () => toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, slug: product.slug });

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
            <span className="product-occasion">{product.occasion}</span>
          </div>
          <div className="product-rating">
            {'⭐'.repeat(Math.round(product.rating))}
            <span className="rating-value">{product.rating}</span>
          </div>
        </div>
        <div className="product-actions-list">
          <p className="product-price">{formatPrice(product.price)}</p>
          <button className={`btn-cart${inCart ? ' in-cart' : ''}`} onClick={handleAddToCart} disabled={!product.inStock}>
            <FaShoppingBasket size={13} />
            {inCart ? 'En el carrito ✓' : product.inStock ? 'Añadir al carrito' : 'Agotado'}
          </button>
          <button className={`btn-wish${inWishlist ? ' active' : ''}`} onClick={handleWishlist} aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
            {inWishlist ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {!product.inStock && <span className="out-of-stock-badge">Agotado</span>}
        <button className={`btn-wish-overlay${inWishlist ? ' active' : ''}`} onClick={handleWishlist} aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
          {inWishlist ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span className="product-type">{product.type}</span>
          <span className="product-occasion">{product.occasion}</span>
        </div>
        <div className="product-rating">
          {'⭐'.repeat(Math.round(product.rating))}
          <span className="rating-value">{product.rating}</span>
        </div>
        <div className="product-footer">
          <p className="product-price">{formatPrice(product.price)}</p>
          <button className={`btn-cart${inCart ? ' in-cart' : ''}`} onClick={handleAddToCart} disabled={!product.inStock}>
            {inCart ? '✓ En carrito' : product.inStock ? 'Agregar' : 'Agotado'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;