import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductAdder } from '../context/shoppingCart/services/productAdder.service';
import { ShoppingCartContentCreator } from '../context/shoppingCart/services/shoppingCartContentCreator.service';

export interface ContentResponseDTO {
  creationDate: string;
  orders: {
    idProduct: string;
    name: string;
    unitPrice: number;
    total: number;
    quantity: number;
  }[];
  totalPrice: number;
}

export interface ContentResponse {
  creationDate: string;
  orders: {
    idProduct: string;
    name: string;
    unitPrice: number;
    total: number;
    quantity: number;
  }[];
  totalPrice: number;
}

export interface AddProductRequestDTO {
  idUser: string;
  name: string;
  idProduct: string;
  quantity: number;
}

export interface ContentRequestDTO {
  idUser: string;
}

export interface ContentRequest {
  idUser: string;
}

@Controller('cart')
export class ShoppingCartController {
  constructor(
    private productAdder: ProductAdder,
    private shoppingCartContentCreator: ShoppingCartContentCreator,
  ) {}

  @Post()
  addProduct(@Body() request: AddProductRequestDTO): void {
    this.productAdder.execute(request);
  }

  @Get('/:idUser')
  async getContent(
    @Param('idUser') idUser: string,
  ): Promise<ContentResponseDTO> {
    const request: ContentRequest = { idUser: idUser };
    return await this.shoppingCartContentCreator.execute(request);
  }

  @Get('tests/:id')
  getTestContent(@Param('id') id: string): string {
    return id;
  }
}
