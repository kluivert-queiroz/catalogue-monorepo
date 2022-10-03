import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemInput } from './dto/cart.inputs';
import { Cart, CartDocument } from './models/cart.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ItemsAddedOnCartEvent } from './events/items-added-on-cart.event';
import { ItemsRemovedFromCartEvent } from './events/items-removed-from-cart.event';
import { ProductsService } from 'src/products/products.service';
import { ITEMS_ADDED_TO_CART, ITEMS_REMOVED_FROM_CART } from './carts.resolver';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private eventEmitter: EventEmitter2,
    private productsService: ProductsService,
    @Inject(PUB_SUB) private pubSub: PubSub,
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

  async addItemToCart(
    cartId: String,
    items: CartItemInput[] = [],
  ): Promise<Cart> {
    const products = await this.productsService.findByIds(
      items.map((item) => item.product.toString()),
    );
    const modifiedItems: CartItemInput[] = [];
    // TODO bulk operation
    for (let item of items) {
      const matchProduct = products.find(
        (product) => product._id.toString() === item.product.toString(),
      );
      if (matchProduct.stock < item.quantity) continue;
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
      this.pubSub.publish(ITEMS_ADDED_TO_CART, { itemsAddedToCart: items });
    }
    return await this.cartModel.findById(cartId);
  }
  async removeItemsFromCart(
    cartId: String,
    items: CartItemInput[] = [],
  ): Promise<Cart> {
    const cart = await this.cartModel.findById(cartId);
    let modifiedItems: CartItemInput[] = [];
    for (let item of items) {
      const currentProductInCart = cart.items.find(
        (cartItem) => cartItem.product.toString() === item.product.toString(),
      );
      if (!currentProductInCart) continue;
      if (item.quantity > currentProductInCart.quantity) {
        item.quantity = currentProductInCart.quantity;
      }
      if (item.quantity !== 0) modifiedItems.push(item);
      await this.cartModel.updateOne(
        { _id: cartId },
        {
          $inc: { 'items.$[item].quantity': -item.quantity },
        },
        {
          arrayFilters: [{ 'item.product': { $eq: item.product } }],
        },
      );
    }
    if (modifiedItems.length > 0) {
      this.eventEmitter.emit(
        'cart.itemsRemoved',
        new ItemsRemovedFromCartEvent({
          items: modifiedItems,
        }),
      );
      this.pubSub.publish(ITEMS_REMOVED_FROM_CART, {
        itemsRemovedFromCart: items,
      });
    }
    return await this.cartModel.findById(cartId);
  }
}
