import { Product } from './../../entities/Product';
import { ICreateProduct } from 'modules/products/domain/models/ICreateProduct';
import { v4 as uuidv4 } from 'uuid';
import { IProductsRepository } from 'modules/products/domain/repositories/IProductsRepository';

export class FakeProductRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = uuidv4();
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    Object.assign(this.products, product);
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.name === name);
    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.id === id);
    return product;
  }

  public async remove(product: Product): Promise<void> {
    const index = this.products.findIndex(function (prod: Product) {
      return prod.id === product.id;
    });
    if (index !== -1) this.products.splice(index, 1);
  }
}
