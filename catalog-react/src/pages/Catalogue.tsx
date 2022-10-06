import LineItem from "../components/LineItem";
import useProducts from "../hooks/useProducts";
import { Product } from "../types/product";
import { Container, Stack } from "@mantine/core";
import Header from "../components/Header";
import LatestChanges from "../components/LatestChanges";

const Catalogue = () => {
  const products = useProducts();
  if (!products) return <div>Loading</div>;
  return (
    <Container size="xs">
      <Header />
      <Stack>
        {products.map((product: Product) => (
          <LineItem {...product} />
        ))}
      </Stack>
      <LatestChanges />
    </Container>
  );
};

export default Catalogue;
