import { Product, ProductId } from '../domain/product';
import { Injectable } from '@nestjs/common';

import { MongoService } from './mongoService';

@Injectable()
export class MongoProductRepository {
  constructor(private mongoService: MongoService) {
    //this.seedProducts();
  }

  async getProductById(id: ProductId): Promise<Product> {
    const products = await this.mongoService
      .getDatabase()
      .collection('products')
      .findOne({ idProduct: id.toString() });

    return Product.fromPrimitives({
      idProduct: products.idProduct,
      name: products.name,
      price: products.price,
    });
  }

  async save(product: Product): Promise<void> {
    const productData = {
      idProduct: product.toPrimitives().idProduct,
      name: product.toPrimitives().name,
      price: product.toPrimitives().price,
    };
    await this.mongoService
      .getDatabase()
      .collection('products')
      .updateOne(
        { idProduct: product.getProductId() },
        { $set: productData },
        { upsert: true },
      );
  }
}
