export class Price {
  constructor(private price: number) {}

  toNumber(): number {
    return this.price;
  }
}
