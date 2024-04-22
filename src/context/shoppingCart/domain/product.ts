import { Price } from './price';

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

export class Product {
  private idProduct: ProductId;
  private name: ProductName;

  private price: Price;

  constructor(idProduct: ProductId, name: ProductName, price: Price) {
    this.idProduct = idProduct;
    this.name = name;
    this.price = price;
  }

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
    return {
      idProduct: this.idProduct.toString(),
      name: this.name.toString(),
      price: this.price.toNumber(),
    };
  }

  getProductId(): string {
    return this.idProduct.toString();
  }
}
