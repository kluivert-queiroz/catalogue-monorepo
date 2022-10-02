import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'src/products/products.module';
import { CartItemResolver } from './cartItem.resolver';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';
import { Cart, CartSchema } from './models/cart.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
    ]),
    ProductsModule,
  ],
  providers: [CartsResolver, CartItemResolver, CartsService],
})
export class CartsModule {}
