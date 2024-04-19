//import { InMemoryShoppingCartRepository } from '../infrastructure/inMemoryShoppingCartRepository';
import { DateGenerator } from '../infrastructure/dateGenerator';
import { ShoppingCart } from '../domain/shopping.cart';
import { ProductId } from '../domain/product';
import { UserId } from '../domain/userId';
import { CreationDate } from '../domain/creationDate';
import { Inject, Injectable } from '@nestjs/common';

import { ShoppingCartRepository } from '../infrastructure/shoppingCartRepository';
import { ProductRepository } from '../infrastructure/productRepository';

export interface AddItemAdderRequest {
  idUser: string;
  quantity: number;
  idProduct: string;
}

@Injectable()
export class ProductAdder {
  constructor(
    @Inject('ShoppingCartRepository')
    private shoppingCartRepository: ShoppingCartRepository,
    private dateGenerator: DateGenerator,
    @Inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  async execute(addProductRequest: AddItemAdderRequest): Promise<void> {
    let currentShoppingCart = await this.shoppingCartRepository.getByUserId(
      new UserId(addProductRequest.idUser),
    );

    const product = await this.productRepository.getProductById(
      new ProductId(addProductRequest.idProduct),
    );
    if (!product) {
      throw new Error('product does not exist');
    }

    if (!currentShoppingCart) {
      currentShoppingCart = new ShoppingCart(
        new UserId(addProductRequest.idUser),
        new CreationDate(this.dateGenerator.getDate()),
      );
    }

    currentShoppingCart.addItem(
      addProductRequest.idProduct,
      product.toPrimitives().name,
      product.toPrimitives().price,
      addProductRequest.quantity,
    );
    await this.shoppingCartRepository.save(currentShoppingCart);
  }
}
