import { ShoppingCartContentCreator } from '../../../src/shopping-cart/context/shopping-cart/services/shoppingCartContentCreator.service';
import { ContentResponse } from '../../../src/shopping-cart/api/controllers/shoppingCart.controller';
import { mock } from 'jest-mock-extended';
import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryShoppingCartRepository';
import { ShoppingCart } from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/dateGenerator';
import { InMemoryProductRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryProductRepository';
import { Product } from '../../../src/shopping-cart/context/shopping-cart/domain/product';

describe('ShoppingCartContentCreator should', () => {
  it('be able to be able to get content', () => {
    const dateGenerator = mock<DateGenerator>();
    const shoppingCartRepository = mock<InMemoryShoppingCartRepository>();
    const productRepository = mock<InMemoryProductRepository>();
    const shoppingCartContentCreator = new ShoppingCartContentCreator(
      shoppingCartRepository,
      productRepository,
    );

    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);

    shoppingCartRepository.getByUserId.mockReturnValue(
      ShoppingCart.fromPrimitives({
        creationDate: expectedDate,
        idUser: 'andres',
        items: [
          {
            id: '10002',
            name: 'The Hobbit',
            unitPrice: 5,
            quantity: 2,
            total: 10,
          },
        ],
      }),
    );

    productRepository.getProductById.mockReturnValue(
      Product.fromPrimitives({
        idProduct: '10002',
        name: 'The Hobbit',
        price: 5,
      }),
    );

    const expectedShoppingCartContent = {
      creationDate: expectedDate,
      orders: [
        {
          idProduct: '10002',
          name: 'The Hobbit',
          unitPrice: 5,
          total: 10,
          quantity: 2,
        },
      ],
      totalPrice: 10,
    } as ContentResponse;

    const cartRequest = {
      idUser: 'andres',
    };

    const shoppingCartContent = shoppingCartContentCreator.execute(cartRequest);

    expect(shoppingCartContent).toStrictEqual(expectedShoppingCartContent);
  });
});
