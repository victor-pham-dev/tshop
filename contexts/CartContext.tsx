import { Cart, Classification, Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface ProductWithClassifyProps extends Product {
  classifications: Classification[];
}
export interface CartDataProps extends Cart {
  Product: ProductWithClassifyProps;
  checked?: Boolean;
}
export interface CartContextProps {
  cart: CartDataProps[];
  updateAll: (items: CartDataProps[]) => void;
  add: (newItem: CartDataProps) => void;
  update: (newQuantity: number, id: string) => void;
  remove: (id: string) => void;
  markCheck: (id: string, checked: Boolean) => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);
interface Props {
  children: ReactNode;
}
function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartDataProps[]>([]);

  function updateAll(items: CartDataProps[]) {
    return setCart(items);
  }

  function add(newItem: CartDataProps) {
    return setCart([newItem, ...cart]);
  }

  function update(newQuantity: number, id: string) {
    return setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }

  function remove(id: string) {
    return setCart(cart.filter((item) => item.id !== id));
  }

  function markCheck(id: string, checked: Boolean) {
    return setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, checked };
        }
        return item;
      })
    );
  }
  return (
    <CartContext.Provider
      value={{ cart, updateAll, add, update, remove, markCheck }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
