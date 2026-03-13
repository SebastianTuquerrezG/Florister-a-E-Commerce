import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

/* ─────────────────────────────────── TYPES ─── */

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  slug?: string;
}

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_ITEM';    payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR' };

interface WishlistContextValue {
  items: WishlistItem[];
  totalItems: number;
  addItem:    (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

/* ─────────────────────────────────── REDUCER ─── */

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.find(i => i.id === action.payload.id)) return state;
      return { items: [...state.items, action.payload] };

    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.id !== action.payload) };

    case 'CLEAR':
      return { items: [] };

    default:
      return state;
  }
};

/* ─────────────────────────────────── CONTEXT ─── */

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = 'floridos_wishlist';

const loadFromStorage = (): WishlistState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, undefined, loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value: WishlistContextValue = {
    items:      state.items,
    totalItems: state.items.length,
    addItem:    (item) => dispatch({ type: 'ADD_ITEM',    payload: item }),
    removeItem: (id)   => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    toggleItem: (item) => {
      if (state.items.find(i => i.id === item.id)) {
        dispatch({ type: 'REMOVE_ITEM', payload: item.id });
      } else {
        dispatch({ type: 'ADD_ITEM', payload: item });
      }
    },
    isInWishlist:  (id) => state.items.some(i => i.id === id),
    clearWishlist: ()   => dispatch({ type: 'CLEAR' }),
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextValue => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
};