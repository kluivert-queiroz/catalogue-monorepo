import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field((type) => String)
  _id: string;

  @Prop()
  @Field()
  username: string;

  @Prop()
  password?: string;

  @Prop()
  @Field()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
