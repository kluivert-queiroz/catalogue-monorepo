import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import { CartContext } from "./contexts/CartContext";
import { CREATE_EMPTY_CART } from "./graphql/carts";
import Catalogue from "./pages/Catalogue";
import { Cart } from "./types/cart";
function App() {
  const [createCart, { data: emptyCartData }] = useMutation<{
    createCart: Cart;
  }>(CREATE_EMPTY_CART);
  useEffect(() => {
    createCart();
  }, []);
  if (!emptyCartData?.createCart) return <div>Loading</div>;
  return (
    <CartContext.Provider value={emptyCartData.createCart}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Catalogue />
      </MantineProvider>
    </CartContext.Provider>
  );
}

export default App;
