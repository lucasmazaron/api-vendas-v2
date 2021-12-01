import 'reflect-metadata';
import { DeleteProductService } from './../DeleteProductService';
import { AppError } from 'shared/errors/AppError';
import { FakeProductRepository } from '../../infra/typeorm/repositories/fakes/FakeProductsRepository';
import { CreateProductService } from '../CreateProductService';
import { ShowProductService } from '../ShowProductService';
import { v4 as uuidv4 } from 'uuid';

describe('DeleteProductService', () => {
  let fakeProductRepository: FakeProductRepository;
  let createProductService: CreateProductService;
  let deleteProductService: DeleteProductService;
  let showProductService: ShowProductService;

  const fakeProduct = {
    name: 'PRODUTO TESTE',
    price: 1.0,
    quantity: 5,
  };

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);
    deleteProductService = new DeleteProductService(fakeProductRepository);
    showProductService = new ShowProductService(fakeProductRepository);
  });

  it('should be able to delete a exists product', async () => {
    const product = await createProductService.execute(fakeProduct);
    await deleteProductService.execute(product);

    expect(
      showProductService.execute({ id: product.id }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a product not exists', async () => {
    const product = { ...fakeProduct, id: uuidv4() };

    expect(deleteProductService.execute(product)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
