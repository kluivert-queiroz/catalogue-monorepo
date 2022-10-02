import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from './carts/carts.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/app'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true
      },
    }),
    EventEmitterModule.forRoot(),
    ProductsModule,
    CartsModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
