//Class Collections
import { ProductId, ProductName } from './product';

import { ProductQuantity } from './productQuantity';
import { Price } from './price';

export interface ShoppingCartItemInterface {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export class ShoppingCartItem {
  constructor(
    private id: ProductId,
    private name: ProductName,
    private unitPrice: Price,
    private quantity: ProductQuantity,
  ) {}

  getQuantity(): ProductQuantity {
    return this.quantity;
  }

  getTotal(): number {
    //const quantity = this.quantity.value();
    //const unitPrice = this.unitPrice.value();
    //return quantity * unitPrice;
    return this.quantity.value() * this.unitPrice.toNumber();
  }

  getProductId(): ProductId {
    return this.id;
  }

  addQuantity(quantity: ProductQuantity): void {
    this.quantity = this.quantity.addQuantity(quantity);
  }

  toPrimitives(): ShoppingCartItemInterface {
    return {
      id: this.getProductId().toString(),
      name: this.name.toString(),
      unitPrice: this.unitPrice.toNumber(),
      quantity: this.getQuantity().value(),
      total: this.getTotal(),
    };
  }
}
