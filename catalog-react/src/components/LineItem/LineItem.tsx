import { Grid, Text, Modal, useMantineTheme, Button } from "@mantine/core";
import { useState } from "react";
import { Product } from "../../types/product";
import ItemManagement from "../ItemManagement";

const LineItem = (product: Product) => {
  const { title, stock } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalState = (state: boolean) => () => {
    setIsModalOpen(state);
  };
  const theme = useMantineTheme();

  return (
    <>
      <div onClick={handleModalState(true)}>
        <Grid>
          <Grid.Col span="content">
            <Text>{title}</Text>
          </Grid.Col>
          <Grid.Col span="auto">
            <Text align="right">{stock}</Text>
          </Grid.Col>
        </Grid>
      </div>
      <Modal
        opened={isModalOpen}
        title="Add to cart"
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
    </>
  );
};

export default LineItem;
