import { gql } from "@apollo/client";

export const CREATE_EMPTY_CART = gql`
  mutation CreateEmptyCart {
    createCart(items: []) {
      _id
    }
  }
`;
export interface GetCartVars {
  cartId: string;
}
export const GET_CART = gql`
  query GetCartById($cartId: String!) {
    findCartById(cartId: $cartId) {
      _id
      items {
        quantity
        product {
          _id
          title
          description
          price
          stock
        }
      }
    }
  }
`;
export type CartItemVar = { quantity: number; product: string }
export interface AddItemsToCartVars {
  cartId: string;
  items: CartItemVar[];
}
export const ADD_ITEMS_TO_CART = gql`
  mutation AddItemsToCart($cartId: String!, $items: [CartItemInput!]) {
    addItemsToCart(cartId: $cartId, items: $items) {
      _id
      items {
        quantity
        product {
          _id
          title
					stock
        }
      }
    }
  }
`;

export interface RemoveItemsFromCartVars {
  cartId: string;
  items: CartItemVar[];
}
export const REMOVE_ITEMS_FROM_CART = gql`
  mutation RemoveItemsFromCart($cartId: String!, $items: [CartItemInput!]) {
    removeItemsFromCart(cartId: $cartId, items: $items) {
      _id
      items {
        quantity
        product {
          _id
          title
					stock
        }
      }
    }
  }
`;