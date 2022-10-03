import { CartItem } from '../models/cartItem.model';

export class ItemsRemovedFromCartEvent {
  items: CartItem[];
  constructor({ items }: ItemsRemovedFromCartEvent) {
    this.items = items;
  }
}
