import { IProductsRepository } from './../domain/repositories/IProductsRepository';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { AppError } from 'shared/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}
