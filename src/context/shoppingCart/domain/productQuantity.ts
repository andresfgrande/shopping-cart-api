export class ProductQuantity {
  constructor(private quantity: number) {
    if (quantity < 0) {
      throw new Error('quantity must be a positive integer');
    }
  }

  addQuantity(value: ProductQuantity): ProductQuantity {
    return new ProductQuantity(this.quantity + value.quantity);
  }

  value(): number {
    return this.quantity;
  }
}
