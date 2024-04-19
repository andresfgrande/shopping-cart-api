import { UserId } from '../domain/userId';
import { ShoppingCart } from '../domain/shopping.cart';

export interface ShoppingCartRepository {
  getByUserId(id: UserId): Promise<ShoppingCart>;

  save(shoppingCart: ShoppingCart): Promise<void>;
}
