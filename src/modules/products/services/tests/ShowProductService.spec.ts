import 'reflect-metadata';
import { ShowProductService } from './../ShowProductService';
import { AppError } from 'shared/errors/AppError';
import { FakeProductRepository } from '../../infra/typeorm/repositories/fakes/FakeProductsRepository';
import { CreateProductService } from '../CreateProductService';
import { v4 as uuidv4 } from 'uuid';

describe('ShowProductService', () => {
  let fakeProductRepository: FakeProductRepository;
  let createProductService: CreateProductService;
  let showProductService: ShowProductService;

  const fakeProduct = {
    name: 'PRODUTO TESTE',
    price: 1.0,
    quantity: 5,
  };

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);
    showProductService = new ShowProductService(fakeProductRepository);
  });

  it('should be able to show a product', async () => {
    const fakeCreatedProduct = await createProductService.execute(fakeProduct);
    const product = await showProductService.execute({
      id: fakeCreatedProduct.id,
    });

    expect(product).toHaveProperty('id');
    expect(product.name).toBe(fakeProduct.name);
    expect(product.price).toBe(fakeProduct.price);
    expect(product.quantity).toBe(fakeProduct.quantity);
  });

  it('should not be able to show product if not exists', async () => {
    expect(
      showProductService.execute({ ...fakeProduct, id: uuidv4() }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
