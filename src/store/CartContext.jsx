import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
function cartReducer(state, action) {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.id
  );
  const updatedItems = [...state.items];

  switch (action.type) {
    case "ADD_ITEM":
      if (existingCartItemIndex > -1) {
        const updatedItem = {
          ...state.items[existingCartItemIndex],
          quantity: state.items[existingCartItemIndex].quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price,
      };
    case "REMOVE_ITEM":
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case "CLEAR_CART":
      return {
        items: [],
        totalAmount: 0,
      };
    default:
      return state;
  }
}
export function CartContextProvider({ children }) {
  useReducer();
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
