import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      title
      description
      price
      stock
    }
  }
`;

export const ITEMS_ADDED_TO_CART = gql`
  subscription StockDecreased {
    itemsAddedToCart {
      quantity
      product {
        title
      }
    }
  }
`;

export const ITEMS_REMOVED_FROM_CART = gql`
  subscription StockIncreased {
    itemsRemovedFromCart {
      quantity
      product {
        title
      }
    }
  }
`;
