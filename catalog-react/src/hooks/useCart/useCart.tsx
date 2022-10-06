import { useLazyQuery } from "@apollo/client";
import { useEffect, useContext } from "react";
import { GetCartVars, GET_CART } from "../../graphql/carts";
import { Cart } from "../../types/cart";
import { CartContext } from "../../contexts/CartContext";

const useCart = () => {
  const cart = useContext(CartContext) as Cart;

  const [getCart, { data }] = useLazyQuery<{ findCartById: Cart }, GetCartVars>(
    GET_CART
  );

  useEffect(() => {
    if (cart) getCart({ variables: { cartId: cart._id } });
  }, [cart, getCart]);

  return { cart: data?.findCartById };
};

export default useCart;
