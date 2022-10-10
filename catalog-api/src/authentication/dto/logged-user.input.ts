import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'username' })
  username: string;
  @Field(() => String, { description: 'password' })
  password: string;
}
