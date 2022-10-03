import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/products";
import { Product } from "../../types/product";

const useProducts = () => {
  const { data } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  return data?.products;
};

export default useProducts;
