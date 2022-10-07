import { useSubscription } from "@apollo/client";
import { Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  ITEMS_ADDED_TO_CART,
  ITEMS_REMOVED_FROM_CART,
} from "../../graphql/products";
import { CartItem } from "../../types/product";
// @ts-ignore
import crosstab from "crosstab";
type ChangeType = "INCREASED" | "DECREASED";
type Change = {
  type: ChangeType;
  item: CartItem;
};
const LatestChanges = () => {
  useSubscription<{
    itemsAddedToCart: CartItem[];
  }>(ITEMS_ADDED_TO_CART, {
    onData: ({ data: incomingData }) =>
      handleIncomingData("DECREASED", incomingData.data?.itemsAddedToCart),
  });
  useSubscription<{
    itemsRemovedFromCart: CartItem[];
  }>(ITEMS_REMOVED_FROM_CART, {
    onData: ({ data: incomingData }) =>
      handleIncomingData("INCREASED", incomingData.data?.itemsRemovedFromCart),
  });
  const [changes, setChanges] = useState<Change[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const cartItemToChanges = (
    changeType: ChangeType,
    items: CartItem[]
  ): Change[] => {
    return items.map((item) => ({
      type: changeType,
      item,
    }));
  };
  const handleIncomingData = (type: ChangeType, items?: CartItem[]) => {
    crosstab.broadcast("stockEvent", { type, items });
  };
  useEffect(() => {
    if (!isOpen && changes.length > 0) handleModalState(true)();
  }, [changes, isOpen]);

  const handleModalState = (state: boolean) => () => {
    setIsOpen(state);
    if (state === false) setChanges([]);
  };

  crosstab.on("stockEvent", ({ data: { type, items } }: any) => {
    if (items) setChanges(cartItemToChanges(type, items));
  });
  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={handleModalState(false)}
        title="Stock updates"
      >
        {changes.map((change) => (
          <div>
            <Text>{`${change.item.product.title} quantity was ${change.type
              .toString()
              .toLowerCase()} by ${change.item.quantity}`}</Text>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default LatestChanges;
