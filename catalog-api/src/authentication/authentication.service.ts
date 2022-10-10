import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, rawPassword: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user || !(await compare(rawPassword, user.password))) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
