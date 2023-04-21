import React, { useContext, useReducer, useMemo, Reducer, Dispatch, ReactElement } from 'react';
import useLocalStorageReducer from './use-local-storage-reducer';

// Reducers
const initialCartValues: State = {
  cartDetails: {},
  cartCount: 0,
  totalPrice: 0,
  currency: 'BRL'
};

export interface State {
  cartDetails: {
    [key: string]: {
      categories: string [],
      gender: string,
      id: string,
      name: string,
      price: number,
      quantity: number,
      scrImg: string
    } | { quantity: number, id: string, price: number }
  },
  cartCount: number,
  totalPrice: number,
  currency: string | undefined,
}

export interface Product {
  id: string,
  price: number,
}

export interface Action {
  type: string,
  quantity: number,
  product: Product
}

interface InitContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

interface CartProviderProps {
  reducer: Reducer<Product, Action>;
  initState: Product;
}

const addItem = (state: State = {} as State, product: Product|null = null, quantity = 0) => {
  if (quantity <= 0 || !product) return state;

  let entry = state?.cartDetails?.[product.id];

  // Update item
  if (entry) {
    return {
      ...state,
      cartDetails: {
        ...state.cartDetails,
        [product.id]: {
          ...entry,
          quantity: entry.quantity + quantity,
        }
      },
      cartCount: Math.max(0, state.cartCount + quantity),
      totalPrice: Math.max(state.totalPrice + product.price * quantity),
    };
  }
  // Add item
  return {
    ...state,
    cartDetails: {
      ...state.cartDetails,
      [product.id]: {
        ...product,
        quantity,
      },
    },
    cartCount: Math.max(0, state.cartCount + quantity),
    totalPrice: Math.max(state.totalPrice + product.price * quantity),
  };
};

const removeItem = (state: State = {} as State, product: Product|null = null, quantity = 0) => {
  if (quantity <= 0 || !product) return state;

  let entry = state?.cartDetails?.[product.id];

  if (entry) {
    // Remove item
    if (quantity >= entry.quantity) {
      const { [product.id]: id, ...details } = state.cartDetails;
      return {
        ...state,
        cartDetails: details,
        cartCount: Math.max(0, state.cartCount - entry.quantity),
        totalPrice: Math.max(
          0,
          state.totalPrice - product.price * entry.quantity
        ),
      };
    }
    // Update item
    else {
      return {
        ...state,
        cartDetails: {
          ...state.cartDetails,
          [product.id]: {
            ...entry,
            quantity: entry.quantity - quantity,
          },
        },
        cartCount: Math.max(0, state.cartCount - quantity),
        totalPrice: Math.max(0, state.totalPrice - product.price * quantity),
      };
    }
  } else {
    return state;
  }
};

const clearCart = () => {
  return initialCartValues;
};

const cartReducer: Reducer<State, Action> = (state: State = {} as State, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return addItem(state, action.product, action.quantity);
    case 'REMOVE_ITEM':
      return removeItem(state, action.product, action.quantity);
    case 'CLEAR_CART':
      return clearCart();
    default:
      return state;
  }
};

interface Props {
  currency?: string,
  children: ReactElement|null
}

// Context + Provider
export const CartContext = React.createContext({} as [State, Dispatch<Action>]);

export const CartProvider = ({ currency = 'BRL', children = null }: Props) => {
  const [cart, dispatch] = useLocalStorageReducer(
    'cart',
    cartReducer,
    initialCartValues
  );

  const contextValue =  useMemo(
    () => [
      {
        ...cart,
        currency,
      },
      dispatch,
    ] as [State, Dispatch<Action>],
    [cart, currency]
  );
  
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Hook
export const useShoppingCart = () => {
  const [cart, dispatch] = useContext(CartContext);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', product, quantity });

  const removeItem = (product: Product, quantity = 1) =>
    dispatch({ type: 'REMOVE_ITEM', product, quantity });

  const clearCart = () => dispatch({ type: 'CLEAR_CART', product: {} as Product, quantity: 0 });

  const shoppingCart = {
    ...cart,
    addItem,
    removeItem,
    clearCart,
  };

  return shoppingCart;
};