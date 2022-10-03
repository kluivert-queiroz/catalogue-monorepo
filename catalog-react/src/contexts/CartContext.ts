import { createContext } from "react";
import { Cart } from "../types/cart";

export const CartContext = createContext<Cart | null>(null);
