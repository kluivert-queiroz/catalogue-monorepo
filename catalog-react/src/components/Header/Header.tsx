import { Container, Stack, Text } from "@mantine/core";
import useCart from "../../hooks/useCart";
const Header = () => {
  const { cart } = useCart();
  const totalItemsInCart =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  return (
    <Container>
      <Stack>
        <Text weight={700} size="xl" align="center">Catalogue</Text>
        <Text align="right">Total in cart: {totalItemsInCart} item(s)</Text>
      </Stack>
    </Container>
  );
};

export default Header;
