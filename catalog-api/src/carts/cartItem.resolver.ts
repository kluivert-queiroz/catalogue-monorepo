import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from 'src/products/models/product.model';
import { ProductsService } from 'src/products/products.service';
import { CartItem, CartItemDocument } from './models/cartItem.model';

@Resolver((of) => CartItem)
export class CartItemResolver {
  constructor(private productsService: ProductsService) {}
  @ResolveField('product', (returns) => Product)
  async product(@Parent() cartItem: CartItemDocument): Promise<Product> {
    return await this.productsService.findById(cartItem.product.toString());
  }
}
