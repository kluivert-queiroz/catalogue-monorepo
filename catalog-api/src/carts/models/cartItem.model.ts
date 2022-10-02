import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from 'src/products/models/product.model';

export type CartItemDocument = CartItem & Document;
@Schema({ _id: false, versionKey: false })
@ObjectType()
export class CartItem {
  @Field((type) => Int)
  @Prop({ required: true })
  quantity: number;

  @Field((type) => Product)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  product: MongooseSchema.Types.ObjectId | Product;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
