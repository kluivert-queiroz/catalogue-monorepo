import LineItem from "../components/LineItem";
import useProducts from "../hooks/useProducts";
import { Product } from "../types/product";
import { Container, Paper } from "@mantine/core";
import Header from "../components/Header";

const Catalogue = () => {
  const products = useProducts();
  return (
    <Container size="xs">
      <Header />
      <Paper shadow="xs" p="xs">
        {products.map((product: Product) => (
          <LineItem {...product} />
        ))}
      </Paper>
    </Container>
  );
};

export default Catalogue;
