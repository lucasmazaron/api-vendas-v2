import 'reflect-metadata';
import { AppError } from 'shared/errors/AppError';
import { FakeProductRepository } from '../../infra/typeorm/repositories/fakes/FakeProductsRepository';
import { CreateProductService } from '../CreateProductService';

describe('CreateProductService', () => {
  let fakeProductRepository: FakeProductRepository;
  let createProductService: CreateProductService;

  const fakeProduct = {
    name: 'PRODUTO TESTE',
    price: 1.0,
    quantity: 5,
  };

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute(fakeProduct);

    expect(product).toHaveProperty('id');
    expect(product.name).toBe(fakeProduct.name);
    expect(product.price).toBe(fakeProduct.price);
    expect(product.quantity).toBe(fakeProduct.quantity);
  });

  it('should not be able to create two products with the same name', async () => {
    await createProductService.execute(fakeProduct);

    expect(createProductService.execute(fakeProduct)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
