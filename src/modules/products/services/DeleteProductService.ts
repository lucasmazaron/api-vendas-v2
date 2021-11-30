import { IProductsRepository } from 'modules/products/domain/repositories/IProductsRepository';
import { AppError } from 'shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.productsRepository.remove(product);
  }
}
