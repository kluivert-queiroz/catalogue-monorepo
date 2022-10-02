import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemsAddedOnCartEvent } from 'src/carts/events/itemsAdded-on-cart.event';
import { CreateProductInput } from './dto/create-product.input';
import { Product, ProductDocument } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductInput): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findById(id: String): Promise<Product> {
    return this.productModel.findById(id).exec();
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  @OnEvent('cart.itemsAdded')
  async handleItemsAddedOnCart(payload: ItemsAddedOnCartEvent) {
    // const bulkOperations = payload.items.map((item) => ({
    //   updateOne: {
    //     filter: { _id: item.product.toString() },
    //     update: {
    //       stock: item.quantity,
    //     },
    //   },
    // }));
    const bulkOperations = [
      {
        updateOne: {
          filter: { name: 'Eddard Stark' },
          // If you were using the MongoDB driver directly, you'd need to do
          // `update: { $set: { title: ... } }` but mongoose adds $set for
          // you.
          update: { title: 'Hand of the King' },
        },
      },
    ];
    return await this.productModel.bulkWrite(bulkOperations);
  }
}
