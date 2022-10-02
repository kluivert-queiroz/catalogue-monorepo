import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemInput } from './dto/cart.inputs';
import { Cart, CartDocument } from './models/cart.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ItemsAddedOnCartEvent } from './events/itemsAdded-on-cart.event';

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
    return await this.cartModel.findByIdAndUpdate(cartId, { items }).exec();
  }
}
