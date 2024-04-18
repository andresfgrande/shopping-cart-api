import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from './api/shoppingCart.controller';
import { AppService } from './context/app.service';

describe('AppController', () => {
  let appController: ShoppingCartController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartController],
      providers: [AppService],
    }).compile();

    appController = app.get<ShoppingCartController>(ShoppingCartController);
  });

  describe('root', () => {
    /*it('should return "Shopping Cart API"', () => {
      expect(appController.getHello()).toBe('Shopping Cart API');
    });*/
  });
});
