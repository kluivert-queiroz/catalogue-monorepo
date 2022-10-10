import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/authentication/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('input') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserData);
  }

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findById(user._id);
  }
}
