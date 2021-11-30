import { AppError } from 'shared/errors/AppError';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
export class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}
