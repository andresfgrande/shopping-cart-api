import { ShoppingCart } from '../domain/shopping.cart';
import { UserId } from '../domain/userId';
import { Injectable } from '@nestjs/common';
import { MongoService } from './mongoService';

@Injectable()
export class MongoShoppingCartRepository {
  constructor(private mongoService: MongoService) {}

  async getByUserId(id: UserId): Promise<ShoppingCart> {
    const shoppingCarts = await this.mongoService
      .getDatabase()
      .collection('shoppingcarts')
      .findOne({ idUser: id.toString() });

    if (!shoppingCarts) {
      return undefined;
    }

    return ShoppingCart.fromPrimitives({
      idUser: shoppingCarts.idUser,
      creationDate: shoppingCarts.creationDate,
      items: shoppingCarts.items,
    });
  }

  async save(shoppingCart: ShoppingCart): Promise<void> {
    const shoppingCartData = {
      idUser: shoppingCart.getUserId(),
      creationDate: shoppingCart.toPrimitives().creationDate,
      items: shoppingCart.toPrimitives().items,
    };
    await this.mongoService
      .getDatabase()
      .collection('shoppingcarts')
      .updateOne(
        { idUser: shoppingCart.getUserId() },
        { $set: shoppingCartData },
        { upsert: true },
      );
  }
}
