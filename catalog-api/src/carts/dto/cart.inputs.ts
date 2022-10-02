import { Field, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CartItemInput {
  @Field((type) => Int)
  quantity: number;

  @Field(() => String)
  product: MongooseSchema.Types.ObjectId;
}
