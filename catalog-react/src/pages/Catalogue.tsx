import LineItem from "../components/LineItem";
import useProducts from "../hooks/useProducts";
import { Product } from "../types/product";
import { Container, Skeleton, Stack } from "@mantine/core";
import Header from "../components/Header";
import LatestChanges from "../components/LatestChanges";

const ProductsSkeleton = () => {
  const numberOfSkeletons = 3;
  return (
    <>
      {[...Array(numberOfSkeletons)].map(() => (
        <Skeleton height={100} />
      ))}
    </>
  );
};
const Catalogue = () => {
  const products = useProducts();
  return (
    <Container size="xs">
      <Header />
      <Stack>
        {products ? (
          products.map((product: Product) => <LineItem {...product} />)
        ) : (
          <ProductsSkeleton />
        )}
      </Stack>
      <LatestChanges />
    </Container>
  );
};

export default Catalogue;
