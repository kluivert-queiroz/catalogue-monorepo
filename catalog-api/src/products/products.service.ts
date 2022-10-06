import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemsAddedOnCartEvent } from 'src/carts/events/items-added-on-cart.event';
import { CreateProductInput } from './dto/create-product.input';
import { Product, ProductDocument } from './models/product.model';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';

export const ITEMS_ADDED_TO_CART = 'itemsAddedToCart';
export const ITEMS_REMOVED_FROM_CART = 'itemsRemovedFromCart';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async create(createProductDto: CreateProductInput): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findById(id: String): Promise<Product> {
    return this.productModel.findById(id).exec();
  }
  async findByIds(idList: String[]): Promise<Product[]> {
    return this.productModel.find({ _id: { $in: idList } }).exec();
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  @OnEvent('cart.itemsAdded')
  async handleItemsAddedOnCart(payload: ItemsAddedOnCartEvent) {
    const bulkOperations = payload.items.map((item) => ({
      updateOne: {
        filter: { _id: item.product.toString() },
        update: {
          $inc: { stock: -item.quantity },
        },
      },
    }));
    this.pubSub.publish(ITEMS_ADDED_TO_CART, {
      itemsAddedToCart: payload.items,
    });
    // https://github.com/Automattic/mongoose/issues/11911
    return await this.productModel.bulkWrite(bulkOperations as any);
  }
  @OnEvent('cart.itemsRemoved')
  async handleItemsRemovedFromCart(payload: ItemsAddedOnCartEvent) {
    const bulkOperations = payload.items.map((item) => ({
      updateOne: {
        filter: { _id: item.product.toString() },
        update: {
          $inc: { stock: item.quantity },
        },
      },
    }));
    this.pubSub.publish(ITEMS_REMOVED_FROM_CART, {
      itemsRemovedFromCart: payload.items,
    });
    // https://github.com/Automattic/mongoose/issues/11911
    return await this.productModel.bulkWrite(bulkOperations as any);
  }
}
