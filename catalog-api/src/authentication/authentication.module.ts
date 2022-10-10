import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthenticationResolver } from './authentication.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    AuthenticationResolver,
    GqlAuthGuard,
    JwtStrategy,
  ],
  exports: [AuthenticationService, GqlAuthGuard, JwtModule],
})
export class AuthenticationModule {}
