//Class Collections
import { Price, ProductId, ProductName } from './product';

import { ProductQuantity } from './productQuantity';

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
