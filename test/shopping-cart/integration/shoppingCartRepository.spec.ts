import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryShoppingCartRepository';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/dateGenerator';
import { ShoppingCart } from '../../../src/shopping-cart/context/shopping-cart/domain/shopping.cart';
import { UserId } from '../../../src/shopping-cart/context/shopping-cart/domain/userId';
import { CreationDate } from '../../../src/shopping-cart/context/shopping-cart/domain/creationDate';

describe('Shopping Cart Repository should', () => {
  it('be able to save a new shopping cart when repo has no products', () => {
    const shoppingCartRepository = new InMemoryShoppingCartRepository();
    const dateGenerator = new DateGenerator();
    const idUser = 'andres';
    const creationDate = dateGenerator.getDate();
    const shoppingCart = new ShoppingCart(
      new UserId(idUser),
      new CreationDate(creationDate),
    );
    shoppingCart.addItem('10002', 'The Hobbit', 5, 1);

    shoppingCartRepository.save(shoppingCart);
    const savedShoppingCart = shoppingCartRepository.getByUserId(
      new UserId(idUser),
    );

    expect(shoppingCart).toStrictEqual(savedShoppingCart);
  });
});
