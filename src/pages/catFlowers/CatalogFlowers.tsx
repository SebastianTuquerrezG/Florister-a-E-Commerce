import './CatalogFlowers.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTh, FaList, FaTimes } from 'react-icons/fa';
import Button from '@mui/material/Button';

const PRODUCTS = [
  { id: 1, name: "Rosas Rojas Premium",     type: "Rosas",     occasion: "Aniversario",    color: "Rojo",       price: 45000, image: "/images/rosas-rojas.jpg",     description: "Docena de rosas rojas colombianas de alta calidad",        rating: 4.8, inStock: true },
  { id: 2, name: "Tulipanes Arcoíris",       type: "Tulipanes", occasion: "Cumpleaños",      color: "Multicolor", price: 38000, image: "/images/tulipanes.jpg",        description: "Hermoso arreglo de tulipanes en colores variados",          rating: 4.6, inStock: true },
  { id: 3, name: "Orquídea Blanca Elegante", type: "Orquideas", occasion: "Boda",            color: "Blanco",     price: 65000, image: "/images/orquidea.jpg",         description: "Orquídea phalaenopsis blanca en maceta decorativa",         rating: 4.9, inStock: true },
  { id: 4, name: "Girasoles Alegres",        type: "Girasoles", occasion: "Solo porque si",  color: "Amarillo",   price: 32000, image: "/images/girasoles.jpg",        description: "Ramo de girasoles frescos y radiantes",                    rating: 4.7, inStock: true },
  { id: 5, name: "Lirios Rosados",           type: "Lirios",    occasion: "Simpatia",        color: "Rosa",       price: 42000, image: "/images/lirios.jpg",           description: "Elegante arreglo de lirios orientales rosados",            rating: 4.5, inStock: false },
  { id: 6, name: "Rosas Blancas Novia",      type: "Rosas",     occasion: "Boda",            color: "Blanco",     price: 55000, image: "/images/rosas-blancas.jpg",   description: "Bouquet de rosas blancas ideal para novias",               rating: 4.9, inStock: true },
  { id: 7, name: "Tulipanes Amarillos",      type: "Tulipanes", occasion: "Solo porque si",  color: "Amarillo",   price: 35000, image: "/images/tulipanes-amarillos.jpg", description: "Tulipanes holandeses amarillos brillantes",             rating: 4.6, inStock: true },
  { id: 8, name: "Orquídea Morada Premium",  type: "Orquideas", occasion: "Aniversario",     color: "Morado",     price: 70000, image: "/images/orquidea-morada.jpg", description: "Exótica orquídea morada de colección",                     rating: 5.0, inStock: true },
];

const FILTER_OPTIONS = {
  type:     ["Rosas", "Tulipanes", "Orquideas", "Girasoles", "Lirios"],
  occasion: ["Boda", "Cumpleaños", "Aniversario", "Simpatia", "Solo porque si"],
  color:    ["Rojo", "Blanco", "Amarillo", "Rosa", "Morado", "Multicolor"],
};

type ViewMode   = 'grid' | 'list';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'name' | 'rating';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode,           setViewMode]           = useState<ViewMode>('grid');
  const [sortBy,             setSortBy]             = useState<SortOption>('featured');
  const [mobileFiltersOpen,  setMobileFiltersOpen]  = useState(false);

  const activeFilters = {
    type:     searchParams.get('type')     || '',
    occasion: searchParams.get('occasion') || '',
    color:    searchParams.get('color')    || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    inStock:  searchParams.get('inStock') === 'true',
  };

  // Cierra sidebar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileFiltersOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const applyFilter = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    value ? p.set(key, value) : p.delete(key);
    setSearchParams(p);
  };

  const clearFilter    = (key: string) => { const p = new URLSearchParams(searchParams); p.delete(key); setSearchParams(p); };
  const clearAllFilters = () => setSearchParams({});

  const activeFilterCount = Object.values(activeFilters).filter(v => v !== '' && v !== false).length;

  const filtered = PRODUCTS.filter(p => {
    if (activeFilters.type     && p.type     !== activeFilters.type)     return false;
    if (activeFilters.occasion && p.occasion !== activeFilters.occasion) return false;
    if (activeFilters.color    && p.color    !== activeFilters.color)    return false;
    if (activeFilters.priceMin && p.price < parseInt(activeFilters.priceMin)) return false;
    if (activeFilters.priceMax && p.price > parseInt(activeFilters.priceMax)) return false;
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

  // Nombre del filtro activo para el título
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

        {/* ── ACTIVE FILTER CHIPS ── */}
        {activeFilterCount > 0 && (
          <div className="active-filters">
            <span className="active-filters-label">Filtros:</span>
            {activeFilters.type     && <div className="filter-chip"><span>Tipo: {activeFilters.type}</span><button onClick={() => clearFilter('type')}><FaTimes size={10} /></button></div>}
            {activeFilters.occasion && <div className="filter-chip"><span>Ocasión: {activeFilters.occasion}</span><button onClick={() => clearFilter('occasion')}><FaTimes size={10} /></button></div>}
            {activeFilters.color    && <div className="filter-chip"><span>Color: {activeFilters.color}</span><button onClick={() => clearFilter('color')}><FaTimes size={10} /></button></div>}
            {activeFilters.inStock  && <div className="filter-chip"><span>En stock</span><button onClick={() => clearFilter('inStock')}><FaTimes size={10} /></button></div>}
            <button className="clear-all-filters" onClick={clearAllFilters}>Limpiar todo</button>
          </div>
        )}

        <div className="catalog-content">

          {/* ── OVERLAY móvil ── */}
          <div
            className={`sidebar-overlay ${mobileFiltersOpen ? 'visible' : ''}`}
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* ── SIDEBAR ── */}
          <aside className={`catalog-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
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
                {activeFilters.type && (
                  <button style={{fontSize:'11px',color:'#999',background:'none',border:'none',cursor:'pointer',textAlign:'left',padding:'0',fontFamily:'Montserrat,sans-serif'}} onClick={() => clearFilter('type')}>
                    ✕ Quitar filtro
                  </button>
                )}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Por Ocasión</h4>
              <div className="filter-options">
                {FILTER_OPTIONS.occasion.map(o => (
                  <label key={o} className="filter-option">
                    <input type="radio" name="occasion" checked={activeFilters.occasion === o} onChange={() => applyFilter('occasion', o)} />
                    <span>{o}</span>
                  </label>
                ))}
                {activeFilters.occasion && (
                  <button style={{fontSize:'11px',color:'#999',background:'none',border:'none',cursor:'pointer',textAlign:'left',padding:'0',fontFamily:'Montserrat,sans-serif'}} onClick={() => clearFilter('occasion')}>
                    ✕ Quitar filtro
                  </button>
                )}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Por Color</h4>
              <div className="filter-options">
                {FILTER_OPTIONS.color.map(c => (
                  <label key={c} className="filter-option">
                    <input type="radio" name="color" checked={activeFilters.color === c} onChange={() => applyFilter('color', c)} />
                    <span>{c}</span>
                  </label>
                ))}
                {activeFilters.color && (
                  <button style={{fontSize:'11px',color:'#999',background:'none',border:'none',cursor:'pointer',textAlign:'left',padding:'0',fontFamily:'Montserrat,sans-serif'}} onClick={() => clearFilter('color')}>
                    ✕ Quitar filtro
                  </button>
                )}
              </div>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Disponibilidad</h4>
              <label className="filter-option">
                <input type="checkbox" checked={activeFilters.inStock} onChange={e => applyFilter('inStock', e.target.checked ? 'true' : '')} />
                <span>Solo en stock</span>
              </label>
            </div>
          </aside>

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
                <Button variant="contained" onClick={clearAllFilters}>Limpiar filtros</Button>
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

interface ProductCardProps {
  product: typeof PRODUCTS[0];
  viewMode: ViewMode;
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
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
          <Button variant="contained" disabled={!product.inStock} fullWidth>
            {product.inStock ? 'Agregar al Carrito' : 'Agotado'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {!product.inStock && <span className="out-of-stock-badge">Agotado</span>}
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
          <Button variant="contained" size="small" disabled={!product.inStock}>
            {product.inStock ? 'Agregar' : 'Agotado'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;