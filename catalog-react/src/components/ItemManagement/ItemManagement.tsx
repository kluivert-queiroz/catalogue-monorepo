import { Product } from "../../types/product";
import { Button, Grid, NumberInput, Stack } from "@mantine/core";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Cart } from "../../types/cart";
import {
  AddItemsToCartVars,
  ADD_ITEMS_TO_CART,
  RemoveItemsFromCartVars,
  REMOVE_ITEMS_FROM_CART,
} from "../../graphql/carts";
import { GET_PRODUCTS } from "../../graphql/products";
import useCart from "../../hooks/useCart";
const ItemManagement = ({ title, description, _id, stock, price }: Product) => {
  const cart = useCart();
  const [addItemsToCartMutation, {loading: loadingForAdding}] = useMutation<
    { addItemsToCart: Cart },
    AddItemsToCartVars
  >(ADD_ITEMS_TO_CART, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const [removeItemsFromCartMutation, {loading: loadingForRemoving}] = useMutation<
    { removeItemsFromCart: Cart },
    RemoveItemsFromCartVars
  >(REMOVE_ITEMS_FROM_CART, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const [quantity, setQuantity] = useState(0);
  const currencyFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
  const handleQuantityChange = (qty: number) => {
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    addItemsToCartMutation({
      variables: {
        cartId: cart.data?._id!!,
        items: [{ product: _id, quantity }],
      },
    });
  };

  const handleRemoveFromCart = () => {
    removeItemsFromCartMutation({
      variables: {
        cartId: cart.data?._id!!,
        items: [{ product: _id, quantity }],
      },
    });
  };
  if (!cart) return <div>Loading</div>;
  const isLoading = loadingForAdding || loadingForRemoving
  return (
    <>
      <Grid grow>
        <Grid.Col span="content">{title}</Grid.Col>
        <Grid.Col span="auto">{currencyFormatter.format(price)}</Grid.Col>
        <Grid.Col span="auto">
          <NumberInput value={quantity} onChange={handleQuantityChange} />
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span="auto">{description}</Grid.Col>
        <Grid.Col span={3}>
          <Stack>
            <Button color="green" onClick={handleAddToCart} disabled={isLoading}>
              Add to cart
            </Button>
            <Button color="orange" onClick={handleRemoveFromCart} disabled={isLoading}>
              Remove from cart
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ItemManagement;
