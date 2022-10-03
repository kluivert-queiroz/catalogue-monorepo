import LineItem from "../components/LineItem";
import useProducts from "../hooks/useProducts";
import { Product } from "../types/product";
import { Container, Paper } from "@mantine/core";
import Header from "../components/Header";
import LatestChanges from "../components/LatestChanges";
import useCart from "../hooks/useCart";

const Catalogue = () => {
  const products = useProducts();
  if (!products) return <div>Loading</div>;
  return (
    <Container size="xs">
      <Header />
      <Paper shadow="xs" p="xs">
        {products.map((product: Product) => (
          <LineItem {...product} />
        ))}
      </Paper>
      <LatestChanges />
    </Container>
  );
};

export default Catalogue;
