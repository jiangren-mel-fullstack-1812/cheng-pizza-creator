import { Filter } from '@loopback/repository';
import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import { ProductController } from '../../../controllers';
import { Product } from '../../../models/index';
import { ProductRepository } from '../../../repositories';
import { givenProduct } from '../../helpers';

describe('ProductController', () => {
  let productRepo: StubbedInstanceWithSinonAccessor<ProductRepository>;

  /*
  =============================================================================
  METHOD STUBS
  These handles give us a quick way to fake the response of our repository
  without needing to wrangle fake repository objects or manage real ones
  in our tests themselves.
  =============================================================================
   */
  let create: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let find: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  /*
  =============================================================================
  TEST VARIABLES
  Combining top-level objects with our resetRepositories method means we don't
  need to duplicate several variable assignments (and generation statements)
  in all of our test logic.

  NOTE: If you wanted to parallelize your test runs, you should avoid this
  pattern since each of these tests is sharing references.
  =============================================================================
  */
  let controller: ProductController;
  let aProduct: Product;
  let aProductWithId: Product;
  let aChangedProduct: Product;
  let aListOfProducts: Product[];

  beforeEach(resetRepositories);

  describe('createProduct', () => {
    it('creates a Product', async () => {
      create.resolves(aProductWithId);
      const result = await controller.create(aProduct);
      expect(result).to.eql(aProductWithId);
      sinon.assert.calledWith(create, aProduct);
    });
  });

  describe('findProductById', () => {
    it('returns a Product if it exists', async () => {
      findById.resolves(aProductWithId);
      expect(await controller.findById(aProductWithId.id as string)).to.eql(
        aProductWithId,
      );
      sinon.assert.calledWith(findById, aProductWithId.id);
    });
  });

  describe('findProducts', () => {
    it('returns multiple Products if they exist', async () => {
      find.resolves(aListOfProducts);
      expect(await controller.find()).to.eql(aListOfProducts);
      sinon.assert.called(find);
    });

    it('returns empty list if no products exist', async () => {
      const expected: Product[] = [];
      find.resolves(expected);
      expect(await controller.find()).to.eql(expected);
      sinon.assert.called(find);
    });

    it('uses the provided filter', async () => {
      const filter: Filter = { where: { isCompleted: false } };

      find.resolves(aListOfProducts);
      await controller.find(filter);
      sinon.assert.calledWith(find, filter);
    });
  });

  describe('replaceProduct', () => {
    it('successfully replaces existing items', async () => {
      replaceById.resolves();
      await controller.replaceById(aProductWithId.id as string, aChangedProduct);
      sinon.assert.calledWith(replaceById, aProductWithId.id, aChangedProduct);
    });
  });

  describe('updateProduct', () => {
    it('successfully updates existing items', async () => {
      updateById.resolves();
      await controller.updateById(aProductWithId.id as string, aChangedProduct);
      sinon.assert.calledWith(updateById, aProductWithId.id, aChangedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('successfully deletes existing items', async () => {
      deleteById.resolves();
      await controller.deleteById(aProductWithId.id as string);
      sinon.assert.calledWith(deleteById, aProductWithId.id);
    });
  });

  function resetRepositories() {
    productRepo = createStubInstance(ProductRepository);
    aProduct = givenProduct();
    aProductWithId = givenProduct({
      id: "1",
    });
    aListOfProducts = [
      aProductWithId,
      givenProduct({
        id: "2",
        name: 'bacon',
      }),
    ] as Product[];
    aChangedProduct = givenProduct({
      id: aProductWithId.id,
      name: 'cheese',
    });

    // Setup CRUD fakes
    ({
      create,
      findById,
      find,
      updateById,
      replaceById,
      deleteById,
    } = productRepo.stubs);

    controller = new ProductController(productRepo);
  }
});
