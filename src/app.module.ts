import { Module } from '@nestjs/common';
import { ShoppingCartController } from './api/shoppingCart.controller';
import { ProductAdder } from './context/shoppingCart/services/productAdder.service';
import { ShoppingCartContentCreator } from './context/shoppingCart/services/shoppingCartContentCreator.service';
import { InMemoryShoppingCartRepository } from './context/shoppingCart/infrastructure/inMemoryShoppingCartRepository';
import { InMemoryProductRepository } from './context/shoppingCart/infrastructure/inMemoryProductRepository';
import { DateGenerator } from './context/shoppingCart/infrastructure/dateGenerator';

@Module({
  imports: [],
  controllers: [ShoppingCartController],
  providers: [
    ProductAdder,
    ShoppingCartContentCreator,
    InMemoryShoppingCartRepository,
    InMemoryProductRepository,
    DateGenerator,
  ],
})
export class AppModule {}
