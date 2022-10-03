import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useContext } from "react";
import {
  AddItemsToCartVars,
  ADD_ITEMS_TO_CART,
  CartItemVar,
  GetCartVars,
  GET_CART,
  RemoveItemsFromCartVars,
  REMOVE_ITEMS_FROM_CART,
} from "../../graphql/carts";
import { Cart } from "../../types/cart";
import { CartContext } from "../../contexts/CartContext";

const useCart = () => {
  const cart = useContext(CartContext) as Cart;

  const [getCart, { data }] = useLazyQuery<{ findCartById: Cart }, GetCartVars>(
    GET_CART
  );

  useEffect(() => {
    if (cart) getCart({ variables: { cartId: cart._id } });
  }, [cart]);

  return { data: data?.findCartById };
};

export default useCart;
