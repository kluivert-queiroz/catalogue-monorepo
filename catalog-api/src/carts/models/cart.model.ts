import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';
import { CartItem, CartItemSchema } from './cartItem.model';

export type CartDocument = Cart & Document;

@Schema()
@ObjectType()
export class Cart {
  @Field((type) => String)
  _id: string;

  @Field((type) => [CartItem], { nullable: 'items' })
  @Prop({ type: [CartItemSchema] })
  items?: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
