import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { LoginUserInput } from './dto/logged-user.input';
import { LoggedUserOutput } from './dto/logged-user.output';

class TokenSet {
  access_token: string;
}
@Resolver()
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @Mutation(() => LoggedUserOutput)
  async loginUser(@Args('input') input: LoginUserInput) {
    const user = await this.authenticationService.validateUser(
      input.username,
      input.password,
    );
    if (!user) {
      throw new BadRequestException(`Email or password is invalid`);
    }
    return this.authenticationService.login(user);
  }
}
