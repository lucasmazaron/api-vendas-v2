import { IProductsRepository } from './../../../domain/repositories/IProductsRepository';
import { Product } from '../entities/Product';
import { getRepository, Repository } from 'typeorm';

export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
