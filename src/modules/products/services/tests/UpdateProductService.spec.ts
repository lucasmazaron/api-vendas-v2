import 'reflect-metadata';
import { UpdateProductService } from './../UpdateProductService';
import { AppError } from 'shared/errors/AppError';
import { FakeProductRepository } from '../../infra/typeorm/repositories/fakes/FakeProductsRepository';
import { CreateProductService } from '../CreateProductService';
import { v4 as uuidv4 } from 'uuid';

describe('UpdateProductService', () => {
  let fakeProductRepository: FakeProductRepository;
  let createProductService: CreateProductService;
  let updateProductService: UpdateProductService;

  const fakeProduct = {
    name: 'PRODUTO TESTE',
    price: 1.0,
    quantity: 5,
  };

  const fakeProduct2 = {
    name: 'PRODUTO 2',
    price: 0.5,
    quantity: 2,
  };

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);
    updateProductService = new UpdateProductService(fakeProductRepository);
  });

  it('should be able to update a exist product', async () => {
    const product = await createProductService.execute(fakeProduct);
    const updatedProduct = await updateProductService.execute({
      ...fakeProduct2,
      id: product.id,
    });

    expect(updatedProduct.id).toBe(product.id);
    expect(updatedProduct.name).toBe(fakeProduct2.name);
    expect(updatedProduct.price).toBe(fakeProduct2.price);
    expect(updatedProduct.quantity).toBe(fakeProduct2.quantity);
  });

  it('should not be able to update a product with the product not exists', async () => {
    expect(
      updateProductService.execute({
        ...fakeProduct2,
        id: uuidv4(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a product with the product have the same name', async () => {
    const product = await createProductService.execute(fakeProduct);
    const product2 = await createProductService.execute(fakeProduct2);

    expect(
      updateProductService.execute({
        ...product2,
        name: product.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
