import { Price, Product, ProductId, ProductName } from '../domain/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryProductRepository {
  private products = new Map<string, Product>();

  constructor() {
    const newProduct = new Product(
      new ProductId('10002'),
      new ProductName('The Hobbit'),
      new Price(5),
    );
    const newProduct2 = new Product(
      new ProductId('20110'),
      new ProductName('Breaking Bad'),
      new Price(7),
    );
    const newProduct3 = new Product(
      new ProductId('20001'),
      new ProductName('Game of Thrones'),
      new Price(7),
    );
    this.save(newProduct);
    this.save(newProduct2);
    this.save(newProduct3);
  }

  getProductById(id: ProductId): Product {
    return this.products.get(id.toString());
  }

  save(product: Product) {
    this.products.set(product.getProductId(), product);
  }
}
