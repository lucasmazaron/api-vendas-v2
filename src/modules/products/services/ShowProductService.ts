import { AppError } from 'shared/errors/AppError';
import { Product } from '../infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}
