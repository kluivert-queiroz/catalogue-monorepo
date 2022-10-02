import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query((type) => [Product])
  async products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Mutation((returns) => Product)
  async createProduct(
    @Args('createProductData') createProductData: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create(createProductData);
  }
}
