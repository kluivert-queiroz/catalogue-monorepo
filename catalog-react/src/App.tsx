import { MantineProvider } from "@mantine/core";
import Catalogue from "./pages/Catalogue";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Catalogue />
    </MantineProvider>
  );
}

export default App;
