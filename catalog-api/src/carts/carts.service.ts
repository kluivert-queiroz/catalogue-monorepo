import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemInput } from './dto/cart.inputs';
import { Cart, CartDocument } from './models/cart.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ItemsAddedOnCartEvent } from './events/items-added-on-cart.event';
import { ItemsRemovedFromCartEvent } from './events/items-removed-from-cart.event';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private eventEmitter: EventEmitter2,
  ) {}
  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec();
  }
  async create(items?: CartItemInput[]): Promise<Cart> {
    const createdCart = new this.cartModel();
    let cart = await createdCart.save();
    if (!items) return cart;
    return await this.addItemToCart(cart._id, items);
  }

  async addItemToCart(
    cartId: String,
    items: CartItemInput[] = [],
  ): Promise<Cart> {
    this.eventEmitter.emit(
      'cart.itemsAdded',
      new ItemsAddedOnCartEvent({
        items,
      }),
    );
    for (let item of items)
      await this.cartModel.updateOne(
        {
          _id: cartId,
          'items.product': item.product,
        },
        { $inc: { 'items.$.quantity': item.quantity } },
      );
    return await this.cartModel.findById(cartId)
  }
  async removeItemsFromCart(
    cartId: String,
    items: CartItemInput[] = [],
  ): Promise<Cart> {
    this.eventEmitter.emit(
      'cart.itemsRemoved',
      new ItemsRemovedFromCartEvent({
        items,
      }),
    );
    for (let item of items)
      await this.cartModel.updateOne(
        {
          _id: cartId,
          'items.product': item.product,
        },
        { $inc: { 'items.$.quantity': -item.quantity } },
      );
    return await this.cartModel.findById(cartId)
  }
}
