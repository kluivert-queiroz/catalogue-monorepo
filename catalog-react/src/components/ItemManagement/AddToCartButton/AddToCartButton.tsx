import { useMutation } from "@apollo/client";
import { Button } from "@mantine/core";
import { GET_PRODUCTS } from "../../../graphql/products";
import { Cart } from "../../../types/cart";
import { AddItemsToCartVars, ADD_ITEMS_TO_CART } from "../../../graphql/carts";

interface AddToCartButtonProps {
  cart: Cart;
  quantity: number;
  productId: string;
}
const AddToCartButton = ({
  cart,
  quantity,
  productId,
}: AddToCartButtonProps) => {
  const [addItemsToCartMutation, { loading: isLoading }] = useMutation<
    { addItemsToCart: Cart },
    AddItemsToCartVars
  >(ADD_ITEMS_TO_CART, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const handleClick = () => {
    addItemsToCartMutation({
      variables: {
        cartId: cart._id!!,
        items: [{ product: productId, quantity }],
      },
    });
  };
  return (
    <Button color="green" onClick={handleClick} disabled={isLoading}>
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
