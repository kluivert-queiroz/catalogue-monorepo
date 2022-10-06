import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemInput } from './dto/cart.inputs';
import { Cart, CartDocument } from './models/cart.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ItemsAddedOnCartEvent } from './events/items-added-on-cart.event';
import { ItemsRemovedFromCartEvent } from './events/items-removed-from-cart.event';
import { ProductsService } from 'src/products/products.service';
import { CartItem } from './models/cartItem.model';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private eventEmitter: EventEmitter2,
    private productsService: ProductsService,
  ) {}
  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec();
  }
  async findById(id: String): Promise<Cart> {
    return await this.cartModel.findById(id).exec();
  }
  async create(items?: CartItemInput[]): Promise<Cart> {
    const createdCart = new this.cartModel();
    let cart = await createdCart.save();
    if (!items) return cart;
    return await this.addItemToCart(cart._id, items);
  }
  private async canAddProductToCart(item: CartItemInput): Promise<boolean> {
    const product = await this.productsService.findById(
      item.product.toString(),
    );
    if (product.stock < item.quantity) return false;
    return true;
  }
  async addItemToCart(
    cartId: String,
    items: CartItemInput[] = [],
  ): Promise<Cart> {
    const modifiedItems: CartItemInput[] = [];
    // TODO bulk operation
    for (let item of items) {
      if (!(await this.canAddProductToCart(item))) continue;
      await this.cartModel.updateOne(
        { _id: cartId },
        {
          $inc: { 'items.$[item].quantity': item.quantity },
        },
        {
          arrayFilters: [{ 'item.product': { $eq: item.product } }],
        },
      );
      await this.cartModel.updateOne(
        { _id: cartId, 'items.product': { $ne: item.product } },
        {
          $push: { items: { ...item } },
        },
      );
      modifiedItems.push(item);
    }
    if (modifiedItems.length > 0) {
      this.eventEmitter.emit(
        'cart.itemsAdded',
        new ItemsAddedOnCartEvent({
          items: modifiedItems,
        }),
      );
    }
    return await this.cartModel.findById(cartId);
  }
  private async getItemFromCart(
    cart: Cart,
    productId: string,
  ): Promise<CartItem> {
    return cart.items.find(
      (cartItem) => cartItem.product.toString() === productId,
    );
  }
  private async ensureItemsAreRemovableFromCart(
    cart: Cart,
    items: CartItemInput[],
  ): Promise<CartItemInput[]> {
    for (let item of items) {
      const cartItem = await this.getItemFromCart(
        cart,
        item.product.toString(),
      );
      if (!cartItem) continue;
      if (item.quantity > cartItem.quantity) {
        item.quantity = cartItem.quantity;
      }
    }
    return items;
  }
  async removeItemsFromCart(
    cartId: String,
    items: CartItemInput[] = [],
  ): Promise<Cart> {
    const cart = await this.cartModel.findById(cartId);
    let modifiedItems: CartItemInput[] = [];
    const removableItems = await this.ensureItemsAreRemovableFromCart(
      cart,
      items,
    );
    for (let item of removableItems) {
      await this.cartModel.updateOne(
        { _id: cartId },
        {
          $inc: { 'items.$[item].quantity': -item.quantity },
        },
        {
          arrayFilters: [{ 'item.product': { $eq: item.product } }],
        },
      );
      modifiedItems.push(item);
    }
    if (modifiedItems.length > 0) {
      this.eventEmitter.emit(
        'cart.itemsRemoved',
        new ItemsRemovedFromCartEvent({
          items: modifiedItems,
        }),
      );
    }
    return await this.cartModel.findById(cartId);
  }
}
