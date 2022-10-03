import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { CartsService } from './carts.service';
import { CartItemInput } from './dto/cart.inputs';
import { Cart } from './models/cart.model';
import { CartItem } from './models/cartItem.model';

const ITEMS_ADDED_TO_CART = 'itemsAddedToCart';
const ITEMS_REMOVED_FROM_CART = 'itemsRemovedFromCart';
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
  @Mutation((returns) => Cart)
  async createCart(
    @Args({ name: 'items', type: () => [CartItemInput], nullable: true })
    items: CartItemInput[],
  ): Promise<Cart> {
    const cart = await this.cartsService.create(items);
    this.pubSub.publish(ITEMS_ADDED_TO_CART, { itemsAddedToCart: items });
    return cart;
  }
  @Mutation((returns) => Cart)
  async addItemsToCart(
    @Args('cartId') cartId: String,
    @Args({ name: 'items', type: () => [CartItemInput], nullable: true })
    items: CartItemInput[],
  ): Promise<Cart> {
    const cart = await this.cartsService.addItemToCart(cartId, items);
    this.pubSub.publish(ITEMS_ADDED_TO_CART, { itemsAddedToCart: items });
    return cart;
  }
  @Mutation((returns) => Cart)
  async removeItemsFromCart(
    @Args('cartId') cartId: String,
    @Args({ name: 'items', type: () => [CartItemInput], nullable: true })
    items: CartItemInput[],
  ): Promise<Cart> {
    const cart = await this.cartsService.removeItemsFromCart(cartId, items);
    this.pubSub.publish(ITEMS_REMOVED_FROM_CART, { itemsRemovedFromCart: items });
    return cart;
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
