import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';
import { IUpdateProducts } from '../domain/models/IUpdateProducts';

export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProducts): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}
