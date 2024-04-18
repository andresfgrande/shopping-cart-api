interface ProductResponse {
  idProduct: string;
  name: string;
  price: number;
}

interface ProductPrimitives {
  idProduct: string;
  name: string;
  price: number;
}

//Wrap primitives and strings
export class ProductId {
  constructor(private id: string) {}

  toString() {
    return this.id;
  }
}

export class ProductName {
  constructor(private name: string) {}

  toString() {
    return this.name;
  }
}

export class Price {
  constructor(private price: number) {}

  toNumber() {
    return this.price;
  }
}

export class Product {
  constructor(
    private idProduct: ProductId,
    private name: ProductName,
    private price: Price,
  ) {}

  static fromPrimitives(productPrimitives: {
    idProduct: string;
    name: string;
    price: number;
  }): Product {
    return new Product(
      new ProductId(productPrimitives.idProduct),
      new ProductName(productPrimitives.name),
      new Price(productPrimitives.price),
    );
  }

  toPrimitives(): ProductPrimitives {
    const content: ProductPrimitives = {
      idProduct: this.idProduct.toString(),
      name: this.name.toString(),
      price: this.price.toNumber(),
    };

    return content;
  }

  getProductId(): string {
    return this.idProduct.toString();
  }
}
