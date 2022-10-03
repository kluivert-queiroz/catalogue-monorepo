import { Grid, Text } from "@mantine/core";
import useCart from "../../hooks/useCart";
const Header = () => {
  const { data: cart } = useCart();
  const totalItemsInCart = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  return (
    <Grid>
      <Grid.Col span="auto">Catalogue Application</Grid.Col>
      <Grid.Col span="auto">
        <Text align="right">Total in cart: {totalItemsInCart} item(s)</Text>
      </Grid.Col>
    </Grid>
  );
};

export default Header;
