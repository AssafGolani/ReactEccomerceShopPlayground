import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const updatedItems = [...state.items];
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({
          ...action.item,
          quantity: 1,
        });
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
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });
  const cartContext = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: (item) => {
      dispatchCartAction({ type: "ADD_ITEM", item: item });
    },
    removeItem: (id) => {
      dispatchCartAction({ type: "REMOVE_ITEM", id: id });
    },
    clearCart: () => {
      dispatchCartAction({ type: "CLEAR_CART" });
    },
  };
  console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
