import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
@ObjectType()
export class Product {
  @Field((type) => String)
  _id: string;

  @Prop()
  @Field()
  title: string;
  @Prop()
  @Field()
  description: string;
  @Prop()
  @Field((type) => Float)
  price: number;
  @Prop()
  @Field((type) => Int)
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
