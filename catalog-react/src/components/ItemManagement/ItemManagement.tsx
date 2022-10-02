import { Product } from "../../types/product";
import { Button, Grid, NumberInput, Stack } from "@mantine/core";
import {  useState } from "react";
const ItemManagement = ({ title, description, sku, stock, price }: Product) => {
  const [quantity, setQuantity] = useState(0)
  const currencyFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
  const handleQuantityChange = (qty: number) => {
    setQuantity(qty)
  }
  return (
    <>
      <Grid grow>
        <Grid.Col span="auto">{sku}</Grid.Col>
        <Grid.Col span="content">{title}</Grid.Col>
        <Grid.Col span="auto">{currencyFormatter.format(price)}</Grid.Col>
        <Grid.Col span="auto">
          <NumberInput value={quantity} onChange={handleQuantityChange}/>
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span="auto">{description}</Grid.Col>
        <Grid.Col span={3}>
          <Stack>
            <Button color="green">Add to cart</Button>
            <Button color="orange">Remove from cart</Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ItemManagement;
