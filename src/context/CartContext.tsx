import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

/* ─────────────────────────────────── TYPES ─── */

export interface CartItem {
  id: number;
  name: string;
  price: number;           // precio en COP
  image: string;
  category: string;
  quantity: number;
  slug?: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM';    payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: number }                      // id
  | { type: 'UPDATE_QTY';  payload: { id: number; qty: number } }
  | { type: 'CLEAR_CART' };

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem:    (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  updateQty:  (id: number, qty: number) => void;
  clearCart:  () => void;
  isInCart:   (id: number) => boolean;
}

/* ─────────────────────────────────── REDUCER ─── */

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {

    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        return {
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity ?? 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.id !== action.payload) };

    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return {
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.qty } : i
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
};

/* ─────────────────────────────────── CONTEXT ─── */

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'floridos_cart';

const loadFromStorage = (): CartState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadFromStorage);

  // Persiste en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value: CartContextValue = {
    items:      state.items,
    totalItems,
    subtotal,
    addItem:    (item) => dispatch({ type: 'ADD_ITEM',    payload: item }),
    removeItem: (id)   => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateQty:  (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } }),
    clearCart:  ()     => dispatch({ type: 'CLEAR_CART' }),
    isInCart:   (id)   => state.items.some(i => i.id === id),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};