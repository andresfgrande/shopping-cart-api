import {
  ContentRequestDTO,
  ContentResponseDTO,
  ShoppingCartController,
} from '../../../src/shopping-cart/api/controllers/shoppingCart.controller';
import { ProductAdder } from '../../../src/shopping-cart/context/shopping-cart/services/productAdder.service';
import { InMemoryShoppingCartRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryShoppingCartRepository';
import { DateGenerator } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/dateGenerator';
import { ShoppingCartContentCreator } from '../../../src/shopping-cart/context/shopping-cart/services/shoppingCartContentCreator.service';
import { InMemoryProductRepository } from '../../../src/shopping-cart/context/shopping-cart/infrastructure/inMemoryProductRepository';
import {
  Price,
  Product,
  ProductId,
  ProductName,
} from '../../../src/shopping-cart/context/shopping-cart/domain/product';

describe('ShoppingCart should', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('be created when 1 product is added', () => {
    const fixedTimestamp = 1713256115000;
    jest.setSystemTime(fixedTimestamp);

    const dateGenerator = new DateGenerator();
    const shoppingCartRepository = new InMemoryShoppingCartRepository();
    const productRepository = new InMemoryProductRepository();
    const newProduct = new Product(
      new ProductId('10002'),
      new ProductName('The Hobbit'),
      new Price(5),
    );
    productRepository.save(newProduct);

    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
      productRepository,
    );
    const shoppingCartContentCreator = new ShoppingCartContentCreator(
      shoppingCartRepository,
      productRepository,
    );
    const shoppingCartController = new ShoppingCartController(
      productAdder,
      shoppingCartContentCreator,
    );
    const idUser = 'andres';
    const idProduct = '10002';
    const name = 'The Hobbit';
    const quantity = 2;

    shoppingCartController.addProduct({ idUser, name, idProduct, quantity });

    const expectedShoppingCart = {
      creationDate: new Date().toISOString(),
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
    } as ContentResponseDTO;

    const shoppingCartContentRequest: ContentRequestDTO = {
      idUser: 'andres',
    };

    expect(
      shoppingCartController.getContent(shoppingCartContentRequest),
    ).toStrictEqual(expectedShoppingCart);
  });

  it('be created with 2 products', () => {
    const fixedTimestamp = 1713256115000;
    jest.setSystemTime(fixedTimestamp);

    const dateGenerator = new DateGenerator();
    const shoppingCartRepository = new InMemoryShoppingCartRepository();
    const productRepository = new InMemoryProductRepository();
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
    productRepository.save(newProduct);
    productRepository.save(newProduct2);

    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
      productRepository,
    );
    const shoppingCartContentCreator = new ShoppingCartContentCreator(
      shoppingCartRepository,
      productRepository,
    );
    const shoppingCartController = new ShoppingCartController(
      productAdder,
      shoppingCartContentCreator,
    );

    const idUser = 'andres';
    //Product 1
    let idProduct = '10002';
    let quantity = 2;
    let name = 'The Hobbit';
    shoppingCartController.addProduct({ idUser, name, idProduct, quantity });
    //Product 2
    idProduct = '20110';
    quantity = 5;
    name = 'Breaking Bad';
    shoppingCartController.addProduct({ idUser, name, idProduct, quantity });

    const expectedShoppingCart = {
      creationDate: new Date().toISOString(),
      orders: [
        {
          idProduct: '10002',
          name: 'The Hobbit',
          unitPrice: 5,
          total: 10,
          quantity: 2,
        },
        {
          idProduct: '20110',
          name: 'Breaking Bad',
          unitPrice: 7,
          total: 35,
          quantity: 5,
        },
      ],
      totalPrice: 45,
    } as ContentResponseDTO;

    const shoppingCartContentRequest: ContentRequestDTO = {
      idUser: 'andres',
    };

    expect(
      shoppingCartController.getContent(shoppingCartContentRequest),
    ).toStrictEqual(expectedShoppingCart);
  });

  it('sum quantities when the same product is added', () => {
    const fixedTimestamp = 1713256115000;
    jest.setSystemTime(fixedTimestamp);

    const dateGenerator = new DateGenerator();
    const shoppingCartRepository = new InMemoryShoppingCartRepository();
    const productRepository = new InMemoryProductRepository();
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
    productRepository.save(newProduct);
    productRepository.save(newProduct2);

    const productAdder = new ProductAdder(
      shoppingCartRepository,
      dateGenerator,
      productRepository,
    );
    const shoppingCartContentCreator = new ShoppingCartContentCreator(
      shoppingCartRepository,
      productRepository,
    );
    const shoppingCartController = new ShoppingCartController(
      productAdder,
      shoppingCartContentCreator,
    );

    const idUser = 'andres';
    //Product 1
    let idProduct = '10002';
    let quantity = 2;
    let name = 'The Hobbit';
    shoppingCartController.addProduct({ idUser, name, idProduct, quantity });
    //Product 2
    idProduct = '10002';
    quantity = 5;
    name = 'The Hobbit';
    shoppingCartController.addProduct({ idUser, name, idProduct, quantity });

    const expectedShoppingCart = {
      creationDate: new Date().toISOString(),
      orders: [
        {
          idProduct: '10002',
          name: 'The Hobbit',
          unitPrice: 5,
          total: 35,
          quantity: 7,
        },
      ],
      totalPrice: 35,
    } as ContentResponseDTO;

    const shoppingCartContentRequest: ContentRequestDTO = {
      idUser: 'andres',
    };

    expect(
      shoppingCartController.getContent(shoppingCartContentRequest),
    ).toStrictEqual(expectedShoppingCart);
  });
});

//Crear test integracion para date generator y repository -- OK
//Crear servicio para obtener contenido y poner en verde este test --OK
//Otro acceptance test con 2 productos --OK
