import { ProductId, ProductName } from './product';
import { ShoppingCartItems } from './shoppingCartItems';
import {
  ShoppingCartItem,
  ShoppingCartItemInterface,
} from './shoppingCartItem';
import { UserId } from './userId';
import { ProductQuantity } from './productQuantity';
import { CreationDate } from './creationDate';
import { Price } from './price';

export interface ShoppingCartPrimitives {
  creationDate: string;
  idUser: string;
  items: ShoppingCartItemInterface[]; //Add name
}

export class ShoppingCart {
  private creationDate: CreationDate;

  private idUser: UserId;

  private items: ShoppingCartItems;

  constructor(idUser: UserId, creationDate: CreationDate) {
    this.idUser = idUser;
    this.creationDate = creationDate;
    this.items = new ShoppingCartItems();
  }

  static fromPrimitives(
    shoppingCartPrimitives: ShoppingCartPrimitives,
  ): ShoppingCart {
    const shoppingCart = new ShoppingCart(
      new UserId(shoppingCartPrimitives.idUser),
      new CreationDate(shoppingCartPrimitives.creationDate),
    );
    shoppingCart.items = ShoppingCartItems.fromPrimitives(
      shoppingCartPrimitives.items,
    );
    return shoppingCart;
  }

  toPrimitives(): ShoppingCartPrimitives {
    const content: ShoppingCartPrimitives = {
      creationDate: this.creationDate.toString(),
      idUser: this.idUser.toString(),
      items: this.items.toPrimitives(),
    };
    return content;
  }

  addItem(
    idProduct: string,
    name: string,
    unitPrice: number,
    quantity: number,
  ): void {
    this.items.addItem(
      new ShoppingCartItem(
        new ProductId(idProduct),
        new ProductName(name),
        new Price(unitPrice),
        new ProductQuantity(quantity),
      ),
    );
  }

  getUserId(): string {
    return this.idUser.toString();
  }

  getCartTotal(): number {
    return this.items.getTotal();
  }
}
