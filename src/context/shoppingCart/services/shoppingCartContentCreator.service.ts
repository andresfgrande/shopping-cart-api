import {
  ContentRequest,
  ContentResponse,
} from '../../../api/shoppingCart.controller';
import { UserId } from '../domain/userId';
import { ProductId } from '../domain/product';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../infrastructure/productRepository';
import { ShoppingCartRepository } from '../infrastructure/shoppingCartRepository';

@Injectable()
export class ShoppingCartContentCreator {
  constructor(
    @Inject('ShoppingCartRepository')
    private shoppingCartRepository: ShoppingCartRepository,
    @Inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  async execute(request: ContentRequest): Promise<ContentResponse> {
    const userId = new UserId(request.idUser);
    const shoppingCart = await this.shoppingCartRepository.getByUserId(userId);
    if (!shoppingCart) {
      throw new Error('Shopping cart not found');
    }

    const shoppingCartContent = shoppingCart.toPrimitives();
    const items = shoppingCartContent.items;

    const productFetchPromises = items.map(
      async (item) =>
        await this.productRepository.getProductById(new ProductId(item.id)),
    );
    const products = await Promise.all(productFetchPromises);
    /* shoppingCart.toPrimitives()..map((item)=>{

    })*/
    const orders = products.map((product, index) => {
      if (!product) {
        throw new Error('Product not found for ID: ' + items[index].id);
      }
      const productPrimitives = product.toPrimitives();
      const item = items[index];
      return {
        idProduct: productPrimitives.idProduct,
        name: productPrimitives.name,
        unitPrice: productPrimitives.price,
        total: item.total,
        quantity: item.quantity,
      };
    });

    const totalPrice = shoppingCart.getCartTotal();

    return {
      creationDate: shoppingCartContent.creationDate,
      orders: orders,
      totalPrice: totalPrice,
    };
  }
}
