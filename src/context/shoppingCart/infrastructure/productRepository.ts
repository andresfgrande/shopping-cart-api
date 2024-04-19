import { Product, ProductId } from '../domain/product';

export interface ProductRepository {
  getProductById(id: ProductId): Promise<Product>;

  save(product: Product): Promise<void>;
}
