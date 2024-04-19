import { mock } from 'jest-mock-extended';
import { DateGenerator } from '../../../src/context/shoppingCart/infrastructure/dateGenerator';
import { InMemoryShoppingCartRepository } from '../../../src/context/shoppingCart/infrastructure/inMemoryShoppingCartRepository';
import { InMemoryProductRepository } from '../../../src/context/shoppingCart/infrastructure/inMemoryProductRepository';
import { ShoppingCartContentCreator } from '../../../src/context/shoppingCart/services/shoppingCartContentCreator.service';
import { ShoppingCart } from '../../../src/context/shoppingCart/domain/shopping.cart';
import { Product } from '../../../src/context/shoppingCart/domain/product';
import { ContentResponse } from '../../../src/api/shoppingCart.controller';

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
