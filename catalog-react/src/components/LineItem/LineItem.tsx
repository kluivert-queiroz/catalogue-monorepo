import { Text, Modal, useMantineTheme, Button, Paper } from "@mantine/core";
import { useState } from "react";
import { Product } from "../../types/product";
import ItemManagement from "../ItemManagement";
import {
  ItemThumbnail,
  LineItemContainer,
  LineItemInformationContainer,
  LineItemPrice,
  LineItemStock,
} from "./styles";

const LineItem = (product: Product) => {
  const { title, stock, price, description } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalState = (state: boolean) => () => {
    setIsModalOpen(state);
  };
  const theme = useMantineTheme();
  const currencyFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
  return (
    <div>
      <Paper
        onClick={handleModalState(true)}
        style={{ cursor: "pointer" }}
        radius="md"
        p="md"
        withBorder
      >
        <LineItemContainer>
          <div>
            <ItemThumbnail
              alt={title}
              src="https://images-americanas.b2w.io/produtos/01/00/img/132248/7/132248770G1.jpg"
            />
          </div>
          <LineItemInformationContainer>
            <div>
              <Text weight={500}>{title}</Text>
            </div>
            <div>
              <Text>{description}</Text>
            </div>
            <LineItemPrice>
              <Text weight={700}>{currencyFormatter.format(price)}</Text>
            </LineItemPrice>
          </LineItemInformationContainer>
          <LineItemStock>
            <Text size="xs">Stock: {stock}</Text>
          </LineItemStock>
        </LineItemContainer>
      </Paper>
      <Modal
        opened={isModalOpen}
        title="Choose item"
        onClose={handleModalState(false)}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <ItemManagement {...product} />
        <div>
          <Button
            color="gray"
            variant="light"
            onClick={handleModalState(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LineItem;
