import { CartItem } from '../models/cartItem.model';

export class ItemsAddedOnCartEvent {
  items: CartItem[];
  constructor({ items }: ItemsAddedOnCartEvent) {
    this.items = items;
  }
}
