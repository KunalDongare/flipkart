import React, {createContext, useReducer, useContext} from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id,
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...state, {...action.payload, quantity: 1}];
      }
    case 'REMOVE_ALL_FROM_CART':
      return [];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);
    case 'INCREMENT_QUANTITY':
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {...item, quantity: item.quantity + 1};
        }
        return item;
      });
    case 'DECREMENT_QUANTITY':
      return state
        .map(item => {
          if (item.id === action.payload.id) {
            const updatedQuantity = item.quantity - 1;
            if (updatedQuantity <= 0) {
              return null; // Remove item if quantity becomes zero
            } else {
              return {...item, quantity: updatedQuantity};
            }
          }
          return item;
        })
        .filter(item => item !== null); // Filter out null items
    default:
      return state;
  }
};

export const CartProvider = ({children}) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{cart, dispatch}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
