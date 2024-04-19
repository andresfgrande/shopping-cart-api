import { InMemoryProductRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryProductRepository';
import {
  Price,
  Product,
  ProductId,
  ProductName,
} from '../../../src/shopping-cart/context/shopping-cart/domain/product';

describe('Product Repository', () => {
  it('Should be able to save a new product', async () => {
    //save and get the product

    const productRepository = new InMemoryProductRepository();
    const idProduct = '123';
    const name = 'Test';
    const price = 11;
    const newProduct = new Product(
      new ProductId(idProduct),
      new ProductName(name),
      new Price(price),
    );

    productRepository.save(newProduct);

    const savedProduct = productRepository.getProductById(
      new ProductId(idProduct),
    );

    expect(savedProduct).toStrictEqual(newProduct);
  });
});
