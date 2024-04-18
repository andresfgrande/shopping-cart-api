import { InMemoryShoppingCartRepository } from '../infrastructure/inMemoryShoppingCartRepository';
import { DateGenerator } from '../infrastructure/dateGenerator';
import { ShoppingCart } from '../domain/shopping.cart';
import { InMemoryProductRepository } from '../infrastructure/inMemoryProductRepository';
import { ProductId } from '../domain/product';
import { UserId } from '../domain/userId';
import { CreationDate } from '../domain/creationDate';
import { Injectable } from '@nestjs/common';

export interface AddItemAdderRequest {
  idUser: string;
  quantity: number;
  idProduct: string;
}

@Injectable()
export class ProductAdder {
  constructor(
    private shoppingCartRepository: InMemoryShoppingCartRepository,
    private dateGenerator: DateGenerator,
    private productRepository: InMemoryProductRepository,
  ) {}

  execute(addProductRequest: AddItemAdderRequest) {
    let currentShoppingCart = this.shoppingCartRepository.getByUserId(
      new UserId(addProductRequest.idUser),
    );

    const product = this.productRepository.getProductById(
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
    this.shoppingCartRepository.save(currentShoppingCart);
  }
}
