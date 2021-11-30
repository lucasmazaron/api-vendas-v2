import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}
