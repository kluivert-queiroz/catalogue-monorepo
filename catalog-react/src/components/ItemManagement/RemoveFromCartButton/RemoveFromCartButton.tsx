import { useMutation } from "@apollo/client";
import { Button } from "@mantine/core";
import {
  RemoveItemsFromCartVars,
  REMOVE_ITEMS_FROM_CART,
} from "../../../graphql/carts";
import { GET_PRODUCTS } from "../../../graphql/products";
import { Cart } from "../../../types/cart";
interface RemoveFromCartButtonProps {
  cart: Cart;
  quantity: number;
  productId: string;
}
const RemoveFromCartButton = ({
  cart,
  quantity,
  productId,
}: RemoveFromCartButtonProps) => {
  const [removeItemsFromCartMutation, { loading: isLoading }] = useMutation<
    { removeItemsFromCart: Cart },
    RemoveItemsFromCartVars
  >(REMOVE_ITEMS_FROM_CART, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleRemoveFromCart = () => {
    removeItemsFromCartMutation({
      variables: {
        cartId: cart?._id!!,
        items: [{ product: productId, quantity }],
      },
    });
  };
  const isDisabled = isLoading || quantity === 0;
  return (
    <Button color="orange" onClick={handleRemoveFromCart} disabled={isDisabled} loading={isLoading}>
      Remove from cart
    </Button>
  );
};

export default RemoveFromCartButton;
