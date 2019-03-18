// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-product
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { EntityNotFoundError } from '@loopback/repository';
import {
  Client,
  createRestAppClient,
  expect,
  givenHttpServerConfig,
  toJSON,
} from '@loopback/testlab';
import { ChengPizzaCreatorApplication } from '../../application';
import { Product } from '../../models';
import { ProductRepository } from '../../repositories';
import {
  givenProduct,
} from '../helpers';

describe('ProductApplication', () => {
  let app: ChengPizzaCreatorApplication;
  let client: Client;
  let productRepo: ProductRepository;

  before(givenRunningApplicationWithCustomConfiguration);
  after(() => app.stop());

  before(givenProductRepository);
  before(() => {
    client = createRestAppClient(app);
  });

  beforeEach(async () => {
    await productRepo.deleteAll();
  });

  it('creates a product', async function () {
    this.timeout(30000);
    const product = givenProduct();
    const response = await client
      .post('/products')
      .send(product)
      .expect(200);
    expect(response.body).to.containDeep(product);
    const result = await productRepo.findById(response.body.id);
    expect(result).to.containDeep(product);
  });

  it('rejects requests to create a product with no name', async () => {
    const product = givenProduct();
    delete product.name;
    await client
      .post('/products')
      .send(product)
      .expect(422);
  });

  context('when dealing with a single persisted product', () => {
    let persistedProduct: Product;

    beforeEach(async () => {
      persistedProduct = await givenProductInstance();
    });

    it('gets a product by ID', () => {
      return client
        .get(`/products/${persistedProduct.id}`)
        .send()
        .expect(200, toJSON(persistedProduct));
    });

    it('returns 404 when getting a product that does not exist', () => {
      return client.get('/products/99999').expect(404);
    });

    it('replaces the product by ID', async () => {
      const updatedProduct = givenProduct({
        price: 10
      });
      await client
        .put(`/products/${persistedProduct.id}`)
        .send(updatedProduct)
        .expect(204);
      const result = await productRepo.findById(persistedProduct.id);
      expect(result).to.containEql(updatedProduct);
    });

    it('returns 404 when replacing a product that does not exist', () => {
      return client
        .put('/products/99999')
        .send(givenProduct())
        .expect(404);
    });

    it('updates the product by ID ', async () => {
      const updatedProduct = givenProduct({
        price: 10
      });
      await client
        .patch(`/products/${persistedProduct.id}`)
        .send(updatedProduct)
        .expect(204);
      const result = await productRepo.findById(persistedProduct.id);
      expect(result).to.containEql(updatedProduct);
    });

    it('returns 404 when updating a product that does not exist', () => {
      return client
        .patch('/products/99999')
        .send(givenProduct({ price: 100 }))
        .expect(404);
    });

    it('deletes the product', async () => {
      await client
        .del(`/products/${persistedProduct.id}`)
        .send()
        .expect(204);
      await expect(productRepo.findById(persistedProduct.id)).to.be.rejectedWith(
        EntityNotFoundError,
      );
    });

    it('returns 404 when deleting a product that does not exist', async () => {
      await client.del(`/products/99999`).expect(404);
    });
  });

  it('queries products with a filter', async () => {
    await givenProductInstance({ type: 'topping' });

    const productInProgress = await givenProductInstance({
      type: 'bread',
    });

    await client
      .get('/products')
      .query({ filter: { where: { type: 'bread' } } })
      .expect(200, [toJSON(productInProgress)]);
  });

  /*
   ============================================================================
   TEST HELPERS
   These functions help simplify setup of your test fixtures so that your tests
   can:
   - operate on a "clean" environment each time (a fresh in-memory database)
   - avoid polluting the test with large quantities of setup logic to keep
   them clear and easy to read
   - keep them DRY (who wants to write the same stuff over and over?)
   ============================================================================
   */

  async function givenRunningApplicationWithCustomConfiguration() {
    app = new ChengPizzaCreatorApplication({
      rest: givenHttpServerConfig(),
    });

    await app.boot();

    /**
     * Override default config for DataSource for testing so we don't write
     * test data to file when using the memory connector.
     */
    app.bind('datasources.config.mlab').to({
      name: 'db',
      connector: 'memory',
    });

    // Start Application
    await app.start();
  }

  async function givenProductRepository() {
    productRepo = await app.getRepository(ProductRepository);
  }

  async function givenProductInstance(product?: Partial<Product>) {
    return await productRepo.create(givenProduct(product));
  }
});
