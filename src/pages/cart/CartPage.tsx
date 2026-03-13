import './CartPage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import {
  FaTrash, FaPlus, FaMinus, FaWhatsapp, FaLeaf,
  FaLock, FaChevronRight, FaTag, FaTimes,
  FaCreditCard, FaMobileAlt, FaUniversity,
} from 'react-icons/fa';
import { MdOutlineShoppingBag, MdLocalShipping } from 'react-icons/md';

/* ─────────────────────────────────── HELPERS ─── */

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const SHIPPING_THRESHOLD = 150_000; // envío gratis sobre este valor
const SHIPPING_COST      = 12_000;

/* ─────────────────────────────────── TYPES ─── */

type PaymentMethod = 'card' | 'nequi' | 'pse' | 'whatsapp';

interface CheckoutForm {
  name:    string;
  email:   string;
  phone:   string;
  address: string;
  city:    string;
  notes:   string;
}

/* ─────────────────────────────────── STEP INDICATOR ─── */

const Steps = ({ step }: { step: 1 | 2 | 3 }) => (
  <div className="cp-steps">
    {(['Carrito', 'Datos', 'Pago'] as const).map((label, i) => {
      const n = i + 1;
      const active   = step === n;
      const done     = step > n;
      return (
        <div key={label} className={`cp-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
          <div className="cp-step__dot">{done ? '✓' : n}</div>
          <span className="cp-step__label">{label}</span>
          {i < 2 && <div className="cp-step__line" />}
        </div>
      );
    })}
  </div>
);

/* ─────────────────────────────────── EMPTY STATE ─── */

const EmptyCart = () => (
  <div className="cp-empty">
    <div className="cp-empty__icon"><MdOutlineShoppingBag size={56} /></div>
    <h2 className="cp-empty__title">Tu carrito está vacío</h2>
    <p className="cp-empty__text">
      Explora nuestra colección y encuentra las flores perfectas para cada momento.
    </p>
    <Link to="/catalogo" className="cp-empty__btn">
      <FaLeaf size={13} /> Ver catálogo de flores
    </Link>
    <Link to="/catalogo-plantas" className="cp-empty__btn cp-empty__btn--outline">
      Ver plantas
    </Link>
  </div>
);

/* ─────────────────────────────────── CART ITEM ROW ─── */

const CartItemRow = ({
  item,
  onQty,
  onRemove,
}: {
  item: ReturnType<typeof useCart>['items'][0];
  onQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) => (
  <div className="cp-item">
    <Link to={item.slug ? `/catalogo/${item.slug}` : '/catalogo'} className="cp-item__img-wrap">
      <img src={item.image} alt={item.name} className="cp-item__img" />
    </Link>

    <div className="cp-item__info">
      <span className="cp-item__cat">{item.category}</span>
      <h3 className="cp-item__name">{item.name}</h3>
      <span className="cp-item__unit-price">{formatCOP(item.price)} c/u</span>
    </div>

    <div className="cp-item__controls">
      <div className="cp-qty">
        <button
          className="cp-qty__btn"
          onClick={() => onQty(item.id, item.quantity - 1)}
          aria-label="Reducir cantidad"
        >
          <FaMinus size={10} />
        </button>
        <span className="cp-qty__num">{item.quantity}</span>
        <button
          className="cp-qty__btn"
          onClick={() => onQty(item.id, item.quantity + 1)}
          aria-label="Aumentar cantidad"
        >
          <FaPlus size={10} />
        </button>
      </div>
      <span className="cp-item__subtotal">{formatCOP(item.price * item.quantity)}</span>
      <button
        className="cp-item__remove"
        onClick={() => onRemove(item.id)}
        aria-label="Eliminar"
      >
        <FaTrash size={13} />
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────── ORDER SUMMARY ─── */

const OrderSummary = ({
  subtotal,
  coupon,
  discount,
  couponInput,
  onCouponChange,
  onApplyCoupon,
  onRemoveCoupon,
  couponError,
  onContinue,
  ctaLabel,
  disabled,
}: {
  subtotal: number;
  coupon: string | null;
  discount: number;
  couponInput: string;
  onCouponChange: (v: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  couponError: string;
  onContinue: () => void;
  ctaLabel: string;
  disabled?: boolean;
}) => {
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total    = subtotal - discount + shipping;

  return (
    <div className="cp-summary">
      <h3 className="cp-summary__title">Resumen del pedido</h3>

      <div className="cp-summary__rows">
        <div className="cp-summary__row">
          <span>Subtotal</span>
          <span>{formatCOP(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="cp-summary__row cp-summary__row--discount">
            <span>Descuento ({coupon})</span>
            <span>−{formatCOP(discount)}</span>
          </div>
        )}
        <div className="cp-summary__row">
          <span className="cp-summary__ship-label">
            <MdLocalShipping size={14} />
            Envío
          </span>
          <span className={shipping === 0 ? 'cp-summary__free' : ''}>
            {shipping === 0 ? 'Gratis 🎉' : formatCOP(shipping)}
          </span>
        </div>
        {shipping > 0 && (
          <p className="cp-summary__ship-hint">
            Añade {formatCOP(SHIPPING_THRESHOLD - subtotal)} más para envío gratis
          </p>
        )}
      </div>

      {/* Cupón */}
      <div className="cp-coupon">
        <div className="cp-coupon__input-row">
          <span className="cp-coupon__icon"><FaTag size={12} /></span>
          <input
            type="text"
            placeholder="Código de descuento"
            value={couponInput}
            onChange={e => onCouponChange(e.target.value.toUpperCase())}
            className="cp-coupon__input"
          />
          {coupon ? (
            <button className="cp-coupon__remove" onClick={onRemoveCoupon}>
              <FaTimes size={11} />
            </button>
          ) : (
            <button className="cp-coupon__apply" onClick={onApplyCoupon}>
              Aplicar
            </button>
          )}
        </div>
        {couponError && <p className="cp-coupon__error">{couponError}</p>}
        {coupon && !couponError && <p className="cp-coupon__ok">✓ Cupón aplicado</p>}
      </div>

      <div className="cp-summary__total">
        <span>Total</span>
        <span>{formatCOP(total)}</span>
      </div>

      <button className="cp-summary__cta" onClick={onContinue} disabled={disabled}>
        {ctaLabel} <FaChevronRight size={12} />
      </button>

      <div className="cp-summary__secure">
        <FaLock size={10} />
        <span>Pago 100% seguro · Datos encriptados</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────── CHECKOUT FORM ─── */

const CheckoutForm = ({
  form,
  onChange,
}: {
  form: CheckoutForm;
  onChange: (field: keyof CheckoutForm, value: string) => void;
}) => (
  <div className="cp-form">
    <h3 className="cp-form__title">Datos de entrega</h3>

    <div className="cp-form__grid">
      <div className="cp-field">
        <label>Nombre completo *</label>
        <input
          type="text"
          placeholder="ej. María García"
          value={form.name}
          onChange={e => onChange('name', e.target.value)}
        />
      </div>
      <div className="cp-field">
        <label>Correo electrónico *</label>
        <input
          type="email"
          placeholder="tu@correo.com"
          value={form.email}
          onChange={e => onChange('email', e.target.value)}
        />
      </div>
      <div className="cp-field">
        <label>WhatsApp / Teléfono *</label>
        <input
          type="tel"
          placeholder="3001234567"
          value={form.phone}
          onChange={e => onChange('phone', e.target.value)}
        />
      </div>
      <div className="cp-field">
        <label>Ciudad *</label>
        <input
          type="text"
          placeholder="ej. Popayán"
          value={form.city}
          onChange={e => onChange('city', e.target.value)}
        />
      </div>
      <div className="cp-field cp-field--full">
        <label>Dirección de entrega *</label>
        <input
          type="text"
          placeholder="Calle, barrio, número de casa o apto"
          value={form.address}
          onChange={e => onChange('address', e.target.value)}
        />
      </div>
      <div className="cp-field cp-field--full">
        <label>Notas para el pedido (opcional)</label>
        <textarea
          rows={3}
          placeholder="Instrucciones de entrega, mensaje para el ramo, color preferido..."
          value={form.notes}
          onChange={e => onChange('notes', e.target.value)}
        />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────── PAYMENT STEP ─── */

const PaymentStep = ({
  method,
  onMethod,
  onPay,
  //items,
  //form,
  total,
  onWhatsApp,
}: {
  method: PaymentMethod;
  onMethod: (m: PaymentMethod) => void;
  onPay: () => void;
  items: ReturnType<typeof useCart>['items'];
  form: CheckoutForm;
  total: number;
  onWhatsApp: () => void;
}) => {
  const methods: { key: PaymentMethod; label: string; desc: string; icon: React.ReactNode }[] = [
    { key: 'card',      label: 'Tarjeta débito / crédito', desc: 'Visa, Mastercard, Amex',    icon: <FaCreditCard size={18} /> },
    { key: 'nequi',     label: 'Nequi',                    desc: 'Paga con tu app Nequi',      icon: <FaMobileAlt size={18} /> },
    { key: 'pse',       label: 'PSE',                      desc: 'Débito bancario en línea',   icon: <FaUniversity size={18} /> },
    { key: 'whatsapp',  label: 'Pagar por WhatsApp',       desc: 'Acordamos el pago contigo',  icon: <FaWhatsapp size={18} /> },
  ];

  return (
    <div className="cp-payment">
      <h3 className="cp-payment__title">Método de pago</h3>

      <div className="cp-methods">
        {methods.map(m => (
          <label key={m.key} className={`cp-method ${method === m.key ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value={m.key}
              checked={method === m.key}
              onChange={() => onMethod(m.key)}
            />
            <span className="cp-method__icon">{m.icon}</span>
            <span className="cp-method__info">
              <span className="cp-method__label">{m.label}</span>
              <span className="cp-method__desc">{m.desc}</span>
            </span>
            <span className="cp-method__check">✓</span>
          </label>
        ))}
      </div>

      {/* ── Zona de integración de pasarela ── */}
      <div className="cp-gateway-slot">
        {method === 'card' && (
          <div className="cp-gateway-placeholder">
            {/* 
              TODO: Integrar pasarela de pago
              Opciones recomendadas para Colombia:
              ─ Wompi (Bancolombia): https://docs.wompi.co
              ─ PayU:  https://developers.payulatam.com
              ─ MercadoPago: https://www.mercadopago.com.co/developers
              
              Ejemplo Wompi:
              import { WompiPaymentButton } from '@wompi/react';
              <WompiPaymentButton
                publicKey="pub_prod_XXXXXXXX"
                currency="COP"
                amountInCents={total * 100}
                reference={`floridos-${Date.now()}`}
                customerData={{ email: form.email, fullName: form.name, phoneNumber: form.phone }}
              />
            */}
            <div className="cp-gateway-mock">
              <div className="cp-mock-field"><label>Número de tarjeta</label><input type="text" placeholder="•••• •••• •••• ••••" disabled /></div>
              <div className="cp-mock-row">
                <div className="cp-mock-field"><label>Vencimiento</label><input type="text" placeholder="MM / AA" disabled /></div>
                <div className="cp-mock-field"><label>CVV</label><input type="text" placeholder="•••" disabled /></div>
              </div>
              <p className="cp-gateway-note">
                💳 Integra <strong>Wompi</strong>, <strong>PayU</strong> o <strong>MercadoPago</strong> aquí.
              </p>
            </div>
          </div>
        )}

        {method === 'nequi' && (
          <div className="cp-gateway-placeholder">
            <div className="cp-gateway-mock cp-gateway-mock--nequi">
              <div className="cp-mock-field"><label>Número Nequi</label><input type="tel" placeholder="3001234567" disabled /></div>
              <p className="cp-gateway-note">📱 Conecta con <strong>Wompi</strong> o <strong>PayU</strong> para procesar Nequi automáticamente.</p>
            </div>
          </div>
        )}

        {method === 'pse' && (
          <div className="cp-gateway-placeholder">
            <div className="cp-gateway-mock">
              <div className="cp-mock-field"><label>Banco</label><input type="text" placeholder="Selecciona tu banco" disabled /></div>
              <p className="cp-gateway-note">🏦 PSE se integra vía <strong>PayU</strong> o <strong>MercadoPago</strong>.</p>
            </div>
          </div>
        )}

        {method === 'whatsapp' && (
          <div className="cp-whatsapp-info">
            <FaWhatsapp size={24} className="cp-wa-icon" />
            <div>
              <p>Te enviamos el resumen del pedido por WhatsApp y coordinamos el pago contigo directamente.</p>
              <p className="cp-wa-note">Aceptamos transferencias, Nequi y efectivo.</p>
            </div>
          </div>
        )}
      </div>

      <div className="cp-pay-actions">
        {method === 'whatsapp' ? (
          <button className="cp-btn-pay cp-btn-pay--wa" onClick={onWhatsApp}>
            <FaWhatsapp size={18} />
            Enviar pedido por WhatsApp
          </button>
        ) : (
          <button className="cp-btn-pay" onClick={onPay}>
            <FaLock size={14} />
            Pagar {formatCOP(total)}
          </button>
        )}
        <p className="cp-pay-note">
          <FaLock size={10} /> Transacción cifrada · No almacenamos datos de tarjeta
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────── SUCCESS ─── */

const SuccessScreen = ({ onReset }: { onReset: () => void }) => (
  <div className="cp-success">
    <div className="cp-success__ring">
      <div className="cp-success__icon">🌸</div>
    </div>
    <h2 className="cp-success__title">¡Pedido recibido!</h2>
    <p className="cp-success__text">
      Gracias por tu compra. Te contactaremos pronto para confirmar tu pedido y coordinar la entrega.
    </p>
    <div className="cp-success__actions">
      <Link to="/" className="cp-success__btn">Volver al inicio</Link>
      <button className="cp-success__btn cp-success__btn--outline" onClick={onReset}>
        Seguir comprando
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────── MAIN PAGE ─── */

const CartPage = () => {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();

  const [step,         setStep]         = useState<1 | 2 | 3>(1);
  const [couponInput,  setCouponInput]  = useState('');
  const [coupon,       setCoupon]       = useState<string | null>(null);
  const [couponError,  setCouponError]  = useState('');
  const [discount,     setDiscount]     = useState(0);
  const [payMethod,    setPayMethod]    = useState<PaymentMethod>('card');
  const [orderDone,    setOrderDone]    = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    name: '', email: '', phone: '', address: '', city: '', notes: '',
  });

  /* ── cupones de ejemplo (reemplazar por API) ── */
  const COUPONS: Record<string, number> = {
    'FLORIDOS10': 0.10,
    'BIENVENIDA': 0.15,
  };

  const applyCoupon = () => {
    setCouponError('');
    if (COUPONS[couponInput]) {
      setCoupon(couponInput);
      setDiscount(Math.round(subtotal * COUPONS[couponInput]));
    } else {
      setCouponError('Cupón no válido o expirado');
      setCoupon(null);
      setDiscount(0);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscount(0);
    setCouponInput('');
    setCouponError('');
  };

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total    = subtotal - discount + shipping;

  const formValid = form.name && form.email && form.phone && form.address && form.city;

  /* ── WhatsApp fallback ── */
  const sendWhatsApp = () => {
    const lines = [
      `🌸 *Pedido Floridos*`,
      ``,
      ...items.map(i => `• ${i.name} x${i.quantity} — ${formatCOP(i.price * i.quantity)}`),
      ``,
      coupon ? `Cupón: ${coupon} (−${formatCOP(discount)})` : '',
      `Subtotal: ${formatCOP(subtotal)}`,
      `Envío: ${shipping === 0 ? 'Gratis' : formatCOP(shipping)}`,
      `*Total: ${formatCOP(total)}*`,
      ``,
      `📦 *Datos de entrega:*`,
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      `Ciudad: ${form.city}`,
      `Dirección: ${form.address}`,
      form.notes ? `Notas: ${form.notes}` : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/573146890813?text=${encodeURIComponent(lines)}`, '_blank');
    clearCart();
    setOrderDone(true);
  };

  /* ── pago por pasarela (placeholder) ── */
  const handlePay = () => {
    /*
      TODO: Llamar aquí a la pasarela de pago seleccionada.
      Después del pago exitoso: clearCart() + setOrderDone(true)
    */
    alert('Aquí se procesaría el pago con la pasarela integrada.');
  };

  const handleReset = () => {
    setStep(1);
    setOrderDone(false);
    setCoupon(null);
    setDiscount(0);
    setCouponInput('');
    setForm({ name: '', email: '', phone: '', address: '', city: '', notes: '' });
    setPayMethod('card');
  };

  /* ── render ── */
  if (orderDone) return (
    <div className="cart-page">
      <div className="cp-container"><SuccessScreen onReset={handleReset} /></div>
    </div>
  );

  if (items.length === 0) return (
    <div className="cart-page">
      <div className="cp-container"><EmptyCart /></div>
    </div>
  );

  return (
    <div className="cart-page">
      {/* ── PAGE HEADER ── */}
      <div className="cp-page-header">
        <div className="cp-container">
          <p className="cp-eyebrow"><FaLeaf size={11} /> Tu pedido</p>
          <h1 className="cp-page-title">
            {step === 1 ? <>Mi <em>Carrito</em></> : step === 2 ? <>Datos de <em>Entrega</em></> : <>Método de <em>Pago</em></>}
          </h1>
        </div>
      </div>

      <div className="cp-container">
        <Steps step={step} />

        <div className="cp-layout">

          {/* ── LEFT COLUMN ── */}
          <div className="cp-left">

            {/* STEP 1 — items */}
            {step === 1 && (
              <div className="cp-items-card">
                <div className="cp-items-header">
                  <h2>Productos ({items.length})</h2>
                  <button className="cp-clear-btn" onClick={clearCart}>
                    <FaTrash size={11} /> Vaciar carrito
                  </button>
                </div>
                <div className="cp-items-list">
                  {items.map(item => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQty={updateQty}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
                <div className="cp-continue-shopping">
                  <Link to="/catalogo" className="cp-back-link">
                    ← Seguir comprando
                  </Link>
                </div>
              </div>
            )}

            {/* STEP 2 — datos */}
            {step === 2 && (
              <CheckoutForm
                form={form}
                onChange={(field, val) => setForm(f => ({ ...f, [field]: val }))}
              />
            )}

            {/* STEP 3 — pago */}
            {step === 3 && (
              <PaymentStep
                method={payMethod}
                onMethod={setPayMethod}
                onPay={handlePay}
                onWhatsApp={sendWhatsApp}
                items={items}
                form={form}
                total={total}
              />
            )}

          </div>

          {/* ── RIGHT COLUMN — order summary (siempre visible) ── */}
          <div className="cp-right">
            <OrderSummary
              subtotal={subtotal}
              coupon={coupon}
              discount={discount}
              couponInput={couponInput}
              onCouponChange={setCouponInput}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
              couponError={couponError}
              onContinue={() => {
                if (step === 1) setStep(2);
                else if (step === 2 && formValid) setStep(3);
              }}
              ctaLabel={
                step === 1 ? 'Continuar con mis datos' :
                step === 2 ? 'Continuar al pago'       :
                'Pedido confirmado'
              }
              disabled={step === 2 && !formValid}
            />

            {/* Mini resumen de productos en step 2 y 3 */}
            {step > 1 && (
              <div className="cp-mini-items">
                <p className="cp-mini-title">Tu pedido</p>
                {items.map(i => (
                  <div key={i.id} className="cp-mini-row">
                    <img src={i.image} alt={i.name} />
                    <span>{i.name} ×{i.quantity}</span>
                    <span>{formatCOP(i.price * i.quantity)}</span>
                  </div>
                ))}
                <button className="cp-mini-edit" onClick={() => setStep(1)}>
                  Editar carrito
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;