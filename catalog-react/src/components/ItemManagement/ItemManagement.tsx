import { Product } from "../../types/product";
import { Grid, NumberInput, Stack, Text } from "@mantine/core";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./RemoveFromCartButton";
const ItemManagement = ({ title, description, _id, stock, price }: Product) => {
  const { cart } = useCart();
  const [quantity, setQuantity] = useState(0);
  const currencyFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
  const handleQuantityChange = (qty: number) => {
    setQuantity(qty);
  };

  if (!cart) return <div>Loading</div>;
  const quantityInCart =
    cart!!.items!!.find((item) => item.product._id === _id)?.quantity || 0;
  return (
    <>
      <Grid grow>
        <Grid.Col span="content">{title}</Grid.Col>
        <Grid.Col span="auto">{currencyFormatter.format(price)}</Grid.Col>
        <Grid.Col span="auto">
          <NumberInput
            value={quantity}
            onChange={handleQuantityChange}
            min={0}
            max={stock}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
          />
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span="auto">{description}</Grid.Col>
        <Grid.Col span={3}>
          <Stack>
            <AddToCartButton
              cart={cart!!}
              productId={_id}
              quantity={quantity}
            />
            <RemoveFromCartButton
              cart={cart!!}
              productId={_id}
              quantity={quantity}
            />
            <Text>This item's quantity in cart: {quantityInCart}</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ItemManagement;
