import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ITEMS_ADDED_TO_CART, ITEMS_REMOVED_FROM_CART } from 'src/products/products.service';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { CartsService } from './carts.service';
import { CartItemInput } from './dto/cart.inputs';
import { Cart } from './models/cart.model';
import { CartItem } from './models/cartItem.model';

@Resolver((of) => Cart)
export class CartsResolver {
  constructor(
    private cartsService: CartsService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Query((type) => [Cart])
  async carts(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }
  @Query((type) => Cart, { nullable: true })
  async findCartById(@Args('cartId') cartId: String): Promise<Cart> {
    return this.cartsService.findById(cartId);
  }
  @Mutation((returns) => Cart)
  async createCart(
    @Args({ name: 'items', type: () => [CartItemInput], nullable: true })
    items: CartItemInput[],
  ): Promise<Cart> {
    return await this.cartsService.create(items);
  }
  @Mutation((returns) => Cart)
  async addItemsToCart(
    @Args('cartId') cartId: String,
    @Args({ name: 'items', type: () => [CartItemInput], nullable: true })
    items: CartItemInput[],
  ): Promise<Cart> {
    return await this.cartsService.addItemToCart(cartId, items);
  }
  @Mutation((returns) => Cart)
  async removeItemsFromCart(
    @Args('cartId') cartId: String,
    @Args({ name: 'items', type: () => [CartItemInput], nullable: true })
    items: CartItemInput[],
  ): Promise<Cart> {
    return await this.cartsService.removeItemsFromCart(cartId, items);
  }
  @Subscription(() => [CartItem])
  itemsAddedToCart() {
    return this.pubSub.asyncIterator(ITEMS_ADDED_TO_CART);
  }
  @Subscription(() => [CartItem])
  itemsRemovedFromCart() {
    return this.pubSub.asyncIterator(ITEMS_REMOVED_FROM_CART);
  }
}
