import { Module } from '@nestjs/common';
import { ShoppingCartController } from './api/shoppingCart.controller';
import { ProductAdder } from './context/shoppingCart/services/productAdder.service';
import { ShoppingCartContentCreator } from './context/shoppingCart/services/shoppingCartContentCreator.service';
import { DateGenerator } from './context/shoppingCart/infrastructure/dateGenerator';
import { MongoProductRepository } from './context/shoppingCart/infrastructure/mongoProductRepository';
import { MongoShoppingCartRepository } from './context/shoppingCart/infrastructure/mongoShoppingCartRepository';
import {
  Product,
  ProductId,
  ProductName,
} from './context/shoppingCart/domain/product';

import { MongoClient } from 'mongodb';
import { MongoService } from './context/shoppingCart/infrastructure/mongoService';
import { Price } from './context/shoppingCart/domain/price';
const mongoClient = {
  provide: MongoClient,
  useFactory: async () => {
    return new MongoClient('mongodb://localhost:27017/shoppingcart');
  },
};
@Module({
  imports: [],
  controllers: [ShoppingCartController],
  providers: [
    mongoClient,
    MongoService,
    ProductAdder,
    ShoppingCartContentCreator,
    {
      provide: 'ShoppingCartRepository',
      useClass: MongoShoppingCartRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: MongoProductRepository,
    },
    DateGenerator,
    MongoProductRepository,
    MongoShoppingCartRepository,
    Product,
    ProductId,
    ProductName,
    Price,
  ],
})
export class AppModule {}
