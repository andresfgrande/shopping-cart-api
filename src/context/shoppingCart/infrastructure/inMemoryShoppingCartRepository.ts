import { ShoppingCart } from '../domain/shopping.cart';
import { UserId } from '../domain/userId';
import { Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from './shoppingCartRepository';

@Injectable()
export class InMemoryShoppingCartRepository implements ShoppingCartRepository {
  private carts = new Map<string, ShoppingCart>();

  getByUserId(id: UserId): Promise<ShoppingCart> {
    return Promise.resolve(this.carts.get(id.toString()));
  }

  save(shoppingCart: ShoppingCart): Promise<void> {
    this.carts.set(shoppingCart.getUserId(), shoppingCart);
    return Promise.resolve();
  }
}
