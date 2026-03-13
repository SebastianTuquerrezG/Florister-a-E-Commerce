import './WishlistPage.css';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishListContext';
import { useCart }     from '../../context/CartContext';
import { FaHeart, FaTimes, FaShoppingBasket, FaLeaf } from 'react-icons/fa';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

/* ─────────────────────────── EMPTY ─── */
const EmptyWishlist = () => (
  <div className="wl-empty">
    <div className="wl-empty__icon"><MdOutlineFavoriteBorder size={52} /></div>
    <h2 className="wl-empty__title">Tu lista de favoritos está vacía</h2>
    <p className="wl-empty__text">
      Guarda las flores y plantas que te encantan para encontrarlas fácilmente después.
    </p>
    <div className="wl-empty__links">
      <Link to="/catalogo" className="wl-empty__btn">
        <FaLeaf size={12} /> Ver flores
      </Link>
      <Link to="/catalogo-plantas" className="wl-empty__btn wl-empty__btn--outline">
        Ver plantas
      </Link>
    </div>
  </div>
);

/* ─────────────────────────── CARD ─── */
const WishCard = ({
  item,
  onRemove,
  onAddToCart,
  inCart,
}: {
  item: ReturnType<typeof useWishlist>['items'][0];
  onRemove:    (id: number) => void;
  onAddToCart: (id: number) => void;
  inCart: boolean;
}) => (
  <div className="wl-card">
    {/* Quitar de favoritos */}
    <button
      className="wl-card__remove"
      onClick={() => onRemove(item.id)}
      aria-label="Quitar de favoritos"
    >
      <FaTimes size={11} />
    </button>

    <Link
      to={item.slug ? `/${item.category === 'plantas' ? 'catalogo-plantas' : 'catalogo'}/${item.slug}` : `/${item.category === 'plantas' ? 'catalogo-plantas' : 'catalogo'}`}
      className="wl-card__img-link"
    >
      <img src={item.image} alt={item.name} className="wl-card__img" />
    </Link>

    <div className="wl-card__body">
      <span className="wl-card__cat">{item.category}</span>
      <h3 className="wl-card__name">{item.name}</h3>
      <p className="wl-card__price">{formatCOP(item.price)}</p>
    </div>

    <div className="wl-card__footer">
      <button
        className={`wl-card__cart${inCart ? ' in-cart' : ''}`}
        onClick={() => onAddToCart(item.id)}
      >
        <FaShoppingBasket size={13} />
        {inCart ? 'En el carrito ✓' : 'Añadir al carrito'}
      </button>
    </div>
  </div>
);

/* ─────────────────────────── PAGE ─── */
const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem, isInCart }               = useCart();

  const handleAddToCart = (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) addItem({ ...item });
  };

  const handleAddAll = () => {
    items.forEach(item => addItem({ ...item }));
  };

  return (
    <div className="wishlist-page">

      {/* ── HEADER ── */}
      <div className="wl-page-header">
        <div className="wl-container">
          <p className="wl-eyebrow"><FaHeart size={11} /> Mis favoritos</p>
          <h1 className="wl-page-title">
            Lista de <em>Deseos</em>
          </h1>
          {items.length > 0 && (
            <p className="wl-count">{items.length} {items.length === 1 ? 'producto guardado' : 'productos guardados'}</p>
          )}
        </div>
      </div>

      <div className="wl-container wl-body">

        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* ── TOOLBAR ── */}
            <div className="wl-toolbar">
              <button className="wl-add-all" onClick={handleAddAll}>
                <FaShoppingBasket size={13} /> Añadir todo al carrito
              </button>
              <button className="wl-clear" onClick={clearWishlist}>
                <FaTimes size={11} /> Vaciar lista
              </button>
            </div>

            {/* ── GRID ── */}
            <div className="wl-grid">
              {items.map(item => (
                <WishCard
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onAddToCart={handleAddToCart}
                  inCart={isInCart(item.id)}
                />
              ))}
            </div>

            {/* ── BOTTOM CTA ── */}
            <div className="wl-cta-bar">
              <div className="wl-cta-text">
                <p>¿Listo para hacer tu pedido?</p>
                <span>Añade los productos al carrito y procede al pago.</span>
              </div>
              <Link to="/carrito" className="wl-cta-btn">
                Ver carrito <FaShoppingBasket size={13} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;