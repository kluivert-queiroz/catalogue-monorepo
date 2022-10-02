import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  stock: number;
}
