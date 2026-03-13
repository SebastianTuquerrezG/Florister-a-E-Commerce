import './SearchPage.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { FaShoppingBasket, FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';
import { useCart }     from '../../context/CartContext';
import { useWishlist } from '../../context/WishListContext';
import { ALL_PRODUCTS } from '../../data/Products';
import type { Product } from '../../data/Products';
import { matches, score } from '../../utils/SearchUtils';

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

/* ──────────────────────── helpers ── */

/** Resalta los tokens del query dentro de un texto */
const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.trim().split(/\s+/).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i} className="sp-mark">{part}</mark> : part
      )}
    </>
  );
};

/** Campos de búsqueda de un producto */
const productFields = (p: Product): string[] => [
  p.name,
  p.description,
  p.type      ?? '',
  p.occasion  ?? '',
  p.color     ?? '',
  p.location  ?? '',
  p.care      ?? '',
  p.category,
];

/* ──────────────────────── result card ── */
const ResultCard = ({ product, query }: { product: Product; query: string }) => {
  const { addItem, isInCart }        = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const inCart     = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const catalogPath = product.category === 'plantas' ? '/catalogo-plantas' : '/catalogo';

  return (
    <div className="sp-card">
      <Link to={catalogPath} className="sp-card__img-wrap">
        <img src={product.image} alt={product.name} className="sp-card__img" />
        {!product.inStock && <span className="sp-card__sold">Agotado</span>}
        <span className={`sp-card__cat sp-card__cat--${product.category}`}>
          {product.category === 'plantas' ? '🌿 Planta' : '🌸 Flor'}
        </span>
      </Link>

      <div className="sp-card__body">
        <h3 className="sp-card__name">
          <Highlight text={product.name} query={query} />
        </h3>
        <p className="sp-card__desc">
          <Highlight text={product.description} query={query} />
        </p>

        <div className="sp-card__tags">
          {product.type     && <span className="sp-tag"><Highlight text={product.type} query={query} /></span>}
          {product.occasion && <span className="sp-tag"><Highlight text={product.occasion} query={query} /></span>}
          {product.location && <span className="sp-tag"><Highlight text={product.location} query={query} /></span>}
          {product.care     && <span className="sp-tag"><Highlight text={product.care} query={query} /></span>}
        </div>

        <div className="sp-card__footer">
          <div className="sp-card__left">
            <p className="sp-card__price">{formatCOP(product.price)}</p>
            <div className="sp-card__rating">
              {'⭐'.repeat(Math.round(product.rating))}
              <span>{product.rating}</span>
            </div>
          </div>

          <div className="sp-card__actions">
            <button
              className={`sp-btn-wish${inWishlist ? ' active' : ''}`}
              onClick={() => toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, slug: product.slug })}
              aria-label="Favoritos"
            >
              {inWishlist ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
            </button>

            <button
              className={`sp-btn-cart${inCart ? ' in-cart' : ''}`}
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, slug: product.slug })}
              disabled={!product.inStock}
            >
              <FaShoppingBasket size={12} />
              {inCart ? 'En carrito ✓' : product.inStock ? 'Agregar' : 'Agotado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────── page ── */
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate        = useNavigate();
  const initialQ        = searchParams.get('q') ?? '';

  const [inputVal,   setInputVal]   = useState(initialQ);
  const [query,      setQuery]      = useState(initialQ);
  const [catFilter,  setCatFilter]  = useState<'todas' | 'flores' | 'plantas'>('todas');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync cuando la URL cambia (ej: desde el header)
  useEffect(() => {
    setInputVal(initialQ);
    setQuery(initialQ);
  }, [initialQ]);

  const handleSubmit = () => {
    const q = inputVal.trim();
    setQuery(q);
    if (q) navigate(`/buscar?q=${encodeURIComponent(q)}`, { replace: true });
  };

  /* Filtrar y ordenar */
  const results = query.trim()
    ? ALL_PRODUCTS
        .filter(p => catFilter === 'todas' || p.category === catFilter)
        .map(p => ({ product: p, sc: score(query, productFields(p)) }))
        .filter(({ sc, product }) => sc > 0 || matches(query, productFields(product)))
        .sort((a, b) => b.sc - a.sc)
        .map(({ product }) => product)
    : [];

  const floresCount  = results.filter(p => p.category === 'flores').length;
  const plantasCount = results.filter(p => p.category === 'plantas').length;

  return (
    <div className="search-page">

      {/* ── HERO ── */}
      <div className="sp-hero">
        <div className="sp-hero__inner">
          <p className="sp-hero__eye">Resultados de búsqueda</p>
          <h1 className="sp-hero__title">
            {query ? <>Buscando <em>"{query}"</em></> : <>¿Qué estás <em>buscando?</em></>}
          </h1>

          {/* Search bar */}
          <div className="sp-search-bar">
            <FiSearch size={18} className="sp-search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="sp-search-input"
              placeholder="Rosas, cumpleaños, suculentas, boda..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            {inputVal && (
              <button className="sp-search-clear" onClick={() => { setInputVal(''); inputRef.current?.focus(); }}>
                <FaTimes size={12} />
              </button>
            )}
            <button className="sp-search-btn" onClick={handleSubmit}>Buscar</button>
          </div>

          {/* Sugerencias rápidas */}
          {!query && (
            <div className="sp-suggestions">
              {['Rosas', 'Boda', 'Suculentas', 'Cumpleaños', 'Orquídeas', 'Plantas interior'].map(s => (
                <button key={s} className="sp-chip"
                  onClick={() => { setInputVal(s); setQuery(s); navigate(`/buscar?q=${encodeURIComponent(s)}`, { replace: true }); }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── RESULTS ── */}
      {query.trim() && (
        <div className="sp-body">

          {/* Stats + category tabs */}
          <div className="sp-controls">
            <p className="sp-count">
              {results.length === 0
                ? 'Sin resultados'
                : `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`}
            </p>

            <div className="sp-tabs">
              {([
                ['todas',   `Todas (${results.length})`],
                ['flores',  `Flores (${floresCount})`],
                ['plantas', `Plantas (${plantasCount})`],
              ] as const).map(([val, label]) => (
                <button
                  key={val}
                  className={`sp-tab${catFilter === val ? ' active' : ''}`}
                  onClick={() => setCatFilter(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {results.length === 0 ? (
            <div className="sp-empty">
              <p className="sp-empty__title">No encontramos resultados para <em>"{query}"</em></p>
              <p className="sp-empty__sub">Intenta con otras palabras, revisa la ortografía o prueba términos más generales.</p>
              <div className="sp-empty__tips">
                <strong>Sugerencias:</strong>
                <span>Rosas</span>
                <span>Bouquet</span>
                <span>Suculentas</span>
                <span>Plantas</span>
              </div>
            </div>
          ) : (
            <div className="sp-grid">
              {results
                .filter(p => catFilter === 'todas' || p.category === catFilter)
                .map(p => <ResultCard key={p.id} product={p} query={query} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;