// import { ICreateProducts } from '../models/ICreateProducts';
import { IProduct } from '../models/IProduct';

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  // create(data: ICreateProducts): Promise<IProduct>;
  // save(product: IProduct): Promise<IProduct>;
}
